import { Link } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { company } from "@/content/company";
import { services } from "@/content/services";
import { solutions } from "@/content/solutions";
import { insights } from "@/content/insights";

export function Footer() {
  return (
    <footer className="border-t border-line-dark bg-ink text-paper">
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-display text-lg">
              ONSET<span className="text-smoke">.digital</span>
            </p>
            <p className="mt-4 max-w-xs text-sm text-smoke">
              Digitale Systeme für Marken, die weiterdenken: Strategie, Commerce, Automatisierung und Sichtbarkeit aus einer Verantwortung.
            </p>
            <div className="mt-6 space-y-1 text-sm text-smoke">
              <p>{company.city}</p>
              <p>{company.addressPlaceholder}</p>
              <p>{company.emailPlaceholder}</p>
              <p>{company.phonePlaceholder}</p>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="kicker text-smoke">Leistungen</p>
            <ul className="mt-4 space-y-3 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link to={`/leistungen/${service.slug}/`} className="text-paper/85 hover:text-paper hover:underline underline-offset-4">
                    {service.navLabel}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/leistungen/" className="text-smoke hover:text-paper">
                  Alle Leistungen →
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="kicker text-smoke">Lösungen</p>
            <ul className="mt-4 space-y-3 text-sm">
              {solutions.map((solution) => (
                <li key={solution.slug}>
                  <Link to={`/loesungen/${solution.slug}/`} className="text-paper/85 hover:text-paper hover:underline underline-offset-4">
                    {solution.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="kicker text-smoke">Unternehmen</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link to="/ueber-onset/" className="text-paper/85 hover:text-paper hover:underline underline-offset-4">Über ONSET</Link></li>
              <li><Link to="/referenzen/" className="text-paper/85 hover:text-paper hover:underline underline-offset-4">Referenzen</Link></li>
              <li><Link to="/insights/" className="text-paper/85 hover:text-paper hover:underline underline-offset-4">Insights</Link></li>
              <li><Link to="/kontakt/" className="text-paper/85 hover:text-paper hover:underline underline-offset-4">Kontakt</Link></li>
            </ul>
          </div>
        </div>

        {insights.length > 0 && (
          <div className="mt-14 border-t border-line-dark pt-8">
            <p className="kicker text-smoke">Aktuelle Insights</p>
            <div className="mt-4 flex flex-col gap-2 md:flex-row md:gap-10">
              {insights.slice(0, 3).map((insight) => (
                <Link key={insight.slug} to={`/insights/${insight.slug}/`} className="text-sm text-paper/85 hover:text-paper hover:underline underline-offset-4">
                  {insight.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-14 flex flex-col gap-4 border-t border-line-dark pt-8 text-xs text-smoke md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {company.name}. Alle Rechte vorbehalten.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/impressum/" className="hover:text-paper">Impressum</Link>
            <Link to="/datenschutz/" className="hover:text-paper">Datenschutz</Link>
            <Link to="/cookie-einstellungen/" className="hover:text-paper">Cookie-Einstellungen</Link>
            {company.socials.map((social) => (
              <a key={social.label} href={social.href} className="hover:text-paper">{social.label}</a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
