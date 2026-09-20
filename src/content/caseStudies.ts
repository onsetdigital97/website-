import type { CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "beispielprojekt-platzhalter",
    client: "[PLATZHALTER – Kundenname]",
    industry: "[PLATZHALTER – Branche]",
    isPlaceholder: true,
    filters: ["E-Commerce", "Shopify", "Website", "CRM & Prozesse", "SEO"],
    summary:
      "Beispielhafte Case-Study-Struktur für ein ganzheitliches Projekt aus Shopify-Shop, Markenauftritt, CRM-Anbindung und SEO. Alle Angaben sind Platzhalter und werden durch das erste dokumentierte Referenzprojekt ersetzt.",
    situation:
      "[PLATZHALTER – Beschreibung der Ausgangssituation des Kunden vor Projektbeginn: Branche, Unternehmensgröße, bestehende Systeme.]",
    challenge:
      "[PLATZHALTER – zentrale Herausforderung, z. B. veralteter Shop, fehlende Prozessintegration oder geringe Sichtbarkeit.]",
    goals: [
      "[PLATZHALTER – Ziel 1, z. B. Steigerung der Conversion Rate]",
      "[PLATZHALTER – Ziel 2, z. B. Reduktion des manuellen Aufwands im Vertrieb]",
      "[PLATZHALTER – Ziel 3, z. B. Aufbau organischer Sichtbarkeit]",
    ],
    strategy:
      "[PLATZHALTER – Beschreibung des strategischen Lösungsansatzes: Priorisierung, Systemarchitektur, Vorgehen.]",
    deliverables: [
      "Shopify-Relaunch mit individueller Storefront-Entwicklung",
      "CRM-Einführung und Anbindung an den Onlineshop",
      "Technisches und inhaltliches SEO-Konzept",
      "Corporate-Design-Auffrischung für digitale Anwendungen",
    ],
    systems: ["Shopify Plus", "CRM-System", "Google Ads & Analytics", "Automatisierungsplattform"],
    results: [
      { label: "Conversion Rate", value: "[PLATZHALTER]", isPlaceholder: true },
      { label: "Organischer Traffic", value: "[PLATZHALTER]", isPlaceholder: true },
      { label: "Manueller Aufwand im Vertrieb", value: "[PLATZHALTER]", isPlaceholder: true },
    ],
    testimonial: {
      quote: "[PLATZHALTER – Zitat der Kundin/des Kunden nach Projektabschluss]",
      author: "[PLATZHALTER – Name]",
      role: "[PLATZHALTER – Position, Unternehmen]",
      isPlaceholder: true,
    },
    relatedServiceSlugs: ["e-commerce-shopify", "crm-prozesse", "seo-ki-sichtbarkeit", "webdesign-webentwicklung"],
    relatedSolutionSlug: "e-commerce-unternehmen",
    insightSlug: "shopify-relaunch-ablauf-kosten",
    imagePlaceholders: {
      cover: {
        label: "Case-Study-Cover",
        ratioDesktop: "16/9",
        ratioMobile: "4/5",
        motif: "Editorial gestaltetes Projekt-Cover mit Ausschnitt aus dem realen Shop- oder Markenauftritt",
        wirkung: "hochwertig, redaktionell",
        funktion: "erste visuelle Zusammenfassung des Projekts in der Referenzübersicht",
        type: "Mock-up",
        mobileNote: "Zentralen Bildausschnitt beibehalten, seitlich beschneiden",
      },
      desktop: {
        label: "Desktop-Ansicht des Projekts",
        ratioDesktop: "16/10",
        ratioMobile: "4/5",
        motif: "Vollständige Desktop-Ansicht der Startseite oder eines zentralen Shopbereichs",
        wirkung: "präzise, überzeugend",
        funktion: "zeigt die vollständige gestalterische und technische Umsetzung",
        type: "Mock-up",
        mobileNote: "Auf mobilen Geräten horizontal scrollbar oder als Ausschnitt darstellen",
      },
      mobile: {
        label: "Mobile Ansicht des Projekts",
        ratioDesktop: "9/16",
        ratioMobile: "9/16",
        motif: "Mobile Ansicht derselben Kernseite, um Responsivität zu belegen",
        wirkung: "konkret, alltagsnah",
        funktion: "zeigt die Umsetzungsqualität auf dem für die Zielgruppe wichtigsten Endgerät",
        type: "Mock-up",
        mobileNote: "Native Darstellungsgröße beibehalten",
      },
      detail: {
        label: "Detailansicht – Marken- oder Interfaceelement",
        ratioDesktop: "4/3",
        ratioMobile: "4/3",
        motif: "Nahaufnahme eines gestalterischen oder funktionalen Details (z. B. Checkout-Element, Typografie)",
        wirkung: "sorgfältig, hochwertig",
        funktion: "unterstreicht die gestalterische und technische Detailtiefe",
        type: "Fotografie",
        mobileNote: "Bildausschnitt zentrieren",
      },
    },
  },
];

export const getCaseStudyBySlug = (slug: string) => caseStudies.find((study) => study.slug === slug);
