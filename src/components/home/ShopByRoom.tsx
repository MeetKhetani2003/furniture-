"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Armchair } from "lucide-react";

export default function ShopByRoom() {
  const rooms = [
    { name: "Living Room", slug: "/rooms/living-room", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80" },
    { name: "Bedroom", slug: "/rooms/bedroom", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80" },
    { name: "Dining Room", slug: "/rooms/dining", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80" },
    { name: "Home Office", slug: "/rooms/home-office", image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&q=80" },
    { name: "Outdoor", slug: "/rooms/outdoor", image: "https://images.unsplash.com/photo-1533090368676-1fd25485db88?w=600&q=80" },
    { name: "Décor", slug: "/rooms/decor", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80" },
  ];

  return (
    <section className="py-16 lg:py-20 bg-brand-bg border-b border-brand-border/30">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-12">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-brand-border/40">
          <h2 className="text-sm lg:text-[15px] font-bold uppercase tracking-widest text-brand-text font-[family-name:var(--font-inter)]">
            Shop By Room
          </h2>
          <Link href="/rooms" className="text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.15em] text-[#c4a66a] hover:text-[#a38a58] transition-colors flex items-center gap-1.5">
            View All Rooms &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {rooms.map((room, i) => (
            <motion.div
              key={room.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <Link href={room.slug} className="block h-full">
                <div className="border border-brand-border/60 rounded-md overflow-hidden bg-white hover:border-brand-primary/40 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Shop Icon Overlay from Mockup */}
                    <div className="absolute top-3 right-3 bg-white p-1.5 rounded shadow-sm opacity-100">
                      <Armchair size={16} strokeWidth={1.5} className="text-brand-text" />
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-center bg-white">
                    <h3 className="text-[13px] font-semibold text-brand-text text-center font-[family-name:var(--font-inter)]">
                      {room.name}
                    </h3>
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
