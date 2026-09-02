import { HomePage } from "@/components/home/HomePage";
import { catalogService, contentService } from "@/services";

export default async function Page() {
  const homePage = await contentService.getHomePage();
  const featuredProducts = await catalogService.getProductsByIds(homePage.featuredProducts.productIds);
  return <HomePage data={homePage} featuredProducts={featuredProducts} />;
}
