import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/LegalLayout';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata: Metadata = { title: 'Händlerbereich' };

export default function DealerPage() {
  return (
    <LegalLayout title="Händlerbereich">
      <p>
        Sie möchten Bohnwerk-Kaffee in Ihrem Café, Restaurant oder Einzelhandelsgeschäft anbieten? Wir freuen uns über Ihre Anfrage — gerne besprechen wir individuelle
        Konditionen für Gastronomie- und Wiederverkaufspartner.
      </p>
      <div className="not-prose mt-6">
        <ContactForm topic="Händleranfrage" />
      </div>
    </LegalLayout>
  );
}
