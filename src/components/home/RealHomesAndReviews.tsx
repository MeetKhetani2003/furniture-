import Link from "next/link";
import { Star, CheckCircle2 } from "lucide-react";

export default function RealHomesAndReviews() {
  const reviews = [
    { name: "Sarah M.", location: "New York, USA", text: "The quality is exceptional and it transformed our living room!" },
    { name: "James T.", location: "Melbourne, Australia", text: "Beautiful craftsmanship and the fabric feels premium." },
    { name: "Neha R.", location: "Mumbai, India", text: "Exactly as shown in the pictures. Solid and stunning!" },
    { name: "Omar A.", location: "Dubai, UAE", text: "Premium quality and great customer service. Will buy again!" }
  ];

  return (
    <section className="py-8 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Card: Real Homes */}
          <div className="bg-[#FAF9F6] rounded-xl overflow-hidden p-8 lg:p-10 flex flex-col md:flex-row justify-between">
            <div className="flex flex-col mb-8 md:mb-0 md:w-1/3">
              <span className="text-[10px] font-bold tracking-widest text-brand-text uppercase mb-2 block font-[family-name:var(--font-inter)]">
                Loved In Real Homes
              </span>
              <p className="text-xs sm:text-sm text-brand-muted mb-auto font-[family-name:var(--font-inter)] leading-relaxed pr-4">
                Real spaces. Real stories. Styled by our customers.
              </p>
              
              <Link href="/gallery" className="inline-flex items-center text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#c4a66a] hover:text-[#a38a58] transition-colors mt-8">
                View All Homes &rarr;
              </Link>
            </div>
            
            <div className="flex gap-2 w-full md:w-2/3">
              <div className="aspect-[4/5] flex-1 bg-gray-200 rounded overflow-hidden">
                <img src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&q=80" alt="Real home 1" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[4/5] flex-1 bg-gray-200 rounded overflow-hidden">
                <img src="https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400&q=80" alt="Real home 2" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[4/5] flex-1 bg-gray-200 rounded overflow-hidden hidden sm:block">
                <img src="https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&q=80" alt="Real home 3" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Right Card: Verified Reviews */}
          <div className="bg-white border border-brand-border/40 rounded-xl overflow-hidden p-8 lg:p-10 flex flex-col">
            <span className="text-[10px] font-bold tracking-widest text-[#a38a58] uppercase mb-4 block font-[family-name:var(--font-inter)]">
              Verified Reviews
            </span>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="flex text-[#c4a66a]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={1} />
                ))}
              </div>
              <span className="text-[11px] font-bold text-brand-text">4.8/5</span>
              <span className="text-[11px] text-brand-muted">Based on 1,145 verified reviews</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
              {reviews.map((review, i) => (
                <div key={i} className="flex flex-col border-t border-brand-border/30 pt-4">
                  <div className="flex items-center gap-1.5 mb-1">
                    <CheckCircle2 size={12} className="text-[#a38a58]" />
                    <span className="text-[10px] font-bold text-brand-text">{review.name}</span>
                  </div>
                  <span className="text-[9px] text-brand-muted uppercase tracking-wider mb-2 block">{review.location}</span>
                  <p className="text-[11px] text-brand-text/80 leading-relaxed italic font-[family-name:var(--font-inter)]">
                    "{review.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
