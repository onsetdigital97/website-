'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, MapPin, Heart, Repeat, GraduationCap, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { cn } from '@/lib/utils';

const links = [
  { href: '/konto', label: 'Übersicht', icon: LayoutDashboard },
  { href: '/konto/bestellungen', label: 'Bestellungen', icon: Package },
  { href: '/konto/adressen', label: 'Adressen', icon: MapPin },
  { href: '/konto/merkliste', label: 'Merkliste', icon: Heart },
  { href: '/konto/abo', label: 'Kaffee-Abo', icon: Repeat },
  { href: '/konto/kurse', label: 'Kursbuchungen', icon: GraduationCap },
];

export function AccountSidebar() {
  const pathname = usePathname();
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav aria-label="Kontonavigation" className="lg:sticky lg:top-24 lg:h-fit">
      <ul className="flex gap-2 overflow-x-auto pb-2 no-scrollbar lg:flex-col lg:overflow-visible">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <li key={l.href} className="shrink-0">
              <Link
                href={l.href}
                className={cn(
                  'flex items-center gap-2.5 whitespace-nowrap rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors',
                  active ? 'bg-espresso-900 text-cream-50' : 'text-ink-700 hover:bg-ink-900/5'
                )}
              >
                <l.icon size={16} /> {l.label}
              </Link>
            </li>
          );
        })}
        {isLoggedIn && (
          <li className="shrink-0">
            <button type="button" onClick={logout} className="flex items-center gap-2.5 whitespace-nowrap rounded-xl px-3.5 py-2.5 text-sm font-medium text-terracotta-600 hover:bg-terracotta-50">
              <LogOut size={16} /> Abmelden
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
