"use client";

import { Minus, Plus, ShoppingBag } from "lucide-react";
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
  const { addCart } = useCommerce();
  const variant = product.variants.find((item) => item.id === variantId) ?? product.variants[0];
  if (!variant) return null;

  return <div className="mt-5 border-y border-brand-line py-5"><p className="text-[0.625rem] font-semibold tracking-[0.12em] text-brand-muted uppercase">Boyut</p><div className="mt-2.5 flex flex-wrap gap-2">{product.variants.map((item) => <button aria-pressed={variantId === item.id} className={cn("min-h-10 border px-5 text-[0.6875rem] font-semibold tracking-[0.08em] uppercase", variantId === item.id ? "border-brand-teal bg-brand-teal text-brand-ivory" : "border-brand-line text-brand-ink hover:border-brand-gold")} key={item.id} onClick={() => { setVariantId(item.id); setAdded(false); }}>{item.label}{item.price !== product.variants[0]?.price ? ` · +${formatCurrency(item.price - product.variants[0].price, item.currency)}` : ""}</button>)}</div><p className="mt-4 text-[2rem] font-display text-brand-ink">{formatCurrency(variant.price, variant.currency)}</p><div className="mt-5 flex flex-wrap gap-3"><div aria-label="Adet" className="flex min-h-10 items-center border border-brand-line"><button aria-label="Adedi azalt" className="grid size-10 place-items-center hover:bg-brand-sand disabled:opacity-40" disabled={quantity === 1} onClick={() => { setQuantity((value) => value - 1); setAdded(false); }}><Minus aria-hidden="true" className="size-4" /></button><span aria-live="polite" className="grid w-9 place-items-center text-sm">{quantity}</span><button aria-label="Adedi artır" className="grid size-10 place-items-center hover:bg-brand-sand" onClick={() => { setQuantity((value) => value + 1); setAdded(false); }}><Plus aria-hidden="true" className="size-4" /></button></div><Button className="min-w-56 grow" onClick={() => { addCart({ productId: product.id, variantId: variant.id, quantity }); setAdded(true); }}><ShoppingBag aria-hidden="true" className="mr-2 size-4" strokeWidth={1.5} />Sepete Ekle</Button></div>{added ? <p aria-live="polite" className="mt-3 text-sm text-brand-teal">{quantity} adet {product.name} sepete eklendi.</p> : null}</div>;
}
