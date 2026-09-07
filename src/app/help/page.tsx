"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ChevronRight, Truck, Globe, RefreshCw, Shield, Wrench, Sofa, CreditCard, PackageSearch, AlertTriangle, HelpCircle, Phone, MapPin } from "lucide-react";

const HELP_TOPICS = [
  { slug: "shipping-delivery", label: "Shipping & Delivery", icon: Truck, desc: "Delivery times, tracking, assembly." },
  { slug: "international-delivery", label: "International Delivery", icon: Globe, desc: "Countries, duties, customs." },
  { slug: "returns-refunds", label: "Returns & Refunds", icon: RefreshCw, desc: "Policy, eligibility, process." },
  { slug: "warranty", label: "Warranty", icon: Shield, desc: "Coverage, claims, periods." },
  { slug: "assembly", label: "Assembly", icon: Wrench, desc: "Instructions, professional service." },
  { slug: "furniture-care", label: "Furniture Care", icon: Sofa, desc: "Cleaning, maintenance, protection." },
  { slug: "payments", label: "Payments", icon: CreditCard, desc: "Methods, EMI, gift cards." },
  { slug: "order-changes", label: "Order Changes", icon: PackageSearch, desc: "Modify, cancel, address update." },
  { slug: "damaged-item", label: "Damaged Item", icon: AlertTriangle, desc: "Report, claim, replacement." },
  { slug: "faqs", label: "FAQs", icon: HelpCircle, desc: "Common questions answered." },
  { slug: "contact-us", label: "Contact Us", icon: Phone, desc: "Chat, email, call us." },
  { slug: "track-order", label: "Track Order", icon: MapPin, desc: "Live status, dispatch, delivery." },
];

const COUNTRY_DELIVERY: Record<string, { available: boolean; time: string; duties: string; assembly: string }> = {
  "India": { available: true, time: "8–14 business days", duties: "No import duties. GST included.", assembly: "Available in 50+ cities." },
  "United States": { available: true, time: "14–21 business days", duties: "Import duties may apply on arrival.", assembly: "Not available. Flat-pack shipped." },
  "United Kingdom": { available: true, time: "12–18 business days", duties: "UK customs charges may apply.", assembly: "Not available. Flat-pack shipped." },
  "UAE": { available: true, time: "10–16 business days", duties: "5% VAT may apply.", assembly: "Available in Dubai and Abu Dhabi." },
  "Singapore": { available: true, time: "14–18 business days", duties: "GST may apply on arrival.", assembly: "Not available." },
  "Australia": { available: true, time: "18–25 business days", duties: "Import duties and GST may apply.", assembly: "Not available." },
};

const FAQ_ITEMS = [
  { q: "How long does delivery take?", a: "Delivery times vary by destination. Within India: 8–14 business days. International orders: 12–25 business days depending on country. Made-to-order pieces have an additional 6–8 week lead time." },
  { q: "Can I return a customised item?", a: "Made-to-order and customised items cannot be returned unless they arrive damaged or defective. Standard items can be returned within 15 days of delivery." },
  { q: "What is your warranty coverage?", a: "All Premius Crafts furniture carries a 10-year structural warranty on solid wood frames. Upholstery and fabric components carry a 2-year warranty." },
  { q: "Do you offer assembly?", a: "White-glove assembly is available in 50+ cities across India. For international orders, furniture is shipped flat-pack with assembly instructions." },
  { q: "How do I track my order?", a: "Once your order ships, you'll receive a tracking link via email and SMS. You can also track from your account page." },
  { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards, UPI, net banking, EMI options (6/12/24 months), and international cards for global orders." },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredTopics = searchQuery
    ? HELP_TOPICS.filter(t => t.label.toLowerCase().includes(searchQuery.toLowerCase()) || t.desc.toLowerCase().includes(searchQuery.toLowerCase()))
    : HELP_TOPICS;

  const deliveryInfo = COUNTRY_DELIVERY[selectedCountry];

  return (
    <div className="min-h-screen bg-white text-brand-dark">
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-brand-border">
        <h1 className="text-3xl font-[family-name:var(--font-playfair)] font-bold mb-1">Help Center + International Delivery</h1>
        <p className="text-sm text-brand-muted">Support hub template for policies, service and cross-border confidence.</p>
      </div>

      {/* Search Bar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="relative max-w-2xl mx-auto mb-12">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="How can we help?"
            className="w-full h-14 pl-12 pr-5 border border-brand-border text-sm focus:outline-none focus:border-brand-dark bg-white"
          />
        </div>

        {/* Popular Help Topics */}
        <section className="mb-16">
          <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-brand-dark mb-6">Popular Help Topics</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredTopics.map((topic) => {
              const Icon = topic.icon;
              return (
                <Link
                  key={topic.slug}
                  href={`/help/${topic.slug}`}
                  className="group border border-brand-border bg-[#fbfbf9] px-5 py-4 flex flex-col gap-1 hover:border-brand-dark transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <Icon size={16} className="text-brand-muted group-hover:text-brand-primary transition-colors" />
                    <ChevronRight size={12} className="text-brand-border group-hover:text-brand-dark transition-colors" />
                  </div>
                  <h3 className="text-[13px] font-bold text-brand-dark group-hover:text-brand-primary transition-colors">
                    {topic.label}
                  </h3>
                  <p className="text-[11px] text-brand-muted leading-snug">{topic.desc}</p>
                </Link>
              );
            })}
            {filteredTopics.length === 0 && (
              <div className="col-span-full text-center py-10">
                <p className="text-brand-muted text-sm">No results for &ldquo;{searchQuery}&rdquo;. Try a different search or <Link href="/help/contact-us" className="underline hover:text-brand-primary transition-colors">contact us</Link>.</p>
              </div>
            )}
          </div>
        </section>

        {/* International Delivery */}
        <section className="mb-16">
          <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-brand-dark mb-2">International Delivery</h2>
          <p className="text-sm text-brand-muted mb-6">
            Select your destination to see available delivery methods, timing, duties/tax messaging and return options.
          </p>
          <div className="max-w-xl">
            <div className="relative mb-6">
              <select
                value={selectedCountry}
                onChange={e => setSelectedCountry(e.target.value)}
                className="w-full h-11 px-4 pr-10 border border-brand-border text-sm focus:outline-none focus:border-brand-dark bg-white appearance-none cursor-pointer"
              >
                <option value="">Country / Region ▼</option>
                {Object.keys(COUNTRY_DELIVERY).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {selectedCountry && deliveryInfo && (
              <div className="border border-brand-border p-6 space-y-4 bg-[#f6f5f2]">
                <h3 className="font-bold text-[15px] text-brand-dark">{selectedCountry}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-1">Delivery Time</p>
                    <p className="text-[13px] font-semibold text-brand-dark">{deliveryInfo.time}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-1">Duties & Tax</p>
                    <p className="text-[13px] font-semibold text-brand-dark">{deliveryInfo.duties}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-1">Assembly</p>
                    <p className="text-[13px] font-semibold text-brand-dark">{deliveryInfo.assembly}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-1">Returns</p>
                    <p className="text-[13px] font-semibold text-brand-dark">15-day return window on eligible items.</p>
                  </div>
                </div>
              </div>
            )}

            {selectedCountry && !deliveryInfo && (
              <div className="border border-brand-border p-6 text-center">
                <p className="text-brand-muted text-sm">Delivery to {selectedCountry} is not currently available. <Link href="/help/contact-us" className="underline hover:text-brand-primary transition-colors">Contact us</Link> to discuss options.</p>
              </div>
            )}
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16 max-w-2xl">
          <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-brand-dark mb-6">Frequently Asked Questions</h2>
          <div className="border-t border-brand-border">
            {FAQ_ITEMS.map((faq, i) => (
              <div key={i} className="border-b border-brand-border">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-0 py-5 flex items-center justify-between hover:opacity-70 transition-opacity"
                >
                  <span className="text-[14px] font-semibold text-brand-dark pr-4">{faq.q}</span>
                  <span className="text-brand-muted text-xl leading-none shrink-0">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="pb-5">
                    <p className="text-[13px] text-brand-muted leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section>
          <div className="bg-[#f6f5f2] rounded-md p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold mb-2">Still need help?</h2>
              <p className="text-sm text-brand-muted">Our team is available Mon–Sat, 9am–6pm IST.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:hello@premiuscrafts.com"
                className="px-8 py-4 bg-brand-dark text-white font-bold text-[11px] uppercase tracking-widest hover:bg-brand-dark/90 transition-colors"
              >
                EMAIL US
              </a>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-brand-dark text-brand-dark font-bold text-[11px] uppercase tracking-widest hover:bg-brand-dark hover:text-white transition-colors"
              >
                WHATSAPP
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
