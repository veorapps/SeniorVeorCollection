import Link from "next/link";
import { ArrowRight, Clock3, Sparkles } from "lucide-react";
import type { HomePageData, Product } from "@/domain/models";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { NewsletterBanner } from "@/components/layout/NewsletterBanner";
import { TrustBar } from "@/components/layout/TrustBar";
import { ProductCarousel } from "@/components/product/ProductCarousel";

export interface HomePageProps {
  data: HomePageData;
  featuredProducts: Product[];
}

export function HomePage({ data, featuredProducts }: HomePageProps) {
  const hero = data.hero.slides.filter((slide) => slide.enabled).sort((a, b) => a.order - b.order)[0];
  if (!hero) return null;

  return (
    <main>
      <section className="relative isolate min-h-[25rem] overflow-hidden border-b border-brand-line bg-brand-sand md:min-h-[26rem] lg:min-h-[27rem]">
        <Media asset={hero.desktopImage} className="absolute inset-0 h-full w-full object-cover object-[65%_center]" loading="eager" sizes="100vw" />
        <div className="absolute inset-0 bg-linear-to-r from-brand-ivory via-brand-ivory/82 to-transparent" />
        <Container className="relative flex min-h-[25rem] items-center py-10 md:min-h-[26rem] lg:min-h-[27rem]">
          <div className="max-w-[25rem]"><p className="text-[0.625rem] font-semibold tracking-[0.22em] text-brand-gold uppercase">{hero.eyebrow}</p><h1 className="mt-3 font-display text-[2.9rem] leading-[0.9] tracking-[-0.028em] text-brand-ink sm:text-[3.45rem] lg:text-[4rem]">{hero.title}</h1><p className="mt-4 max-w-sm text-[0.8125rem] leading-5 text-brand-muted sm:text-sm">{hero.description}</p><div className="mt-6 flex flex-wrap gap-3"><Button>{hero.primaryCTA.label}<ArrowRight aria-hidden="true" className="ml-2 size-4" strokeWidth={1.5} /></Button>{hero.secondaryCTA ? <Link className="inline-flex min-h-11 items-center border border-brand-gold px-5 text-[0.6875rem] font-semibold tracking-[0.1em] text-brand-teal uppercase transition-colors hover:bg-brand-paper" href={hero.secondaryCTA.href}>{hero.secondaryCTA.label}</Link> : null}</div><div className="mt-7 flex items-center gap-3 text-[0.625rem] tracking-[0.14em] text-brand-muted"><span>01</span><span className="h-px w-20 bg-brand-gold" /><span>03</span></div></div>
        </Container>
      </section>

      {data.trustBar.enabled ? <TrustBar items={data.trustBar.items} /> : null}

      {data.featuredProducts.enabled ? <section className="py-8 lg:py-9"><Container size="wide"><div className="relative text-center"><SectionHeading align="center" eyebrow={data.featuredProducts.eyebrow} title={data.featuredProducts.title} /><Link className="absolute right-0 top-1/2 hidden -translate-y-1/2 items-center gap-2 border-b border-brand-gold pb-1 text-[0.625rem] font-semibold tracking-[0.1em] text-brand-teal uppercase lg:inline-flex" href={data.featuredProducts.cta.href}>{data.featuredProducts.cta.label}<ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.5} /></Link><Link className="mt-3 inline-flex items-center gap-2 border-b border-brand-gold pb-1 text-[0.625rem] font-semibold tracking-[0.1em] text-brand-teal uppercase lg:hidden" href={data.featuredProducts.cta.href}>{data.featuredProducts.cta.label}<ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.5} /></Link></div><div className="mt-4"><ProductCarousel products={featuredProducts} variant="showcase" /></div></Container></section> : null}

      {data.scentDiscovery.enabled ? <section className="border-y border-brand-line bg-brand-paper py-9 lg:py-10"><Container><div className="grid gap-8 lg:grid-cols-[0.82fr_1.1fr_0.9fr] lg:items-center"><div><SectionHeading description={data.scentDiscovery.description} eyebrow={data.scentDiscovery.eyebrow} title={data.scentDiscovery.title} /><Link className="mt-6 inline-flex min-h-10 items-center bg-brand-teal px-5 text-[0.625rem] font-semibold tracking-[0.1em] text-brand-ivory uppercase" href={data.scentDiscovery.cta.href}>{data.scentDiscovery.cta.label}<ArrowRight aria-hidden="true" className="ml-2 size-4" strokeWidth={1.5} /></Link></div><div className="grid grid-cols-[5.25rem_1fr] items-center gap-5"><div className="space-y-1.5"><div className="h-15 bg-brand-gold/75" /><div className="mx-auto h-17 w-4/5 bg-brand-gold/55" /><div className="mx-auto h-20 w-3/5 bg-brand-gold/35" /></div><div className="space-y-3 text-[0.75rem]"><NoteGroup label="Üst Notalar" notes={data.scentDiscovery.topNotes} /><NoteGroup label="Orta Notalar" notes={data.scentDiscovery.middleNotes} /><NoteGroup label="Dip Notalar" notes={data.scentDiscovery.baseNotes} /></div></div><div className="divide-y divide-brand-line border-y border-brand-line"><Meter icon={<Clock3 aria-hidden="true" className="size-[1.15rem]" strokeWidth={1.4} />} label="Kalıcılık" value={data.scentDiscovery.longevityLabel} /><Meter icon={<Sparkles aria-hidden="true" className="size-[1.15rem]" strokeWidth={1.4} />} label="Yoğunluk" value={data.scentDiscovery.intensityLabel} /></div></div></Container></section> : null}

      {data.ingredients.enabled ? <section className="py-6"><Container><div className="flex items-end gap-5"><h2 className="mb-0 max-w-28 font-display text-xl leading-none text-brand-ink">{data.ingredients.title}</h2><div className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">{data.ingredients.items.filter((item) => item.enabled).sort((a, b) => a.order - b.order).map((item) => <div className="w-24 shrink-0 border border-brand-line bg-brand-paper p-1 text-center" key={item.id}><Media asset={item.image} className="aspect-[4/3] object-cover" sizes="6rem" /><span className="mt-1.5 block text-[0.625rem] text-brand-ink">{item.name}</span></div>)}</div></div></Container></section> : null}

      {data.packaging.enabled ? <section className="border-y border-brand-line bg-brand-sand"><Container className="grid gap-0 py-0 lg:grid-cols-[0.85fr_0.8fr_1.2fr]"><div className="relative min-h-52 overflow-hidden"><Media asset={data.packaging.image} className="absolute inset-0 h-full w-full object-cover object-[68%_center]" sizes="(min-width: 1024px) 34vw, 100vw" /></div><div className="py-8 lg:px-7"><h2 className="font-display text-[2rem] leading-[0.94] text-brand-ink">{data.packaging.title}</h2><p className="mt-3 text-[0.75rem] leading-5 text-brand-muted">{data.packaging.description}</p><Link className="mt-5 inline-flex min-h-10 items-center bg-brand-teal px-4 text-[0.625rem] font-semibold tracking-[0.1em] text-brand-ivory uppercase" href={data.packaging.cta.href}>{data.packaging.cta.label}</Link></div><div className="grid bg-brand-teal text-brand-ivory sm:grid-cols-3 lg:grid-cols-3">{data.packaging.benefits.filter((item) => item.enabled).map((item) => <div className="border-brand-ivory/15 p-5 text-center sm:border-r sm:last:border-r-0" key={item.id}><h3 className="text-[0.625rem] font-semibold tracking-[0.1em] uppercase">{item.title}</h3><p className="mt-2 text-[0.625rem] leading-4 text-brand-sand-deep">{item.description}</p></div>)}</div></Container></section> : null}

      {data.newsletter.enabled ? <NewsletterBanner description={data.newsletter.description} title={data.newsletter.title} /> : null}
    </main>
  );
}

function NoteGroup({ label, notes }: { label: string; notes: string[] }) {
  return <div><h3 className="text-xs font-semibold tracking-[0.1em] text-brand-gold uppercase">{label}</h3><p className="mt-1 leading-5 text-brand-muted">{notes.join(", ")}</p></div>;
}

function Meter({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="flex items-center gap-3 py-5"><span className="text-brand-gold">{icon}</span><div className="flex-1"><h3 className="text-xs font-semibold tracking-[0.1em] text-brand-ink uppercase">{label}</h3><div className="mt-2 flex gap-1">{Array.from({ length: 6 }, (_, index) => <span className={`h-1.5 flex-1 ${index < 4 ? "bg-brand-gold" : "bg-brand-sand-deep"}`} key={index} />)}</div></div><span className="text-xs text-brand-muted">{value}</span></div>;
}
