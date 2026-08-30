'use client';

import { useState } from 'react';
import { Heart, Minus, Plus, Zap, GitCompare, MessageCircle } from 'lucide-react';
import { MachineProduct } from '@/lib/types';
import { formatPrice, cn } from '@/lib/utils';
import { useShop } from '@/lib/store';
import { Rating } from '@/components/ui/Rating';
import { Button, LinkButton } from '@/components/ui/Button';

export function MachineBuyBox({ product }: { product: MachineProduct }) {
  const { addToCart, toggleWishlist, isWishlisted, toggleCompare, isComparing } = useShop();
  const [color, setColor] = useState(product.colors[0]?.id);
  const [quantity, setQuantity] = useState(1);

  const colorOption = product.colors.find((c) => c.id === color)!;
  const unitPrice = product.price + (colorOption?.priceModifier ?? 0);
  const wishlisted = isWishlisted(product.id);
  const comparing = isComparing(product.id);

  function handleAddToCart() {
    addToCart({ productId: product.id, slug: product.slug, name: product.name, image: product.images[0], price: unitPrice, quantity, variantLabel: colorOption?.label });
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
        <span className="font-display text-2xl font-semibold text-ink-900">{formatPrice(unitPrice)}</span>
        {product.compareAtPrice && <span className="text-sm text-ink-300 line-through">{formatPrice(product.compareAtPrice)}</span>}
      </div>
      {product.financingHint && <p className="mt-1 text-xs text-ink-400">{product.financingHint}</p>}

      <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-500">{product.shortDescription}</p>

      <div className={cn('mt-3 flex items-center gap-1.5 text-xs font-medium', product.inStock ? 'text-emerald-700' : 'text-terracotta-600')}>
        <span className={cn('h-1.5 w-1.5 rounded-full', product.inStock ? 'bg-emerald-600' : 'bg-terracotta-500')} />
        {product.inStock ? 'Auf Lager' : 'Ausverkauft'} · {product.leadTime}
      </div>

      {product.colors.length > 1 && (
        <div className="mt-6">
          <p className="text-sm font-medium text-ink-900">Farbe: {colorOption?.label}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c.id}
                type="button"
                disabled={!c.inStock}
                onClick={() => setColor(c.id)}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40',
                  color === c.id ? 'border-copper-500 bg-copper-500 text-cream-50' : 'border-ink-900/15 text-ink-700 hover:border-copper-400'
                )}
              >
                {c.label}
                {c.priceModifier > 0 && ` (+${formatPrice(c.priceModifier)})`}
              </button>
            ))}
          </div>
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

      <div className="mt-3 grid grid-cols-2 gap-2.5">
        <button type="button" className="flex items-center justify-center gap-2 rounded-full border border-ink-900/15 py-3 text-sm font-semibold text-ink-700 hover:bg-ink-900/5 btn-focus-ring">
          <Zap size={15} /> Express-Kauf
        </button>
        <LinkButton href="/kontakt" variant="outline-light" size="md" className="!border-ink-900/15 !text-ink-700 hover:!bg-ink-900/5">
          <MessageCircle size={15} /> Beratung
        </LinkButton>
      </div>

      <button
        type="button"
        onClick={() => toggleCompare(product.id)}
        aria-pressed={comparing}
        className={cn('mt-3 flex w-full items-center justify-center gap-2 rounded-full border py-2.5 text-sm font-medium btn-focus-ring', comparing ? 'border-copper-500 bg-copper-50 text-copper-700' : 'border-ink-900/15 text-ink-500 hover:bg-ink-900/5')}
      >
        <GitCompare size={15} /> {comparing ? 'Zum Vergleich hinzugefügt' : 'Zum Vergleich hinzufügen'}
      </button>
    </div>
  );
}
