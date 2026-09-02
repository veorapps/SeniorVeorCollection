import type { AboutPageData, CatalogPageData, Certificate, HomePageData, SiteSettings } from "@/domain/models";
import { placeholderMedia } from "./media";

export const mockSiteSettings: SiteSettings = {
  siteName: "Senior Veor Collection",
  brandDescription: "Kokunun zarafetle buluştuğu premium parfüm deneyimi.",
  logo: placeholderMedia("Senior Veor", "ivory", 360, 120),
  defaultSEO: { metaTitle: "Senior Veor Collection", metaDescription: "Kokunun zarafetle buluştuğu premium parfüm koleksiyonu." },
  announcements: [
    { id: "announcement-story", text: "Zarafetin İmzası. Her Şişede Bir Hikâye.", enabled: true, order: 1 },
    { id: "announcement-shipping", text: "Ücretsiz Kargo 750₺ ve üzeri", enabled: true, order: 2 },
    { id: "announcement-payment", text: "Hızlı ve Güvenli Alışveriş", enabled: true, order: 3 },
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
  footerColumns: [
    { id: "footer-corporate", title: "Kurumsal", enabled: true, order: 1, links: [{ id: "about", label: "Hakkımızda", href: "/hakkimizda" }, { id: "career", label: "Kariyer", href: "/kariyer" }, { id: "press", label: "Basında Biz", href: "/basinda-biz" }, { id: "sustainability", label: "Sürdürülebilirlik", href: "/surdurulebilirlik" }] },
    { id: "footer-service", title: "Müşteri Hizmetleri", enabled: true, order: 2, links: [{ id: "faq", label: "Sıkça Sorulan Sorular", href: "/iletisim#sss" }, { id: "shipping", label: "Kargo ve Teslimat", href: "/kargo-teslimat" }, { id: "returns", label: "İade ve Değişim", href: "/iade-degisim" }, { id: "privacy", label: "Gizlilik Politikası", href: "/gizlilik" }] },
    { id: "footer-help", title: "Yardım", enabled: true, order: 3, links: [{ id: "contact", label: "İletişim", href: "/iletisim" }, { id: "track", label: "Sipariş Takibi", href: "/siparis-takibi" }, { id: "terms", label: "Üyelik Sözleşmesi", href: "/uyelik-sozlesmesi" }, { id: "kvkk", label: "KVKK", href: "/kvkk" }] },
  ],
  footerContactTitle: "İletişim",
  contact: { phone: "+90 850 123 45 67", email: "info@seniorveorcollection.com", address: "Maslak Mah. Büyükdere Cad. No: 123 Sarıyer / İstanbul", workingHours: ["Pazartesi – Cuma: 09:00 – 18:00"] },
  socialLinks: [{ id: "instagram", label: "Instagram", href: "#", icon: "instagram" }, { id: "facebook", label: "Facebook", href: "#", icon: "facebook" }, { id: "youtube", label: "YouTube", href: "#", icon: "youtube" }, { id: "tiktok", label: "TikTok", href: "#", icon: "music-2" }],
  paymentProviders: ["VISA", "Mastercard", "Troy", "iyzico"],
  copyright: "© 2026 Senior Veor Collection. Tüm hakları saklıdır.",
};

export const mockHomePage: HomePageData = {
  seo: mockSiteSettings.defaultSEO,
  hero: { id: "home-hero", type: "hero", enabled: true, order: 1, slides: [{ id: "hero-01", eyebrow: "Zarafetin İmzası", title: "Kokunun Zarafetle Buluştuğu Koleksiyon", description: "Seçkin içerikler ve zamansız tasarımla her şişede bir hikâye.", desktopImage: { src: "/images/home/hero-luxury-perfume.png", alt: "Traverten üzerinde teal parfüm şişesi ve kutusu", width: 1536, height: 1024 }, primaryCTA: { label: "Koleksiyonu Keşfet", href: "/koleksiyon" }, secondaryCTA: { label: "Parfümleri İncele", href: "/parfumler", variant: "secondary" }, notes: [], enabled: true, order: 1 }] },
  trustBar: { id: "home-trust", type: "trust-bar", enabled: true, order: 2, items: [{ id: "trust-legal", title: "Yasal Uygunluk", description: "Türkiye mevzuatına uygun üretim ve satış.", icon: "shield-check", enabled: true, order: 1 }, { id: "trust-ifra", title: "IFRA Uyum Bilgisi", description: "Uluslararası standartlara uygun formülasyon.", icon: "badge-check", enabled: true, order: 2 }, { id: "trust-payment", title: "Güvenli Ödeme", description: "Korumalı ödeme altyapısı.", icon: "shield-check", enabled: true, order: 3 }, { id: "trust-shipping", title: "Hızlı Kargo", description: "750₺ ve üzeri alışverişlerde ücretsiz kargo.", icon: "truck", enabled: true, order: 4 }] },
  featuredProducts: { id: "home-featured", type: "featured-products", enabled: true, order: 3, eyebrow: "Öne Çıkan Parfümler", title: "Koleksiyonun Favorileri", cta: { label: "Tümünü Gör", href: "/koleksiyon", variant: "text" }, productIds: ["product-if-only", "product-after-us", "product-midnight-veil", "product-golden-sillage", "product-velvet-accord"] },
  scentDiscovery: { id: "home-discovery", type: "scent-discovery", enabled: true, order: 4, eyebrow: "Kokunuzu Keşfedin", title: "Sizin İçin Uyumlanan Notalar", description: "Koku piramidinin zamanla değişen katmanlarını keşfedin.", cta: { label: "Keşfetmeye Başla", href: "/koleksiyon" }, topNotes: ["Bergamot", "Mandarin", "Pembe Biber"], middleNotes: ["Gül", "Yasemin", "Menekşe"], baseNotes: ["Oud", "Amber", "Misk", "Vanilya"], longevityLabel: "8–10 Saat", intensityLabel: "Yüksek" },
  ingredients: { id: "home-ingredients", type: "ingredients", enabled: true, order: 5, title: "Notaların İzini Keşfedin", items: ["Bergamot", "Gül", "Oud", "Amber", "Misk", "Vanilya", "Sandal Ağacı", "Paçuli", "Yasemin"].map((name, order) => ({ id: `ingredient-${order}`, name, image: placeholderMedia(name, order % 2 === 0 ? "gold" : "ivory", 200, 150), enabled: true, order })) },
  packaging: { id: "home-packaging", type: "packaging", enabled: true, order: 6, title: "Her Şişe, Zarafetin İmzasını Taşır", description: "Özenle tasarlanan şişeler ve premium ambalajlarla koku deneyimini bir üst seviyeye taşıyoruz.", image: { src: "/images/home/hero-luxury-perfume.png", alt: "Zarif parfüm kutusu ve şişesi", width: 1536, height: 1024 }, cta: { label: "Koleksiyonu Keşfet", href: "/koleksiyon" }, benefits: [{ id: "packaging-ingredients", title: "Premium İçerikler", description: "Seçkin ve kaliteli hammaddeler.", icon: "sparkles", enabled: true, order: 1 }, { id: "packaging-craft", title: "Ustalıkla Üretim", description: "Titizlikle geliştirilen formüller.", icon: "badge-check", enabled: true, order: 2 }, { id: "packaging-design", title: "Zarif Ambalaj", description: "Lüks detaylarla sunum.", icon: "heart-handshake", enabled: true, order: 3 }] },
  newsletter: { id: "home-newsletter", type: "newsletter", enabled: true, order: 7, title: "Yeniliklerden Haberdar Olun", description: "Özel kampanyalar, yeni koleksiyonlar ve parfüm ipuçları e-posta kutunuzda." },
};

export const mockCatalogPage: CatalogPageData = {
  seo: { metaTitle: "Koleksiyon | Senior Veor Collection", metaDescription: "Senior Veor Collection'ın seçkin parfüm koleksiyonunu keşfedin." },
  hero: { id: "catalog-hero", type: "catalog-hero", enabled: true, order: 1, eyebrow: "Zarafetin İmzası", title: "Koleksiyon Parfümler", description: "Zarafeti ve gücü aynı şişede buluşturan, her anınıza eşlik edecek seçkin parfümler.", image: { src: "/images/home/hero-luxury-perfume.png", alt: "İpek fon üzerinde parfüm şişesi ve kutusu", width: 1536, height: 1024 } },
  scentFamilies: { id: "catalog-scent-families", type: "scent-families", enabled: true, order: 2, title: "Koleksiyonu Koku Ailelerine Göre Keşfet", items: [
    { id: "floral", label: "Çiçeksi", description: "Romantik & zarif", image: placeholderMedia("Çiçeksi", "ivory", 320, 200), enabled: true, order: 1 },
    { id: "woody", label: "Odunsu", description: "Sıcak & doğal", image: placeholderMedia("Odunsu", "teal", 320, 200), enabled: true, order: 2 },
    { id: "amber", label: "Amber", description: "Zengin & büyüleyici", image: placeholderMedia("Amber", "gold", 320, 200), enabled: true, order: 3 },
    { id: "oriental", label: "Oryantal", description: "Tutkulu & gizemli", image: placeholderMedia("Oryantal", "gold", 320, 200), enabled: true, order: 4 },
    { id: "fresh", label: "Fresh", description: "Ferahlık & enerji", image: placeholderMedia("Fresh", "teal", 320, 200), enabled: true, order: 5 },
    { id: "unisex", label: "Unisex", description: "Dengeli & zamansız", image: placeholderMedia("Unisex", "ivory", 320, 200), enabled: true, order: 6 },
  ] },
  listings: {
    collection: { eyebrow: "Koku Ailesi", title: "Koleksiyondaki Tüm Parfümler", description: "İmza kokunuzu, notaların karakterine göre keşfedin." },
    perfumes: { eyebrow: "Parfümler", title: "Size Eşlik Edecek Koku", description: "Her ruh hâline ve ana uyumlanan seçkin eau de parfum koleksiyonu." },
  },
};

export const mockAboutPage: AboutPageData = {
  seo: { metaTitle: "Hakkımızda | Senior Veor Collection", metaDescription: "Senior Veor Collection'ın zarafet, ustalık ve kalite yaklaşımını keşfedin." },
  hero: { id: "about-hero", type: "about-hero", enabled: true, order: 1, eyebrow: "Hakkımızda", title: "Kokunun Zarafetle Buluştuğu Bir Yolculuk", description: "Seçkin içerikler, zarif tasarım ve kusursuz işçilikle unutulmaz koku deneyimleri sunuyoruz.", image: { src: "/images/home/hero-luxury-perfume.png", alt: "Senior Veor parfüm koleksiyonu", width: 1536, height: 1024 }, cta: { label: "Koleksiyonu Keşfet", href: "/koleksiyon" } },
  story: { id: "about-story", type: "brand-story", enabled: true, order: 2, eyebrow: "Marka Hikâyesi", title: "Zarafetin İmzası", paragraphs: ["Senior Veor Collection, kokunun sadece bir duygu değil, bir hikâye olduğuna inanır.", "Doğadan ilham alan notaları modern parfüm sanatının inceliğiyle bir araya getirerek her anınıza eşlik eden imzalar yaratıyoruz."], image: placeholderMedia("Senior Veor ambalaj", "ivory", 800, 900) },
  craft: { id: "about-craft", type: "craft", enabled: true, order: 3, eyebrow: "Koku Sanatı & Ustalık", title: "İlham, Sanat ve Ustalık", description: "Usta parfümörlerin dokunuşu, en kaliteli hammaddeler ve titiz üretim süreçleri; her parfümümüzü benzersiz bir imzaya dönüştürür.", benefits: [{ id: "craft-ingredients", title: "Özenle Seçilmiş Hammaddeler", description: "Kokunun karakterini taşıyan seçkin içerikler.", icon: "sparkles", enabled: true, order: 1 }, { id: "craft-perfumers", title: "Usta Parfümörler", description: "Zamansız kompozisyonlara dönüşen incelik.", icon: "badge-check", enabled: true, order: 2 }, { id: "craft-longevity", title: "Uzun Süre Kalıcı", description: "Gün boyu sizinle kalan zarif performans.", icon: "clock-3", enabled: true, order: 3 }] },
  values: { id: "about-values", type: "values", enabled: true, order: 4, title: "Değerlerimiz", items: [{ id: "value-quality", title: "Kalite", description: "En iyi hammaddeler, en yüksek kalite standardı.", icon: "shield-check", enabled: true, order: 1 }, { id: "value-elegance", title: "Zarafet", description: "Zamansız tasarım ve sofistike koku deneyimi.", icon: "sparkles", enabled: true, order: 2 }, { id: "value-trust", title: "Güven", description: "Güvenilir formüller ve şeffaf üretim.", icon: "heart-handshake", enabled: true, order: 3 }, { id: "value-transparency", title: "Şeffaflık", description: "İçerik ve süreçlerde açık iletişim.", icon: "badge-check", enabled: true, order: 4 }] },
  journey: { id: "about-journey", type: "journey", enabled: true, order: 5, title: "Üretim Yolculuğumuz", items: [{ id: "journey-design", title: "Tasarım", description: "İlhamdan konsepte uzanan koku tasarımı.", enabled: true, order: 1 }, { id: "journey-formula", title: "Formülasyon", description: "Usta parfümörlerle dengelenen notalar.", enabled: true, order: 2 }, { id: "journey-ifra", title: "IFRA Uyum Kontrolü", description: "Uluslararası standartlarla titiz doğrulama.", enabled: true, order: 3 }, { id: "journey-bottling", title: "Şişeleme", description: "Hijyenik ve modern şişeleme süreci.", enabled: true, order: 4 }, { id: "journey-quality", title: "Kalite Kontrol", description: "Her partide koku ve kalite testi.", enabled: true, order: 5 }, { id: "journey-delivery", title: "Teslimat", description: "Özenli paketleme ve güvenli ulaşım.", enabled: true, order: 6 }] },
  packaging: { id: "about-packaging", type: "about-packaging", enabled: true, order: 6, eyebrow: "Paketleme Deneyimi", title: "Her Detayda Özen, Her Anlamda Zarafet", description: "Özel kutularımız ve zarif işçiliğimiz, parfümünüzü hediye etmeyi de unutulmaz bir deneyime dönüştürür.", image: placeholderMedia("Senior Veor hediye paketi", "gold", 900, 620), cta: { label: "Koleksiyonu Keşfet", href: "/koleksiyon" } },
  trustBar: { id: "about-trust", type: "about-trust", enabled: true, order: 7, items: [{ id: "about-trust-legal", title: "Sağlık Bakanlığı Onaylı", description: "Güvenli ve onaylı içerikler.", icon: "shield-check", enabled: true, order: 1 }, { id: "about-trust-ifra", title: "IFRA Uyumlu", description: "Uluslararası standartlara uygun.", icon: "badge-check", enabled: true, order: 2 }, { id: "about-trust-payment", title: "Güvenli Ödeme", description: "256-bit SSL ile korumalı alışveriş.", icon: "shield-check", enabled: true, order: 3 }, { id: "about-trust-shipping", title: "Hızlı Kargo", description: "Aynı gün kargo ve hızlı teslimat.", icon: "truck", enabled: true, order: 4 }] },
};

export const mockCertificates: Certificate[] = [
  { id: "certificate-ifra", title: "IFRA Uygunluk Belgeleri", description: "Uluslararası IFRA standartlarına uygun formülasyon kayıtları.", thumbnail: placeholderMedia("IFRA", "ivory", 720, 480), documentUrl: "#", documentType: "certificate", verified: true, enabled: true, order: 1, updatedAt: "2026-08-01T00:00:00.000Z" },
  { id: "certificate-quality", title: "Kalite Kontrol Raporları", description: "Her üretim aşamasındaki titiz kontrol sürecinin özeti.", thumbnail: placeholderMedia("Kalite", "gold", 720, 480), documentUrl: "#", documentType: "report", verified: true, enabled: true, order: 2, updatedAt: "2026-08-01T00:00:00.000Z" },
];
