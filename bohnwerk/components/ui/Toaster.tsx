'use client';

import { CheckCircle2, Info, XCircle, X } from 'lucide-react';
import { useShop } from '@/lib/store';
import { cn } from '@/lib/utils';

const icons = { success: CheckCircle2, error: XCircle, info: Info };

export function Toaster() {
  const { toasts, dismissToast } = useShop();

  return (
    <div className="pointer-events-none fixed bottom-4 left-1/2 z-[200] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4 sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0" aria-live="polite">
      {toasts.map((t) => {
        const Icon = icons[t.tone];
        return (
          <div
            key={t.id}
            className={cn(
              'pointer-events-auto flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm shadow-lift animate-fade-up',
              t.tone === 'success' && 'border-emerald-700/20 bg-espresso-950 text-cream-50',
              t.tone === 'error' && 'border-terracotta-500/30 bg-terracotta-500 text-cream-50',
              t.tone === 'info' && 'border-ink-900/10 bg-cream-50 text-ink-900'
            )}
          >
            <Icon size={17} className="shrink-0" />
            <span className="flex-1">{t.message}</span>
            <button type="button" onClick={() => dismissToast(t.id)} aria-label="Meldung schließen" className="shrink-0 opacity-70 hover:opacity-100">
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
