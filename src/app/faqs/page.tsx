"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const FAQS = [
  {
    category: "Shipping & Delivery",
    questions: [
      { q: "Where do you ship?", a: "We offer free shipping across India. We also offer worldwide delivery with international shipping rates calculated at checkout based on volume and destination." },
      { q: "How long will my order take?", a: "In-stock items typically ship within 3-5 business days. Custom furniture and made-to-order pieces require 6-8 weeks for crafting and delivery." },
      { q: "Do you offer white glove delivery?", a: "Yes, for all large furniture items, white glove delivery (including room of choice placement and debris removal) is available in major metropolitan areas." }
    ]
  },
  {
    category: "Products & Materials",
    questions: [
      { q: "Are your materials sustainably sourced?", a: "Yes. 100% of our solid wood is FSC-certified or reclaimed. We prioritize sustainable, non-toxic materials across our entire product line." },
      { q: "Can I customize a piece of furniture?", a: "Absolutely. Many of our sofas, dining tables, and beds can be customized. Visit our Custom Furniture page to explore options for dimensions, woods, and fabrics." },
      { q: "Do you offer fabric swatches?", a: "Yes, we offer complimentary fabric and wood swatches. You can order a material sample kit directly from our product pages." }
    ]
  },
  {
    category: "Returns & Warranty",
    questions: [
      { q: "What is your return policy?", a: "We offer a 30-day return policy for standard items in original condition. Custom and made-to-order items are non-returnable unless defective." },
      { q: "Does your furniture come with a warranty?", a: "Yes, all our furniture is backed by a 5-year structural warranty against manufacturing defects." }
    ]
  }
];

export default function FAQsPage() {
  const [openQ, setOpenQ] = useState<string | null>("Where do you ship?");

  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark">
      {/* Header */}
      <div className="bg-brand-secondary/30 py-16 text-center border-b border-brand-border/40">
        <h1 className="text-4xl font-[family-name:var(--font-playfair)] font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-brand-muted max-w-xl mx-auto">
          Find answers to common questions about our products, shipping, returns, and more.
        </p>
      </div>

      <div className="max-w-[800px] mx-auto px-4 py-16">
        {FAQS.map((section, idx) => (
          <div key={idx} className="mb-12">
            <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold mb-6 text-brand-primary">{section.category}</h2>
            <div className="space-y-4">
              {section.questions.map((faq, fidx) => {
                const isOpen = openQ === faq.q;
                return (
                  <div key={fidx} className="border border-brand-border/50 rounded-lg bg-white overflow-hidden">
                    <button
                      className="w-full text-left px-6 py-4 flex items-center justify-between font-bold hover:text-brand-primary transition-colors focus:outline-none"
                      onClick={() => setOpenQ(isOpen ? null : faq.q)}
                    >
                      {faq.q}
                      <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-brand-primary" : "text-brand-muted"}`} />
                    </button>
                    <div className={`px-6 overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[500px] pb-6 opacity-100" : "max-h-0 opacity-0"}`}>
                      <p className="text-brand-muted text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="mt-16 text-center p-8 bg-brand-dark text-white rounded-xl">
          <h3 className="text-xl font-[family-name:var(--font-playfair)] font-bold mb-3">Still have questions?</h3>
          <p className="text-white/80 mb-6 text-sm">Our customer care team is here to help.</p>
          <Link href="/contact" className="inline-block px-8 py-3 bg-white text-brand-dark font-bold text-xs uppercase tracking-widest hover:bg-brand-primary transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
