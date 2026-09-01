import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  size?: "default" | "wide" | "narrow";
}

const sizeClasses: Record<NonNullable<ContainerProps["size"]>, string> = {
  default: "max-w-[var(--sv-container-max)]",
  wide: "max-w-[100rem]",
  narrow: "max-w-4xl",
};

export function Container({ children, className, size = "default", ...props }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-[var(--sv-gutter)]", sizeClasses[size], className)} {...props}>
      {children}
    </div>
  );
}
