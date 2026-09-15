"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Truck,
  RotateCcw,
  CreditCard,
  Shield,
  Star,
  Clock,
  Heart,
  ShoppingCart,
  Mail,
  MapPin,
  Play,
  Boxes,
  ShieldCheck,
} from "lucide-react";
import { Product } from "@/lib/data/products"; // Using type only
import { categories } from "@/lib/data/categories";
import { useCartStore } from "@/lib/stores/cartStore";
import { useWishlistStore } from "@/lib/stores/wishlistStore";
import { showToast } from "@/components/common/Toaster";
import ProductCard from "@/components/common/ProductCard";
import RatingStars from "@/components/common/RatingStars";
import PriceDisplay from "@/components/common/PriceDisplay";
import { formatPrice, formatNumber } from "@/lib/utils/formatPrice";
import OfferStraps from "@/components/home/OfferStraps";
import ShopByRoom from "@/components/home/ShopByRoom";
import PromoSplit from "@/components/home/PromoSplit";
import CraftsmanshipSection from "@/components/home/CraftsmanshipSection";
import CustomizationAndDesign from "@/components/home/CustomizationAndDesign";
import TradeProgramBanner from "@/components/home/TradeProgramBanner";
import RealHomesAndReviews from "@/components/home/RealHomesAndReviews";
import InspirationAndNewsletter from "@/components/home/InspirationAndNewsletter";

/* ───────────────────────────────────────────
   HERO SECTION — Full-width immersive carousel
   ─────────────────────────────────────────── */
const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1800&q=90",
    tag: "NEW COLLECTION 2025",
    headline: ["Timeless Craft.", "Modern Living."],
    accentWord: "",
    subtitle: "Thoughtfully designed furniture, handcrafted in Jodhpur for homes around the world.",
    cta1: "SHOP NEW COLLECTION",
    cta1Link: "/products",
    cta2: "EXPLORE THE LOOK",
    cta2Link: "/collections/lookbook",
    align: "left",
  },
  {
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1800&q=90",
    tag: "Living Room Essentials",
    headline: ["Elevate Your", "Living Space"],
    accentWord: "Living Space",
    subtitle: "Plush sofas, statement chairs, and curated accents that transform any room into a conversation piece.",
    cta: "Explore Sofas",
    ctaLink: "/products/sofas",
    align: "center",
  },
  {
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1800&q=90",
    tag: "Bedroom Sanctuary",
    headline: ["Sleep In", "Pure Luxury"],
    accentWord: "Pure Luxury",
    subtitle: "Premium beds and mattresses engineered for the deepest, most restorative sleep of your life.",
    cta: "Shop Bedroom",
    ctaLink: "/products/beds",
    align: "right",
  },
  {
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1800&q=90",
    tag: "Dining Excellence",
    headline: ["Gather Around", "Perfection"],
    accentWord: "Perfection",
    subtitle: "Elegant dining tables and chairs crafted to make every meal feel like a celebration.",
    cta: "Discover Dining",
    ctaLink: "/products/dining-tables",
    align: "left",
  },
];

function HeroCarousel() {
  const AUTOPLAY_DELAY = 5500;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  // Progress bar animation
  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / AUTOPLAY_DELAY) * 100, 100);
      setProgress(pct);
      if (pct >= 100) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [selectedIndex]);

  return (
    <section className="w-full flex flex-col">
      {/* ── Carousel ── */}
      <div className="relative w-full overflow-hidden h-[520px] sm:h-[620px] lg:h-[760px]" ref={emblaRef}>
        <div className="flex h-full">
          {heroSlides.map((slide, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0 relative h-full">
              {/* Background image */}
              <img
                src={slide.image}
                alt={slide.headline.join(" ")}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className={`absolute inset-0 ${
                slide.align === "right"
                  ? "bg-gradient-to-l from-black/80 via-black/40 to-transparent"
                  : slide.align === "center"
                  ? "bg-gradient-to-t from-black/80 via-black/30 to-black/10"
                  : "bg-gradient-to-r from-black/85 via-black/40 to-transparent"
              }`} />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end pb-20 sm:pb-28 w-full">
                <div className={`max-w-[1470px] mx-auto w-full px-8 sm:px-16 xl:px-28 flex flex-col ${
                  slide.align === "right" ? "items-end text-right" : slide.align === "center" ? "items-center text-center" : "items-start text-left"
                }`}>
                <AnimatePresence mode="wait">
                  {selectedIndex === i && (
                    <motion.div
                      key={`slide-content-${i}`}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="max-w-xl"
                    >
                      {/* Tag */}
                      <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15, duration: 0.5 }}
                        className="inline-block text-xs font-bold tracking-widest text-brand-primary mb-4"
                      >
                        {slide.tag}
                      </motion.span>

                      <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.6 }}
                        className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight text-white leading-[1.1] mb-5 font-[family-name:var(--font-heading)]"
                      >
                        {slide.headline.map((line, li) => (
                          <span key={li} className="block">
                            {line === slide.accentWord
                              ? <span className="font-semibold text-brand-accent italic">{line}</span>
                              : line}
                          </span>
                        ))}
                      </motion.h1>

                      {/* Subtitle */}
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="text-white/75 text-sm sm:text-base leading-relaxed mb-8 font-[family-name:var(--font-inter)] max-w-sm"
                      >
                        {slide.subtitle}
                      </motion.p>

                      {/* CTA */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55, duration: 0.4 }}
                        className="flex flex-wrap items-center gap-4"
                      >
                        <Link
                          href={slide.cta1Link || (slide as any).ctaLink || "/products"}
                          className="bg-[#c4a66a] hover:bg-[#b59556] text-white px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest rounded-none transition-colors"
                        >
                          {slide.cta1 || (slide as any).cta}
                        </Link>
                        {slide.cta2 && (
                          <Link
                            href={slide.cta2Link || "/products"}
                            className="bg-transparent border border-white hover:bg-white/10 text-white px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest rounded-none transition-colors"
                          >
                            {slide.cta2}
                          </Link>
                        )}
                        {!slide.cta2 && (
                          <Link
                            href="/products"
                            className="text-white/70 hover:text-white text-xs font-semibold uppercase tracking-widest border-b border-white/30 hover:border-white pb-0.5 transition-all"
                          >
                            View All
                          </Link>
                        )}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={scrollPrev}
          aria-label="Previous slide"
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 rounded-full flex items-center justify-center text-white transition-all duration-300 z-10 hover:scale-110 shadow-xl"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={scrollNext}
          aria-label="Next slide"
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 rounded-full flex items-center justify-center text-white transition-all duration-300 z-10 hover:scale-110 shadow-xl"
        >
          <ChevronRight size={22} />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-400 rounded-full border border-white w-2.5 h-2.5 ${
                selectedIndex === i
                  ? "bg-white"
                  : "bg-transparent hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-10">
          <div
            className="h-full bg-brand-primary transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* ── Feature Trust Bar below carousel ── */}
      <div className="w-full bg-white border-b border-brand-border/50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-12 py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-brand-border/40">
            <div className="flex items-start gap-4 md:px-4 pt-4 md:pt-0">
              <Truck size={24} strokeWidth={1.2} className="text-[#c4a66a] shrink-0 mt-1" />
              <div>
                <h4 className="text-[13px] font-bold text-brand-text mb-1">Worldwide Delivery</h4>
                <p className="text-[11px] text-brand-muted leading-relaxed">Safe, reliable & on-time delivery worldwide.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 md:px-4 pt-4 md:pt-0">
              <Boxes size={24} strokeWidth={1.2} className="text-[#c4a66a] shrink-0 mt-1" />
              <div>
                <h4 className="text-[13px] font-bold text-brand-text mb-1">Premium Quality</h4>
                <p className="text-[11px] text-brand-muted leading-relaxed">Carefully selected materials & expert craftsmanship.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 md:px-4 pt-4 md:pt-0">
              <RotateCcw size={24} strokeWidth={1.2} className="text-[#c4a66a] shrink-0 mt-1" />
              <div>
                <h4 className="text-[13px] font-bold text-brand-text mb-1">Easy Returns</h4>
                <p className="text-[11px] text-brand-muted leading-relaxed">30-day easy returns on eligible items.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 md:px-4 pt-4 md:pt-0">
              <CreditCard size={24} strokeWidth={1.2} className="text-[#c4a66a] shrink-0 mt-1" />
              <div>
                <h4 className="text-[13px] font-bold text-brand-text mb-1">Secure Payments</h4>
                <p className="text-[11px] text-brand-muted leading-relaxed">100% secure checkout with trusted partners.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 md:px-4 pt-4 md:pt-0">
              <ShieldCheck size={24} strokeWidth={1.2} className="text-[#c4a66a] shrink-0 mt-1" />
              <div>
                <h4 className="text-[13px] font-bold text-brand-text mb-1">Furniture Warranty</h4>
                <p className="text-[11px] text-brand-muted leading-relaxed">Upto 10 years warranty on select furniture.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   CATEGORY GRID
   ─────────────────────────────────────────── */
function CategoryGrid() {
  const categories = [
    { name: "Sofas & Sectionals", slug: "sofas", icon: "sofa" },
    { name: "Chairs", slug: "chairs", icon: "armchair" },
    { name: "Beds", slug: "beds", icon: "bed" },
    { name: "Dining Tables", slug: "dining-tables", icon: "dining-table" },
    { name: "Coffee Tables", slug: "coffee-tables", icon: "coffee-table" },
    { name: "Storage", slug: "storage", icon: "storage" },
    { name: "Lighting", slug: "lighting", icon: "lighting" },
    { name: "Rugs", slug: "rugs", icon: "rug" },
    { name: "Decor & Accents", slug: "decor", icon: "decor" },
  ];

  const renderIcon = (type: string) => {
    switch (type) {
      case "sofa":
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/>
            <path d="M2 14v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
            <path d="M2 16h20"/>
            <path d="M12 12v8"/>
          </svg>
        );
      case "armchair":
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/>
            <path d="M3 14v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"/>
            <path d="M3 16h18"/>
            <path d="M7 20v2"/>
            <path d="M17 20v2"/>
          </svg>
        );
      case "bed":
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4v16"/>
            <path d="M20 4v16"/>
            <path d="M4 11h16"/>
            <path d="M4 15h16"/>
            <path d="M6 8h4v3H6z"/>
            <path d="M14 8h4v3h-4z"/>
          </svg>
        );
      case "dining-table":
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 10h18"/>
            <path d="M5 10v9"/>
            <path d="M19 10v9"/>
            <path d="M4 10L6 5h12l2 5"/>
          </svg>
        );
      case "coffee-table":
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 9h20"/>
            <path d="M4 9v6"/>
            <path d="M20 9v6"/>
            <path d="M3 9l1-3h16l1 3"/>
            <path d="M8 15h8"/>
          </svg>
        );
      case "storage":
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="4" width="14" height="16" rx="1"/>
            <path d="M5 10h14"/>
            <path d="M5 15h14"/>
            <circle cx="12" cy="7" r="0.5"/>
            <circle cx="12" cy="12.5" r="0.5"/>
            <circle cx="12" cy="17.5" r="0.5"/>
          </svg>
        );
      case "lighting":
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v6"/>
            <path d="M8 8h8l2 6H6l2-6z"/>
            <path d="M10 14v2a2 2 0 0 0 4 0v-2"/>
          </svg>
        );
      case "rug":
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="6" width="16" height="12" rx="1"/>
            <path d="M4 6l16 12"/>
            <path d="M20 6L4 18"/>
          </svg>
        );
      case "decor":
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 2h8"/>
            <path d="M10 2v4"/>
            <path d="M14 2v4"/>
            <path d="M7 6c-2 4-3 6-3 10a8 8 0 0 0 16 0c0-4-1-6-3-10H7z"/>
            <path d="M12 10v4"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-16 bg-brand-bg border-b border-brand-border/30">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-12">
        <div className="flex items-center justify-between mb-10 pb-4 border-b border-brand-border/40">
          <h2 className="text-sm lg:text-[15px] font-bold uppercase tracking-widest text-brand-text font-[family-name:var(--font-inter)]">
            Shop By Category
          </h2>
          <Link href="/categories" className="text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.15em] text-[#c4a66a] hover:text-[#a38a58] transition-colors flex items-center gap-1.5">
            View All Categories &rarr;
          </Link>
        </div>
        
        <div className="flex justify-between items-end overflow-x-auto pb-6 hide-scrollbar gap-8 lg:gap-4">
          {categories.map((cat, i) => (
            <Link 
              key={cat.slug} 
              href={`/category/${cat.slug}`} 
              className="flex flex-col items-center gap-4 group min-w-[80px]"
            >
              <div className="text-brand-text group-hover:text-[#c4a66a] transition-colors duration-300">
                {renderIcon(cat.icon)}
              </div>
              <h3 className="text-[10px] sm:text-[11px] font-semibold text-brand-text group-hover:text-[#c4a66a] transition-colors whitespace-nowrap font-[family-name:var(--font-inter)]">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   BESTSELLERS CAROUSEL
   ─────────────────────────────────────────── */
function BestsellersCarousel() {
  const [bestsellers, setBestsellers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
         const prods = data.products || [];
         setBestsellers(prods.filter((p: Product) => p.isBestseller).slice(0, 10));
         setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="py-16 lg:py-20 bg-white border-b border-brand-border/30 relative group">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-12">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-brand-border/40">
          <h2 className="text-sm lg:text-[15px] font-bold uppercase tracking-widest text-brand-text font-[family-name:var(--font-inter)]">
            Our Bestsellers
          </h2>
          <Link
            href="/products?sort=bestselling"
            className="text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.15em] text-[#c4a66a] hover:text-[#a38a58] transition-colors flex items-center gap-1.5"
          >
            View All Bestsellers &rarr;
          </Link>
        </div>
        {loading ? (
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 md:-translate-x-4 md:w-10 md:h-10 bg-white border border-brand-border/60 hover:border-brand-primary shadow-sm rounded-full flex items-center justify-center text-brand-text hover:text-brand-primary transition-all duration-300 z-10 opacity-0 group-hover:opacity-100 disabled:opacity-0"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <div className="w-full overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4 sm:gap-5">
                {bestsellers.map((product, i) => (
                  <div key={product.id} className="flex-[0_0_75vw] min-w-0 sm:flex-[0_0_240px] lg:flex-[0_0_260px]">
                    <ProductCard product={product} index={i} hideBadges />
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-8 h-8 md:translate-x-4 md:w-10 md:h-10 bg-white border border-brand-border/60 hover:border-brand-primary shadow-sm rounded-full flex items-center justify-center text-brand-text hover:text-brand-primary transition-all duration-300 z-10 opacity-0 group-hover:opacity-100 disabled:opacity-0"
              aria-label="Next slide"
            >
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   TRENDING TABS
   ─────────────────────────────────────────── */
function TrendingTabs() {
  const [activeTab, setActiveTab] = useState<"trending" | "new" | "under10k">("trending");
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
         setDbProducts(data.products || []);
         setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const tabProducts = {
    trending: dbProducts.slice(0, 8),
    new: dbProducts.filter(p => p.isNew).slice(0, 8),
    under10k: dbProducts.filter(p => p.price < 10000).slice(0, 8),
  };

  return (
    <section className="py-20 lg:py-28 bg-brand-bg">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20">
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-light text-brand-text mb-6">
            Curated <span className="font-semibold text-brand-primary">Collections</span>
          </h2>
          <div className="flex justify-center border-b border-brand-border/60 gap-6 md:gap-10">
            {(["trending", "new", "under10k"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-3.5 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all border-b-2 -mb-[2px] ${
                  activeTab === tab
                    ? "border-brand-primary text-brand-primary font-black"
                    : "border-transparent text-brand-muted hover:text-brand-text"
                }`}
              >
                {tab === "trending" && "Trending Now"}
                {tab === "new" && "New Arrivals"}
                {tab === "under10k" && "Under ₹10,000"}
              </button>
            ))}
          </div>
        </div>
        {loading ? (
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            >
              {tabProducts[activeTab].map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   OFFER BANNER
   ─────────────────────────────────────────── */
function OfferBanner() {
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-brand-dark text-white border-y border-brand-border/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-24">
          <div>
            <span className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-4 block font-[family-name:var(--font-inter)]">
              Limited Time Invitation
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-light mb-4 leading-tight">
              Enjoy <span className="font-semibold text-brand-accent">₹2,000 Off</span> on Select Pieces
            </h2>
            <p className="text-white/60 mb-8 text-sm md:text-base font-medium tracking-wide">
              Use code <span className="font-mono bg-white/10 px-3 py-1.5 rounded text-brand-accent border border-white/5">PREMIUM2K</span> at checkout.
            </p>
            <div className="flex gap-4 mb-10">
              {[
                { value: timeLeft.days, label: "Days" },
                { value: timeLeft.hours, label: "Hours" },
                { value: timeLeft.minutes, label: "Mins" },
                { value: timeLeft.seconds, label: "Secs" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-2xl font-bold mb-2 font-[family-name:var(--font-heading)] text-brand-accent">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{item.label}</span>
                </div>
              ))}
            </div>
            <Link
              href="/category/furniture"
              className="inline-block px-8 py-3.5 bg-brand-primary hover:bg-brand-accent text-brand-dark text-xs font-bold uppercase tracking-widest rounded-lg transition-colors duration-300 shadow-lg"
            >
              Claim Invitation &rarr;
            </Link>
          </div>
          <div className="hidden lg:block relative">
            <div className="absolute inset-0 border border-brand-primary/20 rounded-3xl -m-3 pointer-events-none" />
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80"
              alt="Offer"
              className="rounded-3xl w-full h-[450px] object-cover shadow-2xl relative z-10 border border-white/10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   SHOP THE LOOK
   ─────────────────────────────────────────── */
function ShopTheLook() {
  const looks = [
    { name: "Scandinavian Living Room", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80", products: 8 },
    { name: "Modern Minimalist Bedroom", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80", products: 6 },
    { name: "Bohemian Dining Space", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80", products: 5 },
    { name: "Industrial Home Office", image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80", products: 7 },
  ];

  return (
    <section className="py-20 lg:py-28 bg-brand-bg">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20">
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-light text-brand-text mb-3">
            Shop the <span className="font-semibold text-brand-primary">Look</span>
          </h2>
          <p className="text-brand-muted text-xs md:text-sm font-medium tracking-wide">Get inspired by curated designs from our interior decorators</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {looks.map((look, i) => (
            <motion.div
              key={look.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer border border-brand-border/40 hover:border-brand-primary/40 hover:shadow-lg transition-all duration-300"
            >
              <Link href="/inspiration" className="block">
                <div className="aspect-[3/4] relative">
                  <img
                    src={look.image}
                    alt={look.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-[family-name:var(--font-heading)] text-white text-base md:text-lg font-bold mb-1">
                      {look.name}
                    </h3>
                    <p className="text-brand-primary text-xs font-bold uppercase tracking-widest">{look.products} Products &rarr;</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   VALUE PROPOSITIONS
   ─────────────────────────────────────────── */
function ValueProps() {
  const props = [
    { icon: Truck, title: "Free Delivery", desc: "On orders above ₹10,000 across India" },
    { icon: RotateCcw, title: "30-Day Returns", desc: "Hassle-free returns with full refund" },
    { icon: CreditCard, title: "Easy EMI", desc: "Starting at just ₹999 per month" },
    { icon: Shield, title: "5-Year Warranty", desc: "On all furniture purchases" },
  ];

  return (
    <section className="py-16 bg-brand-secondary border-y border-brand-border/50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {props.map((prop, i) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-dark flex items-center justify-center shrink-0 border border-brand-primary/20 shadow-sm">
                <prop.icon size={20} className="text-brand-primary" />
              </div>
              <div>
                <h4 className="font-bold text-brand-text text-sm lg:text-base tracking-wide">{prop.title}</h4>
                <p className="text-brand-muted text-xs lg:text-sm mt-1 leading-relaxed font-medium">{prop.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   TESTIMONIALS
   ─────────────────────────────────────────── */
function Testimonials() {
  const testimonials = [
    { name: "Priya Sharma", city: "Mumbai", rating: 5, text: "Absolutely love my new Chesterfield sofa! The quality exceeded my expectations and the delivery was seamless. Will definitely shop again.", product: "Chesterfield Velvet 3-Seater Sofa" },
    { name: "Rahul Verma", city: "Bangalore", rating: 5, text: "The dining set is stunning. Solid wood, beautiful finish, and the chairs are so comfortable. Our dinner parties have leveled up!", product: "Royal Oak 6-Seater Dining Set" },
    { name: "Ananya Patel", city: "Delhi", rating: 4, text: "Great value for money. The hydraulic storage bed has solved all my storage problems. Assembly was quick and the team was professional.", product: "King Size Hydraulic Storage Bed" },
    { name: "Karthik Iyer", city: "Chennai", rating: 5, text: "The memory foam mattress is a game changer. I wake up without any back pain. The 100-night trial gave me the confidence to buy.", product: "Orthopedic Memory Foam Mattress" },
  ];

  const [emblaRef] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });

  return (
    <section className="py-20 lg:py-28 bg-brand-bg">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20">
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-light text-brand-text mb-3">
            Real Reviews, <span className="font-semibold text-brand-primary">Real Homes</span>
          </h2>
          <p className="text-brand-muted text-xs md:text-sm font-medium tracking-wide">Client reflections on their PremiumCrafts collections</p>
        </div>
        <div className="w-full overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 sm:gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex-[0_0_85vw] min-w-0 sm:flex-[0_0_380px] lg:flex-[0_0_420px] bg-brand-secondary/40 rounded-2xl p-8 border border-brand-border/60 shadow-sm"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={13} className={s < t.rating ? "text-brand-primary fill-brand-primary" : "text-gray-300"} />
                  ))}
                </div>
                <p className="text-brand-text text-sm leading-relaxed mb-6 font-medium italic font-[family-name:var(--font-heading)]">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center justify-between pt-4 border-t border-brand-border/40">
                  <div>
                    <p className="font-bold text-sm tracking-wide">{t.name}</p>
                    <p className="text-[10px] text-brand-muted uppercase tracking-widest font-semibold mt-0.5">{t.city}</p>
                  </div>
                  <span className="text-[10px] text-brand-primary font-bold uppercase tracking-widest bg-brand-primary/10 px-2.5 py-1 rounded-md font-[family-name:var(--font-inter)]">
                    {t.product}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   BLOG TEASERS
   ─────────────────────────────────────────── */
function BlogTeaser() {
  const posts = [
    { title: "How to Style a Scandinavian Living Room", category: "Tips & Tricks", readTime: "5 min read", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80" },
    { title: "Top 5 Sofa Fabrics Explained", category: "Buying Guide", readTime: "4 min read", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80" },
    { title: "Maximise Small Bedroom Space", category: "Small Spaces", readTime: "6 min read", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80" },
  ];

  return (
    <section className="py-20 lg:py-28 bg-brand-secondary">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-light text-brand-text mb-3">
              Inspiration & <span className="font-semibold text-brand-primary">Ideas</span>
            </h2>
            <p className="text-brand-muted text-xs md:text-sm font-medium tracking-wide">Decor advice and design trend guides from our editors</p>
          </div>
          <Link href="/inspiration" className="hidden sm:flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-primary hover:text-brand-dark transition-colors">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-brand-bg rounded-2xl overflow-hidden border border-brand-border/60 hover:border-brand-primary/40 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
            >
              <Link href="/inspiration" className="block flex-grow">
                <div className="aspect-[16/10] overflow-hidden bg-brand-secondary">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[9px] font-bold text-brand-primary uppercase tracking-widest bg-brand-primary/10 px-2 py-0.5 rounded font-[family-name:var(--font-inter)]">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-brand-muted font-semibold flex items-center gap-1">
                      <Clock size={11} /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-brand-text group-hover:text-brand-primary transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-brand-primary text-xs font-bold uppercase tracking-widest mt-4">
                    Read More &rarr;
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   BRAND TRUST / STATS
   ─────────────────────────────────────────── */
function BrandTrust() {
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, margin: "-100px" });
  const stats = [
    { value: 50000, suffix: "+", label: "Happy Customers" },
    { value: 200000, suffix: "+", label: "Products Delivered" },
    { value: 23, suffix: "", label: "States Covered" },
    { value: 15, suffix: "+", label: "Years of Trust" },
  ];

  return (
    <section className="py-20 lg:py-28 bg-brand-dark text-white border-t border-brand-border/10" ref={statsRef}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20">
        <div className="text-center mb-14">
          <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-3 font-[family-name:var(--font-inter)]">Trusted Across India</p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-light">
            Crafting Homes <span className="font-semibold text-brand-accent">In Numbers</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-bold text-brand-primary mb-3 font-[family-name:var(--font-heading)]">
                {isInView ? formatNumber(stat.value) : "0"}{stat.suffix}
              </div>
              <p className="text-white/50 text-[10px] md:text-xs font-bold uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-16 pt-12 border-t border-white/5">
          <p className="text-center text-white/40 text-[10px] font-bold uppercase tracking-widest mb-8">As Featured In</p>
          <div className="flex items-center justify-center gap-8 lg:gap-20 flex-wrap opacity-40">
            {["Architectural Digest", "Better Homes", "Elle Decor", "Good Housekeeping", "Vogue Living"].map((name) => (
              <span key={name} className="text-xs font-bold uppercase tracking-widest font-[family-name:var(--font-heading)]">{name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   HOME PAGE
   ─────────────────────────────────────────── */
export default function HomePage() {
  return (
    <main className="w-full flex flex-col overflow-x-hidden">
      <HeroCarousel />
      <ShopByRoom />
      <BestsellersCarousel />
      <PromoSplit />
      <CraftsmanshipSection />
      <CustomizationAndDesign />
      <TradeProgramBanner />
      <RealHomesAndReviews />
      <InspirationAndNewsletter />
    </main>
  );
}
