import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  tone?: "teal" | "gold" | "outline";
}

const toneClasses: Record<NonNullable<BadgeProps["tone"]>, string> = {
  teal: "border-brand-teal bg-brand-teal text-brand-ivory",
  gold: "border-brand-gold bg-brand-gold text-brand-paper",
  outline: "border-brand-line bg-brand-paper text-brand-teal",
};

export function Badge({ children, className, tone = "teal", ...props }: BadgeProps) {
  return (
    <span
      className={cn("inline-flex border px-2 py-1 text-[0.625rem] font-semibold tracking-[0.1em] uppercase", toneClasses[tone], className)}
      {...props}
    >
      {children}
    </span>
  );
}
