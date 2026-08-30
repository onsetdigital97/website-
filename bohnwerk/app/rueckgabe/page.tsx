import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/LegalLayout';

export const metadata: Metadata = { title: 'Rückgabe' };

export default function ReturnsPage() {
  return (
    <LegalLayout title="Rückgabe & Umtausch">
      <h2>14 Tage Rückgaberecht</h2>
      <p>Sie können unversiegelte, unbenutzte Artikel innerhalb von 14 Tagen nach Erhalt kostenfrei zurücksenden. Details entnehmen Sie unserer Widerrufsbelehrung.</p>
      <h2>So funktioniert die Rückgabe</h2>
      <p>
        1. Melden Sie sich in Ihrem Kundenkonto an und wählen Sie die betreffende Bestellung.
        <br />
        2. Fordern Sie über „Rücksendung starten" ein Rücksendelabel an.
        <br />
        3. Verpacken Sie die Ware sicher und geben Sie das Paket bei einer Filiale ab.
      </p>
      <h2>Ausgeschlossene Artikel</h2>
      <p>Geöffnete Kaffeeverpackungen sind aus Hygienegründen von der Rückgabe ausgeschlossen, sofern die Ware nicht mangelhaft ist.</p>
      <h2>Erstattung</h2>
      <p>Nach Eingang und Prüfung der Rücksendung erstatten wir den Kaufpreis innerhalb von 14 Tagen auf die ursprünglich verwendete Zahlungsart.</p>
    </LegalLayout>
  );
}
