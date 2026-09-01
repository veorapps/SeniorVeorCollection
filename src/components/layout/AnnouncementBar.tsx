import type { AnnouncementItem } from "@/domain/models";

export interface AnnouncementBarProps {
  items: AnnouncementItem[];
}

export function AnnouncementBar({ items }: AnnouncementBarProps) {
  const visibleItems = items.filter((item) => item.enabled).sort((a, b) => a.order - b.order);

  if (visibleItems.length === 0) return null;

  return (
    <div className="border-b border-brand-line bg-brand-sand px-[var(--sv-gutter)] py-2 text-[0.625rem] font-medium tracking-[0.08em] text-brand-muted uppercase">
      <div className="mx-auto flex max-w-[var(--sv-container-max)] items-center justify-center gap-x-8 gap-y-1 overflow-hidden whitespace-nowrap">
        {visibleItems.map((item) => <span key={item.id}>{item.text}</span>)}
      </div>
    </div>
  );
}
