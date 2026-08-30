'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, X, ShoppingBag, Truck, Tag, Check } from 'lucide-react';
import { useShop, FREE_SHIPPING_EUR } from '@/lib/store';
import { formatPrice, productHref } from '@/lib/utils';
import { getProductById, getProductsByIds } from '@/lib/data';
import { LinkButton } from '@/components/ui/Button';
import { ProductCard } from '@/components/product/ProductCard';

export function CartPageContent() {
  const { cart, updateQuantity, removeFromCart, cartSubtotal, freeShippingRemaining, freeShippingProgress } = useShop();
  const [coupon, setCoupon] = useState('');
  const [couponStatus, setCouponStatus] = useState<'idle' | 'applied' | 'invalid'>('idle');
  const [discount, setDiscount] = useState(0);

  function applyCoupon(e: React.FormEvent) {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === 'ROEST10') {
      setDiscount(cartSubtotal * 0.1);
      setCouponStatus('applied');
    } else {
      setDiscount(0);
      setCouponStatus('invalid');
    }
  }

  const crossSellIds = Array.from(new Set(cart.flatMap((line) => getProductById(line.productId)?.relatedIds ?? []))).filter((id) => !cart.some((l) => l.productId === id));
  const crossSell = getProductsByIds(crossSellIds).slice(0, 4);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-ink-900/15 py-20 text-center">
        <ShoppingBag size={44} className="text-ink-300" />
        <p className="font-display text-xl font-semibold text-ink-900">Ihr Warenkorb ist leer</p>
        <p className="max-w-sm text-sm text-ink-500">Entdecken Sie unsere Röstungen und Maschinen — Ihr nächster Lieblingskaffee wartet.</p>
        <LinkButton href="/kaffee" variant="primary" size="md">
          Kaffee entdecken
        </LinkButton>
      </div>
    );
  }

  const total = Math.max(0, cartSubtotal - discount);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
      <div>
        <div className="rounded-2xl border border-ink-900/10 bg-copper-50 p-4">
          <div className="flex items-center gap-2 text-xs font-medium text-espresso-900">
            <Truck size={15} className="text-copper-600" />
            {freeShippingRemaining > 0 ? (
              <span>
                Noch <strong>{formatPrice(freeShippingRemaining)}</strong> bis zum kostenlosen Versand
              </span>
            ) : (
              <span>Sie erhalten kostenlosen Versand!</span>
            )}
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink-900/10">
            <div className="h-full rounded-full bg-copper-500 transition-all duration-500" style={{ width: `${freeShippingProgress}%` }} />
          </div>
        </div>

        <ul className="mt-6 divide-y divide-ink-900/10 border-y border-ink-900/10">
          {cart.map((line) => {
            const product = getProductById(line.productId);
            return (
              <li key={line.id} className="flex gap-4 py-5">
                <Link href={product ? productHref(product) : '#'} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-sand-100 sm:h-28 sm:w-28">
                  <Image src={line.image} alt={line.name} fill className="object-cover" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link href={product ? productHref(product) : '#'} className="font-display text-sm font-semibold text-ink-900 hover:text-copper-600 sm:text-base">
                        {line.name}
                      </Link>
                      {line.variantLabel && <p className="mt-0.5 text-xs text-ink-500">{line.variantLabel}</p>}
                      {line.isSubscription && <p className="mt-0.5 text-xs font-medium text-copper-600">Abo · {line.interval}</p>}
                    </div>
                    <button type="button" onClick={() => removeFromCart(line.id)} aria-label={`${line.name} entfernen`} className="text-ink-300 hover:text-terracotta-500">
                      <X size={18} />
                    </button>
                  </div>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                    <div className="flex items-center rounded-full border border-ink-900/15">
                      <button type="button" onClick={() => updateQuantity(line.id, line.quantity - 1)} className="flex h-9 w-9 items-center justify-center text-ink-700 btn-focus-ring" aria-label="Menge verringern">
                        <Minus size={14} />
                      </button>
                      <span className="w-7 text-center text-sm font-medium" aria-live="polite">
                        {line.quantity}
                      </span>
                      <button type="button" onClick={() => updateQuantity(line.id, line.quantity + 1)} className="flex h-9 w-9 items-center justify-center text-ink-700 btn-focus-ring" aria-label="Menge erhöhen">
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="font-display text-sm font-semibold text-ink-900 sm:text-base">{formatPrice(line.price * line.quantity)}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {crossSell.length > 0 && (
          <div className="mt-10">
            <p className="font-display text-lg font-semibold text-ink-900">Passt gut dazu</p>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {crossSell.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="h-fit rounded-2xl border border-ink-900/10 p-6">
        <h2 className="font-display text-lg font-semibold text-ink-900">Zusammenfassung</h2>
        <form onSubmit={applyCoupon} className="mt-4 flex gap-2">
          <div className="relative flex-1">
            <Tag size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
            <input
              value={coupon}
              onChange={(e) => {
                setCoupon(e.target.value);
                setCouponStatus('idle');
              }}
              type="text"
              placeholder="Gutscheincode"
              className="w-full rounded-full border border-ink-900/15 py-2.5 pl-9 pr-3 text-sm focus:border-copper-500 focus:outline-none focus:ring-1 focus:ring-copper-500"
            />
          </div>
          <button type="submit" className="rounded-full bg-ink-900/5 px-4 text-sm font-semibold text-ink-900 hover:bg-ink-900/10">
            Anwenden
          </button>
        </form>
        {couponStatus === 'applied' && (
          <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-700">
            <Check size={13} /> Gutschein angewendet (10% Rabatt)
          </p>
        )}
        {couponStatus === 'invalid' && <p className="mt-2 text-xs font-medium text-terracotta-600">Dieser Gutscheincode ist ungültig oder abgelaufen.</p>}
        <p className="mt-1.5 text-xs text-ink-400">Testcode: ROEST10</p>

        <dl className="mt-6 space-y-2.5 border-t border-ink-900/10 pt-5 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink-500">Zwischensumme</dt>
            <dd className="font-medium text-ink-900">{formatPrice(cartSubtotal)}</dd>
          </div>
          {discount > 0 && (
            <div className="flex justify-between">
              <dt className="text-ink-500">Rabatt</dt>
              <dd className="font-medium text-emerald-700">−{formatPrice(discount)}</dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt className="text-ink-500">Versand</dt>
            <dd className="font-medium text-ink-900">{freeShippingRemaining > 0 ? formatPrice(4.9) : 'Kostenlos'}</dd>
          </div>
        </dl>
        <div className="mt-4 flex justify-between border-t border-ink-900/10 pt-4">
          <span className="font-display font-semibold text-ink-900">Gesamtsumme</span>
          <span className="font-display text-lg font-semibold text-ink-900">{formatPrice(total + (freeShippingRemaining > 0 ? 4.9 : 0))}</span>
        </div>
        <p className="mt-1 text-xs text-ink-400">inkl. MwSt., zzgl. ggf. Versandkosten</p>

        <LinkButton href="/kasse" variant="secondary" size="lg" className="mt-6 w-full">
          Zur Kasse
        </LinkButton>
        <LinkButton href="/kaffee" variant="ghost" size="md" className="mt-2 w-full">
          Weiter einkaufen
        </LinkButton>
      </div>
    </div>
  );
}
