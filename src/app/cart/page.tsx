"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Minus, Plus, X, Tag } from "lucide-react";
import { useCartStore } from "@/lib/stores/cartStore";
import { useWishlistStore } from "@/lib/stores/wishlistStore";
import { showToast } from "@/components/common/Toaster";
import { Product } from "@/lib/data/products";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getSubtotal, getTotalSavings } = useCartStore();
  const { addItem: addToWishlist } = useWishlistStore();
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [recommended, setRecommended] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setRecommended((data.products || []).slice(0, 4)))
      .catch(() => {});
  }, []);

  const subtotal = getSubtotal();
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal > 50000 ? 0 : 999;
  const estimatedTotal = subtotal - discount + delivery;

  const handleMoveToWishlist = (item: (typeof items)[0]) => {
    addToWishlist({
      productId: item.productId,
      name: item.name,
      slug: item.slug,
      price: item.price,
      mrp: item.mrp,
      image: item.image,
    });
    removeItem(item.productId);
    showToast(`${item.name} moved to wishlist`, "info");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-[#f4f2ec] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand-muted">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-brand-dark mb-2">Your cart is empty</h1>
          <p className="text-brand-muted text-sm mb-8">Browse our collection and add pieces you love.</p>
          <Link href="/living-room" className="inline-block px-10 py-4 bg-brand-dark text-white font-bold text-[11px] uppercase tracking-widest hover:bg-brand-dark/90 transition-colors">
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-brand-dark">
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-brand-border">
        <h1 className="text-3xl font-[family-name:var(--font-playfair)] font-bold mb-1">Shopping Cart</h1>
        <p className="text-sm text-brand-muted mb-2">Conversion-focused cart with edit, delivery and recommendation logic.</p>
        <p className="text-base font-bold text-brand-dark">Your Cart ({items.length})</p>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-[1fr_340px] gap-10 items-start">

          {/* Cart Items */}
          <div>
            <div className="space-y-0">
              {items.map((item, i) => (
                <div key={item.productId} className={`flex gap-5 py-6 ${i < items.length - 1 ? "border-b border-brand-border" : ""}`}>
                  {/* Thumbnail */}
                  <Link href={`/product/${item.slug}`} className="w-20 h-20 bg-[#f4f2ec] shrink-0 flex items-center justify-center overflow-hidden">
                    <img src={item.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=80"} alt={item.name}
                      className="w-full h-full object-contain mix-blend-multiply p-2" />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <Link href={`/product/${item.slug}`}>
                          <h3 className="font-[family-name:var(--font-playfair)] font-bold text-brand-dark hover:text-brand-primary transition-colors text-[15px]">{item.name}</h3>
                        </Link>
                        <p className="text-xs text-brand-muted mt-0.5">
                          {item.color ? `${item.color} · ` : ""}Walnut · Qty {item.quantity}
                        </p>
                      </div>
                      <p className="font-bold text-[15px] shrink-0">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                    </div>

                    {/* Qty Controls */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-brand-border">
                        <button onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                          className="w-7 h-7 flex items-center justify-center hover:bg-[#f4f2ec] transition-colors">
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-[13px] font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-[#f4f2ec] transition-colors">
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 mt-2">
                      <Link href={`/custom-furniture/configure`} className="text-[11px] font-semibold text-brand-dark underline underline-offset-2 hover:text-brand-primary transition-colors">
                        Edit configuration
                      </Link>
                      <span className="text-brand-border">·</span>
                      <button onClick={() => handleMoveToWishlist(item)} className="text-[11px] font-semibold text-brand-dark underline underline-offset-2 hover:text-brand-primary transition-colors">
                        Move to wishlist
                      </button>
                      <span className="text-brand-border">·</span>
                      <button onClick={() => { removeItem(item.productId); showToast("Item removed", "info"); }}
                        className="text-[11px] font-semibold text-red-500 underline underline-offset-2 hover:text-red-700 transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* You May Also Like */}
            {recommended.length > 0 && (
              <div className="mt-12">
                <h2 className="text-lg font-[family-name:var(--font-playfair)] font-bold mb-6">You may also like</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {recommended.map((p) => (
                    <Link key={p.id} href={`/product/${p.id}`} className="group block">
                      <div className="aspect-square bg-[#f4f2ec] rounded-md mb-2 overflow-hidden">
                        <img src={p.images?.[0] || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80"} alt={p.name}
                          className="w-full h-full object-contain mix-blend-multiply p-6 group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <h4 className="text-[12px] font-bold text-brand-dark group-hover:text-brand-primary transition-colors line-clamp-2">{p.name}</h4>
                      <p className="text-[12px] font-bold mt-0.5">₹{p.price.toLocaleString("en-IN")}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:sticky lg:top-24 self-start">
            <div className="border border-brand-border">
              <div className="bg-[#f6f5f2] px-6 py-4">
                <p className="text-[11px] font-bold tracking-widest uppercase text-brand-dark">ORDER SUMMARY</p>
              </div>
              <div className="px-6 py-4 space-y-3">
                <div className="flex justify-between text-[13px]">
                  <span className="text-brand-muted">Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-brand-muted">Shipping</span>
                  <span className="font-semibold">{delivery === 0 ? "Free" : `₹${delivery.toLocaleString("en-IN")}`}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-[13px] text-green-600">
                    <span>Coupon (10% off)</span>
                    <span>−₹{discount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between text-[13px]">
                  <span className="text-brand-muted">Taxes / Duties</span>
                  <span className="text-brand-muted text-[11px]">Calculated at checkout</span>
                </div>
                <div className="border-t border-brand-border pt-3 flex justify-between font-bold">
                  <span>Estimated total</span>
                  <span>₹{estimatedTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Coupon */}
              <div className="px-6 pb-4">
                <div className="flex gap-0 border border-brand-border">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value)}
                    placeholder="Coupon code"
                    className="flex-1 h-10 px-3 text-[12px] focus:outline-none bg-white"
                  />
                  <button onClick={() => {
                    if (couponCode.toUpperCase() === "SAVE10") { setCouponApplied(true); showToast("Coupon applied!", "success"); }
                    else showToast("Invalid coupon", "info");
                  }} className="px-3 text-[11px] font-bold bg-brand-dark text-white hover:bg-brand-dark/90 transition-colors">
                    APPLY
                  </button>
                </div>
              </div>

              <div className="px-6 pb-6">
                <Link href="/checkout"
                  className="block w-full py-4 bg-brand-dark text-white font-bold text-[11px] uppercase tracking-widest text-center hover:bg-brand-dark/90 transition-colors">
                  CHECKOUT
                </Link>
                <p className="text-center text-[10px] text-brand-muted mt-3">
                  Guest checkout available · No account required
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
