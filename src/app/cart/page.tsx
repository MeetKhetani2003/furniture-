"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, Heart, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { useCartStore } from "@/lib/stores/cartStore";
import { useWishlistStore } from "@/lib/stores/wishlistStore";
import { showToast } from "@/components/common/Toaster";
import { formatPrice } from "@/lib/utils/formatPrice";
import ProductCard from "@/components/common/ProductCard";
import { Product } from "@/lib/data/products"; // Type only

export default function CartPage() {
  const { items, updateQuantity, removeItem, getSubtotal, getTotalSavings, clearCart } = useCartStore();
  const addToWishlist = useWishlistStore((s) => s.addItem);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [recommended, setRecommended] = useState<Product[]>([]);
  const [loadingRecommended, setLoadingRecommended] = useState(true);

  // Fetch recommended products
  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
         const prods = data.products || [];
         setRecommended(prods.slice(0, 4));
         setLoadingRecommended(false);
      })
      .catch(() => setLoadingRecommended(false));
  }, []);

  const subtotal = getSubtotal();
  const savings = getTotalSavings();
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal > 10000 ? 0 : 499;
  const gst = Math.round((subtotal - discount) * 0.18);
  const grandTotal = subtotal - discount + delivery + gst;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "PREMIUM2K" || couponCode.toUpperCase() === "SAVE10") {
      setCouponApplied(true);
      showToast("Coupon applied successfully!", "success");
    } else {
      showToast("Invalid coupon code", "info");
    }
  };

  const handleMoveToWishlist = (item: (typeof items)[0]) => {
    addToWishlist({
      productId: item.productId,
      name: item.name,
      slug: item.slug,
      price: item.price,
      mrp: item.mrp,
      image: item.image,
      rating: 4.5,
      reviewCount: 100,
    });
    removeItem(item.productId);
    showToast("Moved to wishlist", "wishlist");
  };



  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center text-brand-text">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-24 h-24 bg-brand-secondary rounded-full flex items-center justify-center mx-auto mb-6 border border-brand-border/40">
            <ShoppingBag size={36} className="text-brand-primary" />
          </div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-light text-brand-text mb-3">
            Your Cart is <span className="font-semibold text-brand-primary">Empty</span>
          </h1>
          <p className="text-brand-muted text-sm mb-8 leading-relaxed font-medium">
            Discover handcrafted furniture and decor pieces designed to make your home a sanctuary.
          </p>
          <Link
            href="/products"
            className="inline-block px-8 py-3.5 bg-brand-primary text-brand-dark font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-brand-accent transition-colors shadow-md"
          >
            Start Shopping &rarr;
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20 py-10">
        <h1 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-light text-brand-text mb-8">
          Your <span className="font-semibold text-brand-primary">Shopping Cart</span> ({items.length} items)
        </h1>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* Cart Items */}
          <div className="space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-brand-secondary/40 rounded-2xl p-5 border border-brand-border/60 flex gap-5 shadow-sm"
              >
                <Link href={`/product/${item.productId}`} className="shrink-0">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-brand-secondary border border-brand-border/40">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/product/${item.productId}`}>
                    <h3 className="font-semibold text-brand-text line-clamp-2 hover:text-brand-primary transition-colors text-sm lg:text-base leading-snug">
                      {item.name}
                    </h3>
                  </Link>
                  {item.color && <p className="text-[10px] text-brand-muted mt-0.5 uppercase tracking-widest font-bold">Color: {item.color}</p>}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold text-brand-text text-sm">{formatPrice(item.price)}</span>
                    <span className="text-xs text-brand-muted line-through">{formatPrice(item.mrp)}</span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 bg-brand-bg rounded-lg p-0.5 border border-brand-border/40">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="w-7 h-7 rounded-md border border-brand-border/40 flex items-center justify-center hover:bg-brand-secondary hover:text-brand-primary transition-colors text-brand-muted"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-brand-text">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="w-7 h-7 rounded-md border border-brand-border/40 flex items-center justify-center hover:bg-brand-secondary hover:text-brand-primary transition-colors text-brand-muted"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleMoveToWishlist(item)}
                        className="p-2 text-brand-muted hover:text-red-500 transition-colors"
                        title="Move to wishlist"
                      >
                        <Heart size={15} />
                      </button>
                      <button
                        onClick={() => {
                          removeItem(item.productId);
                          showToast("Item removed from cart", "info");
                        }}
                        className="p-2 text-brand-muted hover:text-brand-alert transition-colors"
                        title="Remove"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Coupon */}
            <div className="bg-brand-secondary/40 rounded-2xl p-5 border border-brand-border/60 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Tag size={15} className="text-brand-primary" />
                <span className="font-bold text-xs uppercase tracking-widest text-brand-text">Apply Coupon Code</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Coupon"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 h-11 px-4 border border-brand-border bg-brand-bg rounded-xl text-sm focus:outline-none focus:border-brand-primary uppercase font-bold text-brand-text"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="h-11 px-6 bg-brand-dark text-brand-primary text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-brand-primary hover:text-brand-dark transition-all duration-300 shadow-md"
                >
                  Apply
                </button>
              </div>
              {couponApplied && (
                <p className="text-xs text-brand-success font-semibold mt-2">Coupon applied successfully! You saved {formatPrice(discount)}</p>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-brand-secondary/40 rounded-2xl p-6 border border-brand-border/60 shadow-sm">
              <h2 className="font-bold text-xs uppercase tracking-widest text-brand-text mb-6">Order Summary</h2>
              <div className="space-y-3.5 text-xs font-semibold text-brand-muted">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-brand-text font-bold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Product Discount</span>
                  <span className="text-brand-success font-bold">-{formatPrice(savings)}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between">
                    <span>Coupon Discount</span>
                    <span className="text-brand-success font-bold">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className={delivery === 0 ? "text-brand-success font-bold" : "text-brand-text font-bold"}>
                    {delivery === 0 ? "Free" : formatPrice(delivery)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span className="text-brand-text font-bold">{formatPrice(gst)}</span>
                </div>
                <div className="border-t border-brand-border pt-4 flex justify-between text-sm font-bold text-brand-text">
                  <span className="uppercase tracking-wide">Grand Total</span>
                  <span className="text-lg text-brand-primary font-[family-name:var(--font-heading)]">{formatPrice(grandTotal)}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="mt-6 w-full py-4 bg-brand-dark text-brand-primary text-[10px] font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 hover:bg-brand-primary hover:text-brand-dark transition-all duration-300 shadow-md"
              >
                Proceed to Checkout
                <ArrowRight size={14} />
              </Link>
              <p className="text-xs text-brand-muted text-center mt-3">
                Free delivery on orders above ₹10,000
              </p>
            </div>
          </div>
        </div>

        {/* Recommended */}
        <div className="mt-16">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-brand-text mb-6">
            Customers Also Bought
          </h2>
          {loadingRecommended ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {recommended.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
