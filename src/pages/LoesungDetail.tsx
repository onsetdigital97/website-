import { Link, Navigate, useParams } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Faq } from "@/components/ui/Faq";
import { CTABand } from "@/components/ui/CTABand";
import { SEO } from "@/components/seo/SEO";
import { breadcrumbSchema, faqSchema } from "@/components/seo/structuredData";
import { getSolutionBySlug } from "@/content/solutions";
import { getServiceBySlug } from "@/content/services";
import { getCaseStudyBySlug } from "@/content/caseStudies";
import { getInsightBySlug } from "@/content/insights";

export default function LoesungDetail() {
  const { slug } = useParams<{ slug: string }>();
  const solution = slug ? getSolutionBySlug(slug) : undefined;

  if (!solution) return <Navigate to="/loesungen/" replace />;

  const path = `/loesungen/${solution.slug}/`;
  const caseStudy = solution.caseStudySlug ? getCaseStudyBySlug(solution.caseStudySlug) : undefined;
  const relevantServices = solution.relevantServiceSlugs.map((s) => getServiceBySlug(s)).filter(Boolean);
  const relatedInsights = solution.insightSlugs.map((s) => getInsightBySlug(s)).filter(Boolean);

  return (
    <>
      <SEO
        title={solution.metaTitle}
        description={solution.metaDescription}
        path={path}
        jsonLd={[
          breadcrumbSchema([{ name: "Lösungen", path: "/loesungen/" }, { name: solution.navLabel, path }]),
          ...(solution.faqs.length ? [faqSchema(solution.faqs)] : []),
        ]}
      />
      <Breadcrumbs items={[{ name: "Lösungen", path: "/loesungen/" }, { name: solution.navLabel, path }]} />

      <section className="border-b border-line bg-paper py-16 md:py-24">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="kicker text-graphite">{solution.heroKicker}</p>
            <h1 className="mt-4 font-display text-[clamp(2rem,3.5vw+1rem,3.25rem)] text-balance">{solution.h1}</h1>
            <p className="mt-6 max-w-xl text-lg text-graphite text-balance">{solution.heroLead}</p>
            <div className="mt-9 flex flex-wrap gap-6">
              <Button href="/kontakt/">{solution.primaryCTA}</Button>
              <Button href="/kontakt/" variant="secondary">{solution.secondaryCTA}</Button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <ImagePlaceholder spec={solution.imagePlaceholders.hero} />
          </div>
        </Container>
      </section>

      <section className="border-b border-line py-16 md:py-20">
        <Container>
          <p className="kicker text-graphite">Ausgangssituation</p>
          <p className="mt-6 max-w-3xl text-lg text-balance">{solution.situation}</p>
        </Container>
      </section>

      <section className="border-b border-line bg-mist/40 py-16 md:py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="kicker text-graphite">Typische Probleme</p>
            <div className="mt-6 space-y-8">
              {solution.problems.map((problem) => (
                <div key={problem.title} className="border-t border-line pt-5">
                  <h2 className="font-display text-xl">{problem.title}</h2>
                  <p className="mt-2 text-graphite">{problem.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <p className="kicker text-graphite">Wirtschaftliche Folgen</p>
            <p className="mt-6 text-lg text-balance">{solution.consequences}</p>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-ink py-16 text-paper md:py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="kicker text-smoke">Strategischer Lösungsansatz</p>
            <p className="mt-6 text-lg text-balance">{solution.approach}</p>
          </div>
          <div className="lg:col-span-7">
            <ImagePlaceholder tone="dark" spec={solution.imagePlaceholders.application} />
          </div>
        </Container>
      </section>

      <section className="border-b border-line py-16 md:py-20">
        <Container>
          <p className="kicker text-graphite">Passende Leistungen</p>
          <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
            {relevantServices.map((service) => (
              <Link key={service!.slug} to={`/leistungen/${service!.slug}/`} className="group bg-paper-raised p-6 hover:bg-ink hover:text-paper">
                <h2 className="font-display text-lg">{service!.navLabel}</h2>
                <p className="mt-2 text-sm text-graphite group-hover:text-smoke">{service!.menuDescription}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-mist/40 py-16 md:py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="kicker text-graphite">Mögliche Systeme & Technologien</p>
            <ul className="mt-6 space-y-3">
              {solution.systems.map((system) => (
                <li key={system} className="border-t border-line pt-3 text-graphite">{system}</li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <p className="kicker text-graphite">Ablauf der Zusammenarbeit</p>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {solution.process.map((step, i) => (
                <div key={step.title} className="flex gap-4">
                  <span className="kicker text-smoke">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h2 className="font-display text-base">{step.title}</h2>
                    <p className="mt-1 text-sm text-graphite">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

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

      <section className="border-b border-line py-16 md:py-20">
        <Container>
          <Faq items={solution.faqs} />
        </Container>
      </section>

      {relatedInsights.length > 0 && (
        <section className="border-b border-line bg-mist/40 py-16 md:py-20">
          <Container>
            <p className="kicker text-graphite">Passende Insights</p>
            <ul className="mt-5 space-y-3">
              {relatedInsights.map((i) => (
                <li key={i!.slug}>
                  <Link to={`/insights/${i!.slug}/`} className="hover:underline underline-offset-4">{i!.title}</Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <CTABand title={`${solution.navLabel}: Passenden Weg finden`} description="Im Erstgespräch ordnen wir Ihre Ausgangslage ein und zeigen den wirtschaftlich sinnvollsten nächsten Schritt." primaryLabel={solution.primaryCTA} secondaryLabel={solution.secondaryCTA} />
    </>
  );
}
