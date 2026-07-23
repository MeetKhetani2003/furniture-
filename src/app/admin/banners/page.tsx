"use client";

import { useState, useEffect } from "react";
import { Plus, Image as ImageIcon, Trash2, Edit } from "lucide-react";

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newBanner, setNewBanner] = useState({
    title: "",
    subtitle: "",
    image: "",
    ctaText: "Shop Now",
    ctaLink: "/products",
    active: true,
    eyebrow: "",
    badge: ""
  });

  const fetchBanners = async () => {
    try {
      const res = await fetch("/api/admin/banners");
      const data = await res.json();
      if (data.banners) setBanners(data.banners);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleCreateBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBanner),
      });
      if (res.ok) {
        setShowAddModal(false);
        setNewBanner({ title: "", subtitle: "", image: "", ctaText: "Shop Now", ctaLink: "/products", active: true, eyebrow: "", badge: "" });
        fetchBanners();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-playfair)]">Home Banners</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-brand-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-dark transition-colors"
        >
          <Plus size={18} />
          Add Banner
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Details</th>
                <th className="px-6 py-4">CTA Link</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading banners...</td>
                </tr>
              ) : banners.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No banners found.</td>
                </tr>
              ) : (
                banners.map((banner) => (
                  <tr key={banner._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      {banner.image ? (
                        <img src={banner.image} alt={banner.title} className="h-16 w-32 object-cover rounded shadow-sm" />
                      ) : (
                        <div className="h-16 w-32 bg-gray-100 flex items-center justify-center rounded text-gray-400">
                          <ImageIcon size={24} />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{banner.title}</div>
                      <div className="text-gray-500 text-xs mt-1">{banner.subtitle}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{banner.ctaLink}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${banner.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {banner.active ? 'Active' : 'Inactive'}
                      </span>
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
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold font-[family-name:var(--font-playfair)]">Add New Banner</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-700">✕</button>
            </div>
            <form onSubmit={handleCreateBanner} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input type="text" required value={newBanner.image} onChange={e => setNewBanner({...newBanner, image: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="https://example.com/banner.jpg" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Main Title</label>
                  <input type="text" required value={newBanner.title} onChange={e => setNewBanner({...newBanner, title: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="Summer Sale" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                  <input type="text" value={newBanner.subtitle} onChange={e => setNewBanner({...newBanner, subtitle: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="Up to 50% off on all furniture" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Eyebrow Text</label>
                  <input type="text" value={newBanner.eyebrow} onChange={e => setNewBanner({...newBanner, eyebrow: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="New Arrivals" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Badge Text</label>
                  <input type="text" value={newBanner.badge} onChange={e => setNewBanner({...newBanner, badge: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="Limited Time" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                  <input type="text" value={newBanner.ctaText} onChange={e => setNewBanner({...newBanner, ctaText: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="Shop Now" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
                  <input type="text" value={newBanner.ctaLink} onChange={e => setNewBanner({...newBanner, ctaLink: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="/products" />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <input type="checkbox" id="active" checked={newBanner.active} onChange={e => setNewBanner({...newBanner, active: e.target.checked})} className="rounded text-brand-primary focus:ring-brand-primary" />
                <label htmlFor="active" className="text-sm font-medium text-gray-700">Banner is active</label>
              </div>
              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-dark">Save Banner</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
