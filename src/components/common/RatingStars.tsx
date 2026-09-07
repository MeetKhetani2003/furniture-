import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  reviewCount?: number;
}

export default function RatingStars({ rating = 0, size = 14, showValue = false, reviewCount }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= Math.floor(rating);
          const half = !filled && star === Math.ceil(rating) && rating % 1 >= 0.5;
          return (
            <Star
              key={star}
              size={size}
              className={`${
                filled || half ? "text-amber-400 fill-amber-400" : "text-gray-300"
              }`}
            />
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm text-brand-muted ml-1">
          {(rating || 0).toFixed(1)}
          {reviewCount !== undefined && ` (${reviewCount})`}
        </span>
      )}
    </div>
  );
}
