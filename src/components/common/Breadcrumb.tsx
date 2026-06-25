import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-brand-muted py-4">
      <Link href="/" className="flex items-center gap-1 hover:text-brand-primary transition-colors">
        <Home size={14} />
        <span className="hidden sm:inline">Home</span>
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight size={14} className="text-brand-border" />
          {item.href ? (
            <Link href={item.href} className="hover:text-brand-primary transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-brand-text font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
