"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const announcements = [
  "Free Delivery on Orders Above ₹10,000",
  "New Arrivals Every Week",
  "EMI Starting ₹999/month",
  "5-Year Warranty on All Furniture",
];

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  if (closed) return null;

  return (
    <div className="bg-brand-dark text-brand-primary h-9 flex items-center justify-center relative overflow-hidden border-b border-brand-border/20">
      <AnimatePresence mode="wait">
        <motion.p
          key={current}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="text-[10px] md:text-xs font-bold tracking-widest uppercase px-8 text-center font-[family-name:var(--font-inter)]"
        >
          {announcements[current]}
        </motion.p>
      </AnimatePresence>
      <button
        onClick={() => setClosed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-brand-primary/10 text-brand-primary rounded transition-colors"
        aria-label="Close announcement"
      >
        <X size={13} />
      </button>
    </div>
  );
}
