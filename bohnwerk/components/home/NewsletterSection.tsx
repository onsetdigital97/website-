import { NewsletterForm } from './NewsletterForm';
import { Reveal } from '@/components/ui/Reveal';

export function NewsletterSection() {
  return (
    <section className="bg-espresso-950 py-20 sm:py-24">
      <div className="container container-px">
        <Reveal className="mx-auto max-w-lg text-center">
          <p className="eyebrow text-copper-300">Newsletter</p>
          <h2 className="mt-3 font-display text-display-md font-semibold text-cream-50">Neue Röstungen, Barista-Wissen und exklusive Angebote direkt in Ihr Postfach</h2>
          <div className="mt-8 text-left">
            <NewsletterForm tone="dark" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
