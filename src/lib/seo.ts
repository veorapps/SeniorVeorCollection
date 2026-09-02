import type { Metadata } from "next";
import type { SEOData } from "@/domain/models";
export function toMetadata(seo: SEOData): Metadata { return { title: seo.metaTitle, description: seo.metaDescription, alternates: seo.canonical ? { canonical: seo.canonical } : undefined, openGraph: { title: seo.ogTitle ?? seo.metaTitle, description: seo.ogDescription ?? seo.metaDescription, images: seo.ogImage ? [{ url: seo.ogImage.src, alt: seo.ogImage.alt }] : undefined } }; }
