"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  User,
  MapPin,
  Heart,
  Package,
  CreditCard,
  Bell,
  Settings,
  ChevronRight,
  Edit,
} from "lucide-react";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const menuItems = [
    { id: "profile", label: "My Profile", icon: User },
    { id: "orders", label: "My Orders", icon: Package, href: "/account/orders" },
    { id: "addresses", label: "Saved Addresses", icon: MapPin },
    { id: "wishlist", label: "Wishlist", icon: Heart, href: "/wishlist" },
    { id: "payments", label: "Payment Methods", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20 py-8">
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-brand-text mb-8">
          My Account
        </h1>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <div className="space-y-2">
            <div className="bg-white rounded-xl p-6 border border-brand-border/50 text-center mb-4">
              <div className="w-20 h-20 rounded-full bg-brand-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-3">
                JD
              </div>
              <h2 className="font-semibold text-lg">John Doe</h2>
              <p className="text-sm text-brand-muted">john.doe@email.com</p>
              <p className="text-sm text-brand-muted">+91 98765 43210</p>
            </div>
            {menuItems.map((item) => (
              item.href ? (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white transition-colors group"
                >
                  <item.icon size={18} className="text-brand-muted group-hover:text-brand-primary" />
                  <span className="flex-1 text-sm font-medium">{item.label}</span>
                  <ChevronRight size={16} className="text-brand-muted" />
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id ? "bg-white shadow-sm" : "hover:bg-white"
                  }`}
                >
                  <item.icon size={18} className={activeTab === item.id ? "text-brand-primary" : "text-brand-muted"} />
                  <span className="flex-1 text-sm font-medium text-left">{item.label}</span>
                  <ChevronRight size={16} className="text-brand-muted" />
                </button>
              )
            ))}
          </div>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 border border-brand-border/50"
          >
            {activeTab === "profile" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold text-lg">Personal Information</h2>
                  <button className="flex items-center gap-1 text-sm text-brand-primary">
                    <Edit size={14} /> Edit
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    { label: "Full Name", value: "John Doe" },
                    { label: "Email", value: "john.doe@email.com" },
                    { label: "Phone", value: "+91 98765 43210" },
                    { label: "Date of Birth", value: "15 March 1990" },
                    { label: "Gender", value: "Male" },
                    { label: "Member Since", value: "January 2023" },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="text-xs text-brand-muted uppercase tracking-wider">{field.label}</label>
                      <p className="mt-1 font-medium">{field.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "addresses" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold text-lg">Saved Addresses</h2>
                  <button className="px-4 py-2 bg-brand-primary text-white text-sm rounded-lg hover:bg-brand-dark transition-colors">
                    + Add New
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { type: "Home", address: "123, Green Park Society, Andheri West, Mumbai - 400053", default: true },
                    { type: "Office", address: "456, Business Hub, Bandra Kurla Complex, Mumbai - 400051", default: false },
                  ].map((addr, i) => (
                    <div key={i} className="border border-brand-border rounded-xl p-4 relative">
                      {addr.default && (
                        <span className="absolute top-3 right-3 text-[10px] bg-brand-primary text-white px-2 py-0.5 rounded">
                          Default
                        </span>
                      )}
                      <p className="font-medium text-sm mb-1">{addr.type}</p>
                      <p className="text-sm text-brand-muted">{addr.address}</p>
                      <div className="flex gap-3 mt-3">
                        <button className="text-xs text-brand-primary hover:underline">Edit</button>
                        <button className="text-xs text-red-500 hover:underline">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "payments" && (
              <div>
                <h2 className="font-semibold text-lg mb-6">Saved Payment Methods</h2>
                <div className="space-y-4">
                  {[
                    { type: "Credit Card", details: "**** **** **** 4242 (Visa)", expiry: "12/27" },
                    { type: "UPI", details: "john@upi", expiry: "" },
                  ].map((card, i) => (
                    <div key={i} className="flex items-center justify-between border border-brand-border rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-brand-secondary rounded-lg flex items-center justify-center">
                          <CreditCard size={18} className="text-brand-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{card.type}</p>
                          <p className="text-xs text-brand-muted">{card.details} {card.expiry && `| Exp: ${card.expiry}`}</p>
                        </div>
                      </div>
                      <button className="text-xs text-red-500 hover:underline">Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div>
                <h2 className="font-semibold text-lg mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { label: "Order Updates", desc: "Get notified about your order status", checked: true },
                    { label: "Promotions & Offers", desc: "Receive exclusive deals and discounts", checked: true },
                    { label: "New Arrivals", desc: "Be the first to know about new products", checked: false },
                    { label: "Price Drops", desc: "Get alerts when items in your wishlist drop in price", checked: true },
                  ].map((notif) => (
                    <div key={notif.label} className="flex items-center justify-between py-3 border-b border-brand-border/50">
                      <div>
                        <p className="font-medium text-sm">{notif.label}</p>
                        <p className="text-xs text-brand-muted">{notif.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={notif.checked} className="sr-only peer" />
                        <div className="w-11 h-6 bg-brand-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <h2 className="font-semibold text-lg mb-6">Account Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-brand-border/50">
                    <div>
                      <p className="font-medium text-sm">Change Password</p>
                      <p className="text-xs text-brand-muted">Update your account password</p>
                    </div>
                    <button className="px-4 py-2 border border-brand-border rounded-lg text-sm hover:bg-brand-secondary transition-colors">
                      Update
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-brand-border/50">
                    <div>
                      <p className="font-medium text-sm">Two-Factor Authentication</p>
                      <p className="text-xs text-brand-muted">Add an extra layer of security</p>
                    </div>
                    <button className="px-4 py-2 border border-brand-border rounded-lg text-sm hover:bg-brand-secondary transition-colors">
                      Enable
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-brand-border/50">
                    <div>
                      <p className="font-medium text-sm text-red-500">Delete Account</p>
                      <p className="text-xs text-brand-muted">Permanently delete your account and data</p>
                    </div>
                    <button className="px-4 py-2 border border-red-300 text-red-500 rounded-lg text-sm hover:bg-red-50 transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
