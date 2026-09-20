import { services } from "./services";
import { solutions } from "./solutions";

export const serviceCategories = [
  "Strategie",
  "Commerce & Web",
  "KI, CRM & Prozesse",
  "Sichtbarkeit & Marketing",
] as const;

export const servicesByCategory = serviceCategories.map((category) => ({
  category,
  items: services.filter((service) => service.category === category),
}));

export const solutionNavItems = solutions.map((solution) => ({
  slug: solution.slug,
  navLabel: solution.navLabel,
  menuDescription: solution.menuDescription,
}));

export const mainNav = [
  { label: "Leistungen", href: "/leistungen/", mega: "leistungen" as const },
  { label: "Lösungen", href: "/loesungen/", mega: "loesungen" as const },
  { label: "Referenzen", href: "/referenzen/" },
  { label: "Über ONSET", href: "/ueber-onset/" },
  { label: "Insights", href: "/insights/" },
];
