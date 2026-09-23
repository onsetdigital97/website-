import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SEO } from "@/components/seo/SEO";
import { company } from "@/content/company";

export default function Impressum() {
  return (
    <>
      <SEO title="Impressum | ONSET.digital" description="Impressum von ONSET.digital gemäß § 5 TMG." path="/impressum/" noindex />
      <Breadcrumbs items={[{ name: "Impressum", path: "/impressum/" }]} />
      <Container className="max-w-3xl py-16 md:py-24">
        <h1 className="font-display text-3xl">Impressum</h1>
        <p className="mt-3 text-sm text-graphite">
          Rechtlich verbindliche Angaben stehen unter Vorbehalt der Prüfung durch eine rechtsberatende Person und
          werden vor Veröffentlichung durch die tatsächlichen Unternehmensdaten ersetzt.
        </p>

        <div className="mt-10 space-y-8 text-graphite">
          <div>
            <h2 className="font-display text-xl text-ink">Angaben gemäß § 5 TMG</h2>
            <p className="mt-2">{company.legalName}</p>
            <p>{company.addressPlaceholder}</p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">Kontakt</h2>
            <p className="mt-2">Telefon: {company.phonePlaceholder}</p>
            <p>E-Mail: {company.emailPlaceholder}</p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">Vertretungsberechtigt</h2>
            <p className="mt-2">[PLATZHALTER – gesetzliche(r) Vertreter:in]</p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">Umsatzsteuer-ID</h2>
            <p className="mt-2">[PLATZHALTER – Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz]</p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">Registereintrag</h2>
            <p className="mt-2">[PLATZHALTER – Registergericht, Registernummer, sofern zutreffend]</p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
            <p className="mt-2">[PLATZHALTER – Name, Anschrift]</p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">EU-Streitschlichtung</h2>
            <p className="mt-2">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a href="https://ec.europa.eu/consumers/odr/" className="underline underline-offset-4" target="_blank" rel="noreferrer">
                https://ec.europa.eu/consumers/odr/
              </a>
              . Unsere E-Mail-Adresse finden Sie oben. Wir sind nicht verpflichtet und nicht bereit, an
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen. [PLATZHALTER – ggf.
              anpassen]
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
