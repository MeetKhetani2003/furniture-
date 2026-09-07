import Link from "next/link";
import { Play } from "lucide-react";

export default function JodhpurCraft() {
  return (
    <section className="bg-brand-dark text-white py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left: Video Placeholder */}
          <div className="w-full lg:w-[55%] relative group cursor-pointer">
             <div className="aspect-[16/9] bg-black rounded-lg overflow-hidden relative">
               <img 
                 src="https://images.unsplash.com/photo-1510680518861-125ddb8bc6b5?w=1200&q=80" 
                 alt="Crafting Furniture" 
                 className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 group-hover:bg-white/30 transition-colors">
                   <Play className="text-white fill-white ml-1" size={24} />
                 </div>
               </div>
             </div>
          </div>

          {/* Right: Content */}
          <div className="w-full lg:w-[45%]">
             <h3 className="text-brand-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
               Our Craftsmanship
             </h3>
             <h2 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl font-bold mb-6 leading-tight">
               Crafted in Jodhpur.<br/>
               Loved Everywhere.
             </h2>
             <p className="text-white/70 text-sm leading-relaxed mb-10 max-w-md">
               From hand-selected solid wood to the final finish, every piece is a result of skilled hands, time-honored techniques, and a passion for perfection.
             </p>

             <div className="grid grid-cols-2 gap-y-8 gap-x-6 mb-10">
               <div>
                 <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center mb-3">
                   {/* Icon Placeholder */}
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
                 </div>
                 <h4 className="font-bold text-sm mb-1">Solid Wood</h4>
                 <p className="text-xs text-white/60">Sustainably sourced premium wood.</p>
               </div>
               <div>
                 <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center mb-3">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                 </div>
                 <h4 className="font-bold text-sm mb-1">Skilled Artisans</h4>
                 <p className="text-xs text-white/60">Generations of expertise in every detail.</p>
               </div>
               <div>
                 <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center mb-3">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                 </div>
                 <h4 className="font-bold text-sm mb-1">Timeless Finish</h4>
                 <p className="text-xs text-white/60">Beautiful today, built for years.</p>
               </div>
               <div>
                 <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center mb-3">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                 </div>
                 <h4 className="font-bold text-sm mb-1">Made to Last</h4>
                 <p className="text-xs text-white/60">Designed to be loved for generations.</p>
               </div>
             </div>

             <Link href="/about/craftsmanship" className="inline-block bg-white text-brand-dark px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-brand-primary transition-colors">
               Discover Our Story &rarr;
             </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
