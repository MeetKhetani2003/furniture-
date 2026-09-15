import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function InspirationAndNewsletter() {
  return (
    <section className="py-8 bg-white border-b border-brand-border/30">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Card: Inspiration & Journal */}
          <div className="bg-[#FAF9F6] rounded-xl overflow-hidden p-8 lg:p-10 flex flex-col justify-between">
            <div className="mb-6">
              <span className="text-[10px] font-bold tracking-widest text-[#a38a58] uppercase mb-3 block font-[family-name:var(--font-inter)]">
                Inspiration & Journal
              </span>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl lg:text-3xl text-brand-text leading-tight max-w-sm">
                Ideas, tips and trends for beautiful living.
              </h2>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mt-auto">
              <div className="aspect-[4/3] bg-gray-200 rounded overflow-hidden group relative">
                <img src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&q=80" alt="Blog 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              </div>
              <div className="aspect-[4/3] bg-gray-200 rounded overflow-hidden group relative">
                <img src="https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400&q=80" alt="Blog 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              </div>
              <div className="aspect-[4/3] bg-gray-200 rounded overflow-hidden group relative">
                <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&q=80" alt="Blog 3" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              </div>
            </div>
          </div>

          {/* Right Card: Stay Inspired Newsletter */}
          <div className="bg-[#2a2925] rounded-xl overflow-hidden p-8 lg:p-10 flex flex-col justify-center relative">
            <div className="relative z-10 w-full md:w-2/3 lg:w-3/4">
              <span className="text-[10px] font-bold tracking-widest text-[#c4a66a] uppercase mb-3 block font-[family-name:var(--font-inter)]">
                Stay Inspired
              </span>
              <p className="text-sm sm:text-base text-white/90 mb-8 font-[family-name:var(--font-inter)] leading-relaxed">
                New collections, inspiration and exclusive offers, straight to your inbox.
              </p>
              
              <form className="flex w-full">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-grow bg-transparent border-b border-white/30 text-white placeholder:text-white/40 px-0 py-3 text-sm focus:outline-none focus:border-white transition-colors rounded-none"
                  required
                />
                <button type="submit" className="border-b border-white/30 px-4 py-3 text-white hover:text-[#c4a66a] hover:border-[#c4a66a] transition-colors flex items-center justify-center">
                  <ArrowRight size={18} strokeWidth={1.5} />
                </button>
              </form>
            </div>
            
            <div className="absolute right-0 bottom-0 w-1/3 h-[80%] pointer-events-none hidden md:block">
               <img 
                 src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&q=80" 
                 alt="Accent Chair" 
                 className="w-full h-full object-contain object-right-bottom mix-blend-lighten opacity-40 grayscale"
               />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
