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
      image: product.images[0],
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
      image: product.images[0],
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
        <div className="bg-white rounded-xl overflow-hidden border border-brand-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-brand-secondary">
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.isNew && (
                <span className="px-2.5 py-1 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-wider rounded">
                  New
                </span>
              )}
              {product.isBestseller && (
                <span className="px-2.5 py-1 bg-brand-dark text-white text-[10px] font-bold uppercase tracking-wider rounded">
                  Bestseller
                </span>
              )}
              {product.discountPercent > 0 && !product.isNew && !product.isBestseller && (
                <span className="px-2.5 py-1 bg-green-600 text-white text-[10px] font-bold uppercase tracking-wider rounded">
                  Sale
                </span>
              )}
            </div>
            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm hover:bg-white transition-colors"
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                size={16}
                className={`transition-colors ${inWishlist ? "text-red-500 fill-red-500" : "text-brand-muted"}`}
              />
            </button>
          </div>
          {/* Info */}
          <div className="p-4 flex flex-col flex-grow">
            <p className="text-xs text-brand-muted mb-1">{product.brand}</p>
            <h3 className="font-[family-name:var(--font-playfair)] text-sm font-semibold text-brand-text line-clamp-2 mb-2">
              {product.name}
            </h3>
            <div className="mb-2">
              <RatingStars rating={product.rating} size={12} showValue reviewCount={product.reviewCount} />
            </div>
            <PriceDisplay price={product.price} mrp={product.mrp} discountPercent={product.discountPercent} size="sm" />
            <p className="text-[11px] text-brand-muted mt-1.5">
              Delivery in {product.deliveryDays} days
            </p>
            {/* Add to Cart Button */}
            <div className="mt-auto pt-4 border-t border-brand-border/40">
              <button
                onClick={handleAddToCart}
                className="w-full py-2.5 bg-brand-primary text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-brand-dark transition-colors shadow-sm"
              >
                <ShoppingCart size={16} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </Link>
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </motion.div>
  );
}
