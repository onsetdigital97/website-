'use client';

import { useSearchParams } from 'next/navigation';
import { SearchX } from 'lucide-react';
import { searchProducts } from '@/lib/data';
import { ProductCard } from '@/components/product/ProductCard';
import { LinkButton } from '@/components/ui/Button';

export function SearchResults() {
  const params = useSearchParams();
  const query = params.get('q') ?? '';
  const results = searchProducts(query);

  return (
    <div>
      <p className="eyebrow text-copper-500">Suche</p>
      <h1 className="mt-3 font-display text-display-md font-semibold text-ink-900">
        {query ? (
          <>
            Ergebnisse für „{query}“ <span className="text-ink-300">({results.length})</span>
          </>
        ) : (
          'Wonach suchen Sie?'
        )}
      </h1>

      {query && results.length === 0 && (
        <div className="mt-14 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-ink-900/15 py-20 text-center">
          <SearchX size={40} className="text-ink-300" />
          <p className="font-display text-lg font-semibold text-ink-900">Keine Treffer gefunden</p>
          <p className="max-w-sm text-sm text-ink-500">
            Für „{query}“ konnten wir nichts finden. Prüfen Sie die Schreibweise oder stöbern Sie in unseren Kategorien.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <LinkButton href="/kaffee" variant="primary" size="sm">
              Kaffee entdecken
            </LinkButton>
            <LinkButton href="/maschinen" variant="ghost" size="sm">
              Maschinen entdecken
            </LinkButton>
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
