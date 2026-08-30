import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { accessories, getAccessoryBySlug, getProductsByIds } from '@/lib/data';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Gallery } from '@/components/product/Gallery';
import { AccessoryBuyBox } from '@/components/product/AccessoryBuyBox';
import { Reviews } from '@/components/product/Reviews';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { RecentlyViewed } from '@/components/product/RecentlyViewed';
import { TrustBadges } from '@/components/product/TrustBadges';
import { TrackView } from '@/components/product/TrackView';

export function generateStaticParams() {
  return accessories.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getAccessoryBySlug(params.slug);
  if (!product) return {};
  return { title: product.name, description: product.shortDescription, openGraph: { images: [product.images[0]] } };
}

export default function AccessoryDetailPage({ params }: { params: { slug: string } }) {
  const product = getAccessoryBySlug(params.slug);
  if (!product) notFound();

  const related = getProductsByIds(product.relatedIds);

  return (
    <>
      <TrackView productId={product.id} />
      <Breadcrumbs items={[{ label: 'Start', href: '/' }, { label: 'Zubehör', href: '/zubehoer' }, { label: product.name }]} />
      <div className="container container-px py-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Gallery images={product.images} name={product.name} />
          <div>
            <AccessoryBuyBox product={product} />
            <div className="mt-6">
              <TrustBadges />
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-ink-900/10 pt-16">
          <h2 className="font-display text-display-sm font-semibold text-ink-900">Beschreibung</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-600">{product.description}</p>
        </div>

        <div className="mt-16 space-y-16 border-t border-ink-900/10 pt-16">
          <RelatedProducts title="Das könnte Ihnen auch gefallen" products={related} />
          <RecentlyViewed excludeId={product.id} />
        </div>

        <div className="mt-16 border-t border-ink-900/10 pt-16">
          <h2 className="font-display text-display-sm font-semibold text-ink-900">Kundenbewertungen</h2>
          <div className="mt-6">
            <Reviews rating={product.rating} reviewCount={product.reviewCount} reviews={product.reviews} />
          </div>
        </div>
      </div>
    </>
  );
}
