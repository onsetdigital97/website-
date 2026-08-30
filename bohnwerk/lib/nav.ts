export type NavColumn = { heading: string; links: { label: string; href: string }[] };
export type NavItem = { label: string; href: string; columns?: NavColumn[]; featured?: { title: string; image: string; href: string } };

import { img } from './data/images';

export const mainNav: NavItem[] = [
  {
    label: 'Kaffee',
    href: '/kaffee',
    columns: [
      {
        heading: 'Kategorien',
        links: [
          { label: 'Espresso', href: '/kaffee?kategorie=Espresso' },
          { label: 'Filterkaffee', href: '/kaffee?kategorie=Filterkaffee' },
          { label: 'Single Origin', href: '/kaffee?kategorie=Single+Origin' },
          { label: 'Blends', href: '/kaffee?kategorie=Blends' },
        ],
      },
      {
        heading: 'Mehr entdecken',
        links: [
          { label: 'Entkoffeiniert', href: '/kaffee?kategorie=Entkoffeiniert' },
          { label: 'Probierpakete', href: '/kaffee?kategorie=Probierpakete' },
          { label: 'Limited Editions', href: '/kaffee?kategorie=Limited+Edition' },
          { label: 'Alle Kaffees', href: '/kaffee' },
        ],
      },
    ],
    featured: { title: 'Kaffeeberatung starten', image: img.beansMacro, href: '/#kaffeeberatung' },
  },
  {
    label: 'Espressomaschinen',
    href: '/maschinen',
    columns: [
      {
        heading: 'Maschinen',
        links: [
          { label: 'Alle Espressomaschinen', href: '/maschinen' },
          { label: 'Vollautomaten', href: '/maschinen?kategorie=Espressomaschinen' },
          { label: 'Siebträger', href: '/maschinen?kategorie=Siebträger' },
        ],
      },
    ],
    featured: { title: 'CORVO Automatica entdecken', image: img.espressoMachineDark, href: '/maschinen/corvo-automatica' },
  },
  { label: 'Mühlen', href: '/muehlen' },
  { label: 'Zubehör', href: '/zubehoer' },
  { label: 'Barista-Kurse', href: '/kurse' },
  { label: 'Kaffee-Abo', href: '/abo' },
  { label: 'Magazin', href: '/magazin' },
  { label: 'Über uns', href: '/ueber-uns' },
];

export const footerNav = {
  Kategorien: [
    { label: 'Kaffee', href: '/kaffee' },
    { label: 'Espressomaschinen', href: '/maschinen' },
    { label: 'Mühlen', href: '/muehlen' },
    { label: 'Zubehör', href: '/zubehoer' },
    { label: 'Kaffee-Abo', href: '/abo' },
    { label: 'Barista-Kurse', href: '/kurse' },
  ],
  Kundenservice: [
    { label: 'Kontakt', href: '/kontakt' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Versand & Zahlung', href: '/versand-und-zahlung' },
    { label: 'Rückgabe', href: '/rueckgabe' },
    { label: 'Händlerbereich', href: '/haendlerbereich' },
  ],
  Unternehmen: [
    { label: 'Über uns', href: '/ueber-uns' },
    { label: 'Magazin', href: '/magazin' },
    { label: 'Karriere', href: '/kontakt' },
  ],
  Rechtliches: [
    { label: 'Datenschutz', href: '/datenschutz' },
    { label: 'Impressum', href: '/impressum' },
    { label: 'AGB', href: '/agb' },
    { label: 'Widerrufsbelehrung', href: '/widerruf' },
  ],
};
