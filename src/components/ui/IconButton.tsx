import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string;
  children: ReactNode;
  size?: "sm" | "md";
}

export function IconButton({
  "aria-label": ariaLabel,
  children,
  className,
  size = "md",
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      aria-label={ariaLabel}
      className={cn(
        "inline-flex shrink-0 items-center justify-center border border-transparent text-brand-teal transition-colors duration-200 hover:border-brand-line hover:bg-brand-paper motion-reduce:transition-none disabled:pointer-events-none disabled:opacity-45",
        size === "sm" ? "size-9" : "size-11",
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
