"use client";

import Link from "next/link";
import { Package, Store, RotateCcw } from "lucide-react";

export default function OfferStraps() {
  return (
    <div className="w-full mt-4 mb-12 flex flex-col gap-8">
      
      {/* Trust Bar */}
      <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-12 py-3 border-b border-brand-border/50">
        <div className="flex items-center gap-2 lg:gap-3 text-brand-text">
          <Package size={22} strokeWidth={1.5} className="text-brand-primary" />
          <span className="text-[12px] lg:text-[13px] font-bold uppercase tracking-widest font-[family-name:var(--font-inter)]">11 Million Happy Deliveries</span>
        </div>
        <div className="hidden lg:block w-px h-5 bg-brand-border"></div>
        <div className="flex items-center gap-2 lg:gap-3 text-brand-text">
          <Store size={22} strokeWidth={1.5} className="text-brand-primary" />
          <span className="text-[12px] lg:text-[13px] font-bold uppercase tracking-widest font-[family-name:var(--font-inter)]">150+ Design Studios</span>
        </div>
        <div className="hidden lg:block w-px h-5 bg-brand-border"></div>
        <div className="flex items-center gap-2 lg:gap-3 text-brand-text">
          <RotateCcw size={22} strokeWidth={1.5} className="text-brand-primary" />
          <span className="text-[12px] lg:text-[13px] font-bold uppercase tracking-widest font-[family-name:var(--font-inter)]">7 Day Easy Return Policy</span>
        </div>
      </div>

      {/* Gold/Ebony Promo Banner */}
      <Link href="/register" className="block relative w-full overflow-hidden rounded-2xl bg-brand-dark border border-brand-primary/20 text-white shadow-md">
        <div className="flex flex-col md:flex-row items-center justify-between px-8 lg:px-16 py-6 lg:py-7 relative z-10">
          <div className="flex items-center gap-3">
             <span className="font-[family-name:var(--font-heading)] italic text-xl lg:text-2xl font-light tracking-wide text-brand-accent">Exclusive Invitation:</span>
             <span className="text-base lg:text-xl font-semibold tracking-wide">Get Upto Rs.1,500 Off</span>
             <span className="text-xs lg:text-sm opacity-60 hidden sm:block font-[family-name:var(--font-inter)]">On Your First Order</span>
          </div>
          <div className="flex items-center gap-8 mt-3 md:mt-0">
            <span className="font-bold uppercase tracking-widest text-xs text-brand-primary hover:text-white transition-colors">Sign Up Now &rarr;</span>
            <span className="text-[9px] opacity-40 hidden lg:block">T&C Apply</span>
          </div>
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-48 bg-brand-primary/5 transform -skew-x-12 -translate-x-12"></div>
      </Link>

      {/* 3-Column Promo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1 */}
        <Link href="/category/office-chairs" className="group relative aspect-[21/9] md:aspect-[16/7] overflow-hidden bg-brand-secondary rounded-2xl block border border-brand-border/40 hover:border-brand-primary/25 transition-all">
          <img 
            src="https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80" 
            alt="Office Chairs" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-brand-dark/30 group-hover:bg-brand-dark/45 transition-colors"></div>
          <div className="absolute top-0 left-0 p-5 lg:p-7 text-white max-w-[70%]">
            <h3 className="text-xs lg:text-sm font-bold uppercase tracking-widest leading-snug">India's <span className="italic font-[family-name:var(--font-heading)] lowercase font-normal text-brand-accent text-sm lg:text-base">8 Hour</span> Chair &rarr;</h3>
          </div>
        </Link>

        {/* Column 2 */}
        <Link href="/category/beds" className="group relative aspect-[21/9] md:aspect-[16/7] overflow-hidden bg-brand-secondary rounded-2xl block border border-brand-border/40 hover:border-brand-primary/25 transition-all">
          <img 
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80" 
            alt="Beds and Wardrobes" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-brand-dark/35 transition-colors"></div>
          <div className="absolute top-0 left-0 p-5 lg:p-7 text-white max-w-[80%]">
            <h3 className="text-xs lg:text-sm font-bold uppercase tracking-widest leading-snug">Beds & Storage Solutions &rarr;</h3>
          </div>
        </Link>

        {/* Column 3 */}
        <Link href="/category/study-tables" className="group relative aspect-[21/9] md:aspect-[16/7] overflow-hidden bg-brand-secondary rounded-2xl block border border-brand-border/40 hover:border-brand-primary/25 transition-all">
          <img 
            src="https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80" 
            alt="Study Tables" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-brand-dark/15 group-hover:bg-brand-dark/30 transition-colors"></div>
          <div className="absolute top-0 left-0 p-5 lg:p-7 text-white max-w-[80%]">
            <h3 className="text-xs lg:text-sm font-bold uppercase tracking-widest leading-snug">Study Tables & Book Cases &rarr;</h3>
          </div>
        </Link>
      </div>

    </div>
  );
}
