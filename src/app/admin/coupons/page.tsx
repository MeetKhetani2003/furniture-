"use client";

import { useState, useEffect } from "react";
import { Plus, Tag, Trash2, Edit } from "lucide-react";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discountPercent: "",
    expiresAt: "",
    active: true
  });

  const fetchCoupons = async () => {
    try {
      const res = await fetch("/api/admin/coupons");
      const data = await res.json();
      if (data.coupons) setCoupons(data.coupons);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...newCoupon,
        code: newCoupon.code.toUpperCase(),
        discountPercent: Number(newCoupon.discountPercent),
        expiresAt: newCoupon.expiresAt ? new Date(newCoupon.expiresAt) : undefined,
      };
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setShowAddModal(false);
        setNewCoupon({ code: "", discountPercent: "", expiresAt: "", active: true });
        fetchCoupons();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-playfair)]">Discount Coupons</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-brand-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-dark transition-colors"
        >
          <Plus size={18} />
          Add Coupon
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Code</th>
                <th className="px-6 py-4">Discount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Expires At</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading coupons...</td>
                </tr>
              ) : coupons.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No coupons found.</td>
                </tr>
              ) : (
                coupons.map((coupon) => (
                  <tr key={coupon._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 font-mono font-bold text-brand-primary bg-brand-primary/5 px-3 py-1 rounded inline-block">
                        <Tag size={14} />
                        {coupon.code}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{coupon.discountPercent}% OFF</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${coupon.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {coupon.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {coupon.expiresAt ? new Date(coupon.expiresAt).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1 text-gray-400 hover:text-brand-primary mx-1"><Edit size={16} /></button>
                      <button className="p-1 text-gray-400 hover:text-red-600 mx-1"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold font-[family-name:var(--font-playfair)]">Add New Coupon</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-700">✕</button>
            </div>
            <form onSubmit={handleCreateCoupon} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code</label>
                <input type="text" required value={newCoupon.code} onChange={e => setNewCoupon({...newCoupon, code: e.target.value})} className="w-full px-3 py-2 border rounded-lg uppercase" placeholder="e.g. SUMMER20" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Percentage (%)</label>
                <input type="number" required min="1" max="100" value={newCoupon.discountPercent} onChange={e => setNewCoupon({...newCoupon, discountPercent: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="20" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date (Optional)</label>
                <input type="date" value={newCoupon.expiresAt} onChange={e => setNewCoupon({...newCoupon, expiresAt: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div className="flex items-center gap-2 mt-4">
                <input type="checkbox" id="active" checked={newCoupon.active} onChange={e => setNewCoupon({...newCoupon, active: e.target.checked})} className="rounded text-brand-primary focus:ring-brand-primary" />
                <label htmlFor="active" className="text-sm font-medium text-gray-700">Coupon is active immediately</label>
              </div>
              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-dark">Save Coupon</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
