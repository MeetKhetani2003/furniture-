"use client";

import { useState } from "react";

const SERVICES = [
  { id: "online", label: "Online Consultation", description: "Meet a designer from anywhere." },
  { id: "room", label: "Room Planning", description: "Send dimensions and photo." },
  { id: "selection", label: "Furniture Selection", description: "Get recommendations for your space and budget." },
  { id: "whole-room", label: "Whole-Room Design", description: "Build a coordinated complete room." },
];

const HOW_IT_WORKS = ["Tell us about your room", "Choose a time", "Meet your designer", "Receive your plan"];

export default function DesignServicesPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", room: "", budget: "", notes: "", service: "online",
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
        <h1 className="text-3xl font-[family-name:var(--font-playfair)] font-bold mb-1">Complimentary Design Service</h1>
        <p className="text-sm text-brand-muted">Assisted-commerce landing and booking entry.</p>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">

          {/* Left: Moodboard Image */}
          <div className="aspect-[4/3] bg-[#6b513b] rounded-md overflow-hidden relative flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80"
              alt="Design service"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
            />
            <div className="relative z-10 text-center">
              <div className="border border-white/30 px-6 py-3">
                <p className="text-white/80 text-sm italic">Designer + client / moodboard</p>
              </div>
            </div>
          </div>

          {/* Right: Services */}
          <div>
            <span className="text-[10px] text-[#b89c72] font-bold tracking-widest uppercase block mb-4">DESIGN SERVICES</span>
            <h2 className="text-3xl font-[family-name:var(--font-playfair)] font-bold mb-2 leading-tight">
              Not sure where to start?
            </h2>
            <p className="text-brand-muted text-sm mb-8">We&apos;ll help you create a space you love.</p>

            <div className="space-y-0">
              {SERVICES.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setForm(f => ({ ...f, service: service.id }))}
                  className={`w-full flex flex-col items-start px-0 py-5 border-b border-brand-border/50 text-left transition-colors hover:text-brand-primary ${
                    form.service === service.id ? "text-brand-primary" : ""
                  }`}
                >
                  <h3 className="font-bold text-[14px] mb-0.5">{service.label}</h3>
                  <p className="text-xs text-brand-muted">{service.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold mb-8">How it works</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step} className="border border-brand-border p-6 text-center aspect-square flex flex-col items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-brand-dark text-white text-xs font-bold flex items-center justify-center mb-3">
                  {i + 1}
                </div>
                <p className="text-[13px] font-semibold text-brand-dark leading-snug">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold mb-2 text-center">Book Your Session</h2>
          <p className="text-brand-muted text-sm mb-8 text-center">Completely free. No obligation.</p>

          {submitted ? (
            <div className="text-center py-16 border border-brand-border rounded-md">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="font-[family-name:var(--font-playfair)] font-bold text-xl mb-2">Request Received!</h3>
              <p className="text-brand-muted text-sm">Our design team will contact you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-brand-muted block mb-1">Name *</label>
                  <input
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full h-11 px-4 border border-brand-border text-sm focus:outline-none focus:border-brand-dark"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-brand-muted block mb-1">Email *</label>
                  <input
                    required type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full h-11 px-4 border border-brand-border text-sm focus:outline-none focus:border-brand-dark"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-brand-muted block mb-1">Phone / WhatsApp</label>
                  <input
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full h-11 px-4 border border-brand-border text-sm focus:outline-none focus:border-brand-dark"
                    placeholder="+91 9xxxxxxxx"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-brand-muted block mb-1">Room Type</label>
                  <select
                    value={form.room}
                    onChange={e => setForm(f => ({ ...f, room: e.target.value }))}
                    className="w-full h-11 px-4 border border-brand-border text-sm focus:outline-none focus:border-brand-dark bg-white"
                  >
                    <option value="">Select room...</option>
                    <option>Living Room</option>
                    <option>Bedroom</option>
                    <option>Dining Room</option>
                    <option>Home Office</option>
                    <option>Entire Home</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-widest text-brand-muted block mb-1">Budget Range</label>
                <select
                  value={form.budget}
                  onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
                  className="w-full h-11 px-4 border border-brand-border text-sm focus:outline-none focus:border-brand-dark bg-white"
                >
                  <option value="">Select budget...</option>
                  <option>Under ₹1,00,000</option>
                  <option>₹1,00,000 – ₹3,00,000</option>
                  <option>₹3,00,000 – ₹5,00,000</option>
                  <option>₹5,00,000+</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-widest text-brand-muted block mb-1">Notes</label>
                <textarea
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-brand-border text-sm focus:outline-none focus:border-brand-dark resize-none"
                  placeholder="Tell us about your space, style preferences, or any specific requirements..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-brand-dark text-white font-bold text-[11px] uppercase tracking-widest hover:bg-brand-dark/90 transition-colors"
              >
                BOOK MY FREE CONSULTATION
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
