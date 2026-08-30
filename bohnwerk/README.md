# Bohnwerk — Premium Coffee Shop

Ein eigenständiger, hochwertiger Onlineshop-Prototyp für die fiktive Kaffeemarke **Bohnwerk** (Next.js 14 App Router, TypeScript, Tailwind CSS). Konzeptionell und
visuell inspiriert von hochwertigen Coffee-Lifestyle- und Premium-Tech-Referenzen, aber eigenständig entwickelt — keine übernommenen Logos, Markennamen oder Texte.

## Setup

```bash
cd bohnwerk
npm install
npm run dev      # Entwicklungsserver auf http://localhost:3000
npm run build    # Produktions-Build
npm start        # Produktions-Server
```

## Umfang

- **Startseite**: Hero-Slider, Kategorien, Bestseller, interaktive Kaffeeberatung, Maschinen-Hotspots, alternierende Split-Screen-Sektionen, Kaffee-Sortiment,
  Abo-Teaser, Barista-Kurse, Markenversprechen, Story, Social Proof, Magazin-Teaser, Newsletter.
- **Shop**: Kategorie-/Filterseiten für Kaffee, Espressomaschinen, Mühlen, Zubehör; Suche; Produktdetailseiten (Kaffee, Maschine, Zubehör) mit Galerie,
  Geschmacksprofil, technischen Daten, Hotspots, Bewertungen, FAQ, verwandten Produkten.
- **Kaufprozess**: Warenkorb (Drawer + Seite), mehrstufiger Checkout (Adresse → Versand → Zahlung → Übersicht → Bestätigung), Gutscheincode, Cross-Selling,
  Fortschrittsbalken für kostenlosen Versand.
- **Konto**: Anmeldung/Registrierung/Passwort vergessen (client-seitig simuliert), Bestellungen, Adressverwaltung, Merkliste, Kaffee-Abo-Verwaltung, Kursbuchungen.
- **Kaffee-Abo**: Drei Pakete (Einsteiger/Entdecker/Premium) mit konfigurierbarer Sorte, Mahlgrad, Menge und Lieferintervall.
- **Barista-Kurse**: Kursliste und Buchungsseite mit Terminwahl und „ausgebucht“-Status.
- **Magazin**: Artikelliste und -detailseiten, verknüpft mit passenden Produkten.
- **Rechtliches**: Impressum, Datenschutz, AGB, Widerruf, Versand & Zahlung, Rückgabe, FAQ, Kontakt, Händlerbereich.
- Produktvergleich, Merkliste, zuletzt angesehene Produkte, Cookie-Consent-Banner, strukturierte Daten (Product/FAQ/Breadcrumb/Article), Sitemap & robots.txt.

## Bekannte Platzhalter

- **Produktfotografie**: Alle Bilder sind kuratierte Unsplash-Platzhalter (siehe `lib/data/images.ts`) und sollten vor Live-Schaltung durch echte Marken-/
  Produktfotografie ersetzt werden.
- **Bewertungen & Kennzahlen**: Kundenbewertungen, Presselogos und Kennzahlen im Social-Proof-Bereich sind deutlich als Platzhalter gekennzeichnet, bis echte Daten
  vorliegen.
- **Rechtstexte**: Impressum/AGB/Datenschutz enthalten Platzhalter (z. B. Handelsregisternummer) und müssen vor Veröffentlichung juristisch geprüft werden.
- **Zahlungs-/Checkout-Anbindung**: Der Checkout bildet den vollständigen Ablauf inkl. Validierung ab; die eigentliche Zahlungsabwicklung ist an dieser Stelle an
  das produktive Shopsystem (z. B. Shopify, Stripe, Klarna) anzubinden.
- **Konto/Bestellungen**: Login, Bestellhistorie und Adressverwaltung sind client-seitig (LocalStorage) simuliert und müssen an ein echtes Backend angebunden werden.

## Design-System

Farben, Typografie (Manrope/Inter), Abstände, Buttons, Badges, Formularfelder und Hover-Zustände sind zentral in `tailwind.config.ts` und `app/globals.css`
sowie den Komponenten unter `components/ui/` definiert.
