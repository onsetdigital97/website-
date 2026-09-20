import { Link } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { CTABand } from "@/components/ui/CTABand";
import { SEO } from "@/components/seo/SEO";
import { breadcrumbSchema } from "@/components/seo/structuredData";
import { insights } from "@/content/insights";

export default function InsightsHub() {
  return (
    <>
      <SEO
        title="Insights: Analysen zu E-Commerce, Shopify, KI & Automatisierung | ONSET.digital"
        description="Fundierte Analysen und Guides zu E-Commerce, Shopify, KI-Automatisierung und SEO – ohne Marketing-Floskeln, dafür mit nachvollziehbaren Argumenten."
        path="/insights/"
        jsonLd={breadcrumbSchema([{ name: "Insights", path: "/insights/" }])}
      />
      <Breadcrumbs items={[{ name: "Insights", path: "/insights/" }]} />

      <section className="border-b border-line bg-paper py-16 md:py-24">
        <Container>
          <p className="kicker text-graphite">Insights</p>
          <h1 className="mt-4 max-w-2xl font-display text-[clamp(2rem,3.5vw+1rem,3.25rem)] text-balance">
            Fundierte Analysen statt Marketing-Floskeln
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-graphite text-balance">
            Der Insights-Bereich wächst kontinuierlich entlang unserer Themencluster E-Commerce & Shopify, KI &
            Automatisierung, CRM & Prozesse, SEO & Sichtbarkeit sowie Branding & digitale Strategie.
          </p>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            {insights.map((insight) => (
              <Link key={insight.slug} to={`/insights/${insight.slug}/`} className="group block">
                <ImagePlaceholder spec={insight.imagePlaceholder} />
                <p className="kicker mt-5 text-graphite">{insight.cluster} · {insight.readTime}</p>
                <h2 className="mt-2 font-display text-2xl group-hover:underline underline-offset-4">{insight.title}</h2>
                <p className="mt-2 text-graphite">{insight.excerpt}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTABand
        title="Fragen zu einem konkreten Thema?"
        description="Wenn Sie eine Fragestellung nicht in unseren Insights finden, klären wir sie direkt im Erstgespräch."
        primaryLabel="Erstgespräch vereinbaren"
      />
    </>
  );
}
