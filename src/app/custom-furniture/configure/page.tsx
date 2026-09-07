"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/stores/cartStore";
import { showToast } from "@/components/common/Toaster";

const CONFIG_OPTIONS = {
  size: ["2-Seater", "3-Seater", "4-Seater"],
  fabric: ["Oat", "Sand", "Olive", "Charcoal"],
  wood: ["Walnut", "Oak", "Black"],
  finish: ["Natural", "Smoked", "Dark"],
  configuration: ["Standard", "Left Chaise", "Right Chaise"],
};

const BASE_PRICE = 129900;
const SIZE_PRICES: Record<string, number> = { "2-Seater": -20000, "3-Seater": 0, "4-Seater": 25000 };
const FABRIC_PRICES: Record<string, number> = { Oat: 0, Sand: 5000, Olive: 5000, Charcoal: 8000 };

export default function ProductConfiguratorPage() {
  const addItem = useCartStore((s) => s.addItem);
  const [selections, setSelections] = useState<Record<string, string>>({
    size: "3-Seater",
    fabric: "Oat",
    wood: "Walnut",
    finish: "Natural",
    configuration: "Standard",
  });

  const computedPrice = BASE_PRICE + (SIZE_PRICES[selections.size] || 0) + (FABRIC_PRICES[selections.fabric] || 0);

  const select = (group: string, value: string) => setSelections((prev) => ({ ...prev, [group]: value }));

  const handleAddToCart = () => {
    addItem({
      productId: "verona-sofa-configured",
      name: `Verona Sofa — ${selections.size} / ${selections.fabric} / ${selections.wood}`,
      slug: "verona-sofa",
      price: computedPrice,
      mrp: computedPrice,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    });
    showToast("Configuration added to cart!", "info");
  };

  return (
    <div className="min-h-screen bg-white text-brand-dark">
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-brand-border">
        <h1 className="text-2xl font-[family-name:var(--font-playfair)] font-bold mb-1">Product Configurator</h1>
        <p className="text-sm text-brand-muted">Interactive customization state for compatible products.</p>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-[55%_45%] gap-12 items-start">

          {/* Left: Live Preview */}
          <div className="lg:sticky lg:top-24 self-start">
            <div className="aspect-[4/3] bg-[#f4f2ec] rounded-md flex items-center justify-center border border-brand-border/30 relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80"
                alt="Product preview"
                className="absolute inset-0 w-full h-full object-contain mix-blend-multiply p-12"
              />
              <div className="absolute inset-0 flex items-end justify-center pb-6">
                <div className="border border-brand-border/30 bg-white/70 backdrop-blur-sm px-4 py-2">
                  <p className="text-xs text-brand-muted italic">Live product preview / 3D render</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Configuration Panel */}
          <div>
            <Link href="/custom-furniture" className="text-[10px] text-[#b89c72] font-bold tracking-widest uppercase block mb-2">
              VERONA SOFA — CUSTOMISE
            </Link>
            <p className="text-3xl font-bold mb-6">₹{computedPrice.toLocaleString("en-IN")}</p>

            {/* Steps */}
            {[
              { step: 1, label: "Size", key: "size", type: "pills" },
              { step: 2, label: "Fabric", key: "fabric", type: "pills" },
              { step: 3, label: "Wood", key: "wood", type: "pills" },
              { step: 4, label: "Finish", key: "finish", type: "pills" },
              { step: 5, label: "Configuration", key: "configuration", type: "pills" },
            ].map(({ step, label, key, type }) => (
              <div key={key} className="mb-6">
                <p className="text-[11px] font-bold tracking-widest uppercase text-brand-dark mb-2">
                  {step} {label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(CONFIG_OPTIONS as any)[key].map((opt: string) => (
                    <button
                      key={opt}
                      onClick={() => select(key, opt)}
                      className={`px-5 py-2 text-[12px] font-semibold border transition-colors ${
                        selections[key] === opt
                          ? "bg-brand-dark text-white border-brand-dark"
                          : "bg-white text-brand-dark border-brand-border hover:border-brand-dark"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <p className="text-xs text-brand-muted mb-4">Estimated lead time: 6-8 weeks</p>

            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-brand-dark text-white font-bold text-[11px] uppercase tracking-widest hover:bg-brand-dark/90 transition-colors mb-3"
            >
              ADD CONFIGURED PRODUCT
            </button>
            <button className="w-full py-3 border border-brand-border text-brand-muted text-[11px] uppercase tracking-widest hover:border-brand-dark hover:text-brand-dark transition-colors">
              REQUEST A QUOTE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
