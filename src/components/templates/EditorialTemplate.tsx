export default function EditorialTemplate({ title, slug }: { title: string; slug: string[] }) {
  // A template for brand storytelling, e.g. /about, /inspiration
  
  return (
    <article className="w-full bg-[#fcfbf9] text-brand-text min-h-screen">
      {/* Hero Banner */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=80" alt="Editorial Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-[family-name:var(--font-playfair)] font-bold capitalize">
            {title.replace("-", " ")}
          </h1>
        </div>
      </div>

      {/* Content Body */}
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <h2 className="text-3xl font-[family-name:var(--font-playfair)] mb-6">The Story of {title.replace("-", " ")}</h2>
        
        <div className="space-y-6 text-lg text-brand-muted leading-relaxed font-[family-name:var(--font-inter)]">
          <p>
            Welcome to the definitive guide for {title.replace("-", " ")}. Here at Premius Crafts, we believe that the environment you build around yourself deeply influences your daily life.
          </p>
          <p>
            Whether you are reading about our heritage in Jodhpur or exploring our latest journal entries, our mission remains the same: delivering unparalleled craftsmanship and timeless design directly to your home.
          </p>
          
          <blockquote className="border-l-4 border-brand-primary pl-6 my-10 italic text-2xl font-[family-name:var(--font-playfair)] text-brand-dark">
            "Design is not just what it looks like and feels like. Design is how it works."
          </blockquote>
          
          <p>
            Every piece we craft tells a story. We invite you to be part of that story. Explore our collections, consult with our designers, and create a space that is authentically yours.
          </p>
        </div>
      </div>
    </article>
  );
}
