'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Input, Label, Textarea, Checkbox, Select } from '@/components/ui/Forms';
import { Button } from '@/components/ui/Button';

type Errors = Partial<Record<'name' | 'email' | 'message' | 'consent', string>>;

export function ContactForm({ topic = 'Allgemeine Anfrage' }: { topic?: string }) {
  const [form, setForm] = useState({ name: '', email: '', subject: topic, message: '', consent: false });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (!form.name.trim()) next.name = 'Bitte geben Sie Ihren Namen ein.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
    if (form.message.trim().length < 10) next.message = 'Ihre Nachricht sollte mindestens 10 Zeichen enthalten.';
    if (!form.consent) next.consent = 'Bitte stimmen Sie der Datenschutzerklärung zu.';
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  }

  if (sent) {
    return (
      <div className="flex items-start gap-3 rounded-2xl bg-emerald-50 p-5 text-sm text-emerald-800">
        <CheckCircle2 size={20} className="mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold">Danke für Ihre Nachricht!</p>
          <p className="mt-1">Wir melden uns in der Regel innerhalb eines Werktages bei Ihnen.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="cf-name" required>
            Name
          </Label>
          <Input id="cf-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} />
        </div>
        <div>
          <Label htmlFor="cf-email" required>
            E-Mail-Adresse
          </Label>
          <Input id="cf-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} />
        </div>
      </div>
      <div>
        <Label htmlFor="cf-subject">Betreff</Label>
        <Select id="cf-subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
          <option>Allgemeine Anfrage</option>
          <option>Bestellung</option>
          <option>Produktberatung</option>
          <option>Barista-Kurse</option>
          <option>Händleranfrage</option>
        </Select>
      </div>
      <div>
        <Label htmlFor="cf-message" required>
          Nachricht
        </Label>
        <Textarea id="cf-message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} error={errors.message} />
      </div>
      <Checkbox
        id="cf-consent"
        checked={form.consent}
        onChange={(e) => setForm({ ...form, consent: e.target.checked })}
        error={errors.consent}
        label="Ich habe die Datenschutzerklärung gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage zu."
      />
      <Button type="submit" variant="primary" size="lg">
        Nachricht senden
      </Button>
    </form>
  );
}
