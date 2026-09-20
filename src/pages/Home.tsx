import { Link } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { SEO } from "@/components/seo/SEO";
import { services } from "@/content/services";
import { caseStudies } from "@/content/caseStudies";
import { insights } from "@/content/insights";
import { globalProcess, differentiators, company } from "@/content/company";

const trustPlaceholders = [
  "[Kundenlogo]",
  "[Kundenlogo]",
  "[Kundenlogo]",
  "[Zertifizierung]",
  "[Partnerschaft]",
  "[Kundenlogo]",
];

const systemNodes = [
  "Marke",
  "Website / Shop",
  "CRM",
  "Automatisierung",
  "SEO",
  "Performance Marketing",
  "Content",
  "Daten & Prozesse",
];

export default function Home() {
  const flagshipCaseStudy = caseStudies[0];

  return (
    <>
      <SEO
        title="ONSET.digital — Digitalagentur Köln für Strategie, E-Commerce, KI & Automatisierung"
        description="ONSET.digital entwickelt digitale Systeme aus Marke, Commerce, CRM, Automatisierung und Sichtbarkeit – strategisch geplant und technisch umgesetzt aus einer Verantwortung."
        path="/"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <Container className="relative grid grid-cols-1 gap-12 pb-20 pt-16 md:pt-24 lg:grid-cols-12 lg:gap-8 lg:pb-28">
          <div className="lg:col-span-7">
            <p className="kicker text-smoke">Digitalagentur für Strategie, Commerce & Automatisierung — Köln</p>
            <h1 className="text-balance mt-6 max-w-2xl font-display text-[clamp(2.5rem,5vw+1rem,4.5rem)]">
              Digitale Systeme für Marken, die weiterdenken.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-smoke text-balance">
              Wir verbinden Strategie, Commerce, CRM, Automatisierung und Sichtbarkeit zu einem digitalen System, das
              wirtschaftlich zusammenarbeitet – statt Einzelmaßnahmen, die nebeneinander laufen.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Button href="/kontakt/" tone="dark">Projekt anfragen</Button>
              <Button href="/referenzen/" variant="secondary" tone="dark">Referenzen ansehen</Button>
            </div>
            <p className="mt-10 text-xs text-smoke">
              Strategische Digitalisierungsarbeit für mittelständische Unternehmen, E-Commerce-Marken und B2B-Dienstleister mit Sitz in Köln.
            </p>
          </div>
          <div className="lg:col-span-5">
            <ImagePlaceholder
              tone="dark"
              spec={{
                label: "Hero-Visual",
                ratioDesktop: "4/5",
                ratioMobile: "4/5",
                motif:
                  "Hochwertige, reduzierte visuelle Inszenierung eines realen digitalen Projekts oder eines individuell entwickelten Marken- und Interface-Systems",
                wirkung: "exklusiv, präzise, technisch, editorial",
                funktion: "vermittelt Kompetenz und Designanspruch innerhalb weniger Sekunden",
                type: "Fotografie",
                mobileNote: "Ausschnitt auf das zentrale Motiv reduzieren, kein generisches Dashboard",
              }}
            />
          </div>
        </Container>
      </section>

      {/* Trust */}
      <section className="border-b border-line bg-paper py-12">
        <Container>
          <p className="kicker text-graphite">Vertrauen von Marken und Partnern</p>
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6">
            {trustPlaceholders.map((label, i) => (
              <div
                key={i}
                className="flex h-16 items-center justify-center border border-dashed border-line text-xs text-graphite"
              >
                {label}
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-smoke">
            Platzhalter bis zur Freigabe echter Kundenlogos, Zertifizierungen und Partnerschaften.
          </p>
        </Container>
      </section>

      {/* Positioning */}
      <section className="py-20 md:py-28">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="kicker text-graphite">Wie wir arbeiten</p>
            <h2 className="mt-4 font-display text-3xl md:text-4xl text-balance">
              Kein Projekt. Ein System, das mitwächst.
            </h2>
            <p className="mt-6 text-graphite">
              Die meisten Unternehmen beauftragen Marke, Website, CRM, Automatisierung und Marketing getrennt
              voneinander. Wir entwickeln sie als ein zusammenhängendes System – damit Entscheidungen in einem
              Bereich die anderen stärken statt zu behindern.
            </p>
            <p className="mt-4 text-graphite">
              Das Ergebnis: weniger Reibung zwischen Tools und Dienstleistern, geringere Betriebskosten durch
              sinnvolle Automatisierung und planbareres Wachstum durch durchdachtes Design, Sichtbarkeit und
              Performance Marketing.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="border border-line bg-paper-raised p-6 md:p-10">
              <p className="kicker mb-6 text-graphite">Bildplatzhalter — Systemgrafik</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {systemNodes.map((node) => (
                  <div
                    key={node}
                    className="flex h-20 items-center justify-center border border-line px-2 text-center text-sm"
                  >
                    {node}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs text-graphite">
                [PLATZHALTER – individuelle Systemgrafik: Verbindung von Strategie, Design, Technologie, Marketing
                und Automatisierung. Keine generische Netzwerk- oder Kreisdarstellung, sondern eine für ONSET.digital
                entwickelte Visualisierung.]
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Services overview */}
      <section className="border-y border-line bg-mist/40 py-20 md:py-28">
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="kicker text-graphite">Leistungen</p>
              <h2 className="mt-4 max-w-xl font-display text-3xl md:text-4xl text-balance">
                Acht Leistungsfelder. Eine strategische Verantwortung.
              </h2>
            </div>
            <Button href="/leistungen/" variant="secondary">Alle Leistungen im Überblick</Button>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Link
                key={service.slug}
                to={`/leistungen/${service.slug}/`}
                className="group flex flex-col justify-between gap-6 bg-paper-raised p-7 transition-colors hover:bg-ink hover:text-paper"
              >
                <div>
                  <p className="kicker text-graphite group-hover:text-smoke">{service.category}</p>
                  <h3 className="mt-3 font-display text-xl">{service.navLabel}</h3>
                  <p className="mt-3 text-sm text-graphite group-hover:text-smoke">{service.menuDescription}</p>
                </div>
                <span className="text-sm underline-offset-4 group-hover:underline">Leistung ansehen →</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Case studies */}
      <section className="bg-ink py-20 text-paper md:py-28">
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="kicker text-smoke">Ausgewählte Referenzen</p>
              <h2 className="mt-4 max-w-xl font-display text-3xl md:text-4xl text-balance">
                Ein Projekt, ein System — von der Marke bis zur Automatisierung.
              </h2>
            </div>
            <Button href="/referenzen/" variant="secondary" tone="dark">Alle Referenzen</Button>
          </div>

          {flagshipCaseStudy && (
            <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <ImagePlaceholder tone="dark" spec={flagshipCaseStudy.imagePlaceholders.cover} />
              </div>
              <div className="lg:col-span-5">
                <p className="kicker text-smoke">{flagshipCaseStudy.industry}</p>
                <h3 className="mt-3 font-display text-2xl">{flagshipCaseStudy.client}</h3>
                <p className="mt-4 text-smoke">{flagshipCaseStudy.summary}</p>
                <ul className="mt-6 space-y-2 text-sm text-smoke">
                  {flagshipCaseStudy.deliverables.slice(0, 3).map((d) => (
                    <li key={d} className="border-t border-line-dark pt-2">{d}</li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button href={`/referenzen/${flagshipCaseStudy.slug}/`} tone="dark">Case Study ansehen</Button>
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* Process */}
      <section className="py-20 md:py-28">
        <Container>
          <p className="kicker text-graphite">Arbeitsweise</p>
          <h2 className="mt-4 max-w-xl font-display text-3xl md:text-4xl text-balance">
            Ein Prozess, sieben Schritte, ein Verantwortlicher.
          </h2>
          <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
            {globalProcess.map((step, i) => (
              <div key={step.title} className="border-t border-line pt-5">
                <p className="kicker text-smoke">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-display text-lg">{step.title}</h3>
                <p className="mt-2 text-sm text-graphite">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Differentiation */}
      <section className="bg-ink py-20 text-paper md:py-28">
        <Container>
          <p className="kicker text-smoke">Differenzierung</p>
          <h2 className="mt-4 max-w-xl font-display text-3xl md:text-4xl text-balance">
            Wodurch sich ONSET.digital unterscheidet.
          </h2>
          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2">
            {differentiators.map((item) => (
              <div key={item.title} className="border-t border-line-dark pt-5">
                <h3 className="font-display text-lg">{item.title}</h3>
                <p className="mt-2 text-sm text-smoke">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Insights */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="kicker text-graphite">Insights</p>
              <h2 className="mt-4 max-w-xl font-display text-3xl md:text-4xl text-balance">
                Fundierte Analysen statt Marketing-Floskeln.
              </h2>
            </div>
            <Button href="/insights/" variant="secondary">Alle Insights</Button>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2">
            {insights.map((insight) => (
              <Link key={insight.slug} to={`/insights/${insight.slug}/`} className="group">
                <ImagePlaceholder spec={insight.imagePlaceholder} />
                <p className="kicker mt-5 text-graphite">{insight.cluster}</p>
                <h3 className="mt-2 font-display text-xl group-hover:underline underline-offset-4">{insight.title}</h3>
                <p className="mt-2 text-sm text-graphite">{insight.excerpt}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Closing CTA */}
      <section className="bg-ink py-24 text-paper md:py-32">
        <Container className="text-center">
          <p className="kicker text-smoke">Nächster Schritt</p>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl md:text-5xl text-balance">
            Lassen Sie uns das digitale System hinter Ihrem Wachstum entwickeln.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-smoke">
            Im Erstgespräch klären wir Ausgangslage, Ziele und den passenden nächsten Schritt – unverbindlich und
            auf Ihre Situation zugeschnitten. {company.name} antwortet in der Regel innerhalb von zwei Werktagen.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <Button href="/kontakt/" tone="dark">Projekt anfragen</Button>
            <Button href="/kontakt/" variant="secondary" tone="dark">Erstgespräch vereinbaren</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
