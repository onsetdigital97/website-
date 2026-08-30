import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { articles, getArticleBySlug, getProductsByIds } from '@/lib/data';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { RelatedProducts } from '@/components/product/RelatedProducts';

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt, openGraph: { images: [article.image] } };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const relatedProducts = getProductsByIds(article.relatedProductIds);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: [article.image],
    datePublished: article.date,
    author: { '@type': 'Organization', name: 'Bohnwerk' },
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[{ label: 'Start', href: '/' }, { label: 'Magazin', href: '/magazin' }, { label: article.title }]} />
      <article className="container container-px py-10">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow text-copper-500">{article.category}</p>
          <h1 className="mt-3 font-display text-display-md font-semibold text-ink-900 text-balance">{article.title}</h1>
          <p className="mt-3 text-sm text-ink-400">
            {new Date(article.date).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })} · {article.readMinutes} Min. Lesezeit
          </p>
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image src={article.image} alt={article.title} fill className="object-cover" priority />
          </div>
          <div className="mt-8 space-y-5">
            {article.content.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-ink-700">
                {p}
              </p>
            ))}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mx-auto mt-16 max-w-4xl border-t border-ink-900/10 pt-16">
            <RelatedProducts title="Passende Produkte" products={relatedProducts} />
          </div>
        )}
      </article>
    </>
  );
}
