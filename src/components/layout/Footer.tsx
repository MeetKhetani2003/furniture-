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
              <img src="/logo.png" alt="Premius Crafts" className="h-12 object-contain brightness-0 invert" />
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
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/press" className="hover:text-white transition-colors">Press</Link></li>
              <li><Link href="/sustainability" className="hover:text-white transition-colors">Sustainability</Link></li>
              <li><Link href="/journal" className="hover:text-white transition-colors">Journal</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4 text-brand-accent">Customer Service</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link href="/account/orders" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link href="/return-policy" className="hover:text-white transition-colors">Return Policy</Link></li>
              <li><Link href="/faqs" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/stores" className="hover:text-white transition-colors">Store Locator</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-brand-accent">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link href="/custom-furniture" className="hover:text-white transition-colors">Custom Furniture</Link></li>
              <li><Link href="/design-services" className="hover:text-white transition-colors">Design Services</Link></li>
              <li><Link href="/trade" className="hover:text-white transition-colors">Trade / B2B</Link></li>
              <li><Link href="/collections/all" className="hover:text-white transition-colors">All Collections</Link></li>
              <li><Link href="/real-homes" className="hover:text-white transition-colors">Real Homes</Link></li>
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
            <p>© 2026 Premius Crafts. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
