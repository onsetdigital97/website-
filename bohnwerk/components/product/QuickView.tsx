'use client';

import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useShop } from '@/lib/store';
import { formatPrice, productHref } from '@/lib/utils';
import { Rating } from '@/components/ui/Rating';
import { Button, LinkButton } from '@/components/ui/Button';

export function QuickView() {
  const { quickViewProduct: p, closeQuickView, addToCart } = useShop();
  if (!p) return null;

  return (
    <>
      <div className="fixed inset-0 z-[110] bg-espresso-950/60" onClick={closeQuickView} aria-hidden="true" />
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={p.name}>
        <div className="relative grid max-h-[90vh] w-full max-w-3xl grid-cols-1 overflow-y-auto rounded-2xl bg-cream-50 shadow-lift sm:grid-cols-2">
          <button
            type="button"
            onClick={closeQuickView}
            aria-label="Schließen"
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-cream-50/90 text-ink-900 shadow-soft btn-focus-ring"
          >
            <X size={18} />
          </button>
          <div className="relative aspect-square bg-sand-100 sm:aspect-auto">
            <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
          </div>
          <div className="flex flex-col p-6 sm:p-8">
            <p className="eyebrow text-ink-300">{p.category}</p>
            <h3 className="mt-1 font-display text-xl font-semibold text-ink-900">{p.name}</h3>
            <Rating value={p.rating} count={p.reviewCount} className="mt-2" />
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-lg font-semibold text-ink-900">{formatPrice(p.price)}</span>
              {p.compareAtPrice && <span className="text-sm text-ink-300 line-through">{formatPrice(p.compareAtPrice)}</span>}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-500">{p.shortDescription}</p>
            <div className="mt-6 flex flex-col gap-2.5">
              <Button
                variant="primary"
                onClick={() => {
                  addToCart({ productId: p.id, slug: p.slug, name: p.name, image: p.images[0], price: p.price, quantity: 1 });
                  closeQuickView();
                }}
                disabled={!p.inStock}
              >
                {p.inStock ? 'In den Warenkorb' : 'Ausverkauft'}
              </Button>
              <LinkButton href={productHref(p)} variant="ghost" onClick={closeQuickView}>
                Alle Details ansehen
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
