import { img, photo } from "./images";
import type { Category, CategorySlug } from "./types";

export const categories: Category[] = [
  {
    slug: "faucets-showers",
    name: "Faucets & Showers",
    tagline: "Water, shaped well",
    description:
      "Mixers, rain heads, concealed diverters and body jets engineered for Indian water pressure — with ceramic cartridges rated for a million cycles and finishes that survive hard water.",
    image: photo(img.faucetBrass, 1200, 1500),
    icon: "droplet",
    highlights: ["Finish", "Mounting", "Flow rate", "Cartridge"],
  },
  {
    slug: "sanitaryware",
    name: "Sanitaryware",
    tagline: "Quietly engineered",
    description:
      "Wall-hung and floor-mounted WCs, concealed cisterns, basins and smart seats. Rimless flushing, soft-close everything, and glaze that stays white in year ten.",
    image: photo(img.wcWall, 1200, 1500),
    icon: "shell",
    highlights: ["Mounting", "Flush type", "Rough-in", "Seat"],
  },
  {
    slug: "tiles-flooring",
    name: "Tiles & Flooring",
    tagline: "Surface, first",
    description:
      "Large-format porcelain, natural stone, terrazzo and handmade zellige. Slip ratings you can trust on a wet floor and calibrated edges that make grout lines disappear.",
    image: photo(img.tileGeo, 1200, 1500),
    icon: "grid",
    highlights: ["Size", "Finish", "Slip rating", "Application"],
  },
  {
    slug: "vanities-storage",
    name: "Vanities & Storage",
    tagline: "Everything has a home",
    description:
      "Wall-hung vanities in marine ply and solid oak, soft-close drawers with cutlery-grade organisers, and tall units sized for Indian bathroom widths.",
    image: photo(img.vanityOak, 1200, 1500),
    icon: "cabinet",
    highlights: ["Width", "Material", "Basin type", "Storage"],
  },
  {
    slug: "bathtubs-wellness",
    name: "Bathtubs & Wellness",
    tagline: "The long soak",
    description:
      "Freestanding stone-composite tubs, drop-ins, whirlpool systems and steam generators — specified with the structural and drainage notes your contractor actually needs.",
    image: photo(img.tubFreestanding, 1200, 1500),
    icon: "waves",
    highlights: ["Length", "Material", "Capacity", "Installation"],
  },
  {
    slug: "mirrors-lighting",
    name: "Mirrors & Lighting",
    tagline: "Light that flatters",
    description:
      "Backlit and front-lit mirrors at CRI 90+, anti-fog heating pads, and IP-rated vanity lighting chosen so skin tones read true at 7am.",
    image: photo(img.mirrorLit, 1200, 1500),
    icon: "sun",
    highlights: ["Shape", "Lighting", "IP rating", "Size"],
  },
  {
    slug: "accessories",
    name: "Accessories & Textiles",
    tagline: "The last ten percent",
    description:
      "Towel rails, robe hooks, grab bars, paper holders and long-staple cotton textiles — matched to your faucet finish so nothing in the room clashes.",
    image: photo(img.towelStack, 1200, 1500),
    icon: "hook",
    highlights: ["Finish", "Mounting", "Set size", "Material"],
  },
  {
    slug: "glass-partitions",
    name: "Glass & Partitions",
    tagline: "Dry side, wet side",
    description:
      "Toughened 8mm and 10mm shower enclosures, walk-in screens and sliding systems with nano-coated glass that sheds water instead of staining.",
    image: photo(img.showerGlass, 1200, 1500),
    icon: "panel",
    highlights: ["Type", "Glass", "Opening", "Hardware"],
  },
];

const bySlug = new Map<string, Category>(categories.map((c) => [c.slug, c]));

export function getCategory(slug: string): Category | undefined {
  return bySlug.get(slug);
}

export function categoryName(slug: CategorySlug): string {
  return bySlug.get(slug)?.name ?? slug;
}
