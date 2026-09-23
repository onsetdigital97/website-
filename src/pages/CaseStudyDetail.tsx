import { Link, Navigate, useParams } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { CTABand } from "@/components/ui/CTABand";
import { SEO } from "@/components/seo/SEO";
import { breadcrumbSchema } from "@/components/seo/structuredData";
import { getCaseStudyBySlug } from "@/content/caseStudies";
import { getServiceBySlug } from "@/content/services";
import { getInsightBySlug } from "@/content/insights";

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? getCaseStudyBySlug(slug) : undefined;

  if (!study) return <Navigate to="/referenzen/" replace />;

  const path = `/referenzen/${study.slug}/`;
  const relatedServices = study.relatedServiceSlugs.map((s) => getServiceBySlug(s)).filter(Boolean);
  const relatedInsight = study.insightSlug ? getInsightBySlug(study.insightSlug) : undefined;

  return (
    <>
      <SEO
        title={`${study.client} — Case Study | ONSET.digital`}
        description={study.summary}
        path={path}
        jsonLd={breadcrumbSchema([{ name: "Referenzen", path: "/referenzen/" }, { name: study.client, path }])}
        noindex={study.isPlaceholder}
      />
      <Breadcrumbs items={[{ name: "Referenzen", path: "/referenzen/" }, { name: study.client, path }]} />

      {study.isPlaceholder && (
        <div className="border-b border-line bg-mist/60 py-3 text-center text-xs text-graphite">
          Beispielhafte Case-Study-Vorlage — alle Angaben sind Platzhalter bis zur Freigabe echter Projektdaten.
        </div>
      )}

      <section className="border-b border-line bg-paper py-16 md:py-24">
        <Container>
          <p className="kicker text-graphite">{study.industry}</p>
          <h1 className="mt-4 max-w-2xl font-display text-[clamp(2rem,3.5vw+1rem,3.25rem)] text-balance">{study.client}</h1>
          <p className="mt-6 max-w-2xl text-lg text-graphite text-balance">{study.summary}</p>
        </Container>
      </section>

      <section className="border-b border-line py-10">
        <Container>
          <ImagePlaceholder spec={study.imagePlaceholders.cover} />
        </Container>
      </section>

      <section className="border-b border-line py-16 md:py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div>
            <p className="kicker text-graphite">Ausgangssituation</p>
            <p className="mt-4 text-graphite">{study.situation}</p>
          </div>
          <div>
            <p className="kicker text-graphite">Herausforderung</p>
            <p className="mt-4 text-graphite">{study.challenge}</p>
          </div>
          <div>
            <p className="kicker text-graphite">Ziele</p>
            <ul className="mt-4 space-y-2 text-graphite">
              {study.goals.map((goal) => (
                <li key={goal}>{goal}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-ink py-16 text-paper md:py-20">
        <Container>
          <p className="kicker text-smoke">Strategie</p>
          <p className="mt-4 max-w-3xl text-lg text-balance">{study.strategy}</p>
        </Container>
      </section>

      <section className="border-b border-line py-16 md:py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <p className="kicker text-graphite">Umgesetzte Leistungen</p>
            <ul className="mt-5 space-y-3">
              {study.deliverables.map((d) => (
                <li key={d} className="border-t border-line pt-3">{d}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="kicker text-graphite">Eingesetzte Systeme</p>
            <ul className="mt-5 space-y-3">
              {study.systems.map((s) => (
                <li key={s} className="border-t border-line pt-3">{s}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-mist/40 py-16 md:py-20">
        <Container>
          <p className="kicker text-graphite">Design & technische Umsetzung</p>
          <div className="mt-8 grid grid-cols-1 items-start gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <ImagePlaceholder spec={study.imagePlaceholders.desktop} />
            </div>
            <div className="mx-auto w-full max-w-72 md:mx-0">
              <ImagePlaceholder spec={study.imagePlaceholders.mobile} />
            </div>
          </div>
          <div className="mt-8 max-w-md">
            <ImagePlaceholder spec={study.imagePlaceholders.detail} />
          </div>
        </Container>
      </section>

      <section className="border-b border-line py-16 md:py-20">
        <Container>
          <p className="kicker text-graphite">Ergebnisse</p>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {study.results.map((result) => (
              <div key={result.label} className="border-t border-line pt-4">
                <p className="font-display text-3xl">{result.value}</p>
                <p className="mt-1 text-sm text-graphite">{result.label}</p>
                {result.isPlaceholder && <p className="mt-1 text-xs text-smoke">Platzhalter bis zur Freigabe realer Kennzahlen</p>}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-ink py-16 text-paper md:py-20">
        <Container>
          <blockquote className="max-w-2xl font-display text-2xl text-balance">„{study.testimonial.quote}“</blockquote>
          <p className="mt-6 text-sm text-smoke">
            {study.testimonial.author}, {study.testimonial.role}
            {study.testimonial.isPlaceholder && " — Platzhalter bis zur Freigabe durch die Kundin bzw. den Kunden"}
          </p>
        </Container>
      </section>

      <section className="border-b border-line py-16 md:py-20">
        <Container className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <p className="kicker text-graphite">Passende Leistungen</p>
            <ul className="mt-5 space-y-3">
              {relatedServices.map((s) => (
                <li key={s!.slug}>
                  <Link to={`/leistungen/${s!.slug}/`} className="hover:underline underline-offset-4">{s!.navLabel}</Link>
                </li>
              ))}
            </ul>
          </div>
          {relatedInsight && (
            <div>
              <p className="kicker text-graphite">Weiterführender Insight</p>
              <Link to={`/insights/${relatedInsight.slug}/`} className="mt-5 block hover:underline underline-offset-4">
                {relatedInsight.title}
              </Link>
            </div>
          )}
        </Container>
      </section>

      <CTABand title="Ein ähnliches Projekt im Kopf?" description="Wir besprechen unverbindlich, wie ein vergleichbares System für Ihr Unternehmen aussehen könnte." primaryLabel="Projekt anfragen" />
    </>
  );
}
