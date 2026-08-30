'use client';

import { useState, FormEvent } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function NewsletterForm({ tone = 'light', compact = false }: { tone?: 'light' | 'dark'; compact?: boolean }) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error-email' | 'error-consent'>('idle');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!validEmail) {
      setStatus('error-email');
      return;
    }
    if (!consent) {
      setStatus('error-consent');
      return;
    }
    setStatus('success');
    setEmail('');
    setConsent(false);
  }

  const isDark = tone === 'dark';

  if (status === 'success') {
    return (
      <div className={cn('flex items-center gap-2 rounded-xl p-4 text-sm', isDark ? 'bg-cream-50/10 text-cream-50' : 'bg-copper-50 text-espresso-900')}>
        <CheckCircle2 size={18} className="shrink-0 text-copper-400" />
        Danke! Bitte bestätigen Sie Ihre Anmeldung über den Link in Ihrem Postfach.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-2.5">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={`newsletter-email-${tone}`} className="sr-only">
          E-Mail-Adresse
        </label>
        <input
          id={`newsletter-email-${tone}`}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== 'idle') setStatus('idle');
          }}
          placeholder="Ihre E-Mail-Adresse"
          className={cn(
            'flex-1 rounded-full border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-copper-500',
            isDark ? 'border-cream-50/20 bg-cream-50/5 text-cream-50 placeholder:text-cream-200/50' : 'border-ink-900/15 bg-cream-50 text-ink-900 placeholder:text-ink-300'
          )}
          aria-invalid={status === 'error-email'}
          aria-describedby="newsletter-error"
        />
        <button
          type="submit"
          className={cn(
            'flex items-center justify-center gap-1.5 rounded-full px-5 py-3 text-sm font-semibold transition-colors btn-focus-ring',
            isDark ? 'bg-copper-500 text-cream-50 hover:bg-copper-400' : 'bg-espresso-900 text-cream-50 hover:bg-espresso-800'
          )}
        >
          Anmelden <ArrowRight size={15} />
        </button>
      </div>
      {!compact && (
        <label className={cn('flex items-start gap-2 text-xs', isDark ? 'text-cream-200/70' : 'text-ink-500')}>
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (status !== 'idle') setStatus('idle');
            }}
            className="mt-0.5 h-3.5 w-3.5 rounded border-ink-900/30 text-copper-500 focus:ring-copper-500"
          />
          Ich möchte den Newsletter erhalten und stimme der Verarbeitung meiner Daten gemäß{' '}
          <a href="/datenschutz" className="underline">
            Datenschutzerklärung
          </a>{' '}
          zu. Abmeldung jederzeit möglich.
        </label>
      )}
      {compact && (
        <label className={cn('flex items-start gap-2 text-xs', isDark ? 'text-cream-200/60' : 'text-ink-500')}>
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (status !== 'idle') setStatus('idle');
            }}
            className="mt-0.5 h-3.5 w-3.5 rounded border-ink-900/30 text-copper-500 focus:ring-copper-500"
          />
          Ich stimme der <a href="/datenschutz" className="underline">Datenschutzerklärung</a> zu.
        </label>
      )}
      <div id="newsletter-error" role="alert" aria-live="polite">
        {status === 'error-email' && <p className="text-xs text-terracotta-400">Bitte geben Sie eine gültige E-Mail-Adresse ein.</p>}
        {status === 'error-consent' && <p className="text-xs text-terracotta-400">Bitte stimmen Sie der Datenschutzerklärung zu.</p>}
      </div>
    </form>
  );
}
