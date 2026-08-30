import Image from 'next/image';
import Link from 'next/link';
import { articles } from '@/lib/data';
import { LinkButton } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

export function MagazineTeaser() {
  const featured = articles.slice(0, 3);
  return (
    <section className="bg-sand-100 py-20 sm:py-28">
      <div className="container container-px">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-copper-500">Magazin & Kaffee-Wissen</p>
            <h2 className="mt-3 font-display text-display-md font-semibold text-ink-900">Lesen, lernen, besser brühen</h2>
          </div>
          <LinkButton href="/magazin" variant="ghost" size="sm">
            Zum Magazin
          </LinkButton>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {featured.map((a, i) => (
            <Reveal key={a.id} delay={i * 70}>
              <Link href={`/magazin/${a.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image src={a.image} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <p className="mt-4 eyebrow text-copper-500">{a.category}</p>
                <p className="mt-1.5 font-display text-base font-semibold text-ink-900 group-hover:text-copper-600">{a.title}</p>
                <p className="mt-1.5 text-sm text-ink-500">{a.readMinutes} Min. Lesezeit</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
