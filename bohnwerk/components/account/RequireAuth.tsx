'use client';

import { ReactNode } from 'react';
import { LogIn } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { LinkButton } from '@/components/ui/Button';

export function RequireAuth({ children }: { children: ReactNode }) {
  const { isLoggedIn, hydrated } = useAuth();

  if (!hydrated) return null;

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-ink-900/15 py-20 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-copper-50 text-copper-600">
          <LogIn size={24} />
        </span>
        <p className="font-display text-lg font-semibold text-ink-900">Bitte melden Sie sich an</p>
        <p className="max-w-sm text-sm text-ink-500">Diese Seite ist nur für angemeldete Kundinnen und Kunden verfügbar.</p>
        <LinkButton href="/konto" variant="primary" size="md">
          Zur Anmeldung
        </LinkButton>
      </div>
    );
  }

  return <>{children}</>;
}
