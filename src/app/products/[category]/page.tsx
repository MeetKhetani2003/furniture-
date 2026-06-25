"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  SlidersHorizontal,
  Grid3X3,
  List,
  X,
  ChevronDown,
  Star,
  Search,
} from "lucide-react";
import { products } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";
import ProductCard from "@/components/common/ProductCard";
import Breadcrumb from "@/components/common/Breadcrumb";
import { formatPrice } from "@/lib/utils/formatPrice";
import RatingStars from "@/components/common/RatingStars";
import PriceDisplay from "@/components/common/PriceDisplay";

const sortOptions = [
  { value: "popularity", label: "Popularity" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "rating", label: "Highest Rated" },
];

const materials = ["Wood", "Metal", "Fabric", "Leather", "Glass", "Ceramic"];
const colors = [
  { name: "Brown", hex: "#8B4513" },
  { name: "Black", hex: "#1A1A1A" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Grey", hex: "#808080" },
  { name: "Blue", hex: "#1B3A5C" },
  { name: "Green", hex: "#0B6E4F" },
  { name: "Beige", hex: "#F5F5DC" },
  { name: "Red", hex: "#DC143C" },
];

export default function ProductListingPage({ params }: { params: { category: string } }) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popularity");
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const categoryName = params.category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const filteredProducts = useMemo(() => {
    let result = products.filter(
      (p) =>
        p.category === params.category ||
        p.subcategory === params.category ||
        p.subcategory.includes(params.category.replace("-", "")) ||
        p.name.toLowerCase().includes(params.category.toLowerCase().replace("-", " "))
    );

    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (selectedMaterials.length > 0) {
      result = result.filter((p) =>
        selectedMaterials.some((m) =>
          p.material.toLowerCase().includes(m.toLowerCase())
        )
      );
    }

    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) => selectedColors.includes(c.name))
      );
    }

    if (selectedRating > 0) {
      result = result.filter((p) => p.rating >= selectedRating);
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [params.category, sortBy, priceRange, selectedMaterials, selectedColors, selectedRating, searchQuery]);

  const toggleMaterial = (m: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );
  };

  const toggleColor = (c: string) => {
    setSelectedColors((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 500000]);
    setSelectedMaterials([]);
    setSelectedColors([]);
    setSelectedRating(0);
    setSearchQuery("");
  };

  const activeFiltersCount =
    (priceRange[0] > 0 || priceRange[1] < 500000 ? 1 : 0) +
    selectedMaterials.length +
    selectedColors.length +
    (selectedRating > 0 ? 1 : 0);

  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20 py-6">
        <Breadcrumb
          items={[
            { label: "Categories", href: "/category/furniture" },
            { label: categoryName },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-brand-text">Filters</h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-brand-primary hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Price Range */}
              <div className="bg-white rounded-xl p-4 border border-brand-border/50">
                <h4 className="font-medium text-sm mb-3">Price Range</h4>
                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full h-9 px-2 text-sm border border-brand-border rounded focus:outline-none focus:border-brand-primary"
                  />
                  <span className="text-brand-muted">-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full h-9 px-2 text-sm border border-brand-border rounded focus:outline-none focus:border-brand-primary"
                  />
                </div>
                <input
                  type="range"
                  min={0}
                  max={500000}
                  step={5000}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full accent-brand-primary"
                />
              </div>

              {/* Material */}
              <div className="bg-white rounded-xl p-4 border border-brand-border/50">
                <h4 className="font-medium text-sm mb-3">Material</h4>
                <div className="space-y-2">
                  {materials.map((m) => (
                    <label key={m} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedMaterials.includes(m)}
                        onChange={() => toggleMaterial(m)}
                        className="w-4 h-4 accent-brand-primary"
                      />
                      <span className="text-sm text-brand-muted">{m}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className="bg-white rounded-xl p-4 border border-brand-border/50">
                <h4 className="font-medium text-sm mb-3">Color</h4>
                <div className="flex flex-wrap gap-2">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => toggleColor(c.name)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColors.includes(c.name)
                          ? "border-brand-primary scale-110"
                          : "border-brand-border"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="bg-white rounded-xl p-4 border border-brand-border/50">
                <h4 className="font-medium text-sm mb-3">Rating</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((r) => (
                    <button
                      key={r}
                      onClick={() => setSelectedRating(r === selectedRating ? 0 : r)}
                      className={`flex items-center gap-2 w-full text-sm ${
                        selectedRating === r ? "text-brand-primary font-medium" : "text-brand-muted"
                      }`}
                    >
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < r ? "text-amber-400 fill-amber-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <span>& Up</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="font-[family-name:var(--font-playfair)] text-2xl lg:text-3xl font-bold text-brand-text">
                  {categoryName}
                </h1>
                <p className="text-sm text-brand-muted mt-1">
                  {filteredProducts.length} products found
                </p>
              </div>
              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-brand-border rounded-lg text-sm"
                >
                  <SlidersHorizontal size={16} />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="w-5 h-5 bg-brand-primary text-white text-xs rounded-full flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
                {/* Search */}
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
                  <input
                    type="text"
                    placeholder="Search in category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-10 pl-9 pr-4 rounded-lg border border-brand-border bg-white text-sm focus:outline-none focus:border-brand-primary w-48"
                  />
                </div>
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-10 px-3 rounded-lg border border-brand-border bg-white text-sm focus:outline-none focus:border-brand-primary"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                {/* View Toggle */}
                <div className="hidden sm:flex bg-white border border-brand-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2.5 ${viewMode === "grid" ? "bg-brand-primary text-white" : "text-brand-muted"}`}
                  >
                    <Grid3X3 size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2.5 ${viewMode === "list" ? "bg-brand-primary text-white" : "text-brand-muted"}`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {priceRange[0] > 0 || priceRange[1] < 500000 ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs rounded-full">
                    {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    <button onClick={() => setPriceRange([0, 500000])}><X size={12} /></button>
                  </span>
                ) : null}
                {selectedMaterials.map((m) => (
                  <span key={m} className="inline-flex items-center gap-1 px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs rounded-full">
                    {m}
                    <button onClick={() => toggleMaterial(m)}><X size={12} /></button>
                  </span>
                ))}
                {selectedColors.map((c) => (
                  <span key={c} className="inline-flex items-center gap-1 px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs rounded-full">
                    {c}
                    <button onClick={() => toggleColor(c)}><X size={12} /></button>
                  </span>
                ))}
                {selectedRating > 0 && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs rounded-full">
                    {selectedRating}+ Stars
                    <button onClick={() => setSelectedRating(0)}><X size={12} /></button>
                  </span>
                )}
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6"
                    : "space-y-4"
                }
              >
                {filteredProducts.map((product, i) =>
                  viewMode === "grid" ? (
                    <ProductCard key={product.id} product={product} index={i} />
                  ) : (
                    <ListProductCard key={product.id} product={product} index={i} />
                  )
                )}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-brand-muted text-lg">No products found matching your filters.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-dark transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <MobileFilters
          onClose={() => setMobileFiltersOpen(false)}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedMaterials={selectedMaterials}
          toggleMaterial={toggleMaterial}
          selectedColors={selectedColors}
          toggleColor={toggleColor}
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
          clearFilters={clearFilters}
        />
      )}
    </div>
  );
}

function ListProductCard({ product, index }: { product: (typeof products)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/product/${product.id}`} className="flex gap-4 bg-white rounded-xl p-4 border border-brand-border/50 hover:shadow-lg transition-all">
        <div className="w-32 h-32 shrink-0 rounded-lg overflow-hidden bg-brand-secondary">
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-brand-muted">{product.brand}</p>
          <h3 className="font-[family-name:var(--font-playfair)] font-semibold text-brand-text line-clamp-2">{product.name}</h3>
          <div className="mt-1">
            <RatingStars rating={product.rating} size={12} showValue reviewCount={product.reviewCount} />
          </div>
          <div className="mt-2">
            <PriceDisplay price={product.price} mrp={product.mrp} discountPercent={product.discountPercent} size="sm" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function MobileFilters({
  onClose,
  priceRange,
  setPriceRange,
  selectedMaterials,
  toggleMaterial,
  selectedColors,
  toggleColor,
  selectedRating,
  setSelectedRating,
  clearFilters,
}: {
  onClose: () => void;
  priceRange: number[];
  setPriceRange: (v: number[]) => void;
  selectedMaterials: string[];
  toggleMaterial: (m: string) => void;
  selectedColors: string[];
  toggleColor: (c: string) => void;
  selectedRating: number;
  setSelectedRating: (r: number) => void;
  clearFilters: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[80]">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b border-brand-border p-4 flex items-center justify-between z-10">
          <h3 className="font-semibold">Filters</h3>
          <div className="flex items-center gap-3">
            <button onClick={clearFilters} className="text-sm text-brand-primary">Clear</button>
            <button onClick={onClose}><X size={20} /></button>
          </div>
        </div>
        <div className="p-4 space-y-6">
          <div>
            <h4 className="font-medium text-sm mb-3">Price Range</h4>
            <input
              type="range"
              min={0}
              max={500000}
              step={5000}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full accent-brand-primary"
            />
            <div className="flex justify-between text-sm text-brand-muted mt-1">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-3">Material</h4>
            <div className="flex flex-wrap gap-2">
              {materials.map((m) => (
                <button
                  key={m}
                  onClick={() => toggleMaterial(m)}
                  className={`px-3 py-1.5 rounded-full text-sm border ${
                    selectedMaterials.includes(m)
                      ? "bg-brand-primary text-white border-brand-primary"
                      : "bg-white text-brand-muted border-brand-border"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-3">Color</h4>
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => toggleColor(c.name)}
                  className={`w-10 h-10 rounded-full border-2 ${
                    selectedColors.includes(c.name) ? "border-brand-primary" : "border-brand-border"
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-3">Minimum Rating</h4>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRating(r === selectedRating ? 0 : r)}
                  className={`px-3 py-1.5 rounded-full text-sm border flex items-center gap-1 ${
                    selectedRating === r
                      ? "bg-brand-primary text-white border-brand-primary"
                      : "bg-white text-brand-muted border-brand-border"
                  }`}
                >
                  {r}+ <Star size={12} className="fill-current" />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 bg-white border-t border-brand-border p-4">
          <button
            onClick={onClose}
            className="w-full py-3 bg-brand-primary text-white font-medium rounded-lg"
          >
            Apply Filters
          </button>
        </div>
      </motion.div>
    </div>
  );
}
