import Link from "next/link";
import { AtSign, Flower2, Mail, MapPin, Music2, Phone, Play, Sword } from "lucide-react";
import type { SiteSettings, SocialLink } from "@/domain/models";

export interface FooterProps {
  settings: SiteSettings;
}

function BrandMark() {
  return (
    <span aria-hidden="true" className="relative block h-10 w-8 shrink-0 text-brand-gold-soft">
      <Sword className="absolute left-1.5 top-1 size-8 -rotate-45" strokeWidth={1.15} />
      <Flower2 className="absolute left-0 top-0 size-5 fill-[#222927]" strokeWidth={1.15} />
    </span>
  );
}

function SocialIcon({ social }: { social: SocialLink }) {
  if (social.icon === "instagram") return <AtSign aria-hidden="true" className="size-3" strokeWidth={1.5} />;
  if (social.icon === "facebook") return <span aria-hidden="true" className="font-serif text-[0.8125rem] leading-none">f</span>;
  if (social.icon === "youtube") return <Play aria-hidden="true" className="size-3 fill-current" strokeWidth={1.5} />;
  if (social.icon === "music-2") return <Music2 aria-hidden="true" className="size-3" strokeWidth={1.5} />;
  if (social.icon === "play") return <Play aria-hidden="true" className="size-3" strokeWidth={1.5} />;
  return <AtSign aria-hidden="true" className="size-3" strokeWidth={1.5} />;
}

function PaymentMark({ provider }: { provider: string }) {
  const normalized = provider.toLocaleLowerCase("tr-TR");

  if (normalized === "mastercard") {
    return (
      <span aria-label={provider} className="relative inline-flex h-3.5 w-6" role="img">
        <span className="absolute left-0 top-0 size-3.5 rounded-full bg-[#e45b43]" />
        <span className="absolute right-0 top-0 size-3.5 rounded-full bg-[#e8a43b] opacity-95" />
      </span>
    );
  }

  return <span className={normalized === "visa" ? "font-black italic tracking-[-0.04em]" : normalized === "troy" ? "font-black italic tracking-[-0.03em]" : "font-bold tracking-[-0.03em]"}>{provider}</span>;
}

export function Footer({ settings }: FooterProps) {
  const columns = settings.footerColumns.filter((column) => column.enabled).sort((a, b) => a.order - b.order);
  const brandName = settings.siteName.replace(/\s+collection$/i, "");
  const brandSubtitle = brandName !== settings.siteName ? "Collection" : "";

  return (
    <footer className="bg-[#222927] text-brand-ivory">
      <div className="mx-auto grid max-w-[59rem] grid-cols-2 gap-x-7 gap-y-7 px-[var(--sv-gutter)] py-6 md:grid-cols-3 lg:grid-cols-[1.25fr_0.72fr_0.92fr_0.72fr_1.22fr] lg:gap-x-6 lg:px-0 lg:py-2.5">
        <div className="col-span-2 md:col-span-1 lg:border-r lg:border-brand-ivory/15 lg:pr-6">
          <Link aria-label={settings.siteName} className="inline-flex items-center gap-2 text-brand-gold-soft" href="/">
            <BrandMark />
            <span aria-hidden="true" className="h-9 w-px bg-brand-gold/45" />
            <span className="leading-none">
              <span className="block whitespace-nowrap font-display text-[1.2rem] tracking-[0.055em] uppercase">{brandName}</span>
              {brandSubtitle ? <span className="mt-1 block text-center text-[0.425rem] font-semibold tracking-[0.3em] uppercase">{brandSubtitle}</span> : null}
            </span>
          </Link>
          <p className="mt-1 max-w-48 text-[0.625rem] leading-3 text-brand-ivory/75">{settings.brandDescription}</p>
          <ul className="mt-1 flex h-5 gap-2">
            {settings.socialLinks.map((social) => (
              <li key={social.id}>
                <a aria-label={social.label} className="inline-flex size-5 items-center justify-center rounded-full border border-brand-gold/60 text-brand-gold-soft transition-colors hover:bg-brand-gold hover:text-[#222927]" href={social.href}>
                  <SocialIcon social={social} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {columns.map((column) => (
          <div key={column.id}>
            <h2 className="text-[0.5625rem] font-semibold tracking-[0.1em] text-brand-gold-soft uppercase">{column.title}</h2>
            <ul className="mt-2 space-y-1.5">
              {column.links.map((link) => (
                <li className="leading-[0.875rem]" key={link.id}>
                  <Link className="text-[0.625rem] leading-[0.875rem] text-brand-ivory/80 transition-colors hover:text-brand-gold-soft" href={link.href} target={link.external ? "_blank" : undefined}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="col-span-2 md:col-span-1 lg:border-l lg:border-brand-ivory/15 lg:pl-6">
          <h2 className="text-[0.5625rem] font-semibold tracking-[0.1em] text-brand-gold-soft uppercase">{settings.footerContactTitle}</h2>
          <ul className="mt-2 space-y-1.5 text-[0.625rem] leading-[0.875rem] text-brand-ivory/80">
            <li className="flex gap-2"><Phone aria-hidden="true" className="mt-px size-3 shrink-0 text-brand-gold-soft" strokeWidth={1.5} />{settings.contact.phone}</li>
            <li className="flex gap-2"><Mail aria-hidden="true" className="mt-px size-3 shrink-0 text-brand-gold-soft" strokeWidth={1.5} />{settings.contact.email}</li>
            <li className="flex gap-2"><MapPin aria-hidden="true" className="mt-px size-3 shrink-0 text-brand-gold-soft" strokeWidth={1.5} />{settings.contact.address}</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-[59rem] px-[var(--sv-gutter)] lg:px-0">
        <div className="flex flex-col gap-2 border-t border-brand-ivory/15 py-2 text-[0.5625rem] text-brand-ivory/65 sm:flex-row sm:items-center sm:justify-between">
          <span>{settings.copyright}</span>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-brand-ivory">
            <span className="flex items-center gap-3 text-[0.6875rem]">{settings.paymentProviders.map((provider) => <PaymentMark key={provider} provider={provider} />)}</span>
            {settings.paymentSecurityText ? <span className="text-[0.5rem] font-normal text-brand-ivory/55">{settings.paymentSecurityText}</span> : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
