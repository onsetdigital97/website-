export interface ImagePlaceholderSpec {
  label: string;
  ratioDesktop: string;
  ratioMobile: string;
  motif: string;
  wirkung: string;
  funktion: string;
  type: "Fotografie" | "Mock-up" | "Video" | "Animation" | "Grafik";
  mobileNote: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ProblemItem {
  title: string;
  description: string;
}

export interface DeliverableItem {
  title: string;
  description: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  category: "Strategie" | "Commerce & Web" | "KI, CRM & Prozesse" | "Sichtbarkeit & Marketing";
  navLabel: string;
  menuDescription: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  heroKicker: string;
  heroLead: string;
  audience: string[];
  problems: ProblemItem[];
  consequences: string;
  deliverables: DeliverableItem[];
  approach: string;
  process: ProcessStep[];
  systems: string[];
  advantages: string[];
  relatedServiceSlugs: string[];
  relatedSolutionSlugs: string[];
  caseStudySlug?: string;
  insightSlugs: string[];
  primaryCTA: string;
  secondaryCTA: string;
  faqs: FAQItem[];
  imagePlaceholders: {
    hero: ImagePlaceholderSpec;
    application: ImagePlaceholderSpec;
    process: ImagePlaceholderSpec;
  };
}

export interface Solution {
  slug: string;
  navLabel: string;
  menuDescription: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  heroKicker: string;
  heroLead: string;
  situation: string;
  problems: ProblemItem[];
  consequences: string;
  approach: string;
  relevantServiceSlugs: string[];
  systems: string[];
  process: ProcessStep[];
  caseStudySlug?: string;
  insightSlugs: string[];
  faqs: FAQItem[];
  primaryCTA: string;
  secondaryCTA: string;
  imagePlaceholders: {
    hero: ImagePlaceholderSpec;
    application: ImagePlaceholderSpec;
  };
}

export interface ResultMetric {
  label: string;
  value: string;
  isPlaceholder: boolean;
}

export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  isPlaceholder: boolean;
  summary: string;
  situation: string;
  challenge: string;
  goals: string[];
  strategy: string;
  deliverables: string[];
  systems: string[];
  results: ResultMetric[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    isPlaceholder: boolean;
  };
  relatedServiceSlugs: string[];
  relatedSolutionSlug?: string;
  insightSlug?: string;
  filters: string[];
  imagePlaceholders: {
    cover: ImagePlaceholderSpec;
    desktop: ImagePlaceholderSpec;
    mobile: ImagePlaceholderSpec;
    detail: ImagePlaceholderSpec;
  };
}

export interface InsightArticle {
  slug: string;
  cluster: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  dateISO: string;
  readTime: string;
  excerpt: string;
  body: { heading: string; paragraphs: string[] }[];
  relatedServiceSlug?: string;
  relatedSolutionSlug?: string;
  relatedInsightSlug?: string;
  caseStudySlug?: string;
  faqs?: FAQItem[];
  imagePlaceholder: ImagePlaceholderSpec;
}
