import type { BlogCategory, BlogPost } from "@/domain/models";
import { placeholderMedia } from "./media";

export const mockBlogCategories: BlogCategory[] = [
  { id: "category-guide", slug: "koku-rehberi", name: "Koku Rehberi", enabled: true, order: 1 },
  { id: "category-notes", slug: "parfum-notalari", name: "Parfüm Notaları", enabled: true, order: 2 },
  { id: "category-care", slug: "bakim", name: "Bakım", enabled: true, order: 3 },
];

const postSeeds = [
  ["parfum-notalari-nedir", "Parfüm Notaları Nedir? Üst, Orta ve Alt Notalar Rehberi", "category-notes", true],
  ["parfum-turleri", "Parfüm Türleri Nelerdir? EDP, EDT, Parfum Farkları", "category-guide", false],
  ["kaliciligi-artirmanin-7-yolu", "Kalıcılığı Artırmanın 7 Etkili Yolu", "category-guide", false],
  ["mevsimlere-gore-parfum-secimi", "Mevsimlere Göre Parfüm Seçimi", "category-guide", false],
  ["parfum-sisesi-nasil-saklanmali", "Parfüm Şişesi Nasıl Saklanmalı?", "category-care", false],
] as const;

export const mockBlogPosts: BlogPost[] = postSeeds.map(([slug, title, categoryId, featured], index) => ({
  id: `post-${slug}`,
  slug,
  title,
  excerpt: "Koku seçiminizi daha bilinçli ve kişisel hale getirecek zamansız öneriler.",
  categoryId,
  coverImage: placeholderMedia(title, index % 2 === 0 ? "gold" : "ivory", 1200, 720),
  publishedAt: "2026-08-20T10:00:00.000Z",
  readingTimeMinutes: index + 3,
  content: [
    { id: `${slug}-intro`, type: "paragraph", text: "Parfüm, kişisel hafızamızda yer eden ince ve güçlü bir imzadır." },
    { id: `${slug}-heading`, type: "heading", level: 2, text: "Kokunun katmanlarını keşfedin" },
    { id: `${slug}-body`, type: "paragraph", text: "Doğru seçim için notaların zaman içindeki dönüşümünü ve cildinizle uyumunu değerlendirin." },
  ],
  featured,
  enabled: true,
  seo: { metaTitle: `${title} | Senior Veor`, metaDescription: "Senior Veor koku rehberinden zarif parfüm önerileri." },
  relatedPostIds: [],
}));
