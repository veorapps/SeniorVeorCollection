import Link from "next/link";
import { BadgeCheck, Clock3, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import type { AboutPageData, BenefitItem } from "@/domain/models";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrustBar } from "@/components/layout/TrustBar";
import { NewsletterBanner } from "@/components/layout/NewsletterBanner";

const iconMap = { "badge-check": BadgeCheck, "clock-3": Clock3, "heart-handshake": HeartHandshake, "shield-check": ShieldCheck, sparkles: Sparkles };

export function AboutPage({ data }: { data: AboutPageData }) {
  return (
    <main>
      {data.hero.enabled ? <AboutHero data={data} /> : null}
      {data.trustBar.enabled ? <TrustBar items={data.trustBar.items} variant="home" /> : null}

      {data.story.enabled || data.craft.enabled ? <StoryAndCraft data={data} /> : null}

      {data.values.enabled ? <section className="border-y border-brand-line bg-brand-paper py-7"><Container><SectionHeading align="center" title={data.values.title} /><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><BenefitCards items={data.values.items} /></div></Container></section> : null}
      {data.journey.enabled ? <section className="py-7"><Container><SectionHeading align="center" title={data.journey.title} /><ol className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">{data.journey.items.filter((item) => item.enabled).sort((a, b) => a.order - b.order).map((item, index) => <li className="relative border-t border-brand-gold pt-4" key={item.id}><span className="grid size-8 place-items-center rounded-full border border-brand-gold bg-brand-paper text-[0.625rem] text-brand-gold">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-3 text-[0.625rem] font-semibold tracking-[0.08em] text-brand-ink uppercase">{item.title}</h3><p className="mt-1 text-[0.625rem] leading-4 text-brand-muted">{item.description}</p></li>)}</ol></Container></section> : null}
      {data.packaging.enabled ? <section className="border-y border-brand-line bg-brand-sand"><Container className="grid lg:grid-cols-2"><div className="py-7 lg:py-10 lg:pr-8"><SectionHeading description={data.packaging.description} eyebrow={data.packaging.eyebrow} title={data.packaging.title} /><Link className="mt-5 inline-flex min-h-10 items-center bg-brand-teal px-5 text-[0.625rem] font-semibold tracking-[0.08em] text-brand-ivory uppercase" href={data.packaging.cta.href}>{data.packaging.cta.label}</Link></div><Media asset={data.packaging.image} className="min-h-52 h-full object-cover" sizes="(min-width: 1024px) 50vw, 100vw" /></Container></section> : null}
      <NewsletterBanner description="Özel kampanyalar, yeni koleksiyonlar ve parfüm ipuçları e-posta kutunuzda." title="Kokunun Zarafetini Keşfedin" />
    </main>
  );
}

function StoryAndCraft({ data }: { data: AboutPageData }) {
  return (
    <section className="scroll-mt-20 border-b border-brand-line bg-brand-ivory" id="story-craft">
      <div className="mx-auto grid max-w-[100rem] lg:min-h-[13.25rem] lg:grid-cols-[0.82fr_0.83fr_1.35fr]">
        {data.story.enabled ? (
          <div className="relative min-h-60 overflow-hidden bg-brand-sand lg:min-h-full">
            <Media asset={data.story.image} className="absolute inset-0 h-full w-full object-contain p-10 lg:p-12" sizes="(min-width: 1024px) 28vw, 100vw" />
          </div>
        ) : null}

        {data.story.enabled ? (
          <div className="flex flex-col justify-center px-6 py-8 lg:border-r lg:border-brand-line lg:px-7 lg:py-5">
            <CompactSectionHeading eyebrow={data.story.eyebrow} title={data.story.title} />
            {data.story.paragraphs.map((paragraph) => <p className="mt-3 text-[0.6875rem] leading-[1.45] text-brand-muted" key={paragraph}>{paragraph}</p>)}
            <p className="mt-4 font-display text-[0.875rem] italic text-brand-gold">— Senior Veor Collection</p>
          </div>
        ) : null}

        {data.craft.enabled ? (
          <div className="flex flex-col justify-center px-6 py-8 lg:px-8 lg:py-5">
            <CompactSectionHeading description={data.craft.description} eyebrow={data.craft.eyebrow} title={data.craft.title} />
            <BenefitList className="mt-5" items={data.craft.benefits} />
          </div>
        ) : null}
      </div>
    </section>
  );
}

function CompactSectionHeading({ description, eyebrow, title }: { description?: string; eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-[0.5625rem] font-semibold tracking-[0.18em] text-brand-gold uppercase">{eyebrow}</p>
      <h2 className="mt-2 font-display text-[1.55rem] leading-[1.02] tracking-[-0.01em] text-brand-ink">{title}</h2>
      {description ? <p className="mt-3 max-w-[30rem] text-[0.6875rem] leading-[1.5] text-brand-muted">{description}</p> : null}
    </div>
  );
}

function AboutHero({ data }: { data: AboutPageData }) {
  const hero = data.hero;
  return (
    <section className="border-y border-brand-line bg-brand-ivory">
      <div className="mx-auto grid max-w-[100rem] lg:min-h-[23rem] lg:grid-cols-[0.82fr_1.18fr]">
        <div className="flex items-center px-[var(--sv-gutter)] py-9 lg:justify-end lg:py-10">
          <div className="w-full max-w-[34rem]">
            <p className="text-[0.625rem] font-semibold tracking-[0.2em] text-brand-gold uppercase">{hero.eyebrow}</p>
            <h1 className="mt-3 max-w-[31rem] font-display text-[2.65rem] leading-[0.94] text-brand-ink sm:text-5xl lg:text-[3.25rem]">{hero.title}</h1>
            <p className="mt-4 max-w-md text-[0.8125rem] leading-5 text-brand-muted">{hero.description}</p>
            <Link className="mt-5 inline-flex min-h-10 items-center bg-brand-teal px-5 text-[0.625rem] font-semibold tracking-[0.08em] text-brand-ivory uppercase" href={hero.cta.href}>{hero.cta.label}<span aria-hidden="true" className="ml-4 text-base leading-none">→</span></Link>
          </div>
        </div>
        <div className="relative min-h-72 overflow-hidden border-t border-brand-line lg:min-h-full lg:border-t-0 lg:border-l">
          <Media asset={hero.image} className="absolute inset-0 h-full w-full object-cover object-[center_48%]" loading="eager" priority sizes="(min-width: 1024px) 60vw, 100vw" />
        </div>
      </div>
    </section>
  );
}

function BenefitList({ className, items }: { className?: string; items: BenefitItem[] }) {
  return <div className={`grid gap-4 sm:grid-cols-3 ${className ?? ""}`}>{items.filter((item) => item.enabled).sort((a, b) => a.order - b.order).map((item) => { const Icon = iconMap[item.icon as keyof typeof iconMap] ?? ShieldCheck; return <div className="flex min-w-0 items-start gap-2.5" key={item.id}><Icon aria-hidden="true" className="size-6 shrink-0 text-brand-gold" strokeWidth={1.25} /><div><h3 className="text-[0.5625rem] font-semibold leading-3 tracking-[0.08em] text-brand-ink uppercase">{item.title}</h3><p className="mt-1 text-[0.5625rem] leading-3 text-brand-muted">{item.description}</p></div></div>; })}</div>;
}

function BenefitCards({ items }: { items: BenefitItem[] }) {
  return <>{items.filter((item) => item.enabled).sort((a, b) => a.order - b.order).map((item) => { const Icon = iconMap[item.icon as keyof typeof iconMap] ?? ShieldCheck; return <article className="border border-brand-line bg-brand-ivory p-4 text-center" key={item.id}><Icon aria-hidden="true" className="mx-auto size-6 text-brand-gold" strokeWidth={1.3} /><h3 className="mt-3 font-display text-[1.5rem] text-brand-ink">{item.title}</h3><p className="mt-1 text-[0.6875rem] leading-4 text-brand-muted">{item.description}</p></article>; })}</>;
}
