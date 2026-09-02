import type { AboutPageData, BlogPageData, CatalogPageData, DocumentsPageData, HomePageData } from "@/domain/models";

export interface PageRepository {
  getHomePage(): Promise<HomePageData>;
  getCatalogPage(): Promise<CatalogPageData>;
  getAboutPage(): Promise<AboutPageData>;
  getDocumentsPage(): Promise<DocumentsPageData>;
  getBlogPage(): Promise<BlogPageData>;
}
