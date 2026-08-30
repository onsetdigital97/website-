import { Flame, Leaf, Users, Truck, PackageCheck, ShieldCheck } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

const promises = [
  { icon: Flame, title: 'Frisch geröstet', text: 'Wöchentliche Röstung in Kleinstchargen für maximales Aroma.' },
  { icon: Leaf, title: 'Sorgfältig ausgewählt', text: 'Direkter Handel mit ausgewählten Erzeugerinnen und Erzeugern.' },
  { icon: Users, title: 'Persönlich beraten', text: 'Kaffeeberatung von echten Barista-Expertinnen und -Experten.' },
  { icon: Truck, title: 'Schnell geliefert', text: 'Versand innerhalb von 1–2 Werktagen ab Röstung.' },
  { icon: PackageCheck, title: 'Nachhaltig verpackt', text: 'Aromaventil-Verpackungen aus recycelbaren Materialien.' },
  { icon: ShieldCheck, title: 'Sicher bezahlen', text: 'Verschlüsselte Zahlung über etablierte Anbieter.' },
];

export function BrandPromise() {
  return (
    <section className="bg-cream-50 py-16 sm:py-20">
      <div className="container container-px">
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {promises.map((p, i) => (
            <Reveal key={p.title} delay={i * 50} className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-copper-50 text-copper-600">
                <p.icon size={22} strokeWidth={1.75} />
              </span>
              <div>
                <p className="font-display font-semibold text-ink-900">{p.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-500">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
