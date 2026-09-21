export type Availability = "in-stock" | "made-to-order" | "low-stock" | "pre-order";

export type CategorySlug =
  | "faucets-showers"
  | "sanitaryware"
  | "tiles-flooring"
  | "vanities-storage"
  | "bathtubs-wellness"
  | "mirrors-lighting"
  | "accessories"
  | "glass-partitions";

export type Category = {
  slug: CategorySlug;
  name: string;
  /** Short line used on cards and the category hero. */
  tagline: string;
  description: string;
  image: string;
  icon: string;
  /** Facet keys that matter for this category, in display order. */
  highlights: string[];
};

export type ProductVariant = {
  id: string;
  label: string;
  /** e.g. "600 mm" or "Matte Black" */
  value: string;
  priceDelta?: number;
  availability?: Availability;
};

export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: CategorySlug;
  subCategory: string;
  /** One-sentence hook shown on cards. */
  summary: string;
  description: string;
  images: string[];
  price: number;
  /** Struck-through reference price, when the product is on offer. */
  compareAtPrice?: number;
  /** Price is per unit of this ("piece", "sq.ft.", "set"). */
  unit: string;
  rating: number;
  reviewCount: number;
  availability: Availability;
  finishes: string[];
  styles: string[];
  materials: string[];
  rooms: string[];
  priceTier: "value" | "premium" | "luxury";
  features: string[];
  specs: { label: string; value: string }[];
  variants?: { name: string; options: ProductVariant[] }[];
  warrantyYears: number;
  badges?: string[];
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  createdAt: string;
};

export type Collection = {
  slug: string;
  name: string;
  subtitle: string;
  positioning: string;
  description: string;
  image: string;
  gallery: string[];
  priceFrom: number;
  priceTo: number;
  durationDays: string;
  idealFor: string;
  inclusions: string[];
  upgrades: string[];
  accent: string;
  productSlugs: string[];
};

export type Project = {
  slug: string;
  title: string;
  location: string;
  style: string;
  category: string;
  year: number;
  areaSqft: number;
  durationDays: number;
  collection?: string;
  summary: string;
  brief: string;
  outcome: string;
  beforeImage: string;
  afterImage: string;
  gallery: string[];
  productSlugs: string[];
  tags: string[];
};

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  rating: number;
  quote: string;
  project?: string;
  date: string;
};

export type Faq = {
  id: string;
  topic: string;
  question: string;
  answer: string;
};

export type Showroom = {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  hours: string;
  image: string;
  services: string[];
  mapQuery: string;
  isFlagship?: boolean;
};
