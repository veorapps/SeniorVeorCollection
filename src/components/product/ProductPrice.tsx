import type { CurrencyCode } from "@/domain/models";
import { cn } from "@/lib/cn";
import { formatCurrency } from "@/lib/formatCurrency";

export interface ProductPriceProps {
  className?: string;
  currency: CurrencyCode;
  price: number;
}

export function ProductPrice({ className, currency, price }: ProductPriceProps) {
  return <p className={cn("font-display text-xl text-brand-ink", className)}>{formatCurrency(price, currency)}</p>;
}
