"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Heart, ShoppingCart } from "lucide-react";

interface Toast {
  id: string;
  message: string;
  type: "success" | "info" | "wishlist";
}

let toastListeners: ((toasts: Toast[]) => void)[] = [];
let toasts: Toast[] = [];

function notifyListeners() {
  toastListeners.forEach((listener) => listener([...toasts]));
}

export function showToast(message: string, type: Toast["type"] = "success") {
  const id = Math.random().toString(36).substring(2, 9);
  toasts = [...toasts, { id, message, type }];
  notifyListeners();
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    notifyListeners();
  }, 3000);
}

export function Toaster() {
  const [activeToasts, setActiveToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const listener = (t: Toast[]) => setActiveToasts(t);
    toastListeners.push(listener);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== listener);
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
      <AnimatePresence>
        {activeToasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            className="flex items-center gap-3 bg-white border border-brand-border shadow-lg rounded-lg px-4 py-3 min-w-[280px]"
          >
            {toast.type === "success" && (
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-green-600" />
              </div>
            )}
            {toast.type === "wishlist" && (
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              </div>
            )}
            {toast.type === "info" && (
              <div className="w-8 h-8 rounded-full bg-brand-accent/30 flex items-center justify-center shrink-0">
                <ShoppingCart className="w-4 h-4 text-brand-primary" />
              </div>
            )}
            <span className="text-sm font-medium text-brand-text flex-1">{toast.message}</span>
            <button
              onClick={() => {
                toasts = toasts.filter((t) => t.id !== toast.id);
                notifyListeners();
              }}
              className="shrink-0 text-brand-muted hover:text-brand-text"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
