import Link from "next/link";

const ARTICLES: Record<string, any> = {
  "how-to-choose-a-sofa": {
    title: "How to Choose the Perfect Sofa",
    category: "BUYING GUIDE",
    readTime: "9 MIN READ",
    heroImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80",
    intro: "A practical guide to size, seating, materials, comfort and room planning.",
    steps: [
      "Start with your room dimensions",
      "Decide how many people you need to seat",
      "Choose the right depth and comfort",
      "Compare fabrics and materials",
    ],
    body: `
Choosing the right sofa is one of the most important decisions you'll make for your living room. It anchors the space, defines the style, and shapes how you spend your time at home.

## Start With Room Dimensions

Before anything else, measure your room. A sofa that is too large will make the room feel cramped; one that is too small will look lost. As a general rule, your sofa should occupy no more than two-thirds of the wall it sits against.

## Consider Seating Capacity

Think about how you actually use your living room day-to-day. Do you entertain often? A large sectional might be ideal. For a couple or small family, a 3-seater provides the right balance of comfort and proportion.

## Depth and Comfort

Seat depth determines how you sit. A deep sofa (over 90cm) encourages lounging; a shallower one (under 85cm) promotes an upright, conversational posture. Try both before committing.

## Fabric and Material

Your fabric choice determines the longevity and feel of your sofa. Velvet adds luxury but requires care; performance fabrics handle daily life; leather ages beautifully but feels cool in winter.

At Premius Crafts, every fabric is lab-tested for 50,000+ rub cycles, and our solid wood frames carry a 10-year structural warranty.
    `.trim(),
    shopProducts: [
      { name: "Verona 3-Seater Sofa", price: 129900, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80", slug: "verona-sofa" },
      { name: "Luca Accent Chair", price: 45000, image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&q=80", slug: "luca-chair" },
    ],
    relatedLinks: [
      { label: "Shop Sofas", href: "/living-room/sofas" },
      { label: "Sofa Configurator", href: "/custom-furniture/configure" },
      { label: "Materials Library", href: "/materials" },
    ],
  },
};

const DEFAULT_ARTICLE = ARTICLES["how-to-choose-a-sofa"];

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES[slug] || DEFAULT_ARTICLE;

  const paragraphs = article.body.split("\n\n");

  return (
    <div className="min-h-screen bg-white text-brand-dark">
      {/* Hero */}
      <div className="w-full aspect-[21/6] min-h-[260px] bg-[#f4f2ec] relative flex items-center justify-center overflow-hidden">
        <img
          src={article.heroImage}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-40"
        />
        <div className="relative z-10 border border-brand-border/30 bg-white/60 backdrop-blur-sm px-8 py-4 text-center">
          <p className="text-xs text-brand-muted italic">Editorial article hero</p>
        </div>
      </div>

      {/* Article Meta */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-brand-border">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/journal" className="text-[10px] font-bold tracking-widest uppercase text-[#b89c72] hover:text-brand-primary transition-colors">
            {article.category}
          </Link>
          <span className="text-brand-border">·</span>
          <span className="text-[10px] font-bold tracking-widest uppercase text-brand-muted">{article.readTime}</span>
        </div>
        <h1 className="text-3xl lg:text-5xl font-[family-name:var(--font-playfair)] font-bold mb-3 leading-tight">
          {article.title}
        </h1>
        <p className="text-brand-muted text-sm max-w-2xl">{article.intro}</p>
      </div>

      {/* Content + Sidebar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-[1fr_300px] gap-12">

          {/* Article Body */}
          <article className="max-w-2xl">
            {/* Steps Callout */}
            <div className="bg-[#f6f5f2] border-l-4 border-[#b89c72] p-6 mb-8">
              <p className="text-[11px] font-bold tracking-widest uppercase text-[#b89c72] mb-3">IN THIS GUIDE</p>
              <ol className="space-y-2">
                {article.steps.map((step: string, i: number) => (
                  <li key={i} className="text-sm text-brand-dark font-medium flex items-start gap-2">
                    <span className="text-[#b89c72] font-bold shrink-0">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Body Content */}
            <div className="prose max-w-none text-[15px] leading-relaxed text-brand-dark space-y-6">
              {paragraphs.map((para: string, i: number) => {
                if (para.startsWith("## ")) {
                  return (
                    <h2 key={i} className="text-xl font-[family-name:var(--font-playfair)] font-bold mt-10 mb-3">
                      {para.replace("## ", "")}
                    </h2>
                  );
                }
                return (
                  <p key={i} className="text-[15px] text-brand-dark leading-relaxed">
                    {para}
                  </p>
                );
              })}
            </div>

            {/* Related Links */}
            <div className="mt-12 pt-8 border-t border-brand-border">
              <p className="text-[11px] font-bold tracking-widest uppercase text-brand-muted mb-4">RELATED</p>
              <div className="flex flex-wrap gap-3">
                {article.relatedLinks.map((link: any) => (
                  <Link key={link.href} href={link.href}
                    className="px-5 py-2 border border-brand-border text-[12px] font-semibold text-brand-dark hover:border-brand-dark transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar: Shop the Guide */}
          <aside className="lg:sticky lg:top-24 self-start">
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#b89c72] mb-4">SHOP THE GUIDE</p>
            <div className="space-y-4">
              {article.shopProducts.map((p: any) => (
                <Link key={p.slug} href={`/product/${p.slug}`} className="group flex gap-4 border border-brand-border/40 p-4 hover:border-brand-dark transition-colors">
                  <div className="w-16 h-16 bg-[#f4f2ec] shrink-0 flex items-center justify-center overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-contain mix-blend-multiply p-1 group-hover:scale-105 transition-transform" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-brand-dark group-hover:text-brand-primary transition-colors leading-snug mb-1">
                      {p.name}
                    </h4>
                    <p className="text-[12px] font-bold">₹{p.price.toLocaleString("en-IN")}</p>
                    <div className="flex">
                      {[1,2,3,4,5].map(s => <span key={s} className="text-amber-400 text-[10px]">★</span>)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
