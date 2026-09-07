"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useWishlistStore } from "@/lib/stores/wishlistStore";

type AccountSection = "dashboard" | "orders" | "addresses" | "wishlist" | "configurations" | "appointments" | "reviews" | "preferences";

const NAV_ITEMS: { id: AccountSection; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "orders", label: "Orders" },
  { id: "addresses", label: "Addresses" },
  { id: "wishlist", label: "Wishlist" },
  { id: "configurations", label: "Saved Configurations" },
  { id: "appointments", label: "Design Appointments" },
  { id: "reviews", label: "Reviews" },
  { id: "preferences", label: "Preferences" },
];

const MOCK_ORDERS = [
  { id: "PC-10482", status: "Manufacturing", items: ["Verona 3-Seater Sofa", "Arden Coffee Table"], dispatch: "12 Sep", total: 189900 },
  { id: "PC-09345", status: "Delivered", items: ["Mira Lounge Chair"], dispatch: "14 Aug", total: 69900 },
];

export default function AccountPage() {
  const { data: session } = useSession();
  const wishlistItems = useWishlistStore(s => s.items);
  const [activeSection, setActiveSection] = useState<AccountSection>("dashboard");

  if (!session) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold mb-2">Sign In to Your Account</h1>
          <p className="text-brand-muted text-sm mb-8">View orders, wishlist, and manage your designs.</p>
          <Link href="/api/auth/signin"
            className="inline-block px-10 py-4 bg-brand-dark text-white font-bold text-[11px] uppercase tracking-widest hover:bg-brand-dark/90 transition-colors">
            SIGN IN
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-brand-dark">
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-brand-border">
        <h1 className="text-3xl font-[family-name:var(--font-playfair)] font-bold mb-1">My Account</h1>
        <p className="text-sm text-brand-muted">Customer dashboard and post-purchase management.</p>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-[200px_1fr] gap-12">

          {/* Sidebar Nav */}
          <aside>
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#b89c72] mb-4">MY ACCOUNT</p>
            <nav className="space-y-0">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full text-left py-3 text-[13px] font-semibold border-b border-brand-border/30 transition-colors ${
                    activeSection === item.id
                      ? "text-brand-primary"
                      : "text-brand-dark hover:text-brand-primary"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full text-left py-3 text-[13px] font-semibold text-red-500 hover:text-red-700 transition-colors"
              >
                Sign Out
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <div>

            {/* Dashboard */}
            {activeSection === "dashboard" && (
              <div>
                <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold mb-8">
                  Welcome back{session.user?.name ? `, ${session.user.name.split(" ")[0]}` : ""}
                </h2>

                {/* Overview Tiles */}
                <div className="grid grid-cols-2 gap-4 mb-10">
                  {[
                    { label: "Orders", sub: `${MOCK_ORDERS.length} active / recent`, action: "orders" as AccountSection },
                    { label: "Wishlist", sub: `${wishlistItems.length} saved pieces`, action: "wishlist" as AccountSection },
                    { label: "Design Appointments", sub: "1 upcoming", action: "appointments" as AccountSection },
                    { label: "Saved Configurations", sub: "4 saved", action: "configurations" as AccountSection },
                  ].map(tile => (
                    <button
                      key={tile.label}
                      onClick={() => setActiveSection(tile.action)}
                      className="group text-left border border-brand-border p-6 hover:border-brand-dark transition-colors"
                    >
                      <h3 className="font-bold text-[15px] text-brand-dark mb-1 group-hover:text-brand-primary transition-colors">{tile.label}</h3>
                      <p className="text-[12px] text-brand-muted mb-2">{tile.sub}</p>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#b89c72]">VIEW →</span>
                    </button>
                  ))}
                </div>

                {/* Recent Order */}
                <div>
                  <h3 className="font-[family-name:var(--font-playfair)] font-bold text-lg mb-4">Recent Order</h3>
                  {MOCK_ORDERS.slice(0, 1).map(order => (
                    <div key={order.id} className="border border-brand-border bg-[#f6f5f2] p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-bold text-[14px] text-brand-dark">Order {order.id}</p>
                          <p className="text-[12px] text-brand-muted mt-0.5">{order.status} · Estimated dispatch {order.dispatch}</p>
                        </div>
                        <p className="font-bold">₹{order.total.toLocaleString("en-IN")}</p>
                      </div>
                      <p className="text-[12px] text-brand-muted">{order.items.join(" · ")}</p>
                      <button onClick={() => setActiveSection("orders")}
                        className="mt-4 text-[10px] font-bold uppercase tracking-widest text-brand-dark underline underline-offset-4 hover:text-brand-primary transition-colors">
                        VIEW ORDER DETAILS →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Orders */}
            {activeSection === "orders" && (
              <div>
                <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold mb-6">Orders</h2>
                <div className="space-y-4">
                  {MOCK_ORDERS.map(order => (
                    <div key={order.id} className="border border-brand-border p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-bold text-[14px]">Order {order.id}</p>
                          <p className="text-[12px] text-brand-muted mt-0.5">{order.items.join(" · ")}</p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm ${order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                            {order.status}
                          </span>
                          <p className="font-bold mt-1">₹{order.total.toLocaleString("en-IN")}</p>
                        </div>
                      </div>
                      <p className="text-[11px] text-brand-muted">{order.status === "Delivered" ? `Delivered on ${order.dispatch}` : `Estimated dispatch: ${order.dispatch}`}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist */}
            {activeSection === "wishlist" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold">Wishlist</h2>
                  <Link href="/wishlist" className="text-[11px] font-bold uppercase tracking-widest text-brand-dark underline underline-offset-4 hover:text-brand-primary transition-colors">
                    VIEW ALL →
                  </Link>
                </div>
                {wishlistItems.length > 0 ? (
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlistItems.map(item => (
                      <Link key={item.productId} href={`/product/${item.slug}`} className="group block border border-brand-border/40 hover:border-brand-dark transition-colors">
                        <div className="aspect-square bg-[#f4f2ec] flex items-center justify-center overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply p-6 group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-4">
                          <h4 className="text-[13px] font-bold text-brand-dark line-clamp-2">{item.name}</h4>
                          <p className="text-[12px] font-bold mt-1">₹{item.price.toLocaleString("en-IN")}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-brand-muted text-sm">No saved items. <Link href="/living-room" className="underline hover:text-brand-primary transition-colors">Browse the collection</Link>.</p>
                )}
              </div>
            )}

            {/* Addresses */}
            {activeSection === "addresses" && (
              <div>
                <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold mb-6">Addresses</h2>
                <div className="border border-dashed border-brand-border p-8 text-center">
                  <p className="text-brand-muted text-sm mb-4">No saved addresses yet.</p>
                  <button className="px-8 py-3 border border-brand-dark text-brand-dark font-bold text-[11px] uppercase tracking-widest hover:bg-brand-dark hover:text-white transition-colors">
                    + ADD ADDRESS
                  </button>
                </div>
              </div>
            )}

            {/* Other sections placeholder */}
            {(activeSection === "configurations" || activeSection === "appointments" || activeSection === "reviews" || activeSection === "preferences") && (
              <div>
                <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold mb-6 capitalize">{activeSection.replace("-", " ")}</h2>
                <p className="text-brand-muted text-sm">This section is coming soon. Check back after your next purchase.</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
