'use client';

import { useState } from 'react';
import { MapPin, Plus, Trash2, X } from 'lucide-react';
import { RequireAuth } from '@/components/account/RequireAuth';
import { useAuth } from '@/lib/auth';
import { Input, Label } from '@/components/ui/Forms';
import { Button } from '@/components/ui/Button';

export default function AddressesPage() {
  return (
    <RequireAuth>
      <AddressesContent />
    </RequireAuth>
  );
}

const empty = { label: '', vorname: '', nachname: '', strasse: '', plz: '', ort: '', land: 'Deutschland', standard: false };

function AddressesContent() {
  const { addresses, addAddress, removeAddress } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.label.trim()) next.label = 'Pflichtfeld';
    if (!form.vorname.trim()) next.vorname = 'Pflichtfeld';
    if (!form.nachname.trim()) next.nachname = 'Pflichtfeld';
    if (!form.strasse.trim()) next.strasse = 'Pflichtfeld';
    if (!/^\d{4,5}$/.test(form.plz)) next.plz = 'Ungültige PLZ';
    if (!form.ort.trim()) next.ort = 'Pflichtfeld';
    setErrors(next);
    if (Object.keys(next).length) return;
    addAddress(form);
    setForm(empty);
    setShowForm(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-display-sm font-semibold text-ink-900">Adressen</h1>
        <Button variant="ghost" size="sm" icon={<Plus size={15} />} onClick={() => setShowForm((v) => !v)}>
          {showForm ? 'Abbrechen' : 'Neue Adresse'}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={submit} noValidate className="mt-6 space-y-4 rounded-2xl border border-ink-900/10 p-5">
          <div className="flex items-center justify-between">
            <p className="font-display text-sm font-semibold text-ink-900">Neue Adresse hinzufügen</p>
            <button type="button" onClick={() => setShowForm(false)} aria-label="Schließen" className="text-ink-300 hover:text-ink-900">
              <X size={16} />
            </button>
          </div>
          <div>
            <Label htmlFor="addr-label" required>
              Bezeichnung (z. B. Zuhause, Büro)
            </Label>
            <Input id="addr-label" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} error={errors.label} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="addr-vorname" required>
                Vorname
              </Label>
              <Input id="addr-vorname" value={form.vorname} onChange={(e) => setForm({ ...form, vorname: e.target.value })} error={errors.vorname} />
            </div>
            <div>
              <Label htmlFor="addr-nachname" required>
                Nachname
              </Label>
              <Input id="addr-nachname" value={form.nachname} onChange={(e) => setForm({ ...form, nachname: e.target.value })} error={errors.nachname} />
            </div>
          </div>
          <div>
            <Label htmlFor="addr-strasse" required>
              Straße & Hausnummer
            </Label>
            <Input id="addr-strasse" value={form.strasse} onChange={(e) => setForm({ ...form, strasse: e.target.value })} error={errors.strasse} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="addr-plz" required>
                PLZ
              </Label>
              <Input id="addr-plz" value={form.plz} onChange={(e) => setForm({ ...form, plz: e.target.value })} error={errors.plz} />
            </div>
            <div>
              <Label htmlFor="addr-ort" required>
                Ort
              </Label>
              <Input id="addr-ort" value={form.ort} onChange={(e) => setForm({ ...form, ort: e.target.value })} error={errors.ort} />
            </div>
          </div>
          <Button type="submit" variant="primary" size="md">
            Adresse speichern
          </Button>
        </form>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {addresses.map((a) => (
          <div key={a.id} className="rounded-2xl border border-ink-900/10 p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-copper-500" />
                <p className="font-display text-sm font-semibold text-ink-900">{a.label}</p>
                {a.standard && <span className="rounded-full bg-copper-50 px-2 py-0.5 text-[10px] font-semibold uppercase text-copper-700">Standard</span>}
              </div>
              <button type="button" onClick={() => removeAddress(a.id)} aria-label="Adresse löschen" className="text-ink-300 hover:text-terracotta-500">
                <Trash2 size={15} />
              </button>
            </div>
            <p className="mt-3 text-sm text-ink-600">
              {a.vorname} {a.nachname}
              <br />
              {a.strasse}
              <br />
              {a.plz} {a.ort}, {a.land}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
