import type { MetadataRoute } from 'next';
import { coffees, machines, accessories, courses, articles } from '@/lib/data';
import { productHref } from '@/lib/utils';

const base = 'https://www.bohnwerk.de';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['/', '/kaffee', '/maschinen', '/muehlen', '/zubehoer', '/kurse', '/abo', '/magazin', '/ueber-uns', '/kontakt', '/faq'].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const productPages = [...coffees, ...machines, ...accessories].map((p) => ({ url: `${base}${productHref(p)}`, lastModified: new Date() }));
  const coursePages = courses.map((c) => ({ url: `${base}/kurse/${c.slug}`, lastModified: new Date() }));
  const articlePages = articles.map((a) => ({ url: `${base}/magazin/${a.slug}`, lastModified: new Date(a.date) }));

  return [...staticPages, ...productPages, ...coursePages, ...articlePages];
}
