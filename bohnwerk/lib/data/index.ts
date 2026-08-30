import { Product } from '@/lib/types';
import { coffees, getCoffeeBySlug } from './coffees';
import { machines, getMachineBySlug } from './machines';
import { accessories, getAccessoryBySlug } from './accessories';

export { coffees, getCoffeeBySlug } from './coffees';
export { machines, getMachineBySlug } from './machines';
export { accessories, getAccessoryBySlug } from './accessories';
export { courses, getCourseBySlug } from './courses';
export { articles, getArticleBySlug } from './articles';
export { subscriptionPlans, subscriptionIntervals } from './subscriptions';

export const allProducts: Product[] = [...coffees, ...machines, ...accessories];

export function getProductBySlug(slug: string): Product | undefined {
  return getCoffeeBySlug(slug) ?? getMachineBySlug(slug) ?? getAccessoryBySlug(slug);
}

export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id);
}

export function getProductsByIds(ids: string[]): Product[] {
  return ids.map((id) => getProductById(id)).filter((p): p is Product => Boolean(p));
}

export function getBestsellers(): Product[] {
  return [...allProducts].sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount).slice(0, 8);
}

export function getNewProducts(): Product[] {
  return allProducts.filter((p) => p.badges?.includes('Neu') || p.badges?.includes('Bestseller') || p.badges?.includes('Limitiert')).slice(0, 8);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return allProducts.filter((p) => {
    const haystack = [p.name, p.shortDescription, p.category, 'description' in p ? p.description : ''].join(' ').toLowerCase();
    return haystack.includes(q);
  });
}

export function machinesByCategory(category: 'Espressomaschinen' | 'Siebträger' | 'Mühlen') {
  return machines.filter((m) => m.category === category);
}

export function coffeesByCategory(category: string) {
  return coffees.filter((c) => c.category === category);
}
