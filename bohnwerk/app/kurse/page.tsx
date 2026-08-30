import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, MapPin, Users } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { courses } from '@/lib/data';
import { formatPrice } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Barista-Kurse — Live-Training in Hamburg',
  description: 'Espresso-Grundlagen, Latte Art, Filterkaffee-Masterclass und Profi-Zertifikat — buchbare Barista-Kurse in unserer Hamburger Rösterei.',
};

export default function CoursesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Start', href: '/' }, { label: 'Barista-Kurse' }]} />
      <div className="container container-px py-10">
        <p className="eyebrow text-copper-500">Wissen & Handwerk</p>
        <h1 className="mt-3 font-display text-display-md font-semibold text-ink-900">Barista-Kurse</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-500">
          Von den Grundlagen bis zum Profi-Zertifikat: Lernen Sie in kleinen Gruppen direkt in unserer Hamburger Rösterei.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => {
            const nextDate = c.dates.find((d) => d.seatsBooked < d.seatsTotal);
            return (
              <Link key={c.id} href={`/kurse/${c.slug}`} className="group block overflow-hidden rounded-2xl border border-ink-900/10 transition-shadow hover:shadow-soft">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={c.image} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full bg-cream-50/95 px-2.5 py-1 text-[11px] font-semibold uppercase text-espresso-900">{c.level}</span>
                </div>
                <div className="p-5">
                  <p className="font-display text-base font-semibold text-ink-900">{c.title}</p>
                  <p className="mt-2 text-sm text-ink-500">{c.description}</p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-ink-500">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {c.durationHours} Std.
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {c.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={12} /> max. {Math.max(...c.dates.map((d) => d.seatsTotal))}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-ink-900/10 pt-4">
                    <span className="font-display text-base font-semibold text-ink-900">{formatPrice(c.price)}</span>
                    <span className={`text-xs font-semibold ${nextDate ? 'text-emerald-700' : 'text-terracotta-600'}`}>{nextDate ? 'Plätze verfügbar' : 'Ausgebucht'}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
