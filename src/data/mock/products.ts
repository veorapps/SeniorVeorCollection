import type { Product, ProductBadge, ScentFamily } from "@/domain/models";
import { placeholderMedia } from "./media";

interface ProductSeed {
  slug: string;
  name: string;
  subtitle: string;
  families: ScentFamily[];
  tone: "teal" | "gold" | "ivory";
  badges: ProductBadge[];
  rating: number;
  reviewCount: number;
  top: string[];
  middle: string[];
  base: string[];
}

const productSeeds: ProductSeed[] = [
  { slug: "if-only", name: "If Only", subtitle: "Çiçeksi · Meyvemsi", families: ["floral"], tone: "teal", badges: ["new", "best-seller"], rating: 4.8, reviewCount: 236, top: ["Bergamot", "Mandarin", "Pembe Biber"], middle: ["Yasemin", "Gül", "İris"], base: ["Misk", "Amber", "Sandal Ağacı"] },
  { slug: "after-us", name: "After Us", subtitle: "Oryantal · Odunsu", families: ["oriental", "woody"], tone: "ivory", badges: [], rating: 4.6, reviewCount: 52, top: ["Mandarin", "Safran"], middle: ["Gül", "Paçuli"], base: ["Vanilya", "Oud", "Misk"] },
  { slug: "midnight-veil", name: "Midnight Veil", subtitle: "Odunsu · Baharatlı", families: ["woody"], tone: "teal", badges: ["best-seller"], rating: 4.9, reviewCount: 74, top: ["Karabiber", "Kakule"], middle: ["Tütsü", "Sedir"], base: ["Oud", "Amber", "Labdanum"] },
  { slug: "golden-sillage", name: "Golden Sillage", subtitle: "Amber · Vanilya", families: ["amber"], tone: "gold", badges: [], rating: 4.8, reviewCount: 58, top: ["Armut", "Bergamot"], middle: ["Portakal Çiçeği", "Heliotrop"], base: ["Vanilya", "Tonka", "Amber"] },
  { slug: "velvet-accord", name: "Velvet Accord", subtitle: "Miskus · Çiçeksi", families: ["floral", "unisex"], tone: "teal", badges: [], rating: 4.8, reviewCount: 67, top: ["Limon", "Neroli"], middle: ["Beyaz Çiçekler", "İris"], base: ["Beyaz Misk", "Kaşmir Ağacı"] },
  { slug: "rouge-eclipse", name: "Rouge Éclipse", subtitle: "Amber · Baharatlı", families: ["amber", "oriental"], tone: "gold", badges: ["limited"], rating: 4.7, reviewCount: 63, top: ["Vişne", "Pembe Biber"], middle: ["Gül", "Tarçın"], base: ["Amber", "Vanilya", "Benzoin"] },
  { slug: "forest-whisper", name: "Forest Whisper", subtitle: "Odunsu · Aromatik", families: ["woody", "unisex"], tone: "teal", badges: [], rating: 4.6, reviewCount: 41, top: ["Adaçayı", "Ardıç"], middle: ["Menekşe Yaprağı", "Sedir"], base: ["Vetiver", "Misk", "Yosun"] },
  { slug: "azure-breeze", name: "Azure Breeze", subtitle: "Fresh · Sitrus", families: ["fresh", "unisex"], tone: "gold", badges: ["new"], rating: 4.4, reviewCount: 39, top: ["Greyfurt", "Limon"], middle: ["Portakal Çiçeği", "Deniz Esintisi"], base: ["Beyaz Misk", "Ambergris"] },
];

function noteList(notes: string[]) {
  return notes.map((name) => ({ id: name.toLocaleLowerCase("tr-TR").replaceAll(" ", "-"), name }));
}

function toProduct(seed: ProductSeed): Product {
  return {
    id: `product-${seed.slug}`,
    slug: seed.slug,
    name: seed.name,
    subtitle: seed.subtitle,
    description: `${seed.name}, zarif nota geçişleriyle gün boyu eşlik eden sofistike bir eau de parfum deneyimi sunar.`,
    productType: "Eau de Parfum",
    price: 2490,
    currency: "TRY",
    rating: seed.rating,
    reviewCount: seed.reviewCount,
    reviews: [
      { id: `${seed.slug}-review-1`, productId: `product-${seed.slug}`, authorName: "Melis A.", rating: 5, body: "İlk sıkıldığında ferah ve zarif; zamanla tenle bütünleşen çok dengeli bir koku.", createdAt: "2026-08-29T12:00:00.000Z", verifiedPurchase: true, helpfulCount: 12 },
      { id: `${seed.slug}-review-2`, productId: `product-${seed.slug}`, authorName: "Serkan K.", rating: 5, body: "Gün boyu kalıcılığı etkileyici. Şişe tasarımı da en az kokusu kadar özenli.", createdAt: "2026-08-27T12:00:00.000Z", verifiedPurchase: true, helpfulCount: 7 },
      { id: `${seed.slug}-review-3`, productId: `product-${seed.slug}`, authorName: "Ece T.", rating: 4, body: "Zarif, temiz ve sofistike. Her mevsimde rahatça kullanabileceğim bir imza koku.", createdAt: "2026-08-20T12:00:00.000Z", verifiedPurchase: false, helpfulCount: 4 },
    ],
    inStock: true,
    badges: seed.badges,
    scentFamilies: seed.families,
    topNotes: noteList(seed.top),
    middleNotes: noteList(seed.middle),
    baseNotes: noteList(seed.base),
    longevity: 4,
    intensity: 4,
    seasons: ["spring", "autumn", "winter"],
    usageTimes: ["day", "night", "special-occasion"],
    variants: [
      { id: `${seed.slug}-50`, label: "50 ML", volumeMl: 50, price: 2490, currency: "TRY", inStock: true },
      { id: `${seed.slug}-100`, label: "100 ML", volumeMl: 100, price: 3090, currency: "TRY", inStock: true },
    ],
    images: [placeholderMedia(seed.name, seed.tone), placeholderMedia(`${seed.name} şişe detayı`, "ivory", 900, 1200), placeholderMedia(`${seed.name} kutu detayı`, "gold", 900, 1200)],
    benefits: [
      { id: `${seed.slug}-benefit-1`, title: "Zarif ve unutulmaz", description: "Dengeli nota geçişleriyle iz bırakan kompozisyon.", icon: "sparkles", enabled: true, order: 1 },
      { id: `${seed.slug}-benefit-2`, title: "Uzun süre kalıcı", description: "Gün boyu etkileyici performans.", icon: "clock-3", enabled: true, order: 2 },
    ],
    ingredients: "Alcohol Denat., Parfum, Aqua, doğal ve sentetik koku bileşenleri.",
    compliance: [
      { id: `${seed.slug}-ifra`, label: "IFRA Uyumlu", description: "Uluslararası IFRA standartlarıyla uyumlu formülasyon.", icon: "badge-check" },
      { id: `${seed.slug}-cruelty-free`, label: "Hayvanlar Üzerinde Test Edilmemiştir", description: "Cruelty-free üretim yaklaşımı.", icon: "heart" },
    ],
    faq: [
      { id: `${seed.slug}-faq-1`, question: `${seed.name} hangi koku ailesine aittir?`, answer: `${seed.name}, ${seed.subtitle.toLocaleLowerCase("tr-TR")} karakterini taşır.`, enabled: true, order: 1 },
      { id: `${seed.slug}-faq-2`, question: "Kalıcılığı ne kadar sürer?", answer: "Cilt tipi ve ortam koşullarına bağlı olarak gün boyunca hissedilir.", enabled: true, order: 2 },
    ],
    seo: { metaTitle: `${seed.name} | Senior Veor Collection`, metaDescription: `${seed.name} eau de parfum ürün detayları.` },
    relatedProductIds: productSeeds.filter((item) => item.slug !== seed.slug).slice(0, 4).map((item) => `product-${item.slug}`),
  };
}

export const mockProducts = productSeeds.map(toProduct);
