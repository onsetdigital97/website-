'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { subscriptionPlans, subscriptionIntervals, coffees } from '@/lib/data';
import { formatPrice, cn } from '@/lib/utils';
import { useShop } from '@/lib/store';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Forms';

export function AboConfigurator() {
  const { addToCart } = useShop();
  const [planId, setPlanId] = useState<(typeof subscriptionPlans)[number]['id']>('entdecker');
  const plan = subscriptionPlans.find((p) => p.id === planId)!;
  const [selectedCoffees, setSelectedCoffees] = useState<string[]>([coffees[0].id]);
  const [grind, setGrind] = useState<'ganz' | 'gemahlen'>('ganz');
  const [size, setSize] = useState<'250' | '500'>('250');
  const [interval, setInterval] = useState(subscriptionIntervals[1].id);
  const [packCount, setPackCount] = useState(1);

  function toggleCoffee(id: string) {
    setSelectedCoffees((prev) => {
      if (prev.includes(id)) return prev.filter((c) => c !== id);
      if (prev.length >= plan.packagesPerDelivery) return [...prev.slice(1), id];
      return [...prev, id];
    });
  }

  const basePricePerPack = size === '250' ? 14.9 : 24.5;
  const pricePerDelivery = useMemo(() => {
    const raw = basePricePerPack * plan.packagesPerDelivery * packCount;
    return raw * (1 - plan.discountPercent / 100);
  }, [basePricePerPack, plan, packCount]);

  function handleSubscribe() {
    const chosenNames = selectedCoffees.map((id) => coffees.find((c) => c.id === id)?.name).filter(Boolean).join(', ') || 'Sortenrotation';
    addToCart({
      productId: `abo-${plan.id}`,
      slug: 'kaffee-abo',
      name: `Kaffee-Abo ${plan.name} (${chosenNames})`,
      image: coffees[0].images[0],
      price: pricePerDelivery,
      quantity: 1,
      isSubscription: true,
      interval: subscriptionIntervals.find((i) => i.id === interval)?.label,
      variantLabel: `${size} g · ${grind === 'ganz' ? 'Ganze Bohne' : 'Gemahlen'} · ${plan.packagesPerDelivery * packCount} Packungen`,
    });
  }

  return (
    <div className="container container-px">
      <div className="grid gap-3 sm:grid-cols-3">
        {subscriptionPlans.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPlanId(p.id)}
            className={cn(
              'rounded-2xl border p-6 text-left transition-all',
              planId === p.id ? 'border-copper-500 bg-copper-50 shadow-soft' : 'border-ink-900/10 hover:border-copper-300'
            )}
          >
            <div className="flex items-center justify-between">
              <p className="font-display text-lg font-semibold text-ink-900">{p.name}</p>
              {p.highlighted && <span className="rounded-full bg-copper-500 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-cream-50">Beliebt</span>}
            </div>
            <p className="mt-1 text-sm text-ink-500">{p.tagline}</p>
            <p className="mt-3 font-display text-2xl font-bold text-copper-600">{p.discountPercent}% Vorteil</p>
            <ul className="mt-3 space-y-1.5">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-1.5 text-xs text-ink-600">
                  <Check size={13} className="mt-0.5 shrink-0 text-copper-500" /> {f}
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-10 rounded-2xl border border-ink-900/10 p-6 sm:p-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-display text-sm font-semibold text-ink-900">
            Kaffeesorte wählen ({selectedCoffees.length}/{plan.packagesPerDelivery})
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {coffees
              .filter((c) => c.subscribable)
              .map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => toggleCoffee(c.id)}
                  className={cn(
                    'flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition-colors',
                    selectedCoffees.includes(c.id) ? 'border-copper-500 bg-copper-50' : 'border-ink-900/10 hover:border-copper-300'
                  )}
                >
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-sand-100">
                    <Image src={c.images[0]} alt="" fill className="object-cover" />
                  </div>
                  <span className="text-xs font-medium text-ink-900">{c.name}</span>
                </button>
              ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-ink-900">Ganze Bohne oder Mahlgrad</p>
              <div className="mt-2 flex gap-2">
                {(['ganz', 'gemahlen'] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGrind(g)}
                    className={cn('flex-1 rounded-full border px-3 py-2 text-xs font-medium', grind === g ? 'border-copper-500 bg-copper-500 text-cream-50' : 'border-ink-900/15 text-ink-700')}
                  >
                    {g === 'ganz' ? 'Ganze Bohne' : 'Gemahlen'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-ink-900">Packungsgröße</p>
              <div className="mt-2 flex gap-2">
                {(['250', '500'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={cn('flex-1 rounded-full border px-3 py-2 text-xs font-medium', size === s ? 'border-copper-500 bg-copper-500 text-cream-50' : 'border-ink-900/15 text-ink-700')}
                  >
                    {s} g
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-ink-900">Lieferintervall</p>
              <Select value={interval} onChange={(e) => setInterval(e.target.value)} className="mt-2">
                {subscriptionIntervals.map((iv) => (
                  <option key={iv.id} value={iv.id}>
                    {iv.label}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <p className="text-sm font-medium text-ink-900">Anzahl Packungssets</p>
              <Select value={packCount} onChange={(e) => setPackCount(Number(e.target.value))} className="mt-2">
                {[1, 2, 3].map((n) => (
                  <option key={n} value={n}>
                    {n}×
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <p className="mt-4 text-xs text-ink-500">Sie können Ihr Abo jederzeit in Ihrem Kundenkonto pausieren oder kündigen.</p>
        </div>

        <div className="h-fit rounded-2xl bg-sand-100 p-6">
          <p className="font-display text-sm font-semibold text-ink-900">Zusammenfassung</p>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-500">Paket</dt>
              <dd className="font-medium text-ink-900">{plan.name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-500">Menge</dt>
              <dd className="font-medium text-ink-900">
                {plan.packagesPerDelivery * packCount} × {size} g
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-500">Intervall</dt>
              <dd className="font-medium text-ink-900">{subscriptionIntervals.find((i) => i.id === interval)?.label}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-500">Abo-Vorteil</dt>
              <dd className="font-medium text-emerald-700">−{plan.discountPercent}%</dd>
            </div>
          </dl>
          <div className="mt-4 flex items-baseline justify-between border-t border-ink-900/10 pt-4">
            <span className="font-display font-semibold text-ink-900">Preis je Lieferung</span>
            <span className="font-display text-xl font-bold text-ink-900">{formatPrice(pricePerDelivery)}</span>
          </div>
          <Button variant="secondary" size="lg" className="mt-5 w-full" onClick={handleSubscribe}>
            Abo starten
          </Button>
        </div>
      </div>
    </div>
  );
}
