import { NextResponse } from "next/server";
import connectToDatabase from "@/db";
import { Product } from "@/db/models/Product";
import { Category } from "@/db/models/Category";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    if (!q || q.trim() === "") {
      return NextResponse.json({ products: [] });
    }

    await connectToDatabase();
    
    // Perform a case-insensitive regex search on name and description
    const regex = new RegExp(q, "i");
    const dbProducts = await Product.find({
      status: 1,
      $or: [
        { name: regex },
        { description: regex },
        { brand: regex }
      ]
    }).limit(10).lean();
    
    const categories = await Category.find({}).lean();
    
    const catMap = categories.reduce((acc: any, cat: any) => {
        acc[cat._id.toString()] = cat.slug;
        return acc;
    }, {});

    const products = dbProducts.map((p: any) => {
      const price = p.special_price || p.price || 0;
      const mrp = p.mrp || price;
      
      return {
        id: p._id.toString(),
        slug: p.slug,
        name: p.name,
        brand: p.brand || "",
        category: catMap[p.category] || "furniture",
        price,
        mrp,
        image: p.images && p.images.length > 0 ? p.images[0] : "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80",
      };
    });

    return NextResponse.json({ products });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
