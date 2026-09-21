import { img, wide } from "./images";
import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "kalinga-vihar-master-suite",
    title: "The Quiet Marble Suite",
    location: "Kalinga Vihar, Bhubaneswar",
    style: "Contemporary",
    category: "Master bathroom",
    year: 2025,
    areaSqft: 78,
    durationDays: 16,
    collection: "prestige",
    summary:
      "A 1990s bathroom with a bathtub nobody used, reworked into a walk-in wet zone and a double vanity.",
    brief:
      "The clients had a 78 sq.ft. bathroom dominated by a cast-iron tub they had used twice in eleven years. Two working adults, one basin, and a permanently damp corner where the old waterproofing had failed.",
    outcome:
      "Removing the tub freed 22 sq.ft., which became a 1200 mm walk-in shower behind a single glass panel. The slab was re-waterproofed and ponding-tested. A 1500 mm twin vanity solved the 8am bottleneck. Vein-matched porcelain runs floor to ceiling, so the room reads taller than it is.",
    beforeImage: wide(img.beforeStrip),
    afterImage: wide(img.heroSuite),
    gallery: [wide(img.heroSuite), wide(img.marbleWhite), wide(img.vanityTwin), wide(img.showerGlass)],
    productSlugs: [
      "calacatta-large-format-porcelain",
      "stone-top-twin-vanity-1500",
      "clearline-walk-in-shower-screen",
      "halo-backlit-led-mirror",
    ],
    tags: ["Marble", "Walk-in shower", "Twin vanity"],
  },
  {
    slug: "patia-compact-rental",
    title: "Eighty Square Feet, Rethought",
    location: "Patia, Bhubaneswar",
    style: "Minimal",
    category: "Compact bathroom",
    year: 2025,
    areaSqft: 34,
    durationDays: 8,
    collection: "aura",
    summary:
      "A 34 sq.ft. rental bathroom turned over in eight days, on a budget that left the owner's yield intact.",
    brief:
      "A landlord with four identical units wanted a repeatable specification: fast, hard-wearing, and good enough to lift the rent without the cost of a bespoke job.",
    outcome:
      "We built one and photographed it, then repeated it three times. Wall-hung everything so the floor mops in one pass, a compact WC at 600 mm projection, and a single accent band of terrazzo at eye level that costs almost nothing and makes the room look considered.",
    beforeImage: wide(img.beforeDated),
    afterImage: wide(img.heroMinimal),
    gallery: [wide(img.heroMinimal), wide(img.tileTerrazzo), wide(img.vanityWhite), wide(img.wcCompact)],
    productSlugs: [
      "compact-floor-mounted-wc",
      "utility-base-vanity-600",
      "terrazzo-pebble-floor-tile",
      "pivot-shower-door-framed",
    ],
    tags: ["Compact", "Rental", "Fast turnaround"],
  },
  {
    slug: "bhagwanpur-villa-spa",
    title: "The Spa at the End of the Hall",
    location: "Bhagwanpur, Bhubaneswar",
    style: "Spa",
    category: "Master suite",
    year: 2024,
    areaSqft: 142,
    durationDays: 26,
    collection: "elite",
    summary:
      "A freestanding stone tub, a steam-capable shower, and a structural check that changed the whole plan.",
    brief:
      "The clients wanted a hotel-spa bathroom in a villa extension: freestanding tub, steam, and a bath that could be used at 6am without waking anyone.",
    outcome:
      "The structural engineer flagged the original tub position over an unsupported span, so we moved it 1.4 m onto the beam line — which, as it turned out, put it under the window. The steam enclosure got a sloped ceiling so condensate runs to the wall rather than onto your head. Pump and generator sit in the adjacent cupboard on isolation mounts.",
    beforeImage: wide(img.beforeBare),
    afterImage: wide(img.heroSpa),
    gallery: [wide(img.heroSpa), wide(img.tubFreestanding), wide(img.showerSteam), wide(img.vanityDark)],
    productSlugs: [
      "solace-freestanding-stone-tub",
      "vapour-residential-steam-generator",
      "cascade-concealed-shower-system",
      "fluted-walnut-vanity-1200",
    ],
    tags: ["Freestanding tub", "Steam", "Structural work"],
  },
  {
    slug: "cuttack-heritage-powder-room",
    title: "Brass, Zellige and a Very Small Room",
    location: "Cuttack",
    style: "Classic",
    category: "Powder room",
    year: 2025,
    areaSqft: 19,
    durationDays: 9,
    collection: "elite",
    summary:
      "Nineteen square feet given unlacquered brass, handmade zellige and permission to be dark.",
    brief:
      "A guest WC in a heritage home. The clients wanted it to feel intentional rather than apologetic — and were open to it being the darkest room in the house.",
    outcome:
      "Small rooms do better dark than pale. Deep green zellige to full height, unlacquered brass that has already begun to patina, and a stone vessel basin on a narrow console. The only light is an arched mirror and one wall sconce, which is enough.",
    beforeImage: wide(img.beforeOld),
    afterImage: wide(img.heroWarm),
    gallery: [wide(img.heroWarm), wide(img.tileSubway), wide(img.basinStone), wide(img.mirrorArch)],
    productSlugs: [
      "zellige-handmade-wall-tile",
      "monolith-stone-vessel-basin",
      "arcadia-arched-brass-mirror",
      "linea-wall-mounted-basin-mixer",
    ],
    tags: ["Powder room", "Zellige", "Brass"],
  },
  {
    slug: "puri-sea-facing-apartment",
    title: "Salt Air, Solved",
    location: "Puri",
    style: "Coastal",
    category: "Guest bathroom",
    year: 2024,
    areaSqft: 56,
    durationDays: 12,
    collection: "prestige",
    summary:
      "A sea-facing flat where the previous fittings had corroded through in four years.",
    brief:
      "Three hundred metres from the water. The original chrome-on-zinc fittings had pitted and the mirror silvering had crept at every edge.",
    outcome:
      "Everything in the water path is forged brass with a PVD finish; everything on the wall is 316 stainless. Copper-free mirror glass, and a trickle vent added to the window so the room dries between uses. Four years on, the finishes are unchanged.",
    beforeImage: wide(img.beforeRaw),
    afterImage: wide(img.heroLight),
    gallery: [wide(img.heroLight), wide(img.tileHex), wide(img.mirrorRound), wide(img.faucetBrass)],
    productSlugs: [
      "meridian-single-lever-basin-mixer",
      "halo-backlit-led-mirror",
      "assist-grab-rail-brushed",
      "arc-under-counter-basin",
    ],
    tags: ["Coastal", "Corrosion resistant", "Ventilation"],
  },
  {
    slug: "jaydev-vihar-family-bath",
    title: "A Bathroom Three Children Can't Destroy",
    location: "Jaydev Vihar, Bhubaneswar",
    style: "Contemporary",
    category: "Family bathroom",
    year: 2025,
    areaSqft: 64,
    durationDays: 11,
    collection: "prestige",
    summary: "R11 floors, a bath at the right height, and grab rails that don't look like grab rails.",
    brief:
      "Three children under nine and a grandparent who visits for months at a time. The brief was, verbatim, 'nobody falls over'.",
    outcome:
      "R11 terrazzo floor throughout — the highest slip rating we stock. A drop-in tub at 420 mm so a child can climb in unaided, thermostatic valves with a 38°C stop everywhere, and two stainless grab rails specified so they read as towel rails. Storage is a tall column, deliberately out of reach at the top.",
    beforeImage: wide(img.beforeWork),
    afterImage: wide(img.heroSoft),
    gallery: [wide(img.heroSoft), wide(img.tileTerrazzo), wide(img.tubRound), wide(img.vanityLinen)],
    productSlugs: [
      "terrazzo-pebble-floor-tile",
      "harbour-drop-in-acrylic-tub",
      "assist-grab-rail-brushed",
      "slim-tall-storage-unit",
    ],
    tags: ["Family", "Universal design", "Slip resistance"],
  },
  {
    slug: "master-canteen-loft",
    title: "The Reeded Glass Loft",
    location: "Master Canteen, Bhubaneswar",
    style: "Industrial",
    category: "Master bathroom",
    year: 2025,
    areaSqft: 88,
    durationDays: 19,
    collection: "elite",
    summary: "One window, one wet zone, and a fluted partition that refused to choose between them.",
    brief:
      "A converted loft with a single tall window and a bathroom layout that would have walled it off behind a shower enclosure.",
    outcome:
      "A reeded glass partition in a slim black grid separates wet from dry while letting the window light the whole room. The shower sits in front of the glass, not behind a wall. Dark tile below, plaster above, and the grid picked up again in the mirror frame.",
    beforeImage: wide(img.beforeStrip),
    afterImage: wide(img.heroLoft),
    gallery: [wide(img.heroLoft), wide(img.heroArch), wide(img.showerStone), wide(img.mirrorSlim)],
    productSlugs: [
      "grid-fluted-glass-partition",
      "halo-matte-black-rain-shower",
      "twin-pill-mirror-set",
      "atelier-oak-floating-vanity-900",
    ],
    tags: ["Reeded glass", "Daylight", "Industrial"],
  },
  {
    slug: "tamando-accessible-bath",
    title: "Ageing in Place, Without the Hospital Look",
    location: "Tamando, Bhubaneswar",
    style: "Universal",
    category: "Accessible bathroom",
    year: 2024,
    areaSqft: 72,
    durationDays: 14,
    collection: "prestige",
    summary: "Level-access, 900mm clear door, and not one component that announces itself as a mobility aid.",
    brief:
      "A couple in their seventies planning to stay in the house. They had seen accessible bathrooms and did not want one.",
    outcome:
      "A level-access wet zone with a linear drain, a 900 mm clear door opening, lever taps throughout, and a wall-hung WC at 480 mm seat height with 150 kg-rated rails either side. The smart seat removed the need to reach. It looks like a good bathroom, which was the whole point.",
    beforeImage: wide(img.beforeDated),
    afterImage: wide(img.heroNiche),
    gallery: [wide(img.heroNiche), wide(img.wcWall), wide(img.showerNiche), wide(img.towelRail)],
    productSlugs: [
      "ridge-wall-hung-rimless-wc",
      "aura-smart-bidet-seat",
      "assist-grab-rail-brushed",
      "sandstone-anti-skid-floor-tile",
    ],
    tags: ["Accessible", "Level access", "Universal design"],
  },
];

const bySlug = new Map(projects.map((p) => [p.slug, p]));

export function getProject(slug: string): Project | undefined {
  return bySlug.get(slug);
}

export const projectStyles = [...new Set(projects.map((p) => p.style))].sort();
export const projectCategories = [...new Set(projects.map((p) => p.category))].sort();
