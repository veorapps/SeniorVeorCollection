import {
  mockBlogRepository,
  mockCertificateRepository,
  mockPageRepository,
  mockProductRepository,
  mockSettingsRepository,
} from "@/data/mock/repositories";
import { createCatalogService } from "./catalogService";
import { createContentService } from "./contentService";

export const catalogService = createCatalogService(mockProductRepository);
export const contentService = createContentService(
  mockBlogRepository,
  mockPageRepository,
  mockSettingsRepository,
  mockCertificateRepository,
);
