import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Rating({ value, count, size = 14, className }: { value: number; count?: number; size?: number; className?: string }) {
  return (
    <div className={cn('flex items-center gap-1.5', className)} role="img" aria-label={`Bewertung: ${value.toFixed(1)} von 5 Sternen${count ? ` (${count} Bewertungen)` : ''}`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = value >= i + 1;
          const half = !filled && value > i && value < i + 1;
          return (
            <span key={i} className="relative inline-block" style={{ width: size, height: size }} aria-hidden="true">
              <Star size={size} className="absolute inset-0 text-copper-300" />
              <span className="absolute inset-0 overflow-hidden" style={{ width: filled ? '100%' : half ? '50%' : '0%' }}>
                <Star size={size} className="text-copper-500 fill-copper-500" />
              </span>
            </span>
          );
        })}
      </div>
      {count !== undefined && <span className="text-xs text-ink-500">({count})</span>}
    </div>
  );
}
