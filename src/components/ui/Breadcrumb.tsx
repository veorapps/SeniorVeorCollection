import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/cn";

export interface BreadcrumbItem {
  href?: string;
  label: string;
}

export interface BreadcrumbProps {
  className?: string;
  items: BreadcrumbItem[];
}

export function Breadcrumb({ className, items }: BreadcrumbProps) {
  return (
    <nav aria-label="Sayfa yolu" className={cn("text-xs text-brand-muted", className)}>
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link aria-label="Ana Sayfa" className="inline-flex p-1 text-brand-gold hover:text-brand-teal" href="/">
            <Home aria-hidden="true" className="size-3" strokeWidth={1.5} />
          </Link>
        </li>
        {items.map((item, index) => {
          const current = index === items.length - 1;
          return (
            <li className="flex items-center gap-1.5" key={`${item.label}-${index}`}>
              <ChevronRight aria-hidden="true" className="size-3 text-brand-sand-deep" strokeWidth={1.5} />
              {item.href && !current ? (
                <Link className="hover:text-brand-teal" href={item.href}>{item.label}</Link>
              ) : (
                <span aria-current={current ? "page" : undefined}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
