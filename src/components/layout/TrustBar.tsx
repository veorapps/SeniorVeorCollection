import { BadgeCheck, Clock3, HeartHandshake, ShieldCheck, Truck } from "lucide-react";
import type { BenefitItem } from "@/domain/models";
import { cn } from "@/lib/cn";

const icons = { "badge-check": BadgeCheck, "clock-3": Clock3, "heart-handshake": HeartHandshake, "shield-check": ShieldCheck, truck: Truck };

export interface TrustBarProps {
  className?: string;
  items: BenefitItem[];
}

export function TrustBar({ className, items }: TrustBarProps) {
  const visibleItems = items.filter((item) => item.enabled).sort((a, b) => a.order - b.order);
  if (visibleItems.length === 0) return null;

  return (
    <section aria-label="Güven göstergeleri" className={cn("border-y border-brand-line bg-brand-paper", className)}>
      <div className="mx-auto grid max-w-[var(--sv-container-max)] divide-y divide-brand-line px-[var(--sv-gutter)] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
        {visibleItems.map((item) => {
          const Icon = icons[item.icon as keyof typeof icons] ?? ShieldCheck;
          return <div className="flex min-w-0 items-center gap-4 py-5 sm:px-4 lg:border-l lg:border-brand-line lg:px-5 lg:first:border-l-0" key={item.id}><Icon aria-hidden="true" className="size-8 shrink-0 text-brand-gold" strokeWidth={1.25} /><div className="min-w-0"><h2 className="text-[0.7rem] font-semibold tracking-[0.07em] text-brand-ink uppercase">{item.title}</h2><p className="mt-0.5 text-[0.6875rem] leading-4 text-brand-muted">{item.description}</p></div></div>;
        })}
      </div>
    </section>
  );
}
