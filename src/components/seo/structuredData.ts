import { SITE_URL } from "./SEO";
import { company } from "@/content/company";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: company.name,
  url: SITE_URL,
  areaServed: "DE",
  address: {
    "@type": "PostalAddress",
    addressLocality: company.city,
    addressCountry: "DE",
  },
  sameAs: company.socials.map((s) => s.href).filter((href) => href.startsWith("http")),
};

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function serviceSchema(params: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: params.name,
    description: params.description,
    provider: { "@type": "ProfessionalService", name: company.name },
    url: `${SITE_URL}${params.path}`,
    areaServed: "DE",
  };
}

export function articleSchema(params: { headline: string; description: string; path: string; datePublished: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.headline,
    description: params.description,
    datePublished: params.datePublished,
    author: { "@type": "Organization", name: company.name },
    publisher: { "@type": "Organization", name: company.name },
    mainEntityOfPage: `${SITE_URL}${params.path}`,
  };
}
