"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/common/ProductCard";
import type { Product } from "@/lib/data/products";

interface SimilarProductsProps {
  currentProductId: string;
  category: string;
}

export default function SimilarProducts({ currentProductId, category }: SimilarProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
         const allProds = data.products || [];
         const similar = allProds
           .filter((p: Product) => p.id !== currentProductId && p.category === category)
           .slice(0, 10);
           
         if (similar.length < 4) {
             const others = allProds
               .filter((p: Product) => p.id !== currentProductId && p.category !== category)
               .slice(0, 10 - similar.length);
             setProducts([...similar, ...others]);
         } else {
             setProducts(similar);
         }
         setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [currentProductId, category]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (loading) return null;
  if (products.length === 0) return null;

  return (
    <section className="mt-20 pt-16 border-t border-brand-border/40 relative group">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-brand-text">
          Similar Products
        </h2>
      </div>
      
      <div className="relative">
        <button
          onClick={scrollPrev}
          className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-brand-border/60 hover:border-brand-primary shadow-sm rounded-full flex items-center justify-center text-brand-text hover:text-brand-primary transition-all duration-300 z-10 opacity-0 group-hover:opacity-100 disabled:opacity-0"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} strokeWidth={1.5} />
        </button>
        <div className="w-full overflow-hidden px-1 py-4" ref={emblaRef}>
          <div className="flex gap-5">
            {products.map((product, i) => (
              <div key={product.id} className="flex-[0_0_260px] min-w-0">
                <ProductCard product={product} index={i} hideBadges />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={scrollNext}
          className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-brand-border/60 hover:border-brand-primary shadow-sm rounded-full flex items-center justify-center text-brand-text hover:text-brand-primary transition-all duration-300 z-10 opacity-0 group-hover:opacity-100 disabled:opacity-0"
          aria-label="Next slide"
        >
          <ChevronRight size={20} strokeWidth={1.5} />
        </button>
      </div>
    </section>
  );
}
