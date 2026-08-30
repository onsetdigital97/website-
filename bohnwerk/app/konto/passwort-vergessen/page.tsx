'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { Input, Label } from '@/components/ui/Forms';
import { Button } from '@/components/ui/Button';

export default function ForgotPasswordPage() {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = requestPasswordReset(email);
    if (!res.ok) {
      setError(res.error ?? 'Fehler');
      return;
    }
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="font-display text-xl font-semibold text-ink-900">Passwort vergessen</h1>
      <p className="mt-2 text-sm text-ink-500">Geben Sie Ihre E-Mail-Adresse ein — wir senden Ihnen einen Link zum Zurücksetzen Ihres Passworts.</p>

      {sent ? (
        <div className="mt-6 flex items-start gap-2.5 rounded-xl bg-copper-50 p-4 text-sm text-espresso-900">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-copper-600" />
          Falls ein Konto mit dieser E-Mail-Adresse existiert, wurde ein Link zum Zurücksetzen versendet.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <div>
            <Label htmlFor="forgot-email" required>
              E-Mail-Adresse
            </Label>
            <Input id="forgot-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          {error && (
            <p role="alert" className="text-xs text-terracotta-600">
              {error}
            </p>
          )}
          <Button type="submit" variant="primary" size="lg" className="w-full">
            Link anfordern
          </Button>
        </form>
      )}
    </div>
  );
}
