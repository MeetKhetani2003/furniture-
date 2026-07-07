export interface Subcategory {
  name: string;
  slug: string;
  image?: string;
}

export interface CategoryGroup {
  title: string;
  items: Subcategory[];
}

export interface Category {
  name: string;
  slug: string;
  image: string;
  groups: CategoryGroup[];
  description: string;
}

export const categories: Category[] = [
  {
    name: "Sofas",
    slug: "sofas",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    description: "Discover handcrafted furniture pieces that transform your living spaces into sanctuaries.",
    groups: [
      {
        title: "Sofa",
        items: [
          { name: "All Sofas", slug: "all-sofas" },
          { name: "Fabric Sofas", slug: "fabric-sofas" },
          { name: "Wooden Sofas", slug: "wooden-sofas" },
          { name: "3 Seater Sofas", slug: "3-seater-sofas" },
          { name: "2 Seater Sofas", slug: "2-seater-sofas" },
          { name: "1 Seater Sofas", slug: "1-seater-sofas" },
          { name: "3+1+1 Sofa Sets", slug: "3-1-1-sofa-sets" },
          { name: "Sofa Cum Beds", slug: "sofa-cum-beds-cat" },
          { name: "L Shaped Sofas", slug: "l-shaped-sofas" },
          { name: "Leather Sofas", slug: "leather-sofas" },
          { name: "Chaise Loungers", slug: "chaise-loungers" },
          { name: "Outdoor Sofas", slug: "outdoor-sofas" },
          { name: "Diwans", slug: "diwans" },
        ]
      },
      {
        title: "Sofa Cum Bed",
        items: [
          { name: "All Sofa Cum Beds", slug: "all-sofa-cum-beds" },
          { name: "Wooden Sofa Cum Beds", slug: "wooden-sofa-cum-beds" },
          { name: "Fabric Sofa Cum Beds", slug: "fabric-sofa-cum-beds" },
        ]
      },
      {
        title: "Recliners",
        items: [
          { name: "All Recliners", slug: "all-recliners" },
          { name: "1 Seater Recliners", slug: "1-seater-recliners" },
          { name: "2 Seater Recliners", slug: "2-seater-recliners" },
          { name: "3 Seater Recliners", slug: "3-seater-recliners" },
        ]
      },
      {
        title: "Seating",
        items: [
          { name: "Lounge Chairs", slug: "lounge-chairs" },
          { name: "Accent Chairs", slug: "accent-chairs" },
          { name: "Arm Chair", slug: "arm-chairs" },
          { name: "Wingback Chairs", slug: "wingback-chairs" },
          { name: "Bean Bags", slug: "bean-bags" },
          { name: "Loveseats", slug: "loveseats" },
          { name: "Benches", slug: "benches" },
          { name: "Ottomans", slug: "ottomans" },
          { name: "Stools", slug: "stools" },
        ]
      }
    ]
  },
  {
    name: "Living",
    slug: "living",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80",
    description: "Transform your living space with our premium TV units, coffee tables, and storage solutions.",
    groups: [
      {
        title: "Tables",
        items: [
          { name: "All Tables", slug: "all-tables" },
          { name: "Coffee Tables", slug: "coffee-tables" },
          { name: "Side & End Tables", slug: "side-tables" },
          { name: "Console Tables", slug: "console-tables" },
        ]
      },
      {
        title: "Living Storage",
        items: [
          { name: "TV Units", slug: "tv-units" },
          { name: "Bookshelves", slug: "bookshelves" },
          { name: "Shoe Racks", slug: "shoe-racks" },
          { name: "Wall Shelves", slug: "wall-shelves" },
          { name: "Display Units", slug: "display-units" },
        ]
      },
      {
        title: "Room Dividers",
        items: [
          { name: "Wooden Room Dividers", slug: "room-dividers" }
        ]
      }
    ]
  },
  {
    name: "Bedroom",
    slug: "bedroom",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
    description: "Create your perfect sanctuary with our range of beds, wardrobes, and bedroom storage.",
    groups: [
      {
        title: "Beds",
        items: [
          { name: "King Size Beds", slug: "king-size-beds" },
          { name: "Queen Size Beds", slug: "queen-size-beds" },
          { name: "Single Beds", slug: "single-beds" },
          { name: "Beds with Storage", slug: "beds-with-storage" },
          { name: "Bunk Beds", slug: "bunk-beds" },
        ]
      },
      {
        title: "Storage",
        items: [
          { name: "Wardrobes", slug: "wardrobes" },
          { name: "Chest of Drawers", slug: "chest-of-drawers" },
          { name: "Bedside Tables", slug: "bedside-tables" },
          { name: "Dressing Tables", slug: "dressing-tables" },
        ]
      }
    ]
  },
  {
    name: "Dining",
    slug: "dining",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
    description: "Host memorable meals with our solid wood dining sets and beautiful kitchen cabinetry.",
    groups: [
      {
        title: "Dining Sets",
        items: [
          { name: "4 Seater Dining Sets", slug: "4-seater-dining" },
          { name: "6 Seater Dining Sets", slug: "6-seater-dining" },
          { name: "8 Seater Dining Sets", slug: "8-seater-dining" },
        ]
      },
      {
        title: "Dining Furniture",
        items: [
          { name: "Dining Tables", slug: "dining-tables" },
          { name: "Dining Chairs", slug: "dining-chairs" },
          { name: "Crockery Units", slug: "crockery-units" },
        ]
      },
      {
        title: "Bar Furniture",
        items: [
          { name: "Bar Cabinets", slug: "bar-cabinets" },
          { name: "Bar Stools", slug: "bar-stools" }
        ]
      }
    ]
  },
  {
    name: "Storage",
    slug: "storage",
    image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800&q=80",
    description: "Smart storage and utility solutions to keep your home organized and clutter-free.",
    groups: [
      {
        title: "Home Storage",
        items: [
          { name: "Wardrobes", slug: "wardrobes" },
          { name: "Chest of Drawers", slug: "chest-of-drawers" },
          { name: "Bookshelves", slug: "bookshelves" },
        ]
      },
      {
        title: "Utility",
        items: [
          { name: "Shoe Racks", slug: "shoe-racks" },
          { name: "Wall Shelves", slug: "wall-shelves" },
        ]
      }
    ]
  },
  {
    name: "Study & Office",
    slug: "study-office",
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80",
    description: "Enhance your productivity with ergonomic office chairs and spacious study tables.",
    groups: [
      {
        title: "Study Tables",
        items: [
          { name: "Study Tables", slug: "study-tables" },
          { name: "Computer Tables", slug: "computer-tables" },
          { name: "Laptop Tables", slug: "laptop-tables" },
        ]
      },
      {
        title: "Office Chairs",
        items: [
          { name: "Office Chairs", slug: "office-chairs" },
          { name: "Ergonomic Chairs", slug: "ergonomic-chairs" },
        ]
      }
    ]
  },
  {
    name: "Outdoor",
    slug: "outdoor",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
    description: "Enjoy the fresh air with our weather-resistant balcony and garden furniture.",
    groups: [
      {
        title: "Outdoor Seating",
        items: [
          { name: "Balcony Sets", slug: "balcony-sets" },
          { name: "Swing Chairs", slug: "swing-chairs" },
          { name: "Outdoor Sofas", slug: "outdoor-sofas" },
        ]
      },
      {
        title: "Outdoor Tables",
        items: [
          { name: "Patio Tables", slug: "patio-tables" },
          { name: "Planter Stands", slug: "planter-stands" }
        ]
      }
    ]
  }
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAllSubcategories(): Subcategory[] {
  return categories.flatMap((c) => c.groups.flatMap(g => g.items));
}
