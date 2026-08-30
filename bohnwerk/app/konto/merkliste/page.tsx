'use client';

import { Heart } from 'lucide-react';
import { useShop } from '@/lib/store';
import { getProductsByIds } from '@/lib/data';
import { ProductCard } from '@/components/product/ProductCard';
import { LinkButton } from '@/components/ui/Button';

export default function WishlistPage() {
  const { wishlist } = useShop();
  const products = getProductsByIds(wishlist);

  return (
    <div>
      <h1 className="font-display text-display-sm font-semibold text-ink-900">Merkliste</h1>
      {products.length === 0 ? (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-ink-900/15 py-16 text-center">
          <Heart size={36} className="text-ink-300" />
          <p className="font-display text-lg font-semibold text-ink-900">Ihre Merkliste ist leer</p>
          <p className="max-w-sm text-sm text-ink-500">Speichern Sie Produkte mit dem Herz-Symbol, um sie später wiederzufinden.</p>
          <LinkButton href="/kaffee" variant="primary" size="sm">
            Kaffee entdecken
          </LinkButton>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
