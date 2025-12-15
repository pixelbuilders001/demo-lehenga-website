import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage?: string;
  category: string;
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
  description: string;
  fabric: string;
  careInstructions: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Rose Bloom Embroidered Lehenga",
    price: 45999,
    originalPrice: 59999,
    image: product1,
    category: "Bridal",
    colors: ["Pink", "Rose Gold", "Silver"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8,
    reviews: 124,
    description: "Exquisite pink lehenga with intricate silver embroidery, perfect for your special day. Features hand-embroidered floral motifs with sequin detailing.",
    fabric: "Raw Silk with Net Dupatta",
    careInstructions: ["Dry clean only", "Store in muslin cloth", "Avoid direct sunlight"],
    isNew: true,
    isBestSeller: true,
  },
  {
    id: "2",
    name: "Royal Blue Zardozi Lehenga",
    price: 68999,
    originalPrice: 89999,
    image: product2,
    category: "Bridal",
    colors: ["Royal Blue", "Navy", "Teal"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviews: 89,
    description: "Stunning royal blue lehenga with heavy zardozi embroidery and golden threadwork. A masterpiece for the modern bride.",
    fabric: "Velvet with Organza Dupatta",
    careInstructions: ["Dry clean only", "Steam iron on low", "Store flat"],
    isBestSeller: true,
  },
  {
    id: "3",
    name: "Maroon Heritage Bridal Lehenga",
    price: 78999,
    image: product3,
    category: "Bridal",
    colors: ["Maroon", "Wine", "Burgundy"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.7,
    reviews: 156,
    description: "Traditional maroon bridal lehenga with antique gold embroidery. Timeless elegance meets contemporary craftsmanship.",
    fabric: "Banarasi Silk with Net Dupatta",
    careInstructions: ["Dry clean only", "Handle with care", "Avoid moisture"],
    isNew: true,
  },
  {
    id: "4",
    name: "Ivory Pearl Wedding Lehenga",
    price: 92999,
    originalPrice: 120000,
    image: product4,
    category: "Wedding",
    colors: ["Ivory", "Cream", "Off-White"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 5.0,
    reviews: 67,
    description: "Ethereal ivory lehenga with delicate pearl embellishments and golden zari work. Perfect for the contemporary bride.",
    fabric: "Georgette with Pearl Net Dupatta",
    careInstructions: ["Dry clean only", "Store in breathable bag", "Avoid folding"],
    isBestSeller: true,
  },
  {
    id: "5",
    name: "Emerald Kundan Festive Lehenga",
    price: 54999,
    image: product5,
    category: "Festive",
    colors: ["Emerald", "Forest Green", "Mint"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.6,
    reviews: 203,
    description: "Vibrant emerald green lehenga with traditional kundan work and golden embroidery. Ideal for festivals and celebrations.",
    fabric: "Art Silk with Soft Net Dupatta",
    careInstructions: ["Dry clean recommended", "Iron on medium heat", "Store carefully"],
    isNew: true,
  },
  {
    id: "6",
    name: "Peach Sequin Party Lehenga",
    price: 38999,
    originalPrice: 49999,
    image: product6,
    category: "Party",
    colors: ["Peach", "Coral", "Rose"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.5,
    reviews: 178,
    description: "Glamorous peach lehenga with contemporary sequin work. Light and elegant for sangeet and cocktail parties.",
    fabric: "Soft Net with Satin Inner",
    careInstructions: ["Dry clean only", "Store in cool place", "Handle sequins carefully"],
  },
];

export const categories = [
  { id: "bridal", name: "Bridal", count: 45 },
  { id: "wedding", name: "Wedding", count: 32 },
  { id: "festive", name: "Festive", count: 28 },
  { id: "party", name: "Party Wear", count: 56 },
  { id: "reception", name: "Reception", count: 24 },
  { id: "sangeet", name: "Sangeet", count: 38 },
];

export const colors = [
  { name: "Red", hex: "#C41E3A" },
  { name: "Pink", hex: "#E8A0BF" },
  { name: "Blue", hex: "#1E40AF" },
  { name: "Green", hex: "#059669" },
  { name: "Gold", hex: "#D4AF37" },
  { name: "Ivory", hex: "#FFFFF0" },
  { name: "Maroon", hex: "#800000" },
  { name: "Peach", hex: "#FFCBA4" },
];

export const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const priceRanges = [
  { label: "Under ₹30,000", min: 0, max: 30000 },
  { label: "₹30,000 - ₹50,000", min: 30000, max: 50000 },
  { label: "₹50,000 - ₹80,000", min: 50000, max: 80000 },
  { label: "Above ₹80,000", min: 80000, max: Infinity },
];
