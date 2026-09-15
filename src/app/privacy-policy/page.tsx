export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-[family-name:var(--font-playfair)] font-bold mb-8 text-center">Privacy Policy</h1>
        <div className="prose max-w-none text-brand-muted space-y-6">
          <p>Last updated: August 2026</p>
          <h2 className="text-xl font-bold text-brand-dark mt-8 mb-4">1. Information We Collect</h2>
          <p>We collect information that you provide directly to us, such as when you create an account, make a purchase, or contact customer support. This may include your name, email address, shipping address, and payment information.</p>
          
          <h2 className="text-xl font-bold text-brand-dark mt-8 mb-4">2. How We Use Your Information</h2>
          <p>We use the information we collect to process your transactions, communicate with you about your orders, improve our website and services, and send you promotional offers if you have opted in to receive them.</p>
          
          <h2 className="text-xl font-bold text-brand-dark mt-8 mb-4">3. Information Sharing</h2>
          <p>We do not sell your personal information. We may share your information with third-party service providers who help us operate our business, such as shipping carriers and payment processors.</p>
          
          <h2 className="text-xl font-bold text-brand-dark mt-8 mb-4">4. Data Security</h2>
          <p>We take reasonable measures to protect your personal information from unauthorized access or disclosure. All payment transactions are encrypted using industry-standard technology.</p>
        </div>
      </div>
    </div>
  );
}
