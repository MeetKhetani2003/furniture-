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
  },
  {
    name: "Sofas & Seating",
    slug: "sofas-seating",
    image: "https://images.unsplash.com/photo-1540574163026-643ea20d05b5?w=800&q=80",
    description: "Explore the most comfortable and stylish seating options for your home.",
    groups: [
      {
        title: "Sofas",
        items: [
          { name: "3 Seater Sofas", slug: "3-seater-sofas-1" },
          { name: "2 Seater Sofas", slug: "2-seater-sofas-1" },
          { name: "1 Seater Sofas", slug: "1-seater-sofas-1" },
          { name: "Sofa Sets", slug: "sofa-sets-1" }
        ]
      },
      {
        title: "Sectional Sofas",
        items: [
          { name: "LHS Sectionals", slug: "lhs-sectionals-1" },
          { name: "RHS Sectionals", slug: "rhs-sectionals-1" },
          { name: "Corner Sofas", slug: "corner-sofas-1" }
        ]
      },
      { title: "Sofa Cum Beds", items: [] },
      { title: "Chaise Loungers", items: [] },
      { title: "Bean Bags", items: [] },
      {
        title: "Recliners",
        items: [
          { name: "1 Seater Recliners", slug: "1-seater-recliners-1" },
          { name: "2 Seater Recliners", slug: "2-seater-recliners-1" },
          { name: "3 Seater Recliners", slug: "3-seater-recliners-1" },
          { name: "Recliner Sets", slug: "recliner-sets-1" }
        ]
      },
      {
        title: "Sofa Chairs",
        items: [
          { name: "Wing Chairs", slug: "wing-chairs-1" },
          { name: "Lounge Chairs", slug: "lounge-chairs-1" },
          { name: "Slipper Chairs", slug: "slipper-chairs-1" },
          { name: "Barrel Chairs", slug: "barrel-chairs-1" }
        ]
      },
      {
        title: "Settees & Benches",
        items: [
          { name: "Settees", slug: "settees-1" },
          { name: "Benches", slug: "benches-1" },
          { name: "Recamiers", slug: "recamiers-1" }
        ]
      },
      { title: "Ottomans", items: [] },
      {
        title: "Chairs",
        items: [
          { name: "Arm Chairs", slug: "arm-chairs-1" },
          { name: "Rocking Chairs", slug: "rocking-chairs-1" },
          { name: "Folding Chairs", slug: "folding-chairs-1" },
          { name: "Iconic Chairs", slug: "iconic-chairs-1" },
          { name: "Cafe Chairs", slug: "cafe-chairs-1" }
        ]
      },
      { title: "Gaming Chairs", items: [] },
      {
        title: "Stools & Pouffes",
        items: [
          { name: "Foot Stools", slug: "foot-stools-1" },
          { name: "Seating Stools", slug: "seating-stools-1" },
          { name: "Pouffes", slug: "pouffes-1" },
          { name: "Bar Stools", slug: "bar-stools-1" }
        ]
      },
      { title: "Massage Chairs", items: [] },
      { title: "Outdoor Seating", items: [] }
    ]
  },
  {
    name: "Mattresses",
    slug: "mattresses",
    image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800&q=80",
    description: "Quality mattresses designed for a comfortable and restful sleep.",
    groups: [
      {
        title: "King Size Mattresses",
        items: [
          { name: "Foam", slug: "king-foam" },
          { name: "Spring", slug: "king-spring" },
          { name: "Latex", slug: "king-latex" },
          { name: "Coir", slug: "king-coir" },
          { name: "Orthopedic", slug: "king-orthopedic" }
        ]
      },
      {
        title: "Queen Size Mattresses",
        items: [
          { name: "Foam", slug: "queen-foam" },
          { name: "Spring", slug: "queen-spring" },
          { name: "Latex", slug: "queen-latex" },
          { name: "Coir", slug: "queen-coir" },
          { name: "Orthopedic", slug: "queen-orthopedic" }
        ]
      },
      {
        title: "Single Size Mattresses",
        items: [
          { name: "Foam", slug: "single-foam" },
          { name: "Spring", slug: "single-spring" },
          { name: "Latex", slug: "single-latex" },
          { name: "Orthopedic", slug: "single-orthopedic" }
        ]
      },
      {
        title: "Double Size Mattresses",
        items: [
          { name: "Foam", slug: "double-foam" },
          { name: "Spring", slug: "double-spring" },
          { name: "Latex", slug: "double-latex" }
        ]
      },
      { title: "Kids Mattresses", items: [] },
      { title: "Foldable Mattresses", items: [] },
      { title: "Custom Size Mattresses", items: [] },
      {
        title: "Pillows",
        items: [
          { name: "Sleeping Pillows", slug: "sleeping-pillows" },
          { name: "Body Pillows", slug: "body-pillows" },
          { name: "Pregnancy Pillows", slug: "pregnancy-pillows" },
          { name: "Memory Foam Pillows", slug: "memory-foam-pillows" },
          { name: "Travel Pillows", slug: "travel-pillows" }
        ]
      },
      {
        title: "Mattress Protectors",
        items: [
          { name: "King Size", slug: "protector-king" },
          { name: "Queen Size", slug: "protector-queen" },
          { name: "Single Size", slug: "protector-single" }
        ]
      },
      { title: "Mattress Toppers", items: [] }
    ]
  },
  {
    name: "Home Decor",
    slug: "home-decor",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80",
    description: "Elevate your interiors with exquisite home decor pieces.",
    groups: [
      {
        title: "Vases",
        items: [
          { name: "Table Vases", slug: "table-vases" },
          { name: "Floor Vases", slug: "floor-vases" },
          { name: "Glass Vases", slug: "glass-vases" },
          { name: "Ceramic Vases", slug: "ceramic-vases" }
        ]
      },
      {
        title: "Table Decor",
        items: [
          { name: "Decorative Boxes", slug: "decorative-boxes" },
          { name: "Desk Organizers", slug: "desk-organizers" },
          { name: "Bookends", slug: "bookends" },
          { name: "Globes", slug: "globes" }
        ]
      },
      {
        title: "Photo Frames",
        items: [
          { name: "Single Frames", slug: "single-frames" },
          { name: "Collage Frames", slug: "collage-frames" },
          { name: "Clip Photo Frames", slug: "clip-photo-frames" },
          { name: "Table Frames", slug: "table-frames" }
        ]
      },
      {
        title: "Spiritual",
        items: [
          { name: "Mandirs", slug: "mandirs" },
          { name: "Pooja Shelves", slug: "pooja-shelves" },
          { name: "Religious Idols", slug: "religious-idols" },
          { name: "Pooja Thalis", slug: "pooja-thalis" }
        ]
      },
      {
        title: "Wall Decor",
        items: [
          { name: "Metal Wall Art", slug: "metal-wall-art" },
          { name: "Wooden Wall Art", slug: "wooden-wall-art" },
          { name: "Wall Plates & Tiles", slug: "wall-plates-tiles" },
          { name: "Tapestries", slug: "tapestries" }
        ]
      },
      {
        title: "Wall Shelves",
        items: [
          { name: "Floating Shelves", slug: "floating-shelves" },
          { name: "Corner Shelves", slug: "corner-shelves" },
          { name: "Hexagon Shelves", slug: "hexagon-shelves" }
        ]
      },
      {
        title: "Clocks",
        items: [
          { name: "Wall Clocks", slug: "wall-clocks" },
          { name: "Table Clocks", slug: "table-clocks" },
          { name: "Grandfather Clocks", slug: "grandfather-clocks" }
        ]
      },
      {
        title: "Mirrors",
        items: [
          { name: "Wall Mirrors", slug: "wall-mirrors" },
          { name: "Floor Mirrors", slug: "floor-mirrors" },
          { name: "Bathroom Mirrors", slug: "bathroom-mirrors" },
          { name: "Vanity Mirrors", slug: "vanity-mirrors" }
        ]
      },
      {
        title: "Indoor Plants & Pots",
        items: [
          { name: "Artificial Plants", slug: "artificial-plants" },
          { name: "Faux Flowers", slug: "faux-flowers" },
          { name: "Planters", slug: "planters" },
          { name: "Plant Stands", slug: "plant-stands" }
        ]
      },
      {
        title: "Candles & Fragrances",
        items: [
          { name: "Scented Candles", slug: "scented-candles" },
          { name: "Candle Holders", slug: "candle-holders" },
          { name: "Diffusers", slug: "diffusers" },
          { name: "Potpourri", slug: "potpourri" }
        ]
      },
      { title: "Figurines", items: [] },
      { title: "Decorative Jars", items: [] },
      { title: "Accent Furniture", items: [] }
    ]
  },
  {
    name: "Furnishings",
    slug: "furnishings",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
    description: "Dress your home with premium fabrics and cozy layers.",
    groups: [
      {
        title: "Bed Linen",
        items: [
          { name: "Bedsheets", slug: "bedsheets" },
          { name: "Bed Covers", slug: "bed-covers" },
          { name: "Blankets & Quilts", slug: "blankets-quilts" },
          { name: "Duvets", slug: "duvets" },
          { name: "Pillow Covers", slug: "pillow-covers" },
          { name: "Bedding Sets", slug: "bedding-sets" }
        ]
      },
      {
        title: "Bath Linen",
        items: [
          { name: "Towels", slug: "towels" },
          { name: "Bath Mats", slug: "bath-mats" },
          { name: "Shower Curtains", slug: "shower-curtains" },
          { name: "Bathrobes", slug: "bathrobes" }
        ]
      },
      {
        title: "Curtains & Blinds",
        items: [
          { name: "Door Curtains", slug: "door-curtains" },
          { name: "Window Curtains", slug: "window-curtains" },
          { name: "Sheer Curtains", slug: "sheer-curtains" },
          { name: "Blackout Curtains", slug: "blackout-curtains" },
          { name: "Window Blinds", slug: "window-blinds" },
          { name: "Curtain Rods", slug: "curtain-rods" }
        ]
      },
      {
        title: "Cushions & Covers",
        items: [
          { name: "Cushion Covers", slug: "cushion-covers" },
          { name: "Filled Cushions", slug: "filled-cushions" },
          { name: "Floor Cushions", slug: "floor-cushions" },
          { name: "Bolsters", slug: "bolsters" }
        ]
      },
      {
        title: "Carpets & Rugs",
        items: [
          { name: "Hand Tufted Carpets", slug: "hand-tufted-carpets" },
          { name: "Woven Rugs", slug: "woven-rugs" },
          { name: "Shaggy Carpets", slug: "shaggy-carpets" },
          { name: "Dhurries", slug: "dhurries" }
        ]
      },
      {
        title: "Mats",
        items: [
          { name: "Door Mats", slug: "door-mats" },
          { name: "Runner Mats", slug: "runner-mats" },
          { name: "Yoga Mats", slug: "yoga-mats" }
        ]
      },
      {
        title: "Table Linen",
        items: [
          { name: "Table Runners", slug: "table-runners" },
          { name: "Table Mats", slug: "table-mats" },
          { name: "Table Cloths", slug: "table-cloths" },
          { name: "Napkins", slug: "napkins" },
          { name: "Coasters", slug: "coasters" }
        ]
      },
      {
        title: "Sofa & Chair Covers",
        items: [
          { name: "Sofa Covers", slug: "sofa-covers" },
          { name: "Chair Covers", slug: "chair-covers" },
          { name: "Dining Chair Covers", slug: "dining-chair-covers" }
        ]
      }
    ]
  },
  {
    name: "Lamps & Lighting",
    slug: "lamps-lighting",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e9d15?w=800&q=80",
    description: "Illuminate your spaces with our handcrafted lighting collections.",
    groups: [
      {
        title: "Floor Lamps",
        items: [
          { name: "Tripod Lamps", slug: "tripod-lamps" },
          { name: "Arc Lamps", slug: "arc-lamps" },
          { name: "Torchiere", slug: "torchiere" }
        ]
      },
      {
        title: "Table Lamps",
        items: [
          { name: "Study Lamps", slug: "study-lamps" },
          { name: "Bedside Lamps", slug: "bedside-lamps" },
          { name: "Buffet Lamps", slug: "buffet-lamps" }
        ]
      },
      {
        title: "Wall Lights",
        items: [
          { name: "Wall Sconces", slug: "wall-sconces" },
          { name: "Picture Lights", slug: "picture-lights" },
          { name: "Swing Arm Lights", slug: "swing-arm-lights" }
        ]
      },
      {
        title: "Ceiling Lights",
        items: [
          { name: "Chandeliers", slug: "chandeliers" },
          { name: "Pendant Lights", slug: "pendant-lights" },
          { name: "Flush Mounts", slug: "flush-mounts" },
          { name: "Track Lighting", slug: "track-lighting" }
        ]
      },
      {
        title: "Outdoor Lighting",
        items: [
          { name: "Gate Lights", slug: "gate-lights" },
          { name: "Garden Lights", slug: "garden-lights" },
          { name: "Porch Lights", slug: "porch-lights" }
        ]
      },
      {
        title: "Smart Lighting",
        items: [
          { name: "Smart Bulbs", slug: "smart-bulbs" },
          { name: "LED Strips", slug: "led-strips" },
          { name: "Smart Switches", slug: "smart-switches" }
        ]
      },
      {
        title: "Festive Lighting",
        items: [
          { name: "Fairy Lights", slug: "fairy-lights" },
          { name: "String Lights", slug: "string-lights" },
          { name: "Lanterns", slug: "lanterns" }
        ]
      },
      { title: "LED Bulbs", items: [] },
      { title: "Filament Bulbs", items: [] }
    ]
  },
  {
    name: "Kitchen & Dining",
    slug: "kitchen-dining",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
    description: "Everything you need to prep, cook, and serve in style.",
    groups: [
      {
        title: "Cookware",
        items: [
          { name: "Pots & Pans", slug: "pots-pans" },
          { name: "Kadhais", slug: "kadhais" },
          { name: "Tawas", slug: "tawas" },
          { name: "Pressure Cookers", slug: "pressure-cookers" },
          { name: "Cookware Sets", slug: "cookware-sets" }
        ]
      },
      {
        title: "Tableware",
        items: [
          { name: "Dinner Sets", slug: "dinner-sets" },
          { name: "Plates", slug: "plates" },
          { name: "Bowls", slug: "bowls" },
          { name: "Cutlery Sets", slug: "cutlery-sets" }
        ]
      },
      {
        title: "Drinkware",
        items: [
          { name: "Glassware", slug: "glassware" },
          { name: "Mugs & Cups", slug: "mugs-cups" },
          { name: "Water Bottles", slug: "water-bottles" },
          { name: "Jugs & Pitchers", slug: "jugs-pitchers" }
        ]
      },
      {
        title: "Serveware",
        items: [
          { name: "Trays & Platters", slug: "trays-platters" },
          { name: "Serving Bowls", slug: "serving-bowls" },
          { name: "Casseroles", slug: "casseroles" },
          { name: "Serving Spoons", slug: "serving-spoons" }
        ]
      },
      {
        title: "Kitchen Storage",
        items: [
          { name: "Storage Jars", slug: "storage-jars" },
          { name: "Containers", slug: "containers" },
          { name: "Spice Boxes", slug: "spice-boxes" },
          { name: "Lunch Boxes", slug: "lunch-boxes" }
        ]
      },
      {
        title: "Kitchen Tools",
        items: [
          { name: "Chopping Boards", slug: "chopping-boards" },
          { name: "Knives", slug: "knives" },
          { name: "Peelers & Graters", slug: "peelers-graters" },
          { name: "Ladles & Spatulas", slug: "ladles-spatulas" }
        ]
      },
      {
        title: "Bakeware",
        items: [
          { name: "Baking Trays", slug: "baking-trays" },
          { name: "Moulds", slug: "moulds" },
          { name: "Mixing Bowls", slug: "mixing-bowls" }
        ]
      },
      {
        title: "Barware",
        items: [
          { name: "Bar Glasses", slug: "bar-glasses" },
          { name: "Ice Buckets", slug: "ice-buckets" },
          { name: "Cocktail Shakers", slug: "cocktail-shakers" },
          { name: "Wine Racks", slug: "wine-racks" }
        ]
      }
    ]
  },
  {
    name: "Luxury",
    slug: "luxury",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
    description: "Exclusive premium collections for those with discerning taste.",
    groups: [
      {
        title: "Luxury Furniture",
        items: [
          { name: "Premium Sofas", slug: "premium-sofas" },
          { name: "Designer Beds", slug: "designer-beds" },
          { name: "Luxury Dining", slug: "luxury-dining" }
        ]
      },
      {
        title: "Luxury Seating",
        items: [
          { name: "Leather Recliners", slug: "leather-recliners" },
          { name: "Signature Armchairs", slug: "signature-armchairs" },
          { name: "Velvet Settees", slug: "velvet-settees" }
        ]
      },
      {
        title: "Designer Decor",
        items: [
          { name: "Artisanal Vases", slug: "artisanal-vases" },
          { name: "Limited Edition Sculptures", slug: "limited-edition-sculptures" },
          { name: "Crystal Decor", slug: "crystal-decor" }
        ]
      },
      {
        title: "Luxury Lighting",
        items: [
          { name: "Crystal Chandeliers", slug: "crystal-chandeliers" },
          { name: "Designer Floor Lamps", slug: "designer-floor-lamps" },
          { name: "Bespoke Pendants", slug: "bespoke-pendants" }
        ]
      },
      {
        title: "Premium Rugs",
        items: [
          { name: "Persian Carpets", slug: "persian-carpets" },
          { name: "Silk Rugs", slug: "silk-rugs" },
          { name: "Hand-Knotted Rugs", slug: "hand-knotted-rugs" }
        ]
      },
      {
        title: "Exquisite Tableware",
        items: [
          { name: "Fine Bone China", slug: "fine-bone-china" },
          { name: "Silver Serveware", slug: "silver-serveware" },
          { name: "Premium Crystal Glasses", slug: "premium-crystal-glasses" }
        ]
      }
    ]
  },
  {
    name: "Modular",
    slug: "modular",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80",
    description: "Customizable modular solutions for modern homes.",
    groups: [
      {
        title: "Modular Kitchens",
        items: [
          { name: "L-Shaped Kitchens", slug: "l-shaped-kitchens" },
          { name: "U-Shaped Kitchens", slug: "u-shaped-kitchens" },
          { name: "Straight Kitchens", slug: "straight-kitchens" },
          { name: "Island Kitchens", slug: "island-kitchens" }
        ]
      },
      {
        title: "Modular Wardrobes",
        items: [
          { name: "Sliding Wardrobes", slug: "modular-sliding-wardrobes" },
          { name: "Hinge Wardrobes", slug: "modular-hinge-wardrobes" },
          { name: "Walk-in Wardrobes", slug: "walk-in-wardrobes" },
          { name: "L-Shaped Wardrobes", slug: "l-shaped-wardrobes" }
        ]
      },
      {
        title: "Modular TV Units",
        items: [
          { name: "Wall Mounted TV Units", slug: "wall-mounted-tv-units" },
          { name: "Floor Standing TV Units", slug: "floor-standing-tv-units" },
          { name: "Entertainment Centers", slug: "entertainment-centers" }
        ]
      },
      {
        title: "Modular Storage",
        items: [
          { name: "Modular Shoe Racks", slug: "modular-shoe-racks" },
          { name: "Modular Bookshelves", slug: "modular-bookshelves" },
          { name: "Crockery Units", slug: "modular-crockery-units" }
        ]
      },
      {
        title: "Modular Beds",
        items: [
          { name: "Hydraulic Storage Beds", slug: "hydraulic-storage-beds" },
          { name: "Box Storage Beds", slug: "box-storage-beds" },
          { name: "Drawer Storage Beds", slug: "drawer-storage-beds" }
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
