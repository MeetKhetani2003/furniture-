import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";

export default function PromoSplit() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-12">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.2fr] gap-6">
          
          {/* Left Panel: New Arrivals */}
          <div className="bg-[#FAF9F6] rounded-xl p-8 lg:p-12 flex flex-col relative overflow-hidden">
            <div className="mb-12">
              <span className="text-[10px] font-bold tracking-widest text-[#a38a58] uppercase mb-3 block font-[family-name:var(--font-inter)]">
                Just In
              </span>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-4xl text-brand-text mb-4">
                New Arrivals
              </h2>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed max-w-xs font-[family-name:var(--font-inter)]">
                Fresh designs.<br />Timeless living.
              </p>
            </div>

            {/* Faint Architectural Graphic in Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[120%] pointer-events-none opacity-20">
               <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="200" cy="100" r="80" stroke="#a38a58" strokeWidth="0.5" />
                  <circle cx="200" cy="100" r="120" stroke="#a38a58" strokeWidth="0.5" strokeDasharray="4 4" />
                  <line x1="0" y1="100" x2="400" y2="100" stroke="#a38a58" strokeWidth="0.5" />
                  <line x1="200" y1="0" x2="200" y2="200" stroke="#a38a58" strokeWidth="0.5" />
                  <rect x="140" y="60" width="120" height="80" stroke="#a38a58" strokeWidth="0.5" />
               </svg>
            </div>

            {/* Product Cards Row */}
            <div className="flex gap-4 mt-auto overflow-x-auto hide-scrollbar pb-4 relative z-10">
              {/* Product 1 */}
              <div className="flex-shrink-0 w-32 bg-white rounded-lg p-3 shadow-sm border border-brand-border/30">
                <div className="aspect-square bg-[#f4f2ec] rounded mb-3 flex items-center justify-center p-2">
                  <img src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=200&q=80" alt="Vento Lounge Chair" className="object-contain mix-blend-multiply" />
                </div>
                <h4 className="text-[10px] font-semibold text-brand-text truncate font-[family-name:var(--font-inter)]">Vento Lounge Chair</h4>
                <p className="text-[10px] font-bold text-brand-text mt-0.5">$549</p>
              </div>
              
              {/* Product 2 */}
              <div className="flex-shrink-0 w-32 bg-white rounded-lg p-3 shadow-sm border border-brand-border/30">
                <div className="aspect-square bg-[#f4f2ec] rounded mb-3 flex items-center justify-center p-2">
                  <img src="https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=200&q=80" alt="Sienna Side Table" className="object-contain mix-blend-multiply" />
                </div>
                <h4 className="text-[10px] font-semibold text-brand-text truncate font-[family-name:var(--font-inter)]">Sienna Side Table</h4>
                <p className="text-[10px] font-bold text-brand-text mt-0.5">$279</p>
              </div>

              {/* Product 3 */}
              <div className="flex-shrink-0 w-32 bg-white rounded-lg p-3 shadow-sm border border-brand-border/30">
                <div className="aspect-square bg-[#f4f2ec] rounded mb-3 flex items-center justify-center p-2">
                  <img src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=200&q=80" alt="Artisan Console" className="object-contain mix-blend-multiply" />
                </div>
                <h4 className="text-[10px] font-semibold text-brand-text truncate font-[family-name:var(--font-inter)]">Artisan Console</h4>
                <p className="text-[10px] font-bold text-brand-text mt-0.5">$799</p>
              </div>

              {/* Product 4 */}
              <div className="flex-shrink-0 w-32 bg-white rounded-lg p-3 shadow-sm border border-brand-border/30">
                <div className="aspect-square bg-[#f4f2ec] rounded mb-3 flex items-center justify-center p-2">
                  <img src="https://images.unsplash.com/photo-1506898667547-42e22a46e125?w=200&q=80" alt="Luka Dining Chair" className="object-contain mix-blend-multiply" />
                </div>
                <h4 className="text-[10px] font-semibold text-brand-text truncate font-[family-name:var(--font-inter)]">Luka Dining Chair</h4>
                <p className="text-[10px] font-bold text-brand-text mt-0.5">$349</p>
              </div>
            </div>
          </div>

          {/* Right Panel: Shop the Look */}
          <div className="bg-[#FAF9F6] rounded-xl overflow-hidden flex flex-col md:flex-row relative">
            
            {/* Content Area */}
            <div className="p-8 lg:p-12 flex flex-col w-full md:w-5/12 lg:w-1/2 relative z-10 bg-gradient-to-r from-[#FAF9F6] via-[#FAF9F6] to-transparent">
              <span className="text-[10px] font-bold tracking-widest text-[#a38a58] uppercase mb-3 block font-[family-name:var(--font-inter)]">
                Shop The Look
              </span>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-4xl text-brand-text mb-4 leading-tight">
                Warm Neutrals.<br />Modern Comfort.
              </h2>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed max-w-xs mb-8 font-[family-name:var(--font-inter)]">
                A perfect blend of natural textures, warm woods and soft neutrals.
              </p>

              {/* Mini Thumbnails */}
              <div className="flex flex-wrap gap-2 mb-8 bg-white/80 backdrop-blur p-2 rounded-lg border border-white max-w-max">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 bg-[#f4f2ec] rounded flex items-center justify-center p-1 border border-brand-border/20">
                     <img src={`https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=100&q=80&sig=${i}`} alt="item" className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                ))}
              </div>

              {/* Button */}
              <Link href="/rooms/warm-neutrals" className="mt-auto inline-flex items-center justify-center bg-brand-dark text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-none hover:bg-black transition-colors">
                Shop This Room - $3,847
              </Link>
            </div>

            {/* Image Area */}
            <div className="w-full md:w-7/12 lg:w-1/2 h-64 md:h-auto absolute md:relative top-0 right-0 bottom-0 z-0">
               <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6] to-transparent w-32 left-0 z-10 hidden md:block"></div>
               <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6] to-transparent h-32 top-0 z-10 block md:hidden"></div>
               <img 
                 src="/images/warm_neutrals_room.jpg" 
                 alt="Warm Neutrals Room" 
                 className="w-full h-full object-cover"
               />
               
               {/* Hotspots */}
               <button className="absolute top-[40%] right-[30%] w-6 h-6 sm:w-8 sm:h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-20">
                 <Plus size={16} className="text-brand-dark" />
               </button>
               <button className="absolute bottom-[25%] left-[45%] w-6 h-6 sm:w-8 sm:h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-20">
                 <Plus size={16} className="text-brand-dark" />
               </button>
               <button className="absolute bottom-[30%] right-[15%] w-6 h-6 sm:w-8 sm:h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-20">
                 <Plus size={16} className="text-brand-dark" />
               </button>
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
}
