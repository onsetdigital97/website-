'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronRight } from 'lucide-react';
import { mainNav } from '@/lib/nav';
import { useShop } from '@/lib/store';
import { cn } from '@/lib/utils';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { cartCount, wishlist, openCart } = useShop();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/suche?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery('');
    }
  }

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          'w-full border-b transition-all duration-300 ease-smooth',
          scrolled ? 'bg-cream-50/90 backdrop-blur-md border-ink-900/10 shadow-sm' : 'bg-cream-50 border-transparent'
        )}
      >
        <div className={cn('container flex items-center justify-between container-px transition-all duration-300', scrolled ? 'h-16' : 'h-20')}>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full text-ink-900 lg:hidden btn-focus-ring"
              onClick={() => setMobileOpen(true)}
              aria-label="Menü öffnen"
            >
              <Menu size={22} />
            </button>
            <Link href="/" className="flex items-center gap-2 font-display" aria-label="Bohnwerk Startseite">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-espresso-900 text-cream-50">
                <span className="text-sm font-bold">B</span>
              </span>
              <span className="hidden text-lg font-bold tracking-tight text-ink-900 sm:inline">BOHNWERK</span>
            </Link>
          </div>

          <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setOpenMenu(null)}>
            {mainNav.map((item) => (
              <div key={item.label} className="relative" onMouseEnter={() => setOpenMenu(item.label)}>
                <Link
                  href={item.href}
                  className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-900/5 hover:text-ink-900 btn-focus-ring"
                >
                  {item.label}
                </Link>
                {item.columns && (
                  <div
                    className={cn(
                      'absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 pt-3 transition-all duration-200',
                      openMenu === item.label ? 'pointer-events-auto opacity-100 translate-y-0' : 'pointer-events-none opacity-0 -translate-y-2'
                    )}
                  >
                    <div className="grid grid-cols-[1.3fr_1fr] gap-8 rounded-2xl border border-ink-900/10 bg-cream-50 p-6 shadow-lift">
                      <div className="grid grid-cols-2 gap-6">
                        {item.columns.map((col) => (
                          <div key={col.heading}>
                            <p className="eyebrow text-ink-300">{col.heading}</p>
                            <ul className="mt-3 space-y-2.5">
                              {col.links.map((l) => (
                                <li key={l.label}>
                                  <Link href={l.href} className="text-sm text-ink-700 hover:text-copper-600">
                                    {l.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      {item.featured && (
                        <Link href={item.featured.href} className="group relative block overflow-hidden rounded-xl">
                          <div className="relative aspect-[4/3]">
                            <Image src={item.featured.image} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-espresso-950/10 to-transparent" />
                          </div>
                          <span className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-sm font-semibold text-cream-50">
                            {item.featured.title}
                            <ChevronRight size={16} />
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button type="button" onClick={() => setSearchOpen((v) => !v)} className="flex h-10 w-10 items-center justify-center rounded-full text-ink-900 hover:bg-ink-900/5 btn-focus-ring" aria-label="Suche öffnen">
              <Search size={19} />
            </button>
            <Link href="/konto" className="hidden h-10 w-10 items-center justify-center rounded-full text-ink-900 hover:bg-ink-900/5 btn-focus-ring sm:flex" aria-label="Kundenkonto">
              <User size={19} />
            </Link>
            <Link href="/konto/merkliste" className="relative hidden h-10 w-10 items-center justify-center rounded-full text-ink-900 hover:bg-ink-900/5 btn-focus-ring sm:flex" aria-label="Merkliste">
              <Heart size={19} />
              {wishlist.length > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-copper-500 text-[10px] font-bold text-cream-50">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button type="button" onClick={openCart} className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink-900 hover:bg-ink-900/5 btn-focus-ring" aria-label={`Warenkorb, ${cartCount} Artikel`}>
              <ShoppingBag size={19} />
              {cartCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-copper-500 text-[10px] font-bold text-cream-50">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className={cn('overflow-hidden border-t border-ink-900/10 transition-all duration-300 ease-smooth', searchOpen ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0 border-t-0')}>
          <form onSubmit={submitSearch} className="container flex items-center gap-3 py-3 container-px">
            <Search size={18} className="text-ink-300" />
            <input
              ref={searchInputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="Kaffee, Maschinen, Zubehör suchen …"
              className="flex-1 bg-transparent text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none"
            />
            <button type="button" onClick={() => setSearchOpen(false)} aria-label="Suche schließen" className="text-ink-300 hover:text-ink-900">
              <X size={18} />
            </button>
          </form>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
