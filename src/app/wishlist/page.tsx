"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { useWishlistStore } from "@/lib/stores/wishlistStore";
import { useCartStore } from "@/lib/stores/cartStore";
import { showToast } from "@/components/common/Toaster";
import { formatPrice } from "@/lib/utils/formatPrice";
import RatingStars from "@/components/common/RatingStars";

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = (item: (typeof items)[0]) => {
    addItem({
      productId: item.productId,
      name: item.name,
      slug: item.slug,
      price: item.price,
      mrp: item.mrp,
      image: item.image,
    });
    showToast(`${item.name} added to cart`, "info");
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
          {items.map((item, i) => (
            <motion.div
              key={item.productId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl overflow-hidden border border-brand-border/50 group"
            >
              <Link href={`/product/${item.productId}`} className="block">
                <div className="aspect-[4/3] relative overflow-hidden bg-brand-secondary">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeItem(item.productId);
                      showToast("Removed from wishlist", "info");
                    }}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
              </Link>
              <div className="p-4">
                <Link href={`/product/${item.productId}`}>
                  <h3 className="font-[family-name:var(--font-playfair)] text-sm font-semibold text-brand-text line-clamp-2 hover:text-brand-primary transition-colors">
                    {item.name}
                  </h3>
                </Link>
                <div className="mt-1">
                  <RatingStars rating={item.rating} size={12} showValue reviewCount={item.reviewCount} />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-bold text-brand-text">{formatPrice(item.price)}</span>
                  <span className="text-sm text-brand-muted line-through">{formatPrice(item.mrp)}</span>
                </div>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="mt-3 w-full py-2.5 bg-brand-primary text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-brand-dark transition-colors"
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
