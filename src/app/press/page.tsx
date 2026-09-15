import { ArrowRight, Download, Mail, ExternalLink } from "lucide-react";
import Link from "next/link";

const PRESS_RELEASES = [
  { id: 1, title: "Premius Crafts Launches New Sustainable Teak Collection", date: "August 15, 2026", publication: "Press Release" },
  { id: 2, title: "How Indian Craftsmanship is Taking Over Modern Minimalist Design", date: "July 02, 2026", publication: "Architectural Digest" },
  { id: 3, title: "Top 10 Furniture Brands Redefining Luxury in 2026", date: "June 18, 2026", publication: "Vogue Living" },
  { id: 4, title: "Premius Crafts Opens Flagship Experience Center in Mumbai", date: "May 10, 2026", publication: "Press Release" },
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark">
      {/* Hero Section */}
      <div className="bg-brand-secondary/30 py-24 border-b border-brand-border/40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-4 text-brand-primary">Press & Media</p>
          <h1 className="text-5xl md:text-6xl font-[family-name:var(--font-playfair)] font-bold mb-6 max-w-4xl mx-auto">
            Premius Crafts in the News.
          </h1>
          <p className="text-lg text-brand-muted max-w-2xl mx-auto mb-10">
            Explore our latest press releases, media coverage, and download our official press kit for high-resolution brand assets.
          </p>
        </div>
      </div>

      <div className="py-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Left Column: Press Releases & Articles */}
          <div className="lg:col-span-8">
            <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold mb-8 flex items-center gap-4">
              Latest Coverage
              <span className="h-[1px] flex-grow bg-brand-border block"></span>
            </h2>

            <div className="space-y-8">
              {PRESS_RELEASES.map((item) => (
                <div key={item.id} className="group cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest bg-brand-dark text-white px-2 py-1 rounded">
                          {item.publication}
                        </span>
                        <span className="text-xs text-brand-muted">{item.date}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold group-hover:text-brand-primary transition-colors pr-8">
                        {item.title}
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:text-white group-hover:border-transparent transition-all">
                      <ExternalLink size={16} />
                    </div>
                  </div>
                  <div className="h-[1px] w-full bg-brand-border/50 mt-8"></div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <button className="px-8 py-3 border border-brand-dark text-xs font-bold uppercase tracking-widest hover:bg-brand-dark hover:text-white transition-colors">
                Load More Articles
              </button>
            </div>
          </div>

          {/* Right Column: Media Kit & Contact */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-brand-border/50 p-8 rounded-xl shadow-sm mb-8 sticky top-24">
              <h3 className="text-xl font-[family-name:var(--font-playfair)] font-bold mb-4">Media Kit</h3>
              <p className="text-sm text-brand-muted mb-6">
                Download our official brand guidelines, high-resolution logos, and product lifestyle imagery for press use.
              </p>
              
              <div className="space-y-3 mb-8">
                <a href="#" className="flex items-center justify-between p-4 border border-brand-border/40 rounded hover:border-brand-primary group transition-colors">
                  <div className="flex items-center gap-3">
                    <Download size={18} className="text-brand-primary" />
                    <span className="text-sm font-bold group-hover:text-brand-primary transition-colors">Brand Logos (ZIP)</span>
                  </div>
                  <span className="text-xs text-brand-muted">2.4 MB</span>
                </a>
                <a href="#" className="flex items-center justify-between p-4 border border-brand-border/40 rounded hover:border-brand-primary group transition-colors">
                  <div className="flex items-center gap-3">
                    <Download size={18} className="text-brand-primary" />
                    <span className="text-sm font-bold group-hover:text-brand-primary transition-colors">Spring '26 Lookbook (PDF)</span>
                  </div>
                  <span className="text-xs text-brand-muted">14.1 MB</span>
                </a>
                <a href="#" className="flex items-center justify-between p-4 border border-brand-border/40 rounded hover:border-brand-primary group transition-colors">
                  <div className="flex items-center gap-3">
                    <Download size={18} className="text-brand-primary" />
                    <span className="text-sm font-bold group-hover:text-brand-primary transition-colors">Executive Bios (PDF)</span>
                  </div>
                  <span className="text-xs text-brand-muted">1.2 MB</span>
                </a>
              </div>

              <div className="pt-8 border-t border-brand-border/40">
                <h3 className="text-xl font-[family-name:var(--font-playfair)] font-bold mb-4">Press Inquiries</h3>
                <p className="text-sm text-brand-muted mb-4">
                  For all media, PR, and collaboration inquiries, please contact our press team directly.
                </p>
                <a href="mailto:press@premiuscrafts.com" className="inline-flex items-center gap-2 text-brand-primary font-bold hover:text-brand-dark transition-colors">
                  <Mail size={16} /> press@premiuscrafts.com
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
