import type { HomePageData } from "@/domain/models";

export interface PageRepository {
  getHomePage(): Promise<HomePageData>;
}
