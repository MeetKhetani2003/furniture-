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
import { products, getBestsellers, getNewArrivals, getUnderPrice } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";
import { useCartStore } from "@/lib/stores/cartStore";
import { useWishlistStore } from "@/lib/stores/wishlistStore";
import { showToast } from "@/components/common/Toaster";
import ProductCard from "@/components/common/ProductCard";
import RatingStars from "@/components/common/RatingStars";
import PriceDisplay from "@/components/common/PriceDisplay";
import { formatPrice, formatNumber } from "@/lib/utils/formatPrice";

/* ───────────────────────────────────────────
   HERO CAROUSEL
   ─────────────────────────────────────────── */
const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80",
    tag: "NEW COLLECTION 2025",
    title: "Where Craftsmanship Meets Comfort",
    subtitle: "Discover furniture pieces handcrafted by master artisans, designed to transform your home into a sanctuary of style.",
    cta1: "Shop Collection",
    cta2: "Explore Lookbook",
    href1: "/category/furniture",
    href2: "/inspiration",
  },
  {
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80",
    tag: "SPRING REFRESH",
    title: "Breathe New Life Into Your Home",
    subtitle: "Fresh arrivals in soft furnishings, lighting, and décor to welcome the season.",
    cta1: "Shop New Arrivals",
    cta2: "View Trends",
    href1: "/products/sofas",
    href2: "/inspiration",
  },
  {
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80",
    tag: "BESTSELLERS",
    title: "Loved by 50,000+ Homes",
    subtitle: "Our most popular pieces, backed by thousands of glowing reviews and a 5-year warranty.",
    cta1: "Shop Bestsellers",
    cta2: "Read Reviews",
    href1: "/products/beds",
    href2: "/about",
  },
  {
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1600&q=80",
    tag: "DINING COLLECTION",
    title: "Gather Around Something Beautiful",
    subtitle: "Solid wood dining sets crafted to be the heart of your home for generations.",
    cta1: "Shop Dining",
    cta2: "Custom Orders",
    href1: "/category/kitchen-dining",
    href2: "/about",
  },
];

function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <section className="relative h-[70vh] lg:h-[85vh] overflow-hidden">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {heroSlides.map((slide, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0 relative h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-text/70 via-brand-text/40 to-transparent" />
              <div className="relative h-full max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20 flex items-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: selectedIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.6 }}
                  className="max-w-xl text-white"
                >
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: selectedIndex === i ? 1 : 0, y: selectedIndex === i ? 0 : 20 }}
                    transition={{ delay: 0.2 }}
                    className="text-brand-accent text-xs sm:text-sm font-bold tracking-[0.3em] uppercase mb-4"
                  >
                    {slide.tag}
                  </motion.p>
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: selectedIndex === i ? 1 : 0, y: selectedIndex === i ? 0 : 30 }}
                    transition={{ delay: 0.3 }}
                    className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: selectedIndex === i ? 1 : 0, y: selectedIndex === i ? 0 : 30 }}
                    transition={{ delay: 0.4 }}
                    className="text-white/80 text-sm sm:text-base lg:text-lg mb-8 leading-relaxed"
                  >
                    {slide.subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: selectedIndex === i ? 1 : 0, y: selectedIndex === i ? 0 : 30 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap gap-3"
                  >
                    <Link
                      href={slide.href1}
                      className="px-6 py-3 bg-brand-primary text-white font-medium rounded-lg hover:bg-brand-dark transition-colors"
                    >
                      {slide.cta1}
                    </Link>
                    <Link
                      href={slide.href2}
                      className="px-6 py-3 border-2 border-white/40 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                    >
                      {slide.cta2}
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Progress */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === selectedIndex ? "w-10 bg-brand-primary" : "w-4 bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   CATEGORY GRID
   ─────────────────────────────────────────── */
function CategoryGrid() {
  const categoryCards = [
    { name: "Living Room", slug: "sofas", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80", count: 1240, large: true },
    { name: "Bedroom", slug: "beds", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80", count: 890 },
    { name: "Dining", slug: "dining-tables", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80", count: 650 },
    { name: "Study", slug: "bookshelves", image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80", count: 420 },
    { name: "Outdoor", slug: "sofas", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80", count: 310 },
    { name: "Kids", slug: "beds", image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80", count: 280 },
    { name: "Storage", slug: "wardrobes", image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800&q=80", count: 560 },
  ];

  return (
    <section className="py-16 lg:py-24 bg-brand-bg">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20">
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-4xl font-bold text-brand-text mb-3">
            Shop by Category
          </h2>
          <div className="w-16 h-1 bg-brand-primary mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categoryCards.map((cat, i) => (
            <motion.div
              key={cat.slug + i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`group relative rounded-xl overflow-hidden cursor-pointer ${
                i === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <Link href={`/products/${cat.slug}`} className="block">
                <div className={`relative overflow-hidden ${i === 0 ? "aspect-square lg:aspect-auto lg:h-full" : "aspect-[4/3]"}`}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-text/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                    <h3 className="font-[family-name:var(--font-playfair)] text-white text-lg lg:text-xl font-bold mb-1">
                      {cat.name}
                    </h3>
                    <p className="text-white/70 text-sm mb-2">{cat.count} Products</p>
                    <span className="inline-flex items-center gap-1 text-brand-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore <ArrowRight size={14} />
                    </span>
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
   BESTSELLERS CAROUSEL
   ─────────────────────────────────────────── */
function BestsellersCarousel() {
  const bestsellers = getBestsellers();
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
            href="/category/furniture"
            className="hidden sm:flex items-center gap-1 text-brand-primary font-medium hover:underline"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 lg:gap-6">
            {bestsellers.map((product, i) => (
              <div key={product.id} className="flex-[0_0_260px] sm:flex-[0_0_280px] lg:flex-[0_0_300px]">
                <ProductCard product={product} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   TRENDING TABS
   ─────────────────────────────────────────── */
function TrendingTabs() {
  const [activeTab, setActiveTab] = useState<"trending" | "new" | "under10k">("trending");

  const tabProducts = {
    trending: products.slice(0, 8),
    new: getNewArrivals(),
    under10k: getUnderPrice(10000),
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
   NEWSLETTER
   ─────────────────────────────────────────── */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      showToast("Successfully subscribed to newsletter!", "success");
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-brand-secondary">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20">
        <div className="max-w-2xl mx-auto text-center">
          <Mail size={40} className="text-brand-primary mx-auto mb-4" />
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-4xl font-bold text-brand-text mb-3">
            Get Interior Inspiration & Exclusive Deals
          </h2>
          <p className="text-brand-muted mb-8">
            Subscribe to our newsletter for styling tips, new arrivals, and member-only discounts.
          </p>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-100 text-green-700 py-3 px-6 rounded-lg inline-block"
            >
              Thank you for subscribing! Check your inbox for a ₹500 welcome coupon.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12 px-4 rounded-lg border border-brand-border bg-white focus:outline-none focus:border-brand-primary text-sm"
              />
              <button
                type="submit"
                className="h-12 px-8 bg-brand-primary text-white font-medium rounded-lg hover:bg-brand-dark transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
          <p className="text-xs text-brand-muted mt-4">Get ₹500 off on your first order when you subscribe</p>
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
      <Newsletter />
    </div>
  );
}
