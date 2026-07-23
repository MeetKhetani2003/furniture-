"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function AttributesPage() {
  const [attributes, setAttributes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttributes();
  }, []);

  const fetchAttributes = async () => {
    try {
      const res = await fetch("/api/admin/attributes");
      if (res.ok) {
        const data = await res.json();
        setAttributes(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this attribute set?")) return;
    try {
      const res = await fetch(`/api/admin/attributes/${id}`, { method: "DELETE" });
      if (res.ok) {
        setAttributes(attributes.filter(a => a._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-playfair)]">Attribute Sets</h1>
        <Link href="/admin/attributes/create" className="bg-brand-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-secondary transition-colors">
          <Plus size={20} />
          Create Attribute Set
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left py-4 px-6 font-medium text-gray-500">Name</th>
              <th className="text-left py-4 px-6 font-medium text-gray-500">Total Attributes</th>
              <th className="text-right py-4 px-6 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {attributes.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-8 text-center text-gray-500">No attribute sets found.</td>
              </tr>
            ) : (
              attributes.map((set) => (
                <tr key={set._id} className="hover:bg-gray-50/50">
                  <td className="py-4 px-6 font-medium">{set.name}</td>
                  <td className="py-4 px-6 text-gray-500">{set.attributes?.length || 0}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/attributes/${set._id}/edit`} className="p-2 text-gray-400 hover:text-brand-primary transition-colors">
                        <Edit size={18} />
                      </Link>
                      <button onClick={() => handleDelete(set._id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
