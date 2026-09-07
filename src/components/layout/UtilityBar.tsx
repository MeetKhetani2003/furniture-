import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function UtilityBar() {
  return (
    <div className="bg-brand-dark text-white/80 border-b border-white/10 hidden lg:block">
      <div className="max-w-[1440px] mx-auto px-6 xl:px-20">
        <div className="flex items-center justify-between py-2 text-[11px] font-medium tracking-wide">
          <div className="flex items-center gap-2">
            <span>Complimentary Shipping on Orders Above $999</span>
            <span className="text-white/40">|</span>
            <span>Handcrafted in Jodhpur, India</span>
            <span className="text-white/40">|</span>
            <span>Worldwide Delivery</span>
          </div>
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-1 hover:text-white transition-colors">
              <span className="text-base leading-none mr-1">🇺🇸</span>
              United States (USD $)
              <ChevronDown size={12} className="ml-0.5" />
            </button>
            <Link href="/track-order" className="hover:text-white transition-colors">
              Track Order
            </Link>
            <Link href="/trade" className="hover:text-white transition-colors">
              Trade Program
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
