"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { Product } from "@/lib/data/products"; // Type only
import ProductCard from "@/components/common/ProductCard";
import Breadcrumb from "@/components/common/Breadcrumb";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const [sortBy, setSortBy] = useState("relevance");
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setDbProducts(data.products || []);
        }
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const results = dbProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  const sortedResults = [...results].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20 py-8">
        <Breadcrumb items={[{ label: "Search Results" }]} />

        <div className="mt-4">
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-brand-text mb-2">
            Search Results
          </h1>
          {loading ? (
             <p className="text-brand-muted">Searching amazing products...</p>
          ) : (
             <p className="text-brand-muted">
               {results.length} results for &ldquo;{query}&rdquo;
             </p>
          )}
        </div>

        {/* Search Bar */}
        <div className="mt-6 mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
              }
            }}
            className="flex gap-3 max-w-xl"
          >
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-10 pr-4 rounded-lg border border-brand-border bg-white focus:outline-none focus:border-brand-primary"
                placeholder="Search products..."
              />
            </div>
            <button
              type="submit"
              className="h-12 px-6 bg-brand-primary text-white font-medium rounded-lg hover:bg-brand-dark transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Sort */}
        {results.length > 0 && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-brand-muted">
              Showing {sortedResults.length} products
            </p>
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-brand-muted" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 px-3 rounded-lg border border-brand-border bg-white text-sm focus:outline-none focus:border-brand-primary"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full mx-auto mb-4" />
          </div>
        ) : sortedResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {sortedResults.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-brand-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-brand-muted" />
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-brand-text mb-2">
              No results found
            </h2>
            <p className="text-brand-muted max-w-md mx-auto">
              We couldn&apos;t find any products matching &ldquo;{query}&rdquo;. Try checking your spelling or browse our categories.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full" />
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}
