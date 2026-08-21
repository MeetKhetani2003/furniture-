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
import { useSession } from "next-auth/react";
import AnnouncementBar from "./AnnouncementBar";
import LoginModal from "@/components/auth/LoginModal";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const { data: session, status } = useSession();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const cartCount = useCartStore((s) => s.getTotalItems());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    setMounted(true);
    setMobileMenuOpen(false);
    setActiveMegaMenu(null);
    setShowDropdown(false);
  }, [pathname]);

  useEffect(() => {
    if (status === "unauthenticated" && !sessionStorage.getItem("hasSeenLoginModal")) {
      const timer = setTimeout(() => {
        setShowLogin(true);
        sessionStorage.setItem("hasSeenLoginModal", "true");
      }, 1500); // Add a small delay for better user experience
      return () => clearTimeout(timer);
    }
  }, [status]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        setIsSearching(true);
        fetch(`/api/search?q=${encodeURIComponent(searchQuery.trim())}`)
          .then(res => res.json())
          .then(data => {
            setSearchResults(data.products || []);
            setShowDropdown(true);
            setIsSearching(false);
          })
          .catch(() => {
            setIsSearching(false);
          });
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      <AnnouncementBar />
      <header className="relative z-50 bg-brand-bg">
        {/* Top Utility Bar */}
        <div className="hidden lg:block bg-brand-secondary border-b border-brand-border">
          <div className="max-w-[1440px] mx-auto px-6 xl:px-20">
            <div className="flex items-center justify-between py-1.5 text-xs text-brand-muted">
              <div className="flex items-center gap-6 font-medium">
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
              <div className="flex items-center gap-6 font-medium">
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
        <div className={`sticky top-0 z-50 transition-shadow duration-300 lg:static bg-brand-bg lg:bg-transparent ${isScrolled ? 'shadow-sm lg:shadow-none' : ''}`}>
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20">
          <div className="flex items-center justify-between h-16 lg:h-20 gap-4 relative">
            {/* Left Section */}
            <div className="flex items-center flex-1 gap-4 lg:gap-8">
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 -ml-2 text-brand-text"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>

              {/* Search Bar - Desktop */}
              <form onSubmit={handleSearch} className="hidden lg:flex w-full max-w-[200px] lg:max-w-[280px] xl:max-w-md relative">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search for furniture..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => {
                      if (searchResults.length > 0) setShowDropdown(true);
                    }}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                    className="w-full h-10 lg:h-11 pl-4 pr-12 rounded-full border border-brand-border bg-brand-bg focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-sm font-medium text-brand-text"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 lg:w-9 lg:h-9 bg-brand-primary text-brand-dark rounded-full flex items-center justify-center hover:bg-brand-dark hover:text-brand-primary transition-colors"
                    aria-label="Search"
                  >
                    <Search size={14} className="lg:w-4 lg:h-4" />
                  </button>
                </div>
                
                {/* Live Search Dropdown */}
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute top-[110%] left-0 w-full bg-white border border-brand-border rounded-xl shadow-xl overflow-hidden z-50 flex flex-col max-h-[400px]"
                    >
                      {isSearching ? (
                         <div className="p-4 text-center text-sm text-brand-muted">Searching...</div>
                      ) : searchResults.length > 0 ? (
                        <>
                          <div className="overflow-y-auto">
                            {searchResults.map((p) => (
                              <Link key={p.id} href={`/product/${p.slug}`} className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors">
                                <div className="w-12 h-12 rounded-md bg-gray-100 overflow-hidden shrink-0">
                                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-sm font-medium text-brand-text truncate">{p.name}</div>
                                  <div className="text-xs text-brand-primary font-bold">₹{p.price.toLocaleString("en-IN")}</div>
                                </div>
                              </Link>
                            ))}
                          </div>
                          <Link href={`/search?q=${encodeURIComponent(searchQuery.trim())}`} className="p-3 text-center text-xs font-semibold text-brand-primary bg-gray-50 hover:bg-gray-100 transition-colors block border-t border-brand-border">
                            View All Results
                          </Link>
                        </>
                      ) : (
                        <div className="p-4 text-center text-sm text-brand-muted">No products found</div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>

            {/* Logo - Centered Absolutely */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <Link href="/" className="flex items-center justify-center shrink-0 pointer-events-auto">
                <img src="/logo.png" alt="PremiumCrafts" className="h-10 lg:h-16 object-contain" />
              </Link>
            </div>

            {/* Right Icons */}
            <div className="flex items-center justify-end flex-1 gap-1 sm:gap-3">
              {session ? (
                <Link
                  href="/account"
                  className="hidden sm:flex flex-col items-center p-2 hover:text-brand-primary transition-colors"
                >
                  {session.user?.image ? (
                    <img src={session.user.image} alt="User" className="w-5 h-5 rounded-full object-cover mb-1" />
                  ) : (
                    <User size={22} />
                  )}
                  <span className="text-[10px] mt-0.5">Profile</span>
                </Link>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="hidden sm:flex flex-col items-center p-2 hover:text-brand-primary transition-colors"
                >
                  <User size={22} />
                  <span className="text-[10px] mt-0.5">Login</span>
                </button>
              )}
              <Link
                href="/wishlist"
                className="flex flex-col items-center p-2 hover:text-brand-primary transition-colors relative"
              >
                <Heart size={22} />
                <span className="text-[10px] mt-0.5 hidden sm:inline">Wishlist</span>
                {mounted && wishlistCount > 0 && (
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
                {mounted && cartCount > 0 && (
                  <span className="absolute -top-0.5 right-0.5 w-5 h-5 bg-brand-primary text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
        </div>
      </header>

      {/* Category Nav - Desktop */}
      <div className={`hidden lg:block border-t border-brand-border sticky top-0 z-40 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white shadow-sm"}`}>
          <div className="max-w-[1440px] mx-auto px-6 xl:px-20">
            <nav className="flex items-center gap-8">
              <Link href="/products" className="py-3.5 text-sm font-semibold uppercase tracking-wide text-brand-text border-b-2 border-transparent hover:text-brand-primary transition-colors">
                All Products
              </Link>
              {categories.slice(0, 7).map((cat) => (
                <div
                  key={cat.slug}
                  onMouseEnter={() => setActiveMegaMenu(cat.slug)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <Link
                    href={`/category/${cat.slug}`}
                    className={`flex items-center gap-1 py-3.5 text-sm font-semibold uppercase tracking-wide transition-colors border-b-2 ${activeMegaMenu === cat.slug ? 'text-brand-primary border-brand-primary' : 'text-brand-text border-transparent hover:text-brand-primary'}`}
                  >
                    {cat.name}
                    <ChevronDown size={14} className={`transition-transform ${activeMegaMenu === cat.slug ? "rotate-180" : ""}`} />
                  </Link>
                </div>
              ))}
            </nav>
          </div>
          {/* Full Width Dropdown */}
          <AnimatePresence>
            {activeMegaMenu && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 w-full bg-brand-bg/95 backdrop-blur-md shadow-2xl border-t border-brand-border/60 overflow-hidden z-50"
                onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <div className="max-w-[1440px] mx-auto px-6 xl:px-20 py-10 flex gap-8">
                  <div className="flex-1 columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-7 2xl:columns-8 gap-x-8 gap-y-4">
                    {categories.find(c => c.slug === activeMegaMenu)?.groups.map((group, i) => (
                      <div key={i} className="flex flex-col gap-1 break-inside-avoid mb-6">
                        <h4 className="text-xs font-bold text-brand-dark tracking-widest uppercase mb-2 leading-snug">{group.title}</h4>
                        {group.items.map((sub) => (
                          <Link
                            key={sub.slug}
                            href={`/products/${sub.slug}`}
                            className="text-[12px] text-brand-muted hover:text-brand-primary transition-colors py-[3px] leading-snug font-medium"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Right Side Image Banner */}
                  <div className="hidden lg:block w-[300px] shrink-0 border-l border-brand-border/40 pl-8">
                    <Link href={`/category/${activeMegaMenu}`} className="block rounded-lg overflow-hidden relative group h-full max-h-[360px] shadow-sm">
                      <img
                        src={categories.find(c => c.slug === activeMegaMenu)?.image}
                        alt={categories.find(c => c.slug === activeMegaMenu)?.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/30 to-transparent flex flex-col justify-end p-6">
                         <span className="text-white font-semibold text-lg leading-tight tracking-wide font-[family-name:var(--font-playfair)]">
                           Discover<br/>{categories.find(c => c.slug === activeMegaMenu)?.name}
                         </span>
                         <span className="inline-block mt-3 text-[10px] font-bold text-brand-primary uppercase tracking-widest group-hover:text-white transition-colors">
                           Explore Collection &rarr;
                         </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <img src="/logo.png" alt="PremiumCrafts" className="h-12 object-contain" />
                </Link>
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
                  {session ? (
                    <Link href="/account" className="flex items-center gap-2 py-2 text-sm">
                      <User size={18} />
                      My Account
                    </Link>
                  ) : (
                    <button onClick={() => { setShowLogin(true); setMobileMenuOpen(false); }} className="flex items-center gap-2 py-2 text-sm">
                      <User size={18} />
                      Login
                    </button>
                  )}
                  <Link href="/wishlist" className="flex items-center gap-2 py-2 text-sm">
                    <Heart size={18} />
                    Wishlist {mounted && `(${wishlistCount})`}
                  </Link>
                  <Link href="/cart" className="flex items-center gap-2 py-2 text-sm">
                    <ShoppingCart size={18} />
                    Cart {mounted && `(${cartCount})`}
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
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
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
            <div className="pl-4 pb-2 space-y-4">
              {category.groups.map((group, i) => (
                <div key={i}>
                  <div className="text-xs font-bold text-brand-text mb-2 uppercase tracking-wide">{group.title}</div>
                  <div className="space-y-1 pl-2">
                    {group.items.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/products/${sub.slug}`}
                        className="block py-1 text-sm text-brand-muted hover:text-brand-primary"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
