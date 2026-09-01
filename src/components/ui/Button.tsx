import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "text";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-brand-teal bg-brand-teal text-brand-ivory hover:border-brand-teal-hover hover:bg-brand-teal-hover",
  secondary:
    "border-brand-gold bg-transparent text-brand-teal hover:bg-brand-sand",
  text: "border-transparent bg-transparent px-0 text-brand-teal hover:text-brand-gold",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3 text-xs",
  md: "min-h-11 px-5 text-xs",
  lg: "min-h-12 px-6 text-sm",
};

export function Button({
  children,
  className,
  size = "md",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center border font-semibold tracking-[0.08em] uppercase transition-colors duration-200 motion-reduce:transition-none disabled:pointer-events-none disabled:opacity-45",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
