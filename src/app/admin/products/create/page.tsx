"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Package, Trash2, UploadCloud, Plus } from "lucide-react";

export default function CreateProductPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVariantImage, setUploadingVariantImage] = useState<number | null>(null);

  const [newProduct, setNewProduct] = useState({
    name: "", slug: "", description: "", price: "", mrp: "", special_price: "", category: "", brand: "", stock: "", sku: "", merchant_sku_id: "",
    dimensions: { height: "", width: "", depth: "", dimensions_cm: "", dimension: "", seating_height: "", furniture_weight: "" },
    materials: { furniture_material: "", furniture_material_group: "", top_material: "", Wood_colour: "", color_swatch: "" },
    shipping: { assembly: "", free_assembly: "", free_shipping: "", boxcount: "", warehouse_turn_around_time: "" },
    support: { manufacturer_warranty: "", warranty_terms: "", furniture_care: "", care: "", returns_and_cancellation_policy: "", customer_redressal: "" }
  });
  
  const [images, setImages] = useState<string[]>([]);
  const [variants, setVariants] = useState<any[]>([]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, variantIndex?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (variantIndex !== undefined) setUploadingVariantImage(variantIndex);
    else setUploadingImage(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        if (variantIndex !== undefined) {
          const newVariants = [...variants];
          newVariants[variantIndex].images.push(data.url);
          setVariants(newVariants);
        } else {
          setImages((prev) => [...prev, data.url]);
        }
      } else {
        alert("Upload failed.");
      }
    } catch (e) {
      console.error(e);
      alert("An error occurred during upload.");
    } finally {
      if (variantIndex !== undefined) setUploadingVariantImage(null);
      else setUploadingImage(false);
      e.target.value = '';
    }
  };

  const removeImage = (index: number, variantIndex?: number) => {
    if (variantIndex !== undefined) {
      const newVariants = [...variants];
      newVariants[variantIndex].images = newVariants[variantIndex].images.filter((_: any, i: number) => i !== index);
      setVariants(newVariants);
    } else {
      setImages(images.filter((_, i) => i !== index));
    }
  };

  const addVariant = () => {
    setVariants([...variants, { name: "", sku: "", color_name: "", color_hex: "#000000", price: "", mrp: "", special_price: "", stock: "50", images: [] }]);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const updateVariant = (index: number, key: string, value: string) => {
    const newVariants = [...variants];
    newVariants[index][key] = value;
    setVariants(newVariants);
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      alert("Please upload at least one main image.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...newProduct,
        price: Number(newProduct.price),
        mrp: Number(newProduct.mrp),
        special_price: newProduct.special_price ? Number(newProduct.special_price) : undefined,
        stock: Number(newProduct.stock),
        images: images,
        variants: variants.map(v => ({
          ...v,
          price: Number(v.price),
          mrp: Number(v.mrp),
          special_price: v.special_price ? Number(v.special_price) : undefined,
          stock: Number(v.stock),
        }))
      };

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Product created successfully!");
        router.push("/admin/products");
      } else {
        const data = await res.json();
        alert("Error: " + data.error);
      }
    } catch (e) {
      console.error(e);
      alert("Failed to create product");
    } finally {
      setSubmitting(false);
    }
  };

  const updateNested = (group: "dimensions" | "materials" | "shipping" | "support", key: string, value: string) => {
    setNewProduct(prev => ({ ...prev, [group]: { ...prev[group], [key]: value } }));
  };

  return (
    <div className="mx-auto max-w-[1000px] px-4 py-8">
      <Link href="/admin/products" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-primary mb-6">
        <ChevronLeft className="h-4 w-4" /> Back to Products
      </Link>

      <div className="rounded-3xl border border-gray-100 bg-white p-6 md:p-10 shadow-sm">
        <div className="mb-8 flex items-center gap-3 border-b border-gray-100 pb-6">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-primary/10 text-brand-primary">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-[22px] font-semibold text-gray-900 font-[family-name:var(--font-playfair)]">Add New Product</h1>
            <p className="text-[14px] text-gray-500">Create a highly detailed product with color variants.</p>
          </div>
        </div>

        <form onSubmit={handleCreateProduct} className="space-y-10">
          
          {/* Section: Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information (Default Variant)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name <span className="text-red-500">*</span></label>
                <input type="text" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')})} className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-primary" placeholder="e.g. Modern Teak Sofa" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug <span className="text-red-500">*</span></label>
                <input type="text" required value={newProduct.slug} onChange={e => setNewProduct({...newProduct, slug: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-primary" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
                <textarea required value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-primary" rows={4}></textarea>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category <span className="text-red-500">*</span></label>
                <input type="text" required value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-primary" placeholder="e.g. Sofas & Seating" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand <span className="text-red-500">*</span></label>
                <input type="text" required value={newProduct.brand} onChange={e => setNewProduct({...newProduct, brand: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-primary" />
              </div>
            </div>
          </div>

          {/* Section: Pricing & Identifiers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Pricing & Identifiers</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                <input type="text" value={newProduct.sku} onChange={e => setNewProduct({...newProduct, sku: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Merchant SKU ID</label>
                <input type="text" value={newProduct.merchant_sku_id} onChange={e => setNewProduct({...newProduct, merchant_sku_id: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price (₹) <span className="text-red-500">*</span></label>
                <input type="number" required min={0} value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">MRP (₹) <span className="text-red-500">*</span></label>
                <input type="number" required min={0} value={newProduct.mrp} onChange={e => setNewProduct({...newProduct, mrp: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-primary" />
              </div>
            </div>
          </div>

          {/* Section: Main Images */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Default Product Images</h3>
            <div className="flex flex-wrap gap-4">
              {images.map((imgUrl, idx) => (
                <div key={idx} className="relative w-24 h-24 rounded-xl border border-gray-200 overflow-hidden group">
                  <img src={imgUrl} alt={`Product ${idx}`} className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-white/90 text-red-500 p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={12} /></button>
                </div>
              ))}
              <label className="w-24 h-24 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer border-brand-primary/40 hover:bg-brand-primary/5">
                {uploadingImage ? <div className="w-4 h-4 border-2 border-brand-primary border-t-transparent rounded-full animate-spin"></div> : <UploadCloud className="text-brand-primary" size={20} />}
                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={uploadingImage} />
              </label>
            </div>
          </div>

          {/* Section: Variants */}
          <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Color Variants (Optional)</h3>
              <button type="button" onClick={addVariant} className="flex items-center gap-1 text-sm bg-brand-primary text-white px-3 py-1.5 rounded-md hover:bg-brand-dark transition">
                <Plus size={16} /> Add Variant
              </button>
            </div>
            
            {variants.length === 0 && <p className="text-sm text-gray-500 text-center py-4">No variants added. This product will be sold as a single item.</p>}

            <div className="space-y-6">
              {variants.map((variant, index) => (
                <div key={index} className="bg-white p-5 rounded-lg border border-gray-200 relative shadow-sm">
                  <button type="button" onClick={() => removeVariant(index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
                  <h4 className="font-semibold text-brand-primary mb-4">Variant #{index + 1}</h4>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="col-span-2">
                      <label className="block text-xs font-medium text-gray-700 mb-1">Variant Name Override</label>
                      <input type="text" value={variant.name} onChange={e => updateVariant(index, "name", e.target.value)} className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-1 focus:ring-brand-primary" placeholder="e.g. Sofa - Gold Finish" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">SKU</label>
                      <input type="text" value={variant.sku} onChange={e => updateVariant(index, "sku", e.target.value)} className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-1 focus:ring-brand-primary" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Color Name</label>
                      <input type="text" value={variant.color_name} onChange={e => updateVariant(index, "color_name", e.target.value)} className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-1 focus:ring-brand-primary" placeholder="e.g. Gold" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Color Hex</label>
                      <div className="flex gap-2">
                        <input type="color" value={variant.color_hex} onChange={e => updateVariant(index, "color_hex", e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
                        <input type="text" value={variant.color_hex} onChange={e => updateVariant(index, "color_hex", e.target.value)} className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-1 focus:ring-brand-primary" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Selling Price</label>
                      <input type="number" required value={variant.price} onChange={e => updateVariant(index, "price", e.target.value)} className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-1 focus:ring-brand-primary" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">MRP</label>
                      <input type="number" required value={variant.mrp} onChange={e => updateVariant(index, "mrp", e.target.value)} className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-1 focus:ring-brand-primary" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Variant Images</label>
                    <div className="flex flex-wrap gap-3">
                      {variant.images.map((imgUrl: string, idx: number) => (
                        <div key={idx} className="relative w-20 h-20 rounded-lg border border-gray-200 overflow-hidden group">
                          <img src={imgUrl} className="w-full h-full object-cover" />
                          <button type="button" onClick={() => removeImage(idx, index)} className="absolute top-1 right-1 bg-white text-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100"><Trash2 size={10} /></button>
                        </div>
                      ))}
                      <label className="w-20 h-20 rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 text-gray-400">
                        {uploadingVariantImage === index ? <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div> : <UploadCloud size={16} />}
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, index)} disabled={uploadingVariantImage !== null} />
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button type="submit" disabled={submitting} className="rounded-lg bg-brand-primary px-8 py-3 font-semibold text-white transition hover:bg-brand-dark flex items-center gap-2">
              {submitting ? "Creating..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
