"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Plus } from "lucide-react";
import { Product } from "@/lib/data/products";
import Link from "next/link";

const MOCK_COLLECTIONS = ["Aravalli Collection", "Signature Series", "Modern Living"];
const MOCK_INSPIRATION = ["How to style a small living room", "Bedroom design guide", "Dining table buying guide"];

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [activeTab, setActiveTab] = useState<"products" | "collections" | "inspiration">("products");
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setDbProducts(data.products || []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const productResults = dbProducts.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const PLACEHOLDER_IMG = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80";

  return (
    <div className="min-h-screen bg-white text-brand-dark">
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-brand-border">
        <h1 className="text-4xl font-[family-name:var(--font-playfair)] font-bold mb-2">Search Results</h1>
        <p className="text-sm text-brand-muted mb-6">Full search page with tabs, filters and no-dead-end behavior.</p>

        {/* Search Bar */}
        <div className="relative max-w-xl mb-6">
          <input
            type="text"
            defaultValue={query}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                window.location.href = `/search?q=${encodeURIComponent((e.target as HTMLInputElement).value)}`;
              }
            }}
            className="w-full h-12 pl-4 pr-10 border border-brand-border bg-white text-sm focus:outline-none focus:border-brand-dark"
            placeholder="Search..."
          />
          <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted" />
        </div>

        {query && (
          <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold mb-4">
            Search results for &ldquo;{query}&rdquo;
          </h2>
        )}

        {/* Tabs */}
        <div className="flex gap-6 border-b border-brand-border/50">
          {[
            { id: "products" as const, label: "PRODUCTS", count: productResults.length },
            { id: "collections" as const, label: "COLLECTIONS", count: MOCK_COLLECTIONS.length },
            { id: "inspiration" as const, label: "INSPIRATION", count: MOCK_INSPIRATION.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-[11px] font-bold tracking-widest uppercase transition-colors relative ${
                activeTab === tab.id
                  ? "text-brand-dark after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-brand-dark"
                  : "text-brand-muted hover:text-brand-dark"
              }`}
            >
              {tab.label} {tab.count}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        {/* Left Filters (Products tab only) */}
        {activeTab === "products" && (
          <aside className="hidden lg:block w-[200px] shrink-0">
            <h3 className="text-[11px] font-bold tracking-widest uppercase mb-4 text-brand-dark">FILTERS</h3>
            <div className="space-y-0">
              {["Category", "Material", "Color", "Availability", "Style"].map((f) => (
                <div key={f} className="flex justify-between items-center py-3 border-b border-brand-border/40 cursor-pointer hover:text-brand-primary transition-colors">
                  <span className="text-[13px] font-semibold">{f}</span>
                  <Plus size={14} className="text-brand-muted" />
                </div>
              ))}
            </div>
          </aside>
        )}

        {/* Results */}
        <div className="flex-1">
          {activeTab === "products" && (
            loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full" />
              </div>
            ) : productResults.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {productResults.map((p) => (
                  <Link key={p.id} href={`/product/${p.id}`} className="group block">
                    <div className="aspect-square bg-[#f4f2ec] rounded-md flex items-center justify-center mb-3 overflow-hidden">
                      <img
                        src={p.images?.[0] || PLACEHOLDER_IMG}
                        alt={p.name}
                        className="w-full h-full object-contain mix-blend-multiply p-6 group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h4 className="text-sm font-[family-name:var(--font-playfair)] font-bold text-brand-dark line-clamp-2 mb-1">{p.name}</h4>
                    <div className="flex items-center gap-1 mb-1">
                      {[1,2,3,4,5].map(s => <span key={s} className="text-amber-400 text-xs">★</span>)}
                      <span className="text-[11px] text-brand-muted">(128)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-brand-dark">₹{p.price.toLocaleString("en-IN")}</span>
                      <div className="w-3 h-3 rounded-full bg-[#E5DCC5] border border-black/10" />
                      <div className="w-3 h-3 rounded-full bg-[#2C2C2C] border border-black/10" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Search size={40} className="mx-auto text-brand-muted mb-4 opacity-40" />
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold mb-2">No results for &ldquo;{query}&rdquo;</h3>
                <p className="text-brand-muted text-sm max-w-md mx-auto">
                  Try checking your spelling, or browse our categories below.
                </p>
                <div className="flex flex-wrap justify-center gap-3 mt-8">
                  {["Living Room", "Bedroom", "Dining", "Outdoor"].map(cat => (
                    <Link key={cat} href={`/${cat.toLowerCase().replace(" ", "-")}`}
                      className="px-5 py-2 border border-brand-dark text-sm font-semibold hover:bg-brand-dark hover:text-white transition-colors">
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            )
          )}

          {activeTab === "collections" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {MOCK_COLLECTIONS.map((col) => (
                <Link key={col} href="/collections" className="group block">
                  <div className="aspect-[4/3] bg-[#6b513b] rounded-md mb-3 flex items-end p-6">
                    <h3 className="text-white font-[family-name:var(--font-playfair)] font-bold text-lg">{col}</h3>
                  </div>
                  <p className="text-xs text-brand-muted group-hover:text-brand-primary transition-colors">View Collection →</p>
                </Link>
              ))}
            </div>
          )}

          {activeTab === "inspiration" && (
            <div className="space-y-6">
              {MOCK_INSPIRATION.map((article) => (
                <Link key={article} href="/rooms" className="group flex items-center gap-6 border-b border-brand-border pb-6">
                  <div className="w-24 h-24 bg-[#f4f2ec] rounded-md shrink-0" />
                  <div>
                    <h4 className="font-[family-name:var(--font-playfair)] font-bold text-brand-dark group-hover:text-brand-primary transition-colors mb-1">{article}</h4>
                    <p className="text-xs text-brand-muted">Design Guide · 5 min read</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full" />
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}
