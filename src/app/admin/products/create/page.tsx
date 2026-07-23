"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import Link from "next/link";

export default function CreateProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  
  const [categories, setCategories] = useState<any[]>([]);
  const [attributeSets, setAttributeSets] = useState<any[]>([]);
  const [activeAttributeSet, setActiveAttributeSet] = useState<any>(null);

  // Form State matching the new UI structure
  const [formData, setFormData] = useState<any>({
    store: "My Store",
    attributeSetId: "",
    typeOfProduct: "simple",
    sku: "",
    slug: "",
    name: "",
    visibility: "Catalog, Search",
    status: 1,
    selectionProducts: "No",
    categoryId: "",
    
    // Pricing & Stock
    price: 0,
    specialPrice: 0,
    cost: 0,
    stock: 0,
    
    // Rich Content
    description: "",
    warrantyTerms: "",
    careInstructions: "",

    // Media
    images: [],
    
    // Dynamic Attributes
    specifications: {}
  });

  useEffect(() => {
    fetch("/api/admin/categories").then(res => res.json()).then(setCategories);
    fetch("/api/admin/attributes").then(res => res.json()).then(setAttributeSets);
  }, []);

  useEffect(() => {
    // Generate slug from name
    if (!formData.slug && formData.name) {
      setFormData((prev: any) => ({ ...prev, slug: prev.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') }));
    }
  }, [formData.name, formData.slug]);

  useEffect(() => {
    if (formData.attributeSetId) {
      const set = attributeSets.find(s => s._id === formData.attributeSetId);
      setActiveAttributeSet(set || null);
    } else {
      setActiveAttributeSet(null);
    }
  }, [formData.attributeSetId, attributeSets]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Map new UI fields back to backend schema if needed
      const payload = {
        name: formData.name,
        slug: formData.slug,
        sku: formData.sku,
        status: formData.status,
        category: formData.categoryId,
        price: Number(formData.price),
        mrp: Number(formData.cost), // Mapping cost to mrp for backend or vice versa
        stock: Number(formData.stock),
        description_sections: [
          { title: "Description", content: formData.description },
          { title: "Warranty Terms", content: formData.warrantyTerms },
          { title: "Care Instructions", content: formData.careInstructions },
        ].filter(s => s.content),
        specifications: formData.specifications,
        images: formData.images
      };

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        router.push("/admin/products");
      } else {
        const err = await res.json();
        alert("Failed to save product: " + err.error);
      }
    } catch (error) {
      console.error(error);
      alert("Error saving product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-6 sticky top-0 bg-gray-50 py-4 z-10 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors border border-gray-100">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-gray-900">Create Product</h1>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" className="px-6 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm font-medium">
            Reset
          </button>
          <button 
            onClick={handleSubmit} 
            disabled={saving}
            className="bg-brand-primary text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-secondary transition-colors disabled:opacity-50 shadow-sm font-medium"
          >
            <Save size={18} />
            {saving ? "Saving..." : "Save Product"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* SECTION 1: General & Attributes (Two-Column Layout) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left Column: General */}
            <div>
              <h2 className="text-lg font-bold mb-6 text-brand-primary border-b pb-2">General</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm font-medium text-gray-700">Store</label>
                  <select value={formData.store} onChange={e => handleChange('store', e.target.value)} className="col-span-2 px-3 py-2 rounded-md border border-gray-300 text-sm focus:ring-brand-primary focus:border-brand-primary">
                    <option value="My Store">My Store</option>
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm font-medium text-gray-700">Attribute Set Name *</label>
                  <select value={formData.attributeSetId} onChange={e => handleChange('attributeSetId', e.target.value)} className="col-span-2 px-3 py-2 rounded-md border border-gray-300 text-sm focus:ring-brand-primary focus:border-brand-primary" required>
                    <option value="">Select Attribute Set</option>
                    {attributeSets.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                  </select>
                </div>
                
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm font-medium text-gray-700">Category *</label>
                  <select value={formData.categoryId} onChange={e => handleChange('categoryId', e.target.value)} className="col-span-2 px-3 py-2 rounded-md border border-gray-300 text-sm focus:ring-brand-primary focus:border-brand-primary" required>
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm font-medium text-gray-700">Type Of Product</label>
                  <select value={formData.typeOfProduct} onChange={e => handleChange('typeOfProduct', e.target.value)} className="col-span-2 px-3 py-2 rounded-md border border-gray-300 text-sm focus:ring-brand-primary focus:border-brand-primary">
                    <option value="simple">simple</option>
                    <option value="configurable">configurable</option>
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm font-medium text-gray-700">Reference Id / SKU *</label>
                  <input type="text" value={formData.sku} onChange={e => handleChange('sku', e.target.value)} className="col-span-2 px-3 py-2 rounded-md border border-gray-300 text-sm focus:ring-brand-primary focus:border-brand-primary" required />
                </div>

                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm font-medium text-gray-700">URL Key</label>
                  <input type="text" value={formData.slug} onChange={e => handleChange('slug', e.target.value)} className="col-span-2 px-3 py-2 rounded-md border border-gray-300 bg-gray-50 text-sm focus:ring-brand-primary focus:border-brand-primary" required />
                </div>

                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm font-medium text-gray-700">Name *</label>
                  <input type="text" value={formData.name} onChange={e => handleChange('name', e.target.value)} className="col-span-2 px-3 py-2 rounded-md border border-gray-300 text-sm focus:ring-brand-primary focus:border-brand-primary" required />
                </div>

                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm font-medium text-gray-700">Visibility</label>
                  <select value={formData.visibility} onChange={e => handleChange('visibility', e.target.value)} className="col-span-2 px-3 py-2 rounded-md border border-gray-300 text-sm focus:ring-brand-primary focus:border-brand-primary">
                    <option value="Catalog, Search">Catalog, Search</option>
                    <option value="Not Visible Individually">Not Visible Individually</option>
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm font-medium text-gray-700">Status *</label>
                  <select value={formData.status} onChange={e => handleChange('status', Number(e.target.value))} className="col-span-2 px-3 py-2 rounded-md border border-gray-300 text-sm focus:ring-brand-primary focus:border-brand-primary" required>
                    <option value={1}>Enabled</option>
                    <option value={0}>Disabled</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm font-medium text-gray-700">Selection Products</label>
                  <select value={formData.selectionProducts} onChange={e => handleChange('selectionProducts', e.target.value)} className="col-span-2 px-3 py-2 rounded-md border border-gray-300 text-sm focus:ring-brand-primary focus:border-brand-primary">
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Right Column: Attributes */}
            <div>
              <h2 className="text-lg font-bold mb-6 text-brand-primary border-b pb-2">Attributes</h2>
              {!activeAttributeSet ? (
                <div className="flex flex-col items-center justify-center h-48 bg-gray-50 border border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <p className="text-gray-500 font-medium">Please select an Attribute Set on the left.</p>
                  <p className="text-sm text-gray-400 mt-2">Dynamic attributes will load here based on your selection.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                  {activeAttributeSet.attributes.map((attr: any) => (
                    <div key={attr._id} className="grid grid-cols-3 gap-4 items-center">
                      <label className="text-sm font-medium text-gray-700">
                        {attr.name} {attr.isRequired && <span className="text-red-500">*</span>}
                      </label>
                      {attr.type === 'select' ? (
                        <select 
                          value={formData.specifications[attr.name] || ""} 
                          onChange={e => setFormData({ ...formData, specifications: { ...formData.specifications, [attr.name]: e.target.value } })}
                          className="col-span-2 px-3 py-2 rounded-md border border-gray-300 text-sm focus:ring-brand-primary focus:border-brand-primary"
                          required={attr.isRequired}
                        >
                          <option value="">Please Select</option>
                          {attr.options?.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      ) : attr.type === 'boolean' ? (
                        <select 
                          value={formData.specifications[attr.name] || ""} 
                          onChange={e => setFormData({ ...formData, specifications: { ...formData.specifications, [attr.name]: e.target.value } })}
                          className="col-span-2 px-3 py-2 rounded-md border border-gray-300 text-sm focus:ring-brand-primary focus:border-brand-primary"
                          required={attr.isRequired}
                        >
                          <option value="">Please Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      ) : (
                        <input 
                          type={attr.type === 'number' ? 'number' : 'text'}
                          value={formData.specifications[attr.name] || ""} 
                          onChange={e => setFormData({ ...formData, specifications: { ...formData.specifications, [attr.name]: e.target.value } })}
                          className="col-span-2 px-3 py-2 rounded-md border border-gray-300 text-sm focus:ring-brand-primary focus:border-brand-primary"
                          required={attr.isRequired}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
          </div>
        </div>

        {/* SECTION 2: Pricing & Stock */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-6 text-brand-primary border-b pb-2">Pricing & Stock</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
              <input type="number" value={formData.price} onChange={e => handleChange('price', e.target.value)} className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:ring-brand-primary focus:border-brand-primary" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Special Price (₹)</label>
              <input type="number" value={formData.specialPrice} onChange={e => handleChange('specialPrice', e.target.value)} className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cost (₹)</label>
              <input type="number" value={formData.cost} onChange={e => handleChange('cost', e.target.value)} className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
              <input type="number" value={formData.stock} onChange={e => handleChange('stock', e.target.value)} className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:ring-brand-primary focus:border-brand-primary" required />
            </div>
          </div>
        </div>

        {/* SECTION 3: Rich Content */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-6 text-brand-primary border-b pb-2">Product Content</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea value={formData.description} onChange={e => handleChange('description', e.target.value)} rows={6} className="w-full px-4 py-3 rounded-md border border-gray-300 text-sm focus:ring-brand-primary focus:border-brand-primary" placeholder="Enter full product description..."></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Warranty Terms</label>
              <textarea value={formData.warrantyTerms} onChange={e => handleChange('warrantyTerms', e.target.value)} rows={4} className="w-full px-4 py-3 rounded-md border border-gray-300 text-sm focus:ring-brand-primary focus:border-brand-primary" placeholder="Enter warranty terms and conditions..."></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Care Instructions</label>
              <textarea value={formData.careInstructions} onChange={e => handleChange('careInstructions', e.target.value)} rows={4} className="w-full px-4 py-3 rounded-md border border-gray-300 text-sm focus:ring-brand-primary focus:border-brand-primary" placeholder="Enter furniture care instructions..."></textarea>
            </div>
          </div>
        </div>

        {/* SECTION 4: Product Images */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-6 border-b pb-2">
            <h2 className="text-lg font-bold text-brand-primary">Product Images</h2>
            <div className="flex gap-2">
              <button type="button" className="px-3 py-1 bg-gray-100 border border-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-200 flex items-center gap-1 font-medium">
                <Upload size={14}/> Add Files
              </button>
              <button type="button" className="px-3 py-1 bg-gray-100 border border-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-200 flex items-center gap-1 font-medium">
                Start upload
              </button>
            </div>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:bg-gray-50 transition-colors cursor-pointer mb-8 max-w-2xl">
            <p className="text-xl font-bold text-gray-300 uppercase tracking-widest">Drop Here To Upload</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-700 underline mb-4">Live Images:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {/* Dummy Live Images to represent the Pepperfry design */}
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="relative group">
                  <div className="aspect-square bg-gray-100 rounded-md border border-gray-200 mb-2 overflow-hidden flex items-center justify-center relative">
                    <span className="text-gray-400">Image {num}</span>
                    <button type="button" className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow-md border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-500 transition-colors">
                      <X size={14} />
                    </button>
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <input type="number" defaultValue={num} className="w-12 px-2 py-1 border border-gray-300 rounded text-center text-sm" />
                    <select className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm text-gray-600 bg-white">
                      <option>Please Select</option>
                      <option>Base Image</option>
                      <option>Small Image</option>
                      <option>Thumbnail</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
