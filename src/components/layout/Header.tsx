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
import UtilityBar from "./UtilityBar";
import MegaMenu from "./MegaMenu";
import LoginModal from "@/components/auth/LoginModal";
import PredictiveSearchModal from "./PredictiveSearchModal";

const MAIN_NAV = [
  { name: "NEW", slug: "new-arrivals" },
  { name: "LIVING", slug: "living-room" },
  { name: "BEDROOM", slug: "bedroom" },
  { name: "DINING", slug: "dining" },
  { name: "OUTDOOR", slug: "outdoor" },
  { name: "OFFICE", slug: "office" },
  { name: "LIGHTING", slug: "lighting" },
  { name: "DÉCOR", slug: "decor" },
  { name: "COLLECTIONS", slug: "collections" },
  { name: "SALE", slug: "sale" },
];

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showPredictiveSearch, setShowPredictiveSearch] = useState(false);
  const { data: session, status } = useSession();
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
    setShowPredictiveSearch(false);
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



  return (
    <>
      <UtilityBar />
      <header className="relative z-50 bg-brand-bg">
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

              {/* Mobile Search Button */}
              <button
                className="lg:hidden p-2 text-brand-text hover:text-brand-primary transition-colors"
                onClick={() => setShowPredictiveSearch(true)}
                aria-label="Search"
              >
                <Search size={22} />
              </button>
            </div>

            {/* Logo - Centered Absolutely */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <Link href="/" className="flex items-center justify-center shrink-0 pointer-events-auto">
                <img src="/logo.png" alt="PremiumCrafts" className="h-10 lg:h-16 object-contain" />
              </Link>
            </div>

            {/* Right Icons */}
            <div className="flex items-center justify-end flex-1 gap-1 sm:gap-3">
              <button
                onClick={() => setShowPredictiveSearch(true)}
                className="hidden lg:flex flex-col items-center p-2 hover:text-brand-primary transition-colors"
                aria-label="Search"
              >
                <Search size={22} />
                <span className="text-[10px] mt-0.5">Search</span>
              </button>
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
              {MAIN_NAV.map((item) => (
                <div
                  key={item.slug}
                  onMouseEnter={() => setActiveMegaMenu(item.slug)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <Link
                    href={`/${item.slug}`}
                    className={`flex items-center gap-1 py-3.5 text-[11px] font-bold tracking-widest transition-colors border-b-2 ${activeMegaMenu === item.slug ? 'text-brand-primary border-brand-primary' : 'text-brand-text border-transparent hover:text-brand-primary'}`}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </nav>
          </div>
          {/* Full Width Dropdown */}
          <MegaMenu activeItem={activeMegaMenu} setActiveItem={setActiveMegaMenu} />
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
                <button 
                  onClick={() => { setShowPredictiveSearch(true); setMobileMenuOpen(false); }}
                  className="w-full h-10 px-4 rounded-lg border border-brand-border bg-brand-bg flex items-center justify-between text-brand-muted text-sm mb-4"
                >
                  <span>Search...</span>
                  <Search size={18} />
                </button>
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
      <PredictiveSearchModal isOpen={showPredictiveSearch} onClose={() => setShowPredictiveSearch(false)} />
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
