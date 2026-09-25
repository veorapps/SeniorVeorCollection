import Link from "next/link";
import { BadgeCheck, Timer } from "lucide-react";
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
      {!isCollection ? <Container className="py-3"><Breadcrumb items={[{ label: "Parfümler" }]} /></Container> : null}
      {isCollection && data.hero.enabled ? (
        <section className="relative isolate overflow-hidden border-y border-brand-line bg-brand-sand">
          <Media asset={data.hero.image} className="absolute inset-0 h-full w-full object-cover object-[20%_center] sm:object-[65%_center]" loading="eager" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ivory/95 via-brand-ivory/70 to-transparent sm:from-transparent sm:via-transparent" />
          <Container className="relative min-h-[25rem] py-4 sm:min-h-[20.4rem]">
            <Breadcrumb items={[{ label: "Koleksiyon", href: "/koleksiyon" }, { label: "Parfümler" }]} />
            <div className="mt-9 max-w-[21rem] sm:mt-8 sm:max-w-[23rem]">
              <p className="text-[0.625rem] tracking-[0.18em] text-brand-gold uppercase">{data.hero.eyebrow}</p>
              <h1 className="mt-2 font-display text-[2.75rem] leading-[0.96] text-brand-ink sm:text-[3rem]">{data.hero.title}</h1>
              <p className="mt-3 max-w-[19rem] text-[0.75rem] leading-[1.45] text-brand-muted">{data.hero.description}</p>
              {data.hero.highlights?.some((highlight) => highlight.enabled) ? (
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.625rem] text-brand-gold">
                  {data.hero.highlights.filter((highlight) => highlight.enabled).sort((a, b) => a.order - b.order).map((highlight) => {
                    const Icon = highlight.id === "lasting" ? Timer : BadgeCheck;
                    return <li className="flex items-center gap-1.5" key={highlight.id}><Icon aria-hidden="true" className="size-4" strokeWidth={1.4} />{highlight.label}</li>;
                  })}
                </ul>
              ) : null}
            </div>
          </Container>
        </section>
      ) : null}
      <section className={isCollection ? "pb-2" : "py-7 lg:py-8"}>
        <Container>
          {!isCollection ? <SectionHeading description={listing.description} eyebrow={listing.eyebrow} title={listing.title} /> : null}
          <div className={isCollection ? "" : "mt-7"}><CatalogControls activeFamily={activeFamily} compact={isCollection} families={data.scentFamilies.items} sort={sort} /></div>
          <p aria-live="polite" className={isCollection ? "sr-only" : "mt-4 text-[0.75rem] text-brand-muted"}>{activeFamilyLabel ? `${activeFamilyLabel} ailesindeki ` : ""}{products.length} parfüm gösteriliyor.</p>
          <div className={isCollection ? "mt-2" : "mt-4"}><ProductGrid products={products} variant={isCollection ? "catalog" : "default"} /></div>
        </Container>
      </section>
      {isCollection && data.scentFamilies.enabled ? (
        <section className="border-y border-brand-line bg-[#f8f3ed] py-3">
          <Container>
            <h2 className="text-center font-display text-[1.375rem] leading-tight tracking-[0.06em] text-[#705630]">{data.scentFamilies.title}</h2>
            <div className="mt-2 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
              {data.scentFamilies.items.filter((family) => family.enabled).sort((a, b) => a.order - b.order).map((family) => (
                <Link aria-current={activeFamily === family.id ? "page" : undefined} className="group overflow-hidden border border-[#e8dfd3] bg-[#fffdfa] transition-colors hover:border-brand-gold" href={`/koleksiyon?family=${family.id}`} key={family.id}>
                  <Media asset={family.image} className="aspect-[2.6] object-cover transition-transform duration-300 group-hover:scale-[1.04] motion-reduce:transition-none" sizes="(min-width: 1024px) 16vw, 50vw" />
                  <div className="px-1.5 py-1 text-center">
                    <h3 className="font-display text-[0.8125rem] leading-tight text-brand-ink">{family.label}</h3>
                    <p className="mt-0.5 text-[0.625rem] leading-tight text-brand-muted">{family.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </main>
  );
}
