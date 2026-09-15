import { ShieldCheck, RotateCcw, Truck, Clock } from "lucide-react";
import Link from "next/link";

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark">
      {/* Header */}
      <div className="bg-brand-dark text-white py-16 text-center">
        <h1 className="text-4xl font-[family-name:var(--font-playfair)] font-bold mb-4">Return Policy</h1>
        <p className="text-white/80 max-w-xl mx-auto">
          We stand behind the quality of our craftsmanship. Here is everything you need to know about our return process.
        </p>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 py-16">
        {/* Key Features */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 bg-white border border-brand-border/50 rounded-lg">
            <RotateCcw size={32} className="mx-auto text-brand-primary mb-3" />
            <h3 className="font-bold mb-2">30-Day Returns</h3>
            <p className="text-xs text-brand-muted">Return most items within 30 days of delivery.</p>
          </div>
          <div className="text-center p-6 bg-white border border-brand-border/50 rounded-lg">
            <Truck size={32} className="mx-auto text-brand-primary mb-3" />
            <h3 className="font-bold mb-2">Free Pickup</h3>
            <p className="text-xs text-brand-muted">We handle the heavy lifting for large furniture.</p>
          </div>
          <div className="text-center p-6 bg-white border border-brand-border/50 rounded-lg">
            <ShieldCheck size={32} className="mx-auto text-brand-primary mb-3" />
            <h3 className="font-bold mb-2">No Restocking Fees</h3>
            <p className="text-xs text-brand-muted">Full refund for items in original condition.</p>
          </div>
          <div className="text-center p-6 bg-white border border-brand-border/50 rounded-lg">
            <Clock size={32} className="mx-auto text-brand-primary mb-3" />
            <h3 className="font-bold mb-2">Fast Processing</h3>
            <p className="text-xs text-brand-muted">Refunds processed within 5-7 business days.</p>
          </div>
        </div>

        {/* Policy Details */}
        <div className="prose max-w-none text-brand-muted space-y-8">
          <section>
            <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-brand-dark mb-4">Standard Return Policy</h2>
            <p className="leading-relaxed">
              If you are not entirely satisfied with your purchase, we're here to help. You have 30 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused, in the same condition that you received it, and in the original packaging.
            </p>
            <p className="leading-relaxed mt-4">
              Your item needs to have the receipt or proof of purchase. Please note that return shipping costs for non-damaged items will be deducted from your refund amount.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-brand-dark mb-4">Custom & Made-to-Order Items</h2>
            <p className="leading-relaxed">
              Custom furniture and made-to-order items are crafted specifically for you. Because these items are tailored to your exact specifications, they are <strong>non-returnable and non-refundable</strong> unless they arrive damaged or defective.
            </p>
            <p className="leading-relaxed mt-4">
              If you receive a custom item that is damaged or defective, please contact our support team within 48 hours of delivery so we can arrange a repair or replacement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-brand-dark mb-4">Damaged or Defective Items</h2>
            <p className="leading-relaxed">
              In the unlikely event that your item arrives damaged or defective, please accept our apologies. We will make it right. Contact us immediately upon delivery (within 48 hours) with clear photos of the damage and the packaging. We will arrange for a replacement or a professional repair at no cost to you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-brand-dark mb-4">How to Initiate a Return</h2>
            <ol className="list-decimal pl-5 space-y-3 mt-4">
              <li>Log into your account and navigate to the <Link href="/account/orders" className="text-brand-primary font-bold hover:underline">Orders tab</Link>.</li>
              <li>Select the order containing the item you wish to return.</li>
              <li>Click the "Request Return" button and fill out the brief form indicating the reason.</li>
              <li>Our support team will review your request and send you a prepaid return shipping label and instructions within 24 hours.</li>
              <li>Pack the item securely in its original packaging and attach the label.</li>
            </ol>
          </section>

          <section className="bg-brand-secondary/30 p-8 rounded-lg border border-brand-border/50 mt-12 text-center">
            <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-brand-dark mb-4">Need help with a return?</h2>
            <p className="mb-6">Our customer care team is available to guide you through the process.</p>
            <Link href="/contact" className="inline-block px-8 py-3 bg-brand-dark text-white font-bold text-xs uppercase tracking-widest hover:bg-brand-primary hover:text-brand-dark transition-colors">
              Contact Support
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
