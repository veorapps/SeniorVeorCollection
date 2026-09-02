import type { BlogRepository, CertificateRepository, PageRepository, SettingsRepository } from "@/domain/repositories";

export function createContentService(
  blogRepository: BlogRepository,
  pageRepository: PageRepository,
  settingsRepository: SettingsRepository,
  certificateRepository: CertificateRepository,
) {
  return {
    getBlogPosts: (categorySlug?: string) => blogRepository.getAll(categorySlug),
    getBlogPostBySlug: (slug: string) => blogRepository.getBySlug(slug),
    getFeaturedBlogPost: () => blogRepository.getFeatured(),
    getHomePage: () => pageRepository.getHomePage(),
    getCatalogPage: () => pageRepository.getCatalogPage(),
    getAboutPage: () => pageRepository.getAboutPage(),
    getSiteSettings: () => settingsRepository.getSiteSettings(),
    getCertificates: () => certificateRepository.getAll(),
  };
}
