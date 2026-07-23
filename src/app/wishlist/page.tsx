"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { useWishlistStore } from "@/lib/stores/wishlistStore";
import { useCartStore } from "@/lib/stores/cartStore";
import { showToast } from "@/components/common/Toaster";
import ProductCard from "@/components/common/ProductCard";
import type { Product } from "@/lib/data/products";

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = (item: (typeof items)[0]) => {
    // We no longer need this as ProductCard handles it internally
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-24 h-24 bg-brand-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart size={40} className="text-brand-muted" />
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-brand-text mb-2">
            Your Wishlist is Empty
          </h1>
          <p className="text-brand-muted mb-6">
            Save your favorite items here and come back to them anytime.
          </p>
          <Link
            href="/category/furniture"
            className="inline-block px-8 py-3 bg-brand-primary text-white font-medium rounded-lg hover:bg-brand-dark transition-colors"
          >
            Explore Products
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20 py-8">
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-brand-text mb-8">
          My Wishlist ({items.length} items)
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {items.map((item, i) => {
            const product = {
              id: item.productId,
              name: item.name,
              slug: item.slug,
              description: "",
              price: item.price,
              mrp: item.mrp,
              category: "",
              brand: "", // Can be filled if stored in wishlist, else empty
              images: [item.image],
              deliveryDays: 7, // default
              discountPercent: Math.round(((item.mrp - item.price) / item.mrp) * 100),
              isNew: false,
              isBestseller: false,
              rating: item.rating,
              reviewCount: item.reviewCount,
            } as unknown as Product;
            return <ProductCard key={item.productId} product={product} index={i} />;
          })}
        </div>
      </div>
    </div>
  );
}
