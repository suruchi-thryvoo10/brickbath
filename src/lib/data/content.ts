import { img, photo } from "./images";
import type { Faq, Showroom, Testimonial } from "./types";

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Rajesh Sharma",
    location: "Bhubaneswar",
    rating: 5,
    quote:
      "They talked us out of the more expensive tile because it would have looked wrong in a north-facing room. That one conversation told me everything about how they work.",
    project: "kalinga-vihar-master-suite",
    date: "2025-06-14",
  },
  {
    id: "t2",
    name: "Sneha Mishra",
    location: "Bhubaneswar",
    rating: 5,
    quote:
      "Sixteen days quoted, sixteen days delivered, and a photo update in my inbox every evening. I have renovated three times before and never had that.",
    project: "jaydev-vihar-family-bath",
    date: "2025-04-29",
  },
  {
    id: "t3",
    name: "Amit Kumar",
    location: "Puri",
    rating: 5,
    quote:
      "We are three hundred metres from the sea and everything we had installed before had rusted out in four years. Four years on from this one, nothing has moved.",
    project: "puri-sea-facing-apartment",
    date: "2024-11-02",
  },
  {
    id: "t4",
    name: "Priya Das",
    location: "Cuttack",
    rating: 5,
    quote:
      "The quote listed the waterproofing membrane by name and thickness. Nobody else we spoke to would even put it in writing.",
    project: "cuttack-heritage-powder-room",
    date: "2025-07-21",
  },
  {
    id: "t5",
    name: "Sanjay Patel",
    location: "Cuttack",
    rating: 4,
    quote:
      "The stone vanity ran two weeks late because the slab we picked cracked at the fabricator. They told us the same day and showed us three alternatives. Ended up with a better one.",
    project: "bhagwanpur-villa-spa",
    date: "2025-02-08",
  },
  {
    id: "t6",
    name: "Meera Nayak",
    location: "Bhubaneswar",
    rating: 5,
    quote:
      "My father is eighty-one and refused anything that looked like a hospital. He has not mentioned the grab rails once, which I think means they got it exactly right.",
    project: "tamando-accessible-bath",
    date: "2024-09-17",
  },
];

export const faqs: Faq[] = [
  {
    id: "what-you-do",
    topic: "Getting started",
    question: "Do you sell products, or do you do the renovation too?",
    answer:
      "Both, and you can take either on its own. Plenty of clients buy tile and fittings from us and use their own contractor. Plenty hand us the whole bathroom. If you are doing a full renovation with us, product is supplied at project pricing rather than retail.",
  },
  {
    id: "quote-speed",
    topic: "Getting started",
    question: "How quickly can I get a price?",
    answer:
      "An indicative range within one working day from photos and rough dimensions. A firm, itemised quote needs a site visit — usually within three working days of your enquiry, and free within our service cities.",
  },
  {
    id: "cost",
    topic: "Pricing",
    question: "What does a bathroom renovation actually cost?",
    answer:
      "Our packages start at ₹1.45 lakh for a compact bathroom taken back to slab and rebuilt, and most primary bathrooms land between ₹2.8 and ₹4.25 lakh. Past ₹5 lakh you are into custom joinery, natural stone and wellness systems. Size matters less than specification: an 80 sq.ft. bathroom and a 40 sq.ft. bathroom with the same fittings differ by far less than you would expect.",
  },
  {
    id: "hidden-costs",
    topic: "Pricing",
    question: "What is not included in the quoted price?",
    answer:
      "Three things, and we call them out before you sign. Structural work, if the engineer flags it. Relocating a soil stack, which is occasionally impossible and always expensive. And electrical work beyond the bathroom's own circuit. Everything else — including debris removal and society deposits in most buildings — is in the number you are quoted.",
  },
  {
    id: "duration",
    topic: "Process",
    question: "How long will my bathroom be out of use?",
    answer:
      "Seven to ten days for an Aura package, twelve to sixteen for Prestige, eighteen to twenty-four for Elite. Those are working days and they assume the flat is accessible six days a week. Waterproofing curing is three of those days and cannot be compressed — anyone who offers to is cutting it.",
  },
  {
    id: "waterproofing",
    topic: "Process",
    question: "What waterproofing do you use, and how do I know it worked?",
    answer:
      "Two coats of polyurethane membrane at 1.2 mm dry film thickness, taken 300 mm up every wall and 1800 mm in the shower zone. We then flood the floor and leave it for 24 hours with a marked water level, and we photograph the result at the start and the end. That ponding test is in every project report.",
  },
  {
    id: "live-in",
    topic: "Process",
    question: "Can we stay in the house during the work?",
    answer:
      "Yes, in almost every case. We seal the doorway with a zip barrier, run an extractor, and lay protection on every route between the bathroom and the lift. Demolition day is loud — if you work from home, plan to be out for that one.",
  },
  {
    id: "warranty",
    topic: "Warranty",
    question: "What is covered, and for how long?",
    answer:
      "Ten years on waterproofing and workmanship. Product warranties run separately and range from one year on textiles to fifteen on sanitaryware; each is listed on its product page and in your handover file. Warranty is registered against the address, so it survives a sale.",
  },
  {
    id: "delivery",
    topic: "Delivery",
    question: "Where do you deliver, and what does it cost?",
    answer:
      "Free delivery across Bhubaneswar, Cuttack and Puri on orders over ₹5,000. Elsewhere in Odisha, ₹850 flat. Pan-India delivery is quoted per order because tile and sanitaryware are heavy and fragile — expect five to nine working days.",
  },
  {
    id: "returns",
    topic: "Delivery",
    question: "Can I return something?",
    answer:
      "Seven days from delivery, unused and in original packaging, for a full refund. Made-to-order items — cut stone, custom joinery, made-to-measure glass — cannot be returned, and we flag that clearly before you confirm. Anything that arrives damaged is replaced at our cost, no argument.",
  },
  {
    id: "own-products",
    topic: "Products",
    question: "Can I supply my own fittings?",
    answer:
      "Yes. We will install client-supplied product and reduce the quote accordingly. Two conditions: it has to be on site before first fix, and we cannot warranty a product we did not supply — though our workmanship warranty still covers the installation.",
  },
  {
    id: "hard-water",
    topic: "Products",
    question: "Will these finishes survive hard water?",
    answer:
      "PVD finishes will; electroplated ones will not, which is why we do not stock them. Matte black and brushed brass both hide water spotting better than polished chrome. If your TDS is above 500 ppm we will recommend a point-of-entry softener before we recommend a finish.",
  },
  {
    id: "cities",
    topic: "Coverage",
    question: "Which cities do you work in?",
    answer:
      "Full design-and-build across Bhubaneswar, Cuttack and Puri, with site visits included. We take selected projects elsewhere in Odisha and in Kolkata and Visakhapatnam. Product ships nationwide.",
  },
  {
    id: "dealer",
    topic: "Coverage",
    question: "Do you take on dealers or trade accounts?",
    answer:
      "Yes — architects, contractors and retailers. Trade accounts get volume pricing, specification support and access to sample boards. Get in touch through the contact form and pick 'Dealer enquiry'.",
  },
];

export const faqTopics = [...new Set(faqs.map((f) => f.topic))];

export const showrooms: Showroom[] = [
  {
    id: "kalinga-vihar",
    name: "Brick & Bath Flagship",
    city: "Bhubaneswar",
    state: "Odisha",
    address: "Plot 769, Kalinga Vihar, Kalinga Nagar, Bhubaneswar 751019",
    phone: "+91 97777 72782",
    hours: "Mon – Sat, 10:00am – 8:00pm",
    image: photo(img.heroGallery, 1200, 800),
    services: ["Full display bathrooms", "Material library", "Design consultation", "Live water pressure rig"],
    mapQuery: "Kalinga Vihar, Bhubaneswar, Odisha 751019",
    isFlagship: true,
  },
  {
    id: "bhagwanpur",
    name: "Bhagwanpur Display House",
    city: "Bhubaneswar",
    state: "Odisha",
    address: "Plot 051/1587, Bhagwanpur Industrial Estate, Tamando, Bhubaneswar 751019",
    phone: "+91 97777 72783",
    hours: "Mon – Sat, 10:00am – 7:00pm",
    image: photo(img.heroStudio, 1200, 800),
    services: ["Display bathrooms", "Tile gallery", "Trade counter"],
    mapQuery: "Bhagwanpur Industrial Estate, Tamando, Bhubaneswar",
  },
  {
    id: "jaydev-vihar",
    name: "Jaydev Vihar Studio",
    city: "Bhubaneswar",
    state: "Odisha",
    address: "1st Floor, Janpath, Jaydev Vihar, Bhubaneswar 751013",
    phone: "+91 97777 72784",
    hours: "Mon – Sat, 10:30am – 7:30pm",
    image: photo(img.heroStone, 1200, 800),
    services: ["Design consultation", "Sample boards", "3D visualisation"],
    mapQuery: "Jaydev Vihar, Bhubaneswar, Odisha 751013",
  },
  {
    id: "cuttack",
    name: "Cuttack Experience Centre",
    city: "Cuttack",
    state: "Odisha",
    address: "Ring Road, Badambadi, Cuttack 753012",
    phone: "+91 97777 72785",
    hours: "Mon – Sat, 10:00am – 7:30pm",
    image: photo(img.heroCalm, 1200, 800),
    services: ["Display bathrooms", "Material library", "Design consultation"],
    mapQuery: "Badambadi, Cuttack, Odisha 753012",
  },
  {
    id: "puri",
    name: "Puri Coastal Studio",
    city: "Puri",
    state: "Odisha",
    address: "VIP Road, Near Sea Beach, Puri 752002",
    phone: "+91 97777 72786",
    hours: "Tue – Sun, 10:00am – 7:00pm",
    image: photo(img.heroLight, 1200, 800),
    services: ["Design consultation", "Corrosion-resistant range", "Sample boards"],
    mapQuery: "VIP Road, Puri, Odisha 752002",
  },
];

export const showroomCities = [...new Set(showrooms.map((s) => s.city))].sort();

export const processSteps = [
  {
    step: "01",
    title: "Tell us the room",
    duration: "Day 0",
    body: "Photos, rough dimensions and what irritates you about the bathroom you have. You get an indicative range back within a working day — a real number, not a call-us-to-find-out.",
    image: photo(img.craftPlan, 900, 1100),
  },
  {
    step: "02",
    title: "Site visit and survey",
    duration: "Day 1 – 3",
    body: "We measure, check the plumbing stack, test water pressure and look at where the waterproofing failed last time. Free in our service cities. You get a written condition note whether or not you proceed.",
    image: photo(img.craftMeasure, 900, 1100),
  },
  {
    step: "03",
    title: "Design and firm quote",
    duration: "Day 4 – 8",
    body: "A layout, a 3D visualisation and an itemised quote with membrane thickness, tile SKU and fitting model all named. Two revision rounds are included. Nothing starts until you have signed it.",
    image: photo(img.craftPlan, 900, 1100),
  },
  {
    step: "04",
    title: "Build",
    duration: "7 – 24 days",
    body: "One site manager, one WhatsApp thread, one photo update every evening. Demolition, waterproofing with a 24-hour ponding test, tiling, first and second fix, finishing.",
    image: photo(img.craftTile, 900, 1100),
  },
  {
    step: "05",
    title: "Snag and hand over",
    duration: "Final day",
    body: "We walk the room with you and write the snag list ourselves — it is usually longer than yours. Everything closed before we invoice the balance. You get a handover file with every warranty and the ponding-test photos.",
    image: photo(img.craftFinish, 900, 1100),
  },
];

export const trustStats = [
  { value: "1,400+", label: "Bathrooms delivered" },
  { value: "10 yr", label: "Workmanship warranty" },
  { value: "4.8 / 5", label: "Average rating, 620 reviews" },
  { value: "94%", label: "Handed over on the quoted date" },
];

export const partnerBrands = [
  "Jaquar",
  "Kohler",
  "Grohe",
  "Duravit",
  "Hansgrohe",
  "Roca",
  "Toto",
  "Hindware",
  "Cera",
  "Somany",
];
