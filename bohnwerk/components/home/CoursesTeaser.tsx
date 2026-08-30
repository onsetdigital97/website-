import Image from 'next/image';
import Link from 'next/link';
import { Clock, MapPin } from 'lucide-react';
import { courses } from '@/lib/data';
import { LinkButton } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { formatPrice } from '@/lib/utils';

export function CoursesTeaser() {
  return (
    <section className="bg-cream-50 py-20 sm:py-28">
      <div className="container container-px">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-copper-500">Barista-Kurse</p>
            <h2 className="mt-3 font-display text-display-md font-semibold text-ink-900">Vom Rohstoff zur perfekten Tasse</h2>
          </div>
          <LinkButton href="/kurse" variant="ghost" size="sm">
            Alle Kurse ansehen
          </LinkButton>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((c, i) => {
            const nextDate = c.dates.find((d) => d.seatsBooked < d.seatsTotal);
            return (
              <Reveal key={c.id} delay={i * 60}>
                <Link href={`/kurse/${c.slug}`} className="group block overflow-hidden rounded-2xl border border-ink-900/10 bg-cream-50 transition-shadow hover:shadow-soft">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={c.image} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <p className="eyebrow text-copper-500">{c.level}</p>
                    <p className="mt-1 font-display text-sm font-semibold text-ink-900">{c.title}</p>
                    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-500">
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {c.durationHours} Std.
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> Hamburg
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-display text-sm font-semibold text-ink-900">{formatPrice(c.price)}</span>
                      <span className="text-xs font-medium text-copper-600">{nextDate ? 'Plätze frei' : 'Ausgebucht'}</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
