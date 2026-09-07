import Link from "next/link";

const PROCESS_STEPS = [
  { num: "01", label: "Material", desc: "Sustainably sourced solid woods from trusted forests." },
  { num: "02", label: "Joinery", desc: "Mortise-and-tenon joints for lifetime durability." },
  { num: "03", label: "Shaping", desc: "Hand-carved forms shaped by master craftsmen." },
  { num: "04", label: "Upholstery", desc: "Premium fabrics hand-stitched by artisans." },
  { num: "05", label: "Finish", desc: "Multi-stage hand finishing for a flawless surface." },
];

const PILLARS = [
  { title: "Jodhpur Heritage", desc: "Our craft originates from 500 years of Rajasthani furniture-making tradition." },
  { title: "Artisan Hands", desc: "Every piece is hand-made by skilled craftspeople — no assembly lines." },
  { title: "Sustainable Wood", desc: "We use certified, responsibly sourced timber from managed forests." },
  { title: "Quality Inspection", desc: "Every piece passes a 47-point quality check before leaving our workshop." },
];

export default function CraftsmanshipPage() {
  return (
    <div className="min-h-screen bg-white text-brand-dark">
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-brand-border">
        <h1 className="text-3xl font-[family-name:var(--font-playfair)] font-bold mb-1">Our Craftsmanship</h1>
        <p className="text-sm text-brand-muted">Brand story / Jodhpur / process.</p>
      </div>

      {/* Hero Split */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">

          {/* Left: Workshop Image */}
          <div className="aspect-[4/3] bg-[#6b513b] rounded-md relative flex items-center justify-center overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80"
              alt="Jodhpur workshop"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
            />
            <div className="relative z-10 border border-white/30 px-6 py-3">
              <p className="text-white/80 text-sm italic">Real Jodhpur workshop film</p>
            </div>
          </div>

          {/* Right: Story */}
          <div>
            <span className="text-[10px] text-[#b89c72] font-bold tracking-widest uppercase block mb-4">CRAFTED IN JODHPUR</span>
            <h2 className="text-4xl font-[family-name:var(--font-playfair)] font-bold leading-tight mb-4">
              Made by skilled hands.<br />Designed to last.
            </h2>
            <p className="text-brand-muted text-sm leading-relaxed mb-8">
              Follow the journey from material selection to joinery, sanding, upholstery, finishing, and inspection.
              Every Premius Crafts piece is an heirloom designed to outlast trends and generations.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {PILLARS.map((p) => (
                <div key={p.title}>
                  <h3 className="text-[13px] font-bold text-brand-dark mb-1">{p.title}</h3>
                  <p className="text-[12px] text-brand-muted leading-snug">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-20">
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            {PROCESS_STEPS.map((step) => (
              <div key={step.num} className="shrink-0 w-[200px] border border-brand-border bg-[#f6f5f2] p-8 aspect-square flex flex-col items-center justify-center text-center hover:border-brand-dark transition-colors group cursor-pointer">
                <span className="text-[10px] text-[#b89c72] font-bold tracking-widest block mb-2">{step.num}</span>
                <h3 className="text-[14px] font-bold text-brand-dark mb-2 group-hover:text-brand-primary transition-colors">{step.label}</h3>
                <p className="text-[11px] text-brand-muted leading-snug hidden group-hover:block">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Materials Link */}
        <div className="bg-[#f6f5f2] rounded-md p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold mb-2">Explore Our Materials</h2>
            <p className="text-brand-muted text-sm max-w-md">
              From Sheesham and Mango wood to premium upholstery fabrics — learn about every material we use.
            </p>
          </div>
          <Link
            href="/materials"
            className="shrink-0 px-10 py-4 border border-brand-dark text-brand-dark font-bold text-[11px] uppercase tracking-widest hover:bg-brand-dark hover:text-white transition-colors"
          >
            MATERIALS LIBRARY →
          </Link>
        </div>
      </div>
    </div>
  );
}
