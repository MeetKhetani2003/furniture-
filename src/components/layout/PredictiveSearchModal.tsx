"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, TrendingUp, ChevronRight } from "lucide-react";
import { formatPrice } from "@/lib/utils/formatPrice";

interface PredictiveSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PredictiveSearchModal({ isOpen, onClose }: PredictiveSearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults([]);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length >= 2) {
        setIsSearching(true);
        fetch(`/api/search?q=${encodeURIComponent(query.trim())}`)
          .then(res => res.json())
          .then(data => {
            setResults(data.products || []);
            setIsSearching(false);
          })
          .catch(() => setIsSearching(false));
      } else {
        setResults([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-[1000px] mt-24 bg-[#FAF9F6] rounded-2xl shadow-2xl overflow-hidden relative z-10 mx-4 border border-brand-border/60"
          >
            <div className="p-6 border-b border-brand-border/60 flex items-center gap-4">
              <Search size={24} className="text-brand-muted" />
              <form onSubmit={handleSubmit} className="flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search for furniture, styles, or rooms..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full h-12 bg-transparent text-xl font-[family-name:var(--font-playfair)] font-bold text-brand-text placeholder:text-brand-muted/50 focus:outline-none"
                />
              </form>
              <button onClick={onClose} className="p-2 text-brand-muted hover:text-brand-text transition-colors bg-white rounded-full border border-brand-border">
                <X size={20} />
              </button>
            </div>

            <div className="p-8 min-h-[400px] max-h-[60vh] overflow-y-auto">
              {query.length < 2 ? (
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-[11px] font-bold text-brand-accent uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Clock size={14} /> Recent Searches
                    </h3>
                    <div className="space-y-3">
                      {["Verona Sofa", "Dining Table", "Accent Chairs"].map(term => (
                        <button key={term} onClick={() => setQuery(term)} className="block text-[14px] text-brand-text font-medium hover:text-brand-primary transition-colors text-left">
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[11px] font-bold text-brand-accent uppercase tracking-widest mb-4 flex items-center gap-2">
                      <TrendingUp size={14} /> Trending Collections
                    </h3>
                    <div className="space-y-3">
                      <Link href="/collections/mid-century" onClick={onClose} className="flex items-center justify-between group">
                        <span className="text-[14px] text-brand-text font-medium group-hover:text-brand-primary transition-colors">Mid-Century Modern</span>
                        <ChevronRight size={14} className="text-brand-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                      <Link href="/collections/solid-wood" onClick={onClose} className="flex items-center justify-between group">
                        <span className="text-[14px] text-brand-text font-medium group-hover:text-brand-primary transition-colors">Solid Wood Essentials</span>
                        <ChevronRight size={14} className="text-brand-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                      <Link href="/collections/small-spaces" onClick={onClose} className="flex items-center justify-between group">
                        <span className="text-[14px] text-brand-text font-medium group-hover:text-brand-primary transition-colors">Small Space Living</span>
                        <ChevronRight size={14} className="text-brand-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : isSearching ? (
                <div className="flex items-center justify-center h-48">
                  <div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : results.length > 0 ? (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[11px] font-bold text-brand-accent uppercase tracking-widest">
                      Products
                    </h3>
                    <Link href={`/search?q=${encodeURIComponent(query)}`} onClick={onClose} className="text-[11px] font-bold text-brand-primary hover:underline uppercase tracking-widest">
                      View All Results &rarr;
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {results.slice(0, 4).map(p => (
                      <Link key={p.id} href={`/product/${p.slug}`} onClick={onClose} className="group block bg-white p-4 rounded-xl border border-brand-border/60 hover:border-brand-primary/50 transition-colors">
                        <div className="w-full aspect-square bg-[#F6F5F2] rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                          <img src={p.image} alt={p.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <h4 className="text-[14px] font-bold font-[family-name:var(--font-playfair)] text-brand-text mb-1 leading-tight group-hover:text-brand-primary transition-colors">
                          {p.name}
                        </h4>
                        <div className="text-[13px] font-bold text-brand-text">
                          {formatPrice(p.price)}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-center">
                  <Search size={32} className="text-brand-muted mb-4 opacity-50" />
                  <p className="text-[15px] font-medium text-brand-text mb-2">No results found for "{query}"</p>
                  <p className="text-[13px] text-brand-muted">Try checking your spelling or use more general terms.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
