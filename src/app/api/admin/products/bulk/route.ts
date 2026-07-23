import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/db";
import { Product } from "@/db/models/Product";
import * as xlsx from "xlsx";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "admin" && session.user.email !== process.env.ADMIN_EMAIL)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const workbook = xlsx.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    
    // Parse the data as an array of objects
    const data: any[] = xlsx.utils.sheet_to_json(sheet);
    
    if (data.length === 0) {
      return NextResponse.json({ error: "Excel file is empty" }, { status: 400 });
    }

    await connectToDatabase();
    let importedCount = 0;

    for (const row of data) {
      // Map Excel columns to our Product schema
      const name = row["Model Name"] || row["Product Feed Title"] || "Unknown Product";
      const sku = row["Sku"] || `SKU-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      const price = parseFloat(row["Tier Price"] || row["Base Cost"]) || 0;
      const mrp = parseFloat(row["Gst Cost"]) || price * 1.2;
      const category = row["Item Classification"] || row["Collection Name"] || "Furniture";
      const brand = row["Brand Proposition"] || row["Factory Name"] || "PremiumCrafts";
      const stock = parseInt(row["Total Qty"] || "10", 10);
      const description = row["Features"] || row["Product Feed Title"] || "";

      // Gather remaining dynamic attributes
      const attributes = new Map<string, string>();
      for (const key of Object.keys(row)) {
        // Skip standard keys that we already mapped
        if (!["Model Name", "Product Feed Title", "Sku", "Tier Price", "Base Cost", "Gst Cost", "Item Classification", "Collection Name", "Brand Proposition", "Factory Name", "Total Qty", "Features"].includes(key)) {
          if (row[key] !== null && row[key] !== undefined && row[key] !== "") {
            attributes.set(key, String(row[key]));
          }
        }
      }

      await Product.findOneAndUpdate(
        { sku },
        {
          name,
          slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          price,
          mrp,
          category,
          brand,
          stock,
          description,
          attributes,
          isNewProduct: true
        },
        { upsert: true, new: true }
      );
      importedCount++;
    }

    return NextResponse.json({ message: `Successfully imported ${importedCount} products.` });
  } catch (error: any) {
    console.error("Bulk upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
