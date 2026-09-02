import type {
  AnnouncementItem,
  BenefitItem,
  CTA,
  FooterColumn,
  MediaAsset,
  NavigationItem,
  PageSectionBase,
  SEOData,
} from "./common";
import type { ScentFamily } from "./product";

export interface ContactDetails {
  phone: string;
  email: string;
  address: string;
  workingHours: string[];
  mapUrl?: string;
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: string;
}

export interface SiteSettings {
  siteName: string;
  brandDescription: string;
  logo: MediaAsset;
  defaultSEO: SEOData;
  announcements: AnnouncementItem[];
  navigation: NavigationItem[];
  footerColumns: FooterColumn[];
  footerContactTitle: string;
  contact: ContactDetails;
  socialLinks: SocialLink[];
  paymentProviders: string[];
  copyright: string;
}

export interface HomeHeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  desktopImage: MediaAsset;
  mobileImage?: MediaAsset;
  primaryCTA: CTA;
  secondaryCTA?: CTA;
  notes: MediaAsset[];
  enabled: boolean;
  order: number;
}

export interface HomeHeroSection extends PageSectionBase<"hero"> {
  slides: HomeHeroSlide[];
}

export interface HomeTrustSection extends PageSectionBase<"trust-bar"> {
  items: BenefitItem[];
}

export interface HomeProductSection extends PageSectionBase<"featured-products"> {
  eyebrow: string;
  title: string;
  cta: CTA;
  productIds: string[];
}

export interface HomeScentDiscoverySection extends PageSectionBase<"scent-discovery"> {
  eyebrow: string;
  title: string;
  description: string;
  cta: CTA;
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  longevityLabel: string;
  intensityLabel: string;
}

export interface HomeIngredient {
  id: string;
  name: string;
  image: MediaAsset;
  enabled: boolean;
  order: number;
}

export interface HomeIngredientsSection extends PageSectionBase<"ingredients"> {
  title: string;
  items: HomeIngredient[];
}

export interface HomePackagingSection extends PageSectionBase<"packaging"> {
  title: string;
  description: string;
  image: MediaAsset;
  cta: CTA;
  benefits: BenefitItem[];
}

export interface HomeNewsletterSection extends PageSectionBase<"newsletter"> {
  title: string;
  description: string;
}

export interface HomePageData {
  seo: SEOData;
  hero: HomeHeroSection;
  trustBar: HomeTrustSection;
  featuredProducts: HomeProductSection;
  scentDiscovery: HomeScentDiscoverySection;
  ingredients: HomeIngredientsSection;
  packaging: HomePackagingSection;
  newsletter: HomeNewsletterSection;
}

export interface CatalogScentFamily {
  id: ScentFamily;
  label: string;
  description: string;
  image: MediaAsset;
  enabled: boolean;
  order: number;
}

export interface CatalogPageData {
  seo: SEOData;
  hero: {
    id: string;
    type: "catalog-hero";
    enabled: boolean;
    order: number;
    eyebrow: string;
    title: string;
    description: string;
    image: MediaAsset;
  };
  scentFamilies: {
    id: string;
    type: "scent-families";
    enabled: boolean;
    order: number;
    title: string;
    items: CatalogScentFamily[];
  };
  listings: {
    collection: { eyebrow: string; title: string; description: string };
    perfumes: { eyebrow: string; title: string; description: string };
  };
}
