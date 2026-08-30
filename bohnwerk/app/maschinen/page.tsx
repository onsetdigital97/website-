import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ProductListing } from '@/components/plp/ProductListing';
import { Accordion } from '@/components/ui/Accordion';
import { machines } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Espressomaschinen & Siebträger kaufen',
  description: 'Kaffeevollautomaten und Siebträgermaschinen für Zuhause und Büro. Präzise Temperatursteuerung, integriertes Mahlwerk, 2–4 Werktage Lieferzeit.',
};

const faqs = [
  { question: 'Vollautomat oder Siebträger — was passt zu mir?', answer: 'Vollautomaten sind komfortabler im Alltag, Siebträger bieten mehr Kontrolle über jeden Brühparameter. Unsere Kaufberatung hilft bei der Entscheidung.' },
  { question: 'Ist Zubehör im Lieferumfang enthalten?', answer: 'Der genaue Lieferumfang ist auf jeder Produktseite aufgeführt — meist inklusive Grundzubehör wie Wasserfilter oder Tamper.' },
  { question: 'Wie lange ist die Garantie?', answer: 'Je nach Modell gewähren wir 2–3 Jahre Herstellergarantie, Details finden Sie auf der jeweiligen Produktseite.' },
];

export default function MaschinenPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Start', href: '/' }, { label: 'Espressomaschinen' }]} />
      <div className="container container-px pt-10">
        <p className="eyebrow text-copper-500">Technologie</p>
        <h1 className="mt-3 font-display text-display-md font-semibold text-ink-900">Espressomaschinen</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-500">
          Vollautomaten und Siebträgermaschinen, entwickelt für Café-Qualität zu Hause — mit präziser Temperatursteuerung, integriertem Mahlwerk und durchdachter Bedienung.
        </p>
      </div>
      <Suspense>
        <ProductListing products={machines.filter((m) => m.category !== 'Mühlen')} />
      </Suspense>
      <div className="container container-px pb-20">
        <h2 className="font-display text-display-sm font-semibold text-ink-900">Häufige Fragen zu Espressomaschinen</h2>
        <div className="mt-6">
          <Accordion items={faqs} />
        </div>
      </div>
    </>
  );
}
