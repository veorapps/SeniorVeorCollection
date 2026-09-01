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
  logo: MediaAsset;
  defaultSEO: SEOData;
  announcements: AnnouncementItem[];
  navigation: NavigationItem[];
  footerColumns: FooterColumn[];
  contact: ContactDetails;
  socialLinks: SocialLink[];
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

export interface HomePageData {
  seo: SEOData;
  hero: HomeHeroSection;
  trustBar: HomeTrustSection;
  featuredProducts: HomeProductSection;
}
