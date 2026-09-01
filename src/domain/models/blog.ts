import type { MediaAsset, SEOData } from "./common";

export interface BlogCategory {
  id: string;
  slug: string;
  name: string;
  description?: string;
  enabled: boolean;
  order: number;
}

export type ArticleContentBlock =
  | { type: "paragraph"; id: string; text: string }
  | { type: "heading"; id: string; level: 2 | 3; text: string }
  | { type: "quote"; id: string; text: string; attribution?: string }
  | { type: "image"; id: string; image: MediaAsset; caption?: string }
  | { type: "callout"; id: string; title: string; text: string };

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  categoryId: string;
  coverImage: MediaAsset;
  publishedAt: string;
  readingTimeMinutes: number;
  content: ArticleContentBlock[];
  featured: boolean;
  enabled: boolean;
  seo: SEOData;
  relatedPostIds: string[];
}
