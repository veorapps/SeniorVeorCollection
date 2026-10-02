import { Clock3, Heart, Truck } from "lucide-react";
import type { Product } from "@/domain/models";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { RatingStars } from "@/components/ui/RatingStars";
import { TrustBar } from "@/components/layout/TrustBar";
import { ProductGallery } from "./ProductGallery";
import { ProductPurchasePanel } from "./ProductPurchasePanel";
import { ProductIngredientsSection, ProductScentProfileSection } from "./ProductScentSections";
import { ProductCommunitySections } from "./ProductCommunitySections";

export function ProductDetailPage({ product, relatedProducts }: { product: Product; relatedProducts: Product[] }) {
  return <main><Container className="py-3"><Breadcrumb items={[{ href: "/parfumler", label: "Parfümler" }, { label: product.name }]} /></Container><Container className="grid gap-8 pb-9 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10"><ProductGallery images={product.images} productName={product.name} /><section className="lg:pt-1"><p className="text-[0.625rem] font-semibold tracking-[0.2em] text-brand-gold uppercase">{product.productType}</p><h1 className="mt-2 font-display text-[3.5rem] leading-[0.88] text-brand-ink sm:text-[4rem]">{product.name}</h1><p className="mt-2 text-[0.625rem] font-semibold tracking-[0.12em] text-brand-muted uppercase">{product.subtitle}</p><RatingStars className="mt-4" rating={product.rating} reviewCount={product.reviewCount} /><p className="mt-4 max-w-xl text-[0.8125rem] leading-5 text-brand-muted">{product.description}</p><ProductPurchasePanel product={product} /><div className="grid gap-3 pt-5 sm:grid-cols-3">{[{ icon: Truck, title: "Ücretsiz Kargo", copy: "750₺ ve üzeri" }, { icon: Clock3, title: "Hızlı Teslimat", copy: "1–2 iş günü" }, { icon: Heart, title: "Kolay İade", copy: "14 gün içinde" }].map(({ icon: Icon, title, copy }) => <div className="flex gap-2 border-l border-brand-line pl-3" key={title}><Icon aria-hidden="true" className="size-[1.15rem] shrink-0 text-brand-gold" strokeWidth={1.4} /><p className="text-[0.6875rem] text-brand-muted"><strong className="block text-brand-ink">{title}</strong>{copy}</p></div>)}</div></section></Container><ProductScentProfile product={product} /><ProductIngredients product={product} /><ProductCommunitySections product={product} relatedProducts={relatedProducts} /><TrustBar items={product.benefits} /></main>;
}

function ProductScentProfile({ product }: { product: Product }) {
  return <ProductScentProfileSection product={product} />;
}

function ProductIngredients({ product }: { product: Product }) { return <ProductIngredientsSection product={product} />; }
