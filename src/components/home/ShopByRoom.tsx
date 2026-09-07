"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ShopByRoom() {
  const rooms = [
    { name: "Living Room", slug: "/rooms/living-room", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80" },
    { name: "Bedroom", slug: "/rooms/bedroom", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80" },
    { name: "Dining Room", slug: "/rooms/dining", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80" },
    { name: "Home Office", slug: "/rooms/home-office", image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&q=80" },
    { name: "Outdoor", slug: "/rooms/outdoor", image: "https://images.unsplash.com/photo-1533090368676-1fd25485db88?w=600&q=80" },
    { name: "Decor", slug: "/rooms/decor", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80" },
  ];

  return (
    <section className="py-16 lg:py-20 bg-brand-bg">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold uppercase tracking-widest text-brand-text">
            Shop By Room
          </h2>
          <Link href="/rooms" className="text-xs font-bold uppercase tracking-widest text-brand-primary hover:text-brand-dark transition-colors flex items-center gap-2">
            View All Rooms &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {rooms.map((room, i) => (
            <motion.div
              key={room.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <Link href={room.slug} className="block text-center">
                <div className="relative aspect-[4/3] rounded bg-gray-100 overflow-hidden mb-3 border border-brand-border/40 hover:border-brand-primary/40 transition-colors">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Shop Icon Overlay from Mockup */}
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur p-1.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-dark"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                  </div>
                </div>
                <h3 className="text-xs font-bold tracking-widest uppercase text-brand-text group-hover:text-brand-primary transition-colors">
                  {room.name}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
