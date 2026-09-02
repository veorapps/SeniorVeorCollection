"use client";

import { useState } from "react";
import type { MediaAsset } from "@/domain/models";
import { Media } from "@/components/ui/Media";
import { cn } from "@/lib/cn";

export function ProductGallery({ images, productName }: { images: MediaAsset[]; productName: string }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex];
  if (!selectedImage) return null;

  return <section aria-label={`${productName} ürün galerisi`}><div className="border border-brand-line bg-brand-paper p-3"><Media asset={selectedImage} className="aspect-[4/5] object-contain" loading="eager" sizes="(min-width: 1024px) 50vw, 100vw" /></div>{images.length > 1 ? <div aria-label="Galeri küçük görselleri" className="mt-3 grid grid-cols-3 gap-3">{images.map((image, index) => <button aria-label={`${index + 1}. görseli göster`} aria-pressed={selectedIndex === index} className={cn("overflow-hidden border bg-brand-paper p-1.5", selectedIndex === index ? "border-brand-teal" : "border-brand-line hover:border-brand-gold")} key={image.src} onClick={() => setSelectedIndex(index)}><Media asset={image} className="aspect-square object-contain" sizes="8rem" /></button>)}</div> : null}</section>;
}
