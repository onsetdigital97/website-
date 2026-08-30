import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/LegalLayout';

export const metadata: Metadata = { title: 'Allgemeine Geschäftsbedingungen' };

export default function AGBPage() {
  return (
    <LegalLayout title="Allgemeine Geschäftsbedingungen" updated="30. August 2026">
      <p className="rounded-xl bg-copper-50 p-4 text-xs text-espresso-900">Platzhalterinhalt zu Demonstrationszwecken — vor Veröffentlichung juristisch prüfen lassen.</p>
      <h2>§ 1 Geltungsbereich</h2>
      <p>Diese Allgemeinen Geschäftsbedingungen gelten für alle Bestellungen über unseren Onlineshop, die von Verbraucherinnen und Verbrauchern sowie Unternehmen abgegeben werden.</p>
      <h2>§ 2 Vertragspartner, Vertragsschluss</h2>
      <p>
        Der Kaufvertrag kommt zustande mit der Bohnwerk GmbH. Die Darstellung der Produkte im Shop stellt kein bindendes Angebot dar. Mit Absenden der Bestellung geben
        Sie ein verbindliches Angebot ab, das wir durch Zusendung einer Bestellbestätigung annehmen.
      </p>
      <h2>§ 3 Preise und Versandkosten</h2>
      <p>Die angegebenen Preise verstehen sich als Endpreise inklusive der gesetzlichen Umsatzsteuer. Zusätzlich anfallende Versandkosten werden im Checkout ausgewiesen.</p>
      <h2>§ 4 Zahlung</h2>
      <p>Zahlungen können wahlweise per Kreditkarte, PayPal, Klarna oder SEPA-Lastschrift geleistet werden.</p>
      <h2>§ 5 Lieferung</h2>
      <p>Die Lieferzeiten sind auf der jeweiligen Produktseite angegeben. Bei Kaffeeprodukten erfolgt der Versand nach dem individuellen Röstdatum.</p>
      <h2>§ 6 Eigentumsvorbehalt</h2>
      <p>Die gelieferte Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.</p>
      <h2>§ 7 Kaffee-Abonnements</h2>
      <p>Abonnements verlängern sich automatisch um den gewählten Lieferzeitraum und können jederzeit im Kundenkonto pausiert oder gekündigt werden.</p>
      <h2>§ 8 Barista-Kurse</h2>
      <p>Kursbuchungen sind verbindlich. Eine kostenfreie Umbuchung ist bis 48 Stunden vor Kursbeginn möglich.</p>
      <h2>§ 9 Gewährleistung</h2>
      <p>Es gelten die gesetzlichen Gewährleistungsrechte.</p>
      <h2>§ 10 Schlussbestimmungen</h2>
      <p>Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.</p>
    </LegalLayout>
  );
}
