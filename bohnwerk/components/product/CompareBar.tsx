'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, GitCompare } from 'lucide-react';
import { useShop } from '@/lib/store';
import { getProductsByIds } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { MachineProduct } from '@/lib/types';

export function CompareBar() {
  const { compareIds, toggleCompare, clearCompare } = useShop();
  const [open, setOpen] = useState(false);
  const products = getProductsByIds(compareIds).filter((p): p is MachineProduct => p.type === 'machine');

  if (compareIds.length === 0) return null;

  const allSpecLabels = Array.from(new Set(products.flatMap((p) => p.specs.map((s) => s.label))));

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-[130] border-t border-ink-900/10 bg-espresso-950 text-cream-50">
        <div className="container flex flex-wrap items-center justify-between gap-4 py-3 container-px">
          <div className="flex items-center gap-3">
            <GitCompare size={18} className="text-copper-300" />
            <span className="text-sm font-medium">{products.length} Produkt(e) zum Vergleich ausgewählt</span>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={clearCompare} className="text-sm text-cream-200/70 hover:text-cream-50">
              Zurücksetzen
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              disabled={products.length < 2}
              className="rounded-full bg-copper-500 px-5 py-2.5 text-sm font-semibold text-cream-50 hover:bg-copper-400 disabled:opacity-40"
            >
              Vergleichen
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center bg-espresso-950/70 p-4" role="dialog" aria-modal="true" aria-label="Produktvergleich">
          <div className="max-h-[85vh] w-full max-w-4xl overflow-auto rounded-2xl bg-cream-50 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-ink-900">Produktvergleich</h2>
              <button type="button" onClick={() => setOpen(false)} aria-label="Schließen" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-ink-900/5">
                <X size={18} />
              </button>
            </div>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[500px] border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="w-40 pb-3 text-left text-xs uppercase tracking-wide text-ink-300">Merkmal</th>
                    {products.map((p) => (
                      <th key={p.id} className="pb-3 pl-4 text-left">
                        <div className="relative mb-2 h-20 w-20 overflow-hidden rounded-lg bg-sand-100">
                          <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                        </div>
                        <p className="font-display text-sm font-semibold text-ink-900">{p.name}</p>
                        <p className="text-xs text-copper-600">{formatPrice(p.price)}</p>
                        <button type="button" onClick={() => toggleCompare(p.id)} className="mt-1 text-xs text-ink-400 hover:text-terracotta-500">
                          Entfernen
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allSpecLabels.map((label, i) => (
                    <tr key={label} className={i % 2 === 0 ? 'bg-sand-100/60' : ''}>
                      <td className="py-2.5 pr-4 text-xs font-medium text-ink-500">{label}</td>
                      {products.map((p) => (
                        <td key={p.id} className="py-2.5 pl-4 text-ink-900">
                          {p.specs.find((s) => s.label === label)?.value ?? '—'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
