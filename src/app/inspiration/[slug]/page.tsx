import Link from "next/link";
import { ArrowLeft, Clock, User, Heart, Share2 } from "lucide-react";

export default function ArticlePage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-8">
        <Link href="/inspiration" className="inline-flex items-center gap-1 text-sm text-brand-muted hover:text-brand-primary mb-6">
          <ArrowLeft size={16} />
          Back to Inspiration
        </Link>

        <article className="bg-white rounded-xl p-6 lg:p-10 border border-brand-border/50">
          <span className="inline-block px-3 py-1 bg-brand-primary text-white text-xs font-bold uppercase tracking-wider rounded mb-4">
            Living Room
          </span>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-4xl font-bold text-brand-text mb-4">
            How to Style a Scandinavian Living Room
          </h1>
          <div className="flex items-center gap-4 text-sm text-brand-muted mb-8 pb-6 border-b border-brand-border/50">
            <span className="flex items-center gap-1"><User size={14} /> Priya Malhotra</span>
            <span className="flex items-center gap-1"><Clock size={14} /> Jan 10, 2025</span>
            <span className="flex items-center gap-1"><Clock size={14} /> 5 min read</span>
          </div>

          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80"
            alt="Scandinavian Living Room"
            className="w-full rounded-xl mb-8"
          />

          <div className="prose max-w-none">
            <p className="text-brand-muted leading-relaxed mb-4">
              Scandinavian design has taken the world by storm, and for good reason. Its emphasis on simplicity, functionality, and warmth creates spaces that feel both modern and inviting. In this guide, we&apos;ll walk you through the essential elements of creating a Scandinavian-inspired living room.
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-brand-text mt-8 mb-4">
              1. Start with a Neutral Palette
            </h2>
            <p className="text-brand-muted leading-relaxed mb-4">
              The foundation of any Scandinavian space is a neutral color palette. Think whites, creams, soft greys, and warm beiges. These colors reflect light beautifully, making your space feel larger and more airy. Add depth with natural wood tones and black accents.
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-brand-text mt-8 mb-4">
              2. Embrace Natural Materials
            </h2>
            <p className="text-brand-muted leading-relaxed mb-4">
              Wood is the heart of Scandinavian design. Opt for light oak, ash, or pine furniture. Layer textures with wool throws, linen cushions, and jute rugs. These natural materials add warmth and tactile interest to the minimalist aesthetic.
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-brand-text mt-8 mb-4">
              3. Prioritize Functionality
            </h2>
            <p className="text-brand-muted leading-relaxed mb-4">
              Every piece in a Scandinavian living room should serve a purpose. Choose furniture with clean lines and practical storage solutions. A coffee table with drawers, a sofa bed for guests, or floating shelves that display and organize.
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-brand-text mt-8 mb-4">
              4. Let There Be Light
            </h2>
            <p className="text-brand-muted leading-relaxed mb-4">
              Natural light is paramount in Scandinavian design. Keep window treatments minimal with sheer curtains or simple blinds. Supplement with layered lighting: a statement pendant, task lamps, and candles for that signature hygge glow.
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-brand-border/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold">
                PM
              </div>
              <div>
                <p className="font-medium text-sm">Priya Malhotra</p>
                <p className="text-xs text-brand-muted">Chief Design Officer at PremiumCrafts</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center hover:bg-brand-secondary transition-colors">
                <Heart size={16} />
              </button>
              <button className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center hover:bg-brand-secondary transition-colors">
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </article>

        {/* Related */}
        <div className="mt-12">
          <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-brand-text mb-4">
            Related Articles
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Top 5 Sofa Fabrics Explained", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80" },
              { title: "2025 Interior Design Trends", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80" },
            ].map((article) => (
              <Link
                key={article.title}
                href="/inspiration"
                className="flex gap-4 bg-white rounded-xl p-4 border border-brand-border/50 hover:shadow-md transition-all"
              >
                <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center">
                  <h4 className="font-medium text-sm">{article.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
