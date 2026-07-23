"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Truck, MapPin, Check, ChevronRight, ChevronDown, ChevronUp, Star, Shield } from "lucide-react";
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
  const [activeVariantIndex, setActiveVariantIndex] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [pincode, setPincode] = useState("");
  const [deliveryChecked, setDeliveryChecked] = useState(false);
  
  // Accordion states
  const [openAccordion, setOpenAccordion] = useState<string>("dimensions");

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

  const handleAddToCart = () => {
    addItem({
      productId: activeSku,
      name: activeData.name || product.name,
      slug: product.slug,
      price: activeData.price,
      mrp: activeData.mrp,
      image: activeImages?.[0] || "",
      color: activeData.color_name || undefined
    });
    showToast(`${activeData.name || product.name} added to cart`, "info");
  };

  const handleWishlist = () => {
    toggleItem({
      productId: activeSku,
      name: activeData.name || product.name,
      slug: product.slug,
      price: activeData.price,
      mrp: activeData.mrp,
      image: activeImages?.[0] || "",
      rating: product.rating,
      reviewCount: product.reviewCount,
    });
    showToast(inWishlist ? "Removed from wishlist" : "Added to wishlist", inWishlist ? "info" : "wishlist");
  };

  const discountPercent = activeData.mrp && activeData.price 
    ? Math.round(((activeData.mrp - activeData.price) / activeData.mrp) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#f5f5f5] py-3">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="shrink-0 hover:text-[#F26522] transition-colors">Home</Link>
          <ChevronRight size={12} className="shrink-0" />
          <Link href={`/category/${product.category?.toLowerCase()}`} className="shrink-0 hover:text-[#F26522] transition-colors">{product.category}</Link>
          <ChevronRight size={12} className="shrink-0" />
          <span className="text-gray-800 font-medium truncate w-full sm:w-auto">{activeData.name || product.name}</span>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-[55%_45%] gap-10">
          
          {/* ======================= */}
          {/* LEFT COLUMN - STICKY GALLERY */}
          {/* ======================= */}
          <div className="lg:sticky lg:top-24 self-start">
            
            {/* Media Gallery */}
            <div className="flex flex-col-reverse lg:flex-row gap-4 lg:h-[600px]">
              
              {/* Thumbnails (Horizontal on mobile, Vertical on Desktop) */}
              <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:w-[80px] shrink-0 no-scrollbar pb-2 lg:pb-4 lg:pr-1">
                {activeImages?.map((img: string, i: number) => (
                  <button
                    key={i}
                    onMouseEnter={() => setSelectedImage(i)}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 lg:w-full aspect-square shrink-0 border-2 rounded-sm overflow-hidden transition-all bg-[#f9f9f9] ${
                      selectedImage === i ? "border-[#F26522]" : "border-gray-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${i}`} className="w-full h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="relative w-full aspect-square lg:aspect-auto lg:flex-1 bg-[#f9f9f9] border border-gray-100 rounded-sm overflow-hidden flex items-center justify-center">
                <button 
                  onClick={handleWishlist}
                  className="absolute top-4 right-4 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Heart className={`${inWishlist ? "fill-red-500 text-red-500" : ""} w-5 h-5 lg:w-6 lg:h-6`} />
                </button>
                <img
                  src={activeImages?.[selectedImage] || "https://via.placeholder.com/1200"}
                  alt={activeData.name || product.name}
                  className="w-full h-full object-contain mix-blend-multiply p-4 lg:p-0"
                />
              </div>
            </div>
          </div>

          {/* ======================= */}
          {/* RIGHT COLUMN - SCROLLING DETAILS & ACCORDIONS */}
          {/* ======================= */}
          <div className="flex flex-col min-w-0">
            
            <div className="flex justify-between items-start gap-4 mb-1">
              <h1 className="flex-1 min-w-0 text-[20px] font-semibold text-gray-900 leading-[1.3] break-words">
                {activeData.name || product.name}
              </h1>
              <button className="flex items-center gap-1 text-[#F26522] text-xs font-semibold shrink-0 mt-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                Share
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mb-3">By <span className="text-[#F26522]">{product.brand}</span></p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-1 text-yellow-500 text-xs font-semibold shrink-0">
                <span className="text-gray-900">4.5</span>
                <Star size={12} className="fill-yellow-500" />
              </div>
              <span className="text-gray-300 hidden sm:block">|</span>
              <span className="text-xs text-gray-500 shrink-0">{product.support?.manufacturer_warranty || '36 Months Warranty'}</span>
              <span className="text-gray-300 hidden sm:block">|</span>
              <span className="text-[10px] bg-[#fff9f5] text-[#F26522] font-semibold px-2 py-0.5 rounded border border-[#ffecd1] shrink-0">49 People Viewing This</span>
            </div>

            {/* Price Box */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[28px] font-bold text-gray-900 leading-none">{formatPrice(activeData.price)}</span>
                {activeData.mrp > activeData.price && (
                  <>
                    <span className="text-sm text-gray-500 line-through">{formatPrice(activeData.mrp)}</span>
                    <span className="text-sm font-semibold text-green-600">({discountPercent}% Off)</span>
                  </>
                )}
              </div>
              <p className="text-[11px] text-gray-500 mb-1">EMI starting from <span className="font-semibold text-gray-800">₹437/mo</span> <span className="text-[#F26522] underline cursor-pointer">View Plans</span></p>
              <p className="text-[11px] text-[#F26522] font-semibold">Only For Today: Get Cashback Worth ₹1,000</p>
            </div>

            {/* Coupon Banner */}
            <div className="border border-[#F26522] bg-[#fff9f5] p-3 rounded-sm mb-6 flex flex-col justify-center">
              <p className="text-[15px] text-gray-800">To Get This Price, Apply Coupon: <span className="font-bold text-[#F26522]">MONSOON</span></p>
              <p className="text-[9px] text-gray-400 text-right mt-1">*T&C Apply</p>
            </div>

            {/* Variants Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <p className="text-[13px] font-semibold text-gray-900 mb-2">Select Colour</p>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => { setActiveVariantIndex(null); setSelectedImage(0); }}
                    className={`w-[60px] h-[60px] border-2 rounded-sm overflow-hidden p-0.5 ${
                      activeVariantIndex === null ? "border-[#F26522]" : "border-gray-200"
                    }`}
                  >
                    <img src={product.images?.[0]} className="w-full h-full object-cover" />
                  </button>
                  {product.variants.map((v: any, idx: number) => (
                    <button 
                      key={idx}
                      onClick={() => { setActiveVariantIndex(idx); setSelectedImage(0); }}
                      className={`w-[60px] h-[60px] border-2 rounded-sm overflow-hidden p-0.5 ${
                        activeVariantIndex === idx ? "border-[#F26522]" : "border-gray-200"
                      }`}
                    >
                      <img src={v.images?.[0]} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <hr className="border-gray-200 mb-6" />

            {/* Delivery Box */}
            <div className="mb-6">
              <p className="text-[13px] font-semibold text-gray-900 mb-3">Delivery & Assembly Details</p>
              <div className="flex gap-0">
                <input 
                  type="text" 
                  maxLength={6} 
                  placeholder="Enter Pincode" 
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  className="flex-1 min-w-0 border border-gray-300 rounded-l-sm py-2 px-3 text-xs focus:outline-none focus:border-[#F26522] transition-colors" 
                />
                <button 
                  onClick={() => setDeliveryChecked(true)}
                  className="shrink-0 text-[#F26522] flex items-center justify-center gap-1 font-semibold text-xs px-4 border border-l-0 border-gray-300 rounded-r-sm hover:bg-gray-50 transition-colors"
                >
                  <MapPin size={12} /> Locate
                </button>
              </div>
              {deliveryChecked && pincode.length === 6 ? (
                <p className="text-xs text-green-700 mt-2">Delivery by {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
              ) : (
                <p className="text-[11px] text-gray-500 mt-2">Add Pincode to get Delivery and Assembly Details</p>
              )}
            </div>

            <hr className="border-gray-200 mb-6" />

            {/* Protect Your Furniture Mock */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Shield size={16} className="text-[#F26522] shrink-0" />
                <p className="text-[13px] font-semibold text-gray-900">Protect Your Furniture <span className="text-[#F26522] underline text-xs font-normal cursor-pointer ml-1">View Plans</span></p>
              </div>
              <p className="text-[10px] text-gray-500 mb-3">Get fast, easy protection with XCover.com—covering damage and defects outside warranty.</p>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <select className="flex-1 min-w-0 border border-gray-300 text-xs py-2.5 px-3 rounded-sm outline-none focus:border-[#F26522]">
                  <option>1-Year Protection Plan for ₹431</option>
                  <option>2-Year Protection Plan for ₹750</option>
                </select>
                <button className="shrink-0 bg-[#F26522] text-white text-xs font-bold py-2.5 px-6 rounded-sm">ADD PLAN</button>
              </div>
            </div>

            <hr className="border-gray-200 mb-6" />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-8">
              <select className="w-full sm:w-auto border border-gray-300 text-xs py-3.5 px-4 rounded-sm outline-none">
                <option>QTY 1</option>
                <option>QTY 2</option>
                <option>QTY 3</option>
              </select>
              <button
                onClick={handleAddToCart}
                className="w-full flex-1 py-3 bg-white border border-[#F26522] text-[#F26522] font-semibold text-sm rounded-sm hover:bg-[#fff9f5] transition-colors flex items-center justify-center gap-2"
              >
                ADD TO CART
              </button>
              <button
                className="w-full flex-1 py-3 bg-[#F26522] border border-[#F26522] text-white font-semibold text-sm rounded-sm hover:bg-[#d95e00] transition-colors"
              >
                BUY NOW
              </button>
            </div>

            {/* Stores Near You Mock */}
            <div className="border-t border-gray-200">
              <button className="w-full py-4 flex items-center justify-between group">
                <span className="text-[13px] font-semibold text-gray-900">Stores Near You</span>
                <ChevronDown size={16} className="text-gray-400 group-hover:text-gray-600" />
              </button>
              <p className="text-[11px] text-[#F26522] pb-4"><span className="underline cursor-pointer">Enter Pincode</span> <span className="text-gray-500 line-through underline-none">for Details</span></p>
            </div>

            {/* ACCORDIONS */}
            <div className="border-t border-gray-200 pt-0">
              
              <AccordionItem 
                title="Product Details" 
                isOpen={openAccordion === "dimensions"} 
                onToggle={() => setOpenAccordion(openAccordion === "dimensions" ? "" : "dimensions")}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 sm:gap-y-6 text-xs">
                  {/* Left Column Data */}
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1"><span className="text-gray-500 font-medium">Brand</span><span className="text-gray-900">{product.brand}</span></div>
                    <div className="flex flex-col gap-1"><span className="text-gray-500 font-medium">Colour</span><span className="text-gray-900">{activeData.color_name || product.materials?.Wood_colour || 'Standard'}</span></div>
                    {product.dimensions?.dimension && <div className="flex flex-col gap-1"><span className="text-gray-500 font-medium">Dimensions (In Inches)</span><span className="text-gray-900">{product.dimensions.dimension}</span></div>}
                    <div className="flex flex-col gap-1"><span className="text-gray-500 font-medium">Product Rating</span><span className="text-gray-900">5.0</span></div>
                    {product.materials?.top_material && <div className="flex flex-col gap-1"><span className="text-gray-500 font-medium">Top Material</span><span className="text-gray-900">{product.materials.top_material}</span></div>}
                    {product.dimensions?.furniture_weight && <div className="flex flex-col gap-1"><span className="text-gray-500 font-medium">Weight</span><span className="text-gray-900">{product.dimensions.furniture_weight}</span></div>}
                  </div>

                  {/* Right Column Data */}
                  <div className="flex flex-col gap-4">
                    {product.shipping?.assembly && <div className="flex flex-col gap-1"><span className="text-gray-500 font-medium">Assembly</span><span className="text-gray-900">{product.shipping.assembly}</span></div>}
                    {product.dimensions?.dimensions_cm && <div className="flex flex-col gap-1"><span className="text-gray-500 font-medium">Dimensions (In Centimeters)</span><span className="text-gray-900">{product.dimensions.dimensions_cm}</span></div>}
                    {product.materials?.furniture_material && <div className="flex flex-col gap-1"><span className="text-gray-500 font-medium">Primary Material</span><span className="text-gray-900">{product.materials.furniture_material}</span></div>}
                    <div className="flex flex-col gap-1"><span className="text-gray-500 font-medium">Room Type</span><span className="text-gray-900">Living Room</span></div>
                    <div className="flex flex-col gap-1"><span className="text-gray-500 font-medium">Warranty</span><span className="text-gray-900">{product.support?.manufacturer_warranty || '36 Months'}</span></div>
                    <div className="flex flex-col gap-1"><span className="text-gray-500 font-medium">Sku</span><span className="text-gray-900">{activeSku}</span></div>
                  </div>
                </div>
              </AccordionItem>

              <AccordionItem 
                title="Specifications" 
                isOpen={openAccordion === "specifications"} 
                onToggle={() => setOpenAccordion(openAccordion === "specifications" ? "" : "specifications")}
              >
                <div className="text-xs text-gray-700">Detailed specifications will go here.</div>
              </AccordionItem>

              <AccordionItem 
                title="Brand & Collection Overview" 
                isOpen={openAccordion === "overview"} 
                onToggle={() => setOpenAccordion(openAccordion === "overview" ? "" : "overview")}
              >
                <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed text-xs" dangerouslySetInnerHTML={{ __html: product.description }} />
              </AccordionItem>

              <AccordionItem 
                title="Care & Maintenance" 
                isOpen={openAccordion === "care"} 
                onToggle={() => setOpenAccordion(openAccordion === "care" ? "" : "care")}
              >
                <div className="prose prose-sm max-w-none text-gray-700 text-xs">
                  {product.support?.care ? (
                    <div dangerouslySetInnerHTML={{ __html: product.support.care }} />
                  ) : (
                    <p>Wipe clean with a dry cloth. Do not use strong liquid cleaners.</p>
                  )}
                </div>
              </AccordionItem>

              <AccordionItem 
                title="Seller" 
                isOpen={openAccordion === "seller"} 
                onToggle={() => setOpenAccordion(openAccordion === "seller" ? "" : "seller")}
              >
                <div className="text-xs text-gray-700">Sold by {product.brand}.</div>
              </AccordionItem>

              <AccordionItem 
                title="Warranty" 
                isOpen={openAccordion === "warranty"} 
                onToggle={() => setOpenAccordion(openAccordion === "warranty" ? "" : "warranty")}
              >
                <div className="prose prose-sm max-w-none text-gray-700 text-xs">
                  <h4 className="font-bold mb-2 text-gray-900">Manufacturer Warranty: {product.support?.manufacturer_warranty || 'Not specified'}</h4>
                  {product.support?.warranty_terms ? (
                    <div dangerouslySetInnerHTML={{ __html: product.support.warranty_terms }} />
                  ) : (
                    <p>Standard warranty applies.</p>
                  )}
                </div>
              </AccordionItem>

              <AccordionItem 
                title="Q&A" 
                isOpen={openAccordion === "qa"} 
                onToggle={() => setOpenAccordion(openAccordion === "qa" ? "" : "qa")}
              >
                <div className="text-xs text-gray-700">No questions asked yet. Be the first!</div>
              </AccordionItem>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
