import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { articles } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Magazin — Kaffee-Wissen & Rezepte',
  description: 'Zubereitung, Mahlgrad, Röstungen, Maschinenpflege und Rezepte — alles rund um Kaffee, verständlich erklärt.',
};

export default function MagazinePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Start', href: '/' }, { label: 'Magazin' }]} />
      <div className="container container-px py-10">
        <p className="eyebrow text-copper-500">Kaffee-Wissen</p>
        <h1 className="mt-3 font-display text-display-md font-semibold text-ink-900">Magazin</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-500">Lesen, lernen, besser brühen — Zubereitung, Maschinenpflege und Rezepte von unserem Team.</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <Link key={a.id} href={`/magazin/${a.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src={a.image} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <p className="mt-4 eyebrow text-copper-500">{a.category}</p>
              <p className="mt-1.5 font-display text-base font-semibold text-ink-900 group-hover:text-copper-600">{a.title}</p>
              <p className="mt-1.5 text-sm text-ink-500">{a.excerpt}</p>
              <p className="mt-2 text-xs text-ink-400">{a.readMinutes} Min. Lesezeit</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
