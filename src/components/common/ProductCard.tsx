"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { useWishlistStore } from "@/lib/stores/wishlistStore";
import { useCartStore } from "@/lib/stores/cartStore";
import { showToast } from "@/components/common/Toaster";
import RatingStars from "./RatingStars";
import PriceDisplay from "./PriceDisplay";
import LoginModal from "@/components/auth/LoginModal";
import ProductQuickView from "./ProductQuickView";
import type { Product } from "@/lib/data/products";

interface ProductCardProps {
  product: Product;
  index?: number;
  hideBadges?: boolean;
}

export default function ProductCard({ product, index = 0, hideBadges = false }: ProductCardProps) {
  const { data: session } = useSession();
  const [showLogin, setShowLogin] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!session) {
      setShowLogin(true);
      return;
    }

    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      mrp: product.mrp,
      image: product.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    });
    showToast(`${product.name} added to cart`, "info");
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!session) {
      setShowLogin(true);
      return;
    }
    toggleItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      mrp: product.mrp,
      image: product.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
      rating: product.rating,
      reviewCount: product.reviewCount,
    });
    showToast(
      inWishlist ? "Removed from wishlist" : "Added to wishlist",
      inWishlist ? "info" : "wishlist"
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group h-full"
    >
      <Link href={`/product/${product.id}`} className="block h-full">
        <div className="bg-white rounded-lg overflow-hidden border border-brand-border/40 hover:border-brand-primary/40 transition-all duration-500 h-full flex flex-col">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-[#f9f8f6] rounded-t-lg border-b border-brand-border/20">
            <img
              src={product.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80'}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105 p-6"
            />
            {/* Badges */}
            {!hideBadges && (
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {product.isBestseller ? (
                  <span className="px-2 py-1 bg-brand-dark text-white text-[9px] font-bold tracking-widest rounded-sm">
                    BESTSELLER
                  </span>
                ) : product.isNew ? (
                  <span className="px-2 py-1 bg-brand-dark text-white text-[9px] font-bold tracking-widest rounded-sm">
                    NEW
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-brand-dark text-white text-[9px] font-bold tracking-widest rounded-sm">
                    READY
                  </span>
                )}
              </div>
            )}
            {/* Quick View */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowQuickView(true);
              }}
              className="absolute inset-0 m-auto w-10 h-10 bg-white/90 text-brand-text hover:bg-brand-primary hover:text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100"
              aria-label="Quick View"
            >
              <Eye size={18} strokeWidth={1.5} />
            </button>

            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              className="absolute top-3 right-3 text-brand-muted hover:text-brand-primary transition-colors bg-white/50 hover:bg-white rounded-full p-1"
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                size={16}
                className={`transition-colors ${inWishlist ? "text-red-500 fill-red-500" : "currentColor"}`}
                strokeWidth={1.2}
              />
            </button>
          </div>
          {/* Info */}
          <div className="p-4 flex flex-col flex-grow bg-white rounded-b-lg">
            <h3 className="text-[11px] sm:text-xs font-semibold text-brand-text truncate mb-1.5 group-hover:text-brand-primary transition-colors font-[family-name:var(--font-inter)]">
              {product.name}
            </h3>
            <div className="mb-2.5 flex items-center gap-1.5">
              <RatingStars rating={product.rating} size={10} />
              <span className="text-[10px] text-brand-muted">({product.reviewCount || 0})</span>
            </div>
            <div className="mb-3 font-[family-name:var(--font-inter)]">
              <PriceDisplay price={product.price} mrp={product.mrp} discountPercent={product.discountPercent} size="sm" />
            </div>
            {/* Color Swatches */}
            <div className="flex gap-1 mt-auto">
              <div className="w-2.5 h-2.5 rounded-full bg-[#E5DCC5] border border-black/10"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#7D6B5D] border border-black/10"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#2C2C2C] border border-black/10"></div>
            </div>
          </div>
        </div>
      </Link>
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      <ProductQuickView 
        product={product} 
        isOpen={showQuickView} 
        onClose={() => setShowQuickView(false)} 
      />
    </motion.div>
  );
}
