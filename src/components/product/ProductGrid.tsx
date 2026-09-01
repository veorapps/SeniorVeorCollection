import type { Product } from "@/domain/models";
import { uiCopy } from "@/config/uiCopy";
import { EmptyState } from "@/components/shared/EmptyState";
import { ProductCard } from "./ProductCard";

export interface ProductGridProps {
  emptyDescription?: string;
  emptyTitle?: string;
  products: Product[];
}

export function ProductGrid({ emptyDescription = uiCopy.productEmptyState.description, emptyTitle = uiCopy.productEmptyState.title, products }: ProductGridProps) {
  if (products.length === 0) return <EmptyState description={emptyDescription} title={emptyTitle} />;
  return <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}
