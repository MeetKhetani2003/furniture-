import Link from "next/link";
import { ArrowLeft, Hammer } from "lucide-react";

export default function UnderConstruction({ title }: { title: string }) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-brand-bg text-brand-dark">
      <div className="w-20 h-20 bg-brand-secondary rounded-full flex items-center justify-center mb-6 text-brand-primary">
        <Hammer size={32} />
      </div>
      <h1 className="text-4xl font-[family-name:var(--font-playfair)] font-bold mb-4">{title}</h1>
      <p className="text-brand-muted max-w-md mx-auto mb-8 leading-relaxed">
        We're currently working hard to bring you this page. Please check back later for updates.
      </p>
      <Link 
        href="/"
        className="inline-flex items-center gap-2 px-8 py-4 bg-brand-dark text-white font-bold text-xs uppercase tracking-widest hover:bg-brand-primary hover:text-brand-dark transition-colors shadow-lg"
      >
        <ArrowLeft size={16} /> Return to Homepage
      </Link>
    </div>
  );
}
