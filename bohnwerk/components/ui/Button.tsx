import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline-light' | 'dark';
type Size = 'sm' | 'md' | 'lg';

const variantClasses: Record<Variant, string> = {
  primary: 'bg-espresso-900 text-cream-50 hover:bg-espresso-800',
  secondary: 'bg-copper-500 text-cream-50 hover:bg-copper-600',
  ghost: 'bg-transparent text-ink-900 hover:bg-ink-900/5',
  'outline-light': 'bg-transparent text-cream-50 border border-cream-50/50 hover:bg-cream-50/10',
  dark: 'bg-cream-50 text-espresso-950 hover:bg-cream-100',
};

const sizeClasses: Record<Size, string> = {
  sm: 'text-sm px-4 py-2 gap-1.5',
  md: 'text-sm px-6 py-3 gap-2',
  lg: 'text-base px-8 py-4 gap-2.5',
};

const base =
  'inline-flex items-center justify-center rounded-full font-display font-semibold tracking-wide transition-all duration-300 ease-smooth disabled:opacity-40 disabled:pointer-events-none btn-focus-ring';

type CommonProps = { variant?: Variant; size?: Size; className?: string; children: ReactNode; icon?: ReactNode };

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  icon,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variantClasses[variant], sizeClasses[size], className)} {...props}>
      {children}
      {icon}
    </button>
  );
}

export function LinkButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  icon,
  href,
  ...props
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <Link href={href} className={cn(base, variantClasses[variant], sizeClasses[size], className)} {...props}>
      {children}
      {icon}
    </Link>
  );
}
