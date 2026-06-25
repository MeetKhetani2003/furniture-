import Link from "next/link";
import { MapPin, Phone, Mail, CreditCard, Shield, RotateCcw, Truck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      {/* Trust Badges */}
      <div className="border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Shield, text: "SSL Secure Payment", sub: "100% Safe Transactions" },
              { icon: RotateCcw, text: "Easy 30-Day Returns", sub: "Hassle-Free Process" },
              { icon: Truck, text: "Free Delivery", sub: "On Orders Above ₹10,000" },
              { icon: CreditCard, text: "Flexible EMI", sub: "Starting at ₹999/month" },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-3">
                <badge.icon size={28} className="text-brand-accent shrink-0" />
                <div>
                  <p className="text-sm font-semibold">{badge.text}</p>
                  <p className="text-xs text-white/60">{badge.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="text-brand-accent">
                <rect x="2" y="10" width="28" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M6 10V6C6 4.89543 6.89543 4 8 4H24C25.1046 4 26 4.89543 26 6V10" stroke="currentColor" strokeWidth="2" />
                <path d="M10 18H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="16" cy="24" r="2" fill="currentColor" />
              </svg>
              <span className="font-[family-name:var(--font-playfair)] text-xl font-bold">
                PremiumCrafts
              </span>
            </Link>
            <p className="text-sm text-white/70 mb-4 leading-relaxed">
              Crafting homes with love since 2010. Premium furniture and décor for the modern Indian home.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-primary transition-colors text-xs font-bold">IG</a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-primary transition-colors text-xs font-bold">FB</a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-primary transition-colors text-xs font-bold">YT</a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-brand-accent">Company</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Press</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Sustainability</Link></li>
              <li><Link href="/inspiration" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4 text-brand-accent">Customer Service</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link href="/account/orders" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Return Policy</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/stores" className="hover:text-white transition-colors">Store Locator</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-brand-accent">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link href="/category/furniture" className="hover:text-white transition-colors">Furniture</Link></li>
              <li><Link href="/category/sofas-seating" className="hover:text-white transition-colors">Sofas & Seating</Link></li>
              <li><Link href="/category/mattresses" className="hover:text-white transition-colors">Mattresses</Link></li>
              <li><Link href="/category/home-decor" className="hover:text-white transition-colors">Home Décor</Link></li>
              <li><Link href="/category/lamps-lighting" className="hover:text-white transition-colors">Lighting</Link></li>
            </ul>
          </div>

          {/* Contact & App */}
          <div>
            <h4 className="font-semibold mb-4 text-brand-accent">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-white/70 mb-6">
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-brand-accent shrink-0" />
                Mumbai, Maharashtra, India
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-brand-accent shrink-0" />
                1800-123-4567
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-brand-accent shrink-0" />
                support@premiumcrafts.com
              </li>
            </ul>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-xs font-medium mb-2">Download Our App</p>
              <div className="flex gap-2">
                <div className="bg-white text-brand-dark text-[10px] px-3 py-1.5 rounded font-bold">App Store</div>
                <div className="bg-white text-brand-dark text-[10px] px-3 py-1.5 rounded font-bold">Play Store</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
            <p>© 2025 PremiumCrafts. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/about" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/about" className="hover:text-white transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
