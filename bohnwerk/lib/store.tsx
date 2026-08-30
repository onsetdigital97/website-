'use client';

import { createContext, useContext, useEffect, useMemo, useState, ReactNode, useCallback } from 'react';
import { CartLine, Product } from '@/lib/types';

const FREE_SHIPPING_THRESHOLD = 39;

function useLocalStorageState<T>(key: string, initial: T): [T, (v: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) setState(JSON.parse(raw));
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // storage unavailable
    }
  }, [key, state, hydrated]);

  return [state, setState];
}

type Toast = { id: string; message: string; tone: 'success' | 'error' | 'info' };

type ShopContextValue = {
  cart: CartLine[];
  addToCart: (line: Omit<CartLine, 'id'>) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  freeShippingRemaining: number;
  freeShippingProgress: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  compareIds: string[];
  toggleCompare: (productId: string) => void;
  isComparing: (productId: string) => boolean;
  clearCompare: () => void;

  recentlyViewed: string[];
  addRecentlyViewed: (productId: string) => void;

  toasts: Toast[];
  pushToast: (message: string, tone?: Toast['tone']) => void;
  dismissToast: (id: string) => void;

  quickViewProduct: Product | null;
  openQuickView: (p: Product) => void;
  closeQuickView: () => void;
};

const ShopContext = createContext<ShopContextValue | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useLocalStorageState<CartLine[]>('bohnwerk:cart', []);
  const [wishlist, setWishlist] = useLocalStorageState<string[]>('bohnwerk:wishlist', []);
  const [compareIds, setCompareIds] = useLocalStorageState<string[]>('bohnwerk:compare', []);
  const [recentlyViewed, setRecentlyViewed] = useLocalStorageState<string[]>('bohnwerk:recent', []);
  const [isCartOpen, setCartOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const pushToast = useCallback((message: string, tone: Toast['tone'] = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { id, message, tone }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3800);
  }, []);
  const dismissToast = useCallback((id: string) => setToasts((prev) => prev.filter((t) => t.id !== id)), []);

  const addToCart = useCallback(
    (line: Omit<CartLine, 'id'>) => {
      setCart((prev) => {
        const key = `${line.productId}-${line.variantLabel ?? ''}-${line.isSubscription ? 'sub' : 'one'}-${line.interval ?? ''}`;
        const existing = prev.find((l) => l.id === key);
        if (existing) {
          return prev.map((l) => (l.id === key ? { ...l, quantity: l.quantity + line.quantity } : l));
        }
        return [...prev, { ...line, id: key }];
      });
      pushToast(`${line.name} wurde zum Warenkorb hinzugefügt.`, 'success');
      setCartOpen(true);
    },
    [setCart, pushToast]
  );

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      setCart((prev) => (quantity <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, quantity } : l))));
    },
    [setCart]
  );

  const removeFromCart = useCallback(
    (id: string) => {
      setCart((prev) => prev.filter((l) => l.id !== id));
      pushToast('Artikel wurde entfernt.', 'info');
    },
    [setCart, pushToast]
  );

  const clearCart = useCallback(() => setCart([]), [setCart]);

  const cartCount = useMemo(() => cart.reduce((sum, l) => sum + l.quantity, 0), [cart]);
  const cartSubtotal = useMemo(() => cart.reduce((sum, l) => sum + l.price * l.quantity, 0), [cart]);
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const toggleWishlist = useCallback(
    (productId: string) => {
      setWishlist((prev) => {
        const has = prev.includes(productId);
        pushToast(has ? 'Von der Merkliste entfernt.' : 'Zur Merkliste hinzugefügt.', 'info');
        return has ? prev.filter((id) => id !== productId) : [...prev, productId];
      });
    },
    [setWishlist, pushToast]
  );
  const isWishlisted = useCallback((productId: string) => wishlist.includes(productId), [wishlist]);

  const toggleCompare = useCallback(
    (productId: string) => {
      setCompareIds((prev) => {
        if (prev.includes(productId)) return prev.filter((id) => id !== productId);
        if (prev.length >= 3) {
          pushToast('Sie können maximal 3 Produkte vergleichen.', 'error');
          return prev;
        }
        return [...prev, productId];
      });
    },
    [setCompareIds, pushToast]
  );
  const isComparing = useCallback((productId: string) => compareIds.includes(productId), [compareIds]);
  const clearCompare = useCallback(() => setCompareIds([]), [setCompareIds]);

  const addRecentlyViewed = useCallback(
    (productId: string) => {
      setRecentlyViewed((prev) => [productId, ...prev.filter((id) => id !== productId)].slice(0, 8));
    },
    [setRecentlyViewed]
  );

  const value: ShopContextValue = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    cartSubtotal,
    freeShippingRemaining,
    freeShippingProgress,
    isCartOpen,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
    wishlist,
    toggleWishlist,
    isWishlisted,
    compareIds,
    toggleCompare,
    isComparing,
    clearCompare,
    recentlyViewed,
    addRecentlyViewed,
    toasts,
    pushToast,
    dismissToast,
    quickViewProduct,
    openQuickView: setQuickViewProduct,
    closeQuickView: () => setQuickViewProduct(null),
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used within ShopProvider');
  return ctx;
}

export const FREE_SHIPPING_EUR = FREE_SHIPPING_THRESHOLD;
