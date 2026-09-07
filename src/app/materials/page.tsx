import Link from "next/link";

const MATERIAL_CATEGORIES = [
  { slug: "wood", label: "WOOD", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80" },
  { slug: "fabrics", label: "FABRICS", image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80" },
  { slug: "leather", label: "LEATHER", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80" },
  { slug: "finishes", label: "FINISHES", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80" },
];

const FEATURED_MATERIALS = [
  { name: "Sheesham Wood", desc: "Rich grain and durable character.", slug: "sheesham-wood", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&q=80" },
  { name: "Mango Wood", desc: "Warm tone and expressive texture.", slug: "mango-wood", image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400&q=80" },
  { name: "Performance Fabric", desc: "Easy-care upholstery for everyday living.", slug: "performance-fabric", image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&q=80" },
  { name: "Natural Linen", desc: "Deep warmth and textural richness.", slug: "natural-linen", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80" },
];

export default function MaterialsPage() {
  return (
    <div className="min-h-screen bg-white text-brand-dark">
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-brand-border">
        <h1 className="text-3xl font-[family-name:var(--font-playfair)] font-bold mb-1">Materials Library</h1>
        <p className="text-sm text-brand-muted">Education + confidence + SEO for woods, fabrics and finishes.</p>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Category Grid */}
        <div className="mb-16">
          <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-brand-dark mb-6">Explore materials</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
            {MATERIAL_CATEGORIES.map((cat) => (
              <Link key={cat.slug} href={`/materials/${cat.slug}`} className="group shrink-0">
                <div className="w-[200px] h-[200px] bg-[#f4f2ec] border border-brand-border flex items-center justify-center relative overflow-hidden hover:border-brand-dark transition-colors">
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-30 group-hover:opacity-40 transition-opacity"
                  />
                  <span className="relative z-10 text-[13px] font-bold tracking-widest uppercase text-brand-dark">{cat.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Materials */}
        <div className="mb-20">
          <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-brand-dark mb-6">Featured materials</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_MATERIALS.map((mat) => (
              <div key={mat.slug} className="border border-brand-border/40 p-6 hover:border-brand-dark transition-colors group">
                <div className="aspect-square bg-[#f4f2ec] rounded mb-4 overflow-hidden">
                  <img
                    src={mat.image}
                    alt={mat.name}
                    className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] font-bold text-brand-dark mb-1">{mat.name}</h3>
                <p className="text-[12px] text-brand-muted mb-3">{mat.desc}</p>
                <Link
                  href={`/materials/${mat.slug}`}
                  className="text-[10px] font-bold tracking-widest uppercase text-brand-dark underline underline-offset-4 hover:text-brand-primary transition-colors"
                >
                  VIEW MATERIAL →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Cross-link to Craftsmanship */}
        <div className="bg-[#f6f5f2] rounded-md p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold mb-2">How we use these materials</h2>
            <p className="text-sm text-brand-muted">See how we transform raw timber and fabric into furniture that lasts generations.</p>
          </div>
          <Link
            href="/craftsmanship"
            className="shrink-0 px-8 py-4 border border-brand-dark text-brand-dark font-bold text-[11px] uppercase tracking-widest hover:bg-brand-dark hover:text-white transition-colors"
          >
            OUR CRAFTSMANSHIP →
          </Link>
        </div>
      </div>
    </div>
  );
}
