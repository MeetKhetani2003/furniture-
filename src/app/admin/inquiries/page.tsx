"use client";

import { useState, useEffect } from "react";
import { Search, Mail, Clock, CheckCircle } from "lucide-react";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/admin/inquiries")
      .then(res => res.json())
      .then(data => {
        if (data.inquiries) setInquiries(data.inquiries);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredInquiries = inquiries.filter(i => 
    i.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    i.email?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    i.subject?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-playfair)]">Customer Inquiries</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <input 
              type="text" 
              placeholder="Search by name, email, or subject..."
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
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading inquiries...</td>
                </tr>
              ) : filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No inquiries found.</td>
                </tr>
              ) : (
                filteredInquiries.map((inquiry) => (
                  <tr key={inquiry._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{inquiry.name}</p>
                      <p className="text-gray-500 text-xs">{inquiry.email}</p>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate">{inquiry.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium inline-flex items-center gap-1 ${
                        inquiry.status === 'Resolved' ? 'bg-green-100 text-green-700' : 
                        inquiry.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {inquiry.status === 'Resolved' && <CheckCircle size={12} />}
                        {inquiry.status === 'In Progress' && <Clock size={12} />}
                        {inquiry.status === 'New' && <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>}
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="px-3 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded text-xs font-medium flex items-center gap-1 ml-auto">
                        <Mail size={14} /> Reply
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
