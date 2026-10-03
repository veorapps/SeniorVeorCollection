import type { BlogCategory, BlogPost } from "@/domain/models";

export const mockBlogCategories: BlogCategory[] = [
  { id: "category-guide", slug: "koku-rehberi", name: "Koku Rehberi", icon: "compass", enabled: true, order: 1 },
  { id: "category-notes", slug: "parfum-notalari", name: "Parfüm Notaları", icon: "heart", enabled: true, order: 2 },
  { id: "category-usage", slug: "kullanim-onerileri", name: "Kullanım Önerileri", icon: "sparkles", enabled: true, order: 3 },
  { id: "category-longevity", slug: "kalicilik", name: "Kalıcılık", icon: "clock", enabled: true, order: 4 },
  { id: "category-care", slug: "bakim", name: "Bakım", icon: "flower", enabled: true, order: 5 },
  { id: "category-news", slug: "marka-haberleri", name: "Marka Haberleri", icon: "newspaper", enabled: true, order: 6 },
];

const postSeeds = [
  { slug: "parfum-notalari-nedir", title: "Parfüm Notaları Nedir? Üst, Orta ve Alt Notalar Rehberi", categoryId: "category-notes", featured: true, excerpt: "Parfümlerin karakterini belirleyen nota katmanlarını keşfedin.", readingTimeMinutes: 5, coverImage: { src: "/images/home/scent-pyramid-v1.png", alt: "Narenciye, çiçek ve odunsu parfüm notaları", width: 1254, height: 1254 } },
  { slug: "parfum-turleri", title: "Parfüm Türleri Nelerdir? EDP, EDT, Parfum Farkları", categoryId: "category-guide", featured: false, excerpt: "Parfüm konsantrasyonları arasındaki farkları öğrenin, size en uygun olanı seçin.", readingTimeMinutes: 5, coverImage: { src: "/images/products/group-five.jpg", alt: "Senior Veor parfüm koleksiyonu", width: 900, height: 1600 } },
  { slug: "kaliciligi-artirmanin-7-yolu", title: "Kalıcılığı Artırmanın 7 Etkili Yolu", categoryId: "category-longevity", featured: false, excerpt: "Parfümünüzün gün boyu sizinle kalması için uygulayabileceğiniz pratik ipuçları.", readingTimeMinutes: 3, coverImage: { src: "/images/home/hero-if-only-desktop-v2.png", alt: "İpek üzerinde If Only parfümü", width: 2172, height: 724 } },
  { slug: "mevsimlere-gore-parfum-secimi", title: "Mevsimlere Göre Parfüm Seçimi", categoryId: "category-guide", featured: false, excerpt: "İlkbahar, yaz, sonbahar ve kış ayları için en uygun koku önerileri.", readingTimeMinutes: 5, coverImage: { src: "/images/notes/bergamot.png", alt: "Taze bergamot notaları", width: 1254, height: 1254 } },
  { slug: "parfum-sisesi-nasil-saklanmali", title: "Parfüm Şişesi Nasıl Saklanmalı?", categoryId: "category-care", featured: false, excerpt: "Kokunuzun ömrünü korumak için doğru saklama koşulları ve öneriler.", readingTimeMinutes: 3, coverImage: { src: "/images/products/if-only/if-only-packaging-50ml-100ml.png", alt: "If Only parfüm kutuları", width: 1080, height: 1920 } },
  { slug: "vanilya-notasi", title: "Vanilya Notası: Sıcak, Tatlı ve Baştan Çıkarıcı", categoryId: "category-notes", featured: false, excerpt: "Vanilyanın parfümlerdeki yerini ve en iyi nota kombinasyonlarını keşfedin.", readingTimeMinutes: 4, coverImage: { src: "/images/notes/vanilya.png", alt: "Vanilya çiçekleri ve çubukları", width: 1254, height: 1254 } },
  { slug: "odunsu-notalarin-zamansiz-cazibesi", title: "Odunsu Notaların Zamansız Cazibesi", categoryId: "category-notes", featured: false, excerpt: "Sandal, sedir ve paçuli gibi odunsu notaların karakterini tanıyın.", readingTimeMinutes: 4, coverImage: { src: "/images/notes/sandal-agaci.png", alt: "Sandal ağacı parçaları", width: 1254, height: 1254 } },
  { slug: "parfum-kullaniminda-dogru-noktalar", title: "Parfüm Kullanımında Doğru Noktalar", categoryId: "category-usage", featured: false, excerpt: "Kokunuzun etkisini artıracak doğru uygulama noktalarını ve teknikleri öğrenin.", readingTimeMinutes: 3, coverImage: { src: "/images/products/if-only/if-only-100ml-gold-cap.png", alt: "If Only parfüm şişesi", width: 1024, height: 1536 } },
  { slug: "senior-veordan-haberler", title: "Senior Veor’dan Haberler", categoryId: "category-news", featured: false, excerpt: "Yeni koleksiyonları, özel iş birliklerini ve marka gelişmelerini keşfedin.", readingTimeMinutes: 3, coverImage: { src: "/images/home/packaging-band-if-only-v1.png", alt: "Senior Veor parfümü ve markalı kutusu", width: 1536, height: 1024 } },
] as const;

export const mockBlogPosts: BlogPost[] = postSeeds.map(({ categoryId, coverImage, excerpt, featured, readingTimeMinutes, slug, title }) => ({
  id: `post-${slug}`,
  slug,
  title,
  excerpt,
  categoryId,
  coverImage,
  publishedAt: "2026-08-20T10:00:00.000Z",
  readingTimeMinutes,
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
