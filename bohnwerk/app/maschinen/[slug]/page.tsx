import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Download, FileText } from 'lucide-react';
import { machines, getMachineBySlug, getProductsByIds } from '@/lib/data';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Gallery } from '@/components/product/Gallery';
import { MachineBuyBox } from '@/components/product/MachineBuyBox';
import { HotspotImage } from '@/components/product/HotspotImage';
import { Reviews } from '@/components/product/Reviews';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { RecentlyViewed } from '@/components/product/RecentlyViewed';
import { TrustBadges } from '@/components/product/TrustBadges';
import { TrackView } from '@/components/product/TrackView';
import { StickyBuyBar } from '@/components/product/StickyBuyBar';
import { Accordion } from '@/components/ui/Accordion';

export function generateStaticParams() {
  return machines.map((m) => ({ slug: m.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getMachineBySlug(params.slug);
  if (!product) return {};
  return { title: product.name, description: product.shortDescription, openGraph: { images: [product.images[0]] } };
}

const faqs = [
  { question: 'Wie lange dauert die Lieferung?', answer: 'In der Regel 2–4 Werktage innerhalb Deutschlands.' },
  { question: 'Ist eine Finanzierung möglich?', answer: 'Ja, an der Kasse können Sie zwischen Einmalzahlung und Ratenkauf wählen.' },
  { question: 'Wie entkalke ich die Maschine richtig?', answer: 'Nutzen Sie das automatische Entkalkungsprogramm zusammen mit unseren Reinigungstabletten alle 2–3 Monate.' },
];

export default function MachineDetailPage({ params }: { params: { slug: string } }) {
  const product = getMachineBySlug(params.slug);
  if (!product) notFound();

  const related = getProductsByIds(product.relatedIds);
  const accessories = getProductsByIds(product.accessoryIds);
  const recommendedCoffee = getProductsByIds(product.recommendedCoffeeIds);
  const categoryPath = product.category === 'Mühlen' ? '/muehlen' : '/maschinen';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.shortDescription,
    sku: product.id,
    brand: { '@type': 'Brand', name: 'Bohnwerk' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: product.rating, reviewCount: product.reviewCount },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: product.price,
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `https://www.bohnwerk.de/maschinen/${product.slug}`,
    },
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TrackView productId={product.id} />
      <Breadcrumbs items={[{ label: 'Start', href: '/' }, { label: product.category, href: categoryPath }, { label: product.name }]} />

      <div className="container container-px py-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Gallery images={product.images} name={product.name} />
          <div>
            <MachineBuyBox product={product} />
            <div className="mt-6">
              <TrustBadges />
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-ink-900/10 pt-16">
          <h2 className="font-display text-display-sm font-semibold text-ink-900">Ausstattung im Detail</h2>
          <div className="mt-8">
            <HotspotImage product={product} />
          </div>
        </div>

        <div className="mt-16 grid gap-10 border-t border-ink-900/10 pt-16 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-display-sm font-semibold text-ink-900">Technische Daten</h2>
            <dl className="mt-6 divide-y divide-ink-900/10 text-sm">
              {product.specs.map((s) => (
                <div key={s.label} className="flex justify-between gap-4 py-2.5">
                  <dt className="text-ink-500">{s.label}</dt>
                  <dd className="text-right font-medium text-ink-900">{s.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#" className="flex items-center gap-2 rounded-full border border-ink-900/15 px-4 py-2.5 text-sm font-medium text-ink-700 hover:bg-ink-900/5">
                <FileText size={15} /> Bedienungsanleitung (PDF)
              </a>
              <a href="#" className="flex items-center gap-2 rounded-full border border-ink-900/15 px-4 py-2.5 text-sm font-medium text-ink-700 hover:bg-ink-900/5">
                <Download size={15} /> Datenblatt herunterladen
              </a>
            </div>
          </div>
          <div>
            <h2 className="font-display text-display-sm font-semibold text-ink-900">Lieferumfang</h2>
            <ul className="mt-6 space-y-2.5 text-sm text-ink-700">
              {product.boxContents.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-copper-500" />
                  {item}
                </li>
              ))}
            </ul>
            <h2 className="mt-8 font-display text-display-sm font-semibold text-ink-900">Beschreibung</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-600">{product.description}</p>
          </div>
        </div>

        <div className="mt-16 space-y-16 border-t border-ink-900/10 pt-16">
          <RelatedProducts title="Empfohlene Kaffees" products={recommendedCoffee} />
          <RelatedProducts title="Passendes Zubehör" products={accessories} />
          <RelatedProducts title="Das könnte Ihnen auch gefallen" products={related} />
          <RecentlyViewed excludeId={product.id} />
        </div>

        <div id="bewertungen" className="mt-16 border-t border-ink-900/10 pt-16">
          <h2 className="font-display text-display-sm font-semibold text-ink-900">Kundenbewertungen</h2>
          <div className="mt-6">
            <Reviews rating={product.rating} reviewCount={product.reviewCount} reviews={product.reviews} />
          </div>
        </div>

        <div className="mt-16 border-t border-ink-900/10 pt-16">
          <h2 className="font-display text-display-sm font-semibold text-ink-900">Häufige Fragen</h2>
          <div className="mt-6">
            <Accordion items={faqs} />
          </div>
        </div>
      </div>

      <StickyBuyBar product={product} />
    </>
  );
}
