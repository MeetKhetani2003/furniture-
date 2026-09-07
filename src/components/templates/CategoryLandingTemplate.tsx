import Link from "next/link";

export default function CategoryLandingTemplate({ categorySlug }: { categorySlug: string }) {
  // Mock data mapping based on the slug. In a real CMS, this would be fetched dynamically.
  const data: Record<string, any> = {
    "living-room": {
      title: "Living Room",
      description: "Discover our premium living room furniture collection.",
      heroImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80",
      subcategories: [
        { name: "Sofas", slug: "/living-room/sofas", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80" },
        { name: "Chairs", slug: "/living-room/chairs", image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80" },
        { name: "Coffee Tables", slug: "/living-room/coffee-tables", image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=600&q=80" },
        { name: "TV & Media Units", slug: "/living-room/tv-units", image: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=600&q=80" },
      ]
    },
    "bedroom": {
      title: "Bedroom",
      description: "Create your perfect sanctuary with our luxury bedroom collection.",
      heroImage: "https://images.unsplash.com/photo-1522771731478-44eb9f30b9bb?w=1600&q=80",
      subcategories: [
        { name: "Beds", slug: "/bedroom/beds", image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&q=80" },
        { name: "Nightstands", slug: "/bedroom/nightstands", image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=600&q=80" },
        { name: "Wardrobes", slug: "/bedroom/wardrobes", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80" },
        { name: "Dressers", slug: "/bedroom/dressers", image: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=600&q=80" },
      ]
    },
  };

  const categoryData = data[categorySlug] || {
    title: categorySlug.replace("-", " ").toUpperCase(),
    description: "Explore our curated collection of premium furniture.",
    heroImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80",
    subcategories: []
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl lg:text-4xl font-[family-name:var(--font-playfair)] font-bold text-brand-dark mb-2">
          {categoryData.title}
        </h1>
        <p className="text-sm text-brand-muted">
          Category landing page: editorial discovery + commerce.
        </p>
      </div>

      {/* Cinematic Hero Section */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <section className="relative w-full aspect-[21/9] min-h-[400px] flex items-center justify-center overflow-hidden rounded-md bg-[#6b513b]">
          <div className="absolute inset-0 z-0">
            <img src={categoryData.heroImage} alt={categoryData.title} className="w-full h-full object-cover mix-blend-overlay opacity-60" />
          </div>
          <div className="absolute inset-0 z-10 p-8 flex flex-col justify-center max-w-4xl">
            <span className="text-[10px] text-white/80 font-bold tracking-widest uppercase mb-4">
              {categoryData.title}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-playfair)] text-white mb-4 leading-tight">
              Comfort, beautifully considered.
            </h2>
            <p className="text-white/80 text-sm max-w-md">
              Discover sofas, chairs, tables and storage designed for modern living.
            </p>
          </div>
        </section>
      </div>

      {/* Subcategories Grid */}
      {categoryData.subcategories.length > 0 && (
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-brand-dark mb-8">Shop {categoryData.title}</h2>
          <div className="flex overflow-x-auto pb-4 gap-4 hide-scrollbar snap-x">
            {categoryData.subcategories.map((sub: any) => (
              <Link key={sub.slug} href={sub.slug} className="group shrink-0 snap-start">
                <div className="w-[180px] h-[180px] bg-[#ebe7df] rounded-md border border-brand-border/40 flex items-center justify-center relative hover:border-brand-primary transition-colors">
                  <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 border-t border-brand-border/60"></div>
                  <h3 className="relative z-10 text-[15px] font-[family-name:var(--font-playfair)] font-bold text-brand-dark bg-[#ebe7df] px-3">{sub.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Editorial Blocks */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-[#f6f5f2] rounded-md p-10 lg:p-16">
          <div className="max-w-2xl">
            <span className="text-[10px] text-[#b89c72] font-bold tracking-widest uppercase mb-4 block">
              DESIGN STORY
            </span>
            <h2 className="text-3xl lg:text-4xl font-[family-name:var(--font-playfair)] font-bold text-brand-dark mb-4">
              How to build a calm {categoryData.title.toLowerCase()}
            </h2>
            <p className="text-brand-muted text-sm leading-relaxed mb-6">
              Room planning, materials and proportions - plus the pieces to complete the look.
            </p>
            <Link href="/rooms" className="text-[11px] font-bold text-brand-dark uppercase tracking-widest border-b border-brand-dark pb-0.5 hover:text-brand-primary transition-colors">
              READ THE GUIDE
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
