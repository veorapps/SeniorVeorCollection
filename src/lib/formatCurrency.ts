import type { CurrencyCode } from "@/domain/models";

export function formatCurrency(amount: number, currency: CurrencyCode = "TRY"): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
