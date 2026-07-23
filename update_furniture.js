const fs = require('fs');

const data = `export interface Subcategory {
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
    name: "Furniture",
    slug: "furniture",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    description: "Discover handcrafted furniture pieces that transform your living spaces into sanctuaries.",
    groups: [
      {
        title: "Sofas",
        items: [
          { name: "3 Seater Sofas", slug: "3-seater-sofas" },
          { name: "2 Seater Sofas", slug: "2-seater-sofas" },
          { name: "1 Seater Sofas", slug: "1-seater-sofas" },
          { name: "Sofa Sets", slug: "sofa-sets" }
        ]
      },
      {
        title: "Sectional Sofas",
        items: [
          { name: "LHS Sectionals", slug: "lhs-sectionals" },
          { name: "RHS Sectionals", slug: "rhs-sectionals" },
          { name: "Corner Sofas", slug: "corner-sofas" }
        ]
      },
      { title: "Sofa Cum Beds", items: [] },
      { title: "Chaise Loungers", items: [] },
      { title: "Bean Bags", items: [] },
      {
        title: "Recliners",
        items: [
          { name: "1 Seater Recliners", slug: "1-seater-recliners" },
          { name: "2 Seater Recliners", slug: "2-seater-recliners" },
          { name: "3 Seater Recliners", slug: "3-seater-recliners" },
          { name: "Recliner Sets", slug: "recliner-sets" }
        ]
      },
      {
        title: "Sofa Chairs",
        items: [
          { name: "Wing Chairs", slug: "wing-chairs" },
          { name: "Lounge Chairs", slug: "lounge-chairs" },
          { name: "Slipper Chairs", slug: "slipper-chairs" },
          { name: "Barrel Chairs", slug: "barrel-chairs" }
        ]
      },
      {
        title: "Settees & Benches",
        items: [
          { name: "Settees", slug: "settees" },
          { name: "Benches", slug: "benches" },
          { name: "Recamiers", slug: "recamiers" }
        ]
      },
      { title: "Ottomans", items: [] },
      {
        title: "Chairs",
        items: [
          { name: "Arm Chairs", slug: "arm-chairs" },
          { name: "Rocking Chairs", slug: "rocking-chairs" },
          { name: "Folding Chairs", slug: "folding-chairs" },
          { name: "Iconic Chairs", slug: "iconic-chairs" },
          { name: "Cafe Chairs", slug: "cafe-chairs" }
        ]
      },
      { title: "Gaming Chairs", items: [] },
      {
        title: "Stools & Pouffes",
        items: [
          { name: "Foot Stools", slug: "foot-stools" },
          { name: "Seating Stools", slug: "seating-stools" },
          { name: "Pouffes", slug: "pouffes" }
        ]
      },
      {
        title: "Shoe Racks",
        items: [
          { name: "Shoe Cabinets", slug: "shoe-cabinets" },
          { name: "Open Shoe Racks", slug: "open-shoe-racks" },
          { name: "Shoe Rack & Seat", slug: "shoe-rack-seat" },
          { name: "Tilt Out Shoe Racks", slug: "tilt-out-shoe-racks" }
        ]
      },
      {
        title: "Centre Tables",
        items: [
          { name: "Coffee Tables", slug: "coffee-tables" },
          { name: "Coffee Table Sets", slug: "coffee-table-sets" },
          { name: "Nesting Tables", slug: "nesting-tables" }
        ]
      },
      {
        title: "Side Tables",
        items: [
          { name: "End Tables", slug: "end-tables" },
          { name: "C Shaped Tables", slug: "c-shaped-tables" },
          { name: "Console Tables", slug: "console-tables" },
          { name: "Nest of Tables", slug: "nest-of-tables" }
        ]
      },
      { title: "TV & Media Units", items: [] },
      { title: "Cabinets & Sideboards", items: [] },
      { title: "Book Shelves", items: [] },
      { title: "Book Cases", items: [] },
      {
        title: "Dining Sets",
        items: [
          { name: "4 Seater", slug: "4-seater" },
          { name: "6 Seater", slug: "6-seater" },
          { name: "8 Seater", slug: "8-seater" },
          { name: "2 Seater", slug: "2-seater" }
        ]
      },
      { title: "Dining Chairs", items: [] },
      { title: "Dining Tables", items: [] },
      { title: "Crockery Units", items: [] },
      {
        title: "Bar Furniture",
        items: [
          { name: "Bar Cabinets", slug: "bar-cabinets" },
          { name: "Bar Trolley", slug: "bar-trolley" },
          { name: "Bar Stools", slug: "bar-stools" },
          { name: "Bar Table Sets", slug: "bar-table-sets" },
          { name: "Bar Chairs", slug: "bar-chairs" },
          { name: "Bar Seating", slug: "bar-seating" }
        ]
      },
      {
        title: "Beds",
        items: [
          { name: "Queen Size Beds", slug: "queen-size-beds" },
          { name: "King Size Beds", slug: "king-size-beds" },
          { name: "Single Beds", slug: "single-beds" },
          { name: "Poster Beds", slug: "poster-beds" },
          { name: "Folding Beds", slug: "folding-beds" }
        ]
      },
      { title: "Bedside Tables", items: [] },
      { title: "Trunks", items: [] },
      { title: "Chest of Drawers", items: [] },
      {
        title: "Dressing Tables",
        items: [
          { name: "Dressers", slug: "dressers" },
          { name: "Dressing Cabinets", slug: "dressing-cabinets" },
          { name: "Dressing Units", slug: "dressing-units" }
        ]
      },
      { title: "Screens and Dividers", items: [] },
      {
        title: "Wardrobes",
        items: [
          { name: "1 Door Wardrobes", slug: "1-door-wardrobes" },
          { name: "2 Door Wardrobes", slug: "2-door-wardrobes" },
          { name: "3 Door Wardrobes", slug: "3-door-wardrobes" },
          { name: "4 Door Wardrobes", slug: "4-door-wardrobes" },
          { name: "4+ Door Wardrobes", slug: "4-plus-door-wardrobes" },
          { name: "Sliding Door", slug: "sliding-door" }
        ]
      },
      {
        title: "Kids and Teens",
        items: [
          { name: "Cribs", slug: "cribs" },
          { name: "Beds", slug: "kids-beds" },
          { name: "Bunk Beds", slug: "bunk-beds" },
          { name: "Study", slug: "kids-study" },
          { name: "Wardrobes", slug: "kids-wardrobes" },
          { name: "Book Shelves", slug: "kids-book-shelves" },
          { name: "Storage", slug: "kids-storage" },
          { name: "Seating", slug: "kids-seating" }
        ]
      },
      {
        title: "Study Tables",
        items: [
          { name: "Writing Tables", slug: "writing-tables" },
          { name: "Computer Tables", slug: "computer-tables" },
          { name: "Hutch Desks", slug: "hutch-desks" },
          { name: "Foldable Tables", slug: "foldable-tables" },
          { name: "Wall Mounted", slug: "wall-mounted" }
        ]
      },
      {
        title: "Office Furniture",
        items: [
          { name: "Office Chairs", slug: "office-chairs" },
          { name: "Office Tables", slug: "office-tables" },
          { name: "Office Cabinets", slug: "office-cabinets" }
        ]
      },
      { title: "Home Temples", items: [] },
      {
        title: "Wall Shelves and Cabinets",
        items: [
          { name: "Wall Shelves", slug: "wall-shelves" },
          { name: "Wall Cabinets", slug: "wall-cabinets" }
        ]
      },
      {
        title: "Outdoor",
        items: [
          { name: "Swings", slug: "swings" },
          { name: "Outdoor Tables", slug: "outdoor-tables" },
          { name: "Table & Chair Sets", slug: "table-chair-sets" },
          { name: "Outdoor Seating", slug: "outdoor-seating" },
          { name: "Plastic Chairs", slug: "plastic-chairs" },
          { name: "Loungers", slug: "loungers" }
        ]
      },
      {
        title: "Massagers",
        items: [
          { name: "Massage Chairs", slug: "massage-chairs" },
          { name: "Portable Massagers", slug: "portable-massagers" }
        ]
      },
      {
        title: "Furniture Care",
        items: [
          { name: "Solid Wood Care Kits", slug: "solid-wood-care-kits" },
          { name: "Fabric Care Kits", slug: "fabric-care-kits" }
        ]
      }
    ]
  },`;

const current = fs.readFileSync('src/lib/data/categories.ts', 'utf8');
const restOfFile = current.substring(current.indexOf('{\\n    name: "Sofas & Seating"'));
fs.writeFileSync('src/lib/data/categories.ts', data + '\\n  ' + restOfFile);
console.log('Done');
