'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/lib/types';
import { ProductCard } from '@/components/product/ProductCard';
import { Reveal } from '@/components/ui/Reveal';
import { LinkButton } from '@/components/ui/Button';

export function BestsellerSlider({ title, eyebrow, products, viewAllHref }: { title: string; eyebrow: string; products: Product[]; viewAllHref: string }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollBy(dir: 1 | -1) {
    scrollerRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  }

  return (
    <section className="bg-cream-50 py-20 sm:py-28">
      <div className="container container-px">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-copper-500">{eyebrow}</p>
            <h2 className="mt-3 font-display text-display-md font-semibold text-ink-900">{title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <LinkButton href={viewAllHref} variant="ghost" size="sm" className="hidden sm:inline-flex">
              Alle ansehen
            </LinkButton>
            <button type="button" onClick={() => scrollBy(-1)} aria-label="Zurück" className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/15 text-ink-700 hover:bg-ink-900/5 btn-focus-ring">
              <ChevronLeft size={18} />
            </button>
            <button type="button" onClick={() => scrollBy(1)} aria-label="Weiter" className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/15 text-ink-700 hover:bg-ink-900/5 btn-focus-ring">
              <ChevronRight size={18} />
            </button>
          </div>
        </Reveal>

        <div ref={scrollerRef} className="mt-8 flex snap-x gap-4 overflow-x-auto pb-4 no-scrollbar sm:gap-5">
          {products.map((p) => (
            <div key={p.id} className="w-[min(72vw,260px)] shrink-0 snap-start sm:w-[280px]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
        <LinkButton href={viewAllHref} variant="ghost" size="sm" className="mt-4 sm:hidden">
          Alle ansehen
        </LinkButton>
      </div>
    </section>
  );
}
