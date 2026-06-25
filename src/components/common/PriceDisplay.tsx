import { formatPrice } from "@/lib/utils/formatPrice";

interface PriceDisplayProps {
  price: number;
  mrp: number;
  discountPercent: number;
  size?: "sm" | "md" | "lg";
}

export default function PriceDisplay({ price, mrp, discountPercent, size = "md" }: PriceDisplayProps) {
  const sizeClasses = {
    sm: { price: "text-base", mrp: "text-xs", badge: "text-[10px]" },
    md: { price: "text-lg", mrp: "text-sm", badge: "text-xs" },
    lg: { price: "text-2xl", mrp: "text-base", badge: "text-sm" },
  };

  const s = sizeClasses[size];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className={`${s.price} font-bold text-brand-text`}>{formatPrice(price)}</span>
      <span className={`${s.mrp} text-brand-muted line-through`}>{formatPrice(mrp)}</span>
      {discountPercent > 0 && (
        <span className={`${s.badge} px-1.5 py-0.5 bg-green-100 text-green-700 rounded font-medium`}>
          {discountPercent}% OFF
        </span>
      )}
    </div>
  );
}
