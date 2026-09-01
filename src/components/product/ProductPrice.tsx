import type { CurrencyCode } from "@/domain/models";
import { formatCurrency } from "@/lib/formatCurrency";

export interface ProductPriceProps {
  currency: CurrencyCode;
  price: number;
}

export function ProductPrice({ currency, price }: ProductPriceProps) {
  return <p className="font-display text-xl text-brand-ink">{formatCurrency(price, currency)}</p>;
}
