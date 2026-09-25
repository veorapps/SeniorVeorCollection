import Link from "next/link";
import { AtSign, CircleUserRound, Mail, MapPin, Music2, Phone, Play } from "lucide-react";
import type { SiteSettings } from "@/domain/models";

const socialIcons = { instagram: AtSign, facebook: CircleUserRound, youtube: Play, "music-2": Music2 };

export interface FooterProps {
  settings: SiteSettings;
}

export function Footer({ settings }: FooterProps) {
  const columns = settings.footerColumns.filter((column) => column.enabled).sort((a, b) => a.order - b.order);
  const brandName = settings.siteName.replace(/\s+collection$/i, "");
  const brandSubtitle = brandName !== settings.siteName ? "Collection" : "";

  return (
    <footer className="bg-[#222927] text-brand-ivory">
      <div className="mx-auto grid max-w-[var(--sv-container-max)] grid-cols-2 gap-x-6 gap-y-7 px-[var(--sv-gutter)] py-7 md:grid-cols-3 lg:grid-cols-[1.25fr_repeat(3,0.75fr)_1.2fr] lg:gap-x-8 lg:py-7">
        <div className="col-span-2 md:col-span-1 lg:border-r lg:border-brand-ivory/15 lg:pr-7">
          <Link aria-label={settings.siteName} className="inline-flex items-center gap-2.5 text-brand-gold-soft" href="/">
            <span aria-hidden="true" className="border-r border-brand-gold/50 pr-2 font-display text-[2rem] leading-none">SV</span>
            <span className="leading-none"><span className="block font-display text-[1.4rem] tracking-[0.05em] uppercase">{brandName}</span>{brandSubtitle ? <span className="mt-0.5 block text-center text-[0.5rem] font-semibold tracking-[0.3em] uppercase">{brandSubtitle}</span> : null}</span>
          </Link>
          <p className="mt-3 max-w-56 text-[0.6875rem] leading-4 text-brand-ivory/75">{settings.brandDescription}</p>
          <ul className="mt-3 flex gap-2">{settings.socialLinks.map((social) => { const Icon = socialIcons[social.icon as keyof typeof socialIcons] ?? AtSign; return <li key={social.id}><a aria-label={social.label} className="inline-flex size-7 items-center justify-center rounded-full border border-brand-gold/60 text-brand-gold-soft transition-colors hover:bg-brand-gold hover:text-[#222927]" href={social.href}><Icon aria-hidden="true" className="size-3.5" strokeWidth={1.5} /></a></li>; })}</ul>
        </div>
        {columns.map((column) => <div key={column.id}><h2 className="text-[0.625rem] font-semibold tracking-[0.1em] text-brand-gold-soft uppercase">{column.title}</h2><ul className="mt-3 space-y-1.5">{column.links.map((link) => <li key={link.id}><Link className="text-[0.6875rem] leading-4 text-brand-ivory/80 transition-colors hover:text-brand-gold-soft" href={link.href} target={link.external ? "_blank" : undefined}>{link.label}</Link></li>)}</ul></div>)}
        <div className="col-span-2 md:col-span-1 lg:border-l lg:border-brand-ivory/15 lg:pl-7"><h2 className="text-[0.625rem] font-semibold tracking-[0.1em] text-brand-gold-soft uppercase">{settings.footerContactTitle}</h2><ul className="mt-3 space-y-2 text-[0.6875rem] leading-4 text-brand-ivory/80"><li className="flex gap-2"><Phone aria-hidden="true" className="mt-0.5 size-3 shrink-0 text-brand-gold-soft" strokeWidth={1.5} />{settings.contact.phone}</li><li className="flex gap-2"><Mail aria-hidden="true" className="mt-0.5 size-3 shrink-0 text-brand-gold-soft" strokeWidth={1.5} />{settings.contact.email}</li><li className="flex gap-2"><MapPin aria-hidden="true" className="mt-0.5 size-3 shrink-0 text-brand-gold-soft" strokeWidth={1.5} />{settings.contact.address}</li></ul></div>
      </div>
      <div className="mx-auto max-w-[var(--sv-container-max)] px-[var(--sv-gutter)]"><div className="flex flex-col gap-3 border-t border-brand-ivory/15 py-3 text-[0.625rem] text-brand-ivory/65 sm:flex-row sm:items-center sm:justify-between"><span>{settings.copyright}</span><div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-brand-ivory"><span className="flex items-center gap-4 font-bold tracking-[0.04em]">{settings.paymentProviders.map((provider) => <span key={provider}>{provider}</span>)}</span>{settings.paymentSecurityText ? <span className="text-[0.5625rem] font-normal text-brand-ivory/55">{settings.paymentSecurityText}</span> : null}</div></div></div>
    </footer>
  );
}
