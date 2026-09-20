import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { CTABand } from "@/components/ui/CTABand";
import { SEO } from "@/components/seo/SEO";
import { breadcrumbSchema } from "@/components/seo/structuredData";
import { caseStudies } from "@/content/caseStudies";

const allFilters = ["Alle", ...Array.from(new Set(caseStudies.flatMap((c) => c.filters)))];

export default function ReferenzenHub() {
  const [activeFilter, setActiveFilter] = useState("Alle");

  const filtered = useMemo(
    () => (activeFilter === "Alle" ? caseStudies : caseStudies.filter((c) => c.filters.includes(activeFilter))),
    [activeFilter],
  );

  return (
    <>
      <SEO
        title="Referenzen & Case Studies | ONSET.digital"
        description="Ausgewählte Referenzen von ONSET.digital: Projekte aus E-Commerce, Shopify, Webdesign, CRM, Automatisierung und SEO."
        path="/referenzen/"
        jsonLd={breadcrumbSchema([{ name: "Referenzen", path: "/referenzen/" }])}
      />
      <Breadcrumbs items={[{ name: "Referenzen", path: "/referenzen/" }]} />

      <section className="border-b border-line bg-paper py-16 md:py-24">
        <Container>
          <p className="kicker text-graphite">Referenzen</p>
          <h1 className="mt-4 max-w-2xl font-display text-[clamp(2rem,3.5vw+1rem,3.25rem)] text-balance">
            Projekte, die Strategie und Umsetzung verbinden
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-graphite text-balance">
            Der Referenzbereich befindet sich im Aufbau. Aktuell zeigen wir die vollständige Struktur einer Case
            Study anhand eines Beispielprojekts mit klar gekennzeichneten Platzhaltern – echte Projektergebnisse
            folgen nach Freigabe durch unsere Kund:innen.
          </p>
        </Container>
      </section>

      <section className="border-b border-line py-8">
        <Container>
          <div className="flex flex-wrap gap-3">
            {allFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-sm transition-colors ${
                  activeFilter === filter ? "bg-ink text-paper" : "border border-line text-graphite hover:border-ink hover:text-ink"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {filtered.map((study) => (
              <Link key={study.slug} to={`/referenzen/${study.slug}/`} className="group block">
                <ImagePlaceholder spec={study.imagePlaceholders.cover} />
                <p className="kicker mt-5 text-graphite">{study.industry}</p>
                <h2 className="mt-2 font-display text-2xl group-hover:underline underline-offset-4">{study.client}</h2>
                <p className="mt-2 text-graphite">{study.summary}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTABand
        title="Ihr Projekt könnte die nächste Referenz sein"
        description="Sprechen Sie mit uns über Ihre Ausgangslage – wir zeigen, wie ein vergleichbares System für Sie aussehen könnte."
        primaryLabel="Projekt anfragen"
      />
    </>
  );
}
