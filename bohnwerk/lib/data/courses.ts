import { Course } from '@/lib/types';
import { img } from './images';

export const courses: Course[] = [
  {
    id: 'k-espresso-basics',
    slug: 'espresso-grundlagen',
    title: 'Espresso Grundlagen',
    image: img.courseHands,
    durationHours: 3,
    level: 'Einsteiger',
    location: 'Bohnwerk Rösterei, Hamburg',
    price: 89,
    description: 'Der perfekte Einstieg: Mahlgrad, Dosierung, Tampen und Extraktionszeit – Sie lernen die Grundlagen für gleichbleibend guten Espresso zu Hause.',
    includes: ['3 Stunden praktisches Training', 'Kleingruppe (max. 6 Personen)', 'Alle Kaffees & Materialien inklusive', 'Skript zum Nachlesen', 'Rabattgutschein für Ihren nächsten Einkauf'],
    dates: [
      { id: 'd1', date: '2026-09-13', time: '10:00–13:00', seatsTotal: 6, seatsBooked: 4 },
      { id: 'd2', date: '2026-09-27', time: '14:00–17:00', seatsTotal: 6, seatsBooked: 6 },
      { id: 'd3', date: '2026-10-11', time: '10:00–13:00', seatsTotal: 6, seatsBooked: 2 },
    ],
  },
  {
    id: 'k-latte-art',
    slug: 'latte-art-workshop',
    title: 'Latte Art Workshop',
    image: img.latteArt,
    durationHours: 3,
    level: 'Fortgeschritten',
    location: 'Bohnwerk Rösterei, Hamburg',
    price: 109,
    description: 'Von Herz bis Rosetta: Wir vertiefen Milchtextur und Eingießtechnik für makellose Latte Art.',
    includes: ['3 Stunden praktisches Training', 'Kleingruppe (max. 6 Personen)', 'Milch, Kaffee & Materialien inklusive', 'Übungsvideo im Anschluss', '10 % Rabatt auf Milchkännchen'],
    dates: [
      { id: 'd1', date: '2026-09-20', time: '10:00–13:00', seatsTotal: 6, seatsBooked: 3 },
      { id: 'd2', date: '2026-10-04', time: '14:00–17:00', seatsTotal: 6, seatsBooked: 5 },
    ],
  },
  {
    id: 'k-brewing',
    slug: 'filterkaffee-brewing-masterclass',
    title: 'Filterkaffee Brewing Masterclass',
    image: img.pourOver,
    durationHours: 2.5,
    level: 'Einsteiger',
    location: 'Bohnwerk Rösterei, Hamburg',
    price: 79,
    description: 'V60, Chemex und AeroPress im Vergleich: Sie lernen, wie Mahlgrad, Wassertemperatur und Brühzeit den Geschmack bestimmen.',
    includes: ['2,5 Stunden praktisches Training', 'Kleingruppe (max. 8 Personen)', 'Verkostung von 5 Single Origins', 'Rezeptkarten zum Mitnehmen'],
    dates: [
      { id: 'd1', date: '2026-09-06', time: '11:00–13:30', seatsTotal: 8, seatsBooked: 7 },
      { id: 'd2', date: '2026-10-18', time: '11:00–13:30', seatsTotal: 8, seatsBooked: 1 },
    ],
  },
  {
    id: 'k-profi',
    slug: 'barista-profi-zertifikat',
    title: 'Barista Profi-Zertifikat',
    image: img.baristaCounter,
    durationHours: 8,
    level: 'Profi',
    location: 'Bohnwerk Rösterei, Hamburg',
    price: 249,
    description: 'Eintägiges Intensivtraining für angehende Baristi: Extraktionstheorie, Milchtechnik, Maschinenpflege und Prüfung mit Zertifikat.',
    includes: ['8 Stunden Intensivtraining', 'Kleingruppe (max. 4 Personen)', 'Mittagessen inklusive', 'Bohnwerk Profi-Zertifikat', 'Exklusiver Rabatt auf Siebträgermaschinen'],
    dates: [
      { id: 'd1', date: '2026-10-24', time: '09:00–17:00', seatsTotal: 4, seatsBooked: 2 },
      { id: 'd2', date: '2026-11-14', time: '09:00–17:00', seatsTotal: 4, seatsBooked: 0 },
    ],
  },
];

export function getCourseBySlug(slug: string) {
  return courses.find((c) => c.slug === slug);
}
