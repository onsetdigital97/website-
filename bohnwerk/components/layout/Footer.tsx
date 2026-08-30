import Link from 'next/link';
import { Instagram, Facebook, Youtube, CreditCard } from 'lucide-react';
import { footerNav } from '@/lib/nav';
import { NewsletterForm } from '@/components/home/NewsletterForm';

export function Footer() {
  return (
    <footer className="bg-espresso-950 text-cream-200">
      <div className="container container-px py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Link href="/" className="flex items-center gap-2 font-display">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-copper-500 text-cream-50">
                <span className="text-sm font-bold">B</span>
              </span>
              <span className="text-lg font-bold tracking-tight text-cream-50">BOHNWERK</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-200/70">
              Präzisionsgeröstete Spezialitätenkaffees, durchdachte Maschinen und Wissen für alle, die Kaffee lieben.
            </p>
            <div className="mt-6 max-w-sm">
              <NewsletterForm tone="dark" compact />
            </div>
            <div className="mt-6 flex items-center gap-3">
              <a href="#" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-50/10 hover:bg-cream-50/20 btn-focus-ring">
                <Instagram size={16} />
              </a>
              <a href="#" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-50/10 hover:bg-cream-50/20 btn-focus-ring">
                <Facebook size={16} />
              </a>
              <a href="#" aria-label="YouTube" className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-50/10 hover:bg-cream-50/20 btn-focus-ring">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(footerNav).map(([heading, links]) => (
              <div key={heading}>
                <p className="eyebrow text-cream-50/50">{heading}</p>
                <ul className="mt-3.5 space-y-2.5">
                  {links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-sm text-cream-200/80 hover:text-copper-300">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-cream-50/10">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 container-px sm:flex-row">
          <p className="text-xs text-cream-200/50">© {new Date().getFullYear()} Bohnwerk GmbH. Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-3 text-cream-200/60">
            <CreditCard size={18} aria-hidden="true" />
            <span className="text-xs">Visa · Mastercard · PayPal · Apple Pay · Klarna · SEPA-Lastschrift</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
