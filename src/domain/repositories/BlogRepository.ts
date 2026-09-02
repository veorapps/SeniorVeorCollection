import type { BlogCategory, BlogPost } from "@/domain/models";

export interface BlogRepository {
  getAll(categorySlug?: string): Promise<BlogPost[]>;
  getBySlug(slug: string): Promise<BlogPost | null>;
  getFeatured(): Promise<BlogPost | null>;
  getCategories(): Promise<BlogCategory[]>;
}
