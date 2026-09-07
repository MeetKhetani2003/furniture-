import Link from "next/link";

interface CollectionData {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  heroColor: string;
  heroImage: string;
  products: { id: string; name: string; price: number; image: string }[];
}

const COLLECTIONS: Record<string, CollectionData> = {
  "aravalli": {
    slug: "aravalli",
    title: "The Aravalli Collection",
    tagline: "Inspired by nature. Designed for life.",
    description: "Sculptural forms, tactile woods and quiet materials.",
    heroColor: "#6b513b",
    heroImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80",
    products: [
      { id: "1", name: "Aravalli Piece 1", price: 89900, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80" },
      { id: "2", name: "Aravalli Piece 2", price: 45000, image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80" },
      { id: "3", name: "Aravalli Piece 3", price: 35000, image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=600&q=80" },
      { id: "4", name: "Aravalli Piece 4", price: 18000, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80" },
      { id: "5", name: "Aravalli Piece 5", price: 65000, image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80" },
    ]
  },
  "solid-wood": {
    slug: "solid-wood",
    title: "Solid Wood Essentials",
    tagline: "Crafted to last generations.",
    description: "Every grain tells a story. Built by hand in Jodhpur.",
    heroColor: "#4a3728",
    heroImage: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600&q=80",
    products: [
      { id: "1", name: "Solid Oak Table", price: 89900, image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=600&q=80" },
      { id: "2", name: "Walnut Side Table", price: 28000, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80" },
      { id: "3", name: "Teak Lounge Chair", price: 52000, image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80" },
    ]
  }
};

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const data = COLLECTIONS[params.slug] || COLLECTIONS["aravalli"];

  return (
    <div className="min-h-screen bg-white text-brand-dark">
      {/* Page Header */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-brand-border">
        <h1 className="text-3xl font-[family-name:var(--font-playfair)] font-bold mb-1">{data.title}</h1>
        <p className="text-sm text-brand-muted">Editorial collection / seasonal campaign template.</p>
      </div>

      {/* Campaign Hero */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div
          className="relative w-full aspect-[21/9] min-h-[360px] rounded-md overflow-hidden flex items-center"
          style={{ backgroundColor: data.heroColor }}
        >
          <img
            src={data.heroImage}
            alt={data.title}
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
          />
          <div className="relative z-10 p-10 lg:p-16 max-w-2xl">
            <span className="text-[10px] text-white/70 font-bold tracking-widest uppercase mb-4 block">
              {data.title.toUpperCase()}
            </span>
            <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] font-bold text-white leading-tight mb-4">
              {data.tagline}
            </h2>
            <p className="text-white/80 text-sm mb-8">{data.description}</p>
            <Link
              href={`/collections/${data.slug}`}
              className="inline-block px-8 py-3 border border-white text-white text-[11px] font-bold tracking-widest uppercase hover:bg-white hover:text-brand-dark transition-colors"
            >
              SHOP COLLECTION
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Pieces */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-brand-dark mb-8">Featured pieces</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar">
          {data.products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group shrink-0 w-[220px]">
              <div className="relative aspect-square bg-[#f4f2ec] rounded-md overflow-hidden mb-3">
                <button className="absolute top-3 right-3 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform text-brand-muted hover:text-red-400">
                  ♡
                </button>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply p-6 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h4 className="text-sm font-[family-name:var(--font-playfair)] font-bold text-brand-dark group-hover:text-brand-primary transition-colors">
                {product.name}
              </h4>
              <p className="text-sm font-bold mt-1">₹{product.price.toLocaleString("en-IN")}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Links */}
      <div className="bg-[#f6f5f2] py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-6 justify-center">
          {["Shop the Room", "Collection Narrative", "Materials", "Journal"].map((link) => (
            <Link key={link} href="/collections" className="text-[11px] font-bold tracking-widest uppercase text-brand-dark underline underline-offset-4 hover:text-brand-primary transition-colors">
              {link}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
