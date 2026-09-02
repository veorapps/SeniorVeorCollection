"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { CatalogScentFamily, ProductSort, ScentFamily } from "@/domain/models";
import { cn } from "@/lib/cn";

export interface CatalogControlsProps {
  activeFamily?: ScentFamily;
  families: CatalogScentFamily[];
  sort: ProductSort;
}

const sortOptions: { label: string; value: ProductSort }[] = [
  { label: "En Yeniler", value: "newest" },
  { label: "Fiyat: Artan", value: "price-ascending" },
  { label: "Fiyat: Azalan", value: "price-descending" },
  { label: "En Yüksek Puan", value: "rating" },
];

export function CatalogControls({ activeFamily, families, sort }: CatalogControlsProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  function update(nextFamily?: ScentFamily, nextSort: ProductSort = sort) {
    const params = new URLSearchParams(searchParams.toString());
    if (nextFamily) params.set("family", nextFamily); else params.delete("family");
    if (nextSort === "newest") params.delete("sort"); else params.set("sort", nextSort);
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <div className="flex flex-col gap-5 border-y border-brand-line py-5 lg:flex-row lg:items-center lg:justify-between">
      <div aria-label="Koku ailesine göre filtrele" className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        <button className={cn("min-h-10 shrink-0 border px-4 text-xs font-semibold tracking-[0.08em] uppercase transition-colors", !activeFamily ? "border-brand-teal bg-brand-teal text-brand-ivory" : "border-brand-line text-brand-ink hover:border-brand-gold")} onClick={() => update(undefined)}>Tümü</button>
        {families.filter((family) => family.enabled).sort((a, b) => a.order - b.order).map((family) => <button className={cn("min-h-10 shrink-0 border px-4 text-xs font-semibold tracking-[0.08em] uppercase transition-colors", activeFamily === family.id ? "border-brand-teal bg-brand-teal text-brand-ivory" : "border-brand-line text-brand-ink hover:border-brand-gold")} key={family.id} onClick={() => update(family.id)}>{family.label}</button>)}
      </div>
      <label className="flex items-center justify-between gap-3 text-xs font-semibold tracking-[0.08em] text-brand-muted uppercase">Sıralama
        <select aria-label="Ürün sıralaması" className="min-h-10 border border-brand-line bg-brand-paper px-3 text-xs font-medium normal-case outline-none focus:border-brand-teal" onChange={(event) => update(activeFamily, event.target.value as ProductSort)} value={sort}>
          {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      </label>
    </div>
  );
}
