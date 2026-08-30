import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { img } from '@/lib/data/images';
import { Reveal } from '@/components/ui/Reveal';

const categories = [
  { title: 'Kaffeebohnen', href: '/kaffee', image: img.beansMacro },
  { title: 'Espressomaschinen', href: '/maschinen', image: img.espressoMachineDark },
  { title: 'Siebträger', href: '/maschinen?kategorie=Siebträger', image: img.baristaPour },
  { title: 'Kaffeemühlen', href: '/muehlen', image: img.grinder },
  { title: 'Zubehör', href: '/zubehoer', image: img.accessoryFlat },
  { title: 'Barista-Kurse', href: '/kurse', image: img.courseHands },
  { title: 'Kaffee-Abo', href: '/abo', image: img.beansBag },
];

export function CategoryGrid() {
  return (
    <section className="bg-cream-50 py-20 sm:py-28">
      <div className="container container-px">
        <Reveal>
          <p className="eyebrow text-copper-500">Sortiment</p>
          <h2 className="mt-3 max-w-lg font-display text-display-md font-semibold text-ink-900 text-balance">Alles für Ihr perfektes Kaffeeritual</h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 60} className={i === 0 ? 'col-span-2 lg:col-span-2' : ''}>
              <Link href={cat.href} className={`group relative block overflow-hidden rounded-2xl bg-sand-100 ${i === 0 ? 'aspect-[16/10] sm:aspect-[16/9]' : 'aspect-[4/5]'}`}>
                <Image
                  src={cat.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/70 via-espresso-950/5 to-transparent transition-opacity duration-500 group-hover:from-espresso-950/80" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 sm:p-5">
                  <span className="font-display text-base font-semibold text-cream-50 transition-transform duration-300 group-hover:-translate-y-1 sm:text-lg">{cat.title}</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cream-50/15 text-cream-50 backdrop-blur transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
