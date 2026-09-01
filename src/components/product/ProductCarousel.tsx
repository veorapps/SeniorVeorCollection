"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/domain/models";
import { IconButton } from "@/components/ui/IconButton";
import { ProductCard } from "./ProductCard";

export interface ProductCarouselProps {
  products: Product[];
  variant?: "compact" | "mini";
}

export function ProductCarousel({ products, variant = "compact" }: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollByCard = (direction: 1 | -1) => scrollContainerRef.current?.scrollBy({ left: direction * 320, behavior: "smooth" });

  return (
    <div className="relative">
      <div aria-label="Ürün karuseli" className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pr-12 [scrollbar-width:none]" ref={scrollContainerRef} role="region">
        {products.map((product) => <ProductCard className={variant === "mini" ? "w-40 shrink-0 snap-start" : "w-[min(16.5rem,75vw)] shrink-0 snap-start"} key={product.id} product={product} variant={variant} />)}
      </div>
      <div className="absolute right-0 top-0 hidden gap-1 bg-brand-ivory pl-2 sm:flex"><IconButton aria-label="Önceki ürünler" onClick={() => scrollByCard(-1)} size="sm"><ChevronLeft aria-hidden="true" className="size-4" strokeWidth={1.5} /></IconButton><IconButton aria-label="Sonraki ürünler" onClick={() => scrollByCard(1)} size="sm"><ChevronRight aria-hidden="true" className="size-4" strokeWidth={1.5} /></IconButton></div>
    </div>
  );
}
