"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HomeProductSection, Product } from "@/domain/models";
import { IconButton } from "@/components/ui/IconButton";
import { RatingStars } from "@/components/ui/RatingStars";
import { ProductPrice } from "@/components/product/ProductPrice";

type FeaturedItem = HomeProductSection["items"][number];

function FeaturedImage({ item }: { item: FeaturedItem }) {
  const crop = item.imageCrop;
  if (!crop) {
    return <Image alt={item.image.alt} className="h-full w-full object-contain" height={item.image.height} sizes="(min-width: 1024px) 18vw, 72vw" src={item.image.src} width={item.image.width} />;
  }

  return (
    <div className="relative h-full overflow-hidden" style={{ aspectRatio: `${crop.width} / ${crop.height}` }}>
      <Image
        alt={item.image.alt}
        className="absolute max-w-none"
        height={item.image.height}
        sizes="(min-width: 1024px) 18vw, 72vw"
        src={item.image.src}
        style={{
          height: `${item.image.height / crop.height * 100}%`,
          left: `${-crop.x / crop.width * 100}%`,
          top: `${-crop.y / crop.height * 100}%`,
          width: `${item.image.width / crop.width * 100}%`,
        }}
        width={item.image.width}
      />
    </div>
  );
}

function FeaturedCard({ item, product }: { item: FeaturedItem; product?: Product }) {
  const href = product ? `/parfumler/${product.slug}` : null;
  const image = <span className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#faf7f2]"><FeaturedImage item={item} /></span>;

  return (
    <article className="w-[min(15rem,72vw)] shrink-0 snap-start border border-[#ebe5dc] bg-[#fffdf9] p-1.5 text-center lg:w-[calc((100%-4rem)/5)]">
      {href ? <Link aria-label={`${item.name} ürününü incele`} className="block" href={href}>{image}</Link> : image}
      <div className="px-1 pb-1 pt-0.5">
        {href ? <Link className="block" href={href}><h3 className="font-display text-[0.8125rem] leading-4 text-brand-ink">{item.name}</h3></Link> : <h3 className="font-display text-[0.8125rem] leading-4 text-brand-ink">{item.name}</h3>}
        <div className="mt-0.5 h-3 text-[0.5rem] font-medium leading-3 tracking-[0.09em] text-brand-muted uppercase">{product?.subtitle}</div>
        <div className="mt-0.5 flex h-3 justify-center">{product ? <RatingStars className="justify-center gap-1 [&_span]:text-[0.5625rem] [&_span]:leading-3 [&_svg]:size-2.5" rating={product.rating} reviewCount={product.reviewCount} showValue={false} /> : null}</div>
        <div className="mt-0.5 flex h-4 justify-center">{product ? <ProductPrice className="text-[0.875rem] font-semibold leading-4" currency={product.currency} price={product.price} /> : null}</div>
        {href ? <Link className="mx-auto mt-0.5 flex min-h-11 w-[75%] items-center justify-center border border-[#d7ccbe] text-[0.5625rem] font-semibold tracking-[0.1em] text-[#705630] uppercase lg:min-h-5" href={href}>İncele</Link> : <div className="mx-auto mt-0.5 h-11 lg:h-5" />}
      </div>
    </article>
  );
}

export function FeaturedProductCarousel({ items, products }: { items: FeaturedItem[]; products: Product[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const productsById = new Map(products.map((product) => [product.id, product]));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const update = () => {
      setCanScrollLeft(container.scrollLeft > 1);
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 1);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(container);
    container.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      container.removeEventListener("scroll", update);
    };
  }, [items.length]);

  const scrollByCard = (direction: 1 | -1) => {
    const container = containerRef.current;
    if (!container) return;
    const card = container.firstElementChild;
    const gap = Number.parseFloat(getComputedStyle(container).columnGap) || 0;
    container.scrollBy({ left: direction * ((card?.getBoundingClientRect().width ?? 320) + gap), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div aria-label="Öne çıkan parfümler" className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] lg:mx-10 lg:gap-4" ref={containerRef} role="region">
        {items.map((item) => <FeaturedCard item={item} key={item.id} product={item.productId ? productsById.get(item.productId) : undefined} />)}
      </div>
      <IconButton aria-label="Önceki ürünler" className="absolute left-0 top-1/2 max-lg:!hidden -translate-y-1/2 bg-[#fffdf9] text-[#b7a68e] hover:bg-[#fffdf9]" disabled={!canScrollLeft} onClick={() => scrollByCard(-1)} size="sm"><ChevronLeft aria-hidden="true" className="size-5" strokeWidth={1.2} /></IconButton>
      <IconButton aria-label="Sonraki ürünler" className="absolute right-0 top-1/2 max-lg:!hidden -translate-y-1/2 bg-[#fffdf9] text-[#b7a68e] hover:bg-[#fffdf9]" disabled={!canScrollRight} onClick={() => scrollByCard(1)} size="sm"><ChevronRight aria-hidden="true" className="size-5" strokeWidth={1.2} /></IconButton>
    </div>
  );
}
