import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SEO } from "@/components/seo/SEO";

export default function NotFound() {
  return (
    <>
      <SEO title="Seite nicht gefunden | ONSET.digital" description="Diese Seite existiert nicht oder wurde verschoben." path="/404/" noindex />
      <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
        <p className="kicker text-graphite">404</p>
        <h1 className="mt-4 font-display text-3xl md:text-4xl">Diese Seite existiert nicht.</h1>
        <p className="mt-4 max-w-md text-graphite">
          Möglicherweise wurde die Seite verschoben oder der Link ist veraltet. Kehren Sie zur Startseite zurück oder
          sehen Sie sich unsere Leistungen an.
        </p>
        <div className="mt-8 flex gap-6">
          <Button href="/">Zur Startseite</Button>
          <Button href="/leistungen/" variant="secondary">Leistungen ansehen</Button>
        </div>
      </Container>
    </>
  );
}
