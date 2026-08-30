import Image from 'next/image';
import { img } from '@/lib/data/images';
import { Numbered } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

const sections = [
  {
    n: 1,
    tone: 'light' as const,
    image: img.grinder,
    imageRight: true,
    title: 'Präzises Kegelmahlwerk',
    text: 'Bohnen werden erst unmittelbar vor der Extraktion gemahlen — für spürbar mehr Aroma in der Tasse. Ihr Vorteil: kein abgestandener Kaffee, jede Tasse frisch wie die erste.',
  },
  {
    n: 2,
    tone: 'dark' as const,
    image: img.espressoMachineDark2,
    imageRight: false,
    title: 'PID-Temperatursteuerung',
    text: 'Elektronische Regelung hält die Brühtemperatur auf ±1 °C konstant. Ihr Vorteil: gleichbleibender Geschmack, egal ob erste oder zehnte Tasse am Tag.',
  },
  {
    n: 3,
    tone: 'light' as const,
    image: img.cupSteam,
    imageRight: true,
    title: 'Persönliche Getränkeprofile',
    text: 'Menge, Stärke und Temperatur lassen sich für jede Person individuell speichern. Ihr Vorteil: jeder in der Familie bekommt auf Knopfdruck genau seinen Kaffee.',
  },
  {
    n: 4,
    tone: 'dark' as const,
    image: img.baristaCounter,
    imageRight: false,
    title: 'Leichte Reinigung & Pflege',
    text: 'Herausnehmbare Brühgruppe, automatisches Spülprogramm und spülmaschinenfeste Teile. Ihr Vorteil: mehr Zeit für Kaffee, weniger für Wartung.',
  },
];

export function TechSplit() {
  return (
    <div>
      {sections.map((s) => (
        <section key={s.n} className={cn('py-16 sm:py-24', s.tone === 'dark' ? 'bg-espresso-950' : 'bg-cream-50')}>
          <div className="container container-px">
            <div className={cn('grid items-center gap-10 lg:grid-cols-2 lg:gap-16', s.imageRight && 'lg:[&>*:first-child]:order-2')}>
              <Reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image src={s.image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </Reveal>
              <Reveal delay={100}>
                <Numbered n={s.n} tone={s.tone} />
                <h3 className={cn('mt-4 font-display text-display-sm font-semibold text-balance', s.tone === 'dark' ? 'text-cream-50' : 'text-ink-900')}>{s.title}</h3>
                <p className={cn('mt-4 max-w-md text-base leading-relaxed', s.tone === 'dark' ? 'text-cream-200/80' : 'text-ink-500')}>{s.text}</p>
              </Reveal>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
