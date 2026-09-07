"use client";

import { useState } from "react";

const PROFESSIONAL_PATHS = [
  { id: "designers", label: "Interior Designers", description: "Trade pricing, exclusive previews, dedicated account manager." },
  { id: "architects", label: "Architects", description: "Specification support, custom sizing, material samples." },
  { id: "hospitality", label: "Hospitality", description: "Bulk pricing for hotels, restaurants, and commercial spaces." },
  { id: "developers", label: "Developers", description: "Large-scale project quotes, timeline management, white-label options." },
];

const BENEFITS = [
  { label: "Trade Pricing", desc: "Up to 30% below retail" },
  { label: "Volume Orders", desc: "Custom quotes for any scale" },
  { label: "Material Samples", desc: "Free samples kit on approval" },
  { label: "Dedicated Support", desc: "Your own account manager" },
];

export default function TradePage() {
  const [form, setForm] = useState({
    name: "", company: "", email: "", role: "", country: "", projectType: "", value: "", notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-brand-dark">
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-brand-border">
        <h1 className="text-3xl font-[family-name:var(--font-playfair)] font-bold mb-1">Trade Program</h1>
        <p className="text-sm text-brand-muted">Professional B2B mini-site and lead funnel.</p>
      </div>

      {/* Hero Split */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">

          {/* Left: Image */}
          <div className="aspect-[4/3] bg-[#6b513b] rounded-md relative flex items-center justify-center overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80"
              alt="Trade / hospitality interior"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
            />
            <div className="relative z-10 border border-white/30 px-6 py-3">
              <p className="text-white/80 text-sm italic">Hospitality / project interior</p>
            </div>
          </div>

          {/* Right: Info */}
          <div>
            <span className="text-[10px] text-[#b89c72] font-bold tracking-widest uppercase block mb-4">THE TRADE PROGRAM</span>
            <h2 className="text-4xl font-[family-name:var(--font-playfair)] font-bold leading-tight mb-3">
              Designed for Professionals.
            </h2>
            <p className="text-brand-muted text-sm mb-8">
              For interior designers, architects, hotels, restaurants, developers and bulk buyers.
            </p>

            {/* Benefit Tiles */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {BENEFITS.map((b) => (
                <div key={b.label} className="border border-brand-border px-5 py-4 text-center hover:border-brand-dark transition-colors">
                  <p className="text-[12px] font-bold text-brand-dark mb-1">{b.label}</p>
                  <p className="text-[11px] text-brand-muted">{b.desc}</p>
                </div>
              ))}
            </div>

            <a
              href="#apply"
              className="inline-block px-10 py-4 bg-brand-dark text-white font-bold text-[11px] uppercase tracking-widest hover:bg-brand-dark/90 transition-colors"
            >
              APPLY FOR TRADE
            </a>
          </div>
        </div>

        {/* Professional Paths */}
        <div className="mb-20">
          <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold mb-8">Choose your professional path</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {PROFESSIONAL_PATHS.map((path) => (
              <div key={path.id} className="border border-brand-border bg-[#f6f5f2] p-8 aspect-square flex flex-col items-center justify-center text-center hover:border-brand-dark transition-colors cursor-pointer group">
                <h3 className="text-[13px] font-bold text-brand-dark mb-2 group-hover:text-brand-primary transition-colors">{path.label}</h3>
                <p className="text-[11px] text-brand-muted leading-snug hidden group-hover:block">{path.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div id="apply" className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold mb-2 text-center">Apply for Trade Access</h2>
          <p className="text-brand-muted text-sm mb-8 text-center">Fill in your details and we'll be in touch within 2 business days.</p>

          {submitted ? (
            <div className="text-center py-16 border border-brand-border">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="font-[family-name:var(--font-playfair)] font-bold text-xl mb-2">Application Received!</h3>
              <p className="text-brand-muted text-sm">Our trade team will review your application and get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-brand-muted block mb-1">Full Name *</label>
                  <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full h-11 px-4 border border-brand-border text-sm focus:outline-none focus:border-brand-dark" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-brand-muted block mb-1">Company *</label>
                  <input required value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    className="w-full h-11 px-4 border border-brand-border text-sm focus:outline-none focus:border-brand-dark" placeholder="Company name" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-brand-muted block mb-1">Email *</label>
                  <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full h-11 px-4 border border-brand-border text-sm focus:outline-none focus:border-brand-dark" placeholder="work@company.com" />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-brand-muted block mb-1">Role</label>
                  <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                    className="w-full h-11 px-4 border border-brand-border text-sm focus:outline-none focus:border-brand-dark bg-white">
                    <option value="">Select role...</option>
                    <option>Interior Designer</option>
                    <option>Architect</option>
                    <option>Hotel / Restaurant</option>
                    <option>Developer / Builder</option>
                    <option>Bulk Buyer</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-brand-muted block mb-1">Country</label>
                  <input value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                    className="w-full h-11 px-4 border border-brand-border text-sm focus:outline-none focus:border-brand-dark" placeholder="Country" />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-brand-muted block mb-1">Approx. Annual Value</label>
                  <select value={form.value} onChange={e => setForm(f => ({ ...f, value: e.target.value }))}
                    className="w-full h-11 px-4 border border-brand-border text-sm focus:outline-none focus:border-brand-dark bg-white">
                    <option value="">Select range...</option>
                    <option>Under ₹5,00,000</option>
                    <option>₹5L – ₹25L</option>
                    <option>₹25L – ₹1Cr</option>
                    <option>₹1Cr+</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-widest text-brand-muted block mb-1">Project Notes</label>
                <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={3}
                  className="w-full px-4 py-3 border border-brand-border text-sm focus:outline-none focus:border-brand-dark resize-none"
                  placeholder="Tell us about your current or upcoming projects..." />
              </div>
              <button type="submit" className="w-full py-4 bg-brand-dark text-white font-bold text-[11px] uppercase tracking-widest hover:bg-brand-dark/90 transition-colors">
                SUBMIT APPLICATION
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
