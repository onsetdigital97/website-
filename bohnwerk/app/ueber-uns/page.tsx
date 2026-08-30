import type { Metadata } from 'next';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { img } from '@/lib/data/images';
import { Reveal } from '@/components/ui/Reveal';
import { LinkButton } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Über uns — Unsere Geschichte',
  description: 'Von der Anbauregion bis zur Rösterei in Hamburg: die Geschichte von Bohnwerk, unsere Werte und unsere Herkunftsregionen.',
};

const regions = [
  { name: 'Yirgacheffe, Äthiopien', desc: 'Blumig-fruchtige Hochlandkaffees, gewaschen aufbereitet.', image: img.storyRegion1 },
  { name: 'Huehuetenango, Guatemala', desc: 'Ausgewogene Kaffees mit Apfel- und Honignoten.', image: img.storyRegion2 },
  { name: 'Boquete, Panama', desc: 'Seltene Geisha-Mikrolose in limitierter Menge.', image: img.farmRegion },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Start', href: '/' }, { label: 'Über uns' }]} />

      <section className="relative flex h-[60vh] min-h-[420px] items-end overflow-hidden bg-espresso-950">
        <Image src={img.roastery} alt="" fill className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/30 to-transparent" />
        <div className="container relative container-px pb-14">
          <p className="eyebrow text-copper-300">Unsere Geschichte</p>
          <h1 className="mt-3 max-w-2xl font-display text-display-lg font-semibold text-cream-50 text-balance">Von der Farm bis in Ihre Tasse</h1>
        </div>
      </section>

      <section className="bg-cream-50 py-20 sm:py-28">
        <div className="container container-px">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-base leading-relaxed text-ink-600">
              Bohnwerk wurde 2019 in Hamburg mit einer einfachen Überzeugung gegründet: außergewöhnlicher Kaffee beginnt bei der Herkunft. Wir reisen zu unseren
              Partnerfarmen, wählen jede Charge persönlich aus und rösten sie in kleinen Mengen — für maximale Frische und Aromenvielfalt in jeder Tasse.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {regions.map((r, i) => (
              <Reveal key={r.name} delay={i * 80}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                  <Image src={r.image} alt="" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="font-display text-sm font-semibold text-cream-50">{r.name}</p>
                    <p className="mt-1 text-xs text-cream-200/80">{r.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-espresso-950 py-20 sm:py-28">
        <div className="container container-px">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <p className="eyebrow text-copper-300">Unsere Werte</p>
              <h2 className="mt-3 font-display text-display-md font-semibold text-cream-50 text-balance">Transparenz ist kein Versprechen, sondern gelebte Praxis</h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-cream-200/80">
                Wir zahlen faire Preise über dem Marktdurchschnitt, pflegen langfristige Partnerschaften und dokumentieren jeden Schritt vom Anbau bis zur Röstung.
              </p>
              <LinkButton href="/kaffee" variant="secondary" size="md" className="mt-8">
                Unsere Kaffees entdecken
              </LinkButton>
            </Reveal>
            <Reveal delay={100} className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image src={img.storyRoast} alt="" fill className="object-cover" />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
