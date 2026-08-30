import type { Metadata } from 'next';
import { CheckoutFlow } from './CheckoutFlow';

export const metadata: Metadata = { title: 'Kasse', robots: { index: false, follow: false } };

export default function CheckoutPage() {
  return (
    <div className="container container-px py-10">
      <CheckoutFlow />
    </div>
  );
}
