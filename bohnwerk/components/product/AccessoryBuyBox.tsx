'use client';

import { useState } from 'react';
import { Heart, Minus, Plus } from 'lucide-react';
import { AccessoryProduct } from '@/lib/types';
import { formatPrice, cn } from '@/lib/utils';
import { useShop } from '@/lib/store';
import { Rating } from '@/components/ui/Rating';
import { Button } from '@/components/ui/Button';

export function AccessoryBuyBox({ product }: { product: AccessoryProduct }) {
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const [quantity, setQuantity] = useState(1);
  const wishlisted = isWishlisted(product.id);

  return (
    <div>
      <p className="eyebrow text-copper-500">{product.category}</p>
      <h1 className="mt-1.5 font-display text-display-sm font-semibold text-ink-900">{product.name}</h1>
      <div className="mt-2 flex items-center gap-3">
        <Rating value={product.rating} count={product.reviewCount} />
      </div>
      <div className="mt-4 flex items-baseline gap-3">
        <span className="font-display text-2xl font-semibold text-ink-900">{formatPrice(product.price)}</span>
        {product.compareAtPrice && <span className="text-sm text-ink-300 line-through">{formatPrice(product.compareAtPrice)}</span>}
      </div>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-500">{product.shortDescription}</p>
      <div className={cn('mt-3 flex items-center gap-1.5 text-xs font-medium', product.inStock ? 'text-emerald-700' : 'text-terracotta-600')}>
        <span className={cn('h-1.5 w-1.5 rounded-full', product.inStock ? 'bg-emerald-600' : 'bg-terracotta-500')} />
        {product.inStock ? 'Auf Lager' : 'Ausverkauft'} · {product.leadTime}
      </div>

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
        <Button
          variant="primary"
          size="lg"
          className="flex-1"
          disabled={!product.inStock}
          onClick={() => addToCart({ productId: product.id, slug: product.slug, name: product.name, image: product.images[0], price: product.price, quantity })}
        >
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
    </div>
  );
}
