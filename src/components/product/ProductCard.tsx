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
  variant?: "default" | "compact" | "mini" | "showcase" | "catalog";
  wishlistActive?: boolean;
}

export function ProductCard({ className, onWishlistToggle, product, variant = "default", wishlistActive = false }: ProductCardProps) {
  const { toggleWishlist, wishlist } = useCommerce();
  const isWishlisted = wishlistActive || wishlist.includes(product.id);
  const isMini = variant === "mini";
  const isCompact = variant === "compact";
  const isShowcase = variant === "showcase";
  const image = product.images[0];

  if (variant === "catalog") {
    return (
      <article className={cn("group relative overflow-hidden border border-[#ece6dd] bg-[#fffdfa] text-center", className)}>
        <div className="relative bg-[#faf7f2]">
          <Link aria-label={`${product.name} ürününü incele`} className="block" href={`/parfumler/${product.slug}`}>
            <Media asset={image} className="aspect-[2] object-contain! transition-transform duration-300 group-hover:scale-[1.025] motion-reduce:transition-none" sizes="(min-width: 1024px) 25vw, 50vw" />
          </Link>
          <IconButton aria-label={`${product.name} ürününü favorilere ekle`} aria-pressed={isWishlisted} className={cn("absolute right-1 top-1 size-7 bg-[#fffdfa]/80 text-brand-gold", isWishlisted && "text-brand-gold")} onClick={() => onWishlistToggle ? onWishlistToggle(product.id) : toggleWishlist(product.id)} size="sm"><Heart aria-hidden="true" className={cn("size-3.5", isWishlisted && "fill-current")} strokeWidth={1.4} /></IconButton>
        </div>
        <div className="px-2 pb-2 pt-1.5">
          <Link className="block" href={`/parfumler/${product.slug}`}><h3 className="font-display text-[0.875rem] leading-[1.1] text-brand-ink">{product.name}</h3></Link>
          <p className="mt-0.5 text-[0.5625rem] leading-3 tracking-[0.055em] text-brand-muted uppercase">{product.subtitle}</p>
          <RatingStars className="mt-0.5 justify-center gap-1 [&_svg]:size-2.5 [&_span]:text-[0.5625rem]" rating={product.rating} reviewCount={product.reviewCount} showValue={false} />
          <ProductPrice className="mt-0.5 text-[0.9375rem] font-semibold leading-5" currency={product.currency} price={product.price} />
          <Link className="mx-auto mt-0.5 flex min-h-5 w-[82%] items-center justify-center border border-[#d7ccbe] text-[0.5625rem] tracking-[0.08em] text-brand-ink uppercase transition-colors hover:border-brand-gold hover:text-brand-teal" href={`/parfumler/${product.slug}`}>İncele</Link>
        </div>
      </article>
    );
  }

  return (
    <article className={cn("group relative overflow-hidden border border-brand-line bg-brand-paper", isShowcase ? "border-[#ebe5dc] bg-[#fffdf9] p-1.5 text-center" : "shadow-card", isMini ? "p-2" : isShowcase ? "" : "p-3", className)}>
      <div className="relative overflow-hidden bg-brand-ivory">
        <Link aria-label={`${product.name} ürününü incele`} className="block" href={`/parfumler/${product.slug}`}>
          <Media asset={image} className={cn("transition-transform duration-300 group-hover:scale-[1.025] motion-reduce:transition-none", isMini ? "aspect-square object-contain" : isCompact ? "aspect-[3/4] object-contain" : isShowcase ? "aspect-[4/3] object-contain" : "aspect-[5/4] object-contain")} sizes={isMini ? "12rem" : "(min-width: 1024px) 20vw, 50vw"} />
        </Link>
        {!isMini && !isShowcase ? <div className="absolute left-2 top-2 flex flex-col items-start gap-1">{product.badges.map((badge) => <Badge key={badge} tone={badge === "best-seller" ? "gold" : "teal"}>{badgeLabels[badge]}</Badge>)}</div> : null}
        {!isMini && !isShowcase ? <IconButton aria-label={`${product.name} ürününü favorilere ekle`} aria-pressed={isWishlisted} className={cn("absolute right-2 top-2 bg-brand-paper/85", isWishlisted && "text-brand-gold")} onClick={() => onWishlistToggle ? onWishlistToggle(product.id) : toggleWishlist(product.id)}><Heart aria-hidden="true" className={cn("size-4", isWishlisted && "fill-current")} strokeWidth={1.4} /></IconButton> : null}
      </div>
      <div className={cn(isMini ? "pt-2" : isShowcase ? "px-1 pb-1.5 pt-1.5" : "pt-3")}>
        <Link className="block" href={`/parfumler/${product.slug}`}><h3 className={cn("font-display text-brand-ink", isMini ? "text-base" : isShowcase ? "text-[1rem] leading-tight" : isCompact ? "text-lg" : "text-[1.05rem]")}>{product.name}</h3></Link>
        {!isMini ? <p className={cn("mt-0.5 font-medium tracking-[0.09em] text-brand-muted uppercase", isShowcase ? "text-[0.5625rem]" : "text-[0.625rem]")}>{product.subtitle}</p> : null}
        {!isMini ? <RatingStars className={cn("mt-1.5", isShowcase && "justify-center gap-1")} rating={product.rating} reviewCount={product.reviewCount} showValue={false} /> : null}
        {isShowcase ? <><div className="mt-0.5 flex justify-center"><ProductPrice className="text-[1.1rem] font-semibold" currency={product.currency} price={product.price} /></div><Link className="mx-auto mt-1.5 flex min-h-7 w-[58%] items-center justify-center border border-[#d7ccbe] text-[0.5625rem] font-semibold tracking-[0.1em] text-[#705630] uppercase" href={`/parfumler/${product.slug}`}>İncele</Link></> : <div className={cn("flex items-center justify-between", isMini ? "mt-1" : "mt-2")}><ProductPrice currency={product.currency} price={product.price} />{!isMini ? <Link className="border-b border-brand-gold text-[0.625rem] font-semibold tracking-[0.1em] text-brand-teal uppercase" href={`/parfumler/${product.slug}`}>İncele</Link> : null}</div>}
      </div>
    </article>
  );
}
