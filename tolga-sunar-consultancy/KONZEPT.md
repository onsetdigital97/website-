# Tolga Sunar Consultancy — Website-Konzept & Umsetzung

Dieses Dokument fasst die strategische Konzeption und die technische Umsetzung der neu entwickelten Website zusammen. Es ist die Grundlage für die finale Freigabe vor Veröffentlichung.

> **Hinweis zur Ausgangslage:** Die bestehende Website `tolgasunarconsultancy.com` konnte in dieser Arbeitsumgebung aus technischen Gründen (Netzwerk-Policy) nicht automatisiert ausgelesen werden. Die Website wurde daher fachlich komplett neu konzipiert und getextet, auf Basis der im Briefing beschriebenen Positionierung, Leistungen und Zielgruppen — nicht als Ableitung des alten Contents. Das entspricht der Vorgabe, Template und Gestaltung ohnehin nicht zu übernehmen.

---

## 1. Strategische Positionierung

**Kernbotschaft:** „Wir machen Managementsysteme verständlich, praxistauglich und auditsicher.“

**Zielgruppen:** Geschäftsführer:innen und QMB kleiner und mittelständischer Unternehmen, die erstmals zertifizieren, ein bevorstehendes Audit vorbereiten, mehrere Normen kombinieren möchten, oder deren bestehende Dokumentation nicht mehr praxistauglich ist. Zusätzlich: Sicherheitsdienstleister mit DIN-77200-Anforderung.

**Positionierung:** persönlich & verbindlich, fachlich fundiert, pragmatisch, individuell statt standardisiert, langfristig wirksam statt nur zertifikatsorientiert. Bewusst vermieden: austauschbare Phrasen, unbelegte Erfolgsquoten, generische „Ihr Partner für Erfolg“-Sprache.

**Ton & Sprache:** durchgehend Sie-Ansprache, sachlich-souverän, ohne Fachjargon-Überladung, kurze Absätze statt Textwände.

---

## 2. Vollständige Sitemap

```
/                                                  Startseite
/leistungen/                                       Leistungen – Übersicht
/leistungen/iso-9001/
/leistungen/iso-14001/
/leistungen/iso-45001/
/leistungen/din-77200/
/leistungen/integrierte-managementsysteme/
/leistungen/auditvorbereitung-interne-audits/
/ueber-uns/                                        Über Tolga Sunar
/referenzen/                                        Referenzen & Projekterfolge
/faq/                                                FAQ
/kontakt/                                            Kontakt & Erstberatung
/ratgeber/                                           Wissensbereich (SEO, optional lt. Briefing – umgesetzt)
/ratgeber/welche-iso-norm-passt-zu-meinem-unternehmen/
/ratgeber/ablauf-zertifizierungsaudit/
/impressum/                                          (noindex)
/datenschutz/                                        (noindex)
/404.html
/sitemap.xml, /robots.txt
```

Hauptnavigation: Leistungen (mit Dropdown zu allen 6 Normseiten) · Vorgehensweise (Anker zur Startseite) · Über uns · Referenzen · FAQ · Kontakt. CTA im Header: „Kostenloses Erstgespräch“.

---

## 3. Designsystem

**Farben** (siehe CSS-Variablen in `src/assets/css/styles.css`):
- Primär: tiefes Navy (`#0c1526`–`#1e3459`)
- Hintergrund: warmes Off-White (`#faf8f4`, `#f4f0e8`)
- Akzent: gedecktes Petrol (`#114a52`–`#1c7c86`)
- Premium-Detail: dezentes Bronze/Gold (`#ad8a54`, `#d9c49c`) — sparsam für Eyebrows, Prozess-Nummern, Zitate
- Keine Verläufe im generischen „Corporate-Blue“-Stil, keine grellen Farben

**Typografie:** Systemschrift-Stack (Sans für Fließtext/UI, Serif ausschließlich für Zitate und Prozess-Nummern) — bewusst ohne Web-Font-Nachladung von Drittanbietern (siehe Abschnitt 9, Datenschutz). Klare Hierarchie, großzügige `clamp()`-basierte Schriftgrößen, kurze Textblöcke.

**Bildsprache/Grafik:** Dezente Rasterlinien-Hintergründe (SVG/CSS) im Hero und in dunklen Sektionen, eine reduzierte Liniengrafik zur Visualisierung „Integrierte Managementsysteme“ (drei sich überschneidende Kreise), keine Stock-Icons — alle Icons sind selbst gezeichnete, konsistente Linien-SVGs.

**Bewegung:** ruhige Scroll-Reveal-Einblendungen (IntersectionObserver, 700ms, gestaffelt bei Karten-Gruppen), dezente Hover-Effekte auf Karten/Buttons, animierte Prozesslinien im Hero-Panel. Kein Slider, keine überladenen Effekte. `prefers-reduced-motion` wird respektiert; ohne aktives JavaScript sind alle Inhalte sofort sichtbar (No-JS-Fallback über `.no-js`-Klasse).

**Komponenten:** Sticky Header mit Dropdown, Hero mit Prozess-Panel, Problem-Liste, Service-Karten, Benefit-Grid, nummerierte Prozessliste, Integrations-Diagramm, Berater-Sektion mit Zitat, Trust-/Referenzen-Karten, Fallstudien-Modul, Förderhinweis-Box, FAQ-Akkordeon (native `<details>`), CTA-Banner, mehrspaltiger Footer.

---

## 4. Desktop- und Mobile-Konzept

- **Mobile First**, Breakpoints bei 640px, 720px/900/960px sowie 1080px (Umschaltpunkt Desktop-Navigation).
- Desktop: horizontale Navigation mit Hover-Dropdown für Leistungen, zweispaltige/vierspaltige Grids.
- Mobile: Hamburger-Menü mit Vollbild-Overlay (eigenständiges Untermenü für Leistungen), alle Grids fallen auf eine Spalte, Formulare werden einspaltig.
- Getestet mit Playwright/Chromium auf 1440×900 (Desktop) und 390×844 (Mobile) inkl. Interaktionstest von Menü, Dropdown und Formular.

---

## 5. Leistungsseiten — Individualisierung

Jede der sechs Leistungsseiten ist eigenständig getextet (nicht nur Norm-Nummer ausgetauscht) mit: Hero, Zielgruppen-Tags, typischen Ausgangslagen, Zielen/Nutzen, laienverständlicher Anforderungserklärung, konkreten Beratungsleistungen, normspezifischem Projektablauf, Normkombinationen und eigener FAQ.

---

## 6. SEO-Konzept

- Eindeutige `<title>` und Meta-Description je Seite (siehe Front Matter der `.njk`-Dateien).
- Saubere H1–H3-Struktur (genau ein H1 je Seite, verifiziert).
- Sprechende URLs (`/leistungen/iso-9001/` etc.).
- Breadcrumbs mit sichtbarer Navigation **und** `BreadcrumbList`-Schema auf allen Unterseiten.
- `FAQPage`-Schema auf allen Seiten mit FAQ-Akkordeon.
- Globales `ProfessionalService`/`Organization`-Schema im Basis-Layout.
- `sitemap.xml` (automatisch generiert, schließt `noindex`-Seiten aus) und `robots.txt`.
- Open-Graph- und Twitter-Card-Tags je Seite.
- Ziel-Keywords (aus dem Briefing) sind in Title/H1/Einleitungstexten der jeweils passenden Seite verankert (z. B. „ISO 9001 Beratung“ auf `/leistungen/iso-9001/`, „Auditvorbereitung“ auf der entsprechenden Leistungsseite, „ISO Beratung deutschlandweit“ im DACH-Kontext auf Startseite/Kontakt).
- Regionaler Bezug: Da mir kein verifizierter Firmensitz vorliegt, wurde „ISO-Beratung Aschaffenburg“ **nicht** hart in Metadaten codiert, um keine falsche Standortangabe zu erzeugen. Sobald der tatsächliche Firmensitz bestätigt ist, sollte die Startseite/Kontaktseite um eine lokale SEO-Zeile (Ort, `LocalBusiness`-Schema mit echter Adresse) ergänzt werden.

---

## 7. Conversion-Konzept

Ein durchgängiger CTA-Pfad „Kostenloses Erstgespräch“ zieht sich durch: Header (immer sichtbar), Hero (zwei CTAs, Primär/Sekundär), nach jedem inhaltlichen Block, am Seitenende jeder Unterseite, sowie eigene Kontaktseite mit qualifizierendem Formular. Sekundäre Pfade (Leistungen ansehen, FAQ, Referenzen) reduzieren Absprünge für Besucher, die noch nicht kontaktbereit sind.

---

## 8. Formularstruktur (`/kontakt/`)

Felder: Vor-/Nachname, Unternehmen, E-Mail, Telefon (optional), gewünschte Norm/Leistung (Select), aktueller Projektstand (Select), gewünschter Zertifizierungszeitpunkt (Select), Nachricht, Datenschutz-Einwilligung (Pflicht-Checkbox). Zusätzlich: Honeypot-Feld gegen Spam-Bots, clientseitige Validierung mit verständlichen Fehlermeldungen, Erfolgsstatus nach Absenden mit Erklärung der nächsten Schritte.

**Technischer Hinweis:** Das Formular ist funktional vollständig implementiert (Validierung, Spam-Schutz, Erfolgszustand), sendet aber noch an keinen echten Endpunkt (`data-endpoint="#"` in `src/kontakt.njk`). Vor Livegang muss ein Formular-Backend angebunden werden (z. B. eigener E-Mail-Versand serverseitig, oder ein Formular-Dienstleister mit AV-Vertrag). Die `data-endpoint`-URL ist dafür zentral austauschbar.

---

## 9. Bildkonzept

Es wurden **keine** generierten oder fremden Stockfotos verwendet — insbesondere kein KI-generiertes oder frei erfundenes „Portrait“ von Tolga Sunar, da dies eine reale Person unzutreffend darstellen würde. Stattdessen: hochwertige Platzhalter (Monogramm „TS“ auf Rasterhintergrund) mit sichtbarer Beschriftung, welches Motiv dort final einzusetzen ist.

**Empfehlungen für echtes Bildmaterial:**
- Professionelles Portrait von Tolga Sunar (Hero „Über uns“ und Startseite)
- 2–3 authentische Aufnahmen aus echten Beratungssituationen/Workshops/Audits (keine gestellten Handschlagfotos)
- Optional: Aufnahmen aus Kunden-Produktionsumgebungen (nur mit Freigabe)
- Alle Bilder in WebP/AVIF ausliefern, Alt-Texte entsprechend der Motivbeschreibung ergänzen (Platzhalter-Captions im Code zeigen an, wo Alt-Texte final zu setzen sind)

---

## 10. Rechtliche & inhaltliche Prüfliste vor Veröffentlichung

- [ ] **Namensschreibweise** „Tolga Sunar“ anhand amtlicher Dokumente verbindlich bestätigen (im gesamten Briefing durchgehend „Tolga Sunar“ verwendet — so auch in der Website umgesetzt)
- [ ] Impressum: Rechtsform, ladungsfähige Anschrift, ggf. Handelsregister/USt-ID ergänzen (aktuell klar als `Platzhalter` markiert in `src/impressum.njk`)
- [ ] Telefonnummer final ergänzen (`src/_data/site.json` → `phone`, `phoneHref`)
- [ ] Datenschutzerklärung: Hosting-Anbieter, Formular-Backend-Dienstleister und zuständige Aufsichtsbehörde ergänzen (`src/datenschutz.njk`)
- [ ] Echte, freigegebene Kundenstimmen und Fallstudien einpflegen (alle Platzhalter sind im Code als `[Platzhalter …]` bzw. `placeholder-note` gekennzeichnet und leicht auffindbar per Volltextsuche nach „Platzhalter“)
- [ ] Tatsächliche Qualifikationen, Zertifikate, Mitgliedschaften von Tolga Sunar prüfen und erst nach Verifizierung veröffentlichen (`/ueber-uns/`)
- [ ] Partnerlogos/Zertifizierungsstellen-Logos nur nach schriftlicher Freigabe einbinden (`/referenzen/`)
- [ ] Erfolgs-/Förderaussagen bleiben bewusst zurückhaltend formuliert (keine Erfolgsgarantien, keine pauschalen Fördersummen) — bei Änderung juristisch prüfen
- [ ] Kontaktformular an echtes Backend anbinden, danach End-to-End-Test der Bestätigungs-Mail/-Seite
- [ ] Vor Go-live: Rechtschreibprüfung durch Muttersprachler, Funktionsprüfung aller Links auf Live-Domain

---

## 11. Technische Umsetzung

- **Stack:** [Eleventy (11ty)](https://www.11ty.dev/) mit Nunjucks-Templates → statisches, sehr schnelles HTML ohne Client-Framework-Overhead. Kein Tracking, keine Cookies, daher aktuell bewusst **kein** Cookie-Consent-Banner (siehe Datenschutzerklärung, Abschnitt 4) — Consent-Management ist vorzusehen, sobald tatsächlich nicht-essenzielle Dienste (Analytics, Kartenintegration, Terminbuchung) ergänzt werden.
- **Struktur:** `src/` enthält alle Seiten (`.njk`), globale Daten (`src/_data/`), Layout/Partials (`src/_includes/`), sowie CSS/JS/Bilder (`src/assets/`).
- **Build:** `npm install && npm run build` erzeugt das statische Ergebnis in `_site/`. `npm run dev` startet einen lokalen Server mit Live-Reload.
- **Qualitätssicherung:** Automatisierte Prüfung aller internen Links (keine defekten Links gefunden), Validierung aller JSON-LD-Blöcke, Browsertests (Playwright/Chromium) auf Desktop- und Mobile-Viewport inkl. Formular-Interaktion, mobilem Menü und Dropdown.
- **Gefundene und behobene Bugs während der QS:** (1) Mobiles Menü blieb unsichtbar, da `backdrop-filter` im Header einen neuen Containing Block für `position: fixed` erzeugte — behoben durch Auslagerung des Menüs aus dem Header-Element. (2) Das `hidden`-Attribut der Formular-Erfolgsmeldung wurde durch eine eigene `display`-Regel überschrieben — behoben durch eine robuste globale `[hidden]`-Regel.
- **Hosting:** Das Ergebnis ist ein reines statisches Verzeichnis (`_site/`) und kann auf jedem Standard-Webhosting, Netlify, Vercel (static), oder via eigenem Server mit SSL ausgeliefert werden.

---

## 12. Offener Wissensbereich (Ratgeber)

Als optionale, im Briefing vorgeschlagene Ergänzung wurde ein schlanker Ratgeber-Bereich mit zwei Startartikeln umgesetzt („Welche ISO-Norm passt zu meinem Unternehmen?“, „Ablauf eines Zertifizierungsaudits“), erweiterbar über `src/ratgeber/*.njk` mit `tags: ["ratgeber"]`.
