'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus, X } from 'lucide-react';
import { machines } from '@/lib/data';
import { LinkButton } from '@/components/ui/Button';
import { formatPrice, productHref } from '@/lib/utils';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

const machine = machines[0];

export function MachineShowcase() {
  const [active, setActive] = useState<string | null>(null);
  const activeHotspot = machine.hotspots.find((h) => h.id === active);

  return (
    <section className="bg-espresso-950 py-20 sm:py-28">
      <div className="container container-px">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="eyebrow text-copper-300">Technologie im Detail</p>
          <h2 className="mt-3 font-display text-display-md font-semibold text-cream-50 text-balance">{machine.name} — jedes Detail durchdacht</h2>
          <p className="mt-4 text-base text-cream-200/75">Tippen Sie auf die markierten Punkte, um mehr über Ausstattung und Technologie zu erfahren.</p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-lg overflow-hidden rounded-3xl bg-espresso-900">
            <Image src={machine.images[0]} alt={machine.name} fill className="object-cover" />
            {machine.hotspots.map((h) => (
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
            <div className="min-h-[180px] rounded-2xl border border-cream-50/10 bg-cream-50/5 p-6">
              {activeHotspot ? (
                <div className="animate-fade-in">
                  <p className="font-display text-lg font-semibold text-cream-50">{activeHotspot.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-cream-200/80">{activeHotspot.text}</p>
                </div>
              ) : (
                <p className="text-sm leading-relaxed text-cream-200/60">Wählen Sie einen Punkt auf dem Bild, um Ausstattungsmerkmale der {machine.name} zu entdecken.</p>
              )}
            </div>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {machine.hotspots.map((h) => (
                <li key={h.id}>
                  <button
                    type="button"
                    onClick={() => setActive(h.id)}
                    className={cn(
                      'w-full rounded-xl border px-3 py-2.5 text-left text-xs font-medium transition-colors',
                      active === h.id ? 'border-copper-400 bg-copper-500/10 text-copper-200' : 'border-cream-50/10 text-cream-200/70 hover:border-cream-50/30'
                    )}
                  >
                    {h.title}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-4">
              <span className="font-display text-xl font-semibold text-cream-50">{formatPrice(machine.price)}</span>
              <LinkButton href={productHref(machine)} variant="secondary" size="md">
                Produkt entdecken
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
