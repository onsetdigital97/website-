import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

const ranges = [
  { label: 'Espresso', desc: 'Dicht, süß, mit dichter Crema', href: '/kaffee?kategorie=Espresso' },
  { label: 'Filterkaffee', desc: 'Klar, aromatisch, bekömmlich', href: '/kaffee?kategorie=Filterkaffee' },
  { label: 'Single Origin', desc: 'Charaktervolle Herkunftskaffees', href: '/kaffee?kategorie=Single+Origin' },
  { label: 'Blends', desc: 'Ausbalancierte Kompositionen', href: '/kaffee?kategorie=Blends' },
  { label: 'Entkoffeiniert', desc: 'Voller Geschmack, ohne Koffein', href: '/kaffee?kategorie=Entkoffeiniert' },
  { label: 'Probierpakete', desc: 'Mehrere Röstungen entdecken', href: '/kaffee?kategorie=Probierpakete' },
  { label: 'Limited Editions', desc: 'Seltene Mikrolos-Röstungen', href: '/kaffee?kategorie=Limited+Edition' },
];

export function CoffeeRangeTeaser() {
  return (
    <section className="bg-sand-100 py-20 sm:py-28">
      <div className="container container-px">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-copper-500">Kaffee-Sortiment</p>
            <h2 className="mt-3 font-display text-display-md font-semibold text-ink-900">Röstungen für jeden Anspruch</h2>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ranges.map((r, i) => (
            <Reveal key={r.label} delay={i * 50}>
              <Link
                href={r.href}
                className="group flex h-full flex-col justify-between rounded-2xl border border-ink-900/10 bg-cream-50 p-6 transition-all hover:border-copper-400 hover:shadow-soft"
              >
                <div>
                  <p className="font-display text-lg font-semibold text-ink-900">{r.label}</p>
                  <p className="mt-1.5 text-sm text-ink-500">{r.desc}</p>
                </div>
                <span className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-copper-600">
                  Entdecken <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
