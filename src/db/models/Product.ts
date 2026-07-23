import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
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
    features: [{ type: String }],
    specifications: { type: Map, of: String },
    
    sku: { type: String, unique: true },
    merchant_sku_id: { type: String },
    barcode: { type: String },
    stock: { type: Number, default: 0 },
    status: { type: Number, default: 1 },
    
    // Pepperfry structure additions
    dimensions: {
      height: { type: String },
      width: { type: String },
      depth: { type: String },
      dimensions_cm: { type: String },
      dimension: { type: String },
      seating_height: { type: String },
      furniture_weight: { type: String }
    },
    
    materials: {
      furniture_material: { type: String },
      furniture_material_group: { type: String },
      top_material: { type: String },
      Wood_colour: { type: String },
      color_swatch: { type: String }
    },
    
    shipping: {
      assembly: { type: String },
      free_assembly: { type: String },
      free_shipping: { type: String },
      boxcount: { type: String },
      warehouse_turn_around_time: { type: String }
    },
    
    support: {
      manufacturer_warranty: { type: String },
      warranty_terms: { type: String },
      furniture_care: { type: String },
      care: { type: String },
      returns_and_cancellation_policy: { type: String },
      customer_redressal: { type: String }
    },

    isNewProduct: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    
    // Nested Variants Support
    variants: [{
      name: { type: String },         // Override name
      sku: { type: String },          // Unique SKU for variant
      color_name: { type: String },   // e.g. "Gold"
      color_hex: { type: String },    // e.g. "#FFD700"
      price: { type: Number },
      mrp: { type: Number },
      special_price: { type: Number },
      stock: { type: Number, default: 0 },
      images: [{ type: String }]
    }],

    attributes: {
      type: Map,
      of: String,
      default: {}
    },
    reviews: {
      type: [{
        userName: { type: String, required: true },
        userEmail: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
      }],
      default: []
    }
  },
  { 
    timestamps: true,
    strict: false 
  }
);

if (models.Product) {
  delete (models as any).Product;
}

export const Product = models.Product || model("Product", ProductSchema);
