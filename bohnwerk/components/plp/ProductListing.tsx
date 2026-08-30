'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X, PackageSearch } from 'lucide-react';
import { Product, CoffeeProduct } from '@/lib/types';
import { ProductCard } from '@/components/product/ProductCard';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

type SortKey = 'relevanz' | 'preis-auf' | 'preis-ab' | 'neu' | 'bewertung';

const PAGE_SIZE = 8;

function isCoffee(p: Product): p is CoffeeProduct {
  return p.type === 'coffee';
}

export function ProductListing({ products, showCoffeeFilters = false }: { products: Product[]; showCoffeeFilters?: boolean }) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('kategorie');

  const categories = Array.from(new Set(products.map((p) => p.category)));
  const [activeCategories, setActiveCategories] = useState<string[]>(initialCategory ? [initialCategory] : []);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(() => Math.ceil(Math.max(...products.map((p) => p.price)) / 5) * 5);
  const priceCeiling = Math.ceil(Math.max(...products.map((p) => p.price)) / 5) * 5;
  const [roast, setRoast] = useState<number[]>([]);
  const [intensity, setIntensity] = useState<number[]>([]);
  const [origin, setOrigin] = useState<string[]>([]);
  const [brewMethod, setBrewMethod] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>('relevanz');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const origins = showCoffeeFilters ? Array.from(new Set(products.filter(isCoffee).map((p) => p.origin))) : [];
  const brewMethods = showCoffeeFilters ? Array.from(new Set(products.filter(isCoffee).flatMap((p) => p.brewMethods))) : [];

  function toggle<T>(arr: T[], value: T, setter: (v: T[]) => void) {
    setter(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  }

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (activeCategories.length && !activeCategories.includes(p.category)) return false;
      if (inStockOnly && !p.inStock) return false;
      if (p.price > maxPrice) return false;
      if (showCoffeeFilters && isCoffee(p)) {
        if (roast.length && !roast.includes(p.roast)) return false;
        if (intensity.length && !intensity.includes(p.intensity)) return false;
        if (origin.length && !origin.includes(p.origin)) return false;
        if (brewMethod.length && !p.brewMethods.some((m) => brewMethod.includes(m))) return false;
      }
      return true;
    });

    switch (sort) {
      case 'preis-auf':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'preis-ab':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'bewertung':
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case 'neu':
        list = [...list].sort((a, b) => (b.badges?.includes('Neu') ? 1 : 0) - (a.badges?.includes('Neu') ? 1 : 0));
        break;
    }
    return list;
  }, [products, activeCategories, inStockOnly, maxPrice, roast, intensity, origin, brewMethod, sort, showCoffeeFilters]);

  const visible = filtered.slice(0, visibleCount);
  const activeFilterCount = activeCategories.length + (inStockOnly ? 1 : 0) + roast.length + intensity.length + origin.length + brewMethod.length + (maxPrice < priceCeiling ? 1 : 0);

  function resetFilters() {
    setActiveCategories([]);
    setInStockOnly(false);
    setMaxPrice(priceCeiling);
    setRoast([]);
    setIntensity([]);
    setOrigin([]);
    setBrewMethod([]);
  }

  const FilterPanel = (
    <div className="space-y-7">
      {categories.length > 1 && (
        <div>
          <p className="font-display text-sm font-semibold text-ink-900">Kategorie</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => toggle(activeCategories, c, setActiveCategories)}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                  activeCategories.includes(c) ? 'border-copper-500 bg-copper-500 text-cream-50' : 'border-ink-900/15 text-ink-700 hover:border-copper-400'
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="font-display text-sm font-semibold text-ink-900">Preis bis {maxPrice} €</p>
        <input
          type="range"
          min={0}
          max={priceCeiling}
          step={1}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="mt-3 w-full accent-copper-500"
          aria-label="Maximalpreis"
        />
      </div>

      <div>
        <p className="font-display text-sm font-semibold text-ink-900">Verfügbarkeit</p>
        <label className="mt-3 flex items-center gap-2 text-sm text-ink-700">
          <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className="h-4 w-4 rounded border-ink-900/30 text-copper-500 focus:ring-copper-500" />
          Nur verfügbare Artikel
        </label>
      </div>

      {showCoffeeFilters && (
        <>
          <div>
            <p className="font-display text-sm font-semibold text-ink-900">Röstgrad</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => toggle(roast, r, setRoast)}
                  className={cn(
                    'h-8 w-8 rounded-full border text-xs font-medium transition-colors',
                    roast.includes(r) ? 'border-copper-500 bg-copper-500 text-cream-50' : 'border-ink-900/15 text-ink-700 hover:border-copper-400'
                  )}
                  aria-label={`Röstgrad ${r}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-display text-sm font-semibold text-ink-900">Intensität</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => toggle(intensity, r, setIntensity)}
                  className={cn(
                    'h-8 w-8 rounded-full border text-xs font-medium transition-colors',
                    intensity.includes(r) ? 'border-copper-500 bg-copper-500 text-cream-50' : 'border-ink-900/15 text-ink-700 hover:border-copper-400'
                  )}
                  aria-label={`Intensität ${r}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-display text-sm font-semibold text-ink-900">Zubereitungsart</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {brewMethods.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => toggle(brewMethod, m, setBrewMethod)}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                    brewMethod.includes(m) ? 'border-copper-500 bg-copper-500 text-cream-50' : 'border-ink-900/15 text-ink-700 hover:border-copper-400'
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-display text-sm font-semibold text-ink-900">Herkunft</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {origins.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => toggle(origin, o, setOrigin)}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                    origin.includes(o) ? 'border-copper-500 bg-copper-500 text-cream-50' : 'border-ink-900/15 text-ink-700 hover:border-copper-400'
                  )}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {activeFilterCount > 0 && (
        <button type="button" onClick={resetFilters} className="text-sm font-medium text-copper-600 hover:underline">
          Filter zurücksetzen ({activeFilterCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="container container-px py-10">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-ink-500">{filtered.length} Produkte</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-1.5 rounded-full border border-ink-900/15 px-4 py-2 text-sm font-medium text-ink-900 lg:hidden btn-focus-ring"
          >
            <SlidersHorizontal size={15} /> Filter {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
          <label className="flex items-center gap-2 text-sm text-ink-700">
            <span className="hidden sm:inline">Sortieren:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-full border border-ink-900/15 bg-cream-50 px-3 py-2 text-sm focus:border-copper-500 focus:outline-none focus:ring-1 focus:ring-copper-500"
            >
              <option value="relevanz">Beliebtheit</option>
              <option value="preis-auf">Preis aufsteigend</option>
              <option value="preis-ab">Preis absteigend</option>
              <option value="bewertung">Beste Bewertung</option>
              <option value="neu">Neuheiten</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">{FilterPanel}</aside>

        <div>
          {visible.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-ink-900/15 py-20 text-center">
              <PackageSearch size={40} className="text-ink-300" />
              <p className="font-display text-lg font-semibold text-ink-900">Keine Produkte gefunden</p>
              <p className="max-w-sm text-sm text-ink-500">Mit den gewählten Filtern konnten wir leider nichts finden. Versuchen Sie es mit weniger Filtern.</p>
              <button type="button" onClick={resetFilters} className="text-sm font-semibold text-copper-600 hover:underline">
                Filter zurücksetzen
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                {visible.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              {visibleCount < filtered.length && (
                <div className="mt-10 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
                    className="rounded-full border border-ink-900/15 px-6 py-3 text-sm font-semibold text-ink-900 hover:bg-ink-900/5 btn-focus-ring"
                  >
                    Mehr laden ({filtered.length - visibleCount} weitere)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div
        className={cn('fixed inset-0 z-[90] bg-espresso-950/50 transition-opacity duration-300 lg:hidden', drawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0')}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />
      <div
        className={cn(
          'fixed inset-y-0 right-0 z-[100] flex w-[88%] max-w-sm flex-col bg-cream-50 shadow-lift transition-transform duration-300 ease-smooth lg:hidden',
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Filter"
      >
        <div className="flex items-center justify-between border-b border-ink-900/10 px-5 py-4">
          <span className="font-display text-lg font-semibold text-ink-900">Filter</span>
          <button type="button" onClick={() => setDrawerOpen(false)} aria-label="Filter schließen" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-ink-900/5 btn-focus-ring">
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5">{FilterPanel}</div>
        <div className="border-t border-ink-900/10 p-4">
          <Button type="button" variant="primary" size="md" className="w-full" onClick={() => setDrawerOpen(false)}>
            {filtered.length} Ergebnisse anzeigen
          </Button>
        </div>
      </div>
    </div>
  );
}
