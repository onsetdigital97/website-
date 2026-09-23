import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { CTABand } from "@/components/ui/CTABand";
import { SEO } from "@/components/seo/SEO";
import { breadcrumbSchema } from "@/components/seo/structuredData";
import { company, globalProcess } from "@/content/company";

const values = [
  { title: "Verantwortung statt Übergabe", description: "Wir übergeben Strategien nicht, wir verantworten ihre Umsetzung mit." },
  { title: "Substanz statt Effekt", description: "Gestaltung und Technologie dienen einem wirtschaftlichen Ziel, nie sich selbst." },
  { title: "Klarheit statt Beliebigkeit", description: "Jede Entscheidung wird begründet – gegenüber uns selbst und gegenüber Ihnen." },
  { title: "Langfristigkeit statt Projektlogik", description: "Wir denken in Systemen, die weiterentwickelt werden, nicht in abgeschlossenen Projekten." },
];

export default function UeberOnset() {
  return (
    <>
      <SEO
        title="Über ONSET.digital | Digitalagentur Köln"
        description="ONSET.digital ist eine strategische Digital-, E-Commerce- und Automatisierungsagentur mit Sitz in Köln. Erfahren Sie mehr über Haltung, Arbeitsweise und Ansprechpartnerin."
        path="/ueber-onset/"
        jsonLd={breadcrumbSchema([{ name: "Über ONSET", path: "/ueber-onset/" }])}
      />
      <Breadcrumbs items={[{ name: "Über ONSET", path: "/ueber-onset/" }]} />

      <section className="border-b border-line bg-paper py-16 md:py-24">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="kicker text-graphite">Über ONSET.digital</p>
            <h1 className="mt-4 font-display text-[clamp(2rem,3.5vw+1rem,3.25rem)] text-balance">
              Ein strategischer Partner, kein austauschbarer Dienstleister
            </h1>
            <p className="mt-6 max-w-xl text-lg text-graphite text-balance">
              ONSET.digital wurde aus einer klaren Beobachtung heraus gegründet: Digitale Vorhaben scheitern selten
              an einzelnen Maßnahmen, sondern daran, dass Strategie, Gestaltung, Technologie und Marketing getrennt
              voneinander gedacht werden. Wir haben ONSET.digital gegründet, um genau diese Trennung aufzulösen.
            </p>
          </div>
          <div className="lg:col-span-5">
            <ImagePlaceholder
              spec={{
                label: "Inhaberin von ONSET.digital",
                ratioDesktop: "4/5",
                ratioMobile: "4/5",
                motif: "Authentisches, unaufgeregtes Porträt der Inhaberin in reduzierter Umgebung – kein gestelltes Business-Porträt",
                wirkung: "persönlich, kompetent, selbstbewusst",
                funktion: "macht die persönliche Verantwortung hinter der Marke sichtbar",
                type: "Fotografie",
                mobileNote: "Porträt mittig zuschneiden, Hintergrunddetail leicht anschneiden",
              }}
            />
          </div>
        </Container>
      </section>

      <section className="border-b border-line py-16 md:py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="kicker text-graphite">Strategischer Ansatz</p>
            <p className="mt-6 text-graphite">
              Wir beginnen jedes Projekt mit der gleichen Frage: Welches wirtschaftliche Ergebnis soll erreicht
              werden – und welches System aus Marke, Technologie und Prozessen ist dafür notwendig? Erst danach
              folgt die Entscheidung für konkrete Maßnahmen.
            </p>
            <p className="mt-4 text-graphite">
              Diese Reihenfolge unterscheidet uns von Dienstleistern, die mit einer Leistung beginnen und die
              Strategie nachträglich dazu erfinden.
            </p>
          </div>
          <div className="lg:col-span-6">
            <p className="kicker text-graphite">Qualitätsverständnis</p>
            <p className="mt-6 text-graphite">
              Hochwertige Gestaltung ist für uns kein Selbstzweck, sondern Voraussetzung für Vertrauen und
              Conversion. Technische Exzellenz ist kein Nice-to-have, sondern Grundlage für Sichtbarkeit,
              Performance und Skalierbarkeit.
            </p>
            <p className="mt-4 text-graphite">
              Wir setzen dort Automatisierung und Technologie ein, wo sie einen nachvollziehbaren wirtschaftlichen
              Effekt haben – nicht, weil es aktuell diskutiert wird.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-mist/40 py-16 md:py-20">
        <Container>
          <p className="kicker text-graphite">Werte</p>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="border-t border-line pt-4">
                <h2 className="font-display text-lg">{value.title}</h2>
                <p className="mt-2 text-sm text-graphite">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line py-16 md:py-20">
        <Container>
          <p className="kicker text-graphite">Arbeitsweise</p>
          <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
            {globalProcess.slice(0, 4).map((step, i) => (
              <div key={step.title} className="border-t border-line pt-5">
                <p className="kicker text-smoke">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-2 font-display text-lg">{step.title}</h2>
                <p className="mt-2 text-sm text-graphite">{step.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-graphite">
            Den vollständigen siebenstufigen Prozess von der Analyse bis zur langfristigen Betreuung finden Sie auf
            unserer Startseite und auf den jeweiligen Leistungsseiten.
          </p>
        </Container>
      </section>

      <section className="border-b border-line bg-ink py-16 text-paper md:py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="kicker text-smoke">Persönliche Ansprechpartnerin</p>
            <h2 className="mt-4 font-display text-2xl">{company.founder}</h2>
            <p className="mt-4 text-smoke">
              Als Gründerin und strategische Leiterin verantwortet {company.founder} jedes Projekt persönlich mit
              und ist zentrale Ansprechpartnerin für strategische Entscheidungen. Für die operative Umsetzung
              arbeitet ONSET.digital mit einem geprüften Netzwerk aus Fachspezialist:innen für Entwicklung, Design,
              Performance Marketing und Automatisierung.
            </p>
          </div>
          <div className="lg:col-span-6">
            <p className="kicker text-smoke">Standort</p>
            <p className="mt-4 text-smoke">
              ONSET.digital arbeitet mit Sitz in {company.city} für Mandant:innen im gesamten deutschsprachigen
              Raum – vor Ort ebenso wie standortunabhängig, je nach Anforderung des Projekts.
            </p>
            <p className="mt-6 text-smoke">
              {company.addressPlaceholder} · {company.emailPlaceholder} · {company.phonePlaceholder}
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-line py-16 md:py-20">
        <Container>
          <p className="kicker text-graphite">Langfristige Vision</p>
          <p className="mt-6 max-w-2xl text-lg text-balance">
            ONSET.digital soll für ambitionierte Unternehmen der erste Ansprechpartner sein, wenn digitale
            Systeme neu gedacht, verbunden oder skaliert werden müssen – unabhängig davon, ob der Ausgangspunkt
            Marke, Commerce, CRM, Automatisierung oder Sichtbarkeit ist.
          </p>
        </Container>
      </section>

      <CTABand title="Lernen wir uns kennen" description="Im Erstgespräch klären wir, ob und wie wir Sie unterstützen können." primaryLabel="Erstgespräch vereinbaren" />
    </>
  );
}
