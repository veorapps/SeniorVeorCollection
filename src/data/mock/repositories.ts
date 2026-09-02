import type {
  BlogRepository,
  CertificateRepository,
  PageRepository,
  ProductRepository,
  SettingsRepository,
} from "@/domain/repositories";
import type { Product, ProductFilter, ProductSort } from "@/domain/models";
import { mockBlogPosts } from "./blog";
import { mockAboutPage, mockCatalogPage, mockCertificates, mockHomePage, mockSiteSettings } from "./site";
import { mockProducts } from "./products";

function sortProducts(products: Product[], sort: ProductSort = "newest"): Product[] {
  const sorted = [...products];
  if (sort === "price-ascending") return sorted.sort((a, b) => a.price - b.price);
  if (sort === "price-descending") return sorted.sort((a, b) => b.price - a.price);
  if (sort === "rating") return sorted.sort((a, b) => b.rating - a.rating);
  return sorted;
}

export const mockProductRepository: ProductRepository = {
  async getAll(filter?: ProductFilter, sort?: ProductSort) {
    const filtered = mockProducts.filter((product) => {
      if (filter?.scentFamily && !product.scentFamilies.includes(filter.scentFamily)) return false;
      return !(filter?.inStockOnly && !product.inStock);
    });
    return sortProducts(filtered, sort);
  },
  async getBySlug(slug) { return mockProducts.find((product) => product.slug === slug) ?? null; },
  async getByIds(ids) { return ids.flatMap((id) => mockProducts.filter((product) => product.id === id)); },
};

export const mockBlogRepository: BlogRepository = {
  async getAll(categorySlug) {
    if (!categorySlug) return mockBlogPosts.filter((post) => post.enabled);
    return mockBlogPosts.filter((post) => post.categoryId.endsWith(categorySlug.replace("parfum-notalari", "notes").replace("koku-rehberi", "guide").replace("bakim", "care")) && post.enabled);
  },
  async getBySlug(slug) { return mockBlogPosts.find((post) => post.slug === slug && post.enabled) ?? null; },
  async getFeatured() { return mockBlogPosts.find((post) => post.featured && post.enabled) ?? null; },
};

export const mockPageRepository: PageRepository = { async getHomePage() { return mockHomePage; }, async getCatalogPage() { return mockCatalogPage; }, async getAboutPage() { return mockAboutPage; } };
export const mockSettingsRepository: SettingsRepository = { async getSiteSettings() { return mockSiteSettings; } };
export const mockCertificateRepository: CertificateRepository = { async getAll() { return mockCertificates.filter((certificate) => certificate.enabled); } };
