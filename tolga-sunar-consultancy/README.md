# Tolga Sunar Consultancy — Website

Statische Website (Eleventy/Nunjucks) für Tolga Sunar Consultancy — Beratung für ISO-Zertifizierungen und integrierte Managementsysteme.

Das vollständige strategische und inhaltliche Konzept inklusive rechtlicher Prüfliste steht in [`KONZEPT.md`](./KONZEPT.md).

## Entwicklung

```bash
npm install
npm run dev     # lokaler Server mit Live-Reload, http://localhost:8080
npm run build   # statisches Ergebnis nach _site/
```

## Struktur

```
src/
  _data/           globale Daten (Kontakt/Navigation, Leistungen, FAQ)
  _includes/
    layouts/        Basis-Layout (Meta, JSON-LD, Header/Footer-Einbindung)
    partials/        Header, Footer, Icons, Macros (Breadcrumbs, CTA, FAQ)
  assets/           CSS, JS, Bilder (werden 1:1 nach /assets kopiert)
  leistungen/       Übersicht + 6 Normseiten
  ratgeber/         Wissensbereich
  *.njk             Startseite, Über uns, Referenzen, FAQ, Kontakt, Impressum, Datenschutz
```

Vor Veröffentlichung unbedingt die Prüfliste in `KONZEPT.md` (Abschnitt 10) abarbeiten — insbesondere Impressum-Daten, Telefonnummer und echte Referenzen sind aktuell als Platzhalter markiert.
