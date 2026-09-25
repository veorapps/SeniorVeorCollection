import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, Flower2, Leaf, MoonStar, Snowflake, Sparkles, Sun } from "lucide-react";
import type { HomeScentDiscoverySection, Season, UsageTime } from "@/domain/models";
import { Container } from "@/components/ui/Container";

const usageOptions: { id: UsageTime; label: string; Icon: typeof Sun }[] = [
  { id: "day", label: "Gündüz", Icon: Sun },
  { id: "night", label: "Gece", Icon: MoonStar },
  { id: "special-occasion", label: "Özel Anlar", Icon: Sparkles },
];

const seasonOptions: { id: Season; label: string; Icon: typeof Sun }[] = [
  { id: "spring", label: "İlkbahar", Icon: Flower2 },
  { id: "summer", label: "Yaz", Icon: Sun },
  { id: "autumn", label: "Sonbahar", Icon: Leaf },
  { id: "winter", label: "Kış", Icon: Snowflake },
];

function NoteGroup({ label, notes }: { label: string; notes: string[] }) {
  return <div className="flex flex-col justify-center border-b border-[#e9e0d4] last:border-b-0"><h3 className="text-[0.625rem] font-medium tracking-[0.07em] text-[#6f5839] uppercase">{label}</h3><p className="mt-0.5 text-[0.625rem] leading-[1.35] text-brand-muted">{notes.join(", ")}</p></div>;
}

function Meter({ icon: Icon, label, value, level, segments }: { icon: typeof Sun; label: string; value: string; level: number; segments: number }) {
  const count = Math.max(1, Math.min(12, segments));
  const filled = Math.max(0, Math.min(count, level));
  return (
    <div className="grid grid-cols-[1.375rem_1fr_auto] items-center gap-2 border-b border-[#e9e0d4] py-1.5">
      <Icon aria-hidden="true" className="size-5 text-brand-gold" strokeWidth={1.35} />
      <div><h3 className="text-[0.625rem] font-medium tracking-[0.07em] text-[#6f5839] uppercase">{label}</h3><div aria-label={`${label}: ${value}`} className="mt-1 flex max-w-40 gap-1" role="img">{Array.from({ length: count }, (_, index) => <span aria-hidden="true" className={`h-1 w-5 rounded-full ${index < filled ? "bg-brand-gold" : "bg-[#dfd5c5]"}`} key={index} />)}</div></div>
      <span className="text-[0.625rem] text-brand-muted">{value}</span>
    </div>
  );
}

export function ScentDiscovery({ data }: { data: HomeScentDiscoverySection }) {
  return (
    <section className="border-y border-brand-line bg-[#fffdfa] py-5 lg:py-2">
      <Container className="max-w-[62rem]!">
        <div className="grid items-center gap-6 md:grid-cols-[0.85fr_1.25fr] lg:grid-cols-[0.85fr_1.25fr_1fr] lg:gap-5">
          <div>
            <h2 className="font-display text-[1.25rem] leading-none tracking-[0.05em] text-[#705630] uppercase">{data.title}</h2>
            <p className="mt-2 max-w-[14rem] text-[0.6875rem] leading-[1.45] text-brand-muted">{data.description}</p>
            <Link className="mt-3 inline-flex min-h-8 items-center justify-center bg-brand-teal px-3 text-[0.5625rem] font-medium tracking-[0.07em] text-brand-paper uppercase" href={data.cta.href}>{data.cta.label}<ArrowRight aria-hidden="true" className="ml-2 size-3.5" strokeWidth={1.35} /></Link>
          </div>

          <div className="flex items-center justify-center gap-3 lg:justify-start">
            <div className="relative size-[166px] shrink-0">
              <div className="absolute inset-0 overflow-hidden [clip-path:polygon(50%_0,100%_100%,0_100%)]">
                <Image alt={data.image.alt} className="object-cover" fill sizes="166px" src={data.image.src} />
              </div>
              <span aria-hidden="true" className="absolute top-1/3 left-1/3 h-[3px] w-1/3 bg-[#fffdfa]" />
              <span aria-hidden="true" className="absolute top-2/3 left-1/6 h-[3px] w-2/3 bg-[#fffdfa]" />
            </div>
            <div className="grid h-[166px] min-w-0 flex-1 grid-rows-3"><NoteGroup label="Üst Notalar" notes={data.topNotes} /><NoteGroup label="Orta Notalar" notes={data.middleNotes} /><NoteGroup label="Dip Notalar" notes={data.baseNotes} /></div>
          </div>

          <div className="border-t border-[#e9e0d4] pt-3 md:col-span-2 md:grid md:grid-cols-2 md:gap-x-5 lg:col-span-1 lg:block lg:border-t-0 lg:border-l lg:pt-0 lg:pl-5">
            <Meter icon={Clock3} label="Kalıcılık" level={data.longevityLevel} segments={data.meterSegments} value={data.longevityLabel} />
            <Meter icon={Sun} label="Yoğunluk" level={data.intensityLevel} segments={data.meterSegments} value={data.intensityLabel} />
            <div className="grid grid-cols-[1.375rem_1fr] items-center gap-2 border-b border-[#e9e0d4] py-1.5"><MoonStar aria-hidden="true" className="size-5 text-brand-gold" strokeWidth={1.35} /><div><h3 className="text-[0.625rem] font-medium tracking-[0.07em] text-[#6f5839] uppercase">Kullanım Zamanı</h3><div className="mt-1 flex flex-wrap gap-1.5">{usageOptions.map(({ id, label, Icon }) => <span aria-label={`${label}${data.usageTimes.includes(id) ? ", uygun" : ""}`} className={`inline-flex items-center gap-0.5 text-[0.5625rem] ${data.usageTimes.includes(id) ? "text-brand-gold" : "text-[#c9beae]"}`} key={id}><Icon aria-hidden="true" className="size-3.5" strokeWidth={1.4} />{label}</span>)}</div></div></div>
            <div className="grid grid-cols-[1.375rem_1fr] items-center gap-2 py-1.5"><Flower2 aria-hidden="true" className="size-5 text-brand-gold" strokeWidth={1.35} /><div><h3 className="text-[0.625rem] font-medium tracking-[0.07em] text-[#6f5839] uppercase">Mevsim</h3><div aria-label={`Önerilen mevsim: ${seasonOptions.filter(({ id }) => data.seasons.includes(id)).map(({ label }) => label).join(", ")}`} className="mt-1 flex gap-1.5" role="img">{seasonOptions.map(({ id, label, Icon }) => <span className={`inline-flex size-5 items-center justify-center rounded-full border ${data.seasons.includes(id) ? "border-brand-gold text-brand-gold" : "border-transparent text-[#c9beae]"}`} key={id} title={label}><Icon aria-hidden="true" className="size-4" strokeWidth={1.45} /></span>)}</div></div></div>
          </div>
        </div>
      </Container>
    </section>
  );
}
