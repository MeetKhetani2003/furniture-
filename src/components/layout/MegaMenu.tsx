import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface MegaMenuProps {
  activeItem: string | null;
  setActiveItem: (item: string | null) => void;
}

const MENU_DATA: Record<string, any> = {
  "new-arrivals": {
    columns: [
      {
        title: "NEW BY ROOM",
        items: [
          { name: "Living Room", slug: "/new-arrivals/living" },
          { name: "Bedroom", slug: "/new-arrivals/bedroom" },
          { name: "Dining Room", slug: "/new-arrivals/dining" },
          { name: "Outdoor", slug: "/new-arrivals/outdoor" },
          { name: "Office", slug: "/new-arrivals/office" },
        ],
      },
      {
        title: "NEW BY CATEGORY",
        items: [
          { name: "Lighting", slug: "/new-arrivals/lighting" },
          { name: "Décor", slug: "/new-arrivals/decor" },
        ],
      },
      {
        title: "QUICK SHIP",
        items: [
          { name: "New & Ready to Ship", slug: "/new-arrivals/ready-to-ship" },
          { name: "All New Arrivals", slug: "/new-arrivals" },
        ],
      },
    ],
    editorial: [
      { title: "The Latest Pieces", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80", link: "/new-arrivals" },
      { title: "Trending Styles", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80", link: "/collections/contemporary" },
    ],
  },
  "living-room": {
    columns: [
      {
        title: "SHOP LIVING",
        items: [
          { name: "Sofas", slug: "/living-room/sofas" },
          { name: "Sectionals", slug: "/living-room/sofas/sectionals" },
          { name: "Lounge Chairs", slug: "/living-room/chairs/lounge" },
          { name: "Accent Chairs", slug: "/living-room/chairs/accent" },
          { name: "Coffee Tables", slug: "/living-room/coffee-tables" },
          { name: "Side Tables", slug: "/living-room/side-tables" },
          { name: "TV & Media Units", slug: "/living-room/tv-units" },
          { name: "Consoles", slug: "/living-room/console-tables" },
        ],
      },
      {
        title: "DISCOVER",
        items: [
          { name: "New Arrivals", slug: "/new-arrivals/living" },
          { name: "Best Sellers", slug: "/collections/bestsellers" },
          { name: "Ready to Ship", slug: "/new-arrivals/ready-to-ship" },
          { name: "Solid Wood", slug: "/collections/solid-wood" },
          { name: "Small Spaces", slug: "/collections/small-spaces" },
          { name: "Materials", slug: "/materials" },
        ],
      },
      {
        title: "SHOP BY STYLE",
        items: [
          { name: "Modern", slug: "/collections/modern" },
          { name: "Contemporary", slug: "/collections/contemporary" },
          { name: "Mid-Century", slug: "/collections/mid-century" },
          { name: "Scandinavian", slug: "/collections/scandinavian" },
          { name: "Minimalist", slug: "/collections/minimalist" },
          { name: "Indian Contemporary", slug: "/collections/indian-contemporary" },
        ],
      },
    ],
    editorial: [
      { title: "Modern Living Room", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80", link: "/rooms/living-room" },
      { title: "Featured Collection", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80", link: "/collections/signature-slug" },
    ],
  },
  "bedroom": {
    columns: [
      {
        title: "BEDS",
        items: [
          { name: "All Beds", slug: "/bedroom/beds" },
          { name: "King Beds", slug: "/bedroom/beds/king" },
          { name: "Queen Beds", slug: "/bedroom/beds/queen" },
          { name: "Storage Beds", slug: "/bedroom/beds/storage" },
          { name: "Platform Beds", slug: "/bedroom/beds/platform" },
          { name: "Upholstered Beds", slug: "/bedroom/beds/upholstered" },
          { name: "Wooden Beds", slug: "/bedroom/beds/wooden" },
        ],
      },
      {
        title: "STORAGE & MORE",
        items: [
          { name: "Bedside Tables", slug: "/bedroom/bedside-tables" },
          { name: "Nightstands", slug: "/bedroom/nightstands" },
          { name: "Wardrobes", slug: "/bedroom/wardrobes" },
          { name: "Dressers", slug: "/bedroom/dressers" },
          { name: "Chests of Drawers", slug: "/bedroom/chests-of-drawers" },
          { name: "Bedroom Benches", slug: "/bedroom/benches" },
          { name: "Mattresses", slug: "/bedroom/mattresses" },
        ],
      },
      {
        title: "DISCOVER",
        items: [
          { name: "Bedroom Sets", slug: "/bedroom/sets" },
          { name: "New Arrivals", slug: "/new-arrivals/bedroom" },
          { name: "Bedroom Ideas", slug: "/rooms/bedroom" },
          { name: "Solid Wood", slug: "/collections/solid-wood" },
        ],
      },
    ],
    editorial: [
      { title: "Calm Bedroom", image: "https://images.unsplash.com/photo-1522771731478-44eb9f30b9bb?w=600&q=80", link: "/rooms/bedroom" },
      { title: "Quality Sleep", image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80", link: "/bedroom/mattresses" },
    ],
  },
  "dining": {
    columns: [
      {
        title: "DINING TABLES",
        items: [
          { name: "All Dining Tables", slug: "/dining/dining-tables" },
          { name: "4-Seater", slug: "/dining/dining-tables/4-seater" },
          { name: "6-Seater", slug: "/dining/dining-tables/6-seater" },
          { name: "8+ Seater", slug: "/dining/dining-tables/8-plus" },
          { name: "Round", slug: "/dining/dining-tables/round" },
          { name: "Extendable", slug: "/dining/dining-tables/extendable" },
        ],
      },
      {
        title: "SEATING",
        items: [
          { name: "Dining Chairs", slug: "/dining/dining-chairs" },
          { name: "Dining Benches", slug: "/dining/dining-benches" },
          { name: "Bar Stools", slug: "/dining/bar-stools" },
          { name: "Counter Stools", slug: "/dining/counter-stools" },
        ],
      },
      {
        title: "STORAGE & SETS",
        items: [
          { name: "Sideboards", slug: "/dining/sideboards" },
          { name: "Buffets", slug: "/dining/buffets" },
          { name: "Bar Cabinets", slug: "/dining/bar-cabinets" },
          { name: "Crockery Cabinets", slug: "/dining/crockery-cabinets" },
          { name: "Dining Sets", slug: "/dining/sets" },
        ],
      },
    ],
    editorial: [
      { title: "Entertain in Style", image: "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=600&q=80", link: "/rooms/dining-room" },
      { title: "Dining Sets", image: "https://images.unsplash.com/photo-1617806118233-18e1c0945594?w=600&q=80", link: "/dining/sets" },
    ],
  },
  "outdoor": {
    columns: [
      {
        title: "OUTDOOR LOUNGING",
        items: [
          { name: "Outdoor Sofas", slug: "/outdoor/sofas" },
          { name: "Lounge Chairs", slug: "/outdoor/lounge-chairs" },
          { name: "Sun Loungers", slug: "/outdoor/sun-loungers" },
          { name: "Outdoor Chairs", slug: "/outdoor/chairs" },
          { name: "Outdoor Benches", slug: "/outdoor/benches" },
        ],
      },
      {
        title: "OUTDOOR TABLES",
        items: [
          { name: "Dining Tables", slug: "/outdoor/dining-tables" },
          { name: "Coffee Tables", slug: "/outdoor/coffee-tables" },
          { name: "Side Tables", slug: "/outdoor/side-tables" },
        ],
      },
      {
        title: "OUTDOOR SETS & MORE",
        items: [
          { name: "Dining Sets", slug: "/outdoor/dining-sets" },
          { name: "Accessories", slug: "/outdoor/accessories" },
          { name: "Outdoor Ideas", slug: "/rooms/outdoor" },
        ],
      },
    ],
    editorial: [
      { title: "Outdoor Living", image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=600&q=80", link: "/rooms/outdoor" },
      { title: "Patio Essentials", image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&q=80", link: "/outdoor/accessories" },
    ],
  },
  "office": {
    columns: [
      {
        title: "DESKS",
        items: [
          { name: "All Desks", slug: "/office/desks" },
          { name: "Executive Desks", slug: "/office/desks/executive" },
          { name: "Writing Desks", slug: "/office/desks/writing" },
          { name: "Study Desks", slug: "/office/desks/study" },
          { name: "Standing Desks", slug: "/office/desks/standing" },
        ],
      },
      {
        title: "SEATING & STORAGE",
        items: [
          { name: "Office Chairs", slug: "/office/chairs" },
          { name: "Bookcases", slug: "/office/bookcases" },
          { name: "Office Storage", slug: "/office/storage" },
          { name: "Filing Cabinets", slug: "/office/filing-cabinets" },
          { name: "Office Shelving", slug: "/office/shelving" },
        ],
      },
      {
        title: "DISCOVER",
        items: [
          { name: "Office Sets", slug: "/office/sets" },
          { name: "Home Office Ideas", slug: "/rooms/home-office" },
          { name: "Trade / B2B", slug: "/trade" },
        ],
      },
    ],
    editorial: [
      { title: "Productive Spaces", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80", link: "/rooms/home-office" },
      { title: "Executive Desks", image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&q=80", link: "/office/desks/executive" },
    ],
  },
  "lighting": {
    columns: [
      {
        title: "LAMPS",
        items: [
          { name: "Floor Lamps", slug: "/lighting/floor-lamps" },
          { name: "Table Lamps", slug: "/lighting/table-lamps" },
          { name: "Desk Lamps", slug: "/lighting/desk-lamps" },
        ],
      },
      {
        title: "CEILING & WALL",
        items: [
          { name: "Pendant Lights", slug: "/lighting/pendant-lights" },
          { name: "Chandeliers", slug: "/lighting/chandeliers" },
          { name: "Ceiling Lights", slug: "/lighting/ceiling-lights" },
          { name: "Wall Lights / Sconces", slug: "/lighting/wall-lights" },
        ],
      },
      {
        title: "DISCOVER",
        items: [
          { name: "All Lighting", slug: "/lighting" },
          { name: "Decorative Lighting", slug: "/lighting/decorative" },
          { name: "Lighting Sale", slug: "/sale/lighting" },
        ],
      },
    ],
    editorial: [
      { title: "Warm Ambience", image: "https://images.unsplash.com/photo-1505691938895-1758d7bef511?w=600&q=80", link: "/lighting" },
      { title: "Statement Pendants", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80", link: "/lighting/pendant-lights" },
    ],
  },
  "decor": {
    columns: [
      {
        title: "TEXTILES",
        items: [
          { name: "Rugs", slug: "/decor/rugs" },
          { name: "Cushions", slug: "/decor/cushions" },
          { name: "Throws", slug: "/decor/throws" },
        ],
      },
      {
        title: "WALL & ACCENTS",
        items: [
          { name: "Mirrors", slug: "/decor/mirrors" },
          { name: "Wall Art", slug: "/decor/wall-art" },
          { name: "Clocks", slug: "/decor/clocks" },
          { name: "Vases", slug: "/decor/vases" },
          { name: "Planters", slug: "/decor/planters" },
          { name: "Sculptures", slug: "/decor/sculptures" },
        ],
      },
      {
        title: "MORE DECOR",
        items: [
          { name: "Decorative Bowls", slug: "/decor/decorative-bowls" },
          { name: "Tabletop Accessories", slug: "/decor/tabletop" },
          { name: "Baskets", slug: "/decor/baskets" },
          { name: "Decorative Storage", slug: "/decor/storage" },
        ],
      },
    ],
    editorial: [
      { title: "Finishing Touches", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80", link: "/decor" },
      { title: "Artisan Decor", image: "https://images.unsplash.com/photo-1505691938895-1758d7bef511?w=600&q=80", link: "/decor/sculptures" },
    ],
  },
  "collections": {
    columns: [
      {
        title: "CURATED",
        items: [
          { name: "All Collections", slug: "/collections" },
          { name: "Bestsellers", slug: "/collections/bestsellers" },
          { name: "Ready to Ship", slug: "/collections/ready-to-ship" },
          { name: "Solid Wood", slug: "/collections/solid-wood" },
          { name: "Small Spaces", slug: "/collections/small-spaces" },
        ],
      },
      {
        title: "BY STYLE",
        items: [
          { name: "Modern", slug: "/collections/modern" },
          { name: "Contemporary", slug: "/collections/contemporary" },
          { name: "Mid-Century", slug: "/collections/mid-century" },
          { name: "Scandinavian", slug: "/collections/scandinavian" },
          { name: "Minimalist", slug: "/collections/minimalist" },
          { name: "Indian Contemporary", slug: "/collections/indian-contemporary" },
        ],
      },
      {
        title: "SPECIAL",
        items: [
          { name: "Signature Collection", slug: "/collections/signature-slug" },
          { name: "Seasonal Collection", slug: "/collections/seasonal-slug" },
          { name: "Custom Furniture", slug: "/custom-furniture" },
        ],
      },
    ],
    editorial: [
      { title: "The Signature Series", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80", link: "/collections/signature-slug" },
      { title: "Solid Wood", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80", link: "/collections/solid-wood" },
    ],
  },
  "sale": {
    columns: [
      {
        title: "SALE BY ROOM",
        items: [
          { name: "All Sale", slug: "/sale" },
          { name: "Living Sale", slug: "/sale/living" },
          { name: "Bedroom Sale", slug: "/sale/bedroom" },
          { name: "Dining Sale", slug: "/sale/dining" },
          { name: "Outdoor Sale", slug: "/sale/outdoor" },
        ],
      },
      {
        title: "SALE BY CATEGORY",
        items: [
          { name: "Lighting Sale", slug: "/sale/lighting" },
          { name: "Décor Sale", slug: "/sale/decor" },
          { name: "Clearance", slug: "/sale/clearance" },
        ],
      },
      {
        title: "EXPLORE",
        items: [
          { name: "Ready to Ship", slug: "/collections/ready-to-ship" },
          { name: "Shop By Room", slug: "/rooms" },
        ],
      },
    ],
    editorial: [
      { title: "End of Season", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80", link: "/sale/clearance" },
      { title: "Living Room Deals", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80", link: "/sale/living" },
    ],
  },
};

export default function MegaMenu({ activeItem, setActiveItem }: MegaMenuProps) {
  const data = activeItem ? MENU_DATA[activeItem] : null;

  return (
    <AnimatePresence>
      {activeItem && data && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 w-full bg-[#FAF9F6] shadow-2xl border-t border-brand-border/60 overflow-hidden z-50"
          onMouseEnter={() => setActiveItem(activeItem)}
          onMouseLeave={() => setActiveItem(null)}
        >
          <div className="max-w-[1440px] mx-auto px-6 xl:px-20 py-10 flex gap-12">
            <div className="flex gap-16 flex-1">
              {data.columns.map((col: any, i: number) => (
                <div key={i} className="flex flex-col gap-1 w-48">
                  <h4 className="text-[11px] font-bold text-[#A88C64] tracking-widest uppercase mb-4 leading-snug">
                    {col.title}
                  </h4>
                  {col.items.map((sub: any) => (
                    <Link
                      key={sub.slug}
                      href={sub.slug}
                      className="text-[13px] text-brand-text hover:text-brand-primary transition-colors py-1.5 font-medium"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>

            {/* Right Side Editorial Tiles */}
            <div className="hidden lg:flex w-[600px] shrink-0 gap-6 border-l border-brand-border/40 pl-10">
              {data.editorial.map((tile: any, i: number) => (
                <Link key={i} href={tile.link} className="block rounded-sm overflow-hidden relative group h-[280px] w-[280px] bg-brand-border">
                  <img
                    src={tile.image}
                    alt={tile.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                     <span className="text-white font-bold text-xl leading-tight tracking-wide font-[family-name:var(--font-playfair)] text-center drop-shadow-md px-4">
                       {tile.title}
                     </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
