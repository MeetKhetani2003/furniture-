import Link from "next/link";

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-[family-name:var(--font-playfair)] font-bold mb-12 text-center">Sitemap</h1>
        
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold mb-4 border-b border-brand-border/40 pb-2">Collections</h2>
            <ul className="space-y-3 text-brand-muted">
              <li><Link href="/collections/all" className="hover:text-brand-primary">All Collections</Link></li>
              <li><Link href="/living-room" className="hover:text-brand-primary">Living Room</Link></li>
              <li><Link href="/bedroom" className="hover:text-brand-primary">Bedroom</Link></li>
              <li><Link href="/dining" className="hover:text-brand-primary">Dining</Link></li>
              <li><Link href="/outdoor" className="hover:text-brand-primary">Outdoor</Link></li>
              <li><Link href="/office" className="hover:text-brand-primary">Office</Link></li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold mb-4 border-b border-brand-border/40 pb-2">Company</h2>
            <ul className="space-y-3 text-brand-muted">
              <li><Link href="/about" className="hover:text-brand-primary">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-brand-primary">Careers</Link></li>
              <li><Link href="/press" className="hover:text-brand-primary">Press</Link></li>
              <li><Link href="/sustainability" className="hover:text-brand-primary">Sustainability</Link></li>
              <li><Link href="/stores" className="hover:text-brand-primary">Store Locator</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold mb-4 border-b border-brand-border/40 pb-2">Support</h2>
            <ul className="space-y-3 text-brand-muted">
              <li><Link href="/contact" className="hover:text-brand-primary">Contact Us</Link></li>
              <li><Link href="/faqs" className="hover:text-brand-primary">FAQs</Link></li>
              <li><Link href="/return-policy" className="hover:text-brand-primary">Return Policy</Link></li>
              <li><Link href="/account/orders" className="hover:text-brand-primary">Track Order</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-brand-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-brand-primary">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
