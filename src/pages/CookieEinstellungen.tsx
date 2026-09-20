import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SEO } from "@/components/seo/SEO";
import { defaultConsent, getStoredConsent, storeConsent, type ConsentState } from "@/lib/cookieConsent";

export default function CookieEinstellungen() {
  const [consent, setConsent] = useState<ConsentState>(defaultConsent);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) setConsent(stored);
  }, []);

  const save = () => {
    storeConsent(consent);
    setSaved(true);
  };

  return (
    <>
      <SEO title="Cookie-Einstellungen | ONSET.digital" description="Verwalten Sie Ihre Cookie-Einstellungen für onset.digital." path="/cookie-einstellungen/" noindex />
      <Breadcrumbs items={[{ name: "Cookie-Einstellungen", path: "/cookie-einstellungen/" }]} />
      <Container className="max-w-2xl py-16 md:py-24">
        <h1 className="font-display text-3xl">Cookie-Einstellungen</h1>
        <p className="mt-4 text-graphite">
          Hier können Sie festlegen, welche Kategorien von Cookies auf onset.digital aktiv sein dürfen. Notwendige
          Cookies sind für den technischen Betrieb der Website erforderlich und können nicht deaktiviert werden.
        </p>

        <div className="mt-10 space-y-6">
          <div className="flex items-start justify-between gap-6 border-t border-line pt-6">
            <div>
              <h2 className="font-display text-lg">Notwendig</h2>
              <p className="mt-1 text-sm text-graphite">Erforderlich für grundlegende Funktionen wie Navigation und Formularübermittlung.</p>
            </div>
            <input type="checkbox" checked disabled className="mt-1 size-4" />
          </div>

          <div className="flex items-start justify-between gap-6 border-t border-line pt-6">
            <div>
              <h2 className="font-display text-lg">Analyse</h2>
              <p className="mt-1 text-sm text-graphite">Hilft uns zu verstehen, wie die Website genutzt wird, um sie kontinuierlich zu verbessern.</p>
            </div>
            <input
              type="checkbox"
              checked={consent.analytics}
              onChange={(e) => setConsent((c) => ({ ...c, analytics: e.target.checked }))}
              className="mt-1 size-4"
            />
          </div>

          <div className="flex items-start justify-between gap-6 border-t border-line pt-6">
            <div>
              <h2 className="font-display text-lg">Marketing</h2>
              <p className="mt-1 text-sm text-graphite">Wird für die Erfolgsmessung von Kampagnen genutzt, sobald entsprechende Tools aktiv sind.</p>
            </div>
            <input
              type="checkbox"
              checked={consent.marketing}
              onChange={(e) => setConsent((c) => ({ ...c, marketing: e.target.checked }))}
              className="mt-1 size-4"
            />
          </div>
        </div>

        <button onClick={save} className="mt-10 bg-ink px-8 py-4 text-sm font-medium text-paper transition-colors hover:bg-ink-soft">
          Auswahl speichern
        </button>
        {saved && <p className="mt-4 text-sm text-graphite">Ihre Einstellungen wurden gespeichert.</p>}
      </Container>
    </>
  );
}
