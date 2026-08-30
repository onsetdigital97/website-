'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, CheckCircle2, CreditCard, Truck, Lock, ShoppingBag } from 'lucide-react';
import { useShop } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { Input, Label, Select, Checkbox } from '@/components/ui/Forms';
import { Button, LinkButton } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

type Step = 'adresse' | 'versand' | 'zahlung' | 'uebersicht' | 'erfolg';
const stepOrder: Step[] = ['adresse', 'versand', 'zahlung', 'uebersicht'];
const stepLabels: Record<Step, string> = { adresse: 'Adresse', versand: 'Versand', zahlung: 'Zahlung', uebersicht: 'Übersicht', erfolg: 'Erfolg' };

type AddressForm = {
  email: string;
  vorname: string;
  nachname: string;
  strasse: string;
  hausnummer: string;
  plz: string;
  ort: string;
  land: string;
  telefon: string;
};

const emptyAddress: AddressForm = { email: '', vorname: '', nachname: '', strasse: '', hausnummer: '', plz: '', ort: '', land: 'Deutschland', telefon: '' };

export function CheckoutFlow() {
  const { cart, cartSubtotal, freeShippingRemaining, clearCart } = useShop();
  const [step, setStep] = useState<Step>('adresse');
  const [address, setAddress] = useState<AddressForm>(emptyAddress);
  const [errors, setErrors] = useState<Partial<Record<keyof AddressForm, string>>>({});
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'kreditkarte' | 'paypal' | 'klarna' | 'sepa'>('kreditkarte');
  const [orderNumber, setOrderNumber] = useState('');

  const shippingCost = freeShippingRemaining > 0 ? (shippingMethod === 'express' ? 9.9 : 4.9) : shippingMethod === 'express' ? 5.0 : 0;
  const total = cartSubtotal + shippingCost;

  function validateAddress(): boolean {
    const next: Partial<Record<keyof AddressForm, string>> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email)) next.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
    if (!address.vorname.trim()) next.vorname = 'Pflichtfeld';
    if (!address.nachname.trim()) next.nachname = 'Pflichtfeld';
    if (!address.strasse.trim()) next.strasse = 'Pflichtfeld';
    if (!address.hausnummer.trim()) next.hausnummer = 'Pflichtfeld';
    if (!/^\d{4,5}$/.test(address.plz.trim())) next.plz = 'Bitte gültige Postleitzahl angeben.';
    if (!address.ort.trim()) next.ort = 'Pflichtfeld';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goNext() {
    if (step === 'adresse') {
      if (!validateAddress()) return;
      setStep('versand');
    } else if (step === 'versand') {
      setStep('zahlung');
    } else if (step === 'zahlung') {
      setStep('uebersicht');
    } else if (step === 'uebersicht') {
      const num = `BW-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(num);
      clearCart();
      setStep('erfolg');
    }
  }

  function goBack() {
    const idx = stepOrder.indexOf(step);
    if (idx > 0) setStep(stepOrder[idx - 1]);
  }

  if (step === 'erfolg') {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center py-16 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 size={32} />
        </span>
        <h1 className="mt-6 font-display text-display-sm font-semibold text-ink-900">Vielen Dank für Ihre Bestellung!</h1>
        <p className="mt-3 text-sm text-ink-500">
          Ihre Bestellnummer lautet <strong className="text-ink-900">{orderNumber}</strong>. Eine Bestätigung wurde an {address.email || 'Ihre E-Mail-Adresse'} gesendet.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <LinkButton href="/konto/bestellungen" variant="primary" size="md">
            Bestellung ansehen
          </LinkButton>
          <LinkButton href="/kaffee" variant="ghost" size="md">
            Weiter einkaufen
          </LinkButton>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <ShoppingBag size={40} className="text-ink-300" />
        <p className="font-display text-lg font-semibold text-ink-900">Ihr Warenkorb ist leer</p>
        <LinkButton href="/kaffee" variant="primary" size="md">
          Kaffee entdecken
        </LinkButton>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
      <div>
        <ol className="mb-8 flex items-center gap-2 text-xs font-medium text-ink-400">
          {stepOrder.map((s, i) => (
            <li key={s} className="flex items-center gap-2">
              <span className={cn('flex h-6 w-6 items-center justify-center rounded-full', s === step ? 'bg-copper-500 text-cream-50' : stepOrder.indexOf(step) > i ? 'bg-emerald-600 text-cream-50' : 'bg-ink-900/10 text-ink-400')}>
                {stepOrder.indexOf(step) > i ? <Check size={12} /> : i + 1}
              </span>
              <span className={cn(s === step && 'text-ink-900')}>{stepLabels[s]}</span>
              {i < stepOrder.length - 1 && <span className="mx-1 h-px w-6 bg-ink-900/15" />}
            </li>
          ))}
        </ol>

        {step === 'adresse' && (
          <div>
            <h1 className="font-display text-xl font-semibold text-ink-900">Kontakt & Lieferadresse</h1>
            <div className="mt-6 space-y-4">
              <div>
                <Label htmlFor="email" required>
                  E-Mail-Adresse
                </Label>
                <Input id="email" type="email" value={address.email} onChange={(e) => setAddress({ ...address, email: e.target.value })} error={errors.email} autoComplete="email" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="vorname" required>
                    Vorname
                  </Label>
                  <Input id="vorname" value={address.vorname} onChange={(e) => setAddress({ ...address, vorname: e.target.value })} error={errors.vorname} autoComplete="given-name" />
                </div>
                <div>
                  <Label htmlFor="nachname" required>
                    Nachname
                  </Label>
                  <Input id="nachname" value={address.nachname} onChange={(e) => setAddress({ ...address, nachname: e.target.value })} error={errors.nachname} autoComplete="family-name" />
                </div>
              </div>
              <div className="grid grid-cols-[1fr_120px] gap-4">
                <div>
                  <Label htmlFor="strasse" required>
                    Straße
                  </Label>
                  <Input id="strasse" value={address.strasse} onChange={(e) => setAddress({ ...address, strasse: e.target.value })} error={errors.strasse} autoComplete="address-line1" />
                </div>
                <div>
                  <Label htmlFor="hausnummer" required>
                    Nr.
                  </Label>
                  <Input id="hausnummer" value={address.hausnummer} onChange={(e) => setAddress({ ...address, hausnummer: e.target.value })} error={errors.hausnummer} />
                </div>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-4">
                <div>
                  <Label htmlFor="plz" required>
                    PLZ
                  </Label>
                  <Input id="plz" value={address.plz} onChange={(e) => setAddress({ ...address, plz: e.target.value })} error={errors.plz} autoComplete="postal-code" />
                </div>
                <div>
                  <Label htmlFor="ort" required>
                    Ort
                  </Label>
                  <Input id="ort" value={address.ort} onChange={(e) => setAddress({ ...address, ort: e.target.value })} error={errors.ort} autoComplete="address-level2" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="land">Land</Label>
                  <Select id="land" value={address.land} onChange={(e) => setAddress({ ...address, land: e.target.value })}>
                    <option>Deutschland</option>
                    <option>Österreich</option>
                    <option>Schweiz</option>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="telefon">Telefon (optional)</Label>
                  <Input id="telefon" type="tel" value={address.telefon} onChange={(e) => setAddress({ ...address, telefon: e.target.value })} autoComplete="tel" />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'versand' && (
          <div>
            <h1 className="font-display text-xl font-semibold text-ink-900">Versandart</h1>
            <div className="mt-6 space-y-3">
              {(
                [
                  { id: 'standard', label: 'Standardversand', desc: '2–4 Werktage', price: freeShippingRemaining > 0 ? 4.9 : 0 },
                  { id: 'express', label: 'Expressversand', desc: '1 Werktag', price: freeShippingRemaining > 0 ? 9.9 : 5.0 },
                ] as const
              ).map((opt) => (
                <label
                  key={opt.id}
                  className={cn('flex cursor-pointer items-center justify-between rounded-xl border p-4', shippingMethod === opt.id ? 'border-copper-500 bg-copper-50' : 'border-ink-900/15')}
                >
                  <span className="flex items-center gap-3">
                    <input type="radio" name="shipping" checked={shippingMethod === opt.id} onChange={() => setShippingMethod(opt.id)} className="h-4 w-4 text-copper-500 focus:ring-copper-500" />
                    <span>
                      <span className="block text-sm font-semibold text-ink-900">{opt.label}</span>
                      <span className="block text-xs text-ink-500">{opt.desc}</span>
                    </span>
                  </span>
                  <span className="text-sm font-medium text-ink-900">{opt.price === 0 ? 'Kostenlos' : formatPrice(opt.price)}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 'zahlung' && (
          <div>
            <h1 className="font-display text-xl font-semibold text-ink-900">Zahlungsart</h1>
            <div className="mt-6 space-y-3">
              {(
                [
                  { id: 'kreditkarte', label: 'Kredit-/Debitkarte', icon: CreditCard },
                  { id: 'paypal', label: 'PayPal', icon: CreditCard },
                  { id: 'klarna', label: 'Klarna — Rechnung oder Raten', icon: CreditCard },
                  { id: 'sepa', label: 'SEPA-Lastschrift', icon: CreditCard },
                ] as const
              ).map((opt) => (
                <label
                  key={opt.id}
                  className={cn('flex cursor-pointer items-center justify-between rounded-xl border p-4', paymentMethod === opt.id ? 'border-copper-500 bg-copper-50' : 'border-ink-900/15')}
                >
                  <span className="flex items-center gap-3">
                    <input type="radio" name="payment" checked={paymentMethod === opt.id} onChange={() => setPaymentMethod(opt.id)} className="h-4 w-4 text-copper-500 focus:ring-copper-500" />
                    <span className="text-sm font-semibold text-ink-900">{opt.label}</span>
                  </span>
                  <opt.icon size={18} className="text-ink-300" />
                </label>
              ))}
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-ink-400">
              <Lock size={13} /> Die Zahlungsabwicklung erfolgt verschlüsselt über unseren Zahlungsdienstleister und wird an dieser Stelle an das produktive Shopsystem angebunden.
            </p>
          </div>
        )}

        {step === 'uebersicht' && (
          <div>
            <h1 className="font-display text-xl font-semibold text-ink-900">Bestellung prüfen</h1>
            <div className="mt-6 space-y-5 text-sm">
              <div className="rounded-xl border border-ink-900/10 p-4">
                <p className="font-semibold text-ink-900">Lieferadresse</p>
                <p className="mt-1 text-ink-500">
                  {address.vorname} {address.nachname}
                  <br />
                  {address.strasse} {address.hausnummer}
                  <br />
                  {address.plz} {address.ort}, {address.land}
                </p>
              </div>
              <div className="rounded-xl border border-ink-900/10 p-4">
                <p className="font-semibold text-ink-900">Versand</p>
                <p className="mt-1 text-ink-500">{shippingMethod === 'express' ? 'Expressversand (1 Werktag)' : 'Standardversand (2–4 Werktage)'}</p>
              </div>
              <div className="rounded-xl border border-ink-900/10 p-4">
                <p className="font-semibold text-ink-900">Zahlung</p>
                <p className="mt-1 text-ink-500 capitalize">{paymentMethod === 'sepa' ? 'SEPA-Lastschrift' : paymentMethod}</p>
              </div>
              <Checkbox id="agb" label={<>Ich habe die <Link href="/agb" className="underline">AGB</Link> und <Link href="/widerruf" className="underline">Widerrufsbelehrung</Link> gelesen und akzeptiere diese.</>} required />
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between">
          {step !== 'adresse' ? (
            <button type="button" onClick={goBack} className="text-sm font-medium text-ink-500 hover:text-ink-900">
              ← Zurück
            </button>
          ) : (
            <LinkButton href="/warenkorb" variant="ghost" size="sm">
              ← Zum Warenkorb
            </LinkButton>
          )}
          <Button variant="primary" size="lg" onClick={goNext}>
            {step === 'uebersicht' ? 'Zahlungspflichtig bestellen' : 'Weiter'}
          </Button>
        </div>
      </div>

      <aside className="h-fit rounded-2xl border border-ink-900/10 p-6">
        <h2 className="font-display text-lg font-semibold text-ink-900">Ihre Bestellung</h2>
        <ul className="mt-4 space-y-3">
          {cart.map((line) => (
            <li key={line.id} className="flex items-center gap-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-sand-100">
                <Image src={line.image} alt={line.name} fill className="object-cover" />
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-espresso-900 text-[10px] font-bold text-cream-50">{line.quantity}</span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-ink-900">{line.name}</p>
                {line.variantLabel && <p className="text-xs text-ink-400">{line.variantLabel}</p>}
              </div>
              <span className="text-xs font-semibold text-ink-900">{formatPrice(line.price * line.quantity)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-5 space-y-2 border-t border-ink-900/10 pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink-500">Zwischensumme</dt>
            <dd className="font-medium text-ink-900">{formatPrice(cartSubtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="flex items-center gap-1.5 text-ink-500">
              <Truck size={13} /> Versand
            </dt>
            <dd className="font-medium text-ink-900">{shippingCost === 0 ? 'Kostenlos' : formatPrice(shippingCost)}</dd>
          </div>
        </dl>
        <div className="mt-4 flex justify-between border-t border-ink-900/10 pt-4">
          <span className="font-display font-semibold text-ink-900">Gesamtsumme</span>
          <span className="font-display text-lg font-semibold text-ink-900">{formatPrice(total)}</span>
        </div>
      </aside>
    </div>
  );
}
