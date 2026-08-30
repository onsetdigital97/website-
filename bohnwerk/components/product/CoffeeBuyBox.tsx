'use client';

import { useMemo, useState } from 'react';
import { Heart, Minus, Plus, Zap } from 'lucide-react';
import { CoffeeProduct } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { useShop } from '@/lib/store';
import { Rating } from '@/components/ui/Rating';
import { Button } from '@/components/ui/Button';
import { subscriptionIntervals } from '@/lib/data';
import { cn } from '@/lib/utils';

export function CoffeeBuyBox({ product }: { product: CoffeeProduct }) {
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const [grind, setGrind] = useState(product.grindOptions[0]?.id);
  const [size, setSize] = useState(product.sizeOptions[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState<'once' | 'sub'>('once');
  const [interval, setInterval] = useState(subscriptionIntervals[1].id);

  const sizeOption = product.sizeOptions.find((s) => s.id === size)!;
  const grindOption = product.grindOptions.find((g) => g.id === grind)!;
  const unitPrice = product.price + (sizeOption?.priceModifier ?? 0);
  const subDiscount = purchaseType === 'sub' ? 0.9 : 1;
  const finalUnitPrice = unitPrice * subDiscount;
  const wishlisted = isWishlisted(product.id);

  const variantLabel = useMemo(() => `${sizeOption?.label} · ${grindOption?.label}`, [sizeOption, grindOption]);

  function handleAddToCart() {
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: finalUnitPrice,
      quantity,
      variantLabel,
      isSubscription: purchaseType === 'sub',
      interval: purchaseType === 'sub' ? subscriptionIntervals.find((i) => i.id === interval)?.label : undefined,
    });
  }

  return (
    <div>
      <p className="eyebrow text-copper-500">{product.category}</p>
      <h1 className="mt-1.5 font-display text-display-sm font-semibold text-ink-900">{product.name}</h1>
      <div className="mt-2 flex items-center gap-3">
        <Rating value={product.rating} count={product.reviewCount} />
        <a href="#bewertungen" className="text-xs font-medium text-copper-600 hover:underline">
          Bewertungen ansehen
        </a>
      </div>

      <div className="mt-4 flex items-baseline gap-3">
        <span className="font-display text-2xl font-semibold text-ink-900">{formatPrice(finalUnitPrice)}</span>
        {purchaseType === 'sub' && <span className="text-sm text-ink-300 line-through">{formatPrice(unitPrice)}</span>}
        <span className="text-sm text-ink-400">· Grundpreis {formatPrice(product.pricePerKg)}/kg</span>
      </div>

      <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-500">{product.shortDescription}</p>

      <div className={cn('mt-3 flex items-center gap-1.5 text-xs font-medium', product.inStock ? 'text-emerald-700' : 'text-terracotta-600')}>
        <span className={cn('h-1.5 w-1.5 rounded-full', product.inStock ? 'bg-emerald-600' : 'bg-terracotta-500')} />
        {product.inStock ? 'Auf Lager' : 'Ausverkauft'} · {product.leadTime}
      </div>

      <div className="mt-6">
        <p className="text-sm font-medium text-ink-900">Packungsgröße</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.sizeOptions.map((s) => (
            <button
              key={s.id}
              type="button"
              disabled={!s.inStock}
              onClick={() => setSize(s.id)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40',
                size === s.id ? 'border-copper-500 bg-copper-500 text-cream-50' : 'border-ink-900/15 text-ink-700 hover:border-copper-400'
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm font-medium text-ink-900">Ganze Bohne oder Mahlgrad</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.grindOptions.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setGrind(g.id)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                grind === g.id ? 'border-copper-500 bg-copper-500 text-cream-50' : 'border-ink-900/15 text-ink-700 hover:border-copper-400'
              )}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {product.subscribable && (
        <div className="mt-6 rounded-2xl border border-ink-900/10 p-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPurchaseType('once')}
              className={cn('flex-1 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors', purchaseType === 'once' ? 'bg-espresso-900 text-cream-50' : 'bg-ink-900/5 text-ink-700')}
            >
              Einmalkauf
            </button>
            <button
              type="button"
              onClick={() => setPurchaseType('sub')}
              className={cn('flex-1 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors', purchaseType === 'sub' ? 'bg-copper-500 text-cream-50' : 'bg-ink-900/5 text-ink-700')}
            >
              Abo (–10%)
            </button>
          </div>
          {purchaseType === 'sub' && (
            <div className="mt-4">
              <p className="text-xs font-medium text-ink-700">Lieferintervall</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {subscriptionIntervals.map((iv) => (
                  <button
                    key={iv.id}
                    type="button"
                    onClick={() => setInterval(iv.id)}
                    className={cn(
                      'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                      interval === iv.id ? 'border-copper-500 bg-copper-50 text-copper-700' : 'border-ink-900/15 text-ink-600'
                    )}
                  >
                    {iv.label}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-ink-500">Jederzeit pausierbar oder kündbar.</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="flex items-center justify-center rounded-full border border-ink-900/15">
          <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="flex h-12 w-12 items-center justify-center text-ink-700 btn-focus-ring" aria-label="Menge verringern">
            <Minus size={16} />
          </button>
          <span className="w-8 text-center text-sm font-semibold" aria-live="polite">
            {quantity}
          </span>
          <button type="button" onClick={() => setQuantity((q) => q + 1)} className="flex h-12 w-12 items-center justify-center text-ink-700 btn-focus-ring" aria-label="Menge erhöhen">
            <Plus size={16} />
          </button>
        </div>
        <Button variant="primary" size="lg" className="flex-1" onClick={handleAddToCart} disabled={!product.inStock}>
          {product.inStock ? 'In den Warenkorb' : 'Ausverkauft'}
        </Button>
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={wishlisted}
          aria-label="Zur Merkliste hinzufügen"
          className="flex h-12 w-12 shrink-0 items-center justify-center self-center rounded-full border border-ink-900/15 text-ink-700 hover:border-terracotta-400 btn-focus-ring"
        >
          <Heart size={18} className={cn(wishlisted && 'fill-terracotta-500 text-terracotta-500')} />
        </button>
      </div>

      <button type="button" className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-ink-900/15 py-3 text-sm font-semibold text-ink-700 hover:bg-ink-900/5 btn-focus-ring">
        <Zap size={15} /> Express-Kauf mit Apple Pay / PayPal
      </button>

      <TrustBadgesInline />
    </div>
  );
}

function TrustBadgesInline() {
  return (
    <p className="mt-4 text-xs text-ink-400">Versand innerhalb Deutschlands · 14 Tage Rückgaberecht · Sichere Zahlung via SSL-Verschlüsselung</p>
  );
}
