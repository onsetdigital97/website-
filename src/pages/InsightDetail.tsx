import { Link, Navigate, useParams } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Faq } from "@/components/ui/Faq";
import { CTABand } from "@/components/ui/CTABand";
import { SEO } from "@/components/seo/SEO";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/components/seo/structuredData";
import { getInsightBySlug } from "@/content/insights";
import { getServiceBySlug } from "@/content/services";
import { getSolutionBySlug } from "@/content/solutions";
import { getCaseStudyBySlug } from "@/content/caseStudies";

export default function InsightDetail() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getInsightBySlug(slug) : undefined;

  if (!article) return <Navigate to="/insights/" replace />;

  const path = `/insights/${article.slug}/`;
  const relatedService = article.relatedServiceSlug ? getServiceBySlug(article.relatedServiceSlug) : undefined;
  const relatedSolution = article.relatedSolutionSlug ? getSolutionBySlug(article.relatedSolutionSlug) : undefined;
  const relatedInsight = article.relatedInsightSlug ? getInsightBySlug(article.relatedInsightSlug) : undefined;
  const caseStudy = article.caseStudySlug ? getCaseStudyBySlug(article.caseStudySlug) : undefined;

  return (
    <>
      <SEO
        title={article.metaTitle}
        description={article.metaDescription}
        path={path}
        jsonLd={[
          breadcrumbSchema([{ name: "Insights", path: "/insights/" }, { name: article.title, path }]),
          articleSchema({ headline: article.title, description: article.metaDescription, path, datePublished: article.dateISO }),
          ...(article.faqs?.length ? [faqSchema(article.faqs)] : []),
        ]}
      />
      <Breadcrumbs items={[{ name: "Insights", path: "/insights/" }, { name: article.title, path }]} />

      <article>
        <section className="border-b border-line bg-paper py-16 md:py-20">
          <Container className="max-w-3xl">
            <p className="kicker text-graphite">{article.cluster} · {article.readTime}</p>
            <h1 className="mt-4 font-display text-[clamp(2rem,3.5vw+1rem,3rem)] text-balance">{article.title}</h1>
            <p className="mt-6 text-lg text-graphite text-balance">{article.excerpt}</p>
            <time dateTime={article.dateISO} className="mt-4 block text-xs text-smoke">
              Veröffentlicht am {new Date(article.dateISO).toLocaleDateString("de-DE", { year: "numeric", month: "long", day: "numeric" })}
            </time>
          </Container>
        </section>

        <section className="border-b border-line py-10">
          <Container className="max-w-3xl">
            <ImagePlaceholder spec={article.imagePlaceholder} />
          </Container>
        </section>

        <section className="py-16 md:py-20">
          <Container className="max-w-3xl space-y-12">
            {article.body.map((block) => (
              <div key={block.heading}>
                <h2 className="font-display text-2xl">{block.heading}</h2>
                <div className="mt-4 space-y-4 text-graphite">
                  {block.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </Container>
        </section>

        {article.faqs && article.faqs.length > 0 && (
          <section className="border-t border-line py-16 md:py-20">
            <Container className="max-w-3xl">
              <Faq items={article.faqs} />
            </Container>
          </section>
        )}

        <section className="border-t border-line bg-mist/40 py-16">
          <Container className="max-w-3xl">
            <p className="kicker text-graphite">Weiterführend</p>
            <ul className="mt-5 space-y-3">
              {relatedService && (
                <li><Link to={`/leistungen/${relatedService.slug}/`} className="hover:underline underline-offset-4">Leistung: {relatedService.navLabel}</Link></li>
              )}
              {relatedSolution && (
                <li><Link to={`/loesungen/${relatedSolution.slug}/`} className="hover:underline underline-offset-4">Lösung: {relatedSolution.navLabel}</Link></li>
              )}
              {caseStudy && (
                <li><Link to={`/referenzen/${caseStudy.slug}/`} className="hover:underline underline-offset-4">Case Study: {caseStudy.client}</Link></li>
              )}
              {relatedInsight && (
                <li><Link to={`/insights/${relatedInsight.slug}/`} className="hover:underline underline-offset-4">Weiterer Artikel: {relatedInsight.title}</Link></li>
              )}
            </ul>
          </Container>
        </section>
      </article>

      <CTABand title="Thema strategisch angehen?" description="Wir übersetzen die hier beschriebenen Prinzipien gerne in einen konkreten Plan für Ihr Unternehmen." primaryLabel="Erstgespräch vereinbaren" />
    </>
  );
}
