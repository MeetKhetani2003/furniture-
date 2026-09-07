import Link from "next/link";

export default function CustomFurniturePage() {
  return (
    <div className="min-h-screen bg-white text-brand-dark">
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-brand-border">
        <h1 className="text-3xl font-[family-name:var(--font-playfair)] font-bold mb-1">Custom Furniture</h1>
        <p className="text-sm text-brand-muted">Entry page for made-to-order and product customization.</p>
      </div>

      {/* Hero Split */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Left: Lifestyle Image */}
          <div className="aspect-[4/3] bg-[#6b513b] rounded-md overflow-hidden relative flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80"
              alt="Custom furniture lifestyle"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
            />
            <div className="relative z-10 text-center">
              <div className="border border-white/30 px-6 py-3">
                <p className="text-white/80 text-sm italic">Custom furniture lifestyle / craft</p>
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div>
            <span className="text-[10px] text-[#b89c72] font-bold tracking-widest uppercase block mb-4">CUSTOM FURNITURE</span>
            <h2 className="text-4xl font-[family-name:var(--font-playfair)] font-bold leading-tight mb-3">
              Made for your space.<br />Built around you.
            </h2>
            <p className="text-brand-muted text-sm mb-8">
              Choose dimensions, fabric, wood, finish and configuration.
            </p>

            {/* Steps */}
            <div className="space-y-0 mb-8">
              {[
                "1. Choose a piece",
                "2. Configure",
                "3. Review price & lead time",
                "4. Order / Request quote",
              ].map((step) => (
                <div key={step} className="border border-brand-border px-5 py-4 flex items-center justify-between cursor-pointer hover:border-brand-dark transition-colors">
                  <span className="text-[13px] font-semibold text-brand-dark">{step}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/custom-furniture/configure" className="px-8 py-3 bg-brand-dark text-white text-[11px] font-bold tracking-widest uppercase hover:bg-brand-dark/90 transition-colors">
                START CUSTOMISING
              </Link>
              <Link href="/design-services" className="px-8 py-3 border border-brand-dark text-brand-dark text-[11px] font-bold tracking-widest uppercase hover:bg-brand-dark hover:text-white transition-colors">
                BOOK DESIGN HELP
              </Link>
            </div>
          </div>
        </div>

        {/* Customisation Options */}
        <div className="mt-20">
          <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-brand-dark mb-6">Customisation options</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "SIZE", description: "2, 3, or 4 seater. Custom dimensions available." },
              { label: "FABRIC", description: "Over 40 premium fabrics in a range of textures." },
              { label: "WOOD", description: "Walnut, Oak, Black — sustainably sourced." },
              { label: "FINISH", description: "Natural, Smoked, or Dark finish options." },
            ].map((option) => (
              <div key={option.label} className="border border-brand-border p-8 flex flex-col items-center justify-center aspect-square text-center hover:border-brand-dark transition-colors cursor-pointer group">
                <h3 className="text-[13px] font-bold tracking-widest uppercase text-brand-dark mb-2 group-hover:text-brand-primary transition-colors">{option.label}</h3>
                <p className="text-xs text-brand-muted leading-relaxed hidden group-hover:block transition-all">{option.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <Link href="/custom-furniture/configure" className="text-[11px] font-bold tracking-widest uppercase text-brand-dark underline underline-offset-4 hover:text-brand-primary transition-colors">
            View Materials
          </Link>
          <Link href="/custom-furniture/configure" className="text-[11px] font-bold tracking-widest uppercase text-brand-dark underline underline-offset-4 hover:text-brand-primary transition-colors">
            Custom Project Enquiry
          </Link>
          <Link href="/trade" className="text-[11px] font-bold tracking-widest uppercase text-brand-dark underline underline-offset-4 hover:text-brand-primary transition-colors">
            Trade / B2B
          </Link>
        </div>
      </div>
    </div>
  );
}
