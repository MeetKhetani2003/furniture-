export default function ServiceLandingTemplate({ title, slug }: { title: string; slug: string[] }) {
  // For service funnels like /design-services, /trade
  
  return (
    <div className="w-full bg-white text-brand-text">
      {/* Split Hero */}
      <div className="flex flex-col lg:flex-row min-h-[60vh]">
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-[#EFECE6]">
          <div className="max-w-md w-full">
            <h1 className="text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] font-bold mb-6 capitalize text-brand-dark">
              {title.replace("-", " ")}
            </h1>
            <p className="text-lg text-brand-muted mb-8 leading-relaxed">
              Elevate your space with our dedicated {title.replace("-", " ")} program. We offer tailored solutions, exclusive pricing, and dedicated support for your unique needs.
            </p>
            <form className="space-y-4">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full p-4 border border-brand-border rounded focus:outline-none focus:border-brand-primary"
              />
              <button 
                type="button"
                className="w-full bg-brand-dark text-white font-bold tracking-widest text-sm py-4 rounded hover:bg-brand-primary transition-colors"
              >
                APPLY NOW
              </button>
            </form>
          </div>
        </div>
        <div className="w-full lg:w-1/2 min-h-[400px] relative">
          <img src="https://images.unsplash.com/photo-1617806118233-18e1c0945594?w=1200&q=80" alt="Service" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>

      {/* Benefits Section */}
      <section className="py-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-[family-name:var(--font-playfair)] text-center mb-16">Program Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { title: "Exclusive Pricing", desc: "Access trade-only discounts and volume pricing." },
            { title: "Dedicated Support", desc: "A personal account manager for your projects." },
            { title: "Custom Solutions", desc: "Bespoke modifications and custom manufacturing." }
          ].map((benefit, i) => (
            <div key={i} className="space-y-4">
              <div className="w-16 h-16 bg-[#EFECE6] rounded-full mx-auto flex items-center justify-center text-brand-primary text-xl font-bold">
                {i + 1}
              </div>
              <h3 className="text-xl font-bold font-[family-name:var(--font-playfair)]">{benefit.title}</h3>
              <p className="text-brand-muted">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
