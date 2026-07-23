"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils/formatPrice";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [newProduct, setNewProduct] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    mrp: "",
    category: "",
    brand: "",
    stock: "",
    image: "",
  });

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      if (data.products) setProducts(data.products);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts(products.filter(p => p._id !== id));
      } else {
        const data = await res.json();
        alert("Failed to delete: " + data.error);
      }
    } catch (e) {
      console.error(e);
      alert("An error occurred while deleting.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => (p.name || "").toLowerCase().includes((searchQuery || "").toLowerCase()) || (p.sku || "").toLowerCase().includes((searchQuery || "").toLowerCase()));

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-playfair)]">Products</h1>
        <div className="flex items-center gap-3">
          <label className="bg-white border border-gray-200 text-brand-text px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer">
            <span>Bulk Upload (Excel)</span>
            <input 
              type="file" 
              accept=".xlsx,.xls,.csv" 
              className="hidden" 
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const formData = new FormData();
                formData.append('file', file);
                try {
                  const res = await fetch('/api/admin/products/bulk', { method: 'POST', body: formData });
                  if (res.ok) {
                    alert("Bulk upload successful!");
                    fetchProducts();
                  } else {
                    const data = await res.json();
                    alert("Error: " + data.error);
                  }
                } catch (err) {
                  alert("Failed to upload file");
                }
                // Reset input
                e.target.value = '';
              }}
            />
          </label>
          <Link 
            href="/admin/products/create"
            className="bg-brand-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-dark transition-colors"
          >
            <Plus size={18} />
            Add Product
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <input 
              type="text" 
              placeholder="Search products by name or SKU..."
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
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">Loading products...</td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No products found.</td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-gray-100 overflow-hidden">
                          {product.images && product.images[0] && (
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <span className="font-medium text-gray-900 line-clamp-1">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{product.sku}</td>
                    <td className="px-6 py-4 capitalize">{product.category}</td>
                    <td className="px-6 py-4 font-medium">{formatPrice(product.price)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${product.stock > 10 ? 'bg-green-100 text-green-700' : product.stock > 0 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                        {product.stock} in stock
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/admin/products/${product._id}/edit`} className="p-1 text-gray-400 hover:text-brand-primary mx-1 inline-block"><Edit size={16} /></Link>
                      <button onClick={() => handleDelete(product._id)} className="p-1 text-gray-400 hover:text-red-600 mx-1"><Trash2 size={16} /></button>
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
