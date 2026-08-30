import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ProductListing } from '@/components/plp/ProductListing';
import { accessories } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Kaffee-Zubehör — Tamper, Waagen, Milchkännchen & mehr',
  description: 'Alles rund um die perfekte Tasse: Tamper, Präzisionswaagen, Milchkännchen, Reinigungsmittel und Filterzubehör.',
};

export default function ZubehoerPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Start', href: '/' }, { label: 'Zubehör' }]} />
      <div className="container container-px pt-10">
        <p className="eyebrow text-copper-500">Vervollständigen</p>
        <h1 className="mt-3 font-display text-display-md font-semibold text-ink-900">Zubehör</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-500">Von Tamper bis Präzisionswaage — das passende Werkzeug für Ihr Kaffeeritual.</p>
      </div>
      <Suspense>
        <ProductListing products={accessories} />
      </Suspense>
    </>
  );
}
