export type Drone = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: "Camera" | "Racing" | "Toy" | "Agriculture" | "Professional";
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  specs: {
    camera: string;
    flightTime: string; // "30 min"
    range: string; // "10 km"
    gps: boolean;
    weight: string;
    maxSpeed: string;
    battery: string;
  };
  description: string;
  highlights: string[];
};

const img = (seed: string) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=900&q=70`;

export const drones: Drone[] = [
  {
    id: "1", slug: "skyfly-pro-x9", name: "SkyFly Pro X9", brand: "SkyFly",
    category: "Professional", price: 89999, mrp: 109999, rating: 4.7, reviews: 1284,
    image: img("1473968512647-3e447244af8f"), badge: "Bestseller",
    specs: { camera: "4K HDR 60fps", flightTime: "38 min", range: "12 km", gps: true, weight: "595 g", maxSpeed: "72 km/h", battery: "5000 mAh" },
    description: "A flagship aerial cinematography drone built for creators who demand cinematic precision.",
    highlights: ["Hasselblad-style 1\" sensor", "Obstacle sensing on 6 sides", "OcuSync 3.0 transmission"],
  },
  {
    id: "2", slug: "aerox-mini-2", name: "AeroX Mini 2", brand: "AeroX",
    category: "Camera", price: 32999, mrp: 39999, rating: 4.5, reviews: 842,
    image: img("1507582020474-9a35b7d455d9"),
    specs: { camera: "2.7K 30fps", flightTime: "31 min", range: "10 km", gps: true, weight: "249 g", maxSpeed: "57 km/h", battery: "2250 mAh" },
    description: "Sub-250g everyday camera drone — no registration needed in many regions.",
    highlights: ["3-axis gimbal", "Level-5 wind resistance", "QuickShots automation"],
  },
  {
    id: "3", slug: "voltrace-fpv", name: "VoltRace FPV", brand: "Voltrace",
    category: "Racing", price: 24999, mrp: 28999, rating: 4.6, reviews: 421,
    image: img("1527977966376-1c8408f9f108"), badge: "Trending",
    specs: { camera: "1080p 120fps", flightTime: "8 min", range: "4 km", gps: false, weight: "320 g", maxSpeed: "140 km/h", battery: "1500 mAh" },
    description: "Pure adrenaline. A 5\" freestyle FPV rig tuned for racers and freestyle pilots.",
    highlights: ["Analog + DJI HD ready", "Carbon fiber frame", "F722 flight controller"],
  },
  {
    id: "4", slug: "harvest-air-agri", name: "Harvest Air Agri", brand: "Harvest",
    category: "Agriculture", price: 449000, mrp: 499000, rating: 4.8, reviews: 96,
    image: img("1473968512647-3e447244af8f"),
    specs: { camera: "RGB + Multispectral", flightTime: "22 min", range: "5 km", gps: true, weight: "23 kg", maxSpeed: "32 km/h", battery: "20000 mAh" },
    description: "Precision spraying drone for modern Indian farms.",
    highlights: ["10 L spray tank", "RTK centimetre accuracy", "DGCA Type Certified"],
  },
  {
    id: "5", slug: "nimbus-air-3", name: "Nimbus Air 3", brand: "Nimbus",
    category: "Camera", price: 65999, mrp: 74999, rating: 4.6, reviews: 503,
    image: img("1508614589041-895b88991e3e"),
    specs: { camera: "4K 60fps Dual", flightTime: "46 min", range: "20 km", gps: true, weight: "720 g", maxSpeed: "75 km/h", battery: "4241 mAh" },
    description: "Dual primary cameras with medium telephoto for unmatched aerial framing.",
    highlights: ["46 min flight", "Omnidirectional sensing", "Waypoints 3.0"],
  },
  {
    id: "6", slug: "tinyhawk-kid", name: "TinyHawk Kid", brand: "TinyHawk",
    category: "Toy", price: 4999, mrp: 6499, rating: 4.2, reviews: 2110,
    image: img("1507582020474-9a35b7d455d9"), badge: "Deal",
    specs: { camera: "720p", flightTime: "12 min", range: "100 m", gps: false, weight: "85 g", maxSpeed: "20 km/h", battery: "650 mAh" },
    description: "Perfect first drone — durable, safe, and easy to fly indoors.",
    highlights: ["Auto hover", "One-key takeoff", "Prop guards included"],
  },
  {
    id: "7", slug: "skyfly-mini-se", name: "SkyFly Mini SE", brand: "SkyFly",
    category: "Camera", price: 29999, mrp: 34999, rating: 4.4, reviews: 678,
    image: img("1473968512647-3e447244af8f"),
    specs: { camera: "2.7K 30fps", flightTime: "30 min", range: "8 km", gps: true, weight: "246 g", maxSpeed: "47 km/h", battery: "2250 mAh" },
    description: "An entry-level camera drone with serious capabilities.",
    highlights: ["Sub 250g", "GPS Return-to-Home", "Foldable design"],
  },
  {
    id: "8", slug: "voltrace-cinewhoop", name: "Voltrace Cinewhoop", brand: "Voltrace",
    category: "Racing", price: 38999, mrp: 44999, rating: 4.5, reviews: 188,
    image: img("1527977966376-1c8408f9f108"),
    specs: { camera: "4K Naked GoPro", flightTime: "6 min", range: "2 km", gps: false, weight: "380 g", maxSpeed: "100 km/h", battery: "1300 mAh" },
    description: "Ducted cinewhoop for tight indoor cinematic shots.",
    highlights: ["Prop ducts", "BetaFlight 4.4", "Naked HERO mount"],
  },
];

export const categories = [
  { name: "Camera Drones", slug: "Camera", icon: "📷" },
  { name: "Racing & FPV", slug: "Racing", icon: "🏁" },
  { name: "Professional", slug: "Professional", icon: "🎬" },
  { name: "Agriculture", slug: "Agriculture", icon: "🌾" },
  { name: "Toy & Kids", slug: "Toy", icon: "🎈" },
];

export const blogPosts = [
  { slug: "best-drones-under-10000", title: "Best Drones Under ₹10,000 in 2026", excerpt: "Affordable drones that punch well above their price tag.", date: "May 02, 2026", readTime: "6 min", tag: "Buying Guide" },
  { slug: "drone-buying-guide", title: "The Complete Drone Buying Guide for India", excerpt: "From DGCA rules to choosing your first camera drone.", date: "Apr 18, 2026", readTime: "12 min", tag: "Guide" },
  { slug: "best-camera-drones", title: "Top 7 Camera Drones for Creators", excerpt: "We tested the best aerial cameras of the year.", date: "Apr 04, 2026", readTime: "9 min", tag: "Reviews" },
];

export const reviews = [
  { name: "Aarav Mehta", role: "Filmmaker, Mumbai", text: "DroneWallah's compare tool helped me pick the perfect cinema drone. Genuine prices and fast delivery.", rating: 5 },
  { name: "Priya Iyer", role: "Real-estate Photographer", text: "The buying guide was incredibly detailed. I felt confident buying my first drone here.", rating: 5 },
  { name: "Rohit Singh", role: "FPV Pilot, Bengaluru", text: "Best curation of FPV gear in India. The wishlist & price alerts are gold.", rating: 4 },
];

export const formatINR = (n: number) => "₹" + n.toLocaleString("en-IN");
