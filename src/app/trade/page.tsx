"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Building2, Paintbrush, Briefcase, Landmark } from "lucide-react";

const PROFESSIONAL_PATHS = [
  { id: "designers", label: "Interior Designers", icon: Paintbrush, description: "Access trade pricing, exclusive previews, and a dedicated account manager for your residential and commercial clients." },
  { id: "architects", label: "Architects", icon: Landmark, description: "Specification support, CAD blocks, custom sizing, and material sample kits delivered to your firm." },
  { id: "hospitality", label: "Hospitality & Restaurants", icon: Building2, description: "Volume pricing, durable performance fabrics, and tailored lead times for high-traffic environments." },
  { id: "developers", label: "Developers & Builders", icon: Briefcase, description: "Large-scale project quotes, staged delivery schedules, and white-label manufacturing options." },
];

const BENEFITS = [
  { label: "Trade Pricing", desc: "Tiered discounts up to 30% below retail." },
  { label: "Volume Orders", desc: "Custom manufacturing and quotes for scale." },
  { label: "Material Library", desc: "Complimentary swatch kits and finish samples." },
  { label: "Dedicated Support", desc: "Direct access to our trade concierge team." },
];

export default function TradePage() {
  const [form, setForm] = useState({
    name: "", company: "", email: "", role: "", country: "", projectType: "", value: "", timeline: "", notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark overflow-hidden">
      {/* Header */}
      <div className="bg-brand-dark py-6 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-4xl font-[family-name:var(--font-playfair)] font-bold mb-2 text-white">Trade & B2B Program</h1>
          <p className="text-sm text-white/70 max-w-xl mx-auto">
            A dedicated partnership for industry professionals, offering exclusive pricing, dedicated support, and custom manufacturing.
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-12">

          {/* Left: Premium Imagery */}
          <div className="relative group">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
                alt="Luxury Hospitality Interior"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-xs font-bold tracking-widest uppercase text-white/80 mb-2 flex items-center gap-2">
                  <span className="w-6 h-[1px] bg-brand-primary"></span>
                  Completed Installation
                </p>
                <p className="text-xl font-[family-name:var(--font-playfair)]">The Grand Hotel Lounge, Mumbai</p>
              </div>
            </div>
            
            {/* Floating Image */}
            <div className="absolute -bottom-12 -right-6 w-1/3 aspect-square rounded-xl overflow-hidden shadow-xl border-4 border-brand-bg hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80"
                alt="Material Samples"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Info */}
          <div className="lg:pr-8 mt-12 lg:mt-0">
            <span className="text-[11px] text-brand-primary font-bold tracking-widest uppercase block mb-4">FOR INDUSTRY PROFESSIONALS</span>
            <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] font-bold leading-tight mb-6">
              Designed for Scale.<br />Built for You.
            </h2>
            <p className="text-brand-muted text-base mb-10 leading-relaxed">
              Whether you are specifying for a boutique residential project or outfitting a large-scale hospitality venue, our trade program is designed to support your vision with uncompromising quality and dedicated service.
            </p>

            {/* Benefit Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {BENEFITS.map((b) => (
                <div key={b.label} className="p-5 rounded-xl bg-white border border-brand-border/40 hover:border-brand-primary/50 hover:shadow-md transition-all group">
                  <CheckCircle2 size={20} className="text-brand-primary mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-bold text-brand-dark mb-1">{b.label}</p>
                  <p className="text-xs text-brand-muted leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>

            <a
              href="#apply"
              className="inline-flex items-center gap-3 px-8 py-4 bg-brand-dark text-white font-bold text-xs uppercase tracking-widest hover:bg-brand-primary hover:text-brand-dark transition-colors shadow-lg"
            >
              Apply For Trade <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Professional Paths */}
      <div className="bg-brand-secondary/30 py-24 border-y border-brand-border/40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-[family-name:var(--font-playfair)] font-bold mb-4">Choose Your Professional Path</h2>
            <p className="text-brand-muted text-sm max-w-2xl mx-auto">We tailor our services, pricing tiers, and manufacturing capabilities to match the specific needs of your business model.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROFESSIONAL_PATHS.map((path) => {
              const Icon = path.icon;
              return (
                <div key={path.id} className="bg-white p-8 rounded-2xl border border-brand-border/40 shadow-sm hover:shadow-xl hover:border-brand-primary transition-all group flex flex-col h-full">
                  <div className="w-12 h-12 rounded-full bg-brand-secondary flex items-center justify-center text-brand-dark mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-brand-dark mb-3">{path.label}</h3>
                  <p className="text-sm text-brand-muted leading-relaxed flex-grow">{path.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div id="apply" className="py-24 bg-white relative">
        {/* Decorative background element */}
        <div className="absolute top-0 left-0 w-full h-64 bg-brand-dark"></div>

        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <div className="bg-white rounded-2xl shadow-2xl border border-brand-border/30 p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-[family-name:var(--font-playfair)] font-bold mb-3">Apply for Trade Access</h2>
              <p className="text-brand-muted text-sm">Fill in your firm's details below. Our trade concierge will review your application and be in touch within 1-2 business days.</p>
            </div>

            {submitted ? (
              <div className="text-center py-16 px-4 bg-brand-secondary/30 rounded-xl border border-brand-primary/20">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] font-bold text-2xl mb-3 text-brand-dark">Application Received!</h3>
                <p className="text-brand-muted text-sm max-w-md mx-auto">Thank you for your interest. Our trade team will review your credentials and reach out to the email provided with your account details.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Personal Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-brand-dark block mb-2">Full Name *</label>
                    <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-colors" placeholder="Jane Doe" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-brand-dark block mb-2">Company / Firm *</label>
                    <input required value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                      className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-colors" placeholder="Design Studio LLC" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-brand-dark block mb-2">Work Email *</label>
                    <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-colors" placeholder="jane@studio.com" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-brand-dark block mb-2">Primary Role *</label>
                    <select required value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                      className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-colors">
                      <option value="">Select your role...</option>
                      <option>Interior Designer</option>
                      <option>Architect</option>
                      <option>Procurement / Purchasing</option>
                      <option>Hotel / Restaurant Owner</option>
                      <option>Developer / Builder</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="border-t border-brand-border/40 pt-6 mt-6">
                  <h4 className="text-sm font-bold text-brand-dark mb-4">Project Details (Optional but recommended)</h4>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-widest text-brand-dark block mb-2">Typical Project Type</label>
                      <select value={form.projectType} onChange={e => setForm(f => ({ ...f, projectType: e.target.value }))}
                        className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-colors">
                        <option value="">Select type...</option>
                        <option>High-end Residential</option>
                        <option>Hospitality (Hotels/Restaurants)</option>
                        <option>Commercial Office</option>
                        <option>Multi-family Residential</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-widest text-brand-dark block mb-2">Approx. Annual FF&E Spend</label>
                      <select value={form.value} onChange={e => setForm(f => ({ ...f, value: e.target.value }))}
                        className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-colors">
                        <option value="">Select range...</option>
                        <option>Under ₹10,00,000</option>
                        <option>₹10L – ₹50L</option>
                        <option>₹50L – ₹2Cr</option>
                        <option>₹2Cr+</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-widest text-brand-dark block mb-2">Current Project Timeline</label>
                      <select value={form.timeline} onChange={e => setForm(f => ({ ...f, timeline: e.target.value }))}
                        className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-colors">
                        <option value="">Select timeline...</option>
                        <option>Immediate (0-1 months)</option>
                        <option>Near term (1-3 months)</option>
                        <option>Planning phase (3-6 months)</option>
                        <option>Long term (6+ months)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-widest text-brand-dark block mb-2">Country</label>
                      <input value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                        className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-colors" placeholder="e.g. India, United States" />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-brand-dark block mb-2">Project Notes</label>
                    <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={4}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-colors resize-none"
                      placeholder="Tell us about your upcoming projects, custom manufacturing needs, or any specific pieces you are looking for..." />
                  </div>
                </div>

                <div className="pt-4">
                  <button type="submit" className="w-full py-5 bg-brand-dark text-white font-bold text-xs uppercase tracking-widest hover:bg-brand-primary hover:text-brand-dark transition-colors shadow-lg rounded-lg">
                    Submit Application
                  </button>
                  <p className="text-center text-[10px] text-brand-muted mt-4">
                    By submitting this form, you agree to our Trade Program Terms & Conditions and Privacy Policy.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
