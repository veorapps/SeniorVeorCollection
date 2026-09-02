"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import type { Product, ProductBadge } from "@/domain/models";
import { Badge } from "@/components/ui/Badge";
import { IconButton } from "@/components/ui/IconButton";
import { Media } from "@/components/ui/Media";
import { RatingStars } from "@/components/ui/RatingStars";
import { cn } from "@/lib/cn";
import { ProductPrice } from "./ProductPrice";
import { useCommerce } from "@/state/CommerceProvider";

const badgeLabels: Record<ProductBadge, string> = { new: "Yeni", "best-seller": "Çok Satan", limited: "Sınırlı" };

export interface ProductCardProps {
  className?: string;
  onWishlistToggle?: (productId: string) => void;
  product: Product;
  variant?: "default" | "compact" | "mini";
  wishlistActive?: boolean;
}

export function ProductCard({ className, onWishlistToggle, product, variant = "default", wishlistActive = false }: ProductCardProps) {
  const { toggleWishlist, wishlist } = useCommerce();
  const isWishlisted = wishlistActive || wishlist.includes(product.id);
  const isMini = variant === "mini";
  const isCompact = variant === "compact";
  const image = product.images[0];

  return (
    <article className={cn("group relative overflow-hidden border border-brand-line bg-brand-paper shadow-card", isMini ? "p-2" : "p-3", className)}>
      <div className="relative overflow-hidden bg-brand-ivory">
        <Link aria-label={`${product.name} ürününü incele`} className="block" href={`/parfumler/${product.slug}`}>
          <Media asset={image} className={cn("transition-transform duration-300 group-hover:scale-[1.025] motion-reduce:transition-none", isMini ? "aspect-square object-contain" : isCompact ? "aspect-[3/4] object-contain" : "aspect-[5/4] object-contain")} sizes={isMini ? "12rem" : "(min-width: 1024px) 25vw, 50vw"} />
        </Link>
        {!isMini ? <div className="absolute left-2 top-2 flex flex-col items-start gap-1">{product.badges.map((badge) => <Badge key={badge} tone={badge === "best-seller" ? "gold" : "teal"}>{badgeLabels[badge]}</Badge>)}</div> : null}
        {!isMini ? <IconButton aria-label={`${product.name} ürününü favorilere ekle`} aria-pressed={isWishlisted} className={cn("absolute right-2 top-2 bg-brand-paper/85", isWishlisted && "text-brand-gold")} onClick={() => onWishlistToggle ? onWishlistToggle(product.id) : toggleWishlist(product.id)}><Heart aria-hidden="true" className={cn("size-4", isWishlisted && "fill-current")} strokeWidth={1.4} /></IconButton> : null}
      </div>
      <div className={cn(isMini ? "pt-2" : "pt-3")}>
        <Link className="block" href={`/parfumler/${product.slug}`}><h3 className={cn("font-display text-brand-ink", isMini ? "text-base" : isCompact ? "text-lg" : "text-[1.05rem]")}>{product.name}</h3></Link>
        {!isMini ? <p className="mt-0.5 text-[0.625rem] font-medium tracking-[0.09em] text-brand-muted uppercase">{product.subtitle}</p> : null}
        {!isMini ? <RatingStars className="mt-1.5" rating={product.rating} reviewCount={product.reviewCount} showValue={false} /> : null}
        <div className={cn("flex items-center justify-between", isMini ? "mt-1" : "mt-2")}><ProductPrice currency={product.currency} price={product.price} />{!isMini ? <Link className="border-b border-brand-gold text-[0.625rem] font-semibold tracking-[0.1em] text-brand-teal uppercase" href={`/parfumler/${product.slug}`}>İncele</Link> : null}</div>
      </div>
    </article>
  );
}
