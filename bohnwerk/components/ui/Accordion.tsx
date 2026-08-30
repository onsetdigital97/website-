'use client';

import { useState, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Accordion({ items }: { items: { question: string; answer: ReactNode }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-ink-900/10 border-y border-ink-900/10">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 py-5 text-left font-display font-semibold text-ink-900 btn-focus-ring"
            >
              <span>{item.question}</span>
              <ChevronDown size={20} className={cn('shrink-0 text-copper-500 transition-transform duration-300', open && 'rotate-180')} />
            </button>
            <div className={cn('grid transition-all duration-300 ease-smooth', open ? 'grid-rows-[1fr] opacity-100 pb-5' : 'grid-rows-[0fr] opacity-0')}>
              <div className="overflow-hidden">
                <div className="text-sm leading-relaxed text-ink-500">{item.answer}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
