'use client';

import { useShop } from '@/lib/store';
import { getProductsByIds } from '@/lib/data';
import { RelatedProducts } from './RelatedProducts';

export function RecentlyViewed({ excludeId }: { excludeId?: string }) {
  const { recentlyViewed } = useShop();
  const products = getProductsByIds(recentlyViewed.filter((id) => id !== excludeId)).slice(0, 4);
  if (products.length === 0) return null;
  return <RelatedProducts title="Zuletzt angesehen" products={products} />;
}
