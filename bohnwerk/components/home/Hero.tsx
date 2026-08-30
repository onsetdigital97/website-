'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LinkButton } from '@/components/ui/Button';
import { img } from '@/lib/data/images';
import { cn } from '@/lib/utils';

const slides = [
  {
    image: img.heroMachine,
    eyebrow: 'Neue Kollektion',
    title: (
      <>
        Kaffee, der sich anfühlt
        <br />
        wie <span className="text-copper-400">Handwerk</span>.
      </>
    ),
    text: 'Präzisionsgeröstete Spezialitätenkaffees und durchdachte Maschinen für Ihr persönliches Ritual.',
  },
  {
    image: img.baristaPour,
    eyebrow: 'Barista-Qualität zu Hause',
    title: (
      <>
        Jede Tasse eine
        <br />
        kleine <span className="text-copper-400">Zeremonie</span>.
      </>
    ),
    text: 'Von der Bohne bis zur Crema: Unsere Maschinen bringen Café-Niveau in Ihre Küche.',
  },
  {
    image: img.farmRegion,
    eyebrow: 'Direkter Ursprung',
    title: (
      <>
        Von der Farm direkt
        <br />
        in Ihre <span className="text-copper-400">Röstung</span>.
      </>
    ),
    text: 'Wir arbeiten mit ausgewählten Erzeugerinnen und Erzeugern für außergewöhnliche Aromen.',
  },
];

export function Hero() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative h-[92vh] min-h-[560px] w-full overflow-hidden bg-espresso-950" aria-label="Vorgestellte Kollektionen">
      {slides.map((slide, i) => (
        <div key={i} className={cn('absolute inset-0 transition-opacity duration-1000 ease-smooth', i === active ? 'opacity-100' : 'opacity-0 pointer-events-none')}>
          <Image src={slide.image} alt="" fill priority={i === 0} className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/40 to-espresso-950/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-espresso-950/70 via-transparent to-transparent" />
        </div>
      ))}

      <div className="relative z-10 flex h-full flex-col justify-end pb-24 pt-32 sm:justify-center sm:pb-0">
        <div className="container container-px">
          <div className="max-w-xl">
            {slides.map((slide, i) => (
              <div key={i} className={cn('transition-all duration-700 ease-smooth', i === active ? 'opacity-100 translate-y-0' : 'absolute opacity-0 translate-y-3 pointer-events-none')}>
                {i === active && (
                  <>
                    <p className="eyebrow text-copper-300">{slide.eyebrow}</p>
                    <h1 className="mt-4 font-display text-display-xl font-bold text-cream-50 text-balance">{slide.title}</h1>
                    <p className="mt-5 max-w-md text-base leading-relaxed text-cream-200/85">{slide.text}</p>
                  </>
                )}
              </div>
            ))}
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/kaffee" variant="secondary" size="lg">
                Kaffee entdecken
              </LinkButton>
              <LinkButton href="/maschinen" variant="outline-light" size="lg">
                Maschinen entdecken
              </LinkButton>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex items-center justify-center gap-4 sm:bottom-10 sm:justify-between sm:px-8 lg:px-16">
        <button
          type="button"
          onClick={() => setActive((a) => (a - 1 + slides.length) % slides.length)}
          aria-label="Vorheriges Bild"
          className="hidden h-11 w-11 items-center justify-center rounded-full border border-cream-50/30 text-cream-50 transition-colors hover:bg-cream-50/10 sm:flex btn-focus-ring"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Slide ${i + 1} anzeigen`}
              aria-current={i === active}
              className={cn('h-1.5 rounded-full transition-all duration-300', i === active ? 'w-8 bg-copper-400' : 'w-1.5 bg-cream-50/40')}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setActive((a) => (a + 1) % slides.length)}
          aria-label="Nächstes Bild"
          className="hidden h-11 w-11 items-center justify-center rounded-full border border-cream-50/30 text-cream-50 transition-colors hover:bg-cream-50/10 sm:flex btn-focus-ring"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
