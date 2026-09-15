export default function TermsPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-[family-name:var(--font-playfair)] font-bold mb-8 text-center">Terms of Service</h1>
        <div className="prose max-w-none text-brand-muted space-y-6">
          <p>Last updated: August 2026</p>
          <h2 className="text-xl font-bold text-brand-dark mt-8 mb-4">1. Agreement to Terms</h2>
          <p>By accessing or using our website, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.</p>
          
          <h2 className="text-xl font-bold text-brand-dark mt-8 mb-4">2. Products and Pricing</h2>
          <p>We reserve the right to modify or discontinue products at any time. Prices for our products are subject to change without notice. We make every effort to display the colors and images of our products accurately, but cannot guarantee that your monitor's display will be accurate.</p>
          
          <h2 className="text-xl font-bold text-brand-dark mt-8 mb-4">3. Shipping and Delivery</h2>
          <p>Delivery times are estimates and cannot be guaranteed. We are not responsible for delays caused by shipping carriers or customs clearance processes.</p>
          
          <h2 className="text-xl font-bold text-brand-dark mt-8 mb-4">4. Intellectual Property</h2>
          <p>All content on this site, including text, graphics, logos, and images, is the property of Premius Crafts and protected by copyright laws.</p>
        </div>
      </div>
    </div>
  );
}
