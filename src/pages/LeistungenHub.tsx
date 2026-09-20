import { Link } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CTABand } from "@/components/ui/CTABand";
import { SEO } from "@/components/seo/SEO";
import { breadcrumbSchema } from "@/components/seo/structuredData";
import { servicesByCategory } from "@/content/nav";

export default function LeistungenHub() {
  return (
    <>
      <SEO
        title="Leistungen | Digitalstrategie, E-Commerce, KI, CRM, SEO & Branding | ONSET.digital"
        description="Alle Leistungen von ONSET.digital im Überblick: Digitalstrategie, E-Commerce & Shopify, Webdesign, KI-Automatisierung, CRM, SEO, Google Ads und Branding."
        path="/leistungen/"
        jsonLd={breadcrumbSchema([{ name: "Leistungen", path: "/leistungen/" }])}
      />
      <Breadcrumbs items={[{ name: "Leistungen", path: "/leistungen/" }]} />

      <section className="border-b border-line bg-paper py-16 md:py-24">
        <Container>
          <p className="kicker text-graphite">Leistungen</p>
          <h1 className="mt-4 max-w-2xl font-display text-[clamp(2rem,3.5vw+1rem,3.25rem)] text-balance">
            Acht Leistungsfelder, eine strategische Verantwortung
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-graphite text-balance">
            Wir bündeln Strategie, Commerce, Technologie und Sichtbarkeit in einem System statt in getrennten
            Einzelaufträgen. Jede Leistung ist einzeln buchbar – entfaltet ihre volle Wirkung jedoch im
            Zusammenspiel mit den anderen.
          </p>
        </Container>
      </section>

      {servicesByCategory.map(({ category, items }) => (
        <section key={category} className="border-b border-line py-16">
          <Container>
            <p className="kicker text-graphite">{category}</p>
            <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
              {items.map((service) => (
                <Link
                  key={service.slug}
                  to={`/leistungen/${service.slug}/`}
                  className="group flex flex-col justify-between gap-6 bg-paper-raised p-7 transition-colors hover:bg-ink hover:text-paper md:p-9"
                >
                  <div>
                    <h2 className="font-display text-2xl">{service.navLabel}</h2>
                    <p className="mt-3 text-graphite group-hover:text-smoke">{service.heroLead}</p>
                  </div>
                  <span className="text-sm underline-offset-4 group-hover:underline">
                    {service.primaryCTA} →
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ))}

      <CTABand
        title="Unsicher, wo Sie ansetzen sollten?"
        description="Im Erstgespräch ordnen wir Ihre Ausgangslage ein und zeigen, welches Leistungsfeld zuerst wirkt."
        primaryLabel="Digitalstrategie entwickeln"
      />
    </>
  );
}
