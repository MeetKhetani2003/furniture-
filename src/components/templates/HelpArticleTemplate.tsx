import Link from "next/link";

export default function HelpArticleTemplate({ title, slug }: { title: string; slug: string[] }) {
  // For text-heavy policies like /help/returns, /help/shipping-delivery
  
  const SIDEBAR_LINKS = [
    { name: "Help Center Home", path: "/help" },
    { name: "Shipping & Delivery", path: "/help/shipping-delivery" },
    { name: "Returns & Refunds", path: "/help/returns" },
    { name: "Warranty", path: "/help/warranty" },
    { name: "Assembly Guides", path: "/help/assembly" },
    { name: "Furniture Care", path: "/help/furniture-care" },
    { name: "Payment Information", path: "/help/payments" },
    { name: "FAQs", path: "/help/faqs" },
  ];

  return (
    <div className="w-full bg-[#fcfbf9] text-brand-text min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-12 lg:gap-24">
        
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 shrink-0">
          <h2 className="text-lg font-[family-name:var(--font-playfair)] font-bold mb-6">Customer Support</h2>
          <nav className="flex flex-col space-y-3">
            {SIDEBAR_LINKS.map(link => {
              const currentPath = `/${slug.join("/")}`;
              const isActive = link.path === currentPath;
              return (
                <Link 
                  key={link.path} 
                  href={link.path}
                  className={`text-sm transition-colors ${isActive ? "font-bold text-brand-primary" : "text-brand-muted hover:text-brand-primary"}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Article Content */}
        <main className="flex-1 max-w-3xl bg-white p-8 md:p-12 shadow-sm rounded border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold mb-8 capitalize text-brand-dark">
            {title.replace("-", " ")}
          </h1>
          
          <div className="prose prose-brand max-w-none text-brand-muted leading-relaxed font-[family-name:var(--font-inter)] space-y-6">
            <p>
              This is a placeholder for the {title.replace("-", " ")} article. The actual content would be pulled from the CMS based on the URL slug.
            </p>
            <p>
              <strong>General Information:</strong><br/>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              <strong>Policy Details:</strong><br/>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <ul>
              <li>Standard delivery takes 3-5 business days.</li>
              <li>White glove assembly is available for select items.</li>
              <li>Returns are accepted within 30 days of delivery.</li>
            </ul>
            <p>
              If you have any further questions, please do not hesitate to <Link href="/contact" className="text-brand-primary underline">contact our support team</Link>.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
