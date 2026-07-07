"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Category } from "@/lib/data/categories";
import { Product } from "@/lib/data/products";
import ProductCard from "@/components/common/ProductCard";
import Breadcrumb from "@/components/common/Breadcrumb";

interface CategoryPageContentProps {
  category: Category;
  categoryProducts: Product[];
}

export default function CategoryPageContent({ category, categoryProducts }: CategoryPageContentProps) {
  const subcategories = category.groups.flatMap(g => g.items);

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Hero Banner */}
      <div className="relative h-[300px] lg:h-[400px] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-text/70 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20 w-full">
            <Breadcrumb items={[{ label: category.name }]} />
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-[family-name:var(--font-playfair)] text-3xl lg:text-5xl font-bold text-white mt-4"
            >
              {category.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/80 mt-3 max-w-lg"
            >
              {category.description}
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20 py-12">
        {/* Subcategories */}
        <div className="mb-12">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-brand-text mb-6">
            Shop by Subcategory
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
            {subcategories.map((sub) => (
              <Link
                key={sub.slug}
                href={`/products/${sub.slug}`}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-brand-border rounded-full text-sm font-medium text-brand-text hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all whitespace-nowrap shrink-0"
              >
                {sub.name}
                <ChevronRight size={14} />
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Collections */}
        <div className="mb-12">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-brand-text mb-6">
            Featured Collections
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subcategories.slice(0, 3).map((sub, i) => (
              <motion.div
                key={sub.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/products/${sub.slug}`} className="group block relative rounded-xl overflow-hidden">
                  <div className="aspect-[4/3]">
                    <img
                      src={sub.image || category.image}
                      alt={sub.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-text/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-[family-name:var(--font-playfair)] text-white text-xl font-bold">{sub.name}</h3>
                      <span className="inline-flex items-center gap-1 text-brand-accent text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Explore <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trending Products */}
        {categoryProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-brand-text">
                Trending in {category.name}
              </h2>
              <Link
                href={`/products/${subcategories[0]?.slug || category.slug}`}
                className="text-brand-primary font-medium hover:underline flex items-center gap-1"
              >
                View All <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {categoryProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Buyer's Guide */}
        <div className="mt-16 bg-white rounded-xl p-6 lg:p-8 border border-brand-border/50">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-brand-text mb-4">
            {category.name} Buyer's Guide
          </h2>
          <p className="text-brand-muted leading-relaxed">
            Choosing the right {category.name.toLowerCase()} for your home involves considering space, style, and functionality. 
            At PremiumCrafts, we offer a curated selection crafted from premium materials like solid Sheesham wood, 
            engineered wood with veneer finishes, and high-quality upholstery fabrics. Look for features like warranty coverage, 
            ease of assembly, and delivery timelines. Our customer service team is always available to help you make the perfect choice 
            for your living space.
          </p>
        </div>
      </div>
    </div>
  );
}
