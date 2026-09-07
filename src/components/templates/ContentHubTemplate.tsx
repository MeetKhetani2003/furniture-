import Link from "next/link";

export default function ContentHubTemplate({ title, slug }: { title: string; slug: string[] }) {
  // A generic visual hub for things like /rooms, /materials, /shop-the-look
  
  return (
    <div className="w-full bg-white text-brand-text">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
        <h1 className="text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] font-bold mb-6 capitalize">
          {title.replace("-", " ")}
        </h1>
        <p className="text-lg text-brand-muted max-w-2xl mx-auto mb-16">
          Explore our curated {title.replace("-", " ")}. Hand-selected combinations of materials, rooms, and styles designed to inspire your next project.
        </p>

        {/* Dummy Hub Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Link key={item} href={`/${slug[0]}/example-${item}`} className="group block text-left">
              <div className="w-full aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden mb-4 relative">
                 <img src={`https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80&sig=${item}`} alt="Hub item" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
              </div>
              <h3 className="text-xl font-[family-name:var(--font-playfair)] font-bold group-hover:text-brand-primary transition-colors">
                Featured Collection {item}
              </h3>
              <p className="text-sm text-brand-muted mt-2">Discover the elements of style.</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
