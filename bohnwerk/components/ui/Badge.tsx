import { cn } from '@/lib/utils';

const tones = {
  copper: 'bg-copper-500 text-cream-50',
  dark: 'bg-espresso-900 text-cream-50',
  outline: 'bg-cream-50 text-ink-900 border border-ink-900/15',
  sale: 'bg-terracotta-500 text-cream-50',
  success: 'bg-emerald-700 text-cream-50',
};

export function Badge({ children, tone = 'copper', className }: { children: React.ReactNode; tone?: keyof typeof tones; className?: string }) {
  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider', tones[tone], className)}>
      {children}
    </span>
  );
}
