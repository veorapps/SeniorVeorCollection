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
      <section className="relative isolate min-h-[34rem] overflow-hidden bg-brand-sand md:min-h-[35rem] lg:min-h-[38rem]">
        <Media asset={hero.desktopImage} className="absolute inset-0 h-full w-full object-cover object-[68%_center]" loading="eager" sizes="100vw" />
        <div className="absolute inset-0 bg-linear-to-r from-brand-ivory via-brand-ivory/70 to-transparent" />
        <Container className="relative flex min-h-[34rem] items-center py-14 md:min-h-[35rem] lg:min-h-[38rem]">
          <div className="max-w-xl"><p className="text-xs font-semibold tracking-[0.2em] text-brand-gold uppercase">{hero.eyebrow}</p><h1 className="mt-4 font-display text-5xl leading-[0.92] tracking-[-0.035em] text-brand-ink sm:text-6xl lg:text-7xl">{hero.title}</h1><p className="mt-5 max-w-md text-sm leading-6 text-brand-muted sm:text-base">{hero.description}</p><div className="mt-8 flex flex-wrap gap-3"><Button>{hero.primaryCTA.label}<ArrowRight aria-hidden="true" className="ml-2 size-4" strokeWidth={1.5} /></Button>{hero.secondaryCTA ? <Link className="inline-flex min-h-11 items-center border border-brand-gold px-5 text-xs font-semibold tracking-[0.08em] text-brand-teal uppercase transition-colors hover:bg-brand-paper" href={hero.secondaryCTA.href}>{hero.secondaryCTA.label}</Link> : null}</div><div className="mt-10 flex items-center gap-3 text-xs tracking-[0.12em] text-brand-muted"><span>01</span><span className="h-px w-24 bg-brand-gold" /><span>03</span></div></div>
        </Container>
      </section>

      {data.trustBar.enabled ? <TrustBar items={data.trustBar.items} /> : null}

      {data.featuredProducts.enabled ? <section className="py-[var(--sv-space-2xl)]"><Container><div className="flex flex-wrap items-end justify-between gap-4"><SectionHeading eyebrow={data.featuredProducts.eyebrow} title={data.featuredProducts.title} /><Link className="mb-1 inline-flex items-center gap-2 border-b border-brand-gold pb-1 text-xs font-semibold tracking-[0.1em] text-brand-teal uppercase" href={data.featuredProducts.cta.href}>{data.featuredProducts.cta.label}<ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.5} /></Link></div><div className="mt-8"><ProductCarousel products={featuredProducts} /></div></Container></section> : null}

      {data.scentDiscovery.enabled ? <section className="border-y border-brand-line bg-brand-paper py-[var(--sv-space-2xl)]"><Container><div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr_0.85fr] lg:items-center"><div><SectionHeading description={data.scentDiscovery.description} eyebrow={data.scentDiscovery.eyebrow} title={data.scentDiscovery.title} /><Link className="mt-7 inline-flex min-h-11 items-center bg-brand-teal px-5 text-xs font-semibold tracking-[0.08em] text-brand-ivory uppercase" href={data.scentDiscovery.cta.href}>{data.scentDiscovery.cta.label}<ArrowRight aria-hidden="true" className="ml-2 size-4" strokeWidth={1.5} /></Link></div><div className="grid grid-cols-[5.5rem_1fr] items-center gap-5"><div className="space-y-2"><div className="h-18 bg-brand-gold/75" /><div className="mx-auto h-20 w-4/5 bg-brand-gold/55" /><div className="mx-auto h-24 w-3/5 bg-brand-gold/35" /></div><div className="space-y-4 text-sm"><NoteGroup label="Üst Notalar" notes={data.scentDiscovery.topNotes} /><NoteGroup label="Orta Notalar" notes={data.scentDiscovery.middleNotes} /><NoteGroup label="Dip Notalar" notes={data.scentDiscovery.baseNotes} /></div></div><div className="divide-y divide-brand-line border-y border-brand-line"><Meter icon={<Clock3 aria-hidden="true" className="size-5" strokeWidth={1.4} />} label="Kalıcılık" value={data.scentDiscovery.longevityLabel} /><Meter icon={<Sparkles aria-hidden="true" className="size-5" strokeWidth={1.4} />} label="Yoğunluk" value={data.scentDiscovery.intensityLabel} /></div></div></Container></section> : null}

      {data.ingredients.enabled ? <section className="py-8"><Container><h2 className="mb-5 font-display text-2xl text-brand-ink">{data.ingredients.title}</h2><div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none]">{data.ingredients.items.filter((item) => item.enabled).sort((a, b) => a.order - b.order).map((item) => <div className="w-28 shrink-0 border border-brand-line bg-brand-paper p-1.5 text-center" key={item.id}><Media asset={item.image} className="aspect-[4/3] object-cover" sizes="7rem" /><span className="mt-2 block text-xs text-brand-ink">{item.name}</span></div>)}</div></Container></section> : null}

      {data.packaging.enabled ? <section className="border-y border-brand-line bg-brand-sand"><Container className="grid gap-0 py-0 lg:grid-cols-[1.1fr_1fr]"><div className="relative min-h-72 overflow-hidden"><Media asset={data.packaging.image} className="absolute inset-0 h-full w-full object-cover object-[68%_center]" sizes="(min-width: 1024px) 50vw, 100vw" /></div><div className="py-10 lg:pl-10 lg:py-14"><h2 className="font-display text-4xl leading-none text-brand-ink">{data.packaging.title}</h2><p className="mt-4 max-w-lg text-sm leading-6 text-brand-muted">{data.packaging.description}</p><Link className="mt-6 inline-flex min-h-11 items-center bg-brand-teal px-5 text-xs font-semibold tracking-[0.08em] text-brand-ivory uppercase" href={data.packaging.cta.href}>{data.packaging.cta.label}</Link><div className="mt-8 grid gap-px bg-brand-teal sm:grid-cols-3">{data.packaging.benefits.filter((item) => item.enabled).map((item) => <div className="bg-brand-teal p-4 text-brand-ivory" key={item.id}><h3 className="text-xs font-semibold tracking-[0.08em] uppercase">{item.title}</h3><p className="mt-2 text-xs leading-5 text-brand-sand-deep">{item.description}</p></div>)}</div></div></Container></section> : null}

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
