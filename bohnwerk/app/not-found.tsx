import { Coffee } from 'lucide-react';
import { LinkButton } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="container container-px py-28 text-center">
      <div className="mx-auto flex max-w-md flex-col items-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-copper-50 text-copper-600">
          <Coffee size={28} />
        </span>
        <h1 className="mt-6 font-display text-display-md font-semibold text-ink-900">404 — Diese Tasse ist leer</h1>
        <p className="mt-3 text-sm text-ink-500">Die gesuchte Seite konnte nicht gefunden werden. Vielleicht finden Sie hier Ihren nächsten Lieblingskaffee.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <LinkButton href="/" variant="primary" size="md">
            Zur Startseite
          </LinkButton>
          <LinkButton href="/kaffee" variant="ghost" size="md">
            Kaffee entdecken
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
