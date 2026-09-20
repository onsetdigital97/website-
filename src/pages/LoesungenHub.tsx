import { Link } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CTABand } from "@/components/ui/CTABand";
import { SEO } from "@/components/seo/SEO";
import { breadcrumbSchema } from "@/components/seo/structuredData";
import { solutions } from "@/content/solutions";

export default function LoesungenHub() {
  return (
    <>
      <SEO
        title="Lösungen nach Ausgangssituation | ONSET.digital"
        description="Digitale Lösungen nach Ausgangssituation: für E-Commerce-Unternehmen, den Mittelstand, Shopify-Unternehmen, vor einem Website-Relaunch oder für den Einsatz von KI."
        path="/loesungen/"
        jsonLd={breadcrumbSchema([{ name: "Lösungen", path: "/loesungen/" }])}
      />
      <Breadcrumbs items={[{ name: "Lösungen", path: "/loesungen/" }]} />

      <section className="border-b border-line bg-paper py-16 md:py-24">
        <Container>
          <p className="kicker text-graphite">Lösungen</p>
          <h1 className="mt-4 max-w-2xl font-display text-[clamp(2rem,3.5vw+1rem,3.25rem)] text-balance">
            Nicht jede Leistung passt zu jeder Ausgangslage
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-graphite text-balance">
            Wählen Sie den Einstieg über Ihre aktuelle Situation statt über eine einzelne Leistung – wir bündeln die
            passenden Bausteine für Ihren konkreten Ausgangspunkt.
          </p>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
            {solutions.map((solution) => (
              <Link
                key={solution.slug}
                to={`/loesungen/${solution.slug}/`}
                className="group flex flex-col justify-between gap-8 bg-paper-raised p-8 transition-colors hover:bg-ink hover:text-paper md:p-10"
              >
                <div>
                  <p className="kicker text-graphite group-hover:text-smoke">{solution.heroKicker}</p>
                  <h2 className="mt-3 font-display text-2xl">{solution.navLabel}</h2>
                  <p className="mt-3 text-graphite group-hover:text-smoke">{solution.heroLead}</p>
                </div>
                <span className="text-sm underline-offset-4 group-hover:underline">{solution.primaryCTA} →</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTABand
        title="Ihre Situation ist nicht dabei?"
        description="Beschreiben Sie uns Ihre Ausgangslage im Erstgespräch – wir ordnen sie ein und zeigen den passenden Weg."
        primaryLabel="Erstgespräch vereinbaren"
      />
    </>
  );
}
