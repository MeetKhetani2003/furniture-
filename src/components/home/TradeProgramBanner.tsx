import Link from "next/link";
import { Paintbrush2, Building2, Hotel, Boxes, Check } from "lucide-react";

export default function TradeProgramBanner() {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-12">
        <div className="bg-[#2a2925] rounded-xl overflow-hidden relative flex flex-col lg:flex-row items-center justify-between p-8 lg:p-12">
          
          {/* Background image overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
            <img 
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80" 
              alt="Restaurant background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2a2925] via-[#2a2925]/90 to-transparent"></div>
          </div>

          {/* Left: Titles */}
          <div className="flex flex-col relative z-10 w-full lg:w-1/4 mb-8 lg:mb-0">
            <span className="text-[10px] font-bold tracking-widest text-white/70 uppercase mb-3 block font-[family-name:var(--font-inter)]">
              Trade Program (B2B)
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl lg:text-3xl text-white leading-snug">
              Designed for Professionals.<br />Built for Partnerships.
            </h2>
          </div>

          {/* Middle: Audiences */}
          <div className="flex flex-wrap justify-between md:justify-start md:gap-12 relative z-10 w-full lg:w-2/5 mb-8 lg:mb-0">
            <div className="flex flex-col items-center mb-4 md:mb-0">
              <Paintbrush2 size={24} strokeWidth={1} className="text-white mb-2" />
              <span className="text-[10px] font-semibold text-white/90 text-center font-[family-name:var(--font-inter)]">Interior Designers</span>
              <span className="text-[8px] text-white/50 text-center uppercase tracking-wider">Dedicated Support</span>
            </div>
            <div className="flex flex-col items-center mb-4 md:mb-0">
              <Building2 size={24} strokeWidth={1} className="text-white mb-2" />
              <span className="text-[10px] font-semibold text-white/90 text-center font-[family-name:var(--font-inter)]">Architects</span>
              <span className="text-[8px] text-white/50 text-center uppercase tracking-wider">Project Assistance</span>
            </div>
            <div className="flex flex-col items-center">
              <Hotel size={24} strokeWidth={1} className="text-white mb-2" />
              <span className="text-[10px] font-semibold text-white/90 text-center font-[family-name:var(--font-inter)]">Hotels & Resorts</span>
              <span className="text-[8px] text-white/50 text-center uppercase tracking-wider">Custom Solutions</span>
            </div>
            <div className="flex flex-col items-center">
              <Boxes size={24} strokeWidth={1} className="text-white mb-2" />
              <span className="text-[10px] font-semibold text-white/90 text-center font-[family-name:var(--font-inter)]">Bulk Orders</span>
              <span className="text-[8px] text-white/50 text-center uppercase tracking-wider">Special Pricing</span>
            </div>
          </div>

          {/* Right: Checklist & CTA */}
          <div className="flex flex-col w-full lg:w-auto relative z-10">
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-6">
              <div className="flex items-center gap-2">
                <Check size={12} strokeWidth={3} className="text-[#c4a66a]" />
                <span className="text-[10px] text-white/80 font-[family-name:var(--font-inter)]">Trade pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={12} strokeWidth={3} className="text-[#c4a66a]" />
                <span className="text-[10px] text-white/80 font-[family-name:var(--font-inter)]">Helpful Samples</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={12} strokeWidth={3} className="text-[#c4a66a]" />
                <span className="text-[10px] text-white/80 font-[family-name:var(--font-inter)]">Volume orders</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={12} strokeWidth={3} className="text-[#c4a66a]" />
                <span className="text-[10px] text-white/80 font-[family-name:var(--font-inter)]">Design Macros</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={12} strokeWidth={3} className="text-[#c4a66a]" />
                <span className="text-[10px] text-white/80 font-[family-name:var(--font-inter)]">Custom manufacturing</span>
              </div>
            </div>
            
            <Link href="/trade" className="inline-flex items-center justify-center bg-black text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-none hover:bg-white hover:text-black transition-colors self-start border border-white/10">
              Join Trade Program &rarr;
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
