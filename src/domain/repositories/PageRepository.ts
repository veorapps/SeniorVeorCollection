import type { AboutPageData, CatalogPageData, HomePageData } from "@/domain/models";

export interface PageRepository {
  getHomePage(): Promise<HomePageData>;
  getCatalogPage(): Promise<CatalogPageData>;
  getAboutPage(): Promise<AboutPageData>;
}
