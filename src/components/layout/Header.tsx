import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { mainNav, servicesByCategory, solutionNavItems } from "@/content/nav";

export function Header() {
  const [openMega, setOpenMega] = useState<"leistungen" | "loesungen" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMega(null);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="font-display text-lg tracking-tight" onClick={() => setOpenMega(null)}>
            ONSET<span className="text-graphite">.digital</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setOpenMega(null)}>
            {mainNav.map((item) => (
              <div key={item.href} className="relative">
                {item.mega ? (
                  <button
                    className="px-4 py-2 text-sm text-ink/80 transition-colors hover:text-ink"
                    onMouseEnter={() => setOpenMega(item.mega!)}
                    onFocus={() => setOpenMega(item.mega!)}
                  >
                    {item.label}
                  </button>
                ) : (
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `px-4 py-2 text-sm transition-colors hover:text-ink ${isActive ? "text-ink" : "text-ink/80"}`
                    }
                  >
                    {item.label}
                  </NavLink>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <Link to="/kontakt/" className="text-sm text-ink/80 underline-offset-4 hover:text-ink hover:underline">
              Erstgespräch vereinbaren
            </Link>
            <Button href="/kontakt/" withArrow={false} className="py-3">
              Projekt anfragen
            </Button>
          </div>

          <button
            className="flex size-10 items-center justify-center lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {openMega && (
        <div
          className="absolute inset-x-0 top-full hidden border-b border-line bg-paper-raised shadow-[0_24px_48px_-24px_rgba(0,0,0,0.18)] lg:block"
          onMouseEnter={() => setOpenMega(openMega)}
          onMouseLeave={() => setOpenMega(null)}
        >
          <Container>
            <div className="grid grid-cols-12 gap-8 py-10">
              {openMega === "leistungen" ? (
                <>
                  {servicesByCategory.map(({ category, items }) => (
                    <div key={category} className="col-span-3">
                      <p className="kicker mb-4 text-graphite">{category}</p>
                      <ul className="space-y-3">
                        {items.map((service) => (
                          <li key={service.slug}>
                            <Link
                              to={`/leistungen/${service.slug}/`}
                              className="block text-sm text-ink/90 hover:text-ink hover:underline underline-offset-4"
                              onClick={() => setOpenMega(null)}
                            >
                              {service.navLabel}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="col-span-3 border-l border-line pl-8">
                    <p className="kicker mb-4 text-graphite">Übersicht</p>
                    <Link
                      to="/leistungen/"
                      className="mb-6 block text-sm font-medium underline-offset-4 hover:underline"
                      onClick={() => setOpenMega(null)}
                    >
                      Alle Leistungen im Überblick →
                    </Link>
                    <Link
                      to="/referenzen/beispielprojekt-platzhalter/"
                      className="block text-sm text-graphite hover:text-ink"
                      onClick={() => setOpenMega(null)}
                    >
                      Ausgewählte Case Study ansehen
                    </Link>
                  </div>
                </>
              ) : (
                <div className="col-span-12">
                  <p className="kicker mb-5 text-graphite">Nach Ausgangssituation</p>
                  <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
                    {solutionNavItems.map((solution) => (
                      <Link
                        key={solution.slug}
                        to={`/loesungen/${solution.slug}/`}
                        className="group flex items-baseline justify-between gap-4 border-b border-line pb-4"
                        onClick={() => setOpenMega(null)}
                      >
                        <span>
                          <span className="block text-sm font-medium text-ink group-hover:underline underline-offset-4">
                            {solution.navLabel}
                          </span>
                          <span className="mt-1 block text-sm text-graphite">{solution.menuDescription}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Container>
        </div>
      )}

      {mobileOpen && (
        <div className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-line bg-paper lg:hidden">
          <Container>
            <nav className="flex flex-col gap-1 py-6">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="border-b border-line-soft py-4 text-base"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link to="/kontakt/" className="border-b border-line-soft py-4 text-base" onClick={() => setMobileOpen(false)}>
                Kontakt
              </Link>
              <div className="flex flex-col gap-3 py-6">
                <Button href="/kontakt/" className="justify-center">
                  Projekt anfragen
                </Button>
                <Button href="/kontakt/" variant="secondary" withArrow={false} className="justify-center">
                  Erstgespräch vereinbaren
                </Button>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
