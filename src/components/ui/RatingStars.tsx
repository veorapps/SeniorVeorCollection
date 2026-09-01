import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

export interface RatingStarsProps {
  className?: string;
  rating: number;
  reviewCount?: number;
  showValue?: boolean;
}

export function RatingStars({ className, rating, reviewCount, showValue = true }: RatingStarsProps) {
  const roundedRating = Math.max(0, Math.min(5, Math.round(rating)));
  const label = `${rating.toFixed(1)} / 5${reviewCount !== undefined ? `, ${reviewCount} değerlendirme` : ""}`;

  return (
    <div aria-label={label} className={cn("flex items-center gap-1.5", className)} role="img">
      <span aria-hidden="true" className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            className={cn("size-3", index < roundedRating ? "fill-brand-gold text-brand-gold" : "fill-transparent text-brand-sand-deep")}
            key={index}
            strokeWidth={1.5}
          />
        ))}
      </span>
      {showValue ? <span className="text-xs text-brand-muted">{rating.toFixed(1)}</span> : null}
      {reviewCount !== undefined ? <span className="text-xs text-brand-muted">({reviewCount})</span> : null}
    </div>
  );
}
