import Link from "next/link";
import { ChevronRight, Ruler, Palette, TreePine, PaintBucket, AlertCircle } from "lucide-react";

export default function CustomFurniturePage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark overflow-hidden">
      {/* Header */}
      <div className="bg-brand-secondary py-6 border-b border-brand-border/40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] font-bold mb-3 text-brand-dark">Custom Furniture</h1>
          <p className="text-sm text-brand-muted max-w-xl mx-auto">
            Made-to-order pieces tailored to your exact specifications. Choose dimensions, premium fabrics, sustainably sourced woods, and expert finishes.
          </p>
        </div>
      </div>

      {/* Hero Split */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Lifestyle Image Grid */}
          <div className="grid grid-cols-2 gap-4 relative">
            <div className="space-y-4 pt-12">
              <img
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80"
                alt="Craftsmanship"
                className="w-full h-64 object-cover rounded-2xl shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80"
                alt="Material Selection"
                className="w-full h-48 object-cover rounded-2xl shadow-lg"
              />
            </div>
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80"
                alt="Finished Sofa"
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
              <div className="bg-brand-primary/10 rounded-2xl p-6 flex flex-col justify-center h-[184px]">
                <p className="text-[11px] font-bold tracking-widest uppercase text-brand-primary mb-2">The Workshop</p>
                <p className="text-sm font-medium text-brand-dark italic">"Every piece tells a story of dedicated craftsmanship and precision."</p>
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div className="lg:pr-8">
            <span className="text-[11px] text-brand-primary font-bold tracking-widest uppercase block mb-4 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-brand-primary"></span>
              YOUR VISION, REALIZED
            </span>
            <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] font-bold leading-tight mb-6">
              Made for your space.<br />Built around you.
            </h2>
            <p className="text-brand-muted text-base mb-10 leading-relaxed">
              We believe furniture should fit your life, not the other way around. Our custom program allows you to personalize our most popular silhouettes to match your exact spatial requirements and aesthetic preferences.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-12">
              <Link href="/custom-furniture/configure" className="px-8 py-4 bg-brand-dark text-white text-xs font-bold tracking-widest uppercase hover:bg-brand-primary hover:text-brand-dark transition-colors text-center shadow-lg">
                Start Customising
              </Link>
              <Link href="/design-services" className="px-8 py-4 border border-brand-dark text-brand-dark text-xs font-bold tracking-widest uppercase hover:bg-brand-dark hover:text-white transition-colors text-center">
                Book Design Help
              </Link>
            </div>
            
            <div className="flex gap-6 pt-6 border-t border-brand-border/60">
              <div>
                <p className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-brand-dark mb-1">40+</p>
                <p className="text-[11px] uppercase tracking-wider text-brand-muted font-bold">Premium Fabrics</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-brand-dark mb-1">100%</p>
                <p className="text-[11px] uppercase tracking-wider text-brand-muted font-bold">Solid Wood</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-brand-dark mb-1">6-8</p>
                <p className="text-[11px] uppercase tracking-wider text-brand-muted font-bold">Weeks Lead Time</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Process Section */}
      <div className="bg-brand-secondary/40 py-24 border-y border-brand-border/40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-[family-name:var(--font-playfair)] font-bold text-brand-dark mb-4">The Customization Process</h2>
            <p className="text-brand-muted text-sm max-w-2xl mx-auto">Complete transparency from design to delivery. We ensure you know exactly what you're paying for and when it will arrive.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Choose a Piece",
                desc: "Select from our eligible made-to-order collections. Note that not all pieces can be customized.",
              },
              {
                step: "02",
                title: "Configure & Design",
                desc: "Specify dimensions, select fabrics, wood types, and finishes either online or with a design consultant.",
              },
              {
                step: "03",
                title: "Review Quote & Time",
                desc: "Receive a transparent price breakdown. Custom pieces typically require 6-8 weeks for production.",
              },
              {
                step: "04",
                title: "Production & Delivery",
                desc: "Once confirmed, our artisans begin crafting. We'll keep you updated until white-glove delivery.",
              },
            ].map((s) => (
              <div key={s.step} className="bg-white p-8 rounded-2xl shadow-sm border border-brand-border/40 relative overflow-hidden group hover:border-brand-primary transition-colors">
                <span className="absolute -top-6 -right-6 text-8xl font-[family-name:var(--font-playfair)] font-bold text-brand-bg opacity-50 group-hover:text-brand-primary/10 transition-colors">{s.step}</span>
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-brand-dark mb-3">{s.title}</h3>
                  <p className="text-sm text-brand-muted leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customizable Collections Section */}
      <div className="bg-white py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-[family-name:var(--font-playfair)] font-bold text-brand-dark mb-4">Select a Base Product</h2>
            <p className="text-brand-muted text-sm max-w-2xl mx-auto">Our custom program extends across multiple categories. Choose a foundation below to start building your perfect piece.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Sofas & Sectionals",
                img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
                desc: "Customize layout, fabric, and leg finish.",
                link: "/custom-furniture/configure"
              },
              {
                title: "Dining Tables",
                img: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=600&q=80",
                desc: "Choose dimensions, wood type, and edge profile.",
                link: "/custom-furniture/configure"
              },
              {
                title: "Beds & Headboards",
                img: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&q=80",
                desc: "Select size, upholstery fabric, and frame finish.",
                link: "/custom-furniture/configure"
              }
            ].map((collection) => (
              <Link href={collection.link} key={collection.title} className="group block">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-brand-secondary">
                  <img 
                    src={collection.img} 
                    alt={collection.title} 
                    className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700 p-4" 
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors"></div>
                  <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-dark shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                    <ChevronRight size={18} />
                  </div>
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-playfair)] text-brand-dark mb-2">{collection.title}</h3>
                <p className="text-sm text-brand-muted">{collection.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Customisation Options Visuals */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-brand-border/40">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl lg:text-4xl font-[family-name:var(--font-playfair)] font-bold text-brand-dark mb-3">Customization Options</h2>
            <p className="text-brand-muted text-sm max-w-xl">Explore the granular details you can control. We provide real examples and material swatches for every configuration.</p>
          </div>
          <Link href="/materials" className="text-xs font-bold tracking-widest uppercase text-brand-dark flex items-center gap-2 hover:text-brand-primary transition-colors pb-1 border-b border-brand-dark hover:border-brand-primary">
            View All Materials <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* SIZE */}
          <div className="group cursor-pointer">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4">
              <img src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80" alt="Size Configurations" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <Ruler className="mb-3 text-white/80" size={24} />
                <h3 className="text-xl font-bold font-[family-name:var(--font-playfair)]">Size & Layout</h3>
              </div>
            </div>
            <p className="text-sm text-brand-muted leading-relaxed px-1">2, 3, or 4 seater options. Sectional chaises and custom dimensions to fit alcoves.</p>
          </div>

          {/* FABRIC */}
          <div className="group cursor-pointer">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4">
              <img src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80" alt="Fabric Selection" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <Palette className="mb-3 text-white/80" size={24} />
                <h3 className="text-xl font-bold font-[family-name:var(--font-playfair)]">Premium Fabrics</h3>
              </div>
            </div>
            <p className="text-sm text-brand-muted leading-relaxed px-1">Over 40+ swatches including performance velvet, Italian leather, and organic linen.</p>
          </div>

          {/* WOOD */}
          <div className="group cursor-pointer">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4">
              <img src="https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=600&q=80" alt="Wood Types" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <TreePine className="mb-3 text-white/80" size={24} />
                <h3 className="text-xl font-bold font-[family-name:var(--font-playfair)]">Solid Wood</h3>
              </div>
            </div>
            <p className="text-sm text-brand-muted leading-relaxed px-1">Sustainably sourced Walnut, White Oak, and Ash. FSC certified for peace of mind.</p>
          </div>

          {/* FINISH */}
          <div className="group cursor-pointer">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4">
              <img src="https://images.unsplash.com/photo-1611080766299-4c59a5d1c2fc?w=600&q=80" alt="Finishes" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <PaintBucket className="mb-3 text-white/80" size={24} />
                <h3 className="text-xl font-bold font-[family-name:var(--font-playfair)]">Artisan Finishes</h3>
              </div>
            </div>
            <p className="text-sm text-brand-muted leading-relaxed px-1">Choose between Natural, Smoked, Ebonized, or hand-rubbed oil finishes.</p>
          </div>
        </div>
      </div>

      {/* Eligibility & Disclaimers */}
      <div className="bg-brand-dark text-white py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-start bg-white/5 p-8 rounded-2xl border border-white/10">
            <div className="shrink-0">
              <AlertCircle size={32} className="text-brand-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-[family-name:var(--font-playfair)] mb-3">Important Customization Policies</h3>
              <ul className="text-sm text-white/70 space-y-3 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary mt-1">•</span> 
                  <span><strong>Eligibility:</strong> Not all products are customizable. Fixed-design items (like certain lighting and decor) are sold as-is. Look for the "Customizable" badge on product pages.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary mt-1">•</span> 
                  <span><strong>Returns:</strong> Because these items are built specifically for you, made-to-order and custom furniture cannot be returned, cancelled, or exchanged once production begins.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary mt-1">•</span> 
                  <span><strong>Lead Times:</strong> Quoted lead times (e.g., 6-8 weeks) are estimates and begin only after order confirmation and material availability validation.</span>
                </li>
              </ul>
            </div>
            <div className="md:ml-auto shrink-0 flex flex-col gap-3 w-full md:w-auto">
               <Link href="/materials" className="w-full md:w-48 py-4 bg-white text-brand-dark text-[10px] font-bold tracking-widest uppercase hover:bg-brand-primary transition-colors text-center">
                  Order Material Swatch
                </Link>
                <Link href="/contact" className="w-full md:w-48 py-4 border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase hover:bg-white hover:text-brand-dark transition-colors text-center">
                  Custom Project Enquiry
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
