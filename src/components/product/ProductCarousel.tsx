"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/domain/models";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/cn";
import { ProductCard } from "./ProductCard";

export interface ProductCarouselProps {
  cardClassName?: string;
  products: Product[];
  variant?: "compact" | "mini" | "showcase";
}

export function ProductCarousel({ cardClassName, products, variant = "compact" }: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollByCard = (direction: 1 | -1) => scrollContainerRef.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
  const isShowcase = variant === "showcase";

  return (
    <div className="relative">
      <div aria-label="Ürün karuseli" className={cn("flex snap-x snap-mandatory overflow-x-auto pb-2 [scrollbar-width:none]", isShowcase ? "gap-3 lg:gap-4" : "gap-4 pr-12")} ref={scrollContainerRef} role="region">
        {products.map((product) => <ProductCard className={cn(isShowcase ? "w-[min(15rem,72vw)] shrink-0 snap-start lg:w-[calc((100%-4rem)/5)]" : variant === "mini" ? "w-40 shrink-0 snap-start" : "w-[min(16.5rem,75vw)] shrink-0 snap-start", cardClassName)} key={product.id} product={product} variant={variant} />)}
      </div>
      {isShowcase ? <><IconButton aria-label="Önceki ürünler" className="absolute left-[-3rem] top-1/2 hidden -translate-y-1/2 bg-[#fffdf9] text-[#b7a68e] hover:bg-[#fffdf9] lg:inline-flex" onClick={() => scrollByCard(-1)} size="sm"><ChevronLeft aria-hidden="true" className="size-5" strokeWidth={1.2} /></IconButton><IconButton aria-label="Sonraki ürünler" className="absolute right-[-3rem] top-1/2 hidden -translate-y-1/2 bg-[#fffdf9] text-[#b7a68e] hover:bg-[#fffdf9] lg:inline-flex" onClick={() => scrollByCard(1)} size="sm"><ChevronRight aria-hidden="true" className="size-5" strokeWidth={1.2} /></IconButton></> : <div className="absolute right-0 top-0 hidden gap-1 bg-brand-ivory pl-2 sm:flex"><IconButton aria-label="Önceki ürünler" onClick={() => scrollByCard(-1)} size="sm"><ChevronLeft aria-hidden="true" className="size-4" strokeWidth={1.5} /></IconButton><IconButton aria-label="Sonraki ürünler" onClick={() => scrollByCard(1)} size="sm"><ChevronRight aria-hidden="true" className="size-4" strokeWidth={1.5} /></IconButton></div>}
    </div>
  );
}
