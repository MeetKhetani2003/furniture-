"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";

const categories = ["All", "Living Room", "Bedroom", "Dining", "Tips & Tricks", "Trends"];

const articles = [
  {
    title: "How to Style a Scandinavian Living Room",
    category: "Living Room",
    author: "Priya Malhotra",
    date: "Jan 10, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    excerpt: "Discover the key elements of Scandinavian design and how to incorporate them into your living space for a cozy, minimalist aesthetic.",
    featured: true,
  },
  {
    title: "Top 5 Sofa Fabrics Explained",
    category: "Tips & Tricks",
    author: "Rajesh Sharma",
    date: "Jan 5, 2025",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    excerpt: "From velvet to leather, linen to microfiber - understand the pros and cons of each fabric to make the right choice.",
    featured: false,
  },
  {
    title: "Maximise Small Bedroom Space",
    category: "Bedroom",
    author: "Ananya Gupta",
    date: "Dec 28, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
    excerpt: "Smart storage solutions and design tricks to make your compact bedroom feel spacious and luxurious.",
    featured: false,
  },
  {
    title: "2025 Interior Design Trends",
    category: "Trends",
    author: "Priya Malhotra",
    date: "Dec 20, 2024",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
    excerpt: "From biophilic design to maximalism, explore the top trends that will define interiors in the coming year.",
    featured: false,
  },
  {
    title: "The Art of Dining Room Lighting",
    category: "Dining",
    author: "Vikram Patel",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
    excerpt: "Create the perfect ambiance for every meal with our guide to pendant lights, chandeliers, and sconces.",
    featured: false,
  },
  {
    title: "Sustainable Furniture Choices",
    category: "Tips & Tricks",
    author: "Rajesh Sharma",
    date: "Dec 10, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80",
    excerpt: "How to make eco-conscious decisions when furnishing your home without compromising on style.",
    featured: false,
  },
  {
    title: "Creating a Cozy Reading Nook",
    category: "Living Room",
    author: "Ananya Gupta",
    date: "Dec 5, 2024",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    excerpt: "Everything you need to design the perfect corner for getting lost in your favorite books.",
    featured: false,
  },
  {
    title: "Indian Craftsmanship in Modern Homes",
    category: "Trends",
    author: "Priya Malhotra",
    date: "Nov 28, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    excerpt: "Celebrating the rich heritage of Indian artisanal techniques in contemporary interior design.",
    featured: false,
  },
];

export default function InspirationPage() {
  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Featured Article */}
      <div className="relative h-[450px] lg:h-[550px] overflow-hidden">
        <img
          src={articles[0].image}
          alt={articles[0].title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-text/90 via-brand-text/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20 pb-12">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-3 py-1 bg-brand-primary text-white text-xs font-bold uppercase tracking-wider rounded mb-3"
            >
              Featured
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-[family-name:var(--font-playfair)] text-3xl lg:text-5xl font-bold text-white max-w-2xl mb-3"
            >
              {articles[0].title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/80 max-w-xl mb-4"
            >
              {articles[0].excerpt}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 text-white/70 text-sm"
            >
              <span>{articles[0].author}</span>
              <span>|</span>
              <span>{articles[0].date}</span>
              <span>|</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {articles[0].readTime}</span>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20 py-12">
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                cat === "All"
                  ? "bg-brand-primary text-white"
                  : "bg-white border border-brand-border text-brand-text hover:border-brand-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(1).map((article, i) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group bg-white rounded-xl overflow-hidden border border-brand-border/50 hover:shadow-lg transition-all"
            >
              <Link href="/inspiration/scandinavian-living-room" className="block">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-medium text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded">
                      {article.category}
                    </span>
                    <span className="text-xs text-brand-muted flex items-center gap-1">
                      <Clock size={12} /> {article.readTime}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-brand-text group-hover:text-brand-primary transition-colors mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-brand-muted line-clamp-2 mb-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-brand-muted">{article.author} · {article.date}</span>
                    <span className="inline-flex items-center gap-1 text-brand-primary text-sm font-medium">
                      Read <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
