'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { MachineProduct } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { useShop } from '@/lib/store';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function StickyBuyBar({ product }: { product: MachineProduct }) {
  const [visible, setVisible] = useState(false);
  const { addToCart } = useShop();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-ink-900/10 bg-cream-50/95 backdrop-blur transition-transform duration-300 ease-smooth',
        visible ? 'translate-y-0' : 'translate-y-full'
      )}
      aria-hidden={!visible}
    >
      <div className="container flex items-center justify-between gap-4 py-3 container-px">
        <div className="flex items-center gap-3">
          <div className="relative hidden h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-sand-100 sm:block">
            <Image src={product.images[0]} alt="" fill className="object-cover" />
          </div>
          <div>
            <p className="font-display text-sm font-semibold text-ink-900">{product.name}</p>
            <p className="text-sm text-ink-500">{formatPrice(product.price)}</p>
          </div>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => addToCart({ productId: product.id, slug: product.slug, name: product.name, image: product.images[0], price: product.price, quantity: 1 })}
          disabled={!product.inStock}
        >
          In den Warenkorb
        </Button>
      </div>
    </div>
  );
}
