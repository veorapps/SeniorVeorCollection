import Image from "next/image";
import { BadgeCheck, Clock3, Gift, Heart, Moon, ShieldCheck, Sparkles, Sun } from "lucide-react";
import type { Product, Season, UsageTime } from "@/domain/models";
import { Container } from "@/components/ui/Container";

const seasonLabels: Record<Season, string> = {
  spring: "İlkbahar",
  summer: "Yaz",
  autumn: "Sonbahar",
  winter: "Kış",
};

const usageMeta: Record<UsageTime, { label: string; icon: typeof Sun }> = {
  day: { label: "Gündüz", icon: Sun },
  night: { label: "Akşam", icon: Moon },
  "special-occasion": { label: "Özel Anlar", icon: Gift },
};

const benefitIcons = [Sparkles, Heart, Clock3];
const complianceIcons = { "badge-check": BadgeCheck, "clock-3": Clock3, heart: Heart, "shield-check": ShieldCheck };

export function ProductScentProfileSection({ product }: { product: Product }) {
  const notes = [
    { label: "Üst Notalar", items: product.topNotes },
    { label: "Orta Notalar", items: product.middleNotes },
    { label: "Dip Notalar", items: product.baseNotes },
  ];

  return (
    <section className="border-y border-brand-line bg-brand-paper py-7">
      <Container>
        <p className="text-[0.625rem] font-semibold tracking-[0.16em] text-brand-gold uppercase">
          Koku Ailesi: {product.subtitle.replaceAll("·", " · ")}
        </p>
        <div className="mt-4 grid divide-y divide-brand-line border border-brand-line lg:grid-cols-[1.15fr_0.9fr_0.95fr] lg:divide-x lg:divide-y-0">
          <div className="grid gap-5 p-5 sm:grid-cols-[11rem_1fr]">
            <div className="relative mx-auto aspect-square w-full max-w-48 overflow-hidden [clip-path:polygon(50%_0,100%_100%,0_100%)]">
              <Image alt={`${product.name} üst, orta ve dip nota kompozisyonu`} className="h-full w-full object-cover" fill sizes="12rem" src="/images/home/scent-pyramid-v1.png" />
            </div>
            <div className="divide-y divide-brand-line">{notes.map((group) => <div className="py-3 first:pt-0 last:pb-0" key={group.label}><h2 className="text-[0.625rem] font-semibold tracking-[0.1em] text-brand-gold uppercase">{group.label}</h2><p className="mt-1 text-[0.75rem] leading-5 text-brand-muted">{group.items.map((note) => note.name).join(", ")}</p></div>)}</div>
          </div>

          <div className="p-5">
            <PerformanceMeter label="Kalıcılık" value={product.longevity} description="8–10 Saat" />
            <PerformanceMeter label="Yoğunluk" value={product.intensity} description="Yüksek" />
            <div className="mt-6 border-t border-brand-line pt-4"><h2 className="text-[0.625rem] font-semibold tracking-[0.1em] text-brand-gold uppercase">Mevsim</h2><div className="mt-3 flex flex-wrap gap-2">{Object.entries(seasonLabels).map(([season, label]) => <span className={`border px-2.5 py-1 text-[0.625rem] ${product.seasons.includes(season as Season) ? "border-brand-gold bg-brand-sand text-brand-ink" : "border-brand-line text-brand-muted/55"}`} key={season}>{label}</span>)}</div></div>
            <div className="mt-5 border-t border-brand-line pt-4"><h2 className="text-[0.625rem] font-semibold tracking-[0.1em] text-brand-gold uppercase">Kullanım Zamanı</h2><div className="mt-3 flex flex-wrap gap-4">{product.usageTimes.map((time) => { const { icon: Icon, label } = usageMeta[time]; return <span className="flex items-center gap-1.5 text-[0.6875rem] text-brand-muted" key={time}><Icon aria-hidden="true" className="size-4 text-brand-gold" strokeWidth={1.35} />{label}</span>; })}</div></div>
          </div>

          <div className="p-5">
            <h2 className="font-display text-[1.55rem] text-brand-ink">Neden {product.name}?</h2>
            <div className="mt-4 divide-y divide-brand-line">{product.benefits.filter((item) => item.enabled).sort((a, b) => a.order - b.order).map((item, index) => { const Icon = benefitIcons[index % benefitIcons.length]; return <div className="flex gap-3 py-3 first:pt-0" key={item.id}><Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-gold" strokeWidth={1.35} /><div><h3 className="text-[0.6875rem] font-semibold text-brand-ink">{item.title}</h3><p className="mt-0.5 text-[0.6875rem] leading-4 text-brand-muted">{item.description}</p></div></div>; })}</div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function PerformanceMeter({ description, label, value }: { description: string; label: string; value: number }) {
  return <div className="not-first:mt-6"><div className="flex justify-between text-[0.625rem] font-semibold tracking-[0.08em] uppercase"><span>{label}</span><span className="text-brand-muted">{description}</span></div><div aria-label={`${label}: 5 üzerinden ${value}`} className="mt-2.5 flex gap-1.5" role="img">{Array.from({ length: 5 }, (_, index) => <span className={`h-1.5 flex-1 ${index < value ? "bg-brand-gold" : "bg-brand-sand-deep"}`} key={index} />)}</div></div>;
}

export function ProductIngredientsSection({ product }: { product: Product }) {
  return (
    <section className="border-b border-brand-line bg-brand-ivory py-5">
      <Container className="grid gap-5 lg:grid-cols-[1.1fr_1.9fr] lg:items-center">
        <div><h2 className="font-display text-[1.5rem] text-brand-ink">İçerik & Uyumluluk</h2><p className="mt-1.5 text-[0.6875rem] leading-5 text-brand-muted">{product.ingredients}</p></div>
        <div className="grid gap-3 sm:grid-cols-2">{product.compliance.map((item) => { const Icon = complianceIcons[item.icon as keyof typeof complianceIcons] ?? ShieldCheck; return <div className="flex gap-3 border-l border-brand-line pl-4" key={item.id}><Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-gold" strokeWidth={1.35} /><div><h3 className="text-[0.625rem] font-semibold tracking-[0.08em] text-brand-ink uppercase">{item.label}</h3><p className="mt-1 text-[0.6875rem] leading-4 text-brand-muted">{item.description}</p></div></div>; })}</div>
      </Container>
    </section>
  );
}
