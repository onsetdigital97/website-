import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function CTABand({
  kicker = "Nächster Schritt",
  title,
  description,
  primaryLabel,
  secondaryLabel = "Erstgespräch vereinbaren",
}: {
  kicker?: string;
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="bg-ink py-20 text-paper md:py-28">
      <Container className="text-center">
        <p className="kicker text-smoke">{kicker}</p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl md:text-4xl text-balance">{title}</h2>
        <p className="mx-auto mt-5 max-w-xl text-smoke">{description}</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-6">
          <Button href="/kontakt/" tone="dark">{primaryLabel}</Button>
          <Button href="/kontakt/" variant="secondary" tone="dark">{secondaryLabel}</Button>
        </div>
      </Container>
    </section>
  );
}
