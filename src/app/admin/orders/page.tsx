"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Truck } from "lucide-react";
import { formatPrice } from "@/lib/utils/formatPrice";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/admin/orders")
      .then(res => res.json())
      .then(data => {
        if (data.orders) setOrders(data.orders);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredOrders = orders.filter(o => o._id.toLowerCase().includes(searchQuery.toLowerCase()) || o.shippingAddress?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-playfair)]">Orders Management</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <input 
              type="text" 
              placeholder="Search by Order ID or Customer Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-sm"
            />
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">Loading orders...</td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No orders found.</td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-xs">
                      #{order._id.substring(order._id.length - 8).toUpperCase()}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{order.shippingAddress?.fullName}</p>
                      <p className="text-gray-500 text-xs flex items-center gap-1 mt-0.5">
                        <MapPin size={10} /> {order.shippingAddress?.city}, {order.shippingAddress?.state}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {formatPrice(order.totalAmount)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium inline-flex items-center gap-1 ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                        order.status === 'Processing' ? 'bg-amber-100 text-amber-700' : 
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="px-3 py-1.5 bg-brand-primary text-white hover:bg-brand-dark rounded text-xs font-medium flex items-center gap-1 ml-auto transition-colors">
                        <Truck size={14} /> Update Status
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
