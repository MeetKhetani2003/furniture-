import { NextResponse } from "next/server";
import connectToDatabase from "@/db";
import { Product } from "@/db/models/Product";
import { products as staticProducts } from "@/lib/data/products";

export async function GET() {
  try {
    await connectToDatabase();
    
    // Clear existing products to prevent duplicates during testing
    await Product.deleteMany({});

    const productsToInsert = staticProducts.map((p) => ({
      // We will map static products to the Product schema
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: p.price,
      mrp: p.mrp,
      category: p.category,
      brand: p.brand,
      images: p.images,
      features: p.highlights, // mapping highlights to features
      specifications: {
        dimensions: `${p.dimensions.length} x ${p.dimensions.width} x ${p.dimensions.height}`,
        weight: p.weight,
        material: p.material,
        warranty: p.warranty,
      },
      sku: `SKU-${p.id.padStart(5, '0')}`,
      stock: p.inStock ? 50 : 0, // Mock stock
      isNewProduct: p.isNew,
      isBestseller: p.isBestseller,
      rating: p.rating,
      reviewCount: p.reviewCount,
    }));

    await Product.insertMany(productsToInsert);

    return NextResponse.json({ message: `Successfully seeded ${productsToInsert.length} products.` });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
