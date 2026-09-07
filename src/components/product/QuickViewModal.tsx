"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Truck, Shield } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/lib/stores/cartStore";
import { Toaster } from "@/components/common/Toaster";
import { toast } from "sonner";

export default function QuickViewModal({ product, onClose }: { product: any; onClose: () => void }) {
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    toast.success("Added to cart");
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.22 }}
          className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl flex flex-col md:flex-row z-10 overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-white/90 backdrop-blur rounded-full text-brand-dark hover:bg-gray-100 transition-colors border border-brand-border/40"
          >
            <X size={18} />
          </button>

          {/* Left: Product Gallery */}
          <div className="w-full md:w-[45%] bg-[#f4f2ec] relative min-h-[280px] md:min-h-[480px] flex items-center justify-center p-8">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </div>

          {/* Right: Purchase Info */}
          <div className="w-full md:w-[55%] p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-brand-dark mb-2 leading-snug">
                {product.name}
              </h2>

              <div className="flex items-center gap-1.5 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={12} className="fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs text-brand-muted ml-1">4.8 (120)</span>
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-2xl font-bold text-brand-dark">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-brand-muted line-through">
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              {/* Fabric Swatches */}
              <div className="mb-5">
                <p className="text-[11px] font-bold uppercase tracking-widest text-brand-dark mb-2">Fabric</p>
                <div className="flex gap-2">
                  {[{ color: "#E5DCC5", label: "Oat" }, { color: "#C4A882", label: "Sand" }, { color: "#7D7D6D", label: "Olive" }, { color: "#3C3535", label: "Charcoal" }].map((s) => (
                    <button
                      key={s.label}
                      title={s.label}
                      className="w-7 h-7 rounded-full border-2 border-white ring-1 ring-brand-border hover:ring-brand-primary transition-all"
                      style={{ backgroundColor: s.color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-brand-dark text-white font-bold text-[11px] uppercase tracking-widest hover:bg-brand-dark/90 transition-colors"
              >
                ADD TO CART
              </button>
              <Link
                href={`/product/${product.slug || product.id}`}
                onClick={onClose}
                className="block text-center text-xs font-semibold text-brand-muted underline underline-offset-4 hover:text-brand-dark transition-colors"
              >
                View full product details →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
