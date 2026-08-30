'use client';

import { Pause, Play, XCircle, Repeat } from 'lucide-react';
import { RequireAuth } from '@/components/account/RequireAuth';
import { useAuth } from '@/lib/auth';
import { formatPrice } from '@/lib/utils';
import { Button, LinkButton } from '@/components/ui/Button';

export default function SubscriptionAccountPage() {
  return (
    <RequireAuth>
      <SubscriptionContent />
    </RequireAuth>
  );
}

function SubscriptionContent() {
  const { subscriptionActive, subscriptionPaused, toggleSubscriptionPause, cancelSubscription } = useAuth();

  if (!subscriptionActive && !subscriptionPaused) {
    return (
      <div>
        <h1 className="font-display text-display-sm font-semibold text-ink-900">Kaffee-Abo</h1>
        <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-ink-900/15 py-16 text-center">
          <Repeat size={36} className="text-ink-300" />
          <p className="font-display text-lg font-semibold text-ink-900">Kein aktives Abo</p>
          <p className="max-w-sm text-sm text-ink-500">Ihr Abo wurde gekündigt. Starten Sie jederzeit ein neues.</p>
          <LinkButton href="/abo" variant="primary" size="sm">
            Abo konfigurieren
          </LinkButton>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-display-sm font-semibold text-ink-900">Kaffee-Abo</h1>
      <div className="mt-6 rounded-2xl border border-ink-900/10 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-display text-lg font-semibold text-ink-900">Entdecker</p>
            <p className="text-sm text-ink-500">2 × 250 g · alle 4 Wochen · freie Sortenwahl</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${subscriptionPaused ? 'bg-ink-900/5 text-ink-500' : 'bg-emerald-50 text-emerald-700'}`}>
            {subscriptionPaused ? 'Pausiert' : 'Aktiv'}
          </span>
        </div>
        <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-ink-900/10 pt-5 text-sm sm:grid-cols-4">
          <div>
            <dt className="text-xs text-ink-400">Preis je Lieferung</dt>
            <dd className="mt-0.5 font-semibold text-ink-900">{formatPrice(28.05)}</dd>
          </div>
          <div>
            <dt className="text-xs text-ink-400">Nächste Lieferung</dt>
            <dd className="mt-0.5 font-semibold text-ink-900">{subscriptionPaused ? '—' : '18.09.2026'}</dd>
          </div>
          <div>
            <dt className="text-xs text-ink-400">Abo-Vorteil</dt>
            <dd className="mt-0.5 font-semibold text-ink-900">15%</dd>
          </div>
          <div>
            <dt className="text-xs text-ink-400">Seit</dt>
            <dd className="mt-0.5 font-semibold text-ink-900">März 2026</dd>
          </div>
        </dl>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="ghost" size="sm" icon={subscriptionPaused ? <Play size={14} /> : <Pause size={14} />} onClick={toggleSubscriptionPause}>
            {subscriptionPaused ? 'Abo fortsetzen' : 'Abo pausieren'}
          </Button>
          <LinkButton href="/abo" variant="ghost" size="sm">
            Abo bearbeiten
          </LinkButton>
          <Button variant="ghost" size="sm" icon={<XCircle size={14} />} className="!text-terracotta-600 hover:!bg-terracotta-50" onClick={cancelSubscription}>
            Abo kündigen
          </Button>
        </div>
      </div>
    </div>
  );
}
