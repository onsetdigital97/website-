import { SubscriptionPlan } from '@/lib/types';

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'einsteiger',
    name: 'Einsteiger',
    tagline: 'Ein Paket, regelmäßig geliefert – der einfache Einstieg.',
    packagesPerDelivery: 1,
    discountPercent: 10,
    features: ['1 × 250 g pro Lieferung', 'Freie Sortenwahl', 'Jederzeit pausierbar', '10 % Abo-Vorteil'],
  },
  {
    id: 'entdecker',
    name: 'Entdecker',
    tagline: 'Zwei Sorten pro Lieferung – nie wieder Langeweile in der Tasse.',
    packagesPerDelivery: 2,
    discountPercent: 15,
    features: ['2 × 250 g pro Lieferung', 'Kuratierte Sortenrotation oder freie Wahl', 'Jederzeit pausierbar oder kündbar', '15 % Abo-Vorteil', 'Vorab-Zugang zu Limited Editions'],
    highlighted: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Für Vielgenießer: großzügige Menge und maximaler Vorteil.',
    packagesPerDelivery: 4,
    discountPercent: 20,
    features: ['4 × 250 g pro Lieferung', 'Kuratierte Sortenrotation oder freie Wahl', 'Jederzeit pausierbar oder kündbar', '20 % Abo-Vorteil', 'Vorab-Zugang zu Limited Editions', 'Persönliche Kaffeeberatung'],
  },
];

export const subscriptionIntervals = [
  { id: '2w', label: 'Alle 2 Wochen' },
  { id: '4w', label: 'Alle 4 Wochen' },
  { id: '6w', label: 'Alle 6 Wochen' },
];
