import mongoose, { Schema, model, models } from "mongoose";

const VariantSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String },
  sku: { type: String },
  barcode: { type: String },
  status: { type: Number, default: 1 }, // 1: Active, 0: Inactive
  isDefault: { type: Boolean, default: false },
  
  // Pricing
  price: { type: Number },
  mrp: { type: Number },
  cost_price: { type: Number },
  special_price: { type: Number },
  
  // Inventory
  stock: { type: Number, default: 0 },
  reserved_quantity: { type: Number, default: 0 },
  low_stock_alert: { type: Number, default: 0 },
  warehouse: { type: String },
  
  // Shipping & Dimensions
  weight: { type: String },
  shipping_weight: { type: String },
  dimensions: {
    length: { type: String },
    width: { type: String },
    height: { type: String }
  },
  delivery_time: { type: String },
  
  // Specific Data
  images: [{ type: String }],
  specifications: { type: Map, of: String },
  attributes: { type: Map, of: String }
});

const ProductSchema = new Schema(
  {
    // Basic Info
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    brand: { type: String },
    category: { type: String },
    subCategory: { type: String },
    collection_name: { type: String },
    productType: { type: String },
    status: { type: Number, default: 1 }, // 1: Published, 0: Draft
    
    // Flags
    isFeatured: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
    
    // Search
    searchKeywords: [{ type: String }],
    tags: [{ type: String }],
    
    // Backward Compatibility & General
    description: { type: String },
    price: { type: Number },
    mrp: { type: Number },
    special_price: { type: Number },
    images: [{ type: String }], // General images if variants aren't used
    sku: { type: String },
    barcode: { type: String },
    stock: { type: Number, default: 0 },
    
    // Rich Content
    description_sections: [{
      title: { type: String },
      content: { type: String }
    }],
    highlights: [{ type: String }],
    faqs: [{
      question: { type: String },
      answer: { type: String }
    }],
    package_contents: [{ type: String }],
    downloads: [{
      title: { type: String },
      url: { type: String }
    }],

    // Pricing Options
    offer_start_date: { type: Date },
    offer_end_date: { type: Date },
    gst: { type: Number },
    shipping_charges: { type: Number },

    // Shipping Defaults
    shipping: {
      delivery_time: { type: String },
      cod_available: { type: Boolean, default: true },
      free_shipping: { type: Boolean, default: false },
      installation_available: { type: Boolean, default: false },
      installation_charges: { type: Number, default: 0 },
      return_days: { type: Number, default: 7 },
      replacement_days: { type: Number, default: 7 }
    },
    
    // SEO
    seo: {
      metaTitle: { type: String },
      metaDescription: { type: String },
      metaKeywords: { type: String },
      canonicalUrl: { type: String },
      openGraphImage: { type: String },
      structuredData: { type: String }
    },

    // Old format backward compatibility
    features: [{ type: String }],
    specifications: { type: Map, of: String },
    attributes: { type: Map, of: String, default: {} },
    dimensions: { type: Map, of: String },
    materials: { type: Map, of: String },
    support: { type: Map, of: String },
    
    // Reviews
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    reviews: {
      type: [{
        userName: { type: String, required: true },
        userEmail: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
      }],
      default: []
    },
    
    // Variants
    variants: [VariantSchema],

    // Related Products
    relatedProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    similarProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    frequentlyBoughtTogether: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    crossSell: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    upsell: [{ type: Schema.Types.ObjectId, ref: 'Product' }],

    // Soft Delete
    isDeleted: { type: Boolean, default: false }
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
