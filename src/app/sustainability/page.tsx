import { Leaf, TreePine, Droplets, ShieldCheck, Wind } from "lucide-react";

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&q=80"
          alt="Lush green forest"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
          <p className="text-xs font-bold tracking-widest uppercase mb-4">Our Commitment</p>
          <h1 className="text-5xl md:text-6xl font-[family-name:var(--font-playfair)] font-bold mb-6">
            Design that respects the Earth.
          </h1>
          <p className="text-lg text-white/90 md:text-xl max-w-2xl mx-auto">
            At Premius Crafts, true luxury doesn't cost the earth. We are committed to sustainable sourcing, non-toxic finishes, and carbon-neutral shipping.
          </p>
        </div>
      </div>

      {/* Philosophy Statement */}
      <div className="py-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Leaf size={40} className="mx-auto text-brand-primary mb-8" />
        <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold max-w-3xl mx-auto leading-tight mb-6">
          "We believe that a beautiful home should not come at the expense of a beautiful planet."
        </h2>
        <p className="text-brand-muted max-w-2xl mx-auto">
          From the forests where our wood is harvested to the workshops where our craftsmen shape it, sustainability is woven into every step of our process. We build furniture meant to be passed down through generations, effectively keeping it out of landfills.
        </p>
      </div>

      {/* Core Pillars */}
      <div className="bg-brand-secondary/30 py-24 border-y border-brand-border/40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl border border-brand-border/50 text-center">
              <TreePine size={32} className="mx-auto text-[#6b513b] mb-4" />
              <h3 className="text-lg font-bold mb-3">FSC-Certified Wood</h3>
              <p className="text-sm text-brand-muted">
                100% of our solid wood is sourced from responsibly managed forests that provide environmental, social and economic benefits.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-brand-border/50 text-center">
              <Droplets size={32} className="mx-auto text-[#6b513b] mb-4" />
              <h3 className="text-lg font-bold mb-3">Non-Toxic Finishes</h3>
              <p className="text-sm text-brand-muted">
                We use zero-VOC and low-VOC water-based finishes to protect your indoor air quality and the health of our craftsmen.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-brand-border/50 text-center">
              <ShieldCheck size={32} className="mx-auto text-[#6b513b] mb-4" />
              <h3 className="text-lg font-bold mb-3">Built For Life</h3>
              <p className="text-sm text-brand-muted">
                The most sustainable furniture is the kind you never have to replace. We use traditional joinery for generational durability.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-brand-border/50 text-center">
              <Wind size={32} className="mx-auto text-[#6b513b] mb-4" />
              <h3 className="text-lg font-bold mb-3">Carbon Neutral Delivery</h3>
              <p className="text-sm text-brand-muted">
                We offset 100% of the carbon emissions from our shipping and delivery processes through certified reforestation projects.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Material Spotlight */}
      <div className="py-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[11px] font-bold tracking-widest uppercase text-brand-primary mb-4 block">Materials Matter</span>
            <h2 className="text-4xl font-[family-name:var(--font-playfair)] font-bold mb-6">Reclaimed & Repurposed.</h2>
            <p className="text-brand-muted mb-6 leading-relaxed">
              We frequently utilize reclaimed teak and mango wood from dismantled vintage structures across India. This not only gives old wood a beautiful second life, but also prevents the need to harvest new timber.
            </p>
            <p className="text-brand-muted leading-relaxed">
              Our fabrics are predominantly natural fibers—organic cotton, Belgian linen, and cruelty-free wools—dyed using low-impact, AZO-free dyes that prevent harmful chemicals from entering local water systems.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1581428982868-e410dd047a90?w=600&q=80" alt="Wood texture" className="w-full h-64 object-cover rounded-lg" />
            <img src="https://images.unsplash.com/photo-1620241608701-94ef138c7ea9?w=600&q=80" alt="Linen fabric" className="w-full h-64 object-cover rounded-lg mt-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
