'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { Address, mockAddresses } from '@/lib/data/account';

type User = { firstName: string; lastName: string; email: string };

type AuthContextValue = {
  isLoggedIn: boolean;
  hydrated: boolean;
  user: User | null;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  register: (data: { firstName: string; lastName: string; email: string; password: string }) => { ok: boolean; error?: string };
  logout: () => void;
  requestPasswordReset: (email: string) => { ok: boolean; error?: string };
  addresses: Address[];
  addAddress: (a: Omit<Address, 'id'>) => void;
  removeAddress: (id: string) => void;
  subscriptionActive: boolean;
  subscriptionPaused: boolean;
  toggleSubscriptionPause: () => void;
  cancelSubscription: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [subscriptionActive, setSubscriptionActive] = useState(true);
  const [subscriptionPaused, setSubscriptionPaused] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('bohnwerk:user');
      if (raw) setUser(JSON.parse(raw));
      const rawAddr = window.localStorage.getItem('bohnwerk:addresses');
      if (rawAddr) setAddresses(JSON.parse(rawAddr));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      if (user) window.localStorage.setItem('bohnwerk:user', JSON.stringify(user));
      else window.localStorage.removeItem('bohnwerk:user');
    } catch {
      // ignore
    }
  }, [user, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem('bohnwerk:addresses', JSON.stringify(addresses));
    } catch {
      // ignore
    }
  }, [addresses, hydrated]);

  const login = useCallback((email: string, password: string) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' };
    if (password.length < 6) return { ok: false, error: 'Das Passwort muss mindestens 6 Zeichen lang sein.' };
    setUser({ firstName: email.split('@')[0], lastName: '', email });
    return { ok: true };
  }, []);

  const register = useCallback((data: { firstName: string; lastName: string; email: string; password: string }) => {
    if (!data.firstName.trim() || !data.lastName.trim()) return { ok: false, error: 'Bitte Vor- und Nachnamen angeben.' };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return { ok: false, error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' };
    if (data.password.length < 6) return { ok: false, error: 'Das Passwort muss mindestens 6 Zeichen lang sein.' };
    setUser({ firstName: data.firstName, lastName: data.lastName, email: data.email });
    return { ok: true };
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const requestPasswordReset = useCallback((email: string) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' };
    return { ok: true };
  }, []);

  const addAddress = useCallback((a: Omit<Address, 'id'>) => {
    setAddresses((prev) => [...prev, { ...a, id: `addr-${Date.now()}` }]);
  }, []);

  const removeAddress = useCallback((id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const toggleSubscriptionPause = useCallback(() => setSubscriptionPaused((p) => !p), []);
  const cancelSubscription = useCallback(() => setSubscriptionActive(false), []);

  const value: AuthContextValue = {
    isLoggedIn: Boolean(user),
    hydrated,
    user,
    login,
    register,
    logout,
    requestPasswordReset,
    addresses,
    addAddress,
    removeAddress,
    subscriptionActive,
    subscriptionPaused,
    toggleSubscriptionPause,
    cancelSubscription,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
