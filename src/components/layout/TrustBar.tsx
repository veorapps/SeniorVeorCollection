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
      <div className="mx-auto grid max-w-[var(--sv-container-max)] divide-y divide-brand-line px-[var(--sv-gutter)] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {visibleItems.map((item) => {
          const Icon = icons[item.icon as keyof typeof icons] ?? ShieldCheck;
          return <div className="flex items-center gap-3 py-4 sm:px-5 sm:first:pl-0 lg:py-4.5" key={item.id}><Icon aria-hidden="true" className="size-[1.35rem] shrink-0 text-brand-gold" strokeWidth={1.3} /><div><h2 className="text-[0.6875rem] font-semibold tracking-[0.08em] text-brand-ink uppercase">{item.title}</h2><p className="mt-0.5 text-[0.6875rem] leading-4 text-brand-muted">{item.description}</p></div></div>;
        })}
      </div>
    </section>
  );
}
