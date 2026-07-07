"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  Wrench,
  Star,
  ChevronRight,
  Minus,
  Plus,
  Check,
  MapPin,
  Package,
  Store,
} from "lucide-react";
import { getProductById, getRelatedProducts } from "@/lib/data/products";
import { useCartStore } from "@/lib/stores/cartStore";
import { useWishlistStore } from "@/lib/stores/wishlistStore";
import { showToast } from "@/components/common/Toaster";
import RatingStars from "@/components/common/RatingStars";
import PriceDisplay from "@/components/common/PriceDisplay";
import ProductCard from "@/components/common/ProductCard";
import Breadcrumb from "@/components/common/Breadcrumb";
import { formatPrice } from "@/lib/utils/formatPrice";

export default function ProductDetailPage() {
  const params = useParams();
  const product = getProductById(params.id as string);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || "");
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [deliveryChecked, setDeliveryChecked] = useState(false);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews" | "qa">("desc");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [specCategory, setSpecCategory] = useState("General Details");

  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();

  if (!product) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-text mb-2">Product Not Found</h1>
          <Link href="/" className="text-brand-primary hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const relatedProducts = getRelatedProducts(product.id);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      mrp: product.mrp,
      image: product.images[0],
      color: selectedColor,
    });
    showToast(`${product.name} added to cart`, "info");
  };

  const handleWishlist = () => {
    toggleItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      mrp: product.mrp,
      image: product.images[0],
      rating: product.rating,
      reviewCount: product.reviewCount,
    });
    showToast(inWishlist ? "Removed from wishlist" : "Added to wishlist", inWishlist ? "info" : "wishlist");
  };

  const checkDelivery = () => {
    if (pincode.length === 6) {
      setDeliveryChecked(true);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20 py-6">
        <Breadcrumb
          items={[
            { label: product.category.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "), href: `/category/${product.category}` },
            { label: product.subcategory.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "), href: `/products/${product.subcategory}` },
            { label: product.name },
          ]}
        />

        <div className="grid lg:grid-cols-[1fr_420px] gap-8 lg:gap-12 mt-4">
          {/* Left - Images */}
          <div>
            <div className="bg-white rounded-xl border border-brand-border/50 overflow-hidden mb-4">
              <div className="aspect-square relative group">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                    selectedImage === i ? "border-brand-primary" : "border-brand-border"
                  }`}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Info */}
          <div>
            <p className="text-sm text-brand-muted mb-1">{product.brand}</p>
            <h1 className="font-[family-name:var(--font-playfair)] text-2xl lg:text-3xl font-bold text-brand-text mb-3">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mb-4">
              <RatingStars rating={product.rating} size={16} showValue />
              <span className="text-sm text-brand-muted">|</span>
              <span className="text-sm text-brand-primary">{product.reviewCount} Reviews</span>
            </div>

            <PriceDisplay price={product.price} mrp={product.mrp} discountPercent={product.discountPercent} size="lg" />
            <p className="text-sm text-brand-muted mt-2">
              EMI from {formatPrice(Math.round(product.price / 12))}/month
            </p>

            {/* Color Selector */}
            {product.colors.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-medium text-brand-text mb-2">
                  Color: <span className="text-brand-muted">{selectedColor}</span>
                </p>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === c.name ? "border-brand-primary scale-110" : "border-brand-border"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mt-6">
              <p className="text-sm font-medium text-brand-text mb-2">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-brand-border flex items-center justify-center hover:bg-brand-secondary transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-brand-border flex items-center justify-center hover:bg-brand-secondary transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 bg-brand-primary text-white font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-brand-dark transition-colors"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
              <div className="flex gap-3">
                <button
                  onClick={handleWishlist}
                  className={`flex-1 py-3.5 border-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                    inWishlist
                      ? "border-red-400 text-red-500"
                      : "border-brand-border text-brand-text hover:border-brand-primary"
                  }`}
                >
                  <Heart size={18} className={inWishlist ? "fill-red-500" : ""} />
                  {inWishlist ? "Saved" : "Wishlist"}
                </button>
                <Link
                  href="/checkout"
                  className="flex-1 py-3.5 bg-brand-dark text-white font-medium rounded-lg text-center hover:bg-brand-text transition-colors"
                >
                  Buy Now
                </Link>
              </div>
            </div>

            {/* Delivery Check */}
            <div className="mt-6 bg-white rounded-xl p-4 border border-brand-border/50">
              <p className="text-sm font-medium text-brand-text mb-2 flex items-center gap-2">
                <MapPin size={16} /> Check Delivery
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="flex-1 h-10 px-3 border border-brand-border rounded-lg text-sm focus:outline-none focus:border-brand-primary"
                />
                <button
                  onClick={checkDelivery}
                  className="h-10 px-4 bg-brand-primary text-white text-sm font-medium rounded-lg hover:bg-brand-dark transition-colors"
                >
                  Check
                </button>
              </div>
              {deliveryChecked && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 text-sm"
                >
                  <p className="text-green-600 flex items-center gap-1">
                    <Check size={14} /> Delivery available by {new Date(Date.now() + product.deliveryDays * 86400000).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" })}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Highlights */}
            <div className="mt-6 space-y-2">
              {product.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-brand-muted">
                  <Check size={14} className="text-green-500 shrink-0" />
                  {h}
                </div>
              ))}
            </div>

            {/* Seller */}
            <div className="mt-6 bg-white rounded-xl p-4 border border-brand-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Store size={18} className="text-brand-primary" />
                  <div>
                    <p className="text-sm font-medium">Sold by {product.seller}</p>
                    <RatingStars rating={product.sellerRating} size={12} showValue />
                  </div>
                </div>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">Assured</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <div className="flex gap-1 bg-brand-secondary rounded-lg p-1 overflow-x-auto">
            {[
              { key: "desc" as const, label: "Description" },
              { key: "specs" as const, label: "Specifications" },
              { key: "reviews" as const, label: `Reviews (${product.reviewCount})` },
              { key: "qa" as const, label: "Q&A" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2.5 rounded-md text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.key
                    ? "bg-white text-brand-primary shadow-sm"
                    : "text-brand-muted hover:text-brand-text"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 bg-white rounded-xl p-6 border border-brand-border/50"
            >
              {activeTab === "desc" && (
                <div className="prose max-w-none">
                  <p className="text-brand-muted leading-relaxed">{product.description}</p>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="bg-brand-secondary/50 rounded-lg p-4">
                      <Package size={20} className="text-brand-primary mb-2" />
                      <p className="font-medium text-sm">Easy Assembly</p>
                      <p className="text-xs text-brand-muted">Comes with detailed instructions</p>
                    </div>
                    <div className="bg-brand-secondary/50 rounded-lg p-4">
                      <Truck size={20} className="text-brand-primary mb-2" />
                      <p className="font-medium text-sm">Free Delivery</p>
                      <p className="text-xs text-brand-muted">On orders above ₹10,000</p>
                    </div>
                    <div className="bg-brand-secondary/50 rounded-lg p-4">
                      <Shield size={20} className="text-brand-primary mb-2" />
                      <p className="font-medium text-sm">{product.warranty} Warranty</p>
                      <p className="text-xs text-brand-muted">Manufacturer warranty included</p>
                    </div>
                    <div className="bg-brand-secondary/50 rounded-lg p-4">
                      <Wrench size={20} className="text-brand-primary mb-2" />
                      <p className="font-medium text-sm">Expert Support</p>
                      <p className="text-xs text-brand-muted">24/7 customer service</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "specs" && (
                <div>
                  {/* Spec Categories Tabs */}
                  <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1.5 hide-scrollbar">
                    {["General Details", "Dimensions & Weight", "Material & Finish", "Warranty & Support", "Other Features"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSpecCategory(cat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                          specCategory === cat
                            ? "bg-brand-primary text-white"
                            : "bg-brand-secondary/50 text-brand-muted hover:bg-brand-secondary"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="border border-brand-border/50 rounded-lg overflow-hidden">
                    <table className="w-full text-xs text-left">
                      <tbody>
                        {(() => {
                          const allSpecs = [
                            { label: "Material", value: product.material },
                            { label: "Dimensions (L x W x H)", value: `${product.dimensions.length} x ${product.dimensions.width} x ${product.dimensions.height}` },
                            { label: "Weight", value: product.weight },
                            { label: "Warranty", value: product.warranty },
                            { label: "Brand", value: product.brand },
                            { label: "Delivery", value: `${product.deliveryDays} days` },
                            { label: "Category", value: product.category },
                            { label: "Seller", value: product.seller },
                            ...(product.attributes ? Object.entries(product.attributes).map(([key, value]) => ({ label: key, value: String(value) })) : []),
                          ];

                          const categorizedSpecs = allSpecs.filter((spec) => {
                            const lbl = spec.label.toLowerCase();
                            const isDim = ["dimension", "weight", "length", "height", "width", "size", "area", "capacity", "diameter"].some(k => lbl.includes(k));
                            const isMat = ["material", "color", "finish", "fabric", "wood", "metal", "glass", "paint", "texture"].some(k => lbl.includes(k));
                            const isWar = ["warranty", "return", "support", "service", "guarantee"].some(k => lbl.includes(k));
                            const isGen = ["brand", "category", "seller", "delivery", "status", "code", "name", "id"].some(k => lbl.includes(k)) && !isDim && !isMat && !isWar;
                            
                            if (specCategory === "Dimensions & Weight") return isDim;
                            if (specCategory === "Material & Finish") return isMat;
                            if (specCategory === "Warranty & Support") return isWar;
                            if (specCategory === "General Details") return isGen;
                            return !isDim && !isMat && !isWar && !isGen; // Other
                          });

                          if (categorizedSpecs.length === 0) {
                            return (
                              <tr>
                                <td className="py-8 text-center text-brand-muted">No specifications found in this category.</td>
                              </tr>
                            );
                          }

                          return categorizedSpecs.map((spec, index) => (
                            <tr key={spec.label + index} className={index % 2 === 0 ? "bg-brand-secondary/30" : "bg-white"}>
                              <th className="py-2 px-3 font-medium text-brand-muted w-1/3 border-r border-brand-border/30">{spec.label}</th>
                              <td className="py-2 px-3 text-brand-text">{spec.value}</td>
                            </tr>
                          ));
                        })()}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  <div className="flex items-center gap-6 mb-6 pb-6 border-b border-brand-border/50">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-brand-text">{product.rating}</div>
                      <RatingStars rating={product.rating} size={16} />
                      <p className="text-sm text-brand-muted mt-1">{product.reviewCount} reviews</p>
                    </div>
                    <div className="flex-1 space-y-1">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center gap-2">
                          <span className="text-xs w-3">{star}</span>
                          <Star size={12} className="text-amber-400 fill-amber-400" />
                          <div className="flex-1 h-2 bg-brand-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-400 rounded-full"
                              style={{ width: `${Math.random() * 60 + 10}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Write Review */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Write a Review</h4>
                    <div className="flex gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button key={s} onClick={() => setReviewRating(s)}>
                          <Star
                            size={20}
                            className={s <= reviewRating ? "text-amber-400 fill-amber-400" : "text-gray-300"}
                          />
                        </button>
                      ))}
                    </div>
                    <textarea
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Share your experience with this product..."
                      className="w-full h-24 p-3 border border-brand-border rounded-lg text-sm focus:outline-none focus:border-brand-primary resize-none"
                    />
                    <button
                      onClick={() => {
                        if (reviewText.trim()) {
                          showToast("Review submitted successfully!", "success");
                          setReviewText("");
                        }
                      }}
                      className="mt-2 px-6 py-2 bg-brand-primary text-white text-sm font-medium rounded-lg hover:bg-brand-dark transition-colors"
                    >
                      Submit Review
                    </button>
                  </div>

                  {/* Sample Reviews */}
                  <div className="space-y-4">
                    {[
                      { name: "Amit K.", rating: 5, date: "2 weeks ago", text: "Excellent quality! The wood finish is beautiful and it was very easy to assemble." },
                      { name: "Sneha R.", rating: 4, date: "1 month ago", text: "Great product for the price. Delivery was on time and packaging was secure." },
                      { name: "Vikram M.", rating: 5, date: "2 months ago", text: "Exceeded my expectations. The craftsmanship is top-notch. Highly recommend!" },
                    ].map((review, i) => (
                      <div key={i} className="bg-brand-secondary/30 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center text-xs font-bold">
                              {review.name[0]}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{review.name}</p>
                              <p className="text-xs text-brand-muted">{review.date}</p>
                            </div>
                          </div>
                          <RatingStars rating={review.rating} size={12} />
                        </div>
                        <p className="text-sm text-brand-muted">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "qa" && (
                <div className="space-y-4">
                  {[
                    { q: "Is assembly required?", a: "Yes, but it comes with detailed instructions and all necessary tools. Most customers assemble it within 30-45 minutes." },
                    { q: "What is the return policy?", a: "We offer a 30-day return policy. The product must be in original condition with all packaging." },
                    { q: "Do you offer custom sizes?", a: "Currently we do not offer custom sizes, but we have a wide range of dimensions to choose from." },
                    { q: "Is the wood treated for termites?", a: "Yes, all our wooden furniture is pre-treated with anti-termite solution during manufacturing." },
                  ].map((qa, i) => (
                    <div key={i} className="bg-brand-secondary/30 rounded-lg p-4">
                      <p className="font-medium text-sm text-brand-text mb-1">Q: {qa.q}</p>
                      <p className="text-sm text-brand-muted">A: {qa.a}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Similar Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-brand-text mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
