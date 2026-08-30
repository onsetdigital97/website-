import type { Metadata } from 'next';
import { Manrope, Inter } from 'next/font/google';
import './globals.css';
import { ShopProvider } from '@/lib/store';
import { AuthProvider } from '@/lib/auth';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { QuickView } from '@/components/product/QuickView';
import { CompareBar } from '@/components/product/CompareBar';
import { Toaster } from '@/components/ui/Toaster';
import { CookieConsent } from '@/components/layout/CookieConsent';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bohnwerk.de'),
  title: {
    default: 'Bohnwerk — Premium Kaffee, Espressomaschinen & Barista-Kurse',
    template: '%s | Bohnwerk',
  },
  description:
    'Bohnwerk röstet Spezialitätenkaffee in Kleinstchargen und kuratiert hochwertige Espressomaschinen, Mühlen und Zubehör. Entdecken Sie Kaffee-Abos, Barista-Kurse und mehr.',
  openGraph: {
    title: 'Bohnwerk — Premium Kaffee & Espressomaschinen',
    description: 'Spezialitätenkaffee, Espressomaschinen, Mühlen, Zubehör, Kaffee-Abos und Barista-Kurse.',
    siteName: 'Bohnwerk',
    locale: 'de_DE',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-espresso-900 focus:px-4 focus:py-2 focus:text-cream-50">
          Zum Inhalt springen
        </a>
        <AuthProvider>
          <ShopProvider>
            <AnnouncementBar />
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
            <CartDrawer />
            <QuickView />
            <CompareBar />
            <Toaster />
            <CookieConsent />
          </ShopProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
