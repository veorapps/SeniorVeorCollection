"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Flower2, Gem, Sparkles, Trees, UsersRound, Waves } from "lucide-react";
import type { CatalogScentFamily, ProductSort, ScentFamily } from "@/domain/models";
import { cn } from "@/lib/cn";

export interface CatalogControlsProps {
  activeFamily?: ScentFamily;
  compact?: boolean;
  families: CatalogScentFamily[];
  sort: ProductSort;
}

const sortOptions: { label: string; value: ProductSort }[] = [
  { label: "En Yeniler", value: "newest" },
  { label: "Fiyat: Artan", value: "price-ascending" },
  { label: "Fiyat: Azalan", value: "price-descending" },
  { label: "En Yüksek Puan", value: "rating" },
];

const familyIcons: Record<ScentFamily, typeof Flower2> = {
  floral: Flower2,
  woody: Trees,
  amber: Gem,
  oriental: Sparkles,
  fresh: Waves,
  unisex: UsersRound,
};

export function CatalogControls({ activeFamily, compact = false, families, sort }: CatalogControlsProps) {
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
    <div className={cn("flex flex-col gap-4 border-b border-brand-line lg:flex-row lg:items-end lg:justify-between", compact ? "pb-2 pt-4" : "py-4")}>
      <div className="min-w-0">
        <p className="mb-2 text-[0.625rem] tracking-[0.11em] text-brand-gold uppercase">Koku Ailesi</p>
        <div aria-label="Koku ailesine göre filtrele" className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]" role="group">
          <button aria-pressed={!activeFamily} className={cn("min-h-8 shrink-0 border px-4 text-[0.6875rem] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal", !activeFamily ? "border-brand-teal bg-brand-teal text-brand-ivory" : "border-brand-line bg-brand-paper text-brand-ink hover:border-brand-gold")} onClick={() => update(undefined)} type="button">Tümü</button>
          {families.filter((family) => family.enabled).sort((a, b) => a.order - b.order).map((family) => {
            const Icon = familyIcons[family.id];
            return <button aria-pressed={activeFamily === family.id} className={cn("flex min-h-8 shrink-0 items-center gap-2 border px-3.5 text-[0.6875rem] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal", activeFamily === family.id ? "border-brand-teal bg-brand-teal text-brand-ivory" : "border-brand-line bg-brand-paper text-brand-ink hover:border-brand-gold")} key={family.id} onClick={() => update(family.id)} type="button"><Icon aria-hidden="true" className="size-3.5 text-brand-gold" strokeWidth={1.5} />{family.label}</button>;
          })}
        </div>
      </div>
      <label className="flex shrink-0 flex-col gap-2 text-[0.625rem] tracking-[0.11em] text-brand-gold uppercase">Sıralama
        <select aria-label="Ürün sıralaması" className="min-h-8 w-40 border border-brand-line bg-brand-paper px-3 text-[0.6875rem] font-medium tracking-normal text-brand-ink normal-case outline-none focus:border-brand-teal" onChange={(event) => update(activeFamily, event.target.value as ProductSort)} value={sort}>
          {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      </label>
    </div>
  );
}
