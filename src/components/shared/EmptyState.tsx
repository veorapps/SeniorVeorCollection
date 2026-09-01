import type { ReactNode } from "react";

export interface EmptyStateProps {
  action?: ReactNode;
  description: string;
  title: string;
}

export function EmptyState({ action, description, title }: EmptyStateProps) {
  return (
    <div className="border border-brand-line bg-brand-paper px-6 py-14 text-center">
      <h2 className="font-display text-3xl text-brand-ink">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-brand-muted">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
