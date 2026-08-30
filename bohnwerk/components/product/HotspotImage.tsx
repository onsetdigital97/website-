'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus, X } from 'lucide-react';
import { MachineProduct } from '@/lib/types';
import { cn } from '@/lib/utils';

export function HotspotImage({ product }: { product: MachineProduct }) {
  const [active, setActive] = useState<string | null>(null);
  if (product.hotspots.length === 0) return null;
  const activeHotspot = product.hotspots.find((h) => h.id === active);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
      <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl bg-espresso-950">
        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
        {product.hotspots.map((h) => (
          <button
            key={h.id}
            type="button"
            onClick={() => setActive(active === h.id ? null : h.id)}
            aria-label={h.title}
            aria-pressed={active === h.id}
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <span className={cn('absolute inset-0 -m-2 rounded-full bg-copper-400/40', active === h.id ? 'animate-ping' : 'hidden')} aria-hidden="true" />
            <span
              className={cn(
                'relative flex h-8 w-8 items-center justify-center rounded-full border-2 shadow-lift transition-colors',
                active === h.id ? 'border-copper-400 bg-copper-500 text-cream-50' : 'border-cream-50 bg-cream-50/90 text-espresso-900'
              )}
            >
              {active === h.id ? <X size={15} /> : <Plus size={15} />}
            </span>
          </button>
        ))}
      </div>
      <div>
        <div className="min-h-[140px] rounded-2xl border border-ink-900/10 bg-sand-100 p-6">
          {activeHotspot ? (
            <div className="animate-fade-in">
              <p className="font-display text-lg font-semibold text-ink-900">{activeHotspot.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{activeHotspot.text}</p>
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-ink-500">Wählen Sie einen markierten Punkt, um mehr über die Ausstattung zu erfahren.</p>
          )}
        </div>
        <ul className="mt-4 grid grid-cols-2 gap-2">
          {product.hotspots.map((h) => (
            <li key={h.id}>
              <button
                type="button"
                onClick={() => setActive(h.id)}
                className={cn(
                  'w-full rounded-xl border px-3 py-2.5 text-left text-xs font-medium transition-colors',
                  active === h.id ? 'border-copper-500 bg-copper-50 text-copper-700' : 'border-ink-900/10 text-ink-600 hover:border-copper-300'
                )}
              >
                {h.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
