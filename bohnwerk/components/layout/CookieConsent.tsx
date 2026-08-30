'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cookie } from 'lucide-react';
import { Button } from '@/components/ui/Button';

type Consent = { necessary: true; analytics: boolean; marketing: boolean };

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('bohnwerk:cookie-consent');
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function save(consent: Consent) {
    try {
      window.localStorage.setItem('bohnwerk:cookie-consent', JSON.stringify(consent));
    } catch {
      // ignore
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[250] border-t border-ink-900/10 bg-cream-50 shadow-lift" role="dialog" aria-modal="false" aria-label="Cookie-Einstellungen">
      <div className="container container-px py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Cookie size={20} className="mt-0.5 shrink-0 text-copper-500" />
            <p className="text-sm text-ink-700">
              Wir verwenden Cookies, um unseren Shop zu betreiben und Ihr Erlebnis zu verbessern. Details finden Sie in unserer{' '}
              <Link href="/datenschutz" className="underline">
                Datenschutzerklärung
              </Link>
              .
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <button type="button" onClick={() => setSettingsOpen((v) => !v)} className="rounded-full border border-ink-900/15 px-4 py-2.5 text-sm font-medium text-ink-700 hover:bg-ink-900/5">
              Einstellungen
            </button>
            <Button variant="ghost" size="sm" onClick={() => save({ necessary: true, analytics: false, marketing: false })}>
              Nur notwendige
            </Button>
            <Button variant="primary" size="sm" onClick={() => save({ necessary: true, analytics: true, marketing: true })}>
              Alle akzeptieren
            </Button>
          </div>
        </div>

        {settingsOpen && (
          <div className="mt-4 grid gap-3 border-t border-ink-900/10 pt-4 sm:grid-cols-3">
            <label className="flex items-center justify-between rounded-xl bg-ink-900/5 px-4 py-3 text-sm">
              Notwendig
              <input type="checkbox" checked disabled className="h-4 w-4" />
            </label>
            <label className="flex items-center justify-between rounded-xl bg-ink-900/5 px-4 py-3 text-sm">
              Analyse
              <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="h-4 w-4 text-copper-500 focus:ring-copper-500" />
            </label>
            <label className="flex items-center justify-between rounded-xl bg-ink-900/5 px-4 py-3 text-sm">
              Marketing
              <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="h-4 w-4 text-copper-500 focus:ring-copper-500" />
            </label>
            <div className="sm:col-span-3">
              <Button variant="primary" size="sm" onClick={() => save({ necessary: true, analytics, marketing })}>
                Auswahl speichern
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
