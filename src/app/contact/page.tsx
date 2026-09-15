"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark">
      {/* Header */}
      <div className="bg-brand-dark text-white py-24 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-4 text-brand-primary">Get in Touch</p>
          <h1 className="text-5xl font-[family-name:var(--font-playfair)] font-bold mb-6">
            We're here to help.
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Whether you have a question about our products, need design advice, or want to track an order, our team is ready to assist you.
          </p>
        </div>
      </div>

      <div className="py-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-[family-name:var(--font-playfair)] font-bold mb-8">Contact Information</h2>
            
            <div className="space-y-8 mb-12">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white border border-brand-border/50 rounded-full flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-brand-primary" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Phone</h4>
                  <p className="text-brand-muted text-sm mb-1">1800-123-4567</p>
                  <p className="text-xs text-brand-muted">Mon - Fri, 9am - 6pm IST</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white border border-brand-border/50 rounded-full flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-brand-primary" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Email</h4>
                  <p className="text-brand-muted text-sm mb-1">support@premiuscrafts.com</p>
                  <p className="text-xs text-brand-muted">We aim to reply within 24 hours.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white border border-brand-border/50 rounded-full flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-brand-primary" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Headquarters & Flagship Store</h4>
                  <p className="text-brand-muted text-sm leading-relaxed">
                    124 Premium Street, Design District<br />
                    Bandra West, Mumbai<br />
                    Maharashtra 400050, India
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-brand-secondary/30 border border-brand-border/50 rounded-lg">
              <h4 className="font-bold mb-2 flex items-center gap-2"><Clock size={16} className="text-brand-primary"/> Store Hours</h4>
              <p className="text-sm text-brand-muted">Monday - Saturday: 10:00 AM - 8:00 PM</p>
              <p className="text-sm text-brand-muted">Sunday: 11:00 AM - 6:00 PM</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white border border-brand-border/50 p-8 md:p-12 rounded-xl shadow-sm">
            <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold mb-6">Send us a message</h2>
            
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  ✓
                </div>
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p className="text-brand-muted text-sm">Thank you for reaching out. A member of our team will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-brand-dark block mb-2">First Name</label>
                    <input required type="text" className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-colors" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-brand-dark block mb-2">Last Name</label>
                    <input required type="text" className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-brand-dark block mb-2">Email Address</label>
                  <input required type="email" className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-colors" />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-brand-dark block mb-2">Subject</label>
                  <select className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-colors">
                    <option>General Inquiry</option>
                    <option>Order Status / Tracking</option>
                    <option>Returns & Exchanges</option>
                    <option>Product Question</option>
                    <option>Design Services</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-brand-dark block mb-2">Message</label>
                  <textarea required rows={5} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-colors resize-none"></textarea>
                </div>

                <button type="submit" className="w-full py-4 bg-brand-dark text-white font-bold text-xs uppercase tracking-widest hover:bg-brand-primary hover:text-brand-dark transition-colors shadow-lg rounded-lg">
                  Submit Message
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
