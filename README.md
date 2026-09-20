# ONSET.digital — Website

Neu entwickelte Website für ONSET.digital: eine strategische Digital-, E-Commerce- und Automatisierungsagentur mit Sitz in Köln.

## Stack

- Vite + React + TypeScript
- React Router (Mehrseiten-Architektur)
- Tailwind CSS v4 (eigenes Schwarz-Weiß-Designsystem, siehe `src/index.css`)
- react-helmet-async für Meta-Tags und strukturierte Daten

## Struktur

- `src/content/` — Inhalte für Leistungen, Lösungen, Referenzen und Insights als typisierte Daten (CMS-artig erweiterbar)
- `src/components/` — Layout, UI-Bausteine (Navigation/Mega-Menü, Footer, Bildplatzhalter, FAQ, CTA) und SEO-Komponenten
- `src/pages/` — Seiten- und Template-Komponenten (Hub- und Detailseiten für Leistungen/Lösungen/Referenzen/Insights)
- `docs/strategie/` — Strategisches Grundlagendokument (Positionierung, Zielgruppen, Keyword-Mapping, Sitemap, Linkmatrix)

## Entwicklung

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Hinweis zu Platzhaltern

Bildflächen, Kundenlogos, Case-Study-Kennzahlen sowie Impressum/Datenschutz-Angaben sind bewusst als
`[PLATZHALTER – ...]` gekennzeichnet und müssen vor dem Live-Gang durch echte, geprüfte Inhalte ersetzt werden
(siehe `docs/strategie/positionierung-und-seo-strategie.md`, Abschnitt 20).
