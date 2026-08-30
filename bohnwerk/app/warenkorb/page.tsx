import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CartPageContent } from './CartPageContent';

export const metadata: Metadata = { title: 'Warenkorb' };

export default function CartPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Start', href: '/' }, { label: 'Warenkorb' }]} />
      <div className="container container-px py-10">
        <h1 className="font-display text-display-md font-semibold text-ink-900">Warenkorb</h1>
        <div className="mt-10">
          <CartPageContent />
        </div>
      </div>
    </>
  );
}
