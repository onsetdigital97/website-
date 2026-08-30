import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { coffees, getCoffeeBySlug, getProductsByIds } from '@/lib/data';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Gallery } from '@/components/product/Gallery';
import { CoffeeBuyBox } from '@/components/product/CoffeeBuyBox';
import { FlavorProfile } from '@/components/product/FlavorProfile';
import { Reviews } from '@/components/product/Reviews';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { RecentlyViewed } from '@/components/product/RecentlyViewed';
import { TrustBadges } from '@/components/product/TrustBadges';
import { TrackView } from '@/components/product/TrackView';
import { Accordion } from '@/components/ui/Accordion';
import { formatPrice } from '@/lib/utils';

export function generateStaticParams() {
  return coffees.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getCoffeeBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: { images: [product.images[0]] },
  };
}

const faqs = [
  { question: 'Wie sollte ich diesen Kaffee lagern?', answer: 'Luftdicht, dunkel und bei Zimmertemperatur — am besten im Originalbeutel mit Aromaventil.' },
  { question: 'Kann ich den Mahlgrad nachträglich ändern?', answer: 'Bei einer neuen Bestellung können Sie jederzeit einen anderen Mahlgrad wählen.' },
  { question: 'Ist der Kaffee für Vollautomaten geeignet?', answer: 'Ja, sofern „Vollautomat“ bei den Zubereitungsarten aufgeführt ist — sonst empfehlen wir eine passende Mahlgrad-Variante.' },
];

export default function CoffeeDetailPage({ params }: { params: { slug: string } }) {
  const product = getCoffeeBySlug(params.slug);
  if (!product) notFound();

  const related = getProductsByIds(product.relatedIds);
  const accessories = getProductsByIds(product.accessoryIds);

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
      url: `https://www.bohnwerk.de/kaffee/${product.slug}`,
    },
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://www.bohnwerk.de' },
      { '@type': 'ListItem', position: 2, name: 'Kaffee', item: 'https://www.bohnwerk.de/kaffee' },
      { '@type': 'ListItem', position: 3, name: product.name },
    ],
  };
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <TrackView productId={product.id} />

      <Breadcrumbs items={[{ label: 'Start', href: '/' }, { label: 'Kaffee', href: '/kaffee' }, { label: product.name }]} />

      <div className="container container-px py-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Gallery images={product.images} name={product.name} />
          <div>
            <CoffeeBuyBox product={product} />
            <div className="mt-6">
              <TrustBadges />
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-10 border-t border-ink-900/10 pt-16 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-display-sm font-semibold text-ink-900">Geschmacksprofil</h2>
            <div className="mt-6">
              <FlavorProfile profile={product.profile} />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {product.flavorNotes.map((note) => (
                <span key={note} className="rounded-full bg-copper-50 px-3 py-1.5 text-xs font-medium text-copper-700">
                  {note}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-display-sm font-semibold text-ink-900">Herkunft & Details</h2>
            <dl className="mt-6 grid grid-cols-2 gap-y-4 text-sm">
              {[
                ['Herkunft', product.origin],
                ['Anbauregion', product.region],
                ['Anbauhöhe', product.altitude],
                ['Varietät', product.variety],
                ['Aufbereitung', product.processing],
                ['Röstgrad', `${product.roast}/5`],
                ['Empfohlene Zubereitung', product.brewMethods.join(', ')],
                ['Grundpreis', `${formatPrice(product.pricePerKg)}/kg`],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs uppercase tracking-wide text-ink-300">{label}</dt>
                  <dd className="mt-0.5 font-medium text-ink-900">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-16 border-t border-ink-900/10 pt-16">
          <h2 className="font-display text-display-sm font-semibold text-ink-900">Beschreibung</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-600">{product.description}</p>
        </div>

        <div className="mt-16 space-y-16 border-t border-ink-900/10 pt-16">
          <RelatedProducts title="Ähnliche Kaffees" products={related} />
          <RelatedProducts title="Passendes Zubehör" products={accessories} />
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
    </>
  );
}
