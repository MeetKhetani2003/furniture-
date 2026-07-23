import { NextResponse } from "next/server";
import connectToDatabase from "@/db";
import { Product } from "@/db/models/Product";
import fs from "fs";
import path from "path";

// A simple CSV parser
function parseCSV(text: string) {
  const result: any[] = [];
  let row: string[] = [];
  let inQuotes = false;
  let val = "";
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (inQuotes) {
      if (char === '"') {
        if (i + 1 < text.length && text[i + 1] === '"') {
          val += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        val += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        row.push(val);
        val = "";
      } else if (char === '\n') {
        row.push(val);
        result.push(row);
        row = [];
        val = "";
      } else if (char !== '\r') {
        val += char;
      }
    }
  }
  if (val || row.length > 0) {
    row.push(val);
    result.push(row);
  }
  return result;
}

export async function GET() {
  try {
    await connectToDatabase();
    
    const csvPath = path.join(process.cwd(), "public", "product details.csv");
    if (!fs.existsSync(csvPath)) return NextResponse.json({ error: "CSV not found" });
    
    const csvContent = fs.readFileSync(csvPath, 'utf8');
    const parsed = parseCSV(csvContent);
    const headers = parsed[0];
    
    let updated = 0;
    
    for (let i = 1; i < parsed.length; i++) {
      const row = parsed[i];
      if (row.length < 2) continue;
      
      const record: any = {};
      headers.forEach((h, idx) => {
        if (h && row[idx] !== undefined) {
          record[h.trim()] = row[idx].trim();
        }
      });
      
      if (record.SKU) {
        // Build exact specifications mirroring the CSV and Pepperfry layout
        const specifications: any = {};
        
        // Product Details
        if (record.brandsname) specifications["Brand"] = record.brandsname;
        if (record.assembly) specifications["Assembly"] = record.assembly;
        if (record.Wood_colour || record.color_swatch) specifications["Colour"] = record.Wood_colour || record.color_swatch;
        if (record.dimensions_cm) specifications["Dimensions (In Centimeters)"] = record.dimensions_cm;
        if (record.dimension) specifications["Dimensions (In Inches)"] = record.dimension;
        if (record.furniture_material) specifications["Primary Material"] = record.furniture_material;
        if (record.room_type) specifications["Room Type"] = record.room_type;
        if (record.top_material) specifications["Top Material"] = record.top_material;
        if (record.furniture_weight) specifications["Weight"] = record.furniture_weight + " KG";
        if (record.SKU) specifications["Sku"] = record.SKU;
        
        // Care
        if (record.care || record.furniture_care) {
           specifications["Care_Instructions"] = record.care || record.furniture_care;
        }
        
        // Warranty
        if (record.manufacturer_warranty) {
           specifications["Warranty_Summary"] = record.manufacturer_warranty;
        }
        if (record.warranty_terms) {
           specifications["Warranty_Terms"] = record.warranty_terms;
        }

        // Seller
        if (record.returns_and_cancellation_policy) {
           specifications["Returns_Policy"] = record.returns_and_cancellation_policy;
        }

        await Product.findOneAndUpdate(
          { sku: record.SKU },
          { specifications }
        );
        updated++;
      }
    }

    return NextResponse.json({ message: "Successfully restored CSV specifications", count: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
