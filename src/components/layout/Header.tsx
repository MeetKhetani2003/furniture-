"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  Phone,
  Truck,
  Gift,
  Building2,
  Tag,
} from "lucide-react";
import { useCartStore } from "@/lib/stores/cartStore";
import { useWishlistStore } from "@/lib/stores/wishlistStore";
import { categories } from "@/lib/data/categories";
import AnnouncementBar from "./AnnouncementBar";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const cartCount = useCartStore((s) => s.getTotalItems());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMegaMenu(null);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      <AnnouncementBar />
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white"
        }`}
      >
        {/* Top Utility Bar */}
        <div className="hidden lg:block bg-brand-secondary border-b border-brand-border">
          <div className="max-w-[1440px] mx-auto px-6 xl:px-20">
            <div className="flex items-center justify-between py-1.5 text-xs text-brand-muted">
              <div className="flex items-center gap-6">
                <Link href="/about" className="hover:text-brand-primary transition-colors flex items-center gap-1">
                  <Building2 size={12} />
                  Business
                </Link>
                <Link href="/about" className="hover:text-brand-primary transition-colors flex items-center gap-1">
                  <Tag size={12} />
                  Sell on PremiumCrafts
                </Link>
                <Link href="/about" className="hover:text-brand-primary transition-colors flex items-center gap-1">
                  <Gift size={12} />
                  Gift Cards
                </Link>
              </div>
              <div className="flex items-center gap-6">
                <Link href="/account/orders" className="hover:text-brand-primary transition-colors flex items-center gap-1">
                  <Truck size={12} />
                  Track Order
                </Link>
                <Link href="/about" className="hover:text-brand-primary transition-colors flex items-center gap-1">
                  <Phone size={12} />
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20">
          <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 -ml-2"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-brand-primary">
                <rect x="2" y="10" width="28" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M6 10V6C6 4.89543 6.89543 4 8 4H24C25.1046 4 26 4.89543 26 6V10" stroke="currentColor" strokeWidth="2" />
                <path d="M10 18H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="16" cy="24" r="2" fill="currentColor" />
              </svg>
              <span className="font-[family-name:var(--font-playfair)] text-xl lg:text-2xl font-bold text-brand-dark">
                PremiumCrafts
              </span>
            </Link>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for furniture, décor, lighting..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 pl-4 pr-12 rounded-full border border-brand-border bg-brand-bg focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-sm"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 bg-brand-primary text-white rounded-full flex items-center justify-center hover:bg-brand-dark transition-colors"
                  aria-label="Search"
                >
                  <Search size={16} />
                </button>
              </div>
            </form>

            {/* Right Icons */}
            <div className="flex items-center gap-1 sm:gap-3">
              <Link
                href="/account"
                className="hidden sm:flex flex-col items-center p-2 hover:text-brand-primary transition-colors"
              >
                <User size={22} />
                <span className="text-[10px] mt-0.5">Profile</span>
              </Link>
              <Link
                href="/wishlist"
                className="flex flex-col items-center p-2 hover:text-brand-primary transition-colors relative"
              >
                <Heart size={22} />
                <span className="text-[10px] mt-0.5 hidden sm:inline">Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 right-0.5 w-5 h-5 bg-brand-primary text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link
                href="/cart"
                className="flex flex-col items-center p-2 hover:text-brand-primary transition-colors relative"
              >
                <ShoppingCart size={22} />
                <span className="text-[10px] mt-0.5 hidden sm:inline">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 right-0.5 w-5 h-5 bg-brand-primary text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Category Nav - Desktop */}
        <div className="hidden lg:block border-t border-brand-border">
          <div className="max-w-[1440px] mx-auto px-6 xl:px-20">
            <nav className="flex items-center gap-8">
              {categories.slice(0, 7).map((cat) => (
                <div
                  key={cat.slug}
                  className="relative"
                  onMouseEnter={() => setActiveMegaMenu(cat.slug)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <Link
                    href={`/category/${cat.slug}`}
                    className="flex items-center gap-1 py-3 text-sm font-medium text-brand-text hover:text-brand-primary transition-colors"
                  >
                    {cat.name}
                    <ChevronDown size={14} className={`transition-transform ${activeMegaMenu === cat.slug ? "rotate-180" : ""}`} />
                  </Link>
                  <AnimatePresence>
                    {activeMegaMenu === cat.slug && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-[700px] bg-white shadow-xl rounded-b-lg border border-brand-border overflow-hidden z-50"
                      >
                        <div className="p-6 grid grid-cols-4 gap-6">
                          <div className="col-span-3 grid grid-cols-3 gap-4">
                            {cat.subcategories.map((sub) => (
                              <Link
                                key={sub.slug}
                                href={`/products/${sub.slug}`}
                                className="text-sm text-brand-muted hover:text-brand-primary transition-colors py-1"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                          <div className="col-span-1">
                            <div className="rounded-lg overflow-hidden image-zoom">
                              <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-40 object-cover"
                              />
                            </div>
                            <p className="text-xs text-brand-muted mt-2">{cat.description.slice(0, 60)}...</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[60]"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[300px] bg-white z-[70] overflow-y-auto"
            >
              <div className="p-4 border-b border-brand-border flex items-center justify-between">
                <span className="font-[family-name:var(--font-playfair)] text-xl font-bold text-brand-dark">
                  PremiumCrafts
                </span>
                <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                  <X size={24} />
                </button>
              </div>
              <div className="p-4">
                <form onSubmit={handleSearch} className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-10 pl-4 pr-10 rounded-lg border border-brand-border bg-brand-bg focus:outline-none focus:border-brand-primary text-sm"
                    />
                    <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2" aria-label="Search">
                      <Search size={18} className="text-brand-muted" />
                    </button>
                  </div>
                </form>
                <nav className="space-y-1">
                  {categories.map((cat) => (
                    <MobileAccordion key={cat.slug} category={cat} />
                  ))}
                </nav>
                <div className="mt-6 pt-6 border-t border-brand-border space-y-3">
                  <Link href="/account" className="flex items-center gap-2 py-2 text-sm">
                    <User size={18} />
                    My Account
                  </Link>
                  <Link href="/wishlist" className="flex items-center gap-2 py-2 text-sm">
                    <Heart size={18} />
                    Wishlist ({wishlistCount})
                  </Link>
                  <Link href="/cart" className="flex items-center gap-2 py-2 text-sm">
                    <ShoppingCart size={18} />
                    Cart ({cartCount})
                  </Link>
                  <Link href="/account/orders" className="flex items-center gap-2 py-2 text-sm">
                    <Truck size={18} />
                    Track Order
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileAccordion({ category }: { category: (typeof categories)[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-2.5 text-sm font-medium"
      >
        {category.name}
        <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pl-4 pb-2 space-y-1">
              {category.subcategories.map((sub) => (
                <Link
                  key={sub.slug}
                  href={`/products/${sub.slug}`}
                  className="block py-1.5 text-sm text-brand-muted hover:text-brand-primary"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
