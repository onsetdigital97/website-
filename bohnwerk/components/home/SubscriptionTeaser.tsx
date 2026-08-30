import Image from 'next/image';
import { Check } from 'lucide-react';
import { subscriptionPlans } from '@/lib/data';
import { LinkButton } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { img } from '@/lib/data/images';
import { cn } from '@/lib/utils';

export function SubscriptionTeaser() {
  return (
    <section className="bg-espresso-950 py-20 sm:py-28">
      <div className="container container-px">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image src={img.beansBag} alt="" fill className="object-cover" />
          </Reveal>
          <div>
            <Reveal>
              <p className="eyebrow text-copper-300">Der Bohnwerk Zirkel</p>
              <h2 className="mt-3 font-display text-display-md font-semibold text-cream-50 text-balance">Ihr Kaffee-Abo, ganz nach Ihrem Rhythmus</h2>
              <p className="mt-4 max-w-lg text-base text-cream-200/80">Freie Sortenwahl, flexibles Lieferintervall, jederzeit pausierbar oder kündbar — und bis zu 20 % Abo-Vorteil.</p>
            </Reveal>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {subscriptionPlans.map((plan, i) => (
                <Reveal key={plan.id} delay={i * 80}>
                  <div className={cn('h-full rounded-2xl border p-5', plan.highlighted ? 'border-copper-400 bg-copper-500/10' : 'border-cream-50/10 bg-cream-50/5')}>
                    <p className="font-display font-semibold text-cream-50">{plan.name}</p>
                    <p className="mt-1 text-2xl font-display font-bold text-copper-300">{plan.discountPercent}%</p>
                    <p className="text-xs text-cream-200/60">Abo-Vorteil</p>
                    <ul className="mt-3 space-y-1.5">
                      {plan.features.slice(0, 2).map((f) => (
                        <li key={f} className="flex items-start gap-1.5 text-xs text-cream-200/75">
                          <Check size={13} className="mt-0.5 shrink-0 text-copper-400" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
            <LinkButton href="/abo" variant="secondary" size="lg" className="mt-8">
              Abo konfigurieren
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
