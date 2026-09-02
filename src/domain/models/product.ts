import type { Review } from "./commerce";
import type { BenefitItem, CurrencyCode, FAQItem, MediaAsset, SEOData } from "./common";

export type ScentFamily = "floral" | "woody" | "amber" | "oriental" | "fresh" | "unisex";
export type ProductBadge = "new" | "best-seller" | "limited";
export type Season = "spring" | "summer" | "autumn" | "winter";
export type UsageTime = "day" | "night" | "special-occasion";

export interface FragranceNote {
  id: string;
  name: string;
  image?: MediaAsset;
}

export interface Variant {
  id: string;
  label: string;
  volumeMl: number;
  price: number;
  currency: CurrencyCode;
  inStock: boolean;
  stockLabel?: string;
}

export interface ProductCompliance {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  productType: string;
  price: number;
  currency: CurrencyCode;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  inStock: boolean;
  badges: ProductBadge[];
  scentFamilies: ScentFamily[];
  topNotes: FragranceNote[];
  middleNotes: FragranceNote[];
  baseNotes: FragranceNote[];
  longevity: number;
  intensity: number;
  seasons: Season[];
  usageTimes: UsageTime[];
  variants: Variant[];
  images: MediaAsset[];
  benefits: BenefitItem[];
  ingredients: string;
  compliance: ProductCompliance[];
  faq: FAQItem[];
  seo: SEOData;
  relatedProductIds: string[];
}

export interface ProductFilter {
  scentFamily?: ScentFamily;
  inStockOnly?: boolean;
}

export type ProductSort = "newest" | "price-ascending" | "price-descending" | "rating";
