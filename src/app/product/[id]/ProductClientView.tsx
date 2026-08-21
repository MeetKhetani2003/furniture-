"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Truck, MapPin, Check, ChevronRight, ChevronDown, ChevronUp, Star, Shield, FileText, Download } from "lucide-react";
import { useCartStore } from "@/lib/stores/cartStore";
import { useWishlistStore } from "@/lib/stores/wishlistStore";
import { showToast } from "@/components/common/Toaster";
import { formatPrice } from "@/lib/utils/formatPrice";

const AccordionItem = ({ title, isOpen, onToggle, children }: { title: string, isOpen: boolean, onToggle: () => void, children: React.ReactNode }) => {
  return (
    <div className="border border-gray-200 rounded-sm mb-4 bg-white overflow-hidden">
      <button 
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <span className="font-bold text-gray-800 tracking-wide uppercase text-sm">{title}</span>
        {isOpen ? <ChevronUp size={18} className="text-gray-500" /> : <ChevronDown size={18} className="text-gray-500" />}
      </button>
      {isOpen && (
        <div className="p-6 border-t border-gray-200 animate-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  );
};

export default function ProductClientView({ product }: { product: any }) {
  // If product has variants and default variant is specified, use it, else default to null (base product) or first variant
  const initialVariantIndex = product.variants?.length > 0 ? 0 : null;
  const [activeVariantIndex, setActiveVariantIndex] = useState<number | null>(initialVariantIndex);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [pincode, setPincode] = useState("");
  const [deliveryChecked, setDeliveryChecked] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string>("details");

  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();

  const activeData = activeVariantIndex !== null && product.variants && product.variants[activeVariantIndex] 
    ? product.variants[activeVariantIndex] 
    : product;

  const activeImages = activeData.images && activeData.images.length > 0 
    ? activeData.images 
    : product.images;

  const activeSku = activeData.sku || product.sku || product._id;
  const inWishlist = isInWishlist(activeSku);

  const mergedSpecs = useMemo(() => {
    const baseSpecs = product.attributes || {};
    const variantSpecs = activeData.attributes || {};
    return { ...baseSpecs, ...variantSpecs };
  }, [product, activeData]);

  // For the separate accordions, we can still parse out the long-form policies
  const careMaintenance: Record<string, any> = {};
  const warrantySpecs: Record<string, any> = {};
  const sellerSpecs: Record<string, any> = {};

  Object.entries(mergedSpecs).forEach(([key, value]) => {
    if (!value || value === "Standard Value") return;
    const k = key.toLowerCase();
    
    if (k.includes("care") || k.includes("maintenance")) {
      careMaintenance[key] = value;
    } else if (k.includes("warranty_terms") || k.includes("warranty_summary")) {
      // Keep detailed warranty text in the accordion
      warrantySpecs[key] = value;
    } else if (k.includes("policy") || k.includes("redressal") || k.includes("shipping") || k.includes("warehouse") || k.includes("boxcount") || k.includes("seller")) {
      sellerSpecs[key] = value;
    }
  });

  const handleAddToCart = () => {
    addItem({
      productId: activeSku,
      name: activeData.name || product.name,
      slug: product.slug,
      price: activeData.price || product.price,
      mrp: activeData.mrp || product.mrp,
      image: activeImages?.[0] || "",
      color: activeData.name !== product.name ? activeData.name : undefined
    });
    showToast(`${activeData.name || product.name} added to cart`, "info");
  };

  const handleWishlist = () => {
    toggleItem({
      productId: activeSku,
      name: activeData.name || product.name,
      slug: product.slug,
      price: activeData.price || product.price,
      mrp: activeData.mrp || product.mrp,
      image: activeImages?.[0] || "",
      rating: product.rating,
      reviewCount: product.reviewCount,
    });
    showToast(inWishlist ? "Removed from wishlist" : "Added to wishlist", inWishlist ? "info" : "wishlist");
  };

  const currentPrice = activeData.price || product.price || 0;
  const currentMrp = activeData.mrp || product.mrp || 0;
  const discountPercent = currentMrp && currentPrice 
    ? Math.round(((currentMrp - currentPrice) / currentMrp) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">
      {/* Breadcrumb */}
      <div className="bg-brand-secondary py-4 border-b border-brand-border/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-wrap items-center gap-2 text-xs text-brand-muted font-medium">
          <Link href="/" className="shrink-0 hover:text-brand-primary transition-colors">Home</Link>
          <ChevronRight size={12} className="shrink-0" />
          <Link href={`/category/${product.category?.toLowerCase()}`} className="shrink-0 hover:text-brand-primary transition-colors capitalize">{product.category}</Link>
          <ChevronRight size={12} className="shrink-0" />
          <span className="text-brand-text font-semibold truncate w-full sm:w-auto">{activeData.name || product.name}</span>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-[55%_45%] gap-12">
          
          {/* ======================= */}
          {/* LEFT COLUMN - STICKY GALLERY */}
          {/* ======================= */}
          <div className="lg:sticky lg:top-24 self-start">
            
            {/* Media Gallery */}
            <div className="flex flex-col-reverse lg:flex-row gap-4 lg:h-[600px]">
              
              {/* Thumbnails */}
              <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:w-[85px] shrink-0 no-scrollbar pb-2 lg:pb-4 lg:pr-1">
                {activeImages?.map((img: string, i: number) => (
                  <button
                    key={i}
                    onMouseEnter={() => setSelectedImage(i)}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 lg:w-full aspect-square shrink-0 border rounded-lg overflow-hidden transition-all bg-brand-secondary ${
                      selectedImage === i ? "border-brand-primary" : "border-brand-border opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${i}`} className="w-full h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="relative w-full aspect-square lg:aspect-auto lg:flex-1 bg-brand-secondary border border-brand-border/60 rounded-2xl overflow-hidden flex items-center justify-center shadow-sm">
                <button 
                  onClick={handleWishlist}
                  className="absolute top-4 right-4 z-10 w-11 h-11 bg-brand-bg border border-brand-border/40 rounded-full shadow-md flex items-center justify-center text-brand-muted hover:text-red-500 transition-colors"
                >
                  <Heart className={`${inWishlist ? "fill-red-500 text-red-500" : ""} w-5 h-5`} />
                </button>
                <img
                  src={activeImages?.[selectedImage] || "https://via.placeholder.com/1200"}
                  alt={activeData.name || product.name}
                  className="w-full h-full object-contain mix-blend-multiply p-6 lg:p-4"
                />
              </div>
            </div>
            
            {/* Highlights Section */}
            {product.highlights && product.highlights.length > 0 && (
              <div className="mt-8 border border-brand-border/60 rounded-2xl p-6 bg-brand-secondary/40 shadow-sm">
                <h3 className="font-bold text-brand-text mb-4 uppercase text-xs tracking-widest font-[family-name:var(--font-inter)]">Product Highlights</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-brand-muted font-medium">
                  {product.highlights.map((highlight: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check size={16} className="text-brand-primary shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ======================= */}
          {/* RIGHT COLUMN - DETAILS */}
          {/* ======================= */}
          <div className="flex flex-col min-w-0">
            
            <div className="flex justify-between items-start gap-4 mb-2">
              <h1 className="flex-1 min-w-0 text-3xl font-light font-[family-name:var(--font-heading)] text-brand-text leading-tight break-words">
                {product.name} {activeVariantIndex !== null ? `- ${activeData.name}` : ''}
              </h1>
            </div>
            
            {product.brand && <p className="text-xs text-brand-muted uppercase tracking-widest font-bold mb-4">By <span className="text-brand-primary font-bold">{product.brand}</span></p>}

            {/* Price Box */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-bold text-brand-text font-[family-name:var(--font-heading)]">{formatPrice(currentPrice)}</span>
                {currentMrp > currentPrice && (
                  <>
                    <span className="text-sm text-brand-muted line-through font-medium">{formatPrice(currentMrp)}</span>
                    <span className="text-sm font-semibold text-brand-success">({discountPercent}% Off)</span>
                  </>
                )}
              </div>
            </div>

            {/* Variants Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-6 border-t border-brand-border/50 pt-5">
                <p className="text-xs uppercase tracking-widest font-bold text-brand-text mb-3">Select Variant: <span className="text-brand-primary">{activeVariantIndex !== null ? activeData.name : ''}</span></p>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((v: any, idx: number) => (
                    <button 
                      key={idx}
                      onClick={() => { setActiveVariantIndex(idx); setSelectedImage(0); }}
                      className={`relative w-[65px] h-[65px] border rounded-lg overflow-hidden p-0.5 group ${
                        activeVariantIndex === idx ? "border-brand-primary" : "border-brand-border hover:border-brand-primary/60"
                      }`}
                      title={v.name}
                    >
                      <img src={v.images?.[0] || product.images?.[0]} className="w-full h-full object-cover" />
                      {activeVariantIndex === idx && (
                        <div className="absolute top-0 right-0 bg-brand-primary text-brand-dark p-0.5 rounded-bl">
                          <Check size={11} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <hr className="border-brand-border/50 mb-6" />

            {/* Delivery Box */}
            <div className="mb-8 bg-brand-secondary/30 p-5 rounded-2xl border border-brand-border/40">
              <p className="text-xs uppercase tracking-widest font-bold text-brand-text mb-3">Delivery & Assembly Details</p>
              <div className="flex gap-0">
                <input 
                  type="text" 
                  maxLength={6} 
                  placeholder="Enter Pincode" 
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  className="flex-1 min-w-0 border border-brand-border bg-brand-bg rounded-l-xl py-3 px-4 text-sm focus:outline-none focus:border-brand-primary transition-colors font-medium text-brand-text" 
                />
                <button 
                  onClick={() => setDeliveryChecked(true)}
                  className="shrink-0 bg-brand-dark text-brand-primary flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs px-6 border border-l-0 border-brand-dark rounded-r-xl hover:bg-brand-primary hover:text-brand-dark transition-colors duration-300"
                >
                  <MapPin size={14} /> Locate
                </button>
              </div>
              {deliveryChecked && pincode.length === 6 ? (
                <p className="text-xs text-brand-success mt-3 font-semibold flex items-center gap-2">
                  <Truck size={14}/> Delivery by {new Date(Date.now() + (product.shipping?.delivery_time || 7) * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </p>
              ) : null}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="w-full flex-1 py-4 bg-brand-bg border border-brand-primary text-brand-primary font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-brand-primary hover:text-brand-dark transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
              >
                ADD TO CART
              </button>
              <button
                className="w-full flex-1 py-4 bg-brand-dark border border-brand-dark text-brand-primary font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-brand-primary hover:text-brand-dark transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
              >
                BUY NOW
              </button>
            </div>

            {/* ACCORDIONS */}
            <div className="border-t border-gray-200 pt-6">
              
              <AccordionItem 
                title="Product Details" 
                isOpen={openAccordion === "details"} 
                onToggle={() => setOpenAccordion(openAccordion === "details" ? "" : "details")}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {/* LEFT COLUMN ITEMS */}
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                      <span className="text-[13px] text-gray-500 mb-0.5">Brand</span>
                      <span className="text-[14px] text-gray-900 leading-snug break-words">{mergedSpecs["Brand"] || product.brand || 'N/A'}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] text-gray-500 mb-0.5">Colour</span>
                      <span className="text-[14px] text-gray-900 leading-snug break-words">{mergedSpecs["Colour"] || mergedSpecs["color_swatch"] || mergedSpecs["Wood_colour"] || 'N/A'}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] text-gray-500 mb-0.5">Dimensions (In Inches)</span>
                      <span className="text-[14px] text-gray-900 leading-snug break-words">{mergedSpecs["Dimensions (In Inches)"] || mergedSpecs["dimension"] || 'N/A'}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] text-gray-500 mb-0.5">Product Rating</span>
                      <span className="text-[14px] text-gray-900 leading-snug break-words">{product.rating ? product.rating.toFixed(1) : '4.0'}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] text-gray-500 mb-0.5">Top Material</span>
                      <span className="text-[14px] text-gray-900 leading-snug break-words">{mergedSpecs["Top Material"] || mergedSpecs["top_material"] || 'N/A'}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] text-gray-500 mb-0.5">Weight</span>
                      <span className="text-[14px] text-gray-900 leading-snug break-words">{mergedSpecs["Weight"] || mergedSpecs["furniture_weight"] || 'N/A'}</span>
                    </div>
                  </div>

                  {/* RIGHT COLUMN ITEMS */}
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                      <span className="text-[13px] text-gray-500 mb-0.5">Assembly</span>
                      <span className="text-[14px] text-gray-900 leading-snug break-words">{mergedSpecs["Assembly"] || mergedSpecs["assembly"] || 'N/A'}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] text-gray-500 mb-0.5">Dimensions (In Centimeters)</span>
                      <span className="text-[14px] text-gray-900 leading-snug break-words">{mergedSpecs["Dimensions (In Centimeters)"] || mergedSpecs["dimensions_cm"] || 'N/A'}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] text-gray-500 mb-0.5">Primary Material</span>
                      <span className="text-[14px] text-gray-900 leading-snug break-words">{mergedSpecs["Primary Material"] || mergedSpecs["furniture_material"] || 'N/A'}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] text-gray-500 mb-0.5">Room Type</span>
                      <span className="text-[14px] text-gray-900 leading-snug break-words">{mergedSpecs["Room Type"] || mergedSpecs["room_type"] || 'N/A'}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] text-gray-500 mb-0.5">Warranty</span>
                      <span className="text-[14px] text-gray-900 leading-snug break-words">{mergedSpecs["Warranty_Summary"] || mergedSpecs["manufacturer_warranty"] || '36 Months Warranty'}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] text-gray-500 mb-0.5">Sku</span>
                      <span className="text-[14px] text-gray-900 leading-snug break-words uppercase">{mergedSpecs["Sku"] || activeSku}</span>
                    </div>
                  </div>
                </div>
              </AccordionItem>

              {/* Specifications */}
              <AccordionItem 
                title="Specifications" 
                isOpen={openAccordion === "specifications"} 
                onToggle={() => setOpenAccordion(openAccordion === "specifications" ? "" : "specifications")}
              >
                <div className="text-sm text-gray-600 leading-relaxed">
                  <p className="mb-4">Accessories shown in the image are only for representation and are not part of the product.</p>
                  <p className="mb-4">Depending on your screen settings and resolution on your device there may be a slight variance in fabric color and wood polish of the image and actual product.</p>
                  <p>The Primary material is the main material used to manufacture the product and in addition to the primary material there might also be other type of materials used in the manufacturing of the product.</p>
                </div>
              </AccordionItem>

              {/* Care & Maintenance */}
              {Object.keys(careMaintenance).length > 0 && (
                <AccordionItem 
                  title="Care & Maintenance" 
                  isOpen={openAccordion === "care"} 
                  onToggle={() => setOpenAccordion(openAccordion === "care" ? "" : "care")}
                >
                  <div className="grid grid-cols-1 gap-y-6">
                    {Object.entries(careMaintenance).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-[12px] text-gray-500 capitalize mb-1">{key.replace(/_/g, ' ')}</span>
                        <span className="text-[14px] text-gray-900 leading-snug">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </AccordionItem>
              )}

              {/* Seller */}
              {Object.keys(sellerSpecs).length > 0 && (
                <AccordionItem 
                  title="Seller" 
                  isOpen={openAccordion === "seller"} 
                  onToggle={() => setOpenAccordion(openAccordion === "seller" ? "" : "seller")}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                    {Object.entries(sellerSpecs).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-[12px] text-gray-500 capitalize mb-1">{key.replace(/_/g, ' ')}</span>
                        <span className="text-[14px] text-gray-900 leading-snug">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </AccordionItem>
              )}

              {/* Warranty */}
              {Object.keys(warrantySpecs).length > 0 && (
                <AccordionItem 
                  title="Warranty" 
                  isOpen={openAccordion === "warranty"} 
                  onToggle={() => setOpenAccordion(openAccordion === "warranty" ? "" : "warranty")}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                    {Object.entries(warrantySpecs).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-[12px] text-gray-500 capitalize mb-1">{key.replace(/_/g, ' ')}</span>
                        <span className="text-[14px] text-gray-900 leading-snug">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </AccordionItem>
              )}

              {/* Dynamic Description Sections */}
              {product.description_sections && product.description_sections.length > 0 ? (
                product.description_sections.map((sec: any, idx: number) => (
                  <AccordionItem 
                    key={idx}
                    title={sec.title || "Overview"} 
                    isOpen={openAccordion === `desc-${idx}`} 
                    onToggle={() => setOpenAccordion(openAccordion === `desc-${idx}` ? "" : `desc-${idx}`)}
                  >
                    <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed text-sm whitespace-pre-wrap">
                      {sec.content}
                    </div>
                  </AccordionItem>
                ))
              ) : (
                product.description && (
                  <AccordionItem 
                    title="Overview" 
                    isOpen={openAccordion === "overview"} 
                    onToggle={() => setOpenAccordion(openAccordion === "overview" ? "" : "overview")}
                  >
                    <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: product.description }} />
                  </AccordionItem>
                )
              )}

              {/* Package Contents */}
              {product.package_contents && product.package_contents.length > 0 && product.package_contents[0] !== "" && (
                <AccordionItem 
                  title="Package Contents" 
                  isOpen={openAccordion === "package"} 
                  onToggle={() => setOpenAccordion(openAccordion === "package" ? "" : "package")}
                >
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                    {product.package_contents.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </AccordionItem>
              )}

              {/* Downloads */}
              {product.downloads && product.downloads.length > 0 && product.downloads[0].title !== "" && (
                <AccordionItem 
                  title="Downloads & Guides" 
                  isOpen={openAccordion === "downloads"} 
                  onToggle={() => setOpenAccordion(openAccordion === "downloads" ? "" : "downloads")}
                >
                  <div className="space-y-3">
                    {product.downloads.map((dl: any, idx: number) => (
                      <a key={idx} href={dl.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 border border-gray-200 rounded-sm hover:bg-gray-50 transition-colors">
                        <FileText size={20} className="text-gray-400" />
                        <span className="flex-1 text-sm font-medium text-gray-700">{dl.title}</span>
                        <Download size={18} className="text-brand-primary" />
                      </a>
                    ))}
                  </div>
                </AccordionItem>
              )}

              {/* FAQs */}
              {product.faqs && product.faqs.length > 0 && product.faqs[0].question !== "" && (
                <AccordionItem 
                  title="Frequently Asked Questions" 
                  isOpen={openAccordion === "faqs"} 
                  onToggle={() => setOpenAccordion(openAccordion === "faqs" ? "" : "faqs")}
                >
                  <div className="space-y-4">
                    {product.faqs.map((faq: any, idx: number) => (
                      <div key={idx} className="bg-brand-secondary/40 p-4 rounded-xl border border-brand-border/40">
                        <h4 className="font-bold text-brand-text text-sm mb-2 flex gap-2">
                          <span className="text-brand-primary">Q:</span> {faq.question}
                        </h4>
                        <p className="text-sm text-brand-muted leading-relaxed pl-6 font-medium">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </AccordionItem>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
