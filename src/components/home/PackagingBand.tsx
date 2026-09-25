import Link from "next/link";
import { ArrowRight, FlaskConical, Gift, ShieldCheck } from "lucide-react";
import type { HomePackagingSection } from "@/domain/models";
import { Media } from "@/components/ui/Media";

const iconByName = {
  "flask-conical": FlaskConical,
  gift: Gift,
  "shield-check": ShieldCheck,
};

export function PackagingBand({ data }: { data: HomePackagingSection }) {
  const benefits = data.benefits
    .filter((item) => item.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <section className="border-y border-brand-line bg-[#f7efe7]">
      <div className="grid lg:min-h-[7.75rem] lg:grid-cols-[30%_27%_43%]">
        <div className="relative min-h-44 overflow-hidden lg:min-h-0">
          <Media
            asset={data.image}
            className="absolute inset-0 h-full w-full object-cover object-[48%_57%]"
            sizes="(min-width: 1024px) 30vw, 100vw"
          />
        </div>
        <div className="flex items-center px-6 py-5 sm:px-9 lg:px-3 lg:py-3">
          <div>
            <h2 className="font-display text-[1.5rem] leading-[0.95] text-[#5c482d] lg:whitespace-nowrap lg:text-[1rem]">
              {data.title}
            </h2>
            <p className="mt-1.5 max-w-sm text-[0.6875rem] leading-[1.35] text-brand-muted">
              {data.description}
            </p>
            <Link
              className="mt-2 inline-flex min-h-8 items-center border border-brand-teal bg-brand-teal px-4 text-[0.625rem] font-semibold tracking-[0.06em] text-brand-ivory uppercase transition-colors hover:bg-brand-teal-hover"
              href={data.cta.href}
            >
              {data.cta.label}
              <ArrowRight aria-hidden="true" className="ml-1.5 size-4" strokeWidth={1.4} />
            </Link>
          </div>
        </div>
        {benefits.length > 0 ? (
          <div className="p-3 sm:p-4 lg:py-2 lg:pr-6 lg:pl-0">
            <div className="grid h-full grid-cols-3 border border-brand-teal bg-brand-teal text-brand-ivory">
              {benefits.map((item) => {
                const Icon = iconByName[item.icon as keyof typeof iconByName] ?? ShieldCheck;
                return (
                  <div className="flex min-w-0 flex-col items-center justify-center border-r border-brand-ivory/20 px-2 py-4 text-center last:border-r-0 sm:px-3 lg:py-2" key={item.id}>
                    <Icon aria-hidden="true" className="size-6 shrink-0 text-brand-gold-soft" strokeWidth={1.35} />
                    <h3 className="mt-1.5 text-[0.625rem] font-semibold leading-[1.2] tracking-[0.04em] uppercase">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[0.5625rem] leading-[1.25] text-brand-sand-deep">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
