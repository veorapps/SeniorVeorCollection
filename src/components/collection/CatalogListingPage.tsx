import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CatalogPageData, Product, ProductSort, ScentFamily } from "@/domain/models";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Media } from "@/components/ui/Media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";
import { CatalogControls } from "./CatalogControls";

export interface CatalogListingPageProps {
  activeFamily?: ScentFamily;
  data: CatalogPageData;
  mode: "collection" | "perfumes";
  products: Product[];
  sort: ProductSort;
}

export function CatalogListingPage({ activeFamily, data, mode, products, sort }: CatalogListingPageProps) {
  const listing = data.listings[mode];
  const isCollection = mode === "collection";
  const activeFamilyLabel = data.scentFamilies.items.find((family) => family.id === activeFamily)?.label;

  return (
    <main>
      <Container className="py-3"><Breadcrumb items={[{ label: isCollection ? "Koleksiyon" : "Parfümler" }]} /></Container>
      {isCollection && data.hero.enabled ? <section className="relative isolate overflow-hidden border-y border-brand-line bg-brand-sand"><Media asset={data.hero.image} className="absolute inset-0 h-full w-full object-cover object-[65%_center]" loading="eager" sizes="100vw" /><div className="absolute inset-0 bg-linear-to-r from-brand-ivory via-brand-ivory/82 to-transparent" /><Container className="relative flex min-h-[19rem] items-center py-9 lg:min-h-[20rem]"><div className="max-w-md"><p className="text-[0.625rem] font-semibold tracking-[0.22em] text-brand-gold uppercase">{data.hero.eyebrow}</p><h1 className="mt-3 font-display text-[3rem] leading-[0.92] text-brand-ink sm:text-[3.5rem]">{data.hero.title}</h1><p className="mt-4 max-w-sm text-[0.8125rem] leading-5 text-brand-muted">{data.hero.description}</p></div></Container></section> : null}
      <section className="py-7 lg:py-8"><Container>{!isCollection ? <SectionHeading description={listing.description} eyebrow={listing.eyebrow} title={listing.title} /> : null}<div className={isCollection ? "" : "mt-7"}><CatalogControls activeFamily={activeFamily} families={data.scentFamilies.items} sort={sort} /></div><p aria-live="polite" className="mt-4 text-[0.75rem] text-brand-muted">{activeFamilyLabel ? `${activeFamilyLabel} ailesindeki ` : ""}{products.length} parfüm gösteriliyor.</p><div className="mt-4"><ProductGrid products={products} /></div></Container></section>
      {isCollection && data.scentFamilies.enabled ? <section className="border-y border-brand-line bg-brand-paper py-7"><Container><SectionHeading align="center" title={data.scentFamilies.title} /><div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{data.scentFamilies.items.filter((family) => family.enabled).sort((a, b) => a.order - b.order).map((family) => <Link className="group overflow-hidden border border-brand-line bg-brand-ivory" href={`/koleksiyon?family=${family.id}`} key={family.id}><Media asset={family.image} className="aspect-[8/5] object-cover transition-transform duration-300 group-hover:scale-[1.04] motion-reduce:transition-none" sizes="(min-width: 1024px) 16vw, 50vw" /><div className="p-2.5 text-center"><h2 className="font-display text-lg text-brand-ink">{family.label}</h2><p className="mt-0.5 text-[0.6rem] tracking-[0.08em] text-brand-muted uppercase">{family.description}</p></div></Link>)}</div><div className="mt-6 text-center"><Link className="inline-flex items-center gap-2 border-b border-brand-gold pb-1 text-[0.625rem] font-semibold tracking-[0.08em] text-brand-teal uppercase" href="/parfumler">Tüm Parfümleri Gör<ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.5} /></Link></div></Container></section> : null}
    </main>
  );
}
