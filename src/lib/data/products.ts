export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductDimensions {
  length: string;
  width: string;
  height: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  mrp: number;
  discountPercent: number;
  images: string[];
  rating: number;
  reviewCount: number;
  colors: ProductColor[];
  material: string;
  dimensions: ProductDimensions;
  weight: string;
  warranty: string;
  description: string;
  highlights: string[];
  inStock: boolean;
  isNew: boolean;
  isBestseller: boolean;
  tags: string[];
  deliveryDays: number;
  seller: string;
  sellerRating: number;
  attributes?: Record<string, string | number | boolean>;
}
