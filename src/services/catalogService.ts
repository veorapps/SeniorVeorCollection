import type { ProductFilter, ProductSort } from "@/domain/models";
import type { ProductRepository } from "@/domain/repositories";

export function createCatalogService(repository: ProductRepository) {
  return {
    getProducts: (filter?: ProductFilter, sort?: ProductSort) => repository.getAll(filter, sort),
    getProductBySlug: (slug: string) => repository.getBySlug(slug),
    getProductsByIds: (ids: string[]) => repository.getByIds(ids),
  };
}
