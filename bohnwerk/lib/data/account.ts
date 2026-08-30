import { img } from './images';

export type Address = {
  id: string;
  label: string;
  vorname: string;
  nachname: string;
  strasse: string;
  plz: string;
  ort: string;
  land: string;
  standard: boolean;
};

export type OrderItem = { name: string; image: string; quantity: number; price: number };
export type Order = {
  id: string;
  date: string;
  status: 'In Bearbeitung' | 'Versendet' | 'Zugestellt';
  total: number;
  items: OrderItem[];
  trackingUrl?: string;
};

export const mockAddresses: Address[] = [
  { id: 'addr-1', label: 'Zuhause', vorname: 'Alex', nachname: 'Muster', strasse: 'Speicherstraße 12', plz: '20457', ort: 'Hamburg', land: 'Deutschland', standard: true },
];

export const mockOrders: Order[] = [
  {
    id: 'BW-482913',
    date: '2026-08-04',
    status: 'Zugestellt',
    total: 54.7,
    items: [
      { name: 'Espresso Império', image: img.beansMacro, quantity: 2, price: 14.9 },
      { name: 'Tamper 58 mm Edelstahl', image: img.accessoryFlat, quantity: 1, price: 39.0 },
    ],
  },
  {
    id: 'BW-471820',
    date: '2026-07-11',
    status: 'Versendet',
    total: 16.5,
    items: [{ name: 'Single Origin Yirgacheffe', image: img.beansMacro2, quantity: 1, price: 16.5 }],
    trackingUrl: '#',
  },
];
