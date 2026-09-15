import Link from "next/link";
import { Play, Sparkles, Users, Infinity, Axe } from "lucide-react";

export default function CraftsmanshipSection() {
  return (
    <section className="py-16 lg:py-24 bg-white border-t border-brand-border/30">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Image / Video Thumbnail */}
          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1618218168350-6e7c81151b64?w=800&q=80" 
              alt="Craftsmanship Video" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-colors group-hover:bg-black/40">
              <button className="w-16 h-16 rounded-full border-2 border-white text-white flex items-center justify-center transition-transform hover:scale-110">
                <Play fill="white" size={24} className="ml-1" />
              </button>
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-widest text-[#a38a58] uppercase mb-3 block font-[family-name:var(--font-inter)]">
              Our Craftsmanship
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-4xl text-brand-text mb-4 leading-tight">
              Crafted in Jodhpur.<br />Loved Everywhere.
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed max-w-md mb-8 font-[family-name:var(--font-inter)]">
              From handpicked solid wood to the final finish, every piece is a result of skilled hands, time-honored techniques, and a passion for perfection.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
              <div className="flex flex-col items-center text-center">
                <Axe size={24} strokeWidth={1.5} className="text-[#a38a58] mb-3" />
                <h4 className="text-[10px] font-bold text-brand-text uppercase tracking-widest mb-1.5 font-[family-name:var(--font-inter)]">Solid Wood</h4>
                <p className="text-[10px] text-brand-muted leading-relaxed">Sustainably sourced premium wood.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Users size={24} strokeWidth={1.5} className="text-[#a38a58] mb-3" />
                <h4 className="text-[10px] font-bold text-brand-text uppercase tracking-widest mb-1.5 font-[family-name:var(--font-inter)]">Skilled Artisans</h4>
                <p className="text-[10px] text-brand-muted leading-relaxed">Generations of expertise in every detail.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Sparkles size={24} strokeWidth={1.5} className="text-[#a38a58] mb-3" />
                <h4 className="text-[10px] font-bold text-brand-text uppercase tracking-widest mb-1.5 font-[family-name:var(--font-inter)]">Timeless Finish</h4>
                <p className="text-[10px] text-brand-muted leading-relaxed">Beautiful today, built for years.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Infinity size={24} strokeWidth={1.5} className="text-[#a38a58] mb-3" />
                <h4 className="text-[10px] font-bold text-brand-text uppercase tracking-widest mb-1.5 font-[family-name:var(--font-inter)]">Made to Last</h4>
                <p className="text-[10px] text-brand-muted leading-relaxed">Designed to be loved for generations.</p>
              </div>
            </div>

            <Link href="/about" className="inline-flex items-center justify-center bg-brand-dark text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-none hover:bg-black transition-colors self-start">
              Discover Our Story &rarr;
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
