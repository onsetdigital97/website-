import { Link, Navigate, useParams } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Faq } from "@/components/ui/Faq";
import { CTABand } from "@/components/ui/CTABand";
import { SEO } from "@/components/seo/SEO";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/components/seo/structuredData";
import { getServiceBySlug, services } from "@/content/services";
import { getSolutionBySlug } from "@/content/solutions";
import { getCaseStudyBySlug } from "@/content/caseStudies";
import { getInsightBySlug } from "@/content/insights";

export default function LeistungDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!service) return <Navigate to="/leistungen/" replace />;

  const path = `/leistungen/${service.slug}/`;
  const caseStudy = service.caseStudySlug ? getCaseStudyBySlug(service.caseStudySlug) : undefined;
  const relatedServices = service.relatedServiceSlugs.map((s) => services.find((x) => x.slug === s)).filter(Boolean);
  const relatedSolutions = service.relatedSolutionSlugs.map((s) => getSolutionBySlug(s)).filter(Boolean);
  const relatedInsights = service.insightSlugs.map((s) => getInsightBySlug(s)).filter(Boolean);

  return (
    <>
      <SEO
        title={service.metaTitle}
        description={service.metaDescription}
        path={path}
        jsonLd={[
          breadcrumbSchema([
            { name: "Leistungen", path: "/leistungen/" },
            { name: service.navLabel, path },
          ]),
          serviceSchema({ name: service.navLabel, description: service.metaDescription, path }),
          ...(service.faqs.length ? [faqSchema(service.faqs)] : []),
        ]}
      />
      <Breadcrumbs items={[{ name: "Leistungen", path: "/leistungen/" }, { name: service.navLabel, path }]} />

      {/* Hero */}
      <section className="border-b border-line bg-paper py-16 md:py-24">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="kicker text-graphite">{service.heroKicker}</p>
            <h1 className="mt-4 font-display text-[clamp(2rem,3.5vw+1rem,3.25rem)] text-balance">{service.h1}</h1>
            <p className="mt-6 max-w-xl text-lg text-graphite text-balance">{service.heroLead}</p>
            <div className="mt-9 flex flex-wrap gap-6">
              <Button href="/kontakt/">{service.primaryCTA}</Button>
              <Button href="/kontakt/" variant="secondary">{service.secondaryCTA}</Button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <ImagePlaceholder spec={service.imagePlaceholders.hero} />
          </div>
        </Container>
      </section>

      {/* Audience */}
      <section className="border-b border-line py-14">
        <Container>
          <p className="kicker text-graphite">Für wen diese Leistung gedacht ist</p>
          <ul className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {service.audience.map((item) => (
              <li key={item} className="border-t border-line pt-4 text-graphite">{item}</li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Problems & consequences */}
      <section className="border-b border-line bg-mist/40 py-16 md:py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="kicker text-graphite">Typische Ausgangslage</p>
            <div className="mt-6 space-y-8">
              {service.problems.map((problem) => (
                <div key={problem.title} className="border-t border-line pt-5">
                  <h2 className="font-display text-xl">{problem.title}</h2>
                  <p className="mt-2 text-graphite">{problem.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <p className="kicker text-graphite">Wirtschaftliche Folgen</p>
            <p className="mt-6 text-lg text-balance">{service.consequences}</p>
          </div>
        </Container>
      </section>

      {/* Deliverables */}
      <section className="border-b border-line py-16 md:py-20">
        <Container>
          <p className="kicker text-graphite">Konkrete Leistungen</p>
          <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
            {service.deliverables.map((item) => (
              <div key={item.title} className="bg-paper-raised p-7">
                <h2 className="font-display text-lg">{item.title}</h2>
                <p className="mt-2 text-sm text-graphite">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Approach */}
      <section className="border-b border-line bg-ink py-16 text-paper md:py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="kicker text-smoke">Strategischer Lösungsansatz</p>
            <p className="mt-6 text-lg text-balance">{service.approach}</p>
          </div>
          <div className="lg:col-span-7">
            <ImagePlaceholder tone="dark" spec={service.imagePlaceholders.application} />
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="border-b border-line py-16 md:py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="kicker text-graphite">Ablauf der Zusammenarbeit</p>
            <div className="mt-6 space-y-6">
              {service.process.map((step, i) => (
                <div key={step.title} className="flex gap-4">
                  <span className="kicker text-smoke">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h2 className="font-display text-lg">{step.title}</h2>
                    <p className="mt-1 text-sm text-graphite">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7">
            <ImagePlaceholder spec={service.imagePlaceholders.process} />
          </div>
        </Container>
      </section>

      {/* Systems & advantages */}
      <section className="border-b border-line bg-mist/40 py-16 md:py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="kicker text-graphite">Eingesetzte Systeme</p>
            <ul className="mt-6 space-y-3">
              {service.systems.map((system) => (
                <li key={system} className="border-t border-line pt-3 text-graphite">{system}</li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <p className="kicker text-graphite">Vorteile & Differenzierung</p>
            <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {service.advantages.map((advantage) => (
                <li key={advantage} className="border-t border-line pt-3 text-sm">{advantage}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Case study */}
      {caseStudy && (
        <section className="border-b border-line bg-ink py-16 text-paper md:py-20">
          <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <ImagePlaceholder tone="dark" spec={caseStudy.imagePlaceholders.cover} />
            </div>
            <div className="lg:col-span-6">
              <p className="kicker text-smoke">Passende Referenz</p>
              <h2 className="mt-4 font-display text-2xl">{caseStudy.client}</h2>
              <p className="mt-3 text-smoke">{caseStudy.summary}</p>
              <div className="mt-6">
                <Button href={`/referenzen/${caseStudy.slug}/`} tone="dark">Case Study ansehen</Button>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* FAQ */}
      <section className="border-b border-line py-16 md:py-20">
        <Container>
          <Faq items={service.faqs} />
        </Container>
      </section>

      {/* Related */}
      <section className="border-b border-line bg-mist/40 py-16 md:py-20">
        <Container className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <p className="kicker text-graphite">Verwandte Leistungen</p>
            <ul className="mt-5 space-y-3">
              {relatedServices.map((s) => (
                <li key={s!.slug}>
                  <Link to={`/leistungen/${s!.slug}/`} className="hover:underline underline-offset-4">{s!.navLabel}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="kicker text-graphite">Passende Lösungen</p>
            <ul className="mt-5 space-y-3">
              {relatedSolutions.map((s) => (
                <li key={s!.slug}>
                  <Link to={`/loesungen/${s!.slug}/`} className="hover:underline underline-offset-4">{s!.navLabel}</Link>
                </li>
              ))}
            </ul>
          </div>
          {relatedInsights.length > 0 && (
            <div>
              <p className="kicker text-graphite">Passende Insights</p>
              <ul className="mt-5 space-y-3">
                {relatedInsights.map((i) => (
                  <li key={i!.slug}>
                    <Link to={`/insights/${i!.slug}/`} className="hover:underline underline-offset-4">{i!.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </section>

      <CTABand title={`${service.navLabel}: Bereit für den nächsten Schritt?`} description="Im Erstgespräch klären wir Ihre Ausgangslage und den passenden Umfang." primaryLabel={service.primaryCTA} secondaryLabel={service.secondaryCTA} />
    </>
  );
}
