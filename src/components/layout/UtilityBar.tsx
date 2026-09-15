import Link from "next/link";
import { ChevronDown, Truck, MapPin, Globe } from "lucide-react";

export default function UtilityBar() {
  return (
    <div className="bg-[#0f0f0f] text-white/90 border-b border-white/10 hidden lg:block">
      <div className="max-w-[1440px] mx-auto px-6 xl:px-20">
        <div className="flex items-center justify-between py-2 text-[10px] xl:text-[11px] font-medium tracking-wide">
          <div className="flex items-center gap-6 xl:gap-10">
            <div className="flex items-center gap-2">
              <Truck size={14} className="text-[#b89b6a]" />
              <span>Complimentary Shipping on Orders Above ₹99,000</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-[#b89b6a]" />
              <span>Handcrafted in Jodhpur, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-[#b89b6a]" />
              <span>Worldwide Delivery</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-1.5 hover:text-white transition-colors">
              <span className="text-[14px] leading-none">🇮🇳</span>
              India (INR ₹)
              <ChevronDown size={12} />
            </button>
            <Link href="/account/orders" className="hover:text-white transition-colors">
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
