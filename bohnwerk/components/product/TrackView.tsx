'use client';

import { useEffect } from 'react';
import { useShop } from '@/lib/store';

export function TrackView({ productId }: { productId: string }) {
  const { addRecentlyViewed } = useShop();
  useEffect(() => {
    addRecentlyViewed(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);
  return null;
}
