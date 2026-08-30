import { Rating } from '@/components/ui/Rating';
import { Reveal } from '@/components/ui/Reveal';

const testimonials = [
  { author: 'Melina K.', rating: 5, text: '„Der Espresso Império hat unseren Sonntagmorgen verändert — Crema wie in unserer Lieblingsbar.“' },
  { author: 'Jonas R.', rating: 5, text: '„Die CORVO Automatica ist die beste Investition für unsere Küche seit Jahren. Läuft täglich.“' },
  { author: 'Tobias L.', rating: 5, text: '„Der Latte-Art-Workshop hat mir endlich das Gießen beigebracht. Kompetente, geduldige Trainer.“' },
];

export function SocialProof() {
  return (
    <section className="bg-cream-50 py-20 sm:py-28">
      <div className="container container-px">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="eyebrow text-copper-500">Was unsere Kundschaft sagt</p>
          <h2 className="mt-3 font-display text-display-md font-semibold text-ink-900">Vertrauen, das wächst</h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <Rating value={4.8} />
            <span className="text-sm text-ink-500">4,8 / 5 · Platzhalter, bis echte Kennzahlen vorliegen</span>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.author} delay={i * 70} className="rounded-2xl border border-ink-900/10 bg-cream-50 p-6">
              <Rating value={t.rating} />
              <p className="mt-4 text-sm leading-relaxed text-ink-700">{t.text}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-ink-300">{t.author} · Verifizierter Kauf (Platzhalter)</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 border-t border-ink-900/10 pt-10 text-center">
          <p className="eyebrow text-ink-300">Empfohlen von</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-50">
            {['Kaffeemagazin', 'Barista Journal', 'Genuss & Kultur', 'Rösterei-Guide'].map((name) => (
              <span key={name} className="font-display text-sm font-semibold tracking-wide text-ink-500">
                {name}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-ink-300">Platzhalter-Logos — durch echte Presse-/Partnerlogos ersetzen.</p>
        </Reveal>
      </div>
    </section>
  );
}
