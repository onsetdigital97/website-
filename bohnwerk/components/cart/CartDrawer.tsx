'use client';

import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag, Truck } from 'lucide-react';
import { useShop, FREE_SHIPPING_EUR } from '@/lib/store';
import { formatPrice, productHref } from '@/lib/utils';
import { getProductById, getProductsByIds } from '@/lib/data';
import { LinkButton } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function CartDrawer() {
  const { isCartOpen, closeCart, cart, updateQuantity, removeFromCart, cartSubtotal, freeShippingRemaining, freeShippingProgress } = useShop();

  const crossSellIds = Array.from(new Set(cart.flatMap((line) => getProductById(line.productId)?.relatedIds ?? []))).filter(
    (id) => !cart.some((l) => l.productId === id)
  );
  const crossSell = getProductsByIds(crossSellIds).slice(0, 2);

  return (
    <>
      <div
        className={cn('fixed inset-0 z-[90] bg-espresso-950/50 transition-opacity duration-300', isCartOpen ? 'opacity-100' : 'pointer-events-none opacity-0')}
        onClick={closeCart}
        aria-hidden="true"
      />
      <div
        className={cn(
          'fixed inset-y-0 right-0 z-[100] flex w-full max-w-md flex-col bg-cream-50 shadow-lift transition-transform duration-300 ease-smooth',
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Warenkorb"
      >
        <div className="flex items-center justify-between border-b border-ink-900/10 px-5 py-4">
          <h2 className="font-display text-lg font-semibold text-ink-900">Warenkorb ({cart.reduce((s, l) => s + l.quantity, 0)})</h2>
          <button type="button" onClick={closeCart} aria-label="Warenkorb schließen" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-ink-900/5 btn-focus-ring">
            <X size={20} />
          </button>
        </div>

        <div className="border-b border-ink-900/10 px-5 py-4">
          <div className="flex items-center gap-2 text-xs font-medium text-ink-700">
            <Truck size={15} className="text-copper-500" />
            {freeShippingRemaining > 0 ? (
              <span>
                Noch <strong>{formatPrice(freeShippingRemaining)}</strong> bis zum kostenlosen Versand
              </span>
            ) : (
              <span>Sie erhalten kostenlosen Versand! 🎉</span>
            )}
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink-900/10">
            <div className="h-full rounded-full bg-copper-500 transition-all duration-500" style={{ width: `${freeShippingProgress}%` }} />
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag size={40} className="text-ink-300" />
            <p className="text-sm text-ink-500">Ihr Warenkorb ist noch leer.</p>
            <LinkButton href="/kaffee" variant="primary" size="sm" onClick={closeCart}>
              Kaffee entdecken
            </LinkButton>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <ul className="space-y-5">
              {cart.map((line) => (
                <li key={line.id} className="flex gap-3">
                  <Link
                    href={productHref({ type: getProductById(line.productId)?.type ?? 'coffee', slug: line.slug })}
                    onClick={closeCart}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-sand-100"
                  >
                    <Image src={line.image} alt={line.name} fill className="object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-display text-sm font-semibold text-ink-900">{line.name}</p>
                        {line.variantLabel && <p className="text-xs text-ink-500">{line.variantLabel}</p>}
                        {line.isSubscription && <p className="text-xs text-copper-600">Abo · {line.interval}</p>}
                      </div>
                      <button type="button" onClick={() => removeFromCart(line.id)} aria-label={`${line.name} entfernen`} className="text-ink-300 hover:text-terracotta-500">
                        <X size={16} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-full border border-ink-900/15">
                        <button
                          type="button"
                          onClick={() => updateQuantity(line.id, line.quantity - 1)}
                          className="flex h-7 w-7 items-center justify-center text-ink-700 btn-focus-ring"
                          aria-label="Menge verringern"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-6 text-center text-sm font-medium" aria-live="polite">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(line.id, line.quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center text-ink-700 btn-focus-ring"
                          aria-label="Menge erhöhen"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <span className="font-display text-sm font-semibold text-ink-900">{formatPrice(line.price * line.quantity)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {crossSell.length > 0 && (
              <div className="mt-6 border-t border-ink-900/10 pt-5">
                <p className="eyebrow text-ink-300">Das passt dazu</p>
                <div className="mt-3 space-y-3">
                  {crossSell.map((p) => (
                    <div key={p.id} className="flex items-center gap-3">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-sand-100">
                        <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-ink-900">{p.name}</p>
                        <p className="text-xs text-ink-500">{formatPrice(p.price)}</p>
                      </div>
                      <Link href={productHref(p)} onClick={closeCart} className="text-xs font-semibold text-copper-600 hover:underline">
                        Ansehen
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {cart.length > 0 && (
          <div className="border-t border-ink-900/10 px-5 py-5">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-ink-500">Zwischensumme</span>
              <span className="font-display text-base font-semibold text-ink-900">{formatPrice(cartSubtotal)}</span>
            </div>
            <p className="mb-3 text-xs text-ink-400">Versandkosten und Steuern werden an der Kasse berechnet.</p>
            <LinkButton href="/kasse" variant="secondary" size="lg" className="w-full" onClick={closeCart}>
              Zur Kasse
            </LinkButton>
            <LinkButton href="/warenkorb" variant="ghost" size="md" className="mt-2 w-full" onClick={closeCart}>
              Warenkorb ansehen
            </LinkButton>
          </div>
        )}
      </div>
    </>
  );
}
