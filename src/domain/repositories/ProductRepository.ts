import type { Product, ProductFilter, ProductSort } from "@/domain/models";

export interface ProductRepository {
  getAll(filter?: ProductFilter, sort?: ProductSort): Promise<Product[]>;
  getBySlug(slug: string): Promise<Product | null>;
  getByIds(ids: string[]): Promise<Product[]>;
}
