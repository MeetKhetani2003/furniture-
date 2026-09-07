"use client";

import { useState } from "react";
import Link from "next/link";
import { Filter, ChevronDown } from "lucide-react";
import ProductCard from "@/components/common/ProductCard";
import QuickViewModal from "@/components/product/QuickViewModal";

export default function PLPTemplate({ categorySlug, subCategorySlug }: { categorySlug: string, subCategorySlug?: string }) {
  const [showFilters, setShowFilters] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<any | null>(null);

  // Mock product data
  const products = [
    { id: "1", name: "Modern Velvet Sofa", price: 89900, originalPrice: 110000, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80", slug: "modern-velvet-sofa", badge: "NEW" },
    { id: "2", name: "Solid Wood Dining Table", price: 45000, image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=600&q=80", slug: "solid-wood-dining-table" },
    { id: "3", name: "Leather Lounge Chair", price: 35000, image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80", slug: "leather-lounge-chair", badge: "BESTSELLER" },
    { id: "4", name: "Minimalist Coffee Table", price: 18000, image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=600&q=80", slug: "minimalist-coffee-table" },
    { id: "5", name: "Upholstered Queen Bed", price: 65000, image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&q=80", slug: "upholstered-queen-bed" },
    { id: "6", name: "Contemporary Floor Lamp", price: 12000, image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80", slug: "contemporary-floor-lamp", badge: "SALE" },
  ];

  const title = subCategorySlug ? `${subCategorySlug.replace("-", " ")}` : categorySlug.replace("-", " ");

  return (
    <div className="w-full bg-white text-brand-text">
      {/* Breadcrumbs */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="text-xs text-brand-muted uppercase tracking-wider flex items-center gap-2">
          <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/${categorySlug}`} className="hover:text-brand-primary transition-colors">{categorySlug.replace("-", " ")}</Link>
          {subCategorySlug && (
            <>
              <span>/</span>
              <span className="text-brand-text font-semibold">{subCategorySlug.replace("-", " ")}</span>
            </>
          )}
        </nav>
      </div>

      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-4 text-left border-b border-brand-border">
        <h1 className="text-3xl lg:text-5xl font-[family-name:var(--font-playfair)] font-bold capitalize mb-2">{title}</h1>
        <p className="text-brand-muted text-sm mb-4">
          Product Listing Page (PLP): high-intent discovery.
        </p>
        <p className="text-brand-muted text-xs font-semibold">{products.length} products</p>
      </div>

      {/* Controls: Filter Toggle & Sort */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between lg:justify-end border-b border-brand-border sticky top-[64px] lg:top-[46px] bg-white z-30">
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex lg:hidden items-center gap-2 text-sm font-semibold hover:text-brand-primary transition-colors"
        >
          <Filter size={18} />
          {showFilters ? "HIDE FILTERS" : "SHOW FILTERS"}
        </button>
        <div className="flex items-center gap-2 text-sm">
          <span className="hidden sm:inline text-brand-muted">Sort by:</span>
          <button className="font-semibold flex items-center gap-1 hover:text-brand-primary transition-colors">
            Featured <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-start gap-8">
        
        {/* Filters Sidebar */}
        <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-[240px] shrink-0 lg:pr-6 lg:sticky lg:top-[120px] lg:h-[calc(100vh-120px)] lg:overflow-y-auto hide-scrollbar`}>
          <div className="space-y-4">
            <h2 className="text-[11px] font-bold tracking-widest uppercase mb-4 text-brand-dark">FILTERS</h2>
            {[
              { id: 'availability', label: 'Availability' },
              { id: 'price', label: 'Price' },
              { id: 'seating', label: 'Seating Capacity' },
              { id: 'material', label: 'Material' },
              { id: 'fabric', label: 'Fabric' },
              { id: 'wood', label: 'Wood' },
              { id: 'color', label: 'Color' },
              { id: 'width', label: 'Width' },
              { id: 'style', label: 'Style' },
              { id: 'collection', label: 'Collection' },
              { id: 'rating', label: 'Rating' }
            ].map(filter => (
              <div key={filter.id} className="border border-brand-border/40 bg-[#fbfbf9] px-4 py-3 flex justify-between items-center cursor-pointer hover:border-brand-primary/40 transition-colors">
                <span className="text-[13px] font-semibold text-brand-dark">{filter.label}</span>
                <span className="text-[10px] text-brand-muted">[]</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Product Grid */}
        <div className={`flex-1 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8`}>
          {products.map((product) => (
             <div key={product.id} className="relative group">
                <ProductCard product={product} />
                {/* Quick View Trigger Overlay */}
                <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5 pointer-events-none">
                    <button 
                      onClick={(e) => { e.preventDefault(); setQuickViewProduct(product); }}
                      className="bg-white/90 backdrop-blur-sm text-brand-dark px-6 py-2 text-xs font-bold tracking-widest rounded shadow-lg pointer-events-auto hover:bg-brand-primary hover:text-white transition-colors"
                    >
                      QUICK VIEW
                    </button>
                </div>
             </div>
          ))}
        </div>
      </div>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}
