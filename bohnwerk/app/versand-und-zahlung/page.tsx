import type { Metadata } from 'next';
import { Truck, CreditCard } from 'lucide-react';
import { LegalLayout } from '@/components/legal/LegalLayout';
import { FREE_SHIPPING_EUR } from '@/lib/store';
import { formatPrice } from '@/lib/utils';

export const metadata: Metadata = { title: 'Versand & Zahlung' };

export default function ShippingPaymentPage() {
  return (
    <LegalLayout title="Versand & Zahlung">
      <div className="not-prose grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-ink-900/10 p-5">
          <Truck className="text-copper-500" size={22} />
          <p className="mt-3 font-display font-semibold text-ink-900">Versand</p>
          <ul className="mt-2 space-y-1.5 text-sm text-ink-600">
            <li>Standardversand: 2–4 Werktage, {formatPrice(4.9)}</li>
            <li>Expressversand: 1 Werktag, {formatPrice(9.9)}</li>
            <li>Kostenloser Versand ab {formatPrice(FREE_SHIPPING_EUR)}</li>
            <li>Versand innerhalb Deutschlands, Österreich & Schweiz</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-ink-900/10 p-5">
          <CreditCard className="text-copper-500" size={22} />
          <p className="mt-3 font-display font-semibold text-ink-900">Zahlungsarten</p>
          <ul className="mt-2 space-y-1.5 text-sm text-ink-600">
            <li>Kredit-/Debitkarte</li>
            <li>PayPal</li>
            <li>Klarna (Rechnung & Raten)</li>
            <li>SEPA-Lastschrift</li>
            <li>Apple Pay</li>
          </ul>
        </div>
      </div>
      <h2>Röstfrische Lieferung</h2>
      <p>Unsere Kaffees werden wöchentlich frisch geröstet und innerhalb von 1–2 Werktagen nach dem Röstdatum versendet, damit Sie maximales Aroma genießen.</p>
      <h2>Sicherheit</h2>
      <p>Alle Zahlungen werden verschlüsselt über etablierte, PCI-DSS-zertifizierte Zahlungsdienstleister abgewickelt.</p>
    </LegalLayout>
  );
}
