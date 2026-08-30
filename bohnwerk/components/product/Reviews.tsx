import { BadgeCheck } from 'lucide-react';
import { Review } from '@/lib/types';
import { Rating } from '@/components/ui/Rating';

export function Reviews({ rating, reviewCount, reviews }: { rating: number; reviewCount: number; reviews: Review[] }) {
  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => Math.round(r.rating) === star).length;
    return { star, pct: reviews.length ? Math.round((count / reviews.length) * 100) : 0 };
  });

  return (
    <div>
      <div className="grid gap-8 sm:grid-cols-[220px_1fr]">
        <div>
          <p className="font-display text-4xl font-bold text-ink-900">{rating.toFixed(1)}</p>
          <Rating value={rating} className="mt-2" />
          <p className="mt-1 text-sm text-ink-500">{reviewCount} Bewertungen</p>
        </div>
        <div className="space-y-1.5">
          {distribution.map((d) => (
            <div key={d.star} className="flex items-center gap-2 text-xs text-ink-500">
              <span className="w-10 shrink-0">{d.star} Sterne</span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-900/10">
                <span className="block h-full rounded-full bg-copper-500" style={{ width: `${d.pct}%` }} />
              </span>
              <span className="w-8 shrink-0 text-right">{d.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <ul className="mt-8 divide-y divide-ink-900/10 border-t border-ink-900/10">
        {reviews.map((r) => (
          <li key={r.id} className="py-5">
            <div className="flex items-center justify-between gap-3">
              <Rating value={r.rating} />
              <span className="text-xs text-ink-300">{new Date(r.date).toLocaleDateString('de-DE')}</span>
            </div>
            <p className="mt-2 font-display text-sm font-semibold text-ink-900">{r.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{r.text}</p>
            <p className="mt-2 flex items-center gap-1 text-xs font-medium text-ink-400">
              {r.verified && <BadgeCheck size={13} className="text-emerald-700" />}
              {r.author}
              {r.verified && ' · Verifizierter Kauf'}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
