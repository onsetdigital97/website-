import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

const fieldBase =
  'w-full rounded-xl border border-ink-900/15 bg-cream-50 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-300 transition-colors focus:border-copper-500 focus:ring-1 focus:ring-copper-500';

export const Label = ({ children, htmlFor, required }: { children: React.ReactNode; htmlFor: string; required?: boolean }) => (
  <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink-900">
    {children} {required && <span className="text-terracotta-500">*</span>}
  </label>
);

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & { error?: string }>(function Input(
  { className, error, ...props },
  ref
) {
  return (
    <div>
      <input ref={ref} className={cn(fieldBase, error && 'border-terracotta-500 focus:border-terracotta-500 focus:ring-terracotta-500', className)} {...props} />
      {error && <p className="mt-1.5 text-xs text-terracotta-600">{error}</p>}
    </div>
  );
});

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }>(function Textarea(
  { className, error, ...props },
  ref
) {
  return (
    <div>
      <textarea ref={ref} className={cn(fieldBase, 'min-h-32 resize-y', error && 'border-terracotta-500', className)} {...props} />
      {error && <p className="mt-1.5 text-xs text-terracotta-600">{error}</p>}
    </div>
  );
});

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(function Select({ className, children, ...props }, ref) {
  return (
    <select ref={ref} className={cn(fieldBase, 'appearance-none bg-no-repeat pr-10', className)} {...props}>
      {children}
    </select>
  );
});

export function Checkbox({ label, id, error, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: React.ReactNode; id: string; error?: string }) {
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-2.5 text-sm text-ink-700">
        <input id={id} type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink-900/30 text-copper-500 focus:ring-copper-500" {...props} />
        <span>{label}</span>
      </label>
      {error && <p className="mt-1.5 ml-6 text-xs text-terracotta-600">{error}</p>}
    </div>
  );
}
