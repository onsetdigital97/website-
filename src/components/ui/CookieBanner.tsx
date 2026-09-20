import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { defaultConsent, getStoredConsent, storeConsent } from "@/lib/cookieConsent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getStoredConsent() === null);
  }, []);

  if (!visible) return null;

  const acceptAll = () => {
    storeConsent({ necessary: true, analytics: true, marketing: true });
    setVisible(false);
  };

  const rejectAll = () => {
    storeConsent(defaultConsent);
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-line-dark bg-ink px-6 py-6 text-paper md:px-10">
      <div className="mx-auto flex max-w-(--container-page) flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-sm text-smoke">
          Wir verwenden Cookies, um diese Website technisch bereitzustellen. Mit Ihrer Zustimmung setzen wir zudem
          Analyse-Cookies ein, um die Nutzung zu verstehen. Details finden Sie in unserer{" "}
          <Link to="/datenschutz/" className="underline underline-offset-4">Datenschutzerklärung</Link>.
        </p>
        <div className="flex shrink-0 flex-wrap gap-3">
          <button onClick={rejectAll} className="border border-line-dark px-5 py-2.5 text-sm hover:border-paper/70">
            Nur notwendige
          </button>
          <button onClick={acceptAll} className="bg-paper px-5 py-2.5 text-sm text-ink hover:bg-white">
            Alle akzeptieren
          </button>
          <Link
            to="/cookie-einstellungen/"
            className="px-5 py-2.5 text-sm underline underline-offset-4"
            onClick={() => setVisible(false)}
          >
            Einstellungen
          </Link>
        </div>
      </div>
    </div>
  );
}
