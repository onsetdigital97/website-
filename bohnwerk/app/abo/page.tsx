import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { AboConfigurator } from './AboConfigurator';
import { Accordion } from '@/components/ui/Accordion';

export const metadata: Metadata = {
  title: 'Kaffee-Abo — Der Bohnwerk Zirkel',
  description: 'Ihr flexibles Kaffee-Abo: freie Sortenwahl, individuelles Lieferintervall, jederzeit pausierbar oder kündbar. Bis zu 20 % Abo-Vorteil.',
};

const faqs = [
  { question: 'Kann ich mein Abo jederzeit pausieren?', answer: 'Ja, Sie können Ihr Abo jederzeit in Ihrem Kundenkonto pausieren, anpassen oder kündigen — ohne Mindestlaufzeit.' },
  { question: 'Wie wähle ich meine Kaffeesorte?', answer: 'Sie können bei jeder Lieferung frei wählen oder sich für unsere kuratierte Sortenrotation entscheiden.' },
  { question: 'Wann wird meine Karte belastet?', answer: 'Die Zahlung erfolgt jeweils 2 Tage vor dem Versand der nächsten Lieferung.' },
];

export default function AboPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Start', href: '/' }, { label: 'Kaffee-Abo' }]} />
      <div className="container container-px py-10">
        <p className="eyebrow text-copper-500">Der Bohnwerk Zirkel</p>
        <h1 className="mt-3 font-display text-display-md font-semibold text-ink-900 text-balance">Ihr Kaffee-Abo, ganz nach Ihrem Rhythmus</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-500">
          Wählen Sie Paket, Sorte, Mahlgrad, Menge und Lieferintervall — jederzeit änderbar, pausierbar oder kündbar. Kein Risiko, volle Kontrolle.
        </p>
      </div>
      <AboConfigurator />
      <div className="container container-px pb-20 pt-10">
        <h2 className="font-display text-display-sm font-semibold text-ink-900">Häufige Fragen zum Abo</h2>
        <div className="mt-6">
          <Accordion items={faqs} />
        </div>
      </div>
    </>
  );
}
