export type FlavorProfile = {
  saeure: number; // Säure/acidity 1-5
  koerper: number; // body 1-5
  suesse: number; // sweetness 1-5
  intensitaet: number; // intensity 1-5
  roestgrad: number; // roast level 1-5
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  text: string;
  verified: boolean;
};

export type Variant = {
  id: string;
  label: string;
  priceModifier: number;
  inStock: boolean;
};

export type CoffeeProduct = {
  id: string;
  slug: string;
  type: 'coffee';
  category: 'Espresso' | 'Filterkaffee' | 'Single Origin' | 'Blends' | 'Entkoffeiniert' | 'Probierpakete' | 'Limited Edition';
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  pricePerKg: number;
  images: string[];
  badges?: string[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
  roast: 1 | 2 | 3 | 4 | 5;
  intensity: 1 | 2 | 3 | 4 | 5;
  origin: string;
  region: string;
  altitude: string;
  variety: string;
  processing: string;
  flavorNotes: string[];
  brewMethods: string[];
  profile: FlavorProfile;
  grindOptions: Variant[];
  sizeOptions: Variant[];
  subscribable: boolean;
  inStock: boolean;
  leadTime: string;
  relatedIds: string[];
  accessoryIds: string[];
};

export type MachineProduct = {
  id: string;
  slug: string;
  type: 'machine';
  category: 'Espressomaschinen' | 'Siebträger' | 'Mühlen';
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  badges?: string[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
  colors: Variant[];
  specs: { label: string; value: string }[];
  hotspots: { id: string; x: number; y: number; title: string; text: string }[];
  boxContents: string[];
  inStock: boolean;
  leadTime: string;
  financingHint: string;
  relatedIds: string[];
  accessoryIds: string[];
  recommendedCoffeeIds: string[];
};

export type AccessoryProduct = {
  id: string;
  slug: string;
  type: 'accessory';
  category: 'Zubehör';
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  badges?: string[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
  inStock: boolean;
  leadTime: string;
  relatedIds: string[];
};

export type Product = CoffeeProduct | MachineProduct | AccessoryProduct;

export type Course = {
  id: string;
  slug: string;
  title: string;
  image: string;
  durationHours: number;
  level: 'Einsteiger' | 'Fortgeschritten' | 'Profi';
  location: string;
  price: number;
  description: string;
  includes: string[];
  dates: { id: string; date: string; time: string; seatsTotal: number; seatsBooked: number }[];
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readMinutes: number;
  date: string;
  content: string[];
  relatedProductIds: string[];
};

export type SubscriptionPlan = {
  id: 'einsteiger' | 'entdecker' | 'premium';
  name: string;
  tagline: string;
  packagesPerDelivery: number;
  discountPercent: number;
  features: string[];
  highlighted?: boolean;
};

export type CartLine = {
  id: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variantLabel?: string;
  isSubscription?: boolean;
  interval?: string;
};
