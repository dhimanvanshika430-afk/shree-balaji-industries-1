// ─────────────────────────────────────────────────────────────────────────────
// Shree Balaji Industries — all site content lives here.
// Swap any photo by changing its URL (or point to a file in /public/images).
// Nothing in this file is a claim we cannot stand behind: no client names,
// project counts, awards, years or certifications. Add real ones when ready.
// ─────────────────────────────────────────────────────────────────────────────

/** Unsplash photo id → full URL at a given width (keeps aspect ratio, sharp). */
const u = (id: string, w = 2400, q = 80) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=max&w=${w}&q=${q}`;
/** Re-size any Unsplash URL from IMG to another width. */
export const img = (url: string, w: number) => url.replace(/w=\d+/, `w=${w}`);

export const IMG = {
  kitchen: u("1607582544956-a874e6740135"),  // modular kitchen, wood cabinetry
  wardrobe: u("1718939045285-b67f9e9f9f8b"), // wardrobe / closet
  cupboard: u("1658867839109-bf3e2af75cc2"), // built-in storage / shelving
  door: u("1530982937671-bc00141b5d79"),     // wooden door
  chowkhat: u("1768321914688-86ff62032d47"), // timber door/window framing
  woodwork: u("1631396327810-0299385c06bf"), // carpenter at work in the workshop
};

/** Real project photography, supplied directly — served from /public. */
export const PROJECT = {
  loungeCeiling: "/images/collection/lounge-ceiling.jpg", // circular cove-lit ceiling, lounge seating
  woodSlatWall: "/images/collection/wood-slat-wall.jpg",  // timber slat partition + communal table
  cafeSeating: "/images/collection/cafe-seating.jpg",     // wall-mounted wood booths, hanging swing
  diningHall: "/images/collection/dining-hall.jpg",       // dining hall with buffet counter
  bedroom: "/images/collection/bedroom.jpg",              // bedroom interior
  bathBedroom: "/images/collection/bath-bedroom.jpg",     // marble bath opening into bedroom
  livingRoom: "/images/collection/living-room.jpg",       // living room with panelling
  // Introduction section — the two framed photos
  coworkingReception: "/images/collection/coworking-reception.jpg", // hexagon wood partition, reception
  coworkingBreakout: "/images/collection/coworking-breakout.jpg",   // high table breakout area
  // Selected Work — four categories
  kitchenGalley: "/images/collection/kitchen-galley.jpg",   // galley kitchen, cream cabinets
  wardrobeCloset: "/images/collection/wardrobe-closet.jpg", // open wardrobe, hanging clothes
  doorEntrance: "/images/collection/door-entrance.jpg",     // carved wood entrance door
  vanityBath: "/images/collection/vanity-bath.jpg",         // black marble bath vanity
  // Before/After — before
  emptyRoomBefore: "/images/collection/empty-room-before.jpg", // bare room, before any interior work
  // About page — service story photos
  kitchenModular: "/images/collection/kitchen-modular.jpg",   // modular kitchen
  cupboardDisplay: "/images/collection/cupboard-display.jpg", // wardrobe with glass display cabinet
  doorGoyal: "/images/collection/door-goyal.jpg",              // carved entrance door
  // About page — Our Craft mosaic
  craftCoworkingDining: "/images/collection/craft-coworking-dining.jpg", // breakout dining area
  craftPinkBedroom: "/images/collection/craft-pink-bedroom.jpg",         // bedroom fit-out
  craftDiningRoom: "/images/collection/craft-dining-room.jpg",           // formal dining room
  craftPoolRoom: "/images/collection/craft-pool-room.jpg",               // breakout room with pool table
  // Contact page
  contactCanteen: "/images/collection/contact-canteen.jpg",              // canteen counter fit-out
  // About page — Kitchen / Storage / Doors experience sections
  expKitchenDrawers: "/images/collection/exp-kitchen-drawers.jpg",   // open drawers, cookware
  expWardrobeBedroom: "/images/collection/exp-wardrobe-bedroom.jpg", // wardrobe wall in a bedroom
  expDoorPivot: "/images/collection/exp-door-pivot.jpg",             // bronze pivot door
  // About page — cinematic hero triptych
  heroWardrobeVideo: "/images/collection/hero-wardrobe-video.jpg", // wardrobe showcase
  heroVanityDresser: "/images/collection/hero-vanity-dresser.jpg", // lit vanity dresser
  heroKitchen: "/images/collection/kitchen-blue-modular.jpg",       // blue modular kitchen (Modular Kitchens block)
  heroAbout: "/images/collection/hero-bathroom-vanity-new.jpg",     // about hero — walnut & cream bath vanity
  heroBathVanity: "/images/collection/hero-bath-vanity.jpg",       // walnut bath vanity
  // About page — final statement background
  finalBathDouble: "/images/collection/final-bath-double.jpg", // double-mirror bath vanity
};

export const company = {
  name: "SHREE BALAJI INDUSTRIES",
  chairman: "Bidhi Chand",
  director: "Sanjeev Kumar",
  email: "sales.shreebalajiindustries@gmail.com",
  instagram: "shreebalajiindustries3",
  address: {
    line1: "Vill. Burj Kotian, Near Chandi Mandir",
    line2: "Panchkula, Haryana — 134107",
  },
  contacts: [
    { name: "Sanjeev Kumar", role: "Director", phone: "+91 93561 33377" },
    { name: "Mayank Dhiman", role: "Client Relations", phone: "+91 77196 50621" },
  ],
};

// Header: HOME | ABOUT US | CONTACT US  + INQUIRE (goes to the Contact page form)
export const nav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];
export const INQUIRY_HREF = "/contact#inquiry";

export const services = [
  "Modular Kitchens",
  "Modular Cupboards",
  "Wardrobes",
  "Doors & Chowkhats",
];

// ── Home: cinematic entry ────────────────────────────────────────────────────
export const hero = {
  // Real photographs, shown as a slow crossfading slideshow (a few seconds each).
  images: ["/images/hero/hero-1.jpg", "/images/hero/hero-2.jpg", "/images/hero/hero-4.jpg"],
  slideSeconds: 5,
  // Optional film loop, used instead of the slideshow if set. Put a file in
  // /public/videos and set e.g. "/videos/hero.mp4".
  video: "",
  eyebrow: "Shree Balaji Industries · Panchkula",
  title: ["Interiors built", "around the way", "you live."],
  text: "Modular kitchens, cupboards, wardrobes, doors and chowkhats — designed, crafted and installed with attention to every detail.",
  lines: ["Modular Kitchens", "Cupboards & Wardrobes", "Doors & Chowkhats"],
};

// ── Home: 3D numerals (no business statistics — these describe how we work) ──
export const numerals = [
  { kind: "count", to: 4, pad: 2, label: "Product lines", note: "Kitchens · Cupboards & Wardrobes · Doors · Chowkhats" },
  { kind: "count", to: 5, pad: 2, label: "Stages", note: "Understand, Design, Craft, Detail, Install" },
  { kind: "ratio", to: 1, pad: 1, label: "Scale", note: "Every piece is drawn and built to your site's own dimensions" },
] as const;

// ── Home: introduction ───────────────────────────────────────────────────────
export const intro = {
  eyebrow: "Introduction",
  title: "We design, manufacture and install the woodwork that completes a home.",
  text: "Shree Balaji Industries makes modular kitchens, modular cupboards and wardrobes, doors and chowkhats from Panchkula. Each piece begins with a site measurement and ends with a careful installation.",
  lines: ["Modular Kitchens", "Modular Cupboards & Wardrobes", "Doors & Chowkhats"],
};

// ── Home: horizontal 3D showcase ─────────────────────────────────────────────
export const showcase = [
  { index: "01", title: "Lounge & Breakout Seating", note: "A circular cove-lit ceiling over soft seating and a communal table.", image: PROJECT.loungeCeiling },
  { index: "02", title: "Timber Slat Partitions", note: "Wood-slat screens and a solid-timber table, built and installed on site.", image: PROJECT.woodSlatWall },
  { index: "03", title: "Café & Booth Seating", note: "Wall-mounted wood booths, a hanging swing seat, warm cove lighting.", image: PROJECT.cafeSeating },
  { index: "04", title: "Dining Halls", note: "Full-service dining spaces with a stainless steel buffet counter.", image: PROJECT.diningHall },
  { index: "05", title: "Bath & Bedroom Fit-Outs", note: "Marble bathroom finishes opening straight into a furnished bedroom.", image: PROJECT.bathBedroom },
];

// ── Home: Our Craft ──────────────────────────────────────────────────────────
// ── Home: site measurement drawing — edit numbers here, drawing updates ─────
export const planValues: Record<string, string> = {
  kitchenW: "4400",
  wardrobeW: "3600",
  overallW: "8000",
  depth: "4200",
  counterRun: "3460",
  wardrobeRun: "3160",
  kitchenNote: "L-shaped modular run",
  wardrobeNote: "Sliding-door wardrobe",
};
export const planStages = [
  { at: 0.0, label: "Grid & datum" },
  { at: 0.12, label: "Walls & openings" },
  { at: 0.3, label: "Partitions, door & chowkhat" },
  { at: 0.42, label: "Kitchen, cupboard & wardrobe layout" },
  { at: 0.62, label: "Dimensions & section" },
  { at: 0.86, label: "Labels & notes" },
];

// ── Home: Selected Work (four categories, big photographs) ───────────────────
export const categories = [
  { index: "01", title: "Kitchens", note: "Modular kitchens planned around how you cook, finished to last.", image: PROJECT.kitchenGalley, pos: "50% 40%" },
  { index: "02", title: "Wardrobes", note: "Storage that opens, slides and organises — built to your room.", image: PROJECT.wardrobeCloset, pos: "50% 45%" },
  { index: "03", title: "Doors & Chowkhats", note: "Solid doors hung in frames made for them.", image: PROJECT.doorEntrance, pos: "50% 35%" },
  { index: "04", title: "Vanity", note: "Bath vanities finished in marble and solid wood.", image: PROJECT.vanityBath, pos: "50% 45%" },
];

// ── Home: before → after (swap for your own pair when you have one) ─────────
export const beforeAfter = {
  before: { image: PROJECT.emptyRoomBefore, label: "Before", caption: "A bare room, before any interior work" },
  after: { image: PROJECT.livingRoom, label: "After", caption: "Finished, furnished and ready to live in" },
  steps: ["Raw timber", "Cut & shaped", "Assembled", "Finished & fitted"],
};

// ── Contact / inquiry form ───────────────────────────────────────────────────
export const inquiryOptions = [
  "Modular Kitchen",
  "Wardrobe",
  "Cupboard",
  "Door & Chowkhat",
  "Other",
];

// ── About Us ─────────────────────────────────────────────────────────────────
export const processSteps = [
  { step: "01", title: "Understand", desc: "We visit the site, listen to how the space is used, and take the measurements before any design begins." },
  { step: "02", title: "Design", desc: "Layouts, hinge clearances and materials are worked out with you, in drawings you can read." },
  { step: "03", title: "Craft", desc: "Panels are cut, edge-banded and assembled with care at our Panchkula unit." },
  { step: "04", title: "Detail", desc: "Handles, hinges, drawers and finishing touches are fitted and checked by hand." },
  { step: "05", title: "Install", desc: "We install on site and go through every unit with you before handover." },
];

export const serviceStory = [
  { tag: "01 — Modular Kitchens", title: "Modular Kitchens", desc: "L-shaped, parallel or island layouts, built around how you cook — from carcass sizing to the last drawer runner.", image: PROJECT.heroKitchen },
  { tag: "02 — Storage", title: "Modular Cupboards & Wardrobes", desc: "Floor-to-ceiling storage that uses every inch of a room, from a walk-in wardrobe to a narrow utility wall.", image: PROJECT.cupboardDisplay },
  { tag: "03 — Doors", title: "Doors & Chowkhats", desc: "Frames built first, squared and plumbed, then a door hung to fit them exactly.", image: PROJECT.doorGoyal },
];

// Media slots
export const media = {
  workshopVideo: "", // e.g. "/videos/workshop.mp4"
  woodTexture: "/textures/hardwood.jpg",
};
