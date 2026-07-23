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
/* ───────────────────────────────────────────
   HERO SECTION
   ─────────────────────────────────────────── */
function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);


  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20 pt-6 pb-12 flex flex-col gap-6">
      {/* Top Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-4">
        {/* Main Banner / Carousel (Left) */}
        <div className="lg:col-span-2 relative rounded-lg overflow-hidden h-[400px] lg:h-[550px] shadow-sm">
          <div className="overflow-hidden h-full" ref={emblaRef}>
            <div className="flex h-full">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex-[0_0_100%] min-w-0 relative h-full">
                  <img
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80"
                    alt="Hero Banner"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute top-12 left-8 md:left-12 text-white max-w-md">
                    <div className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur rounded-full mb-6 p-2">
                      <img src="/logo.png" alt="Logo" className="w-full h-full object-contain filter invert" />
                    </div>
                    <h2 className="text-5xl lg:text-7xl font-bold tracking-tight mb-2">
                      FRESH
                    </h2>
                    <div className="flex items-baseline gap-3 mb-8">
                      <span className="text-3xl lg:text-4xl font-medium">Finds</span>
                      <span className="text-5xl lg:text-6xl font-black italic text-brand-primary">July</span>
                    </div>
                    <div className="inline-block bg-brand-primary text-white px-6 py-2.5 text-lg md:text-xl font-bold tracking-wider rounded shadow-md uppercase">
                      UPTO 50% OFF
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button onClick={scrollPrev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-brand-text hover:bg-white hover:text-brand-primary transition-colors z-10 shadow-md"><ChevronLeft size={20} /></button>
          <button onClick={scrollNext} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-brand-text hover:bg-white hover:text-brand-primary transition-colors z-10 shadow-md"><ChevronRight size={20} /></button>
        </div>

        {/* Right Banners */}
        <div className="flex flex-col gap-4 lg:gap-4 h-full">
          {/* Top Right Banner */}
          <Link href="/products/beds" className="group flex-1 relative rounded-lg overflow-hidden bg-brand-light block shadow-sm h-[200px] lg:h-auto">
            <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80" alt="Sleep" className="absolute right-0 top-0 h-full w-2/3 object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-light via-brand-light/90 to-transparent w-3/4" />
            <div className="absolute inset-0 p-6 flex flex-col justify-center w-3/4 z-10">
              <h3 className="text-2xl font-bold text-brand-text mb-2 tracking-tight">Sleep. Sink.<br/>Snooze</h3>
              <div className="text-sm font-medium text-brand-text bg-brand-primary/10 px-2 py-1 rounded inline-block w-max mt-2">Mattresses</div>
              <div className="text-xs text-brand-muted mt-3 uppercase tracking-wider font-semibold">Starting From</div>
              <div className="text-2xl font-bold text-brand-primary">₹5,599*</div>
            </div>
          </Link>

          {/* Bottom Right Banner */}
          <Link href="/products/beds" className="group flex-1 relative rounded-lg overflow-hidden bg-white block shadow-sm h-[200px] lg:h-auto flex flex-row">
            <div className="w-1/2 p-6 flex flex-col justify-center z-10 bg-white">
              <h3 className="text-xl md:text-2xl font-black text-brand-alert mb-2 leading-tight uppercase">MASSIVE<br/>PRICE DROP</h3>
              <p className="text-brand-muted text-xs font-semibold mb-3 uppercase tracking-wider bg-brand-secondary px-2 py-1 rounded inline-block w-max">Limited Deal</p>
              <div className="text-sm font-medium text-brand-text">Calmora Bed</div>
              <div className="text-xs text-brand-muted line-through mt-1">₹24,999</div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">NOW</span>
                <span className="text-xl font-bold text-brand-text">₹19,999</span>
              </div>
            </div>
            <div className="w-1/2 relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80" alt="Bed" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          </Link>
        </div>
      </div>

      <OfferStraps />
    </section>
  );
}

/* ───────────────────────────────────────────
   CATEGORY GRID
   ─────────────────────────────────────────── */
function CategoryGrid() {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Living", "Bedroom", "Dining", "Mattress", "Decor"];

  const categoriesData: Record<string, { name: string; slug: string; image: string }[]> = {
    "All": [
      { name: "SOFAS", slug: "sofas", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80" },
      { name: "BEDS", slug: "beds", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80" },
      { name: "DINING", slug: "dining-tables", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&q=80" },
      { name: "TV UNITS", slug: "tv-units", image: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?w=400&q=80" },
      { name: "COFFEE TABLES", slug: "coffee-tables", image: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=400&q=80" },
      { name: "CABINETS", slug: "cabinets", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&q=80" },
      { name: "MATTRESSES", slug: "mattresses", image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&q=80" },
      { name: "WARDROBES", slug: "wardrobes", image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=400&q=80" },
      { name: "SOFA CUM BED", slug: "sofa-cum-bed", image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&q=80" },
      { name: "BOOKSHELVES", slug: "bookshelves", image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400&q=80" },
      { name: "ALL STUDY TABLES", slug: "study-tables", image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&q=80" },
      { name: "KITCHEN CABINETS", slug: "kitchen-cabinets", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80" },
    ],
    "Living": [
      { name: "SOFA SETS", slug: "sofas", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80" },
      { name: "L SHAPE SOFA", slug: "l-shape-sofa", image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&q=80" },
      { name: "COFFEE TABLES", slug: "coffee-tables", image: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=400&q=80" },
      { name: "TV UNITS", slug: "tv-units", image: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?w=400&q=80" },
      { name: "LOUNGE CHAIRS", slug: "lounge-chairs", image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&q=80" },
      { name: "DIWAN BEDS", slug: "diwan-beds", image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&q=80" },
      { name: "SHOE RACKS", slug: "shoe-racks", image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=400&q=80" },
      { name: "CABINETS", slug: "cabinets", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&q=80" },
      { name: "RECLINERS", slug: "recliners", image: "https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=400&q=80" },
      { name: "BOOKSHELVES", slug: "bookshelves", image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400&q=80" },
      { name: "SIDE TABLES", slug: "side-tables", image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400&q=80" },
      { name: "BENCHES", slug: "benches", image: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=400&q=80" },
    ],
    "Bedroom": [
      { name: "BEDS", slug: "beds", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80" },
      { name: "WARDROBES", slug: "wardrobes", image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=400&q=80" },
      { name: "BEDSIDE TABLES", slug: "bedside-tables", image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400&q=80" },
      { name: "MATTRESSES", slug: "mattresses", image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&q=80" },
      { name: "DRESSING TABLES", slug: "dressing-tables", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&q=80" },
      { name: "CHEST OF DRAWERS", slug: "chest-of-drawers", image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400&q=80" },
    ],
    "Dining": [
      { name: "DINING TABLES", slug: "dining-tables", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&q=80" },
      { name: "DINING CHAIRS", slug: "dining-chairs", image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&q=80" },
      { name: "CROCKERY UNITS", slug: "crockery-units", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&q=80" },
      { name: "BAR CABINETS", slug: "bar-cabinets", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80" },
    ],
    "Mattress": [
      { name: "MEMORY FOAM", slug: "memory-foam", image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&q=80" },
      { name: "ORTHOPEDIC", slug: "orthopedic", image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&q=80" },
      { name: "SPRING", slug: "spring", image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&q=80" },
    ],
    "Decor": [
      { name: "WALL ART", slug: "wall-art", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80" },
      { name: "RUGS", slug: "rugs", image: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?w=400&q=80" },
      { name: "LIGHTING", slug: "lighting", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&q=80" },
      { name: "PLANTERS", slug: "planters", image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80" },
    ]
  };

  const currentCategories = categoriesData[activeTab] || categoriesData["All"];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full border transition-colors text-sm ${
                activeTab === tab
                  ? "border-brand-primary text-brand-primary"
                  : "border-brand-border text-brand-text hover:border-brand-primary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
          >
            {currentCategories.map((cat, i) => (
              <div key={cat.slug + i} className="group text-center">
                <Link href={`/category/${cat.slug}`} className="block">
                  <div className="rounded-lg overflow-hidden mb-3 aspect-[4/3]">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-[11px] sm:text-xs font-semibold text-brand-text group-hover:text-brand-primary transition-colors uppercase tracking-wider">
                    {cat.name}
                  </h3>
                </Link>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
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

  const [emblaRef] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  return (
    <section className="py-16 lg:py-24 bg-brand-secondary/30">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-4xl font-bold text-brand-text mb-2">
              Bestsellers
            </h2>
            <p className="text-brand-muted">Our most loved pieces by customers across India</p>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-1 text-brand-primary font-medium hover:underline"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>
        {loading ? (
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 lg:gap-6">
              {bestsellers.map((product, i) => (
                <div key={product.id} className="flex-[0_0_260px] sm:flex-[0_0_280px] lg:flex-[0_0_300px]">
                  <ProductCard product={product} index={i} />
                </div>
              ))}
            </div>
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
    <section className="py-16 lg:py-24 bg-brand-bg">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20">
        <div className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-4xl font-bold text-brand-text mb-6">
            Curated For You
          </h2>
          <div className="inline-flex bg-brand-secondary rounded-lg p-1">
            {(["trending", "new", "under10k"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-white text-brand-primary shadow-sm"
                    : "text-brand-muted hover:text-brand-text"
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
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
    <section className="bg-brand-dark text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-8 items-center py-12 lg:py-16">
          <div>
            <span className="text-brand-accent text-sm font-bold tracking-wider uppercase mb-3 block">
              Limited Time Offer
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-5xl font-bold mb-4 leading-tight">
              Get ₹2,000 Off on Orders Above ₹20,000
            </h2>
            <p className="text-white/70 mb-8 text-lg">
              Use code <span className="font-mono bg-white/10 px-2 py-1 rounded text-brand-accent">PREMIUM2K</span> at checkout. Valid on all furniture & décor.
            </p>
            <div className="flex gap-4 mb-8">
              {[
                { value: timeLeft.days, label: "Days" },
                { value: timeLeft.hours, label: "Hours" },
                { value: timeLeft.minutes, label: "Mins" },
                { value: timeLeft.seconds, label: "Secs" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center text-2xl font-bold mb-1">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <span className="text-xs text-white/60">{item.label}</span>
                </div>
              ))}
            </div>
            <Link
              href="/category/furniture"
              className="inline-block px-8 py-3.5 bg-brand-primary text-white font-medium rounded-lg hover:bg-brand-accent transition-colors"
            >
              Claim Offer
            </Link>
          </div>
          <div className="hidden lg:block relative">
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80"
              alt="Offer"
              className="rounded-2xl w-full h-[450px] object-cover"
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
    <section className="py-16 lg:py-24 bg-brand-bg">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20">
        <div className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-4xl font-bold text-brand-text mb-2">
            Shop the Look
          </h2>
          <p className="text-brand-muted">Get inspired by our curated room designs</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {looks.map((look, i) => (
            <motion.div
              key={look.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-xl overflow-hidden cursor-pointer"
            >
              <Link href="/inspiration" className="block">
                <div className="aspect-[3/4] relative">
                  <img
                    src={look.image}
                    alt={look.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-text/80 via-brand-text/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-[family-name:var(--font-playfair)] text-white text-lg font-bold mb-1">
                      {look.name}
                    </h3>
                    <p className="text-white/70 text-sm">{look.products} Products</p>
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
    <section className="py-12 bg-brand-secondary/30 border-y border-brand-border/50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {props.map((prop, i) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0">
                <prop.icon size={22} className="text-brand-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-brand-text text-sm lg:text-base">{prop.title}</h4>
                <p className="text-brand-muted text-xs lg:text-sm mt-0.5">{prop.desc}</p>
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
    <section className="py-16 lg:py-24 bg-brand-bg">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20">
        <div className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-4xl font-bold text-brand-text mb-2">
            What Our Customers Say
          </h2>
          <p className="text-brand-muted">Real reviews from real homes</p>
        </div>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 lg:gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex-[0_0_320px] sm:flex-[0_0_380px] lg:flex-[0_0_420px] bg-white rounded-xl p-6 border border-brand-border/50"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={14} className={s < t.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"} />
                  ))}
                </div>
                <p className="text-brand-text text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center justify-between pt-4 border-t border-brand-border/50">
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-brand-muted">{t.city}</p>
                  </div>
                  <span className="text-[11px] text-brand-primary bg-brand-primary/10 px-2 py-1 rounded">
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
    <section className="py-16 lg:py-24 bg-brand-secondary/30">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-4xl font-bold text-brand-text mb-2">
              Inspiration & Ideas
            </h2>
            <p className="text-brand-muted">Tips, trends, and styling advice from our experts</p>
          </div>
          <Link href="/inspiration" className="hidden sm:flex items-center gap-1 text-brand-primary font-medium hover:underline">
            View All <ArrowRight size={16} />
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
              className="group bg-white rounded-xl overflow-hidden border border-brand-border/50 hover:shadow-lg transition-all"
            >
              <Link href="/inspiration" className="block">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-medium text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded">
                      {post.category}
                    </span>
                    <span className="text-xs text-brand-muted flex items-center gap-1">
                      <Clock size={12} /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-brand-text group-hover:text-brand-primary transition-colors">
                    {post.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-brand-primary text-sm font-medium mt-3">
                    Read More <ArrowRight size={14} />
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
    <section className="py-16 bg-brand-dark text-white" ref={statsRef}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20">
        <div className="text-center mb-10">
          <p className="text-brand-accent text-sm font-bold tracking-wider uppercase mb-2">Trusted Across India</p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-4xl font-bold">
            Numbers That Speak
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-bold text-brand-accent mb-2">
                {isInView ? formatNumber(stat.value) : "0"}{stat.suffix}
              </div>
              <p className="text-white/70 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 pt-10 border-t border-white/10">
          <p className="text-center text-white/50 text-sm mb-6">As Seen In</p>
          <div className="flex items-center justify-center gap-8 lg:gap-16 flex-wrap opacity-50">
            {["Architectural Digest", "Better Homes", "Elle Decor", "Good Housekeeping", "Vogue Living"].map((name) => (
              <span key={name} className="text-sm font-semibold tracking-wide">{name}</span>
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
    <div>
      <HeroCarousel />
      <CategoryGrid />
      <BestsellersCarousel />
      <TrendingTabs />
      <OfferBanner />
      <ShopTheLook />
      <ValueProps />
      <Testimonials />
      <BlogTeaser />
      <BrandTrust />
    </div>
  );
}
