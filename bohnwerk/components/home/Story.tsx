import Image from 'next/image';
import { img } from '@/lib/data/images';
import { LinkButton } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

export function Story() {
  return (
    <section className="bg-sand-100 py-20 sm:py-28">
      <div className="container container-px">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image src={img.storyRegion1} alt="" fill className="object-cover" />
            </div>
            <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-2xl">
              <Image src={img.storyRoast} alt="" fill className="object-cover" />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="eyebrow text-copper-500">Unsere Geschichte</p>
              <h2 className="mt-3 font-display text-display-md font-semibold text-ink-900 text-balance">Von der Farm bis in Ihre Tasse</h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-500">
                Wir reisen zu den Ursprüngen unseres Kaffees, wählen jede Charge persönlich aus und rösten sie in unserer Hamburger Rösterei in kleinen Mengen. So bleibt
                Transparenz kein Versprechen, sondern gelebte Praxis — von der Anbauregion bis zur fertigen Röstung.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-ink-900/10 pt-6">
                <div>
                  <p className="font-display text-2xl font-bold text-ink-900">12</p>
                  <p className="text-xs text-ink-500">Partnerfarmen</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-ink-900">6</p>
                  <p className="text-xs text-ink-500">Anbauregionen</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-ink-900">2019</p>
                  <p className="text-xs text-ink-500">Gegründet in Hamburg</p>
                </div>
              </div>
              <LinkButton href="/ueber-uns" variant="primary" size="md" className="mt-8">
                Unsere Geschichte entdecken
              </LinkButton>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
