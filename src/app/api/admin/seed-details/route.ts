import { NextResponse } from "next/server";
import connectToDatabase from "@/db";
import { Product } from "@/db/models/Product";
import { AttributeSet } from "@/db/models/AttributeSet";

export async function GET() {
  try {
    await connectToDatabase();
    
    const set = await AttributeSet.findOne({ name: "Furniture (From CSV)" }).lean();
    if (!set) return NextResponse.json({ error: "Attribute Set not found" });

    const dbProducts = await Product.find({}).lean();
    
    for (const p of dbProducts) {
      const specifications: any = {};
      
      // Seed rich dummy data for every attribute in the set
      set.attributes.forEach((attr: any) => {
        const name = attr.name;
        if (attr.type === 'select' && attr.options?.length > 0) {
          specifications[name] = attr.options[Math.floor(Math.random() * attr.options.length)];
        } else if (attr.type === 'boolean') {
          specifications[name] = Math.random() > 0.5 ? "Yes" : "No";
        } else if (attr.type === 'number') {
          if (name === "height") specifications[name] = Math.floor(Math.random() * 40 + 30).toString() + " cm";
          else if (name === "width") specifications[name] = Math.floor(Math.random() * 100 + 50).toString() + " cm";
          else if (name === "depth") specifications[name] = Math.floor(Math.random() * 60 + 40).toString() + " cm";
          else if (name === "furniture_weight") specifications[name] = Math.floor(Math.random() * 20 + 5).toString() + " kg";
          else if (name === "boxcount") specifications[name] = "1";
          else specifications[name] = Math.floor(Math.random() * 100).toString();
        } else {
           if (name === "furniture_material" || name === "furniture_material_group") specifications[name] = ["Engineered Wood", "Solid Wood", "Teak Wood", "Mahogany", "Metal", "Fabric", "Leather"][Math.floor(Math.random() * 7)];
           else if (name === "Wood_colour" || name === "color_swatch") specifications[name] = ["Walnut", "Teak", "Black", "White", "Oak", "Espresso", "Honey"][Math.floor(Math.random() * 7)];
           else if (name.includes("warranty")) specifications[name] = "12 Months Manufacturer Warranty";
           else if (name.includes("policy")) specifications[name] = "7 Days Easy Returns";
           else if (name.includes("care")) specifications[name] = "Wipe with a clean, dry cloth.";
           else specifications[name] = "Standard Value";
        }
      });

      // Update the product
      await Product.findByIdAndUpdate(p._id, {
        attributeSet: set._id,
        specifications: specifications,
      });
    }

    return NextResponse.json({ message: "Successfully updated all products with rich attribute details!", count: dbProducts.length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
