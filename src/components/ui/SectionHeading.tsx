import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  align?: "left" | "center";
  description?: string;
  eyebrow?: string;
  title: string;
}

export function SectionHeading({
  align = "left",
  className,
  description,
  eyebrow,
  title,
  ...props
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)} {...props}>
      {eyebrow ? <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-brand-gold uppercase">{eyebrow}</p> : null}
      <h2 className="font-display text-3xl leading-[0.98] tracking-[-0.02em] text-brand-ink sm:text-4xl lg:text-5xl">{title}</h2>
      {description ? <p className="mt-4 max-w-2xl text-sm leading-6 text-brand-muted">{description}</p> : null}
    </div>
  );
}
