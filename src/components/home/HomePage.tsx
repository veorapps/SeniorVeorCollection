import Link from "next/link";
import { ArrowRight, BadgeCheck, Gift, Sparkles } from "lucide-react";
import type { HomePageData, Product } from "@/domain/models";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { NewsletterBanner } from "@/components/layout/NewsletterBanner";
import { TrustBar } from "@/components/layout/TrustBar";
import { FeaturedProductCarousel } from "./FeaturedProductCarousel";
import { IngredientStrip } from "./IngredientStrip";
import { ScentDiscovery } from "./ScentDiscovery";

const packagingIconByName = { "badge-check": BadgeCheck, "heart-handshake": Gift, sparkles: Sparkles };

export interface HomePageProps {
  data: HomePageData;
  featuredProducts: Product[];
}

export function HomePage({ data, featuredProducts }: HomePageProps) {
  const hero = data.hero.slides.filter((slide) => slide.enabled).sort((a, b) => a.order - b.order)[0];
  if (!hero) return null;

  return (
    <main>
      <section className="relative isolate min-h-[53rem] overflow-hidden border-b border-brand-line bg-[#f7eee5] sm:min-h-[22rem] xl:min-h-[28rem]">
        <picture className="absolute inset-0 block">
          {hero.mobileImage ? <source media="(max-width: 639px)" srcSet={hero.mobileImage.src} /> : null}
          <Media asset={hero.desktopImage} className="absolute inset-0 h-full w-full translate-y-28 object-cover object-center sm:translate-y-0" loading="eager" sizes="100vw" />
        </picture>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[25rem] bg-linear-to-b from-[#fffaf4]/80 via-[#fffaf4]/45 to-transparent sm:inset-y-0 sm:right-auto sm:h-auto sm:w-[54%] sm:bg-linear-to-r sm:from-[#fffaf4]/45 sm:via-[#fffaf4]/20 sm:to-transparent" />
        <Container className="relative flex min-h-[53rem] items-start pt-11 pb-8 sm:min-h-[22rem] sm:items-center sm:py-7 xl:min-h-[28rem]">
          <div className="max-w-[34rem] lg:ml-9 xl:ml-0">
            <p className="text-[0.625rem] font-semibold tracking-[0.22em] text-brand-gold uppercase">{hero.eyebrow}</p>
            <h1 className="mt-3 max-w-[32rem] whitespace-pre-line font-display text-[2.55rem] leading-[0.94] tracking-[0.015em] text-brand-ink sm:text-[2.65rem] xl:text-[3.1rem]">{hero.title}</h1>
            <p className="mt-4 max-w-[22rem] text-[0.8125rem] leading-[1.5] text-brand-muted sm:text-sm">{hero.description}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link className="inline-flex min-h-11 items-center justify-center border border-brand-teal bg-brand-teal px-5 text-xs font-semibold tracking-[0.08em] text-brand-ivory uppercase transition-colors hover:border-brand-teal-hover hover:bg-brand-teal-hover" href={hero.primaryCTA.href}>{hero.primaryCTA.label}<ArrowRight aria-hidden="true" className="ml-2 size-4" strokeWidth={1.5} /></Link>
              {hero.secondaryCTA ? <Link className="inline-flex min-h-11 items-center border border-brand-gold px-5 text-[0.6875rem] font-semibold tracking-[0.1em] text-brand-teal uppercase transition-colors hover:bg-brand-paper" href={hero.secondaryCTA.href}>{hero.secondaryCTA.label}</Link> : null}
            </div>
            <div className="mt-6 hidden items-center gap-3 text-[0.625rem] tracking-[0.14em] text-brand-muted sm:flex"><span>01</span><span className="h-px w-20 bg-brand-gold" /><span>03</span></div>
          </div>
        </Container>
      </section>

      {data.trustBar.enabled ? <TrustBar items={data.trustBar.items} variant="home" /> : null}

      {data.featuredProducts.enabled ? <section className="bg-[#fffdf9] py-2"><Container size="wide"><div className="relative text-center"><p className="text-[0.625rem] font-semibold tracking-[0.26em] text-brand-gold uppercase">{data.featuredProducts.eyebrow}</p><h2 className="font-display text-[1.75rem] leading-none tracking-[0.12em] text-[#705630] uppercase sm:text-[2rem]">{data.featuredProducts.title}</h2><Link className="absolute right-0 top-1/2 hidden -translate-y-1/2 items-center gap-2 text-[0.625rem] font-semibold tracking-[0.1em] text-[#705630] uppercase lg:inline-flex" href={data.featuredProducts.cta.href}>{data.featuredProducts.cta.label}<ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.3} /></Link><Link className="mt-2 inline-flex items-center gap-2 text-[0.625rem] font-semibold tracking-[0.1em] text-[#705630] uppercase lg:hidden" href={data.featuredProducts.cta.href}>{data.featuredProducts.cta.label}<ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.3} /></Link></div><div className="mt-2"><FeaturedProductCarousel items={data.featuredProducts.items} products={featuredProducts} /></div></Container></section> : null}

      {data.scentDiscovery.enabled ? <ScentDiscovery data={data.scentDiscovery} /> : null}

      {data.ingredients.enabled ? <IngredientStrip data={data.ingredients} /> : null}

      {data.packaging.enabled ? <section className="border-y border-brand-line bg-brand-sand"><div className="grid lg:grid-cols-[0.9fr_0.85fr_1.25fr]"><div className="relative min-h-52 overflow-hidden"><Media asset={data.packaging.image} className="absolute inset-0 h-full w-full object-cover object-[68%_center]" sizes="(min-width: 1024px) 32vw, 100vw" /></div><div className="flex items-center px-8 py-7 lg:px-10"><div><h2 className="font-display text-[1.9rem] leading-[0.94] text-brand-ink">{data.packaging.title}</h2><p className="mt-2 max-w-md text-[0.75rem] leading-5 text-brand-muted">{data.packaging.description}</p><Link className="mt-4 inline-flex min-h-10 items-center bg-brand-teal px-4 text-[0.625rem] font-semibold tracking-[0.1em] text-brand-ivory uppercase" href={data.packaging.cta.href}>{data.packaging.cta.label}<ArrowRight aria-hidden="true" className="ml-2 size-4" strokeWidth={1.4} /></Link></div></div><div className="p-5 lg:p-7"><div className="grid h-full bg-brand-teal text-brand-ivory sm:grid-cols-3">{data.packaging.benefits.filter((item) => item.enabled).sort((a, b) => a.order - b.order).map((item) => { const Icon = packagingIconByName[item.icon as keyof typeof packagingIconByName] ?? Sparkles; return <div className="flex flex-col items-center justify-center border-brand-ivory/20 p-4 text-center sm:border-r sm:last:border-r-0" key={item.id}><Icon aria-hidden="true" className="size-7 text-brand-gold-soft" strokeWidth={1.35} /><h3 className="mt-3 text-[0.625rem] font-semibold tracking-[0.1em] uppercase">{item.title}</h3><p className="mt-1 text-[0.625rem] leading-4 text-brand-sand-deep">{item.description}</p></div>; })}</div></div></div></section> : null}

      {data.newsletter.enabled ? <NewsletterBanner description={data.newsletter.description} title={data.newsletter.title} variant="home" /> : null}
    </main>
  );
}
