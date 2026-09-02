"use client";
import Link from "next/link";
import type { Product } from "@/domain/models";
import { useCommerce } from "@/state/CommerceProvider";
import { ProductGrid } from "@/components/product/ProductGrid";
import { formatCurrency } from "@/lib/formatCurrency";
export function WishlistPage({ products }: { products: Product[] }) { const { wishlist }=useCommerce(); return <main className="mx-auto max-w-[var(--sv-container-max)] px-[var(--sv-gutter)] py-16"><h1 className="font-display text-5xl text-brand-ink">Favoriler</h1><div className="mt-8"><ProductGrid products={products.filter(p=>wishlist.includes(p.id))} /></div></main>; }
export function CartPage({ products }: { products: Product[] }) { const { cart }=useCommerce(); const items=cart.flatMap(i=>{const p=products.find(x=>x.id===i.productId);return p?[{...i,p}]:[]}); return <main className="mx-auto max-w-[var(--sv-container-max)] px-[var(--sv-gutter)] py-16"><h1 className="font-display text-5xl text-brand-ink">Sepet</h1>{items.length?<div className="mt-8 divide-y divide-brand-line border-y border-brand-line">{items.map(i=><div className="flex justify-between py-5" key={i.variantId}><span>{i.p.name} · {i.quantity} adet</span><strong>{formatCurrency(i.p.variants.find(v=>v.id===i.variantId)?.price??i.p.price,i.p.currency)}</strong></div>)}</div>:<p className="mt-6 text-brand-muted">Sepetiniz boş. <Link className="text-brand-teal underline" href="/parfumler">Parfümleri keşfedin.</Link></p>}</main>; }
