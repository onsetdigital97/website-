import { Suspense } from 'react';
import type { Metadata } from 'next';
import { SearchResults } from './SearchResults';

export const metadata: Metadata = {
  title: 'Suche',
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <div className="container container-px py-16">
      <Suspense>
        <SearchResults />
      </Suspense>
    </div>
  );
}
