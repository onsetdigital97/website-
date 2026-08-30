import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-ink-900/10 bg-cream-50">
      <div className="container container-px py-3">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-500">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={12} className="text-ink-300" />}
              {item.href ? (
                <Link href={item.href} className="hover:text-copper-600">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-medium text-ink-900">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
