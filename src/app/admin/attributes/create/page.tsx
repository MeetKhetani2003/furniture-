"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function CreateAttributeSetPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [attributes, setAttributes] = useState([{ name: "", type: "text", options: "", isRequired: false }]);
  const [saving, setSaving] = useState(false);

  const handleAddAttribute = () => {
    setAttributes([...attributes, { name: "", type: "text", options: "", isRequired: false }]);
  };

  const handleRemoveAttribute = (index: number) => {
    setAttributes(attributes.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: string, value: any) => {
    const newAttributes = [...attributes];
    (newAttributes[index] as any)[field] = value;
    setAttributes(newAttributes);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Process options string into array
    const processedAttributes = attributes.map(attr => ({
      ...attr,
      options: attr.type === 'select' ? attr.options.split(',').map(s => s.trim()).filter(Boolean) : []
    }));

    try {
      const res = await fetch("/api/admin/attributes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, attributes: processedAttributes })
      });
      if (res.ok) {
        router.push("/admin/attributes");
      } else {
        alert("Failed to save attribute set");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/attributes" className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-playfair)]">Create Attribute Set</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-2">Attribute Set Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            placeholder="e.g. Furniture, Electronics" 
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
            required 
          />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Attributes</h2>
            <button type="button" onClick={handleAddAttribute} className="text-brand-primary flex items-center gap-2 hover:bg-brand-primary/5 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium">
              <Plus size={16} /> Add Attribute
            </button>
          </div>

          <div className="space-y-4">
            {attributes.map((attr, index) => (
              <div key={index} className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Name</label>
                      <input 
                        type="text" 
                        value={attr.name} 
                        onChange={e => handleChange(index, 'name', e.target.value)} 
                        placeholder="e.g. Material" 
                        className="w-full px-3 py-2 rounded-md border border-gray-200 text-sm"
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Type</label>
                      <select 
                        value={attr.type} 
                        onChange={e => handleChange(index, 'type', e.target.value)}
                        className="w-full px-3 py-2 rounded-md border border-gray-200 text-sm bg-white"
                      >
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="boolean">Yes/No</option>
                        <option value="select">Dropdown (Select)</option>
                      </select>
                    </div>
                  </div>
                  
                  {attr.type === 'select' && (
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Options (comma separated)</label>
                      <input 
                        type="text" 
                        value={attr.options} 
                        onChange={e => handleChange(index, 'options', e.target.value)} 
                        placeholder="e.g. Wood, Metal, Glass" 
                        className="w-full px-3 py-2 rounded-md border border-gray-200 text-sm"
                        required 
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id={`req-${index}`} 
                      checked={attr.isRequired} 
                      onChange={e => handleChange(index, 'isRequired', e.target.checked)} 
                    />
                    <label htmlFor={`req-${index}`} className="text-sm text-gray-600 cursor-pointer">Required field</label>
                  </div>
                </div>
                
                <button type="button" onClick={() => handleRemoveAttribute(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-6">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link href="/admin/attributes" className="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
            Cancel
          </Link>
          <button type="submit" disabled={saving || !name} className="px-6 py-2 rounded-lg bg-brand-primary text-white hover:bg-brand-secondary transition-colors disabled:opacity-50 flex items-center gap-2">
            <Save size={18} />
            {saving ? "Saving..." : "Save Attribute Set"}
          </button>
        </div>
      </form>
    </div>
  );
}
