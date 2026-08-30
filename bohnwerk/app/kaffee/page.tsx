import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ProductListing } from '@/components/plp/ProductListing';
import { Accordion } from '@/components/ui/Accordion';
import { coffees } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Kaffee kaufen — Espresso, Filterkaffee & Single Origin',
  description: 'Entdecken Sie unser Kaffeesortiment: Espresso, Filterkaffee, Single Origin, Blends, Entkoffeiniert, Probierpakete und Limited Editions. Frisch geröstet, schnell geliefert.',
};

const faqs = [
  { question: 'Wie schnell wird mein Kaffee geliefert?', answer: 'Wir rösten wöchentlich frisch und versenden innerhalb von 1–2 Werktagen nach Röstung.' },
  { question: 'Kann ich den Mahlgrad wählen?', answer: 'Ja, auf jeder Produktseite können Sie zwischen ganzer Bohne und verschiedenen Mahlgraden wählen.' },
  { question: 'Bieten Sie auch entkoffeinierten Kaffee an?', answer: 'Ja, unser Espresso Entkoffeiniert wird schonend im CO₂-Verfahren entkoffeiniert und verliert dabei kaum an Aroma.' },
];

export default function KaffeePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Start', href: '/' }, { label: 'Kaffee' }]} />
      <div className="container container-px pt-10">
        <p className="eyebrow text-copper-500">Sortiment</p>
        <h1 className="mt-3 font-display text-display-md font-semibold text-ink-900">Kaffee</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-500">
          Von samtigem Espresso bis klarem Filterkaffee: Jede Röstung wird in kleinen Chargen in unserer Hamburger Rösterei produziert und direkt nach dem Röstdatum
          versendet. Nutzen Sie die Filter, um Ihre ideale Tasse anhand von Zubereitungsart, Röstgrad und Intensität zu finden.
        </p>
      </div>
      <Suspense>
        <ProductListing products={coffees} showCoffeeFilters />
      </Suspense>
      <div className="container container-px pb-20">
        <h2 className="font-display text-display-sm font-semibold text-ink-900">Häufige Fragen zu unserem Kaffee</h2>
        <div className="mt-6">
          <Accordion items={faqs} />
        </div>
      </div>
    </>
  );
}
