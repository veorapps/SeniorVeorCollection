import { HomePage } from "@/components/home/HomePage";
import { catalogService, contentService } from "@/services";

export default async function Page() {
  const [homePage, featuredProducts] = await Promise.all([
    contentService.getHomePage(),
    catalogService.getProductsByIds(["product-if-only", "product-after-us", "product-midnight-veil", "product-golden-sillage", "product-velvet-accord"]),
  ]);
  return <HomePage data={homePage} featuredProducts={featuredProducts} />;
}
