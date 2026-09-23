import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

export function PageHero({
  kicker,
  title,
  lead,
  children,
}: {
  kicker: string;
  title: string;
  lead: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line bg-paper py-16 md:py-24">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <p className="kicker text-graphite">{kicker}</p>
          <h1 className="mt-4 font-display text-[clamp(2rem,3.5vw+1rem,3.25rem)] text-balance">{title}</h1>
          <p className="mt-6 max-w-xl text-lg text-graphite text-balance">{lead}</p>
        </div>
        {children && <div className="lg:col-span-5">{children}</div>}
      </Container>
    </section>
  );
}
