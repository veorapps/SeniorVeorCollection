import type { Product } from "@/domain/models";
import { uiCopy } from "@/config/uiCopy";
import { EmptyState } from "@/components/shared/EmptyState";
import { cn } from "@/lib/cn";
import { ProductCard, type ProductCardProps } from "./ProductCard";

export interface ProductGridProps {
  emptyDescription?: string;
  emptyTitle?: string;
  products: Product[];
  variant?: ProductCardProps["variant"];
}

export function ProductGrid({ emptyDescription = uiCopy.productEmptyState.description, emptyTitle = uiCopy.productEmptyState.title, products, variant }: ProductGridProps) {
  if (products.length === 0) return <EmptyState description={emptyDescription} title={emptyTitle} />;
  return <div className={cn("grid grid-cols-2 lg:grid-cols-4", variant === "catalog" ? "gap-2.5" : "gap-3 sm:gap-4")}>{products.map((product) => <ProductCard key={product.id} product={product} variant={variant} />)}</div>;
}
