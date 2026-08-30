import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ProductListing } from '@/components/plp/ProductListing';
import { machinesByCategory } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Kaffeemühlen kaufen — elektrisch & manuell',
  description: 'Präzisionsmühlen für Espresso und Filterkaffee: elektrische Kegelmühlen mit Dosierwaage und kompakte Handmühlen für unterwegs.',
};

export default function MuehlenPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Start', href: '/' }, { label: 'Mühlen' }]} />
      <div className="container container-px pt-10">
        <p className="eyebrow text-copper-500">Präzision</p>
        <h1 className="mt-3 font-display text-display-md font-semibold text-ink-900">Kaffeemühlen</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-500">
          Der Mahlgrad entscheidet über den Geschmack: Unsere Mühlen bieten feinste Abstufungen für Espresso, Filter und alles dazwischen.
        </p>
      </div>
      <Suspense>
        <ProductListing products={machinesByCategory('Mühlen')} />
      </Suspense>
    </>
  );
}
