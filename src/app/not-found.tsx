"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg mx-auto px-4"
      >
        <div className="w-32 h-32 bg-brand-secondary rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="font-[family-name:var(--font-playfair)] text-5xl font-bold text-brand-primary">
            404
          </span>
        </div>
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-brand-text mb-3">
          Page Not Found
        </h1>
        <p className="text-brand-muted mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-brand-primary text-white font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-brand-dark transition-colors"
          >
            <Home size={18} />
            Go Home
          </Link>
          <Link
            href="/category/furniture"
            className="w-full sm:w-auto px-6 py-3 border border-brand-border text-brand-text font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-white transition-colors"
          >
            <Search size={18} />
            Browse Products
          </Link>
        </div>
        <button
          onClick={() => window.history.back()}
          className="mt-4 inline-flex items-center gap-1 text-sm text-brand-primary hover:underline"
        >
          <ArrowLeft size={14} />
          Go Back
        </button>
      </motion.div>
    </div>
  );
}
