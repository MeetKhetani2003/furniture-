export interface Subcategory {
  name: string;
  slug: string;
  image?: string;
}

export interface Category {
  name: string;
  slug: string;
  image: string;
  subcategories: Subcategory[];
  description: string;
}

export const categories: Category[] = [
  {
    name: "Furniture",
    slug: "furniture",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    description: "Discover handcrafted furniture pieces that transform your living spaces into sanctuaries of comfort and style.",
    subcategories: [
      { name: "Sofas", slug: "sofas", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80" },
      { name: "Beds", slug: "beds", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80" },
      { name: "Wardrobes", slug: "wardrobes", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&q=80" },
      { name: "Dining Tables", slug: "dining-tables", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&q=80" },
      { name: "TV Units", slug: "tv-units", image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&q=80" },
      { name: "Bookshelves", slug: "bookshelves", image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400&q=80" },
      { name: "Shoe Racks", slug: "shoe-racks", image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=400&q=80" },
    ],
  },
  {
    name: "Sofas & Seating",
    slug: "sofas-seating",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    description: "From plush sectionals to elegant accent chairs, find the perfect seating for every room.",
    subcategories: [
      { name: "3-Seater Sofas", slug: "3-seater-sofas" },
      { name: "2-Seater Sofas", slug: "2-seater-sofas" },
      { name: "Sectional Sofas", slug: "sectional-sofas" },
      { name: "Recliners", slug: "recliners" },
      { name: "Bean Bags", slug: "bean-bags" },
      { name: "Accent Chairs", slug: "accent-chairs" },
    ],
  },
  {
    name: "Mattresses",
    slug: "mattresses",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
    description: "Sleep better with our range of premium mattresses designed for ultimate comfort and support.",
    subcategories: [
      { name: "Memory Foam", slug: "memory-foam" },
      { name: "Spring", slug: "spring" },
      { name: "Orthopedic", slug: "orthopedic" },
      { name: "Kids", slug: "kids" },
      { name: "Latex", slug: "latex" },
    ],
  },
  {
    name: "Home Décor",
    slug: "home-decor",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    description: "Elevate your space with curated décor pieces, from statement wall art to delicate vases.",
    subcategories: [
      { name: "Clocks", slug: "clocks" },
      { name: "Mirrors", slug: "mirrors" },
      { name: "Vases", slug: "vases" },
      { name: "Photo Frames", slug: "photo-frames" },
      { name: "Wall Art", slug: "wall-art" },
      { name: "Sculptures", slug: "sculptures" },
    ],
  },
  {
    name: "Furnishings",
    slug: "furnishings",
    image: "https://images.unsplash.com/photo-1522771753035-a0a1f66cd459?w=800&q=80",
    description: "Soft furnishings that add warmth, texture, and personality to your home.",
    subcategories: [
      { name: "Curtains", slug: "curtains" },
      { name: "Bed Sheets", slug: "bed-sheets" },
      { name: "Cushions", slug: "cushions" },
      { name: "Rugs & Carpets", slug: "rugs-carpets" },
      { name: "Quilts", slug: "quilts" },
    ],
  },
  {
    name: "Lamps & Lighting",
    slug: "lamps-lighting",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    description: "Illuminate your home with designer lighting that creates the perfect ambiance.",
    subcategories: [
      { name: "Floor Lamps", slug: "floor-lamps" },
      { name: "Table Lamps", slug: "table-lamps" },
      { name: "Ceiling Lights", slug: "ceiling-lights" },
      { name: "Wall Sconces", slug: "wall-sconces" },
      { name: "Pendant Lights", slug: "pendant-lights" },
    ],
  },
  {
    name: "Kitchen & Dining",
    slug: "kitchen-dining",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    description: "Everything you need to create a functional and beautiful kitchen and dining space.",
    subcategories: [
      { name: "Dining Sets", slug: "dining-sets" },
      { name: "Bar Furniture", slug: "bar-furniture" },
      { name: "Kitchen Trolleys", slug: "kitchen-trolleys" },
      { name: "Crockery Units", slug: "crockery-units" },
    ],
  },
  {
    name: "Home Utility",
    slug: "home-utility",
    image: "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=800&q=80",
    description: "Smart storage and utility solutions to keep your home organized and clutter-free.",
    subcategories: [
      { name: "Laundry", slug: "laundry" },
      { name: "Cleaning", slug: "cleaning" },
      { name: "Storage Boxes", slug: "storage-boxes" },
      { name: "Organizers", slug: "organizers" },
    ],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAllSubcategories(): Subcategory[] {
  return categories.flatMap((c) => c.subcategories);
}
