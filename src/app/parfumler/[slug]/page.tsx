import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/components/product/ProductDetailPage";
import { catalogService } from "@/services";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await catalogService.getProductBySlug(slug);
  if (!product) notFound();
  const relatedProducts = await catalogService.getProductsByIds(product.relatedProductIds);
  return <ProductDetailPage product={product} relatedProducts={relatedProducts} />;
}
