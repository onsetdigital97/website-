import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata: Metadata = { title: 'Kontakt', description: 'Persönliche Kaufberatung und Kundenservice — kontaktieren Sie unser Team.' };

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Start', href: '/' }, { label: 'Kontakt' }]} />
      <div className="container container-px py-10">
        <p className="eyebrow text-copper-500">Wir sind für Sie da</p>
        <h1 className="mt-3 font-display text-display-md font-semibold text-ink-900">Kontakt</h1>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 text-copper-500" />
                <div>
                  <p className="font-semibold text-ink-900">E-Mail</p>
                  <p className="text-ink-500">hallo@bohnwerk.de</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 text-copper-500" />
                <div>
                  <p className="font-semibold text-ink-900">Telefon</p>
                  <p className="text-ink-500">Mo–Fr, 9–18 Uhr</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 text-copper-500" />
                <div>
                  <p className="font-semibold text-ink-900">Rösterei & Showroom</p>
                  <p className="text-ink-500">Speicherstraße 12, 20457 Hamburg</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="mt-0.5 text-copper-500" />
                <div>
                  <p className="font-semibold text-ink-900">Antwortzeit</p>
                  <p className="text-ink-500">In der Regel innerhalb eines Werktages</p>
                </div>
              </li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </div>
    </>
  );
}
