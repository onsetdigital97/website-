import type { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { organizationSchema } from "@/components/seo/structuredData";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      </Helmet>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Zum Inhalt springen
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
