import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/kasse', '/konto', '/suche'] }],
    sitemap: 'https://www.bohnwerk.de/sitemap.xml',
  };
}
