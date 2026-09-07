"use client";

import Link from "next/link";
import { Heart, ShoppingCart, Trash2, X } from "lucide-react";
import { useWishlistStore } from "@/lib/stores/wishlistStore";
import { useCartStore } from "@/lib/stores/cartStore";
import { showToast } from "@/components/common/Toaster";

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);

  const handleMoveToCart = (item: (typeof items)[0]) => {
    addItem({
      productId: item.productId,
      name: item.name,
      slug: item.slug,
      price: item.price,
      mrp: item.mrp || item.price,
      image: item.image,
    });
    removeItem(item.productId);
    showToast(`${item.name} moved to cart`, "info");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <Heart size={48} className="text-brand-muted mx-auto mb-6 opacity-30" />
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-brand-dark mb-2">
            Your Wishlist is Empty
          </h1>
          <p className="text-brand-muted text-sm mb-8">
            Save your favourite pieces here and come back anytime.
          </p>
          <Link href="/living-room"
            className="inline-block px-10 py-4 bg-brand-dark text-white font-bold text-[11px] uppercase tracking-widest hover:bg-brand-dark/90 transition-colors">
            BROWSE COLLECTION
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-brand-dark">
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-brand-border">
        <h1 className="text-3xl font-[family-name:var(--font-playfair)] font-bold mb-1">Wishlist</h1>
        <p className="text-sm text-brand-muted">Saved products with commerce actions.</p>
        <p className="text-xs text-brand-muted mt-1 font-semibold">{items.length} saved items</p>
      </div>

      {/* Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {items.map((item) => (
            <div key={item.productId} className="group relative border border-brand-border/40 bg-white hover:border-brand-dark transition-colors">
              {/* Remove */}
              <button
                onClick={() => { removeItem(item.productId); showToast("Removed from wishlist", "info"); }}
                className="absolute top-3 right-3 z-10 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-red-50 transition-colors"
              >
                <X size={12} className="text-brand-muted" />
              </button>

              {/* Image */}
              <Link href={`/product/${item.slug}`} className="block aspect-square bg-[#f4f2ec] overflow-hidden">
                <img
                  src={item.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80"}
                  alt={item.name}
                  className="w-full h-full object-contain mix-blend-multiply p-6 group-hover:scale-105 transition-transform duration-500"
                />
              </Link>

              {/* Info */}
              <div className="p-4">
                <Link href={`/product/${item.slug}`}>
                  <h3 className="text-[13px] font-[family-name:var(--font-playfair)] font-bold text-brand-dark hover:text-brand-primary transition-colors line-clamp-2 mb-1">
                    {item.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-1 mb-1">
                  {[1,2,3,4,5].map(s => <span key={s} className="text-amber-400 text-[10px]">★</span>)}
                  <span className="text-[10px] text-brand-muted">(128)</span>
                </div>
                <p className="text-[13px] font-bold mb-2">₹{item.price.toLocaleString("en-IN")}</p>
                {/* Swatches */}
                <div className="flex gap-1.5 mb-3">
                  <div className="w-3 h-3 rounded-full bg-[#E5DCC5] border border-black/10" />
                  <div className="w-3 h-3 rounded-full bg-[#7D6B5D] border border-black/10" />
                  <div className="w-3 h-3 rounded-full bg-[#2C2C2C] border border-black/10" />
                </div>
                {/* Actions */}
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="flex-1 py-2 bg-brand-dark text-white text-[10px] font-bold uppercase tracking-widest hover:bg-brand-dark/90 transition-colors flex items-center justify-center gap-1"
                  >
                    <ShoppingCart size={11} /> ADD
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
