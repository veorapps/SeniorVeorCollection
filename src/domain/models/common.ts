export type CurrencyCode = "TRY";

export interface MediaAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  mobileSrc?: string;
  blurDataURL?: string;
}

export interface CTA {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "text";
  external?: boolean;
}

export interface SEOData {
  metaTitle: string;
  metaDescription: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: MediaAsset;
  canonical?: string;
}

export interface PageSectionBase<TType extends string = string> {
  id: string;
  type: TType;
  enabled: boolean;
  order: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  enabled: boolean;
  order: number;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  enabled: boolean;
  order: number;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  enabled: boolean;
  order: number;
  newTab?: boolean;
}

export interface AnnouncementItem {
  id: string;
  text: string;
  icon?: string;
  enabled: boolean;
  order: number;
}

export interface FooterLink {
  id: string;
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterColumn {
  id: string;
  title: string;
  links: FooterLink[];
  enabled: boolean;
  order: number;
}
