import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FirstVisitIntro } from "@/components/layout/FirstVisitIntro";
import { contentService } from "@/services";
import { CommerceProvider } from "@/state/CommerceProvider";
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
  metadataBase: new URL("https://seniorveorcollection.com"),
  title: { default: "Senior Veor Collection", template: "%s | Senior Veor Collection" },
  description: "Premium parfüm koleksiyonu",
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const siteSettings = await contentService.getSiteSettings();

  return (
    <html data-scroll-behavior="smooth" lang="tr" suppressHydrationWarning>
      <body className={`${displayFont.variable} ${bodyFont.variable} ${bodyFont.className}`}>
        <FirstVisitIntro />
        <CommerceProvider><Header announcements={siteSettings.announcements} logo={siteSettings.logo} navigation={siteSettings.navigation} siteName={siteSettings.siteName} />
        {children}
        <Footer settings={siteSettings} /></CommerceProvider>
      </body>
      <Script id="senior-veor-intro-state" strategy="beforeInteractive">
        {"try{if(localStorage.getItem('senior-veor:intro:v1')==='seen'){document.documentElement.dataset.introSeen='true'}}catch(e){}"}
      </Script>
    </html>
  );
}
