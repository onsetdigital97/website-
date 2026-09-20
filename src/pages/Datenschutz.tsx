import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SEO } from "@/components/seo/SEO";
import { company } from "@/content/company";

const sections = [
  {
    title: "1. Verantwortlicher",
    body: `${company.legalName}, ${company.addressPlaceholder}, ${company.emailPlaceholder} ist Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) für die Verarbeitung personenbezogener Daten im Rahmen dieser Website. [PLATZHALTER – vor Veröffentlichung durch geprüften, vollständigen Text ersetzen.]`,
  },
  {
    title: "2. Erhebung und Speicherung personenbezogener Daten",
    body: "Beim Aufruf dieser Website werden durch den auf Ihrem Endgerät zum Einsatz kommenden Browser automatisch Informationen an den Server übermittelt (u. a. IP-Adresse, Datum und Uhrzeit der Anfrage, Browsertyp). [PLATZHALTER – konkrete Hosting-Angaben und Speicherdauer ergänzen.]",
  },
  {
    title: "3. Kontaktformular",
    body: "Wenn Sie uns über das Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zur Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. [PLATZHALTER – eingesetzten Formular-/CRM-Dienstleister benennen.]",
  },
  {
    title: "4. Cookies und Tracking",
    body: "Diese Website verwendet Cookies nur im technisch notwendigen Umfang, sofern Sie nicht in der Cookie-Einstellungen-Verwaltung weiteren Kategorien zugestimmt haben. [PLATZHALTER – konkret eingesetzte Analyse- und Marketing-Tools nach finaler technischer Umsetzung ergänzen und mit Consent-Management-Lösung abstimmen.]",
  },
  {
    title: "5. Ihre Rechte",
    body: "Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten sowie das Recht auf Beschwerde bei einer Aufsichtsbehörde.",
  },
  {
    title: "6. Speicherdauer",
    body: "Personenbezogene Daten werden nur so lange gespeichert, wie dies für die jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungsfristen bestehen. [PLATZHALTER – konkrete Fristen ergänzen.]",
  },
];

export default function Datenschutz() {
  return (
    <>
      <SEO title="Datenschutz | ONSET.digital" description="Datenschutzerklärung von ONSET.digital." path="/datenschutz/" noindex />
      <Breadcrumbs items={[{ name: "Datenschutz", path: "/datenschutz/" }]} />
      <Container className="max-w-3xl py-16 md:py-24">
        <h1 className="font-display text-3xl">Datenschutzerklärung</h1>
        <p className="mt-3 text-sm text-graphite">
          Dieser Text bildet die Struktur einer vollständigen Datenschutzerklärung ab und enthält an mehreren
          Stellen Platzhalter. Vor Veröffentlichung ist eine Prüfung und Vervollständigung durch eine fachkundige
          bzw. rechtsberatende Stelle erforderlich, insbesondere sobald konkrete Analyse-, Marketing- und
          Hosting-Dienstleister feststehen.
        </p>
        <div className="mt-10 space-y-8 text-graphite">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-display text-xl text-ink">{section.title}</h2>
              <p className="mt-2">{section.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
