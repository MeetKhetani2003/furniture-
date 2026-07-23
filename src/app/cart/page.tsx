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
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-24 h-24 bg-brand-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-brand-muted" />
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-brand-text mb-2">
            Your Cart is Empty
          </h1>
          <p className="text-brand-muted mb-6">
            Looks like you haven&apos;t added anything to your cart yet. Explore our collection and find something you love.
          </p>
          <Link
            href="/category/furniture"
            className="inline-block px-8 py-3 bg-brand-primary text-white font-medium rounded-lg hover:bg-brand-dark transition-colors"
          >
            Start Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20 py-8">
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-brand-text mb-8">
          Shopping Cart ({items.length} items)
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
                className="bg-white rounded-xl p-4 border border-brand-border/50 flex gap-4"
              >
                <Link href={`/product/${item.productId}`} className="shrink-0">
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-brand-secondary">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/product/${item.productId}`}>
                    <h3 className="font-medium text-brand-text line-clamp-2 hover:text-brand-primary transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  {item.color && <p className="text-xs text-brand-muted mt-0.5">Color: {item.color}</p>}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold text-brand-text">{formatPrice(item.price)}</span>
                    <span className="text-sm text-brand-muted line-through">{formatPrice(item.mrp)}</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg border border-brand-border flex items-center justify-center hover:bg-brand-secondary transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg border border-brand-border flex items-center justify-center hover:bg-brand-secondary transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleMoveToWishlist(item)}
                        className="p-2 text-brand-muted hover:text-red-500 transition-colors"
                        title="Move to wishlist"
                      >
                        <Heart size={16} />
                      </button>
                      <button
                        onClick={() => {
                          removeItem(item.productId);
                          showToast("Item removed from cart", "info");
                        }}
                        className="p-2 text-brand-muted hover:text-red-500 transition-colors"
                        title="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Coupon */}
            <div className="bg-white rounded-xl p-4 border border-brand-border/50">
              <div className="flex items-center gap-2 mb-3">
                <Tag size={16} className="text-brand-primary" />
                <span className="font-medium text-sm">Apply Coupon</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 h-10 px-3 border border-brand-border rounded-lg text-sm focus:outline-none focus:border-brand-primary uppercase"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="h-10 px-5 bg-brand-primary text-white text-sm font-medium rounded-lg hover:bg-brand-dark transition-colors"
                >
                  Apply
                </button>
              </div>
              {couponApplied && (
                <p className="text-xs text-green-600 mt-2">Coupon applied! You saved {formatPrice(discount)}</p>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-xl p-6 border border-brand-border/50">
              <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-brand-muted">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">Product Discount</span>
                  <span className="text-green-600">-{formatPrice(savings)}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Coupon Discount</span>
                    <span className="text-green-600">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-brand-muted">Delivery</span>
                  <span className={delivery === 0 ? "text-green-600" : ""}>
                    {delivery === 0 ? "Free" : formatPrice(delivery)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">GST (18%)</span>
                  <span>{formatPrice(gst)}</span>
                </div>
                <div className="border-t border-brand-border pt-3 flex justify-between">
                  <span className="font-semibold">Grand Total</span>
                  <span className="font-bold text-lg">{formatPrice(grandTotal)}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="mt-6 w-full py-3.5 bg-brand-primary text-white font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-brand-dark transition-colors"
              >
                Proceed to Checkout
                <ArrowRight size={18} />
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
