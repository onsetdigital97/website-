import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/LegalLayout';

export const metadata: Metadata = { title: 'Impressum' };

export default function ImpressumPage() {
  return (
    <LegalLayout title="Impressum">
      <p className="rounded-xl bg-copper-50 p-4 text-xs text-espresso-900">
        Platzhalterinhalt: Bitte vor Veröffentlichung durch die tatsächlichen Unternehmensangaben gemäß § 5 TMG ersetzen.
      </p>
      <h2>Angaben gemäß § 5 TMG</h2>
      <p>
        Bohnwerk GmbH
        <br />
        Speicherstraße 12
        <br />
        20457 Hamburg
        <br />
        Deutschland
      </p>
      <h2>Vertreten durch</h2>
      <p>Geschäftsführung: [Name der Geschäftsführung]</p>
      <h2>Kontakt</h2>
      <p>
        Telefon: [Telefonnummer]
        <br />
        E-Mail: hallo@bohnwerk.de
      </p>
      <h2>Registereintrag</h2>
      <p>
        Eintragung im Handelsregister
        <br />
        Registergericht: Amtsgericht Hamburg
        <br />
        Registernummer: [HRB-Nummer]
      </p>
      <h2>Umsatzsteuer-ID</h2>
      <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: [USt-IdNr.]</p>
      <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
      <p>[Name, Anschrift wie oben]</p>
      <h2>EU-Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/. Unsere E-Mail-Adresse finden Sie oben im Impressum.
      </p>
      <h2>Verbraucherstreitbeilegung</h2>
      <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
    </LegalLayout>
  );
}
