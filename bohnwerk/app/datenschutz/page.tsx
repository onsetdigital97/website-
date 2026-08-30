import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/LegalLayout';

export const metadata: Metadata = { title: 'Datenschutzerklärung' };

export default function DatenschutzPage() {
  return (
    <LegalLayout title="Datenschutzerklärung" updated="30. August 2026">
      <p className="rounded-xl bg-copper-50 p-4 text-xs text-espresso-900">
        Platzhalterinhalt: Diese Vorlage ersetzt keine rechtliche Prüfung. Bitte vor Veröffentlichung durch eine Datenschutzkanzlei prüfen lassen.
      </p>
      <h2>1. Verantwortlicher</h2>
      <p>
        Bohnwerk GmbH, Speicherstraße 12, 20457 Hamburg, E-Mail: datenschutz@bohnwerk.de. Bei Fragen zum Datenschutz erreichen Sie uns jederzeit über die oben genannte
        E-Mail-Adresse.
      </p>
      <h2>2. Verarbeitung Ihrer Daten beim Besuch unseres Shops</h2>
      <p>
        Beim Aufruf unserer Website erheben wir automatisch technische Daten (u. a. IP-Adresse, Browsertyp, aufgerufene Seiten) zur Bereitstellung und Absicherung des
        Angebots gemäß Art. 6 Abs. 1 lit. f DSGVO.
      </p>
      <h2>3. Bestellung und Vertragsabwicklung</h2>
      <p>
        Zur Abwicklung Ihrer Bestellung verarbeiten wir Ihre Namens-, Adress- und Zahlungsdaten gemäß Art. 6 Abs. 1 lit. b DSGVO. Diese Daten geben wir nur an
        Versanddienstleister und Zahlungsanbieter weiter, soweit dies zur Vertragserfüllung erforderlich ist.
      </p>
      <h2>4. Kundenkonto</h2>
      <p>Bei Erstellung eines Kundenkontos speichern wir die von Ihnen angegebenen Daten zur Verwaltung Ihres Kontos, Ihrer Bestellungen und Abonnements.</p>
      <h2>5. Newsletter</h2>
      <p>
        Für den Versand unseres Newsletters nutzen wir das Double-Opt-in-Verfahren. Ihre Einwilligung können Sie jederzeit über den Abmeldelink in jeder E-Mail
        widerrufen (Art. 6 Abs. 1 lit. a DSGVO).
      </p>
      <h2>6. Cookies & Tracking</h2>
      <p>
        Wir setzen technisch notwendige Cookies sowie — nach Ihrer Einwilligung über unseren Cookie-Banner — Analyse- und Marketing-Cookies ein. Details und
        Widerrufsmöglichkeiten finden Sie in unseren Cookie-Einstellungen.
      </p>
      <h2>7. Ihre Rechte</h2>
      <ul>
        <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
        <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
        <li>Recht auf Löschung (Art. 17 DSGVO)</li>
        <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
      </ul>
      <h2>8. Beschwerderecht</h2>
      <p>Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren.</p>
    </LegalLayout>
  );
}
