import Link from "next/link";
import { ArrowRight, BadgeCheck, Timer } from "lucide-react";
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
      <section className={isCollection ? "pb-7 lg:pb-8" : "py-7 lg:py-8"}>
        <Container>
          {!isCollection ? <SectionHeading description={listing.description} eyebrow={listing.eyebrow} title={listing.title} /> : null}
          <div className={isCollection ? "" : "mt-7"}><CatalogControls activeFamily={activeFamily} families={data.scentFamilies.items} sort={sort} /></div>
          <p aria-live="polite" className={isCollection ? "sr-only" : "mt-4 text-[0.75rem] text-brand-muted"}>{activeFamilyLabel ? `${activeFamilyLabel} ailesindeki ` : ""}{products.length} parfüm gösteriliyor.</p>
          <div className="mt-4"><ProductGrid products={products} /></div>
        </Container>
      </section>
      {isCollection && data.scentFamilies.enabled ? <section className="border-y border-brand-line bg-brand-paper py-7"><Container><SectionHeading align="center" title={data.scentFamilies.title} /><div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{data.scentFamilies.items.filter((family) => family.enabled).sort((a, b) => a.order - b.order).map((family) => <Link className="group overflow-hidden border border-brand-line bg-brand-ivory" href={`/koleksiyon?family=${family.id}`} key={family.id}><Media asset={family.image} className="aspect-[8/5] object-cover transition-transform duration-300 group-hover:scale-[1.04] motion-reduce:transition-none" sizes="(min-width: 1024px) 16vw, 50vw" /><div className="p-2.5 text-center"><h2 className="font-display text-lg text-brand-ink">{family.label}</h2><p className="mt-0.5 text-[0.6rem] tracking-[0.08em] text-brand-muted uppercase">{family.description}</p></div></Link>)}</div><div className="mt-6 text-center"><Link className="inline-flex items-center gap-2 border-b border-brand-gold pb-1 text-[0.625rem] font-semibold tracking-[0.08em] text-brand-teal uppercase" href="/parfumler">Tüm Parfümleri Gör<ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.5} /></Link></div></Container></section> : null}
    </main>
  );
}
