"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import { useWishlistStore } from "@/lib/stores/wishlistStore";
import { useCartStore } from "@/lib/stores/cartStore";
import { showToast } from "@/components/common/Toaster";
import RatingStars from "./RatingStars";
import PriceDisplay from "./PriceDisplay";
import LoginModal from "@/components/auth/LoginModal";
import type { Product } from "@/lib/data/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { data: session } = useSession();
  const [showLogin, setShowLogin] = useState(false);
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
        <div className="bg-brand-bg rounded-2xl overflow-hidden border border-brand-border/60 hover:border-brand-primary/40 hover:shadow-[0_12px_30px_rgba(184,156,114,0.06)] transition-all duration-500 hover:-translate-y-1 h-full flex flex-col">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-[#f4f2ec] rounded-t-2xl">
            <img
              src={product.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80'}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105 p-6"
            />
            {/* Badges */}
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
            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              className="absolute top-4 right-4 text-brand-muted hover:text-brand-primary transition-colors"
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                size={18}
                className={`transition-colors ${inWishlist ? "text-red-500 fill-red-500" : "currentColor"}`}
                strokeWidth={1.5}
              />
            </button>
          </div>
          {/* Info */}
          <div className="p-5 flex flex-col flex-grow bg-white rounded-b-2xl">
            <h3 className="font-[family-name:var(--font-playfair)] text-base font-bold text-brand-dark line-clamp-2 mb-1 group-hover:text-brand-primary transition-colors">
              {product.name}
            </h3>
            <div className="mb-2">
              <RatingStars rating={product.rating} size={10} showValue reviewCount={product.reviewCount} />
            </div>
            <div className="mb-3">
              <PriceDisplay price={product.price} mrp={product.mrp} discountPercent={product.discountPercent} size="sm" />
            </div>
            {/* Color Swatches */}
            <div className="flex gap-1.5 mt-auto">
              <div className="w-3.5 h-3.5 rounded-full bg-[#E5DCC5] border border-black/10"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-[#7D6B5D] border border-black/10"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-[#2C2C2C] border border-black/10"></div>
            </div>
          </div>
        </div>
      </Link>
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </motion.div>
  );
}
