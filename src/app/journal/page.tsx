"use client";

import { useState } from "react";
import Link from "next/link";

const CATEGORIES = ["ALL", "BUYING GUIDES", "ROOM IDEAS", "MATERIALS", "CARE", "DESIGN TRENDS", "BEHIND THE CRAFT"];

const ARTICLES = [
  {
    slug: "how-to-choose-a-sofa",
    title: "How to Choose the Perfect Sofa",
    category: "BUYING GUIDES",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    excerpt: "A practical guide to size, seating, materials, comfort and room planning.",
  },
  {
    slug: "solid-wood-guide",
    title: "A Guide to Solid Wood Furniture",
    category: "MATERIALS",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80",
    excerpt: "Understanding the differences between Sheesham, Mango, Teak and more.",
  },
  {
    slug: "calm-bedroom-design",
    title: "Designing a Calm Bedroom",
    category: "ROOM IDEAS",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1522771731478-44eb9f30b9bb?w=600&q=80",
    excerpt: "Colours, textures and layouts that create a peaceful sanctuary.",
  },
  {
    slug: "small-space-furniture",
    title: "Small Space Furniture Guide",
    category: "ROOM IDEAS",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=600&q=80",
    excerpt: "Smart furniture choices for apartments and compact living rooms.",
  },
  {
    slug: "how-to-care-for-solid-wood",
    title: "How to Care for Solid Wood",
    category: "CARE",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    excerpt: "Cleaning, polishing and protecting your solid wood furniture.",
  },
  {
    slug: "jodhpur-craft",
    title: "Behind the Craft: Jodhpur",
    category: "BEHIND THE CRAFT",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=600&q=80",
    excerpt: "Inside the workshops where Premius Crafts pieces come to life.",
  },
];

export default function JournalPage() {
  const [activeTab, setActiveTab] = useState("ALL");

  const filtered = activeTab === "ALL"
    ? ARTICLES
    : ARTICLES.filter(a => a.category === activeTab);

  return (
    <div className="min-h-screen bg-white text-brand-dark">
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-brand-border">
        <h1 className="text-3xl font-[family-name:var(--font-playfair)] font-bold mb-1">Inspiration & Journal</h1>
        <p className="text-sm text-brand-muted mb-4">Editorial SEO hub that routes into commerce.</p>
        <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-brand-dark">
          Ideas, guides and stories for beautiful living.
        </h2>
      </div>

      {/* Category Filter Tabs */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 sticky top-[46px] bg-white z-20 border-b border-brand-border/50">
        <div className="flex gap-6 overflow-x-auto hide-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`shrink-0 py-4 text-[10px] font-bold tracking-widest uppercase border-b-2 transition-colors ${
                activeTab === cat
                  ? "border-brand-dark text-brand-dark"
                  : "border-transparent text-brand-muted hover:text-brand-dark"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((article) => (
            <Link key={article.slug} href={`/journal/${article.slug}`} className="group block">
              <div className="aspect-[4/3] bg-[#f4f2ec] rounded-md overflow-hidden mb-4 relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="absolute inset-0 w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="border border-black/10 bg-[#f4f2ec]/70 backdrop-blur-sm px-4 py-2">
                    <p className="text-[12px] text-brand-muted italic">{article.title.split(":")[0]}</p>
                  </div>
                </div>
              </div>
              <span className="text-[9px] font-bold tracking-widest uppercase text-[#b89c72] block mb-1">{article.category}</span>
              <h3 className="font-[family-name:var(--font-playfair)] font-bold text-brand-dark mb-2 group-hover:text-brand-primary transition-colors leading-snug">
                {article.title}
              </h3>
              <p className="text-xs text-brand-muted mb-3">{article.excerpt}</p>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-dark underline underline-offset-4 group-hover:text-brand-primary transition-colors">
                READ MORE →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
