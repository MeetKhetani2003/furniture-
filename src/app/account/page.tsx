"use client";

import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { User, MapPin, Package, Heart, LogOut, CheckCircle, Truck, ShoppingBag, Trash2 } from "lucide-react";
import { showToast } from "@/components/common/Toaster";
import Barcode from "react-barcode";

const cn = (...c: (string | boolean | undefined)[]) => c.filter(Boolean).join(" ");

export default function Profile() {
  const { data: session, update } = useSession();
  
  const [activeSection, setActiveSection] = useState<"info" | "orders" | "wishlist" | "addresses">("info");
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [phone, setPhone] = useState("");
  const [savingPhone, setSavingPhone] = useState(false);

  // Address fields
  const [addresses, setAddresses] = useState<string[]>([]);
  const [defaultAddress, setDefaultAddress] = useState<string>("");

  const [profileAddr1, setProfileAddr1] = useState("");
  const [profileAddr2, setProfileAddr2] = useState("");
  const [profileCity, setProfileCity] = useState("");
  const [profileState, setProfileState] = useState("");
  const [profilePincode, setProfilePincode] = useState("");

  useEffect(() => {
    if (session?.user?.email) {
      fetchOrders();
      // Temporary mapping for addresses (array of strings) if the DB supports it
      setAddresses((session.user as any).addresses || []);
      setDefaultAddress((session.user as any).defaultAddress || "");
      setPhone((session.user as any).phone || "");
    }
  }, [session, activeSection]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab === "orders" || tab === "wishlist" || tab === "addresses") {
        setActiveSection(tab as any);
      }
    }
  }, []);

  const saveAddressesToDb = async (newAddressesList: string[], newDefault: string) => {
    if (!session?.user?.email) return;
    try {
      const res = await fetch("/api/user/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          addresses: newAddressesList,
          defaultAddress: newDefault,
        }),
      });
      const data = await res.json();
      if (data.success) {
        await update();
      }
    } catch (err) {
      console.error("Failed to save addresses:", err);
    }
  };

  const handleSavePhone = async () => {
    if (!session?.user?.email) return;
    setSavingPhone(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email, phone }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("Phone number saved successfully", "success");
        if (data.couponCode) {
          showToast("Welcome! A 10% discount coupon has been sent to your email! 🎉", "success");
        }
        await update({ phone });
      } else {
        showToast("Failed to save phone number", "info");
      }
    } catch (err) {
      console.error(err);
      showToast("Error saving phone number", "info");
    } finally {
      setSavingPhone(false);
    }
  };

  const handleAddAddress = async () => {
    if (!profileAddr1.trim() || !profileCity.trim() || !profileState.trim() || !profilePincode.trim()) {
      showToast("Address Line 1, City, State, and Pincode are required", "info");
      return;
    }
    if (!/^\d{6}$/.test(profilePincode.trim())) {
      showToast("Pincode must be a 6-digit number", "info");
      return;
    }

    const formatted = [
      profileAddr1.trim(),
      profileAddr2.trim(),
      profileCity.trim(),
      profileState.trim(),
      profilePincode.trim()
    ].filter(Boolean).join(" | ");

    const updatedAddresses = [...addresses, formatted];
    const updatedDefault = defaultAddress ? defaultAddress : formatted;

    setAddresses(updatedAddresses);
    if (!defaultAddress) {
      setDefaultAddress(updatedDefault);
    }
    setProfileAddr1("");
    setProfileAddr2("");
    setProfileCity("");
    setProfileState("");
    setProfilePincode("");

    await saveAddressesToDb(updatedAddresses, updatedDefault);
  };

  const handleDeleteAddress = async (addrToDelete: string) => {
    const updatedAddresses = addresses.filter((a) => a !== addrToDelete);
    let updatedDefault = defaultAddress;
    if (defaultAddress === addrToDelete) {
      updatedDefault = updatedAddresses.length > 0 ? updatedAddresses[0] : "";
    }

    setAddresses(updatedAddresses);
    setDefaultAddress(updatedDefault);

    await saveAddressesToDb(updatedAddresses, updatedDefault);
  };

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await fetch(`/api/user/orders`);
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingOrders(false);
    }
  };

  if (!session) {
    return (
      <div className="mx-auto max-w-[1240px] px-4 py-16 md:py-24 flex items-center justify-center min-h-screen bg-brand-bg">
        <div className="w-full max-w-[450px] rounded-3xl border border-brand-border/50 bg-white p-8 text-center shadow-xl shadow-brand-primary/5">
          <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-brand-secondary text-brand-primary">
            <User className="h-7 w-7" />
          </div>
          <h2 className="text-[24px] font-[family-name:var(--font-playfair)] font-bold text-brand-text tracking-tight">Welcome to Premium Furniture</h2>
          <p className="mt-2 text-[14.5px] text-brand-muted leading-relaxed">Sign in to sync your cart, view order history, track deliveries, and manage addresses.</p>

          <button
            onClick={() => signIn("google")}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-full border border-brand-border bg-white py-3.5 text-[15px] font-semibold text-brand-text transition hover:bg-brand-secondary hover:border-brand-primary"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.64 15.01 1 12 1 7.24 1 3.2 3.74 1.25 7.74l3.83 2.97C6.01 7.27 8.78 5.04 12 5.04z" />
              <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.44h6.44c-.28 1.48-1.12 2.73-2.38 3.58l3.69 2.86c2.16-1.99 3.4-4.92 3.4-8.54z" />
              <path fill="#FBBC05" d="M5.08 14.73c-.22-.66-.35-1.37-.35-2.1s.13-1.44.35-2.1L1.25 7.56C.45 9.17 0 10.97 0 12.87c0 1.9.45 3.7 1.25 5.31l3.83-3.45z" />
              <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.69-2.86c-1.02.68-2.33 1.09-4.27 1.09-3.22 0-5.99-2.23-6.96-5.26l-3.83 2.97C3.2 20.26 7.24 23 12 23z" />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 xl:px-20 py-8 md:py-12">
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-brand-text mb-8">
          My Account
        </h1>
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">

          {/* Sidebar */}
          <div className="flex flex-col gap-2">
            <div className="mb-4 flex items-center gap-4 rounded-2xl border border-brand-border/50 p-5 bg-white shadow-sm">
              {session.user?.image ? (
                <img src={session.user.image} alt="" className="h-12 w-12 rounded-full border border-brand-border object-cover" />
              ) : (
                <div className="grid h-12 w-12 place-items-center rounded-full bg-brand-primary text-[18px] font-bold text-white">
                  {session.user?.name ? session.user.name.substring(0, 2).toUpperCase() : "US"}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="truncate text-[15.5px] font-semibold text-brand-text">{session.user?.name}</div>
                <div className="truncate text-[12.5px] text-brand-muted">{session.user?.email}</div>
              </div>
            </div>

            {[
              { id: "info", icon: User, label: "Personal Information" },
              { id: "orders", icon: Package, label: "My Orders", badge: orders.length > 0 ? orders.length : undefined },
              { id: "wishlist", icon: Heart, label: "Wishlist" },
              { id: "addresses", icon: MapPin, label: "Saved Addresses" },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as any)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-[14.5px] font-medium transition ${isActive ? "bg-brand-primary text-white shadow-sm" : "text-brand-text hover:bg-white"}`}
                >
                  <Icon className="h-4.5 w-4.5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge !== undefined && (
                    <span className={`grid h-5 min-w-[20px] place-items-center rounded-full px-1.5 text-[10.5px] ${isActive ? "bg-white text-brand-primary" : "bg-brand-secondary text-brand-primary"}`}>{item.badge}</span>
                  )}
                </button>
              );
            })}

            <button onClick={() => signOut()} className="mt-8 flex items-center gap-3 rounded-xl px-4 py-3 text-[14.5px] font-medium text-red-500 transition hover:bg-red-50">
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>

          {/* Content Area */}
          <div className="rounded-3xl border border-brand-border/50 bg-white p-6 md:p-8 shadow-sm min-h-[450px]">

            {/* A. PERSONAL INFORMATION */}
            {activeSection === "info" && (
              <div>
                <h2 className="text-[20px] font-[family-name:var(--font-playfair)] font-bold text-brand-text">Personal Information</h2>
                <p className="mt-1 text-[14px] text-brand-muted">Manage your personal details and account settings.</p>

                {!(session.user as any)?.phone && (
                  <div className="mt-6 rounded-xl border border-brand-primary/20 bg-brand-secondary p-4">
                    <div className="flex items-start gap-3">
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-brand-primary shadow-sm">
                        🎁
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-brand-text">Complete your profile</h4>
                        <p className="mt-1 text-[13px] text-brand-muted leading-relaxed">
                          Add your mobile number below to complete your profile and get a <strong className="font-bold text-brand-primary">10% discount coupon</strong> delivered straight to your inbox!
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[13px] font-medium text-brand-text">Full Name</label>
                    <input type="text" readOnly value={session.user?.name || ""} className="h-11 w-full rounded-xl border border-brand-border bg-brand-bg px-4 text-[14px] text-brand-muted outline-none cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[13px] font-medium text-brand-text">Mobile Number</label>
                    <div className="flex gap-2">
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91"
                        className="h-11 w-full rounded-xl border border-brand-border bg-white px-4 text-[14px] text-brand-text outline-none focus:border-brand-primary"
                      />
                      <button
                        onClick={handleSavePhone}
                        disabled={savingPhone || phone === (session.user as any).phone}
                        className="h-11 px-6 rounded-xl bg-brand-primary text-white text-[13px] font-medium transition hover:bg-brand-dark disabled:opacity-50"
                      >
                        {savingPhone ? "Saving" : "Save"}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[13px] font-medium text-brand-text">Email Address</label>
                    <input type="email" readOnly value={session.user?.email || ""} className="h-11 w-full rounded-xl border border-brand-border bg-brand-bg px-4 text-[14px] text-brand-muted outline-none cursor-not-allowed" />
                  </div>
                </div>
              </div>
            )}

            {/* B. MY ORDERS */}
            {activeSection === "orders" && (
              <div>
                <h2 className="text-[20px] font-[family-name:var(--font-playfair)] font-bold text-brand-text">My Orders</h2>
                <p className="mt-1 text-[14px] text-brand-muted">Track shipping and review order history.</p>

                {loadingOrders ? (
                  <div className="mt-12 text-center text-[14px] text-brand-muted">Loading orders...</div>
                ) : orders.length === 0 ? (
                  <div className="mt-16 text-center">
                    <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-brand-secondary text-brand-muted"><ShoppingBag className="h-6 w-6" /></div>
                    <div className="text-[16px] font-bold text-brand-text">No orders yet</div>
                    <p className="text-[13.5px] text-brand-muted mt-1">Furniture you purchase will appear here.</p>
                  </div>
                ) : (
                  <div className="mt-8 space-y-6">
                    {orders.map((order) => (
                      <div key={order._id} className="rounded-2xl border border-brand-border/50 p-5 hover:border-brand-primary/50 transition bg-white">
                        {/* Order Header */}
                        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-brand-border/50 pb-4">
                          <div className="flex-1 min-w-0">
                            <div className="text-[11px] font-bold text-brand-muted uppercase tracking-wide mb-0.5">Order Number</div>
                            <div className="font-mono text-[13px] text-brand-primary font-bold break-all">#{order._id.substring(order._id.length - 8).toUpperCase()}</div>
                            <div className="text-[12px] text-brand-muted mt-1">
                              Placed: <strong className="text-brand-text">{new Date(order.createdAt).toLocaleDateString("en-IN", { dateStyle: "medium" })}</strong>
                              {" · "}
                              <span className="capitalize">{order.paymentMethod === "cod" ? "💵 Cash on Delivery" : "💳 Online Payment"}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${
                              order.paymentStatus === "Completed"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-yellow-50 text-yellow-700 border-yellow-200"
                            }`}>
                              {order.paymentStatus === "Completed" ? "✅ Paid" : "⏳ Pending Payment"}
                            </span>
                            <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${
                              order.shippingStatus === "Delivered"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : order.shippingStatus === "Cancelled"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : "bg-brand-secondary text-brand-primary border-brand-primary/20"
                            }`}>
                              {order.shippingStatus}
                            </span>
                          </div>
                        </div>

                        {/* Delivery Address */}
                        {order.shippingDetails && (
                          <div className="mt-4 mb-2 rounded-xl bg-brand-bg border border-brand-border/50 p-4 text-[12.5px]">
                            <div className="text-[11px] font-bold text-brand-muted uppercase tracking-wide mb-2">📦 Delivery Details</div>
                            <div className="grid sm:grid-cols-2 gap-2">
                              <div><span className="font-semibold text-brand-text">Name: </span><span className="text-brand-muted">{order.shippingDetails.name || "—"}</span></div>
                              <div><span className="font-semibold text-brand-text">Phone: </span><span className="text-brand-muted">{order.shippingDetails.phone || "—"}</span></div>
                              <div className="sm:col-span-2"><span className="font-semibold text-brand-text">Address: </span><span className="text-brand-muted">{order.shippingDetails.address || "—"}</span></div>
                            </div>
                          </div>
                        )}

                        {/* Items */}
                        <div className="py-4 border-b border-brand-border/50">
                          <div className="text-[11px] font-bold text-brand-muted uppercase tracking-wide mb-3">🛋️ Furniture Items</div>
                          <ul className="space-y-4">
                            {order.items.map((item: any, idx: number) => (
                              <li key={idx} className="flex items-start gap-4 text-[13.5px]">
                                <div className="h-16 w-16 rounded-xl bg-brand-secondary border border-brand-border/50 overflow-hidden shrink-0">
                                  <img src={item.image} className="h-full w-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0 mt-1">
                                  <span className="font-semibold text-brand-text block truncate hover:text-brand-primary transition text-[14px]">
                                    <Link href={`/product/${item.productId}`}>{item.title}</Link>
                                  </span>
                                  <span className="inline-block mt-1 text-brand-muted text-[12px]">
                                    Qty: {item.quantity}
                                  </span>
                                </div>
                                <div className="text-right shrink-0 mt-1">
                                  <div className="text-[12px] text-brand-muted">{item.quantity}x ₹{item.price}</div>
                                  <div className="font-bold text-brand-text text-[14px]">₹{item.price * item.quantity}</div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Stepper Tracking UI */}
                        {order.shippingStatus !== "Cancelled" && (
                          <div className="pt-6">
                            <div className="text-[13px] font-semibold text-brand-text mb-6 flex items-center gap-1.5"><Truck className="h-4 w-4 text-brand-primary" /> Live Tracking Status</div>
                            <div className="relative flex items-center justify-between mb-8 max-w-2xl mx-auto">
                              {/* Tracking line */}
                              <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 bg-brand-border" />
                              <div className="absolute left-0 top-1/2 h-1 -translate-y-1/2 bg-brand-primary transition-all" style={{
                                width: (order.shippingStatus === "Processing" || order.shippingStatus === "Pending") ? "15%" : order.shippingStatus === "Shipped" ? "50%" : "100%"
                              }} />

                              {[
                                { label: "Processing", icon: CheckCircle, reached: true },
                                { label: "Shipped", icon: Truck, reached: order.shippingStatus === "Shipped" || order.shippingStatus === "Delivered" },
                                { label: "Delivered", icon: CheckCircle, reached: order.shippingStatus === "Delivered" },
                              ].map((step, sIdx) => {
                                const StepIcon = step.icon;
                                return (
                                  <div key={sIdx} className="relative z-10 flex flex-col items-center">
                                    <div className={`grid h-10 w-10 place-items-center rounded-full border-4 ${step.reached ? "bg-brand-primary border-brand-primary text-white" : "bg-white border-brand-bg text-brand-muted"}`}>
                                      <StepIcon className="h-4 w-4" />
                                    </div>
                                    <span className={`text-[12px] font-medium mt-2 bg-white px-2 ${step.reached ? "text-brand-primary" : "text-brand-muted"}`}>{step.label}</span>
                                  </div>
                                );
                              })}
                            </div>

                            {order.trackingNumber && (
                              <div className="mt-4 text-[13px] text-brand-muted bg-brand-bg p-3 rounded-xl border border-brand-border/50 flex justify-between items-center">
                                <div>
                                  <strong>AWB Tracking:</strong>{" "}
                                  {order.trackingLink ? (
                                    <a href={order.trackingLink} target="_blank" rel="noopener noreferrer" className="font-mono text-brand-primary hover:underline font-medium">
                                      {order.trackingNumber}
                                    </a>
                                  ) : (
                                    <span className="font-mono text-brand-primary font-medium">{order.trackingNumber}</span>
                                  )}
                                </div>
                                <span className="text-[11px] bg-white px-2 py-1 rounded border border-brand-border shadow-sm">Shiprocket</span>
                              </div>
                            )}

                            <div className="mt-6 flex flex-col items-center justify-center p-4 rounded-2xl border border-dashed border-brand-border bg-brand-bg max-w-[240px] mx-auto">
                              <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider mb-3">Order Barcode</span>
                              <div className="bg-white p-2 rounded border border-brand-border">
                                <Barcode 
                                  value={order._id.substring(order._id.length - 12)} 
                                  width={1.2} 
                                  height={40} 
                                  fontSize={12} 
                                  displayValue={true} 
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Bill Summary */}
                        <div className="rounded-xl bg-brand-bg border border-brand-border/50 p-4 text-[13px] mt-6">
                          <div className="text-[11px] font-bold text-brand-muted uppercase tracking-wide mb-3">🧾 Bill Summary</div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-brand-text">
                              <span>Subtotal</span>
                              <span className="font-medium">₹{order.subtotal}</span>
                            </div>
                            {order.discount > 0 && (
                              <div className="flex justify-between text-green-600">
                                <span>Coupon Discount</span>
                                <span className="font-medium">-₹{order.discount}</span>
                              </div>
                            )}
                            {order.shippingFee > 0 ? (
                              <div className="flex justify-between text-brand-text">
                                <span>Shipping Fee</span>
                                <span className="font-medium">₹{order.shippingFee}</span>
                              </div>
                            ) : (
                              <div className="flex justify-between text-green-600">
                                <span>Shipping</span>
                                <span className="font-medium">Free</span>
                              </div>
                            )}
                            <div className="flex justify-between border-t border-brand-border pt-3 mt-2 font-bold text-brand-text text-[15px]">
                              <span>Grand Total</span>
                              <span className="text-brand-primary">₹{order.total}</span>
                            </div>
                            {order.paymentMethod === "cod" && order.paymentStatus !== "Completed" && (
                              <div className="mt-3 rounded-lg bg-yellow-50 border border-yellow-200 px-3 py-2 text-[12px] text-yellow-800 font-medium">
                                ⏳ Amount collectible on delivery
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* C. WISHLIST */}
            {activeSection === "wishlist" && (
              <div>
                <h2 className="text-[20px] font-[family-name:var(--font-playfair)] font-bold text-brand-text">My Wishlist</h2>
                <p className="mt-1 text-[14px] text-brand-muted">Items you've bookmarked for later.</p>

                <div className="mt-8 text-center py-12 border border-dashed rounded-xl border-brand-border">
                  <Heart className="w-8 h-8 text-brand-muted mx-auto mb-3" />
                  <p className="text-[14px] text-brand-muted">Your wishlist functionality is managed in the header, but will appear here soon.</p>
                </div>
              </div>
            )}

            {/* D. ADDRESSES */}
            {activeSection === "addresses" && (
              <div>
                <h2 className="text-[20px] font-[family-name:var(--font-playfair)] font-bold text-brand-text">Saved Addresses</h2>
                <p className="mt-1 text-[14px] text-brand-muted">Manage your delivery addresses for faster checkout.</p>

                <div className="mt-8">
                  <div className="rounded-2xl border border-brand-border/50 bg-brand-bg p-5 mb-8">
                    <h3 className="text-[14px] font-bold text-brand-text mb-4 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-brand-primary" /> Add New Address
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          placeholder="Flat, House no., Building, Company, Apartment"
                          value={profileAddr1}
                          onChange={(e) => setProfileAddr1(e.target.value)}
                          className="h-11 w-full rounded-xl border border-brand-border bg-white px-4 text-[13.5px] outline-none focus:border-brand-primary"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          placeholder="Area, Street, Sector, Village (Optional)"
                          value={profileAddr2}
                          onChange={(e) => setProfileAddr2(e.target.value)}
                          className="h-11 w-full rounded-xl border border-brand-border bg-white px-4 text-[13.5px] outline-none focus:border-brand-primary"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="City"
                          value={profileCity}
                          onChange={(e) => setProfileCity(e.target.value)}
                          className="h-11 w-full rounded-xl border border-brand-border bg-white px-4 text-[13.5px] outline-none focus:border-brand-primary"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="State"
                          value={profileState}
                          onChange={(e) => setProfileState(e.target.value)}
                          className="h-11 w-full rounded-xl border border-brand-border bg-white px-4 text-[13.5px] outline-none focus:border-brand-primary"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Pincode (6 digits)"
                          maxLength={6}
                          value={profilePincode}
                          onChange={(e) => setProfilePincode(e.target.value.replace(/\D/g, ""))}
                          className="h-11 w-full rounded-xl border border-brand-border bg-white px-4 text-[13.5px] outline-none focus:border-brand-primary"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          onClick={handleAddAddress}
                          className="h-11 w-full rounded-xl bg-brand-text text-white text-[13.5px] font-semibold transition hover:bg-brand-primary"
                        >
                          Save Address
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {addresses.map((addr, idx) => {
                      const isDefault = defaultAddress === addr;
                      return (
                        <div key={idx} className={`relative rounded-2xl border p-5 transition ${isDefault ? "border-brand-primary bg-brand-secondary/30" : "border-brand-border hover:border-brand-primary/50"}`}>
                          {isDefault && (
                            <span className="absolute right-5 top-5 rounded bg-brand-primary px-2 py-0.5 text-[10px] font-bold uppercase text-white tracking-wide">
                              Default
                            </span>
                          )}
                          <div className="flex items-start gap-4">
                            <div className="mt-0.5 text-brand-primary">
                              <MapPin className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <p className="text-[14px] text-brand-text font-medium leading-relaxed max-w-[85%]">{addr}</p>
                              <div className="mt-4 flex items-center gap-4">
                                {!isDefault && (
                                  <button onClick={() => { setDefaultAddress(addr); saveAddressesToDb(addresses, addr); }} className="text-[12.5px] font-semibold text-brand-primary hover:underline">
                                    Set as Default
                                  </button>
                                )}
                                <button onClick={() => handleDeleteAddress(addr)} className="text-[12.5px] font-semibold text-red-500 hover:underline flex items-center gap-1">
                                  <Trash2 className="h-3.5 w-3.5" /> Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
