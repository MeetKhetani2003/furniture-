"use client";

import { useState } from "react";
import Link from "next/link";

const TABS = ["REAL HOMES", "RESIDENTIAL", "HOTELS", "RESTAURANTS", "OFFICES", "RETAIL"];

const PROJECTS = [
  { slug: "warm-london-living-room", title: "A Warm London Living Room", type: "REAL HOMES", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80", label: "London Living Room", location: "London, UK" },
  { slug: "compact-mumbai-apartment", title: "Compact Mumbai Apartment", type: "RESIDENTIAL", image: "https://images.unsplash.com/photo-1522771731478-44eb9f30b9bb?w=800&q=80", label: "Mumbai Apartment", location: "Mumbai, India" },
  { slug: "dubai-villa-modern-neutral", title: "Dubai Villa: Modern Neutral", type: "RESIDENTIAL", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80", label: "Dubai Villa", location: "Dubai, UAE" },
  { slug: "boutique-hotel-project", title: "Boutique Hotel Project", type: "HOTELS", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80", label: "Boutique Hotel", location: "Jaipur, India" },
  { slug: "hospitality-dining-project", title: "Hospitality Dining Project", type: "RESTAURANTS", image: "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=800&q=80", label: "Restaurant Project", location: "Bangalore, India" },
  { slug: "contemporary-office-fit-out", title: "Contemporary Office Fit-Out", type: "OFFICES", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80", label: "Contemporary Office", location: "Delhi, India" },
];

export default function RealHomesPage() {
  const [activeTab, setActiveTab] = useState("REAL HOMES");

  const filtered = activeTab === "REAL HOMES"
    ? PROJECTS
    : PROJECTS.filter(p => p.type === activeTab);

  return (
    <div className="min-h-screen bg-white text-brand-dark">
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-brand-border">
        <h1 className="text-3xl font-[family-name:var(--font-playfair)] font-bold mb-1">Real Homes & Projects</h1>
        <p className="text-sm text-brand-muted">UGC + residential + hospitality case-study template.</p>
      </div>

      {/* Tab Filter */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 border-b border-brand-border/50">
        <div className="flex gap-6 overflow-x-auto hide-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 py-4 text-[10px] font-bold tracking-widest uppercase border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-brand-dark text-brand-dark"
                  : "border-transparent text-brand-muted hover:text-brand-dark"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project) => (
              <Link key={project.slug} href={`/real-homes/${project.slug}`} className="group block">
                <div className="aspect-[4/3] bg-[#f4f2ec] rounded-md overflow-hidden mb-4 relative">
                  <img
                    src={project.image}
                    alt={project.label}
                    className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-50 group-hover:opacity-70 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="border border-brand-border/30 bg-[#f4f2ec]/70 backdrop-blur-sm px-5 py-2">
                      <p className="text-[13px] text-brand-muted italic">{project.label}</p>
                    </div>
                  </div>
                </div>
                <span className="text-[9px] font-bold tracking-widest uppercase text-[#b89c72] block mb-1">{project.location}</span>
                <h3 className="font-[family-name:var(--font-playfair)] font-bold text-brand-dark group-hover:text-brand-primary transition-colors mb-2">
                  {project.title}
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-dark underline underline-offset-4 group-hover:text-brand-primary transition-colors">
                  VIEW STORY →
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-brand-muted">No projects in this category yet. Check back soon.</p>
          </div>
        )}

        {/* B2B CTA */}
        <div className="mt-20 bg-[#f6f5f2] rounded-md p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold mb-2">Working on a project?</h2>
            <p className="text-sm text-brand-muted max-w-md">
              Our Trade team works with interior designers, architects, and hospitality professionals on bespoke projects.
            </p>
          </div>
          <Link
            href="/trade"
            className="shrink-0 px-10 py-4 border border-brand-dark text-brand-dark font-bold text-[11px] uppercase tracking-widest hover:bg-brand-dark hover:text-white transition-colors"
          >
            TRADE ENQUIRY →
          </Link>
        </div>
      </div>
    </div>
  );
}
