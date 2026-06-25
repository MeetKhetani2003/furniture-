"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Package, Truck, CheckCircle, Clock, ChevronRight, MapPin } from "lucide-react";
import { formatPrice } from "@/lib/utils/formatPrice";

const orders = [
  {
    id: "PC7829341",
    date: "15 Jan 2025",
    status: "delivered",
    items: [
      { name: "Chesterfield Velvet 3-Seater Sofa", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=80", qty: 1, price: 45999 },
      { name: "Ceramic Vase Set of 3", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&q=80", qty: 1, price: 3499 },
    ],
    total: 49498,
    address: "123, Green Park Society, Mumbai - 400053",
  },
  {
    id: "PC7829102",
    date: "28 Dec 2024",
    status: "shipped",
    items: [
      { name: "Scandinavian Wooden Bed - Queen", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=200&q=80", qty: 1, price: 32999 },
    ],
    total: 32999,
    address: "456, Business Hub, Mumbai - 400051",
  },
  {
    id: "PC7828856",
    date: "10 Dec 2024",
    status: "delivered",
    items: [
      { name: "Brass Tripod Floor Lamp", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200&q=80", qty: 2, price: 8499 },
    ],
    total: 16998,
    address: "123, Green Park Society, Mumbai - 400053",
  },
  {
    id: "PC7828012",
    date: "22 Nov 2024",
    status: "cancelled",
    items: [
      { name: "Modern Pendant Light Cluster", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=200&q=80", qty: 1, price: 6999 },
    ],
    total: 6999,
    address: "123, Green Park Society, Mumbai - 400053",
  },
];

const statusConfig = {
  delivered: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50", label: "Delivered" },
  shipped: { icon: Truck, color: "text-blue-600", bg: "bg-blue-50", label: "Shipped" },
  processing: { icon: Clock, color: "text-amber-600", bg: "bg-amber-50", label: "Processing" },
  cancelled: { icon: Package, color: "text-red-600", bg: "bg-red-50", label: "Cancelled" },
};

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20 py-8">
        <div className="flex items-center gap-2 text-sm text-brand-muted mb-4">
          <Link href="/account" className="hover:text-brand-primary">My Account</Link>
          <ChevronRight size={14} />
          <span className="text-brand-text">Orders</span>
        </div>
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-brand-text mb-8">
          My Orders
        </h1>

        <div className="space-y-4">
          {orders.map((order, i) => {
            const status = statusConfig[order.status as keyof typeof statusConfig];
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl border border-brand-border/50 overflow-hidden"
              >
                <div className="p-4 sm:p-6 border-b border-brand-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs text-brand-muted">Order ID</p>
                      <p className="font-semibold text-sm">{order.id}</p>
                    </div>
                    <div className="w-px h-8 bg-brand-border" />
                    <div>
                      <p className="text-xs text-brand-muted">Date</p>
                      <p className="font-medium text-sm">{order.date}</p>
                    </div>
                    <div className="w-px h-8 bg-brand-border" />
                    <div>
                      <p className="text-xs text-brand-muted">Total</p>
                      <p className="font-semibold text-sm">{formatPrice(order.total)}</p>
                    </div>
                  </div>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                    <status.icon size={14} />
                    {status.label}
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="space-y-3">
                    {order.items.map((item, j) => (
                      <div key={j} className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-brand-secondary shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                          <p className="text-xs text-brand-muted">Qty: {item.qty}</p>
                        </div>
                        <span className="text-sm font-medium">{formatPrice(item.price * item.qty)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-brand-border/50 flex items-center gap-1 text-xs text-brand-muted">
                    <MapPin size={12} />
                    {order.address}
                  </div>
                  <div className="mt-4 flex gap-3">
                    {order.status === "delivered" && (
                      <button className="px-4 py-2 border border-brand-border rounded-lg text-sm hover:bg-brand-secondary transition-colors">
                        Write Review
                      </button>
                    )}
                    <button className="px-4 py-2 border border-brand-border rounded-lg text-sm hover:bg-brand-secondary transition-colors">
                      Track Order
                    </button>
                    <button className="px-4 py-2 bg-brand-primary text-white rounded-lg text-sm hover:bg-brand-dark transition-colors">
                      Reorder
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
