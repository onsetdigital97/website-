'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye, Plus } from 'lucide-react';
import { Product } from '@/lib/types';
import { Rating } from '@/components/ui/Rating';
import { Badge } from '@/components/ui/Badge';
import { formatPrice, productHref, cn } from '@/lib/utils';
import { useShop } from '@/lib/store';

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const { addToCart, toggleWishlist, isWishlisted, openQuickView } = useShop();
  const [hovered, setHovered] = useState(false);
  const href = productHref(product);
  const secondImage = product.images[1];
  const wishlisted = isWishlisted(product.id);
  const discount = product.compareAtPrice ? Math.round(100 - (product.price / product.compareAtPrice) * 100) : 0;

  return (
    <div
      className={cn('group relative flex flex-col', className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand-100">
        <Link href={href} className="block h-full w-full" aria-label={product.name}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 90vw"
            className={cn('object-cover transition-opacity duration-500', hovered && secondImage ? 'opacity-0' : 'opacity-100')}
          />
          {secondImage && (
            <Image
              src={secondImage}
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 90vw"
              className={cn('object-cover transition-opacity duration-500', hovered ? 'opacity-100' : 'opacity-0')}
            />
          )}
        </Link>

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badges?.map((b) => (
            <Badge key={b} tone={b === 'Sparpaket' || b === 'Limitiert' ? 'sale' : 'copper'}>
              {b}
            </Badge>
          ))}
          {discount > 0 && <Badge tone="sale">-{discount}%</Badge>}
        </div>

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={wishlisted}
          aria-label={wishlisted ? 'Von Merkliste entfernen' : 'Zur Merkliste hinzufügen'}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream-50/90 text-ink-900 shadow-soft transition-transform hover:scale-105 btn-focus-ring"
        >
          <Heart size={16} className={cn(wishlisted && 'fill-terracotta-500 text-terracotta-500')} />
        </button>

        <div
          className={cn(
            'absolute inset-x-3 bottom-3 flex gap-2 transition-all duration-300',
            'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0'
          )}
        >
          <button
            type="button"
            onClick={() =>
              addToCart({
                productId: product.id,
                slug: product.slug,
                name: product.name,
                image: product.images[0],
                price: product.price,
                quantity: 1,
              })
            }
            disabled={!product.inStock}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-espresso-900 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-cream-50 transition-colors hover:bg-espresso-800 disabled:opacity-40 btn-focus-ring"
          >
            <Plus size={14} /> In den Warenkorb
          </button>
          <button
            type="button"
            onClick={() => openQuickView(product)}
            aria-label="Schnellansicht"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream-50 text-ink-900 shadow-soft btn-focus-ring"
          >
            <Eye size={16} />
          </button>
        </div>
      </div>

      <div className="mt-3.5 flex flex-1 flex-col">
        <p className="eyebrow text-ink-300">{product.category}</p>
        <Link href={href} className="mt-1 font-display text-sm font-semibold text-ink-900 hover:text-copper-600">
          {product.name}
        </Link>
        <Rating value={product.rating} count={product.reviewCount} className="mt-1.5" />
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-display text-base font-semibold text-ink-900">{formatPrice(product.price)}</span>
          {product.compareAtPrice && <span className="text-sm text-ink-300 line-through">{formatPrice(product.compareAtPrice)}</span>}
        </div>
        {!product.inStock && <p className="mt-1 text-xs font-medium text-terracotta-600">Ausverkauft</p>}
      </div>
    </div>
  );
}
