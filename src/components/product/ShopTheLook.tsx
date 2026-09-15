"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/lib/stores/cartStore";
import { showToast } from "@/components/common/Toaster";
import PriceDisplay from "@/components/common/PriceDisplay";

// Mock data for the room scene
const ROOM_IMAGE = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop";

const MOCK_HOTSPOTS = [
  {
    id: "sofa-1",
    x: 45, // percentage
    y: 60,
    product: {
      id: "sofa-1",
      name: "Plush Velvet Sofa",
      price: 85000,
      mrp: 95000,
      discountPercent: 11,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
      slug: "plush-velvet-sofa"
    }
  },
  {
    id: "table-1",
    x: 65,
    y: 80,
    product: {
      id: "table-1",
      name: "Marble Coffee Table",
      price: 32000,
      mrp: 32000,
      discountPercent: 0,
      image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=600&q=80",
      slug: "marble-coffee-table"
    }
  },
  {
    id: "lamp-1",
    x: 85,
    y: 40,
    product: {
      id: "lamp-1",
      name: "Brass Floor Lamp",
      price: 18000,
      mrp: 22000,
      discountPercent: 18,
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80",
      slug: "brass-floor-lamp"
    }
  },
  {
    id: "rug-1",
    x: 35,
    y: 85,
    product: {
      id: "rug-1",
      name: "Woven Wool Rug",
      price: 24000,
      mrp: 28000,
      discountPercent: 14,
      image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=600&q=80",
      slug: "woven-wool-rug"
    }
  }
];

export default function ShopTheLook() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(MOCK_HOTSPOTS.map(h => h.id)));
  const [activeMobileId, setActiveMobileId] = useState<string | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleMobileClick = (id: string) => {
    if (window.innerWidth < 1024) {
      setActiveMobileId(id);
    } else {
      toggleSelection(id);
    }
  };

  const addSelectedToCart = () => {
    if (selectedIds.size === 0) {
      showToast("Please select at least one item", "info");
      return;
    }

    const selectedProducts = MOCK_HOTSPOTS.filter(h => selectedIds.has(h.id)).map(h => h.product);
    
    selectedProducts.forEach(p => {
      addItem({
        productId: p.id,
        name: p.name,
        slug: p.slug,
        price: p.price,
        mrp: p.mrp,
        image: p.image,
      });
    });

    showToast(`Added ${selectedProducts.length} items to cart!`, "success");
    setSelectedIds(new Set());
  };

  const activeMobileProduct = MOCK_HOTSPOTS.find(h => h.id === activeMobileId)?.product;

  return (
    <section className="py-16 border-t border-brand-border/40 bg-[#FAF9F7]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10 text-left">
          <h2 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-playfair)] text-brand-dark mb-2">
            Shop the Look
          </h2>
          <p className="text-sm text-brand-muted max-w-2xl">
            Interactive room commerce: hotspots + multi-add. Select items directly from the scene.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 bg-white rounded-3xl overflow-hidden shadow-sm border border-brand-border/40">
          
          {/* LEFT: INTERACTIVE MEDIA */}
          <div className="w-full lg:w-[65%] relative aspect-[4/3] lg:aspect-auto min-h-[400px] lg:min-h-[600px] bg-brand-secondary overflow-hidden group">
            <img 
              src={ROOM_IMAGE} 
              alt="Room Scene" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 transition-opacity duration-500"></div>

            {/* HOTSPOTS */}
            {MOCK_HOTSPOTS.map((hotspot) => {
              const isSelected = selectedIds.has(hotspot.id);
              
              return (
                <div 
                  key={hotspot.id}
                  className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ top: `${hotspot.y}%`, left: `${hotspot.x}%` }}
                >
                  <button
                    onClick={() => handleMobileClick(hotspot.id)}
                    className={`relative w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border-2 hover:scale-110
                      ${isSelected 
                        ? "bg-brand-primary border-brand-primary text-brand-dark" 
                        : "bg-white border-white text-brand-dark hover:bg-brand-secondary"
                      }`}
                  >
                    <AnimatePresence mode="wait">
                      {isSelected ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 90 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check size={18} strokeWidth={2.5} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="plus"
                          initial={{ scale: 0, rotate: 90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: -90 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Plus size={18} strokeWidth={2.5} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {/* Ping effect for unselected */}
                    {!isSelected && (
                      <span className="absolute inset-0 rounded-full bg-white/60 animate-ping opacity-75 duration-1000"></span>
                    )}
                  </button>
                  
                  {/* Tooltip (Desktop Only) */}
                  <div className="hidden lg:block absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white/95 backdrop-blur-sm shadow-xl rounded-lg p-2 w-48 opacity-0 pointer-events-none group-hover/hotspot:opacity-100 transition-opacity z-20">
                    <p className="text-xs font-bold text-brand-dark truncate">{hotspot.product.name}</p>
                    <p className="text-[10px] text-brand-muted">₹{hotspot.product.price.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: PRODUCT LIST & ADD TO CART */}
          <div className="w-full lg:w-[35%] flex flex-col p-6 lg:p-8">
            <h3 className="text-xl font-bold font-[family-name:var(--font-playfair)] text-brand-dark mb-1">
              Warm Neutrals
            </h3>
            <p className="text-sm text-brand-muted mb-6 pb-6 border-b border-brand-border/40">
              Modern Comfort
            </p>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4 no-scrollbar mb-6">
              {MOCK_HOTSPOTS.map((hotspot) => {
                const isSelected = selectedIds.has(hotspot.id);
                const p = hotspot.product;
                
                return (
                  <div 
                    key={hotspot.id}
                    onClick={() => toggleSelection(hotspot.id)}
                    className={`flex items-center gap-4 p-3 rounded-xl border transition-all cursor-pointer hover:shadow-sm
                      ${isSelected 
                        ? "border-brand-primary bg-brand-primary/5" 
                        : "border-brand-border/40 hover:border-brand-border bg-white"
                      }`}
                  >
                    <div className="w-16 h-16 bg-[#f4f2ec] rounded-lg overflow-hidden shrink-0">
                      <img src={p.image} alt={p.name} className="w-full h-full object-contain mix-blend-multiply p-1" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-brand-dark truncate">{p.name}</h4>
                      <PriceDisplay price={p.price} mrp={p.mrp} discountPercent={p.discountPercent} size="sm" />
                    </div>
                    
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors
                      ${isSelected ? "bg-brand-primary border-brand-primary text-brand-dark" : "border-brand-border text-transparent"}
                    `}>
                      <Check size={14} strokeWidth={3} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-auto pt-4 border-t border-brand-border/40">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold text-brand-dark">{selectedIds.size} Items Selected</span>
                <span className="text-lg font-bold text-brand-dark">
                  ₹{MOCK_HOTSPOTS.filter(h => selectedIds.has(h.id)).reduce((sum, h) => sum + h.product.price, 0).toLocaleString('en-IN')}
                </span>
              </div>
              
              <button
                onClick={addSelectedToCart}
                disabled={selectedIds.size === 0}
                className="w-full py-4 bg-brand-dark text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-primary hover:text-brand-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={16} /> Add Selected To Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE BOTTOM SHEET FOR HOTSPOT CLICK */}
      <AnimatePresence>
        {activeMobileProduct && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveMobileId(null)}
              className="fixed inset-0 bg-black/40 z-[100] lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[101] p-6 pb-10 lg:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
            >
              <button 
                onClick={() => setActiveMobileId(null)}
                className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full"
              >
                <X size={16} />
              </button>
              
              <div className="flex gap-4 mb-6">
                <div className="w-24 h-24 bg-[#f4f2ec] rounded-xl overflow-hidden shrink-0">
                  <img src={activeMobileProduct.image} alt={activeMobileProduct.name} className="w-full h-full object-contain mix-blend-multiply p-2" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-lg font-bold text-brand-dark mb-1">{activeMobileProduct.name}</h3>
                  <PriceDisplay price={activeMobileProduct.price} mrp={activeMobileProduct.mrp} discountPercent={activeMobileProduct.discountPercent} size="md" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    const isSelected = selectedIds.has(activeMobileProduct.id);
                    toggleSelection(activeMobileProduct.id);
                    setActiveMobileId(null);
                  }}
                  className={`py-3 rounded-lg font-bold text-xs uppercase tracking-widest border transition-colors
                    ${selectedIds.has(activeMobileProduct.id) 
                      ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100" 
                      : "bg-brand-primary text-brand-dark border-brand-primary hover:bg-brand-primary/80"
                    }`}
                >
                  {selectedIds.has(activeMobileProduct.id) ? "Deselect" : "Select"}
                </button>
                <Link
                  href={`/product/${activeMobileProduct.slug}`}
                  className="py-3 rounded-lg font-bold text-xs uppercase tracking-widest border border-brand-border bg-white text-brand-dark text-center flex items-center justify-center hover:bg-gray-50"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
}
