import Link from "next/link";

export default function CustomDesignSplit() {
  return (
    <section className="bg-brand-bg py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Custom Furniture Left */}
          <div className="bg-[#fcfbf9] border border-brand-border/40 p-8 lg:p-12 flex flex-col justify-between group overflow-hidden relative">
            <div className="relative z-10 max-w-sm mb-12">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary mb-3">
                Customize Your Furniture
              </h3>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold mb-4 text-brand-dark">
                Made for your space.<br/>
                Your furniture. Your way.
              </h2>
              
              <div className="flex gap-6 my-8">
                 <div className="text-center">
                   <div className="w-8 h-8 mx-auto border-b-2 border-brand-dark mb-2"></div>
                   <span className="text-[9px] uppercase tracking-widest text-brand-muted font-bold">Size</span>
                 </div>
                 <div className="text-center">
                   <div className="w-8 h-8 mx-auto border-b-2 border-brand-dark mb-2"></div>
                   <span className="text-[9px] uppercase tracking-widest text-brand-muted font-bold">Fabric</span>
                 </div>
                 <div className="text-center">
                   <div className="w-8 h-8 mx-auto border-b-2 border-brand-dark mb-2"></div>
                   <span className="text-[9px] uppercase tracking-widest text-brand-muted font-bold">Wood</span>
                 </div>
                 <div className="text-center">
                   <div className="w-8 h-8 mx-auto border-b-2 border-brand-dark mb-2"></div>
                   <span className="text-[9px] uppercase tracking-widest text-brand-muted font-bold">Configuration</span>
                 </div>
              </div>

              <Link href="/custom-furniture" className="inline-block bg-brand-dark text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-brand-primary transition-colors">
                Start Customizing &rarr;
              </Link>
            </div>
            
            {/* Sofa Image overlapping bottom right */}
            <div className="absolute right-0 bottom-0 w-[60%] lg:w-[70%] transform translate-x-12 translate-y-12 group-hover:translate-x-8 group-hover:translate-y-8 transition-transform duration-500">
               <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80" alt="Custom Sofa" className="w-full drop-shadow-2xl rounded-tl-3xl" />
               {/* Split line mockup */}
               <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.2)]"></div>
            </div>
          </div>

          {/* Design Services Right */}
          <div className="bg-[#EFECE6] border border-brand-border/40 p-8 lg:p-12 flex flex-col justify-between group overflow-hidden relative">
             <div className="relative z-10 max-w-sm mb-12">
               <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary mb-3">
                 Complimentary Design Service
               </h3>
               <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold mb-4 text-brand-dark">
                 Not sure where to start?<br/>
                 We'll help you create a space you love.
               </h2>

               <ul className="space-y-4 my-8 text-xs text-brand-text font-medium">
                 <li className="flex gap-3">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-primary mt-0.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                   <span><strong>Online Consultation</strong><br/><span className="text-brand-muted">Expert advice from anywhere.</span></span>
                 </li>
                 <li className="flex gap-3">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-primary mt-0.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
                   <span><strong>Room Planning</strong><br/><span className="text-brand-muted">Layout solutions and 3D mockups.</span></span>
                 </li>
                 <li className="flex gap-3">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-primary mt-0.5"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
                   <span><strong>Furniture Selection</strong><br/><span className="text-brand-muted">Curated pieces for your space and budget.</span></span>
                 </li>
               </ul>

               <Link href="/design-services/book" className="inline-block bg-brand-dark text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-brand-primary transition-colors">
                 Book A Free Consultation &rarr;
               </Link>
             </div>

             <div className="absolute right-0 bottom-0 w-[55%] lg:w-[65%] transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500">
               <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80" alt="Design Services" className="w-full drop-shadow-2xl rounded-tl-xl" />
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
