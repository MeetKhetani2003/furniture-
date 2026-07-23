"use client";

import Link from "next/link";
import { Package, Store, RotateCcw } from "lucide-react";

export default function OfferStraps() {
  return (
    <div className="w-full mt-2 mb-10 flex flex-col gap-6">
      
      {/* Trust Bar */}
      <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-10 py-2 border-b border-gray-200">
        <div className="flex items-center gap-2 lg:gap-3 text-brand-text">
          <Package size={24} strokeWidth={1.5} className="text-gray-600" />
          <span className="text-[13px] lg:text-[15px] font-bold">11 Million Happy Deliveries</span>
        </div>
        <div className="hidden lg:block w-px h-6 bg-gray-300"></div>
        <div className="flex items-center gap-2 lg:gap-3 text-brand-text">
          <Store size={24} strokeWidth={1.5} className="text-gray-600" />
          <span className="text-[13px] lg:text-[15px] font-bold">150+ Stores Across 100+ Cities</span>
        </div>
        <div className="hidden lg:block w-px h-6 bg-gray-300"></div>
        <div className="flex items-center gap-2 lg:gap-3 text-brand-text">
          <RotateCcw size={24} strokeWidth={1.5} className="text-gray-600" />
          <span className="text-[13px] lg:text-[15px] font-bold">7 Day Easy Return Policy</span>
        </div>
      </div>

      {/* Orange Promo Banner */}
      <Link href="/register" className="block relative w-full overflow-hidden rounded-sm bg-gradient-to-r from-[#d95e00] to-[#802c01] text-white">
        <div className="flex flex-col md:flex-row items-center justify-between px-6 lg:px-12 py-5 lg:py-6 relative z-10">
          <div className="flex items-center gap-3">
             <span className="font-[family-name:var(--font-playfair)] italic text-2xl lg:text-3xl font-medium tracking-wide">Now Serving:</span>
             <span className="text-lg lg:text-2xl font-semibold">Get Upto Rs.1,500 Off</span>
             <span className="text-sm lg:text-lg opacity-90 hidden sm:block">On Your First Order</span>
          </div>
          <div className="flex items-center gap-8 mt-3 md:mt-0">
            <span className="font-bold underline underline-offset-4 decoration-2 hover:text-gray-200 transition-colors text-lg">Sign Up Now &gt;</span>
            <span className="text-[9px] opacity-60 hidden lg:block">T&C Apply</span>
          </div>
        </div>
        {/* Background Decorative Graphic (optional placeholder for the tray image) */}
        <div className="absolute left-0 top-0 bottom-0 w-48 bg-black/10 transform -skew-x-12 -translate-x-12"></div>
      </Link>

      {/* 3-Column Promo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
        {/* Column 1 */}
        <Link href="/category/office-chairs" className="group relative aspect-[21/9] md:aspect-[16/7] overflow-hidden bg-gray-100 block">
          <img 
            src="https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80" 
            alt="Office Chairs" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
          <div className="absolute top-0 left-0 p-4 lg:p-6 text-white max-w-[60%]">
            <h3 className="text-sm lg:text-base font-semibold leading-snug">India's <span className="italic font-[family-name:var(--font-playfair)]">8 Hour</span> Chair &rarr;</h3>
          </div>
        </Link>

        {/* Column 2 */}
        <Link href="/category/beds" className="group relative aspect-[21/9] md:aspect-[16/7] overflow-hidden bg-gray-100 block">
          <img 
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80" 
            alt="Beds and Wardrobes" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
          <div className="absolute top-0 left-0 p-4 lg:p-6 text-white max-w-[70%]">
            <h3 className="text-sm lg:text-base font-semibold leading-snug">Beds, Wardrobes & Storage Solutions &rarr;</h3>
          </div>
        </Link>

        {/* Column 3 */}
        <Link href="/category/study-tables" className="group relative aspect-[21/9] md:aspect-[16/7] overflow-hidden bg-gray-100 block">
          <img 
            src="https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80" 
            alt="Study Tables" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors"></div>
          <div className="absolute top-0 left-0 p-4 lg:p-6 text-brand-text max-w-[70%]">
            <h3 className="text-sm lg:text-base font-bold leading-snug">Study Tables, Chairs & Book Cases</h3>
          </div>
        </Link>
      </div>

    </div>
  );
}
