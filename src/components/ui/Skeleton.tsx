import { cn } from "@/lib/cn";

export interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return <div aria-hidden="true" className={cn("animate-pulse bg-brand-sand", className)} />;
}
