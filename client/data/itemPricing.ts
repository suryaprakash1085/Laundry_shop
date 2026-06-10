import { Shirt, type LucideIcon } from "lucide-react";

export interface ClothingItem {
  id: string;
  name: string;
  category: "Men" | "Women" | "Kids" | "Home";
  wash: number;
  dryClean: number;
  iron: number;
  premium: number;
  turnaround: string;
}

export const clothingItems: ClothingItem[] = [
  { id: "shirt",        name: "Shirt / T-Shirt",  category: "Men",   wash: 3,  dryClean: 6,  iron: 2,  premium: 7,  turnaround: "24h" },
  { id: "pants",        name: "Pants / Trousers", category: "Men",   wash: 4,  dryClean: 8,  iron: 3,  premium: 9,  turnaround: "24h" },
  { id: "jeans",        name: "Jeans",            category: "Men",   wash: 5,  dryClean: 9,  iron: 3,  premium: 10, turnaround: "24h" },
  { id: "suit",         name: "2-Piece Suit",     category: "Men",   wash: 0,  dryClean: 18, iron: 6,  premium: 22, turnaround: "48h" },
  { id: "blazer",       name: "Blazer / Coat",    category: "Men",   wash: 0,  dryClean: 14, iron: 5,  premium: 18, turnaround: "48h" },
  { id: "dress",        name: "Dress",            category: "Women", wash: 6,  dryClean: 12, iron: 5,  premium: 16, turnaround: "48h" },
  { id: "saree",        name: "Saree",            category: "Women", wash: 7,  dryClean: 14, iron: 5,  premium: 18, turnaround: "48h" },
  { id: "kurta",        name: "Kurta",            category: "Women", wash: 4,  dryClean: 9,  iron: 3,  premium: 11, turnaround: "24h" },
  { id: "skirt",        name: "Skirt",            category: "Women", wash: 4,  dryClean: 8,  iron: 3,  premium: 10, turnaround: "24h" },
  { id: "gown",         name: "Evening Gown",     category: "Women", wash: 0,  dryClean: 25, iron: 8,  premium: 30, turnaround: "72h" },
  { id: "kids-shirt",   name: "Kids T-Shirt",     category: "Kids",  wash: 2,  dryClean: 5,  iron: 1,  premium: 5,  turnaround: "24h" },
  { id: "kids-frock",   name: "Kids Frock",       category: "Kids",  wash: 3,  dryClean: 6,  iron: 2,  premium: 7,  turnaround: "24h" },
  { id: "bedsheet",     name: "Bedsheet",         category: "Home",  wash: 6,  dryClean: 0,  iron: 3,  premium: 10, turnaround: "48h" },
  { id: "duvet",        name: "Duvet / Quilt",    category: "Home",  wash: 14, dryClean: 22, iron: 0,  premium: 28, turnaround: "72h" },
  { id: "curtain",      name: "Curtain (per panel)", category: "Home", wash: 8, dryClean: 14, iron: 4, premium: 18, turnaround: "72h" },
];

export const itemCategories: ClothingItem["category"][] = ["Men", "Women", "Kids", "Home"];

export const itemIcon: LucideIcon = Shirt;
