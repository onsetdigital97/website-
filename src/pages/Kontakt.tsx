import { useState, type FormEvent } from "react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SEO } from "@/components/seo/SEO";
import { breadcrumbSchema } from "@/components/seo/structuredData";
import { company } from "@/content/company";
import { services } from "@/content/services";

const budgetRanges = [
  "bis 10.000 €",
  "10.000–25.000 €",
  "25.000–50.000 €",
  "50.000–100.000 €",
  "über 100.000 €",
  "möchte ich nicht angeben",
];

const startOptions = ["so schnell wie möglich", "in 1–3 Monaten", "in 3–6 Monaten", "noch offen"];

const fieldClass =
  "w-full border border-line bg-paper-raised px-4 py-3 text-sm text-ink placeholder:text-smoke focus:border-ink focus:outline-none";
const labelClass = "text-sm font-medium";

export default function Kontakt() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <SEO
        title="Kontakt | Projekt anfragen | ONSET.digital"
        description="Projekt anfragen oder Erstgespräch vereinbaren: Kontaktieren Sie ONSET.digital in Köln für Digitalstrategie, E-Commerce, KI-Automatisierung, CRM und mehr."
        path="/kontakt/"
        jsonLd={breadcrumbSchema([{ name: "Kontakt", path: "/kontakt/" }])}
      />
      <Breadcrumbs items={[{ name: "Kontakt", path: "/kontakt/" }]} />

      <section className="border-b border-line bg-paper py-16 md:py-24">
        <Container>
          <p className="kicker text-graphite">Kontakt</p>
          <h1 className="mt-4 max-w-2xl font-display text-[clamp(2rem,3.5vw+1rem,3.25rem)] text-balance">
            Projekt anfragen
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-graphite text-balance">
            Beschreiben Sie uns Ihre Ausgangslage – wir melden uns in der Regel innerhalb von zwei Werktagen mit
            einer Einschätzung und einem Vorschlag für die nächsten Schritte.
          </p>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="border border-line bg-mist/40 p-10">
                <h2 className="font-display text-2xl">Vielen Dank für Ihre Anfrage.</h2>
                <p className="mt-4 max-w-md text-graphite">
                  Wir haben Ihre Angaben erhalten und melden uns in der Regel innerhalb von zwei Werktagen bei
                  Ihnen. Bei dringenden Anliegen erreichen Sie uns auch direkt unter {company.emailPlaceholder}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className={labelClass} htmlFor="name">Name *</label>
                    <input id="name" name="name" required className={fieldClass} autoComplete="name" />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass} htmlFor="company">Unternehmen *</label>
                    <input id="company" name="company" required className={fieldClass} autoComplete="organization" />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass} htmlFor="email">E-Mail *</label>
                    <input id="email" name="email" type="email" required className={fieldClass} autoComplete="email" />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass} htmlFor="phone">Telefon (optional)</label>
                    <input id="phone" name="phone" type="tel" className={fieldClass} autoComplete="tel" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={labelClass} htmlFor="service">Gewünschte Leistung</label>
                  <select id="service" name="service" className={fieldClass} defaultValue="">
                    <option value="" disabled>Bitte auswählen</option>
                    {services.map((service) => (
                      <option key={service.slug} value={service.navLabel}>{service.navLabel}</option>
                    ))}
                    <option value="Noch unklar">Noch unklar / mehrere Bereiche</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className={labelClass} htmlFor="website">Aktuelle Website oder Shop (optional)</label>
                    <input id="website" name="website" type="url" placeholder="https://" className={fieldClass} />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass} htmlFor="systems">Vorhandene Systeme (optional)</label>
                    <input id="systems" name="systems" className={fieldClass} placeholder="z. B. Shopify, CRM-System" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={labelClass} htmlFor="goal">Projektziel</label>
                  <textarea id="goal" name="goal" rows={3} className={fieldClass} />
                </div>

                <div className="space-y-2">
                  <label className={labelClass} htmlFor="challenge">Größte aktuelle Herausforderung</label>
                  <textarea id="challenge" name="challenge" rows={3} className={fieldClass} />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className={labelClass} htmlFor="budget">Ungefährer Budgetrahmen</label>
                    <select id="budget" name="budget" className={fieldClass} defaultValue="">
                      <option value="" disabled>Bitte auswählen</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass} htmlFor="start">Gewünschter Projektstart</label>
                    <select id="start" name="start" className={fieldClass} defaultValue="">
                      <option value="" disabled>Bitte auswählen</option>
                      {startOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={labelClass} htmlFor="message">Nachricht</label>
                  <textarea id="message" name="message" rows={4} className={fieldClass} />
                </div>

                <label className="flex items-start gap-3 text-sm text-graphite">
                  <input type="checkbox" required className="mt-1 size-4 shrink-0" />
                  <span>
                    Ich habe die <a href="/datenschutz/" className="underline underline-offset-4">Datenschutzerklärung</a> zur
                    Kenntnis genommen und bin mit der Verarbeitung meiner Angaben zur Bearbeitung meiner Anfrage
                    einverstanden. *
                  </span>
                </label>

                <button type="submit" className="bg-ink px-8 py-4 text-sm font-medium text-paper transition-colors hover:bg-ink-soft">
                  Anfrage absenden
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="border border-line bg-mist/40 p-8">
              <p className="kicker text-graphite">Direkter Kontakt</p>
              <p className="mt-4 text-graphite">{company.city}</p>
              <p className="text-graphite">{company.addressPlaceholder}</p>
              <p className="mt-4 text-graphite">{company.emailPlaceholder}</p>
              <p className="text-graphite">{company.phonePlaceholder}</p>
              <div className="mt-6 border-t border-line pt-6">
                <p className="kicker text-graphite">Ablauf nach Ihrer Anfrage</p>
                <ol className="mt-4 space-y-3 text-sm text-graphite">
                  <li>1. Sichtung Ihrer Angaben, Rückmeldung i. d. R. innerhalb von zwei Werktagen</li>
                  <li>2. Kurzes Erstgespräch zur Einordnung von Ausgangslage und Zielen</li>
                  <li>3. Unverbindlicher Vorschlag für Umfang und nächste Schritte</li>
                </ol>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
