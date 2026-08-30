export function formatPrice(value: number): string {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function productHref(product: { type: string; slug: string }): string {
  if (product.type === 'coffee') return `/kaffee/${product.slug}`;
  if (product.type === 'machine') return `/maschinen/${product.slug}`;
  return `/zubehoer/${product.slug}`;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[äöüß]/g, (c) => ({ ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss' }[c] ?? c))
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
