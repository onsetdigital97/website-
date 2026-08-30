import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Accordion } from '@/components/ui/Accordion';

export const metadata: Metadata = { title: 'FAQ — Häufige Fragen' };

const groups = [
  {
    title: 'Bestellung & Versand',
    items: [
      { question: 'Wie lange dauert die Lieferung?', answer: 'Kaffee wird innerhalb von 1–2 Werktagen nach Röstung versendet, Maschinen und Zubehör innerhalb von 2–4 Werktagen.' },
      { question: 'In welche Länder liefern Sie?', answer: 'Wir liefern aktuell nach Deutschland, Österreich und in die Schweiz.' },
      { question: 'Ab wann ist der Versand kostenlos?', answer: 'Ab einem Bestellwert von 39 € versenden wir kostenlos.' },
    ],
  },
  {
    title: 'Kaffee & Zubereitung',
    items: [
      { question: 'Wie finde ich den richtigen Kaffee für mich?', answer: 'Nutzen Sie unsere interaktive Kaffeeberatung auf der Startseite — in fünf Fragen zu Ihrer Empfehlung.' },
      { question: 'Wie lagere ich Kaffee richtig?', answer: 'Luftdicht, dunkel und bei Zimmertemperatur, am besten im Originalbeutel mit Aromaventil.' },
    ],
  },
  {
    title: 'Konto & Zahlung',
    items: [
      { question: 'Welche Zahlungsarten bieten Sie an?', answer: 'Kreditkarte, PayPal, Klarna und SEPA-Lastschrift.' },
      { question: 'Wie kann ich mein Abo verwalten?', answer: 'In Ihrem Kundenkonto unter „Kaffee-Abo" können Sie Ihr Abo jederzeit pausieren, anpassen oder kündigen.' },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Start', href: '/' }, { label: 'FAQ' }]} />
      <div className="container container-px py-10">
        <p className="eyebrow text-copper-500">Support</p>
        <h1 className="mt-3 font-display text-display-md font-semibold text-ink-900">Häufige Fragen</h1>
        <div className="mx-auto mt-10 max-w-3xl space-y-12">
          {groups.map((g) => (
            <div key={g.title}>
              <h2 className="font-display text-lg font-semibold text-ink-900">{g.title}</h2>
              <div className="mt-4">
                <Accordion items={g.items} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
