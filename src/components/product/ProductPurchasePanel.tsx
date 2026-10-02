"use client";

import { Check, Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/domain/models";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/formatCurrency";
import { cn } from "@/lib/cn";
import { useCommerce } from "@/state/CommerceProvider";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addCart, toggleWishlist, wishlist } = useCommerce();
  const variant = product.variants.find((item) => item.id === variantId) ?? product.variants[0];
  if (!variant) return null;
  const isAvailable = product.inStock && variant.inStock;
  const isFavorite = wishlist.includes(product.id);

  return <div className="mt-5 border-y border-brand-line py-5">
    <div className="flex items-end justify-between gap-4">
      <p className="font-display text-[2rem] leading-none text-brand-ink">{formatCurrency(variant.price, variant.currency)}</p>
      <p className={cn("flex items-center gap-1.5 text-[0.6875rem] font-medium", isAvailable ? "text-brand-teal" : "text-brand-danger")}>
        {isAvailable ? <Check aria-hidden="true" className="size-3.5" strokeWidth={1.7} /> : null}
        {isAvailable ? (variant.stockLabel ?? "Stokta Var") : "Stokta Yok"}
      </p>
    </div>
    <fieldset className="mt-5">
      <legend className="text-[0.625rem] font-semibold tracking-[0.12em] text-brand-muted uppercase">Boyut</legend>
      <div className="mt-2.5 flex flex-wrap gap-2">{product.variants.map((item) => <button aria-pressed={variantId === item.id} className={cn("min-h-10 border px-5 text-[0.6875rem] font-semibold tracking-[0.08em] uppercase disabled:cursor-not-allowed disabled:opacity-45", variantId === item.id ? "border-brand-teal bg-brand-teal text-brand-ivory" : "border-brand-line text-brand-ink hover:border-brand-gold")} disabled={!item.inStock} key={item.id} onClick={() => { setVariantId(item.id); setQuantity(1); setAdded(false); }} type="button">{item.label}{item.price !== product.variants[0]?.price ? ` · +${formatCurrency(item.price - product.variants[0].price, item.currency)}` : ""}</button>)}</div>
    </fieldset>
    <div className="mt-5 grid grid-cols-[1fr_auto] gap-3 sm:grid-cols-[auto_1fr_auto]">
      <div aria-label="Adet" className="col-span-2 flex min-h-11 items-center border border-brand-line sm:col-span-1">
        <button aria-label="Adedi azalt" className="grid size-10 place-items-center hover:bg-brand-sand disabled:opacity-35" disabled={quantity === 1 || !isAvailable} onClick={() => { setQuantity((value) => Math.max(1, value - 1)); setAdded(false); }} type="button"><Minus aria-hidden="true" className="size-4" /></button>
        <span aria-live="polite" className="grid w-8 place-items-center text-sm tabular-nums">{quantity}</span>
        <button aria-label="Adedi artır" className="grid size-10 place-items-center hover:bg-brand-sand disabled:opacity-35" disabled={quantity >= 10 || !isAvailable} onClick={() => { setQuantity((value) => Math.min(10, value + 1)); setAdded(false); }} type="button"><Plus aria-hidden="true" className="size-4" /></button>
      </div>
      <Button className="min-w-0" disabled={!isAvailable} onClick={() => { addCart({ productId: product.id, variantId: variant.id, quantity }); setAdded(true); }}><ShoppingBag aria-hidden="true" className="mr-2 size-4" strokeWidth={1.5} />{isAvailable ? "Sepete Ekle" : "Stokta Yok"}</Button>
      <button aria-label={isFavorite ? `${product.name} ürününü favorilerden kaldır` : `${product.name} ürününü favorilere ekle`} aria-pressed={isFavorite} className={cn("grid size-11 place-items-center border transition-colors", isFavorite ? "border-brand-teal bg-brand-teal text-brand-ivory" : "border-brand-line text-brand-teal hover:border-brand-gold")} onClick={() => toggleWishlist(product.id)} type="button"><Heart aria-hidden="true" className="size-[1.15rem]" fill={isFavorite ? "currentColor" : "none"} strokeWidth={1.5} /></button>
    </div>
    <div className="mt-3 min-h-5">{added ? <p aria-live="polite" className="text-[0.75rem] text-brand-teal">{quantity} adet {product.name} sepete eklendi.</p> : null}</div>
  </div>;
}
