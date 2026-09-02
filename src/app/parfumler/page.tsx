import type { ProductSort, ScentFamily } from "@/domain/models";
import { CatalogListingPage } from "@/components/collection/CatalogListingPage";
import { catalogService, contentService } from "@/services";

const validFamilies = new Set<ScentFamily>(["floral", "woody", "amber", "oriental", "fresh", "unisex"]);
const validSorts = new Set<ProductSort>(["newest", "price-ascending", "price-descending", "rating"]);

export default async function PerfumesPage({ searchParams }: { searchParams: Promise<{ family?: string | string[]; sort?: string | string[] }> }) {
  const query = await searchParams;
  const family = typeof query.family === "string" && validFamilies.has(query.family as ScentFamily) ? query.family as ScentFamily : undefined;
  const sort = typeof query.sort === "string" && validSorts.has(query.sort as ProductSort) ? query.sort as ProductSort : "newest";
  const [data, products] = await Promise.all([contentService.getCatalogPage(), catalogService.getProducts({ scentFamily: family }, sort)]);
  return <CatalogListingPage activeFamily={family} data={data} mode="perfumes" products={products} sort={sort} />;
}
