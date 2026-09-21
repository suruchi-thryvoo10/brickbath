export const site = {
  name: "Brick & Bath",
  legalName: "Brick & Bath Interiors Pvt. Ltd.",
  tagline: "Bathrooms, beautifully engineered.",
  description:
    "Premium bathroom products and end-to-end renovation across India. Explore faucets, sanitaryware, tiles, vanities and wellness — or hand the whole bathroom to our design and build team.",
  url: "https://www.brickandbath.example",
  locale: "en_IN",
  phoneDisplay: "1800 212 0151",
  phone: "+9118002120151",
  salesPhoneDisplay: "+91 97777 72782",
  salesPhone: "+919777772782",
  whatsapp: "917205889111",
  email: "hello@brickandbath.in",
  address: {
    street: "Plot 769, Kalinga Vihar",
    city: "Bhubaneswar",
    state: "Odisha",
    zip: "751019",
    country: "IN",
  },
  hours: "Mon – Sat, 9:30am – 7:30pm IST",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    linkedin: "https://linkedin.com",
  },
} as const;

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export const primaryNav: NavLink[] = [
  { label: "Products", href: "/products", description: "The full catalogue" },
  { label: "Categories", href: "/categories", description: "Shop by room element" },
  { label: "Collections", href: "/collections", description: "Curated renovation packages" },
  { label: "Projects", href: "/projects", description: "Completed transformations" },
  { label: "About", href: "/about", description: "How we work" },
  { label: "Contact", href: "/contact", description: "Talk to a designer" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "All products", href: "/products" },
      { label: "Categories", href: "/categories" },
      { label: "Collections", href: "/collections" },
      { label: "Product finder", href: "/finder" },
      { label: "Compare", href: "/compare" },
      { label: "Wishlist", href: "/wishlist" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Showrooms", href: "/showrooms" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Request a quote", href: "/quote" },
      { label: "Track an enquiry", href: "/enquiries" },
      { label: "Warranty & care", href: "/faq#warranty" },
      { label: "Delivery & returns", href: "/faq#delivery" },
      { label: "Become a dealer", href: "/contact?topic=dealer" },
    ],
  },
];

export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
