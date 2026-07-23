import { notFound } from "next/navigation";
import connectToDatabase from "@/db";
import { Product } from "@/db/models/Product";
import { getProductById } from "@/lib/data/products";
import ProductClientView from "./ProductClientView";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  try {
    await connectToDatabase();
  } catch (e) {
    console.error("DB connection failed", e);
  }
  
  let product = null;
  
  try {
    product = await Product.findOne({
      $or: [
        { slug: id },
        { sku: id }
      ]
    }).lean();

    if (!product && id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(id).lean();
    }
  } catch (e) {
    console.error("Error fetching from MongoDB", e);
  }

  if (!product) {
    // Fallback to local mock data so listed home products work
    const mockProduct = getProductById(id);
    if (mockProduct) {
      product = mockProduct;
    } else {
      notFound();
    }
  }

  return <ProductClientView product={JSON.parse(JSON.stringify(product))} />;
}
