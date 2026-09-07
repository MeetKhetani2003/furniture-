"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/stores/cartStore";

type Step = "contact" | "address" | "delivery" | "payment" | "review";
const STEPS: { id: Step; label: string }[] = [
  { id: "contact", label: "1 Contact" },
  { id: "address", label: "2 Address" },
  { id: "delivery", label: "3 Delivery" },
  { id: "payment", label: "4 Payment" },
  { id: "review", label: "5 Review" },
];

export default function CheckoutPage() {
  const { items, getSubtotal } = useCartStore();
  const [step, setStep] = useState<Step>("address");
  const [contact, setContact] = useState({ email: "", phone: "" });
  const [address, setAddress] = useState({ country: "India", name: "", address1: "", address2: "", city: "", state: "", postal: "", phone: "" });
  const [delivery, setDelivery] = useState("standard");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = getSubtotal();
  const deliveryCost = delivery === "standard" ? (subtotal > 50000 ? 0 : 999) : 1999;
  const total = subtotal + deliveryCost;

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">✓</span>
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-brand-muted text-sm mb-2">Order #PC-{Math.floor(10000 + Math.random() * 90000)}</p>
          <p className="text-brand-muted text-sm mb-8">You'll receive a confirmation email with your order details and estimated dispatch date.</p>
          <Link href="/" className="inline-block px-10 py-4 bg-brand-dark text-white font-bold text-[11px] uppercase tracking-widest hover:bg-brand-dark/90 transition-colors">
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-brand-dark">
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-brand-border">
        <Link href="/" className="block">
          <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold mb-1">Checkout</h2>
        </Link>
        <p className="text-sm text-brand-muted">Distraction-free guest-friendly checkout.</p>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-[1fr_340px] gap-12 items-start">

          {/* Left: Form */}
          <div>
            {/* Step Breadcrumb */}
            <div className="flex items-center gap-0 mb-8 overflow-x-auto hide-scrollbar">
              {STEPS.map((s, i) => (
                <div key={s.id} className="flex items-center shrink-0">
                  <button
                    onClick={() => setStep(s.id)}
                    className={`text-[11px] font-bold tracking-widest uppercase pb-1 transition-colors ${
                      step === s.id
                        ? "text-brand-primary border-b-2 border-brand-primary"
                        : "text-brand-muted hover:text-brand-dark"
                    }`}
                  >
                    {s.label}
                  </button>
                  {i < STEPS.length - 1 && <span className="mx-3 text-brand-border text-sm">›</span>}
                </div>
              ))}
            </div>

            {/* Contact Step */}
            {step === "contact" && (
              <div>
                <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold mb-6">Contact</h2>
                <div className="space-y-4 max-w-lg">
                  <div>
                    <label className="text-[11px] font-bold tracking-widest uppercase text-brand-muted block mb-1">Email *</label>
                    <input required type="email" value={contact.email} onChange={e => setContact(c => ({ ...c, email: e.target.value }))}
                      className="w-full h-11 px-4 border border-brand-border text-sm focus:outline-none focus:border-brand-dark" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold tracking-widest uppercase text-brand-muted block mb-1">Phone</label>
                    <input type="tel" value={contact.phone} onChange={e => setContact(c => ({ ...c, phone: e.target.value }))}
                      className="w-full h-11 px-4 border border-brand-border text-sm focus:outline-none focus:border-brand-dark" placeholder="+91 9xxxxxxxx" />
                  </div>
                  <button onClick={() => setStep("address")}
                    className="w-full sm:w-auto px-12 py-4 bg-brand-dark text-white font-bold text-[11px] uppercase tracking-widest hover:bg-brand-dark/90 transition-colors mt-4">
                    CONTINUE TO ADDRESS
                  </button>
                </div>
              </div>
            )}

            {/* Address Step */}
            {step === "address" && (
              <div>
                <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold mb-6">Delivery Address</h2>
                <div className="space-y-4 max-w-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold tracking-widest uppercase text-brand-muted block mb-1">Country / Region</label>
                      <select value={address.country} onChange={e => setAddress(a => ({ ...a, country: e.target.value }))}
                        className="w-full h-11 px-4 border border-brand-border text-sm focus:outline-none focus:border-brand-dark bg-white">
                        <option>India</option><option>United States</option><option>United Kingdom</option><option>UAE</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold tracking-widest uppercase text-brand-muted block mb-1">Full Name</label>
                      <input value={address.name} onChange={e => setAddress(a => ({ ...a, name: e.target.value }))}
                        className="w-full h-11 px-4 border border-brand-border text-sm focus:outline-none focus:border-brand-dark" placeholder="Full name" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold tracking-widest uppercase text-brand-muted block mb-1">Address</label>
                    <input value={address.address1} onChange={e => setAddress(a => ({ ...a, address1: e.target.value }))}
                      className="w-full h-11 px-4 border border-brand-border text-sm focus:outline-none focus:border-brand-dark" placeholder="Street address" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold tracking-widest uppercase text-brand-muted block mb-1">Apartment / Suite</label>
                    <input value={address.address2} onChange={e => setAddress(a => ({ ...a, address2: e.target.value }))}
                      className="w-full h-11 px-4 border border-brand-border text-sm focus:outline-none focus:border-brand-dark" placeholder="Apartment, suite, unit (optional)" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold tracking-widest uppercase text-brand-muted block mb-1">City</label>
                      <input value={address.city} onChange={e => setAddress(a => ({ ...a, city: e.target.value }))}
                        className="w-full h-11 px-4 border border-brand-border text-sm focus:outline-none focus:border-brand-dark" placeholder="City" />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold tracking-widest uppercase text-brand-muted block mb-1">State / Province</label>
                      <input value={address.state} onChange={e => setAddress(a => ({ ...a, state: e.target.value }))}
                        className="w-full h-11 px-4 border border-brand-border text-sm focus:outline-none focus:border-brand-dark" placeholder="State" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold tracking-widest uppercase text-brand-muted block mb-1">Postal Code</label>
                      <input value={address.postal} onChange={e => setAddress(a => ({ ...a, postal: e.target.value }))}
                        className="w-full h-11 px-4 border border-brand-border text-sm focus:outline-none focus:border-brand-dark" placeholder="Postal code" />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold tracking-widest uppercase text-brand-muted block mb-1">Phone</label>
                      <input value={address.phone} onChange={e => setAddress(a => ({ ...a, phone: e.target.value }))}
                        className="w-full h-11 px-4 border border-brand-border text-sm focus:outline-none focus:border-brand-dark" placeholder="+91 9xxxxxxxx" />
                    </div>
                  </div>
                  <button onClick={() => setStep("delivery")}
                    className="w-full sm:w-auto px-12 py-4 bg-brand-dark text-white font-bold text-[11px] uppercase tracking-widest hover:bg-brand-dark/90 transition-colors mt-2">
                    CONTINUE TO DELIVERY
                  </button>
                </div>
              </div>
            )}

            {/* Delivery Step */}
            {step === "delivery" && (
              <div>
                <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold mb-6">Delivery Method</h2>
                <div className="space-y-3 max-w-lg mb-6">
                  {[
                    { id: "standard", label: "Standard Delivery", desc: "8–14 business days", price: subtotal > 50000 ? "Free" : "₹999" },
                    { id: "express", label: "Express Delivery", desc: "3–5 business days", price: "₹1,999" },
                  ].map(opt => (
                    <label key={opt.id} className={`flex items-center justify-between px-5 py-4 border cursor-pointer transition-colors ${delivery === opt.id ? "border-brand-dark" : "border-brand-border hover:border-brand-dark/50"}`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" checked={delivery === opt.id} onChange={() => setDelivery(opt.id)} className="w-4 h-4" />
                        <div>
                          <p className="text-[13px] font-bold">{opt.label}</p>
                          <p className="text-[11px] text-brand-muted">{opt.desc}</p>
                        </div>
                      </div>
                      <span className="text-[13px] font-bold">{opt.price}</span>
                    </label>
                  ))}
                </div>
                <button onClick={() => setStep("payment")}
                  className="w-full sm:w-auto px-12 py-4 bg-brand-dark text-white font-bold text-[11px] uppercase tracking-widest hover:bg-brand-dark/90 transition-colors">
                  CONTINUE TO PAYMENT
                </button>
              </div>
            )}

            {/* Payment Step */}
            {step === "payment" && (
              <div>
                <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold mb-6">Payment</h2>
                <div className="max-w-lg space-y-4">
                  <div className="border border-brand-border p-5">
                    <p className="text-[12px] font-bold uppercase tracking-widest mb-4">Card Details</p>
                    <div className="space-y-3">
                      <input placeholder="Card number" className="w-full h-11 px-4 border border-brand-border text-sm focus:outline-none focus:border-brand-dark" />
                      <div className="grid grid-cols-2 gap-4">
                        <input placeholder="MM / YY" className="h-11 px-4 border border-brand-border text-sm focus:outline-none focus:border-brand-dark" />
                        <input placeholder="CVV" className="h-11 px-4 border border-brand-border text-sm focus:outline-none focus:border-brand-dark" />
                      </div>
                      <input placeholder="Name on card" className="w-full h-11 px-4 border border-brand-border text-sm focus:outline-none focus:border-brand-dark" />
                    </div>
                  </div>
                  <button onClick={() => setStep("review")}
                    className="w-full sm:w-auto px-12 py-4 bg-brand-dark text-white font-bold text-[11px] uppercase tracking-widest hover:bg-brand-dark/90 transition-colors">
                    REVIEW ORDER
                  </button>
                </div>
              </div>
            )}

            {/* Review Step */}
            {step === "review" && (
              <div>
                <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold mb-6">Review & Confirm</h2>
                <div className="max-w-lg space-y-4">
                  <div className="border border-brand-border p-5">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-brand-muted mb-3">ITEMS</p>
                    {items.map(item => (
                      <div key={item.productId} className="flex justify-between items-center py-2 border-b border-brand-border last:border-0">
                        <span className="text-[13px]">{item.name} × {item.quantity}</span>
                        <span className="text-[13px] font-bold">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2">
                    <span>Total</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                  <button onClick={() => setOrderPlaced(true)}
                    className="w-full py-4 bg-brand-dark text-white font-bold text-[11px] uppercase tracking-widest hover:bg-brand-dark/90 transition-colors">
                    PLACE ORDER · ₹{total.toLocaleString("en-IN")}
                  </button>
                  <p className="text-[10px] text-brand-muted text-center">
                    By placing your order you agree to our Terms & Conditions. No account required.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="lg:sticky lg:top-24 self-start border border-brand-border">
            <div className="bg-[#f6f5f2] px-6 py-4">
              <p className="text-[11px] font-bold tracking-widest uppercase">ORDER SUMMARY</p>
            </div>
            <div className="px-6 py-4 space-y-3">
              {items.map(item => (
                <div key={item.productId} className="flex justify-between items-start gap-4">
                  <div>
                    <p className="text-[13px] font-semibold text-brand-dark">{item.name}</p>
                    {item.color && <p className="text-[11px] text-brand-muted">{item.color}</p>}
                  </div>
                  <span className="text-[13px] font-bold shrink-0">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                </div>
              ))}
              <div className="border-t border-brand-border pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
