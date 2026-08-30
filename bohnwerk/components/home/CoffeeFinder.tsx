'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, RotateCcw, Sparkles } from 'lucide-react';
import { coffees } from '@/lib/data';
import { CoffeeProduct } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { Rating } from '@/components/ui/Rating';
import { Button, LinkButton } from '@/components/ui/Button';
import { useShop } from '@/lib/store';
import { Reveal } from '@/components/ui/Reveal';

type Answers = {
  brewMethod: string | null;
  flavor: string | null;
  intensity: string | null;
  grind: string | null;
  purchase: string | null;
};

const steps = [
  {
    key: 'brewMethod' as const,
    question: 'Welche Zubereitungsart verwenden Sie?',
    options: [
      { value: 'Siebträger', label: 'Siebträger' },
      { value: 'Vollautomat', label: 'Vollautomat' },
      { value: 'Filter', label: 'Filter / Handaufguss' },
      { value: 'Moka', label: 'Moka / Herdkanne' },
    ],
  },
  {
    key: 'flavor' as const,
    question: 'Welche Geschmacksrichtung bevorzugen Sie?',
    options: [
      { value: 'fruchtig', label: 'Fruchtig & blumig' },
      { value: 'schokoladig', label: 'Schokoladig & nussig' },
      { value: 'karamell', label: 'Karamellig & süß' },
      { value: 'wuerzig', label: 'Würzig & rauchig' },
    ],
  },
  {
    key: 'intensity' as const,
    question: 'Wie intensiv darf Ihr Kaffee sein?',
    options: [
      { value: 'mild', label: 'Mild' },
      { value: 'ausgewogen', label: 'Ausgewogen' },
      { value: 'kraeftig', label: 'Kräftig' },
    ],
  },
  {
    key: 'grind' as const,
    question: 'Ganze Bohne oder gemahlen?',
    options: [
      { value: 'ganz', label: 'Ganze Bohne' },
      { value: 'gemahlen', label: 'Gemahlen' },
    ],
  },
  {
    key: 'purchase' as const,
    question: 'Einmaliger Kauf oder regelmäßige Lieferung?',
    options: [
      { value: 'einmalig', label: 'Einmaliger Kauf' },
      { value: 'abo', label: 'Regelmäßiges Abo' },
    ],
  },
];

function scoreCoffee(c: CoffeeProduct, a: Answers): number {
  let score = 0;
  if (a.brewMethod && c.brewMethods.some((m) => m.toLowerCase().includes(a.brewMethod!.toLowerCase()))) score += 4;
  const flavorMap: Record<string, string[]> = {
    fruchtig: ['Single Origin', 'Limited Edition'],
    schokoladig: ['Espresso', 'Blends'],
    karamell: ['Filterkaffee', 'Blends'],
    wuerzig: ['Blends', 'Espresso'],
  };
  if (a.flavor && flavorMap[a.flavor]?.includes(c.category)) score += 3;
  if (a.intensity) {
    const target = a.intensity === 'mild' ? 2 : a.intensity === 'ausgewogen' ? 3 : 5;
    score += Math.max(0, 4 - Math.abs(c.intensity - target));
  }
  if (c.category === 'Entkoffeiniert') score -= 3;
  return score;
}

export function CoffeeFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ brewMethod: null, flavor: null, intensity: null, grind: null, purchase: null });
  const { addToCart } = useShop();

  const done = step >= steps.length;

  const results = useMemo(() => {
    if (!done) return [];
    return [...coffees].sort((a, b) => scoreCoffee(b, answers) - scoreCoffee(a, answers)).slice(0, 3);
  }, [done, answers]);

  function selectOption(value: string) {
    setAnswers((prev) => ({ ...prev, [steps[step].key]: value }));
    setStep((s) => s + 1);
  }

  function reset() {
    setAnswers({ brewMethod: null, flavor: null, intensity: null, grind: null, purchase: null });
    setStep(0);
  }

  return (
    <section id="kaffeeberatung" className="bg-sand-100 py-20 sm:py-28">
      <div className="container container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-copper-500">Kaffeeberatung</p>
          <h2 className="mt-3 font-display text-display-md font-semibold text-ink-900 text-balance">Finden Sie Ihren perfekten Kaffee</h2>
          <p className="mt-4 text-base text-ink-500">Fünf kurze Fragen, drei passende Empfehlungen — direkt kaufbar.</p>
        </Reveal>

        <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-ink-900/10 bg-cream-50 p-6 shadow-soft sm:p-10">
          {!done ? (
            <div>
              <div className="mb-8 flex items-center gap-2" aria-hidden="true">
                {steps.map((_, i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-copper-500' : 'bg-ink-900/10'}`} />
                ))}
              </div>
              <p className="text-xs font-medium uppercase tracking-wider text-ink-300">
                Frage {step + 1} von {steps.length}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold text-ink-900 sm:text-2xl">{steps[step].question}</h3>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {steps[step].options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => selectOption(opt.value)}
                    className="rounded-2xl border border-ink-900/15 bg-cream-50 px-4 py-4 text-left text-sm font-medium text-ink-900 transition-all hover:border-copper-500 hover:bg-copper-50 btn-focus-ring"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button type="button" onClick={() => setStep((s) => s - 1)} className="mt-6 text-sm font-medium text-ink-500 hover:text-ink-900">
                  ← Zurück
                </button>
              )}
            </div>
          ) : (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-copper-600">
                  <Sparkles size={18} />
                  <p className="font-display text-lg font-semibold text-ink-900">Ihre Empfehlungen</p>
                </div>
                <button type="button" onClick={reset} className="flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-900">
                  <RotateCcw size={14} /> Neu starten
                </button>
              </div>
              <div className="space-y-4">
                {results.map((c, i) => (
                  <div key={c.id} className="flex flex-col gap-4 rounded-2xl border border-ink-900/10 p-4 sm:flex-row sm:items-center">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-sand-100 sm:h-20 sm:w-20">
                      <Image src={c.images[0]} alt={c.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-display text-base font-semibold text-ink-900">{c.name}</p>
                      <Rating value={c.rating} count={c.reviewCount} className="mt-1" />
                      <p className="mt-1.5 text-xs leading-relaxed text-ink-500">
                        {i === 0 ? 'Beste Übereinstimmung: ' : ''}
                        {c.flavorNotes.slice(0, 2).join(', ')} · passend für {answers.brewMethod ?? 'Ihre Zubereitung'}.
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="font-display text-sm font-semibold text-ink-900">{formatPrice(c.price)}</span>
                      <Button
                        variant="primary"
                        size="sm"
                        icon={<Check size={14} />}
                        onClick={() => addToCart({ productId: c.id, slug: c.slug, name: c.name, image: c.images[0], price: c.price, quantity: 1 })}
                      >
                        Kaufen
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              {answers.purchase === 'abo' && (
                <div className="mt-5 rounded-xl bg-copper-50 p-4 text-sm text-espresso-900">
                  Sie bevorzugen regelmäßige Lieferung? <Link href="/abo" className="font-semibold underline">Entdecken Sie unser Kaffee-Abo</Link> und sparen Sie bis zu 20 %.
                </div>
              )}
              <LinkButton href="/kaffee" variant="ghost" size="sm" className="mt-5">
                Weitere Kaffees ansehen
              </LinkButton>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
