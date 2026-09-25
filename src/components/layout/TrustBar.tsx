import { BadgeCheck, CircleCheck, Clock3, HeartHandshake, LockKeyhole, ShieldCheck, Truck } from "lucide-react";
import type { BenefitItem } from "@/domain/models";
import { cn } from "@/lib/cn";

const icons = { "badge-check": BadgeCheck, "circle-check": CircleCheck, "clock-3": Clock3, "heart-handshake": HeartHandshake, "lock-keyhole": LockKeyhole, "shield-check": ShieldCheck, truck: Truck };

export interface TrustBarProps {
  className?: string;
  items: BenefitItem[];
  variant?: "default" | "home";
}

export function TrustBar({ className, items, variant = "default" }: TrustBarProps) {
  const visibleItems = items.filter((item) => item.enabled).sort((a, b) => a.order - b.order);
  if (visibleItems.length === 0) return null;
  const home = variant === "home";

  return (
    <section aria-label="Güven göstergeleri" className={cn("border-y border-brand-line bg-brand-paper", className)}>
      <div className={cn("mx-auto grid", home ? "max-w-[1000px] grid-cols-2 px-3 sm:px-5 lg:grid-cols-4 lg:px-0" : "max-w-[var(--sv-container-max)] divide-y divide-brand-line px-[var(--sv-gutter)] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4")}>
        {visibleItems.map((item) => {
          const Icon = icons[item.icon as keyof typeof icons] ?? ShieldCheck;
          return <div className={cn("flex min-w-0 items-center", home ? "gap-2 border-brand-line px-2 py-3 odd:border-r lg:gap-3 lg:border-l lg:pr-2 lg:pl-8 lg:odd:border-r-0 lg:first:border-l-0" : "gap-4 py-5 sm:px-4 lg:border-l lg:border-brand-line lg:px-5 lg:first:border-l-0")} key={item.id}><Icon aria-hidden="true" className={cn("shrink-0 text-brand-gold", home ? "size-6 lg:size-8" : "size-8")} strokeWidth={1.25} /><div className="min-w-0"><h2 className={cn("font-semibold tracking-[0.07em] text-brand-ink uppercase", home ? "text-[0.625rem] lg:text-[0.7rem]" : "text-[0.7rem]")}>{item.title}</h2><p className={cn("mt-0.5 leading-4 text-brand-muted", home ? "text-[0.625rem] lg:text-[0.6875rem]" : "text-[0.6875rem]")}>{item.description}</p></div></div>;
        })}
      </div>
    </section>
  );
}
