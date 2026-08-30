import type { Metadata } from 'next';
import { AccountHome } from './AccountHome';

export const metadata: Metadata = { title: 'Mein Konto', robots: { index: false, follow: false } };

export default function AccountPage() {
  return <AccountHome />;
}
