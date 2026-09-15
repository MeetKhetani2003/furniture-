"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Copy, RotateCcw, AlertTriangle, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/lib/stores/cartStore";
import { showToast } from "@/components/common/Toaster";

// --- DATA ---
const BASE_PRICE = 129900;
const LEAD_TIME = "6-8 weeks";

const CONFIG_DATA = {
  size: [
    { id: "2-seater", label: "2-Seater (180cm)", price: -20000 },
    { id: "3-seater", label: "3-Seater (220cm)", price: 0 },
    { id: "4-seater", label: "4-Seater (280cm)", price: 25000 },
  ],
  fabric: [
    { id: "oat", label: "Oat", color: "#e5dcc5", price: 0 },
    { id: "sand", label: "Sand", color: "#d8cbb6", price: 5000 },
    { id: "olive", label: "Olive", color: "#6a7356", price: 5000 },
    { id: "charcoal", label: "Charcoal", color: "#363636", price: 8000 },
  ],
  wood: [
    { id: "walnut", label: "Walnut", color: "#5c4033", price: 0 },
    { id: "oak", label: "White Oak", color: "#cda67b", price: 0 },
    { id: "black", label: "Black Ash", color: "#1a1a1a", price: 0 },
  ],
  finish: [
    { id: "natural", label: "Natural", price: 0 },
    { id: "smoked", label: "Smoked", price: 2000 },
    { id: "dark", label: "Dark Oil", price: 3000 },
  ],
  configuration: [
    { id: "standard", label: "Standard", price: 0 },
    { id: "left-chaise", label: "Left Chaise", price: 15000 },
    { id: "right-chaise", label: "Right Chaise", price: 15000 },
  ]
};

const DEFAULT_STATE = {
  size: "3-seater",
  fabric: "oat",
  wood: "walnut",
  finish: "natural",
  configuration: "standard",
};

// --- COMPONENT ---
function ConfiguratorTool() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const addItem = useCartStore((s) => s.addItem);
  
  // Local state tied to URL
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Helper to safely get current state
  const getCurrentState = useCallback(() => {
    return {
      size: searchParams.get("size") || DEFAULT_STATE.size,
      fabric: searchParams.get("fabric") || DEFAULT_STATE.fabric,
      wood: searchParams.get("wood") || DEFAULT_STATE.wood,
      finish: searchParams.get("finish") || DEFAULT_STATE.finish,
      configuration: searchParams.get("configuration") || DEFAULT_STATE.configuration,
    };
  }, [searchParams]);

  const state = getCurrentState();

  // Rules Engine
  const checkCompatibility = (category: string, value: string) => {
    const currentState = { ...state, [category]: value };
    
    // Rule 1: No Chaise on 2-seater
    if (currentState.size === "2-seater" && (currentState.configuration === "left-chaise" || currentState.configuration === "right-chaise")) {
      return { valid: false, reason: "Chaise layouts require a 3-Seater or larger." };
    }
    
    // Rule 2: Black wood + Charcoal fabric = Poor contrast
    if (currentState.wood === "black" && currentState.fabric === "charcoal") {
      return { valid: false, reason: "Charcoal fabric and Black Ash lack contrast." };
    }

    return { valid: true };
  };

  const handleSelect = (category: string, value: string) => {
    const comp = checkCompatibility(category, value);
    if (!comp.valid) {
      showToast(comp.reason || "Incompatible selection", "info");
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set(category, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleReset = () => {
    router.push(pathname, { scroll: false });
  };

  const handleSave = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    showToast("Configuration link copied to clipboard!", "success");
  };

  const computePrice = () => {
    let total = BASE_PRICE;
    total += CONFIG_DATA.size.find(i => i.id === state.size)?.price || 0;
    total += CONFIG_DATA.fabric.find(i => i.id === state.fabric)?.price || 0;
    total += CONFIG_DATA.wood.find(i => i.id === state.wood)?.price || 0;
    total += CONFIG_DATA.finish.find(i => i.id === state.finish)?.price || 0;
    total += CONFIG_DATA.configuration.find(i => i.id === state.configuration)?.price || 0;
    return total;
  };

  const totalPrice = computePrice();

  const handleAddToCart = () => {
    // Generate a readable name
    const fName = CONFIG_DATA.fabric.find(i => i.id === state.fabric)?.label;
    const sName = CONFIG_DATA.size.find(i => i.id === state.size)?.label;
    
    addItem({
      productId: `verona-${state.size}-${state.fabric}-${state.wood}`,
      name: `Verona Sofa — ${sName} / ${fName}`,
      slug: "verona-sofa",
      price: totalPrice,
      mrp: totalPrice,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    });
    showToast("Custom configured product added to cart!", "success");
  };

  if (!isClient) {
    return <div className="min-h-[60vh] flex items-center justify-center">Loading Configurator...</div>;
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid lg:grid-cols-[55%_45%] gap-12 items-start">

        {/* Left: Live Preview */}
        <div className="lg:sticky lg:top-24 self-start">
          <div className="aspect-[4/3] bg-[#f8f7f5] rounded-xl flex items-center justify-center border border-brand-border/40 relative overflow-hidden group">
            {/* We use a placeholder image for now, but in reality this would swap based on selections */}
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80"
              alt="Product preview"
              className="absolute inset-0 w-full h-full object-contain mix-blend-multiply p-8 lg:p-12 transition-all duration-700 group-hover:scale-105"
            />
            
            {/* Compatibility Warning Overlay (if applicable) */}
            <div className="absolute inset-0 pointer-events-none flex items-end justify-center pb-6 z-10">
              <div className="bg-white/90 backdrop-blur shadow-sm border border-brand-border/40 px-6 py-3 rounded-full flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-xs text-brand-dark font-medium tracking-wide uppercase">Live Render</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-brand-muted px-2">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-brand-primary" />
              <span>10-Year Frame Warranty</span>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={handleSave} className="flex items-center gap-1.5 hover:text-brand-dark transition-colors font-bold tracking-widest uppercase">
                <Copy size={14} /> Copy Link
              </button>
              <button onClick={handleReset} className="flex items-center gap-1.5 hover:text-brand-dark transition-colors font-bold tracking-widest uppercase">
                <RotateCcw size={14} /> Reset
              </button>
            </div>
          </div>
        </div>

        {/* Right: Configuration Panel */}
        <div className="lg:pl-6 pb-20">
          <Link href="/custom-furniture" className="text-[10px] text-brand-primary font-bold tracking-widest uppercase block mb-3 hover:text-brand-dark transition-colors">
            ← BACK TO CUSTOM FURNITURE
          </Link>
          <h2 className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-brand-dark mb-2">Verona Sofa</h2>
          
          <div className="flex items-end gap-4 mb-8 pb-8 border-b border-brand-border/40">
            <p className="text-4xl font-bold tracking-tight">₹{totalPrice.toLocaleString("en-IN")}</p>
            <p className="text-xs text-brand-muted mb-1.5 font-medium uppercase tracking-widest">Base + Options</p>
          </div>

          {/* Configuration Sections */}
          <div className="space-y-10 mb-12">
            
            {/* 1. Size */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-xs font-bold tracking-widest uppercase text-brand-dark"><span className="text-brand-primary mr-1">1.</span> Select Size</h3>
                <span className="text-xs font-medium text-brand-muted">{CONFIG_DATA.size.find(s => s.id === state.size)?.label}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CONFIG_DATA.size.map((opt) => {
                  const comp = checkCompatibility("size", opt.id);
                  const isSelected = state.size === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect("size", opt.id)}
                      disabled={!comp.valid && !isSelected}
                      className={`relative px-4 py-4 rounded-xl text-[12px] font-semibold border-2 transition-all text-left flex flex-col justify-between h-20 ${
                        isSelected
                          ? "bg-brand-primary/5 border-brand-primary text-brand-dark shadow-sm"
                          : !comp.valid
                          ? "bg-gray-50 border-gray-200 text-gray-400 opacity-50 cursor-not-allowed"
                          : "bg-white border-brand-border/60 hover:border-brand-dark text-brand-dark"
                      }`}
                    >
                      <span className="truncate">{opt.label}</span>
                      {opt.price !== 0 && (
                        <span className={`text-[10px] ${isSelected ? "text-brand-primary font-bold" : "text-brand-muted"}`}>
                          {opt.price > 0 ? "+" : ""}₹{opt.price.toLocaleString("en-IN")}
                        </span>
                      )}
                      {!comp.valid && !isSelected && (
                        <AlertTriangle size={12} className="absolute top-2 right-2 text-gray-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Fabric */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-xs font-bold tracking-widest uppercase text-brand-dark"><span className="text-brand-primary mr-1">2.</span> Premium Fabric</h3>
                <span className="text-xs font-medium text-brand-muted">{CONFIG_DATA.fabric.find(s => s.id === state.fabric)?.label}</span>
              </div>
              <div className="flex flex-wrap gap-4">
                {CONFIG_DATA.fabric.map((opt) => {
                  const comp = checkCompatibility("fabric", opt.id);
                  const isSelected = state.fabric === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect("fabric", opt.id)}
                      disabled={!comp.valid && !isSelected}
                      title={!comp.valid ? comp.reason : opt.label}
                      className={`relative group flex flex-col items-center gap-2 transition-opacity ${
                        !comp.valid && !isSelected ? "opacity-30 cursor-not-allowed" : "hover:opacity-80"
                      }`}
                    >
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                        isSelected ? "ring-2 ring-offset-4 ring-brand-primary shadow-lg" : "ring-1 ring-brand-border shadow-sm"
                      }`}>
                        <div className="w-full h-full rounded-full border border-black/10" style={{ backgroundColor: opt.color }}></div>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? "text-brand-dark" : "text-brand-muted"}`}>
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Wood */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-xs font-bold tracking-widest uppercase text-brand-dark"><span className="text-brand-primary mr-1">3.</span> Wood Base</h3>
                <span className="text-xs font-medium text-brand-muted">{CONFIG_DATA.wood.find(s => s.id === state.wood)?.label}</span>
              </div>
              <div className="flex flex-wrap gap-4">
                {CONFIG_DATA.wood.map((opt) => {
                  const comp = checkCompatibility("wood", opt.id);
                  const isSelected = state.wood === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect("wood", opt.id)}
                      disabled={!comp.valid && !isSelected}
                      title={!comp.valid ? comp.reason : opt.label}
                      className={`relative group flex flex-col items-center gap-2 transition-opacity ${
                        !comp.valid && !isSelected ? "opacity-30 cursor-not-allowed" : "hover:opacity-80"
                      }`}
                    >
                      <div className={`w-14 h-14 rounded-md flex items-center justify-center transition-all ${
                        isSelected ? "ring-2 ring-offset-4 ring-brand-primary shadow-lg" : "ring-1 ring-brand-border shadow-sm"
                      }`}>
                        <div className="w-full h-full rounded-md border border-black/10" style={{ backgroundColor: opt.color }}></div>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? "text-brand-dark" : "text-brand-muted"}`}>
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Finish */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-xs font-bold tracking-widest uppercase text-brand-dark"><span className="text-brand-primary mr-1">4.</span> Oil Finish</h3>
                <span className="text-xs font-medium text-brand-muted">{CONFIG_DATA.finish.find(s => s.id === state.finish)?.label}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {CONFIG_DATA.finish.map((opt) => {
                  const isSelected = state.finish === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect("finish", opt.id)}
                      className={`px-6 py-3 rounded-full text-[11px] font-bold tracking-widest uppercase border-2 transition-colors ${
                        isSelected
                          ? "bg-brand-dark text-white border-brand-dark"
                          : "bg-white text-brand-dark border-brand-border/60 hover:border-brand-dark"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Configuration */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-xs font-bold tracking-widest uppercase text-brand-dark"><span className="text-brand-primary mr-1">5.</span> Layout Configuration</h3>
                <span className="text-xs font-medium text-brand-muted">{CONFIG_DATA.configuration.find(s => s.id === state.configuration)?.label}</span>
              </div>
              <div className="flex flex-col gap-3">
                {CONFIG_DATA.configuration.map((opt) => {
                  const comp = checkCompatibility("configuration", opt.id);
                  const isSelected = state.configuration === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect("configuration", opt.id)}
                      disabled={!comp.valid && !isSelected}
                      className={`w-full text-left px-5 py-4 rounded-xl text-sm font-semibold border-2 flex justify-between items-center transition-colors ${
                        isSelected
                          ? "bg-brand-primary/5 border-brand-primary text-brand-dark shadow-sm"
                          : !comp.valid
                          ? "bg-gray-50 border-gray-200 text-gray-400 opacity-50 cursor-not-allowed"
                          : "bg-white border-brand-border/60 hover:border-brand-dark text-brand-dark"
                      }`}
                    >
                      <span>{opt.label}</span>
                      <div className="flex items-center gap-3">
                        {opt.price !== 0 && (
                          <span className={`text-xs ${isSelected ? "text-brand-primary font-bold" : "text-brand-muted"}`}>
                            {opt.price > 0 ? "+" : ""}₹{opt.price.toLocaleString("en-IN")}
                          </span>
                        )}
                        {!comp.valid && !isSelected && <AlertTriangle size={14} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Sticky Bottom Actions */}
          <div className="sticky bottom-0 bg-white/95 backdrop-blur-md pt-4 pb-6 border-t border-brand-border/40 mt-8">
            <div className="flex justify-between items-center mb-4">
               <p className="text-[11px] font-bold text-brand-dark uppercase tracking-widest">
                Est. Delivery
              </p>
              <p className="text-sm text-brand-primary font-bold">
                {LEAD_TIME}
              </p>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="w-full py-5 bg-brand-dark text-white font-bold text-xs uppercase tracking-widest hover:bg-brand-primary hover:text-brand-dark transition-colors shadow-xl"
            >
              Add Configured Product
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

// Wrapper for Suspense boundary required by useSearchParams
export default function ProductConfiguratorPage() {
  return (
    <div className="min-h-screen bg-white text-brand-dark">
      {/* Header */}
      <div className="bg-brand-secondary py-6 border-b border-brand-border/40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-4xl font-[family-name:var(--font-playfair)] font-bold mb-2">Product Configurator</h1>
          <p className="text-sm text-brand-muted max-w-xl mx-auto">
            Design your perfect piece. Changes update your unique URL so you can easily save or share your configuration.
          </p>
        </div>
      </div>

      <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center text-brand-muted font-medium text-sm tracking-widest uppercase">Loading Interface...</div>}>
        <ConfiguratorTool />
      </Suspense>
    </div>
  );
}
