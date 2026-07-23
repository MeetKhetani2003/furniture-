import connectToDatabase from "@/db";
import { Product as DBProduct } from "@/db/models/Product";
import { Category } from "@/db/models/Category";
import { Product as FrontendProduct } from "./products";

export async function getFrontendProducts(): Promise<FrontendProduct[]> {
  await connectToDatabase();
  const dbProducts = await DBProduct.find({ status: 1 }).sort({ createdAt: -1 }).lean();
  const categories = await Category.find({}).lean();
  
  const catMap = categories.reduce((acc: any, cat: any) => {
      acc[cat._id.toString()] = cat.slug;
      return acc;
  }, {});

  return dbProducts.map((p: any) => {
    const colors = (p.variants || []).map((v: any) => {
      const colorName = v.specifications?.Wood_colour || v.name;
      let hex = "#808080";
      if (colorName.toLowerCase().includes("black")) hex = "#1A1A1A";
      else if (colorName.toLowerCase().includes("gold")) hex = "#C9A961";
      else if (colorName.toLowerCase().includes("silver")) hex = "#C0C0C0";
      else if (colorName.toLowerCase().includes("white")) hex = "#FFFFFF";
      else if (colorName.toLowerCase().includes("brown") || colorName.toLowerCase().includes("oak")) hex = "#8B4513";
      
      return { name: colorName, hex };
    });

    const price = p.special_price || p.price || 0;
    const mrp = p.mrp || price;
    const discountPercent = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

    return {
      id: p._id.toString(),
      slug: p.slug,
      name: p.name,
      brand: p.brand || "Furniture Brand",
      category: catMap[p.category] || "furniture",
      subcategory: p.subCategory || "living-room",
      price,
      mrp,
      discountPercent,
      images: p.images && p.images.length > 0 ? p.images : ["https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80"],
      rating: p.rating || 4.5,
      reviewCount: p.reviewCount || 10,
      colors,
      material: p.specifications?.furniture_material || "Wood",
      dimensions: {
         length: p.specifications?.length || "0",
         width: p.specifications?.width || "0",
         height: p.specifications?.height || "0",
      },
      weight: "20 kg",
      warranty: p.specifications?.manufacturer_warranty || "1 Year",
      description: p.description || "",
      highlights: p.highlights || [],
      inStock: p.stock > 0,
      isNew: p.isNewArrival || false,
      isBestseller: p.isBestseller || false,
      tags: p.tags || [],
      deliveryDays: 7,
      seller: "Premium Furniture",
      sellerRating: 4.8,
      attributes: p.specifications || {}
    };
  });
}
