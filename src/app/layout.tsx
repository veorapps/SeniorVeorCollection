import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { contentService } from "@/services";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Senior Veor Collection",
  description: "Premium parfüm koleksiyonu",
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const siteSettings = await contentService.getSiteSettings();

  return (
    <html data-scroll-behavior="smooth" lang="tr">
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        <Header announcements={siteSettings.announcements} navigation={siteSettings.navigation} siteName={siteSettings.siteName} />
        {children}
        <Footer settings={siteSettings} />
      </body>
    </html>
  );
}
