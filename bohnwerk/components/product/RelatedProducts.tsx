import { Product } from '@/lib/types';
import { ProductCard } from '@/components/product/ProductCard';

export function RelatedProducts({ title, products }: { title: string; products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <div>
      <h2 className="font-display text-display-sm font-semibold text-ink-900">{title}</h2>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
