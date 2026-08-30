'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ZoomIn, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Gallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-sand-100 sm:aspect-[4/5]">
        <button type="button" onClick={() => setZoomOpen(true)} className="group relative block h-full w-full" aria-label="Bild vergrößern">
          <Image src={images[active]} alt={`${name} — Ansicht ${active + 1}`} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream-50/90 text-ink-900 opacity-0 shadow-soft transition-opacity group-hover:opacity-100">
            <ZoomIn size={16} />
          </span>
        </button>
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2.5">
          {images.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Bild ${i + 1} anzeigen`}
              aria-current={i === active}
              className={cn('relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors sm:h-20 sm:w-20', i === active ? 'border-copper-500' : 'border-transparent')}
            >
              <Image src={img} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {zoomOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-espresso-950/90 p-4" role="dialog" aria-modal="true" aria-label={`${name} vergrößert`}>
          <button type="button" onClick={() => setZoomOpen(false)} aria-label="Schließen" className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-cream-50/10 text-cream-50 hover:bg-cream-50/20">
            <X size={20} />
          </button>
          <div className="relative h-full max-h-[85vh] w-full max-w-3xl">
            <Image src={images[active]} alt={`${name} — vergrößert`} fill className="object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
