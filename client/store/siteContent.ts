import heroImg from "@/assets/hero-laundry.png";
import aboutImg from "@/assets/about-basket.png";

export type IconName =
  | "Truck" | "Droplets" | "Shield" | "Sparkles" | "Star" | "Calendar"
  | "Zap" | "Award" | "HeartHandshake" | "Target" | "Eye";

export interface HeroBlock {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  primaryCta: string;
  primaryHref: string;
  secondaryCta: string;
  secondaryHref: string;
  image: string;
}

export interface IconCard { id: string; icon: IconName; title: string; desc: string; }
export interface StepCard  { id: string; n: string; title: string; desc: string; }
export interface Testimonial { id: string; name: string; text: string; rating: number; }
export interface StatItem { id: string; value: number; suffix: string; label: string; }
export interface TeamMember { id: string; name: string; role: string; }
export interface SimpleCard { id: string; icon: IconName; title: string; desc: string; }

export interface HomeContent {
  hero: HeroBlock;
  features: IconCard[];
  steps: StepCard[];
  testimonials: Testimonial[];
  cta: { title: string; subtitle: string; button: string; href: string; };
}

export interface AboutContent {
  hero: { eyebrow: string; titleLine1: string; titleLine2: string; description: string; image: string; };
  pillars: SimpleCard[];     // mission / vision
  reasons: IconCard[];
  stats: StatItem[];
  team: TeamMember[];
}

export interface SiteContent { home: HomeContent; about: AboutContent; }

const uid = () => Math.random().toString(36).slice(2, 9);

export const defaultContent: SiteContent = {
  home: {
    hero: {
      eyebrow: "#1 Laundry Service In Your City",
      titleLine1: "Fresh Clothes,",
      titleLine2: "Happy You!",
      description:
        "We provide fast, reliable and affordable laundry services with free pickup and delivery — designed for the modern home.",
      primaryCta: "Book Now",
      primaryHref: "/booking",
      secondaryCta: "Explore Services",
      secondaryHref: "/services",
      image: heroImg,
    },
    features: [
      { id: uid(), icon: "Truck",    title: "Free Pickup & Delivery", desc: "Door-to-door service at no extra cost." },
      { id: uid(), icon: "Droplets", title: "Eco-Friendly Wash",       desc: "Plant-based detergents that protect fabric." },
      { id: uid(), icon: "Shield",   title: "100% Quality Care",       desc: "Trained experts handle every garment." },
      { id: uid(), icon: "Sparkles", title: "Premium Finish",          desc: "Crisp folds, sharp creases, perfect every time." },
    ],
    steps: [
      { id: uid(), n: "01", title: "Book Order", desc: "Schedule a pickup through the app in 30 seconds." },
      { id: uid(), n: "02", title: "We Collect", desc: "Our executive picks up your clothes from your door." },
      { id: uid(), n: "03", title: "We Clean",   desc: "Wash, dry, and iron with care and precision." },
      { id: uid(), n: "04", title: "We Deliver", desc: "Fresh, folded clothes back at your door." },
    ],
    testimonials: [
      { id: uid(), name: "Priya S.",  text: "Amazing service! My clothes are so fresh and neatly folded. Highly recommend!", rating: 5 },
      { id: uid(), name: "Rahul K.",  text: "Super quick pickup and delivery. Very professional and affordable.", rating: 5 },
      { id: uid(), name: "Anjali M.", text: "Best laundry service in town. They truly care about quality.", rating: 5 },
    ],
    cta: { title: "Ready for fresh clothes?", subtitle: "Schedule your first pickup in seconds. We'll handle the rest.", button: "Book Now", href: "/booking" },
  },
  about: {
    hero: {
      eyebrow: "About Us",
      titleLine1: "About Our",
      titleLine2: "Laundry Service",
      description: "At Washy, we make laundry simple, fast and convenient. Our mission is to deliver top-quality laundry and dry cleaning with a smile. Your satisfaction is our priority.",
      image: aboutImg,
    },
    pillars: [
      { id: uid(), icon: "Target", title: "Our Mission", desc: "To deliver exceptional laundry services with care, convenience and affordability — making fresh clothes effortless for every home." },
      { id: uid(), icon: "Eye",    title: "Our Vision",  desc: "To become the most trusted laundry service brand in every city we serve, powered by technology and a smile." },
    ],
    reasons: [
      { id: uid(), icon: "Zap",            title: "Fast Service",       desc: "On-time pickup and same-day delivery." },
      { id: uid(), icon: "Award",          title: "Affordable Price",   desc: "Premium quality at unbeatable rates." },
      { id: uid(), icon: "HeartHandshake", title: "Quality Care",       desc: "We treat your clothes like our own." },
      { id: uid(), icon: "Sparkles",       title: "Customer Support",   desc: "We're here to help you 24/7." },
    ],
    stats: [
      { id: uid(), value: 500,  suffix: "+", label: "Happy Customers" },
      { id: uid(), value: 1000, suffix: "+", label: "Orders Completed" },
      { id: uid(), value: 50,   suffix: "+", label: "Team Members" },
      { id: uid(), value: 5,    suffix: "★", label: "Customer Rating" },
    ],
    team: [
      { id: uid(), name: "Aarav Patel",  role: "Founder & CEO" },
      { id: uid(), name: "Meera Iyer",   role: "Operations Lead" },
      { id: uid(), name: "Vikram Rao",   role: "Head of Quality" },
      { id: uid(), name: "Sneha Joshi",  role: "Customer Success" },
    ],
  },
};

const KEY = "washy_site_content_v1";
const EVT = "washy:site-content";

export const newId = uid;

export const siteContentStore = {
  get(): SiteContent {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaultContent;
      const parsed = JSON.parse(raw);
      return { ...defaultContent, ...parsed, home: { ...defaultContent.home, ...parsed.home }, about: { ...defaultContent.about, ...parsed.about } };
    } catch { return defaultContent; }
  },
  set(next: SiteContent) {
    localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent(EVT));
  },
  reset() { localStorage.removeItem(KEY); window.dispatchEvent(new CustomEvent(EVT)); },
  subscribe(cb: () => void) {
    const h = () => cb();
    window.addEventListener(EVT, h);
    window.addEventListener("storage", h);
    return () => { window.removeEventListener(EVT, h); window.removeEventListener("storage", h); };
  },
};
