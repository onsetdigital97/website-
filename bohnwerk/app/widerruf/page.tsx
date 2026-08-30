import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/LegalLayout';

export const metadata: Metadata = { title: 'Widerrufsbelehrung' };

export default function WiderrufPage() {
  return (
    <LegalLayout title="Widerrufsbelehrung">
      <h2>Widerrufsrecht</h2>
      <p>
        Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie
        oder ein von Ihnen benannter Dritter die Waren in Besitz genommen haben.
      </p>
      <p>
        Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Bohnwerk GmbH, Speicherstraße 12, 20457 Hamburg, E-Mail: widerruf@bohnwerk.de) mittels einer eindeutigen
        Erklärung (z. B. per Post versandter Brief oder E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.
      </p>
      <h2>Folgen des Widerrufs</h2>
      <p>
        Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem
        Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf bei uns eingegangen ist.
      </p>
      <h2>Ausschluss des Widerrufsrechts</h2>
      <p>
        Das Widerrufsrecht besteht nicht bei Verträgen zur Lieferung versiegelter Waren, die aus Gründen des Gesundheitsschutzes oder der Hygiene nicht zur Rückgabe
        geeignet sind, wenn ihre Versiegelung nach der Lieferung entfernt wurde, sowie bei Waren, die schnell verderben oder deren Verfallsdatum schnell erreicht
        würde — dies kann bei frisch gerösteten Kaffeeprodukten je nach Zustand der Ware einschlägig sein.
      </p>
      <h2>Muster-Widerrufsformular</h2>
      <p>
        (Wenn Sie den Vertrag widerrufen wollen, füllen Sie bitte dieses Formular aus und senden Sie es zurück.)
        <br />
        An Bohnwerk GmbH, Speicherstraße 12, 20457 Hamburg, widerruf@bohnwerk.de
        <br />
        Hiermit widerrufe(n) ich/wir den von mir/uns abgeschlossenen Vertrag über den Kauf der folgenden Waren: ____________________
      </p>
    </LegalLayout>
  );
}
