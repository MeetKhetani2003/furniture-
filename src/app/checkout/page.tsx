"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Check,
  MapPin,
  Truck,
  CreditCard,
  Shield,
  Lock,
  Star,
} from "lucide-react";
import { useCartStore } from "@/lib/stores/cartStore";
import { formatPrice } from "@/lib/utils/formatPrice";
import { showToast } from "@/components/common/Toaster";

const steps = [
  { id: 1, label: "Address", icon: MapPin },
  { id: 2, label: "Delivery", icon: Truck },
  { id: 3, label: "Payment", icon: CreditCard },
  { id: 4, label: "Review", icon: Check },
];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
  });
  const [deliveryOption, setDeliveryOption] = useState<"standard" | "express">("standard");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const { data: session, status } = useSession();
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/user/addresses")
        .then(res => res.json())
        .then(data => {
          if (data.addresses && data.addresses.length > 0) {
            setSavedAddresses(data.addresses);
            const defaultAddr = data.addresses.find((a: any) => a.isDefault) || data.addresses[0];
            setSelectedAddressId(defaultAddr._id);
            setAddress({
              name: defaultAddr.fullName,
              phone: defaultAddr.phone,
              address: `${defaultAddr.addressLine1}${defaultAddr.addressLine2 ? ", " + defaultAddr.addressLine2 : ""}`,
              pincode: defaultAddr.postalCode,
              city: defaultAddr.city,
              state: defaultAddr.state,
            });
            setShowNewAddressForm(false);
          } else {
            setShowNewAddressForm(true);
          }
        });
    } else if (status === "unauthenticated") {
      setShowNewAddressForm(true);
    }
  }, [status]);

  const { items, getSubtotal, clearCart } = useCartStore();
  const subtotal = getSubtotal();
  const delivery = deliveryOption === "express" ? 499 : subtotal > 10000 ? 0 : 499;
  const gst = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + delivery + gst;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePlaceOrder = async () => {
    if (paymentMethod === "cod") {
      setOrderPlaced(true);
      clearCart();
      showToast("Order placed successfully via COD!", "success");
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      showToast("Razorpay SDK failed to load", "info");
      return;
    }

    try {
      const orderRes = await fetch("/api/checkout/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: grandTotal }),
      });
      const orderData = await orderRes.json();

      if (!orderRes.ok) throw new Error(orderData.error);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_SvYRmEIlidySNB", // fallback for testing
        amount: orderData.amount,
        currency: orderData.currency,
        name: "PremiumCrafts",
        description: "Furniture Order",
        order_id: orderData.id,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch("/api/checkout/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                amount: grandTotal,
                items: items,
                address: address,
              }),
            });
            if (verifyRes.ok) {
              setOrderPlaced(true);
              clearCart();
              showToast("Payment Successful & Order Placed!", "success");
            } else {
              showToast("Payment verification failed", "info");
            }
          } catch (err) {
            showToast("Error verifying payment", "info");
          }
        },
        prefill: {
          name: address.name,
          contact: address.phone,
          email: session?.user?.email || "",
        },
        theme: {
          color: "#B89C72",
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (e: any) {
      showToast(e.message || "Something went wrong", "info");
    } finally { };
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center text-brand-text">
        <div className="text-center max-w-sm mx-auto px-6">
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-light text-brand-text mb-4">
            Your Cart is <span className="font-semibold text-brand-primary">Empty</span>
          </h1>
          <p className="text-sm text-brand-muted mb-8 leading-relaxed">Please add products to your cart before proceeding to checkout.</p>
          <Link href="/products" className="inline-block bg-brand-primary text-brand-dark hover:bg-brand-accent px-8 py-3.5 text-xs font-bold uppercase tracking-widest rounded-xl transition-colors shadow-md">
            Browse Products &rarr;
          </Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center text-brand-text">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <div className="w-20 h-20 bg-brand-primary/15 rounded-full flex items-center justify-center mx-auto mb-6 border border-brand-primary/20 shadow-inner">
            <Check size={36} className="text-brand-primary" />
          </div>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl font-light text-brand-text mb-3">
            Order <span className="font-semibold text-brand-primary">Placed!</span>
          </h1>
          <p className="text-brand-muted text-sm mb-2 font-medium">
            Thank you for shopping with PremiumCrafts. We hope you love your new curation.
          </p>
          <p className="text-xs text-brand-muted mb-8">
            Order #PC{Math.floor(Math.random() * 1000000)} | Estimated delivery: {new Date(Date.now() + 7 * 86400000).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
          <Link
            href="/account/orders"
            className="inline-block px-8 py-3.5 bg-brand-dark text-brand-primary font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-brand-primary hover:text-brand-dark transition-colors shadow-md"
          >
            View My Orders
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20 py-10">
        <h1 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-light text-brand-text mb-8">
          Secure <span className="font-semibold text-brand-primary">Checkout</span>
        </h1>

        {/* Progress */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-2">
            {steps.map((step, i) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-bold ${
                    currentStep >= step.id
                      ? "bg-brand-primary text-brand-dark shadow-sm border border-brand-primary/20"
                      : "bg-brand-secondary text-brand-muted border border-brand-border/40"
                  }`}
                >
                  <step.icon size={13} />
                  <span className="hidden sm:inline">{step.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <ChevronRight size={14} className="text-brand-muted mx-1 opacity-70" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* Main Form */}
          <div>
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-brand-secondary/40 rounded-2xl p-6 border border-brand-border/60 shadow-sm"
                >
                  <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <MapPin size={20} className="text-brand-primary" />
                    Delivery Address
                  </h2>

                  {savedAddresses.length > 0 && !showNewAddressForm && (
                    <div className="mb-6 space-y-3">
                      {savedAddresses.map((addr) => (
                        <div 
                          key={addr._id}
                          onClick={() => {
                            setSelectedAddressId(addr._id);
                            setAddress({
                              name: addr.fullName,
                              phone: addr.phone,
                              address: `${addr.addressLine1}${addr.addressLine2 ? ", " + addr.addressLine2 : ""}`,
                              pincode: addr.postalCode,
                              city: addr.city,
                              state: addr.state,
                            });
                          }}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedAddressId === addr._id ? "border-brand-primary bg-brand-primary/5" : "border-brand-border"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium text-sm">{addr.type} <span className="font-normal text-brand-muted">- {addr.fullName}</span></p>
                            {addr.isDefault && <span className="text-[10px] bg-brand-primary text-white px-2 py-0.5 rounded">Default</span>}
                          </div>
                          <p className="text-sm text-brand-muted">{addr.addressLine1}, {addr.addressLine2 ? `${addr.addressLine2}, ` : ""}{addr.city}, {addr.state} - {addr.postalCode}</p>
                          <p className="text-sm text-brand-muted mt-1">Phone: {addr.phone}</p>
                        </div>
                      ))}
                      <button 
                        onClick={() => setShowNewAddressForm(true)}
                        className="text-brand-primary text-sm font-medium hover:underline mt-2 inline-block"
                      >
                        + Add New Address
                      </button>
                    </div>
                  )}

                  {showNewAddressForm && (
                    <>
                      {savedAddresses.length > 0 && (
                        <button 
                          onClick={() => setShowNewAddressForm(false)}
                          className="text-brand-primary text-sm font-medium hover:underline mb-4 inline-block"
                        >
                          ← Back to Saved Addresses
                        </button>
                      )}
                      <div className="grid sm:grid-cols-2 gap-5 mt-4">
                        <div>
                          <label className="text-xs uppercase tracking-widest font-bold text-brand-muted">Full Name</label>
                          <input
                            type="text"
                            value={address.name}
                            onChange={(e) => setAddress({ ...address, name: e.target.value })}
                            className="mt-2 w-full h-11 px-4 border border-brand-border bg-brand-bg rounded-xl focus:outline-none focus:border-brand-primary text-sm font-medium text-brand-text"
                            placeholder="Enter your name"
                          />
                        </div>
                        <div>
                          <label className="text-xs uppercase tracking-widest font-bold text-brand-muted">Phone Number</label>
                          <input
                            type="tel"
                            value={address.phone}
                            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                            className="mt-2 w-full h-11 px-4 border border-brand-border bg-brand-bg rounded-xl focus:outline-none focus:border-brand-primary text-sm font-medium text-brand-text"
                            placeholder="10-digit mobile number"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="text-xs uppercase tracking-widest font-bold text-brand-muted">Address</label>
                          <textarea
                            value={address.address}
                            onChange={(e) => setAddress({ ...address, address: e.target.value })}
                            className="mt-2 w-full h-24 px-4 py-3 border border-brand-border bg-brand-bg rounded-xl focus:outline-none focus:border-brand-primary resize-none text-sm font-medium text-brand-text"
                            placeholder="House no, building, street, area"
                          />
                        </div>
                        <div>
                          <label className="text-xs uppercase tracking-widest font-bold text-brand-muted">Pincode</label>
                          <input
                            type="text"
                            value={address.pincode}
                            onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                            className="mt-2 w-full h-11 px-4 border border-brand-border bg-brand-bg rounded-xl focus:outline-none focus:border-brand-primary text-sm font-medium text-brand-text"
                            placeholder="6-digit pincode"
                          />
                        </div>
                        <div>
                          <label className="text-xs uppercase tracking-widest font-bold text-brand-muted">City</label>
                          <input
                            type="text"
                            value={address.city}
                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                            className="mt-2 w-full h-11 px-4 border border-brand-border bg-brand-bg rounded-xl focus:outline-none focus:border-brand-primary text-sm font-medium text-brand-text"
                            placeholder="City"
                          />
                        </div>
                        <div>
                          <label className="text-xs uppercase tracking-widest font-bold text-brand-muted">State</label>
                          <select
                            value={address.state}
                            onChange={(e) => setAddress({ ...address, state: e.target.value })}
                            className="mt-2 w-full h-11 px-4 border border-brand-border bg-brand-bg rounded-xl focus:outline-none focus:border-brand-primary text-sm font-medium text-brand-text"
                          >
                            <option value="">Select State</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="West Bengal">West Bengal</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}
                  <button
                    onClick={async () => {
                      if (showNewAddressForm && address.name && address.phone && address.city && address.state && address.pincode && address.address) {
                        // Attempt to save new address to DB
                        const newAddrObj = {
                          fullName: address.name,
                          phone: address.phone,
                          addressLine1: address.address,
                          addressLine2: "",
                          city: address.city,
                          state: address.state,
                          postalCode: address.pincode,
                          type: "Home",
                        };
                        try {
                          const res = await fetch("/api/user/addresses", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(newAddrObj)
                          });
                          if (res.ok) {
                            const data = await res.json();
                            setSavedAddresses(data.addresses);
                            const newlyAdded = data.addresses[data.addresses.length - 1];
                            setSelectedAddressId(newlyAdded._id);
                            setShowNewAddressForm(false);
                          }
                        } catch (e) {
                          console.error(e);
                        }
                      }
                      setCurrentStep(2);
                    }}
                    className="mt-6 w-full py-3.5 bg-brand-dark text-brand-primary font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-brand-primary hover:text-brand-dark transition-all duration-300 shadow-md"
                  >
                    Continue to Delivery
                  </button>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-brand-secondary/40 rounded-2xl p-6 border border-brand-border/60 shadow-sm"
                >
                  <h2 className="font-bold text-xs uppercase tracking-widest text-brand-text mb-6 flex items-center gap-2">
                    <Truck size={15} className="text-brand-primary" />
                    Delivery Options
                  </h2>
                  <div className="space-y-4">
                    <label
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                        deliveryOption === "standard"
                          ? "border-brand-primary bg-brand-primary/5 text-brand-dark"
                          : "border-brand-border hover:border-brand-primary/30 text-brand-text"
                      }`}
                    >
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryOption === "standard"}
                        onChange={() => setDeliveryOption("standard")}
                        className="w-4 h-4 accent-brand-primary"
                      />
                      <div className="flex-1">
                        <p className="font-bold text-sm">Standard Delivery</p>
                        <p className="text-xs text-brand-muted font-medium mt-0.5">7-10 business days</p>
                      </div>
                      <span className="font-bold text-sm">
                        {subtotal > 10000 ? "Free" : formatPrice(499)}
                      </span>
                    </label>
                    <label
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                        deliveryOption === "express"
                          ? "border-brand-primary bg-brand-primary/5 text-brand-dark"
                          : "border-brand-border hover:border-brand-primary/30 text-brand-text"
                      }`}
                    >
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryOption === "express"}
                        onChange={() => setDeliveryOption("express")}
                        className="w-4 h-4 accent-brand-primary"
                      />
                      <div className="flex-1">
                        <p className="font-bold text-sm">Express Delivery</p>
                        <p className="text-xs text-brand-muted font-medium mt-0.5">2-3 business days</p>
                      </div>
                      <span className="font-bold text-sm">{formatPrice(499)}</span>
                    </label>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 py-3.5 border border-brand-border text-brand-muted hover:text-brand-text font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-brand-secondary transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="flex-1 py-3.5 bg-brand-dark text-brand-primary font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-brand-primary hover:text-brand-dark transition-all duration-300 shadow-md"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-brand-secondary/40 rounded-2xl p-6 border border-brand-border/60 shadow-sm"
                >
                  <h2 className="font-bold text-xs uppercase tracking-widest text-brand-text mb-6 flex items-center gap-2">
                    <CreditCard size={15} className="text-brand-primary" />
                    Payment Method
                  </h2>
                  <div className="space-y-4">
                    {[
                      { id: "upi", label: "UPI", sub: "Pay using any UPI app" },
                      { id: "card", label: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay" },
                      { id: "netbanking", label: "Net Banking", sub: "All major banks supported" },
                      { id: "emi", label: "EMI", sub: "Starting at ₹999/month" },
                      { id: "cod", label: "Cash on Delivery", sub: "Pay when you receive" },
                      { id: "wallet", label: "Wallets", sub: "Paytm, PhonePe, Amazon Pay" },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                          paymentMethod === method.id
                            ? "border-brand-primary bg-brand-primary/5 text-brand-dark"
                            : "border-brand-border hover:border-brand-primary/30 text-brand-text"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === method.id}
                          onChange={() => setPaymentMethod(method.id)}
                          className="w-4 h-4 accent-brand-primary"
                        />
                        <div>
                          <p className="font-bold text-sm">{method.label}</p>
                          <p className="text-xs text-brand-muted font-medium mt-0.5">{method.sub}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="flex-1 py-3.5 border border-brand-border text-brand-muted hover:text-brand-text font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-brand-secondary transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setCurrentStep(4)}
                      className="flex-1 py-3.5 bg-brand-dark text-brand-primary font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-brand-primary hover:text-brand-dark transition-all duration-300 shadow-md"
                    >
                      Review Order
                    </button>
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-brand-secondary/40 rounded-2xl p-6 border border-brand-border/60 shadow-sm"
                >
                  <h2 className="font-bold text-xs uppercase tracking-widest text-brand-text mb-6 flex items-center gap-2">
                    <Check size={15} className="text-brand-primary" />
                    Review & Confirm Order
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="bg-brand-bg rounded-xl p-5 border border-brand-border/40">
                      <p className="font-bold text-xs uppercase tracking-widest text-brand-primary mb-2">Delivery Address</p>
                      <p className="text-sm text-brand-text font-medium leading-relaxed">
                        {address.name || "John Doe"}, {address.address || "123 Main Street"}, {address.city || "Mumbai"}, {address.state || "Maharashtra"} - {address.pincode || "400001"}
                      </p>
                    </div>
                    <div className="bg-brand-bg rounded-xl p-5 border border-brand-border/40">
                      <p className="font-bold text-xs uppercase tracking-widest text-brand-primary mb-2">Delivery Method</p>
                      <p className="text-sm text-brand-text font-medium">
                        {deliveryOption === "standard" ? "Standard (7-10 business days)" : "Express (2-3 business days)"}
                      </p>
                    </div>
                    <div className="bg-brand-bg rounded-xl p-5 border border-brand-border/40">
                      <p className="font-bold text-xs uppercase tracking-widest text-brand-primary mb-2">Payment Method</p>
                      <p className="text-sm text-brand-text font-medium capitalize">
                        {paymentMethod === "upi" ? "UPI" : paymentMethod === "card" ? "Credit/Debit Card" : paymentMethod === "netbanking" ? "Net Banking" : paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod === "emi" ? "EMI" : "Wallet"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="flex-1 py-3.5 border border-brand-border text-brand-muted hover:text-brand-text font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-brand-secondary transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      className="flex-1 py-3.5 bg-brand-dark text-brand-primary font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-brand-primary hover:text-brand-dark transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                    >
                      <Lock size={13} />
                      Place Order
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-brand-secondary/40 rounded-2xl p-6 border border-brand-border/60 shadow-sm text-brand-text">
              <h2 className="font-bold text-xs uppercase tracking-widest text-brand-text mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-4">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-brand-secondary shrink-0 border border-brand-border/40">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-brand-text line-clamp-1">{item.name}</p>
                      <p className="text-[10px] text-brand-muted uppercase tracking-wider font-semibold mt-0.5">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-bold text-brand-text">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-brand-border pt-4 space-y-3 text-xs font-semibold text-brand-muted">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-brand-text font-bold">{formatPrice(subtotal)}</span>
                </div>
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
              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-brand-muted font-bold uppercase tracking-widest border-t border-brand-border/40 pt-4">
                <Shield size={13} className="text-brand-success" />
                100% Secure SSL Payment
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
