const mongoose = require('mongoose');
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

// Load models
const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    mrp: { type: Number, required: true },
    special_price: { type: Number },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    images: [{ type: String }],
    sku: { type: String, unique: true },
    merchant_sku_id: { type: String },
    barcode: { type: String },
    stock: { type: Number, default: 0 },
    status: { type: Number, default: 1 },
    dimensions: {
      height: { type: String }, width: { type: String }, depth: { type: String },
      dimensions_cm: { type: String }, dimension: { type: String },
      seating_height: { type: String }, furniture_weight: { type: String }
    },
    materials: {
      furniture_material: { type: String }, furniture_material_group: { type: String },
      top_material: { type: String }, Wood_colour: { type: String }, color_swatch: { type: String }
    },
    shipping: {
      assembly: { type: String }, free_assembly: { type: String }, free_shipping: { type: String },
      boxcount: { type: String }, warehouse_turn_around_time: { type: String }
    },
    support: {
      manufacturer_warranty: { type: String }, warranty_terms: { type: String },
      furniture_care: { type: String }, care: { type: String },
      returns_and_cancellation_policy: { type: String }, customer_redressal: { type: String }
    },
    attributes: { type: Map, of: String, default: {} },
  },
  { timestamps: true, strict: false }
);

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

async function seed() {
  if (!process.env.MONGODB_URI) {
    console.error("No MONGODB_URI found");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to DB");
  
  // Drop problematic legacy index
  try {
    await Product.collection.dropIndex('id_1');
    console.log("Dropped legacy id_1 index");
  } catch (e) {
    // Ignore if doesn't exist
  }

  const csvPath = path.join(__dirname, '../public/product details.csv');
  if (!fs.existsSync(csvPath)) {
    console.error("CSV file not found at", csvPath);
    process.exit(1);
  }

  const workbook = XLSX.readFile(csvPath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(sheet);

  console.log(`Found ${rows.length} rows to process.`);

  let added = 0;
  for (const row of rows) {
    try {
      // Basic fields
      const sku = row['SKU'];
      if (!sku) continue; // Skip empty rows

      const name = row['name'];
      let slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Math.random()*1000);
      
      const price = parseFloat(row['special_price']) || parseFloat(row['price']) || 0;
      const mrp = parseFloat(row['price']) || price;
      
      // Default image if none
      const images = ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'];

      const payload = {
        name,
        slug,
        description: row['description'] || name,
        price,
        mrp,
        special_price: parseFloat(row['special_price']) || null,
        category: row['_category'] || 'Furniture',
        brand: row['brandsname'] || 'Pepperfry',
        stock: 50,
        images,
        sku,
        id: sku, // added to fix index issue
        merchant_sku_id: row['merchant_sku_id'],
        status: row['status'] === '1' ? 1 : 0,
        dimensions: {
          height: row['height'],
          width: row['width'],
          depth: row['depth'],
          dimensions_cm: row['dimensions_cm'],
          dimension: row['dimension'],
          seating_height: row['seating_height'],
          furniture_weight: row['furniture_weight']
        },
        materials: {
          furniture_material: row['furniture_material'],
          furniture_material_group: row['furniture_material_group'],
          top_material: row['top_material'],
          Wood_colour: row['Wood_colour'],
          color_swatch: row['color_swatch']
        },
        shipping: {
          assembly: row['assembly'],
          free_assembly: row['free_assembly'],
          free_shipping: row['free_shipping'],
          boxcount: row['boxcount'],
          warehouse_turn_around_time: row['warehouse_turn_around_time']
        },
        support: {
          manufacturer_warranty: row['manufacturer_warranty'],
          warranty_terms: row['warranty_terms'],
          furniture_care: row['furniture_care'],
          care: row['care'],
          returns_and_cancellation_policy: row['returns_and_cancellation_policy'],
          customer_redressal: row['customer_redressal']
        },
        attributes: {}
      };

      // Push remaining keys to attributes
      const knownKeys = ['SKU', 'name', 'description', 'price', 'special_price', '_category', 'brandsname', 'merchant_sku_id', 'status', 'height', 'width', 'depth', 'dimensions_cm', 'dimension', 'seating_height', 'furniture_weight', 'furniture_material', 'furniture_material_group', 'top_material', 'Wood_colour', 'color_swatch', 'assembly', 'free_assembly', 'free_shipping', 'boxcount', 'warehouse_turn_around_time', 'manufacturer_warranty', 'warranty_terms', 'furniture_care', 'care', 'returns_and_cancellation_policy', 'customer_redressal'];
      
      for (const key of Object.keys(row)) {
        if (!knownKeys.includes(key)) {
          payload.attributes[key] = row[key];
        }
      }

      const existing = await Product.findOne({ sku });
      if (!existing) {
        await Product.create(payload);
        added++;
      } else {
        await Product.updateOne({ sku }, payload);
      }
    } catch (e) {
      console.error("Failed on row:", e.message);
    }
  }

  console.log(`Successfully added/updated ${added} products from CSV.`);
  process.exit(0);
}

seed();
