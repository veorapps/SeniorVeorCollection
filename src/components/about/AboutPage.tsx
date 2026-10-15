import Link from "next/link";
import { ArrowDown, BadgeCheck, Clock3, Droplet, Flower2, Handshake, Heart, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import type { AboutPageData, BenefitItem } from "@/domain/models";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { TrustBar } from "@/components/layout/TrustBar";
import { NewsletterBanner } from "@/components/layout/NewsletterBanner";

const iconMap = { "badge-check": BadgeCheck, "clock-3": Clock3, droplet: Droplet, flower: Flower2, handshake: Handshake, heart: Heart, "heart-handshake": HeartHandshake, "shield-check": ShieldCheck, sparkles: Sparkles };

export function AboutPage({ data }: { data: AboutPageData }) {
  return (
    <main>
      {data.hero.enabled ? <AboutHero data={data} /> : null}
      {data.trustBar.enabled ? <TrustBar items={data.trustBar.items} variant="home" /> : null}

      <AboutLead data={data} />
      {data.story.enabled || data.craft.enabled ? <StoryAndCraft data={data} /> : null}

      {data.values.enabled ? <ValuesSection data={data} /> : null}
      {data.journey.enabled ? <JourneySection data={data} /> : null}
      {data.packaging.enabled ? <PackagingSection data={data} /> : null}
      {data.ctaBand.enabled ? <AboutCtaBand data={data} /> : null}
      {data.newsletter.enabled ? <NewsletterBanner description={data.newsletter.description} title={data.newsletter.title} variant="home" /> : null}
    </main>
  );
}

function AboutLead({ data }: { data: AboutPageData }) {
  return (
    <section className="border-b border-brand-line bg-[#f8f3ed]">
      <Container className="grid gap-8 py-[var(--sv-space-3xl)] lg:grid-cols-[0.16fr_1fr_0.32fr] lg:items-center lg:gap-10">
        <p className="text-[0.625rem] font-semibold tracking-[0.22em] text-brand-gold uppercase lg:[writing-mode:vertical-rl] lg:rotate-180">Hakkımızda</p>
        <div className="max-w-[44rem]">
          <p className="text-[0.625rem] font-semibold tracking-[0.19em] text-brand-gold uppercase">Senior Veor Collection</p>
          <h1 className="mt-3 font-display text-[2.8rem] leading-[0.94] text-brand-ink sm:text-[4rem] lg:text-[4.5rem]">Her Şişede Bir Hikâye, Her Damla Bir İz.</h1>
          <p className="mt-5 max-w-[36rem] text-[0.875rem] leading-6 text-brand-muted">Kokuya yalnızca bir tamamlayıcı olarak değil; zarafeti, hafızayı ve kişisel ifadeyi bir araya getiren bir imza olarak bakıyoruz.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="inline-flex min-h-10 items-center bg-brand-teal px-5 text-[0.625rem] font-semibold tracking-[0.1em] text-brand-ivory uppercase transition-colors hover:bg-brand-ink" href="#story-craft">Hikâyemizi Keşfet <ArrowDown aria-hidden="true" className="ml-3 size-3.5" /></Link>
            <Link className="inline-flex min-h-10 items-center border border-brand-gold/75 px-5 text-[0.625rem] font-semibold tracking-[0.1em] text-brand-ink uppercase transition-colors hover:bg-brand-gold-soft" href="#journey">Yolculuğumuz</Link>
          </div>
        </div>
        <div className="relative mx-auto grid aspect-square w-full max-w-[15rem] place-items-center border border-brand-line bg-brand-paper p-7 before:absolute before:inset-3 before:border before:border-brand-gold/35">
          <Media asset={data.story.image} className="relative z-10 h-full w-full object-contain" sizes="15rem" />
        </div>
      </Container>
    </section>
  );
}

function AboutCtaBand({ data }: { data: AboutPageData }) {
  const band = data.ctaBand;
  return (
    <section className="scroll-mt-20 relative isolate overflow-hidden bg-brand-teal text-brand-ivory" id="about-cta">
      <div className="absolute inset-y-0 right-0 -z-10 w-[38%] max-lg:hidden">
        <Media asset={band.image} className="h-full w-full object-cover object-[52%_55%]" sizes="38vw" />
        <div className="absolute inset-0 bg-linear-to-r from-brand-teal via-brand-teal/70 to-transparent" />
      </div>
      <Container className="flex min-h-[8rem] flex-col justify-center gap-5 py-[var(--sv-section-space)] sm:flex-row sm:items-center sm:justify-between lg:pr-[34%]">
        <div>
          <h2 className="font-display text-[1.4rem] leading-none tracking-[0.04em]">{band.title}</h2>
          <p className="mt-2 text-[0.625rem] leading-4 text-brand-ivory/75">{band.description}</p>
        </div>
        <Link className="inline-flex min-h-9 shrink-0 items-center justify-center border border-brand-gold/80 px-5 text-[0.5625rem] font-semibold tracking-[0.08em] uppercase" href={band.cta.href}>{band.cta.label}<span aria-hidden="true" className="ml-4 text-sm leading-none">→</span></Link>
      </Container>
    </section>
  );
}

function PackagingSection({ data }: { data: AboutPageData }) {
  const packaging = data.packaging;
  return (
    <section className="scroll-mt-20 border-y border-brand-line bg-brand-sand" id="packaging">
      <Container className="grid max-w-[64rem] lg:grid-cols-[0.72fr_1.28fr] lg:items-stretch">
        <div className="flex flex-col justify-center py-[var(--sv-space-3xl)] lg:pr-8">
          <p className="text-[0.5625rem] font-semibold tracking-[0.18em] text-brand-gold uppercase">{packaging.eyebrow}</p>
          <h2 className="mt-2 max-w-[20rem] font-display text-[1.65rem] leading-[1.02] text-brand-ink lg:text-[1.45rem]">{packaging.title}</h2>
          <p className="mt-3 max-w-[20rem] text-[0.6875rem] leading-[1.5] text-brand-muted lg:mt-2 lg:text-[0.625rem]">{packaging.description}</p>
          <Link className="mt-4 inline-flex min-h-9 w-fit items-center bg-brand-teal px-4 text-[0.5625rem] font-semibold tracking-[0.08em] text-brand-ivory uppercase lg:mt-3" href={packaging.cta.href}>{packaging.cta.label}<span aria-hidden="true" className="ml-4 text-sm leading-none">→</span></Link>
        </div>
        <div className="grid grid-cols-3 gap-1 pb-[var(--sv-space-3xl)] lg:py-[var(--sv-space-3xl)]">
          {packaging.gallery.map((asset, index) => <Media asset={asset} className={`aspect-[4/3] h-full w-full bg-brand-ivory ${index === 1 ? "object-contain p-5" : "object-cover"}`} key={asset.src} sizes="(min-width: 1024px) 20vw, 33vw" />)}
        </div>
      </Container>
    </section>
  );
}

function JourneySection({ data }: { data: AboutPageData }) {
  const items = data.journey.items.filter((item) => item.enabled).sort((a, b) => a.order - b.order);
  return (
    <section className="scroll-mt-20 bg-brand-ivory py-[var(--sv-space-3xl)]" id="journey">
      <Container className="max-w-[64rem]">
        <p className="text-center text-[0.5625rem] font-semibold tracking-[0.2em] text-brand-gold uppercase">Her Şişenin Arkasındaki Süreç</p>
        <h2 className="text-center font-display text-[1.25rem] tracking-[0.12em] text-brand-ink uppercase">{data.journey.title}</h2>
        <ol className="mt-4 grid lg:mt-3 lg:grid-cols-6">
          {items.map((item, index) => (
            <li className="relative grid grid-cols-[2rem_1fr] gap-3 pb-5 last:pb-0 lg:block lg:pb-0 lg:text-center" key={item.id}>
              {index < items.length - 1 ? <span aria-hidden="true" className="absolute top-8 bottom-0 left-[0.95rem] border-l border-brand-gold/55 lg:top-4 lg:right-[-50%] lg:bottom-auto lg:left-[calc(50%+1rem)] lg:border-t lg:border-l-0" /> : null}
              <span className="relative z-10 grid size-8 place-items-center rounded-full border border-brand-gold bg-brand-ivory text-[0.5625rem] text-brand-gold lg:mx-auto">{String(index + 1).padStart(2, "0")}</span>
              <div className="min-w-0 lg:mt-2">
                <h3 className="text-[0.5625rem] font-semibold tracking-[0.08em] text-brand-ink uppercase">{item.title}</h3>
                <p className="mt-1 text-[0.5625rem] leading-[1.35] text-brand-muted lg:mx-auto lg:max-w-[8.5rem]">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function ValuesSection({ data }: { data: AboutPageData }) {
  return (
    <section className="scroll-mt-20 border-y border-brand-line bg-brand-paper py-[var(--sv-space-3xl)]" id="values">
      <Container className="grid max-w-[70rem] gap-7 lg:grid-cols-[0.3fr_1fr] lg:items-end">
        <div className="lg:pb-2">
          <p className="text-[0.5625rem] font-semibold tracking-[0.2em] text-brand-gold uppercase">Bizi Biz Yapan</p>
          <h2 className="mt-2 font-display text-[2rem] leading-none text-brand-ink">{data.values.title}</h2>
          <p className="mt-3 max-w-[15rem] text-[0.6875rem] leading-5 text-brand-muted">Her kararımızı, kalıcı bir deneyim bırakma arzumuz yönlendirir.</p>
        </div>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5 [&>*:last-child]:col-span-2 sm:[&>*:last-child]:col-span-1">
          <BenefitCards items={data.values.items} />
        </div>
      </Container>
    </section>
  );
}

function StoryAndCraft({ data }: { data: AboutPageData }) {
  return (
    <section className="scroll-mt-20 border-b border-brand-line bg-brand-ivory" id="story-craft">
      <div className="mx-auto grid max-w-[100rem] lg:min-h-[25rem] lg:grid-cols-[0.72fr_0.96fr_1.32fr]">
        {data.story.enabled ? (
          <div className="relative min-h-64 overflow-hidden bg-[#efe4d4] lg:min-h-full">
            <div className="absolute inset-6 border border-brand-gold/25" />
            <Media asset={data.story.image} className="absolute inset-0 h-full w-full object-contain p-12 lg:p-16" sizes="(min-width: 1024px) 28vw, 100vw" />
          </div>
        ) : null}

        {data.story.enabled ? (
          <div className="flex flex-col justify-center px-6 py-[var(--sv-space-3xl)] lg:border-r lg:border-brand-line lg:px-9">
            <CompactSectionHeading eyebrow={data.story.eyebrow} title={data.story.title} />
            {data.story.paragraphs.map((paragraph) => <p className="mt-4 text-[0.75rem] leading-[1.55] text-brand-muted" key={paragraph}>{paragraph}</p>)}
            <p className="mt-5 font-display text-[0.9375rem] italic text-brand-gold">— Senior Veor Collection</p>
          </div>
        ) : null}

        {data.craft.enabled ? (
          <div className="flex flex-col justify-center bg-[#f9f5ef] px-6 py-[var(--sv-space-3xl)] lg:px-10">
            <CompactSectionHeading description={data.craft.description} eyebrow={data.craft.eyebrow} title={data.craft.title} />
            <BenefitList className="mt-6" items={data.craft.benefits} />
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
      <div className="mx-auto grid max-w-[100rem] lg:min-h-[18rem] lg:grid-cols-[0.82fr_1.18fr]">
        <div className="flex items-center px-[var(--sv-gutter)] py-[var(--sv-section-space)] lg:justify-end">
          <div className="w-full max-w-[34rem]">
            <p className="text-[0.625rem] font-semibold tracking-[0.2em] text-brand-gold uppercase">{hero.eyebrow}</p>
            <h1 className="mt-3 max-w-[31rem] font-display text-[2.65rem] leading-[0.94] text-brand-ink sm:text-5xl lg:mt-2 lg:text-[2.65rem]">{hero.title}</h1>
            <p className="mt-4 max-w-md text-[0.8125rem] leading-5 text-brand-muted lg:mt-3 lg:text-[0.75rem] lg:leading-[1.45]">{hero.description}</p>
            <Link className="mt-5 inline-flex min-h-10 items-center bg-brand-teal px-5 text-[0.625rem] font-semibold tracking-[0.08em] text-brand-ivory uppercase lg:mt-4 lg:min-h-9" href={hero.cta.href}>{hero.cta.label}<span aria-hidden="true" className="ml-4 text-base leading-none">→</span></Link>
          </div>
        </div>
        <div className="relative min-h-72 overflow-hidden border-t border-brand-line lg:min-h-full lg:border-t-0 lg:border-l">
          <Media asset={hero.image} className="absolute inset-0 h-full w-full object-cover object-[center_48%]" preload sizes="(min-width: 1024px) 60vw, 100vw" />
        </div>
      </div>
    </section>
  );
}

function BenefitList({ className, items }: { className?: string; items: BenefitItem[] }) {
  return <div className={`grid gap-4 sm:grid-cols-3 ${className ?? ""}`}>{items.filter((item) => item.enabled).sort((a, b) => a.order - b.order).map((item) => { const Icon = iconMap[item.icon as keyof typeof iconMap] ?? ShieldCheck; return <div className="flex min-w-0 items-start gap-2.5" key={item.id}><Icon aria-hidden="true" className="size-6 shrink-0 text-brand-gold" strokeWidth={1.25} /><div><h3 className="text-[0.5625rem] font-semibold leading-3 tracking-[0.08em] text-brand-ink uppercase">{item.title}</h3><p className="mt-1 text-[0.5625rem] leading-3 text-brand-muted">{item.description}</p></div></div>; })}</div>;
}

function BenefitCards({ items }: { items: BenefitItem[] }) {
  return <>{items.filter((item) => item.enabled).sort((a, b) => a.order - b.order).map((item) => { const Icon = iconMap[item.icon as keyof typeof iconMap] ?? ShieldCheck; return <article className="flex min-h-[6.75rem] flex-col items-center justify-center border border-brand-line bg-brand-ivory px-3 py-3 text-center lg:min-h-[6.25rem] lg:py-2" key={item.id}><Icon aria-hidden="true" className="size-7 text-brand-gold" strokeWidth={1.25} /><h3 className="mt-2 text-[0.625rem] font-semibold tracking-[0.08em] text-brand-ink uppercase">{item.title}</h3><p className="mt-1 max-w-[9.5rem] text-[0.5625rem] leading-[1.35] text-brand-muted">{item.description}</p></article>; })}</>;
}
