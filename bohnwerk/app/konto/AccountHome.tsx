'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Package, MapPin, Heart, Repeat, GraduationCap, ArrowRight } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { Input, Label, Checkbox } from '@/components/ui/Forms';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function AccountHome() {
  const { isLoggedIn, hydrated, user } = useAuth();

  if (!hydrated) return null;

  if (isLoggedIn) {
    return (
      <div>
        <h1 className="font-display text-display-sm font-semibold text-ink-900">Willkommen zurück{user?.firstName ? `, ${user.firstName}` : ''}!</h1>
        <p className="mt-2 text-sm text-ink-500">Verwalten Sie Ihre Bestellungen, Adressen und Ihr Kaffee-Abo an einem Ort.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { href: '/konto/bestellungen', label: 'Bestellungen', icon: Package, desc: 'Bestellhistorie & Rechnungen' },
            { href: '/konto/adressen', label: 'Adressen', icon: MapPin, desc: 'Liefer- & Rechnungsadressen' },
            { href: '/konto/merkliste', label: 'Merkliste', icon: Heart, desc: 'Gespeicherte Produkte' },
            { href: '/konto/abo', label: 'Kaffee-Abo', icon: Repeat, desc: 'Abo verwalten, pausieren' },
            { href: '/konto/kurse', label: 'Kursbuchungen', icon: GraduationCap, desc: 'Gebuchte Barista-Kurse' },
          ].map((c) => (
            <Link key={c.href} href={c.href} className="group flex items-center justify-between rounded-2xl border border-ink-900/10 p-5 transition-colors hover:border-copper-400">
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-copper-50 text-copper-600">
                  <c.icon size={18} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink-900">{c.label}</span>
                  <span className="block text-xs text-ink-500">{c.desc}</span>
                </span>
              </span>
              <ArrowRight size={16} className="text-ink-300 transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return <AuthForms />;
}

function AuthForms() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ firstName: '', lastName: '', email: '', password: '', consent: false });
  const [error, setError] = useState('');

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = login(loginData.email, loginData.password);
    if (!res.ok) setError(res.error ?? 'Anmeldung fehlgeschlagen.');
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!registerData.consent) {
      setError('Bitte stimmen Sie den Nutzungsbedingungen zu.');
      return;
    }
    const res = register(registerData);
    if (!res.ok) setError(res.error ?? 'Registrierung fehlgeschlagen.');
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-8 flex gap-2 rounded-full bg-ink-900/5 p-1">
        <button
          type="button"
          onClick={() => {
            setMode('login');
            setError('');
          }}
          className={cn('flex-1 rounded-full py-2.5 text-sm font-semibold transition-colors', mode === 'login' ? 'bg-cream-50 text-ink-900 shadow-soft' : 'text-ink-500')}
        >
          Anmelden
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('register');
            setError('');
          }}
          className={cn('flex-1 rounded-full py-2.5 text-sm font-semibold transition-colors', mode === 'register' ? 'bg-cream-50 text-ink-900 shadow-soft' : 'text-ink-500')}
        >
          Registrieren
        </button>
      </div>

      {mode === 'login' ? (
        <form onSubmit={handleLogin} className="space-y-4" noValidate>
          <h1 className="font-display text-xl font-semibold text-ink-900">Willkommen zurück</h1>
          <div>
            <Label htmlFor="login-email" required>
              E-Mail-Adresse
            </Label>
            <Input id="login-email" type="email" autoComplete="email" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="login-password" required>
              Passwort
            </Label>
            <Input id="login-password" type="password" autoComplete="current-password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
          </div>
          {error && (
            <p role="alert" className="text-xs text-terracotta-600">
              {error}
            </p>
          )}
          <Button type="submit" variant="primary" size="lg" className="w-full">
            Anmelden
          </Button>
          <Link href="/konto/passwort-vergessen" className="block text-center text-sm text-ink-500 hover:text-copper-600">
            Passwort vergessen?
          </Link>
          <p className="text-center text-xs text-ink-400">Demo-Zugang: Beliebige E-Mail-Adresse mit Passwort (mind. 6 Zeichen).</p>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="space-y-4" noValidate>
          <h1 className="font-display text-xl font-semibold text-ink-900">Konto erstellen</h1>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="reg-first" required>
                Vorname
              </Label>
              <Input id="reg-first" value={registerData.firstName} onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="reg-last" required>
                Nachname
              </Label>
              <Input id="reg-last" value={registerData.lastName} onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })} />
            </div>
          </div>
          <div>
            <Label htmlFor="reg-email" required>
              E-Mail-Adresse
            </Label>
            <Input id="reg-email" type="email" autoComplete="email" value={registerData.email} onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="reg-password" required>
              Passwort
            </Label>
            <Input id="reg-password" type="password" autoComplete="new-password" value={registerData.password} onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} />
          </div>
          <Checkbox
            id="reg-consent"
            checked={registerData.consent}
            onChange={(e) => setRegisterData({ ...registerData, consent: e.target.checked })}
            label={
              <>
                Ich akzeptiere die <Link href="/agb" className="underline">AGB</Link> und <Link href="/datenschutz" className="underline">Datenschutzerklärung</Link>.
              </>
            }
          />
          {error && (
            <p role="alert" className="text-xs text-terracotta-600">
              {error}
            </p>
          )}
          <Button type="submit" variant="primary" size="lg" className="w-full">
            Konto erstellen
          </Button>
        </form>
      )}
    </div>
  );
}
