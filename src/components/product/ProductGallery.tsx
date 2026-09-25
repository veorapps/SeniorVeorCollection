"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import type { MediaAsset } from "@/domain/models";
import type { ProductBadge } from "@/domain/models";
import { Media } from "@/components/ui/Media";
import { cn } from "@/lib/cn";

const badgeLabels: Record<ProductBadge, string> = { new: "Yeni", "best-seller": "Çok Satan", limited: "Sınırlı Üretim" };

export function ProductGallery({ images, productName, badges = [] }: { images: MediaAsset[]; productName: string; badges?: ProductBadge[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const zoomTriggerRef = useRef<HTMLButtonElement>(null);
  const currentIndex = Math.min(selectedIndex, Math.max(images.length - 1, 0));
  const selectedImage = images[currentIndex];
  useEffect(() => { if (!isZoomOpen) return; closeButtonRef.current?.focus(); const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") { setIsZoomOpen(false); zoomTriggerRef.current?.focus(); } }; window.addEventListener("keydown", onKeyDown); return () => window.removeEventListener("keydown", onKeyDown); }, [isZoomOpen]);
  if (!selectedImage) return null;
  const selectRelative = (offset: number) => setSelectedIndex((index) => (index + offset + images.length) % images.length);

  return <section aria-label={`${productName} ürün galerisi`} className="min-w-0"><div className="relative overflow-hidden border border-brand-line bg-brand-paper"><Media asset={selectedImage} className="aspect-[1.5] w-full object-contain" loading="eager" sizes="(min-width: 1024px) 54vw, 100vw" />{badges.length ? <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5">{badges.map((badge) => <span className={cn("px-2.5 py-1 text-[0.625rem] font-semibold tracking-[0.08em] text-white uppercase", badge === "new" ? "bg-brand-teal" : "bg-brand-gold")} key={badge}>{badgeLabels[badge]}</span>)}</div> : null}<button aria-label={`${productName} görselini büyüt`} className="absolute right-3 bottom-3 flex size-9 items-center justify-center border border-brand-line bg-brand-paper/95 text-brand-ink shadow-sm hover:text-brand-teal" onClick={() => setIsZoomOpen(true)} ref={zoomTriggerRef} type="button"><ZoomIn aria-hidden="true" size={18} strokeWidth={1.5} /></button></div>{images.length > 1 ? <div className="mt-2.5 flex min-w-0 items-center gap-2"><button aria-label="Önceki görsel" className="flex size-7 shrink-0 items-center justify-center text-brand-gold hover:text-brand-teal" onClick={() => selectRelative(-1)} type="button"><ChevronLeft aria-hidden="true" size={22} strokeWidth={1.35} /></button><div aria-label="Galeri küçük görselleri" className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1">{images.map((image, index) => <button aria-label={`${index + 1}. görseli göster: ${image.alt}`} aria-pressed={currentIndex === index} className={cn("w-[calc((100%-1rem)/3)] min-w-[5.25rem] max-w-32 shrink-0 overflow-hidden border bg-brand-paper p-0.5", currentIndex === index ? "border-brand-gold" : "border-brand-line hover:border-brand-gold")} key={`${image.src}-${index}`} onClick={() => setSelectedIndex(index)} type="button"><Media asset={image} className="aspect-[1.25] w-full object-contain" sizes="8rem" /></button>)}</div><button aria-label="Sonraki görsel" className="flex size-7 shrink-0 items-center justify-center text-brand-gold hover:text-brand-teal" onClick={() => selectRelative(1)} type="button"><ChevronRight aria-hidden="true" size={22} strokeWidth={1.35} /></button></div> : null}{isZoomOpen ? <div aria-label={`${productName} büyütülmüş görseli`} aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={(event) => { if (event.target === event.currentTarget) setIsZoomOpen(false); }} role="dialog"><div className="relative flex max-h-full w-full max-w-5xl flex-col items-center gap-3"><button aria-label="Büyütülmüş görseli kapat" className="self-end border border-brand-line bg-brand-paper p-2 text-brand-ink" onClick={() => { setIsZoomOpen(false); zoomTriggerRef.current?.focus(); }} ref={closeButtonRef} type="button"><X aria-hidden="true" size={20} /></button><Media asset={selectedImage} className="max-h-[80vh] w-auto max-w-full object-contain" sizes="100vw" /></div></div> : null}</section>;
}
