'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, ChevronDown, User, Heart } from 'lucide-react';
import { mainNav } from '@/lib/nav';
import { cn } from '@/lib/utils';

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <>
      <div
        className={cn('fixed inset-0 z-[70] bg-espresso-950/50 transition-opacity duration-300 lg:hidden', open ? 'opacity-100' : 'pointer-events-none opacity-0')}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-[80] flex w-[88%] max-w-sm flex-col bg-cream-50 transition-transform duration-300 ease-smooth lg:hidden',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Hauptmenü"
      >
        <div className="flex items-center justify-between border-b border-ink-900/10 px-5 py-4">
          <span className="font-display text-lg font-bold text-ink-900">Menü</span>
          <button type="button" onClick={onClose} aria-label="Menü schließen" className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-ink-900/5 btn-focus-ring">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          {mainNav.map((item) => (
            <div key={item.label} className="border-b border-ink-900/5">
              <div className="flex items-center">
                <Link href={item.href} onClick={onClose} className="flex-1 px-3 py-4 text-base font-medium text-ink-900">
                  {item.label}
                </Link>
                {item.columns && (
                  <button
                    type="button"
                    onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                    className="flex h-12 w-12 items-center justify-center text-ink-500 btn-focus-ring"
                    aria-label={`${item.label} Untermenü`}
                    aria-expanded={expanded === item.label}
                  >
                    <ChevronDown size={18} className={cn('transition-transform', expanded === item.label && 'rotate-180')} />
                  </button>
                )}
              </div>
              {item.columns && (
                <div className={cn('grid transition-all duration-300', expanded === item.label ? 'grid-rows-[1fr] pb-3' : 'grid-rows-[0fr]')}>
                  <div className="overflow-hidden pl-6">
                    {item.columns.flatMap((c) => c.links).map((l) => (
                      <Link key={l.label} href={l.href} onClick={onClose} className="block py-2.5 text-sm text-ink-600">
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="grid grid-cols-2 gap-2 border-t border-ink-900/10 p-4">
          <Link href="/konto" onClick={onClose} className="flex items-center justify-center gap-2 rounded-full bg-ink-900/5 py-3 text-sm font-medium text-ink-900">
            <User size={16} /> Konto
          </Link>
          <Link href="/konto/merkliste" onClick={onClose} className="flex items-center justify-center gap-2 rounded-full bg-ink-900/5 py-3 text-sm font-medium text-ink-900">
            <Heart size={16} /> Merkliste
          </Link>
        </div>
      </div>
    </>
  );
}
