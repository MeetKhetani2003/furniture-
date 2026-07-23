import { notFound } from "next/navigation";
import { getFrontendProducts } from "@/lib/data/fetchProducts";
import ProductClientView from "./ProductClientView";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const allProducts = await getFrontendProducts();
  const product = allProducts.find(p => p.id === id || p.slug === id || p.id === `DUMMY-${id}`);

  if (!product) {
    notFound();
  }

  return <ProductClientView product={product} />;
}
