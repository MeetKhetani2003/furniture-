import Link from "next/link";
import { Maximize, Scissors, TreePine, PaintBucket, LayoutTemplate, MessageSquare, Ruler, Armchair } from "lucide-react";

export default function CustomizationAndDesign() {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Card: Customize */}
          <div className="bg-[#FAF9F6] rounded-xl overflow-hidden flex flex-col relative h-[500px]">
            <div className="p-10 lg:p-12 z-10 relative">
              <span className="text-[10px] font-bold tracking-widest text-[#a38a58] uppercase mb-3 block font-[family-name:var(--font-inter)]">
                Customize Your Furniture
              </span>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl text-brand-text mb-8 leading-tight">
                Made for your space.<br />Your furniture. Your way.
              </h2>
              
              <div className="flex gap-6 mb-10">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full border border-brand-border/40 flex items-center justify-center bg-white mb-2">
                    <Maximize size={16} className="text-brand-text" />
                  </div>
                  <span className="text-[9px] font-semibold text-brand-muted uppercase tracking-widest">Size</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full border border-brand-border/40 flex items-center justify-center bg-white mb-2">
                    <Scissors size={16} className="text-brand-text" />
                  </div>
                  <span className="text-[9px] font-semibold text-brand-muted uppercase tracking-widest">Fabric</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full border border-brand-border/40 flex items-center justify-center bg-white mb-2">
                    <TreePine size={16} className="text-brand-text" />
                  </div>
                  <span className="text-[9px] font-semibold text-brand-muted uppercase tracking-widest">Wood</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full border border-brand-border/40 flex items-center justify-center bg-white mb-2">
                    <PaintBucket size={16} className="text-brand-text" />
                  </div>
                  <span className="text-[9px] font-semibold text-brand-muted uppercase tracking-widest">Finish</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full border border-brand-border/40 flex items-center justify-center bg-white mb-2">
                    <LayoutTemplate size={16} className="text-brand-text" />
                  </div>
                  <span className="text-[9px] font-semibold text-brand-muted uppercase tracking-widest">Config</span>
                </div>
              </div>

              <Link href="/customize" className="inline-flex items-center justify-center bg-brand-dark text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-none hover:bg-black transition-colors">
                Start Customizing &rarr;
              </Link>
            </div>
            
            <div className="absolute bottom-0 right-0 w-[80%] h-[60%] flex items-end justify-end pointer-events-none">
              <img 
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80" 
                alt="Sofa" 
                className="object-contain object-right-bottom mix-blend-multiply w-full h-full opacity-90 grayscale-[0.2]"
              />
            </div>
          </div>

          {/* Right Card: Design Service */}
          <div className="bg-[#F5F7F5] rounded-xl overflow-hidden flex flex-col md:flex-row relative h-[500px]">
            <div className="p-10 lg:p-12 w-full md:w-3/5 z-10 flex flex-col justify-center">
              <span className="text-[10px] font-bold tracking-widest text-[#a38a58] uppercase mb-3 block font-[family-name:var(--font-inter)]">
                Complimentary Design Service
              </span>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl text-brand-text mb-3 leading-tight">
                Not sure where to start?
              </h2>
              <p className="text-xs sm:text-sm text-brand-muted mb-8 font-[family-name:var(--font-inter)]">
                We'll help you create a space you love.
              </p>

              <div className="flex flex-col gap-5 mb-8">
                <div className="flex items-start gap-4">
                  <MessageSquare size={20} strokeWidth={1.5} className="text-[#a38a58] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-[11px] font-bold text-brand-text uppercase tracking-widest mb-1">Online Consultation</h4>
                    <p className="text-[10px] text-brand-muted leading-relaxed">Meet a designer from anywhere.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Ruler size={20} strokeWidth={1.5} className="text-[#a38a58] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-[11px] font-bold text-brand-text uppercase tracking-widest mb-1">Room Planning</h4>
                    <p className="text-[10px] text-brand-muted leading-relaxed">Send your dimensions and photos.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Armchair size={20} strokeWidth={1.5} className="text-[#a38a58] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-[11px] font-bold text-brand-text uppercase tracking-widest mb-1">Furniture Selection</h4>
                    <p className="text-[10px] text-brand-muted leading-relaxed">We'll recommend pieces for your space and budget.</p>
                  </div>
                </div>
              </div>

              <Link href="/design-service" className="inline-flex items-center justify-center bg-brand-dark text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-none hover:bg-black transition-colors self-start mt-auto">
                Book A Free Consultation &rarr;
              </Link>
            </div>

            <div className="absolute right-0 top-0 bottom-0 w-2/5 hidden md:block">
               <div className="absolute inset-0 bg-gradient-to-r from-[#F5F7F5] via-[#F5F7F5]/50 to-transparent z-10 w-24 left-0"></div>
               <img 
                 src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80" 
                 alt="Design Consultation" 
                 className="w-full h-full object-cover"
               />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
