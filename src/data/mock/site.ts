import type { Certificate, HomePageData, SiteSettings } from "@/domain/models";
import { placeholderMedia } from "./media";

export const mockSiteSettings: SiteSettings = {
  siteName: "Senior Veor Collection",
  logo: placeholderMedia("Senior Veor", "ivory", 360, 120),
  defaultSEO: { metaTitle: "Senior Veor Collection", metaDescription: "Kokunun zarafetle buluştuğu premium parfüm koleksiyonu." },
  announcements: [
    { id: "announcement-story", text: "Zarafetin İmzası. Her Şişede Bir Hikâye.", enabled: true, order: 1 },
    { id: "announcement-shipping", text: "Ücretsiz Kargo 750₺ ve üzeri", enabled: true, order: 2 },
  ],
  navigation: [
    { id: "home", label: "Ana Sayfa", href: "/", enabled: true, order: 1 },
    { id: "collection", label: "Koleksiyon", href: "/koleksiyon", enabled: true, order: 2 },
    { id: "perfumes", label: "Parfümler", href: "/parfumler", enabled: true, order: 3 },
    { id: "about", label: "Hakkımızda", href: "/hakkimizda", enabled: true, order: 4 },
    { id: "documents", label: "Belgeler", href: "/belgeler", enabled: true, order: 5 },
    { id: "blog", label: "Blog", href: "/blog", enabled: true, order: 6 },
    { id: "contact", label: "İletişim", href: "/iletisim", enabled: true, order: 7 },
  ],
  footerColumns: [],
  contact: { phone: "+90 850 123 45 67", email: "info@seniorveorcollection.com", address: "Maslak Mah. Büyükdere Cad. No: 123 Sarıyer / İstanbul", workingHours: ["Pazartesi – Cuma: 09:00 – 18:00"] },
  socialLinks: [],
};

export const mockHomePage: HomePageData = {
  seo: mockSiteSettings.defaultSEO,
  hero: { id: "home-hero", type: "hero", enabled: true, order: 1, slides: [{ id: "hero-01", eyebrow: "Zarafetin İmzası", title: "Kokunun Zarafetle Buluştuğu Koleksiyon", description: "Seçkin içerikler ve zamansız tasarımla her şişede bir hikâye.", desktopImage: placeholderMedia("Senior Veor", "teal"), primaryCTA: { label: "Koleksiyonu Keşfet", href: "/koleksiyon" }, secondaryCTA: { label: "Parfümleri İncele", href: "/parfumler", variant: "secondary" }, notes: [], enabled: true, order: 1 }] },
  trustBar: { id: "home-trust", type: "trust-bar", enabled: true, order: 2, items: [{ id: "trust-ifra", title: "IFRA Uyum Bilgisi", description: "Uluslararası standartlara uygun formülasyon.", icon: "badge-check", enabled: true, order: 1 }] },
  featuredProducts: { id: "home-featured", type: "featured-products", enabled: true, order: 3, eyebrow: "Öne Çıkan Parfümler", title: "Koleksiyonun Favorileri", cta: { label: "Tümünü Gör", href: "/koleksiyon", variant: "text" }, productIds: ["product-if-only", "product-after-us", "product-midnight-veil", "product-golden-sillage", "product-velvet-accord"] },
};

export const mockCertificates: Certificate[] = [
  { id: "certificate-ifra", title: "IFRA Uygunluk Belgeleri", description: "Uluslararası IFRA standartlarına uygun formülasyon kayıtları.", thumbnail: placeholderMedia("IFRA", "ivory", 720, 480), documentUrl: "#", documentType: "certificate", verified: true, enabled: true, order: 1, updatedAt: "2026-08-01T00:00:00.000Z" },
  { id: "certificate-quality", title: "Kalite Kontrol Raporları", description: "Her üretim aşamasındaki titiz kontrol sürecinin özeti.", thumbnail: placeholderMedia("Kalite", "gold", 720, 480), documentUrl: "#", documentType: "report", verified: true, enabled: true, order: 2, updatedAt: "2026-08-01T00:00:00.000Z" },
];
