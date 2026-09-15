"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/lib/stores/cartStore";
import { showToast } from "@/components/common/Toaster";
import PriceDisplay from "./PriceDisplay";
import RatingStars from "./RatingStars";
import type { Product } from "@/lib/data/products";

interface ProductQuickViewProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductQuickView({ product, isOpen, onClose }: ProductQuickViewProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      mrp: product.mrp,
      image: product.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    });
    showToast(`${product.name} added to cart`, "info");
    onClose();
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" style={{ position: 'fixed' }}>
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-4xl flex flex-col md:flex-row z-10 max-h-[90vh]"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-md p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-800" />
          </button>

          {/* Left: Image */}
          <div className="w-full md:w-1/2 bg-[#f9f8f6] p-8 flex items-center justify-center shrink-0">
            <div className="relative w-full aspect-square">
              <img 
                src={product.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80'} 
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>
          </div>

          {/* Right: Info */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
            <h2 className="text-2xl font-bold text-brand-text mb-2 font-[family-name:var(--font-playfair)] leading-tight">
              {product.name}
            </h2>
            
            <div className="flex items-center gap-2 mb-4">
              <RatingStars rating={product.rating} size={14} />
              <span className="text-sm text-brand-muted">({product.reviewCount || 0} reviews)</span>
            </div>

            <div className="mb-6">
              <PriceDisplay price={product.price} mrp={product.mrp} discountPercent={product.discountPercent} size="md" />
            </div>

            <p className="text-sm text-brand-muted leading-relaxed mb-8 line-clamp-4">
              {product.description || "Experience the perfect blend of form and function with this expertly crafted piece. Designed to elevate your space with timeless elegance and superior comfort."}
            </p>

            <div className="mt-auto flex flex-col gap-3">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-brand-dark text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-primary hover:text-brand-dark transition-colors duration-300"
              >
                <ShoppingCart size={16} /> Add to Cart
              </button>
              
              <Link 
                href={`/product/${product.id}`}
                onClick={onClose}
                className="w-full py-4 bg-transparent text-brand-dark border border-brand-dark font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-dark hover:text-white transition-colors duration-300"
              >
                View Full Details <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
