import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/lib/data/categories";
import { getProductsByCategory } from "@/lib/data/products";
import CategoryPageContent from "./CategoryPageContent";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const cat = getCategoryBySlug(params.slug);
  if (!cat) return { title: "Category Not Found" };
  return {
    title: `${cat.name} - Premium Furniture & Home Décor | PremiumCrafts`,
    description: cat.description,
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug);
  if (!category) return notFound();

  const categoryProducts = getProductsByCategory(params.slug).slice(0, 8);

  return <CategoryPageContent category={category} categoryProducts={categoryProducts} />;
}
