import { cn } from '@/lib/utils';

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn('eyebrow text-copper-500', className)}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  className?: string;
}) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className={cn('mt-3 font-display text-display-md font-semibold text-balance', tone === 'dark' ? 'text-cream-50' : 'text-ink-900')}>{title}</h2>
      {description && <p className={cn('mt-4 text-base leading-relaxed', tone === 'dark' ? 'text-cream-200/80' : 'text-ink-500')}>{description}</p>}
    </div>
  );
}

export function Numbered({ n, tone = 'light' }: { n: number; tone?: 'light' | 'dark' }) {
  return (
    <span className={cn('font-display text-sm font-semibold tracking-widest', tone === 'dark' ? 'text-copper-300' : 'text-copper-500')}>
      [{String(n).padStart(2, '0')}]
    </span>
  );
}
