import Link from "next/link";
import { AtSign, CircleUserRound, Mail, MapPin, Music2, Phone, Play } from "lucide-react";
import type { SiteSettings } from "@/domain/models";

const socialIcons = { instagram: AtSign, facebook: CircleUserRound, youtube: Play, "music-2": Music2 };

export interface FooterProps {
  settings: SiteSettings;
}

export function Footer({ settings }: FooterProps) {
  const columns = settings.footerColumns.filter((column) => column.enabled).sort((a, b) => a.order - b.order);
  return (
    <footer className="bg-brand-teal text-brand-ivory">
      <div className="mx-auto grid max-w-[var(--sv-container-max)] gap-7 px-[var(--sv-gutter)] py-8 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:py-9">
        <div><Link className="inline-flex items-center gap-2 font-display text-[1.35rem] tracking-[0.075em] uppercase" href="/"><span aria-hidden="true" className="text-[2rem] text-brand-gold">SV</span>{settings.siteName}</Link><p className="mt-3 max-w-60 text-[0.75rem] leading-5 text-brand-sand-deep">{settings.brandDescription}</p><ul className="mt-4 flex gap-2">{settings.socialLinks.map((social) => { const Icon = socialIcons[social.icon as keyof typeof socialIcons] ?? AtSign; return <li key={social.id}><a aria-label={social.label} className="inline-flex size-8 items-center justify-center border border-brand-ivory/25 text-brand-gold transition-colors hover:border-brand-gold hover:bg-brand-ivory hover:text-brand-teal" href={social.href}><Icon aria-hidden="true" className="size-3.5" strokeWidth={1.5} /></a></li>; })}</ul></div>
        {columns.map((column) => <div key={column.id}><h2 className="text-[0.625rem] font-semibold tracking-[0.14em] text-brand-gold uppercase">{column.title}</h2><ul className="mt-3 space-y-2">{column.links.map((link) => <li key={link.id}><Link className="text-[0.75rem] text-brand-sand-deep transition-colors hover:text-brand-ivory" href={link.href} target={link.external ? "_blank" : undefined}>{link.label}</Link></li>)}</ul></div>)}
        <div><h2 className="text-[0.625rem] font-semibold tracking-[0.14em] text-brand-gold uppercase">{settings.footerContactTitle}</h2><ul className="mt-3 space-y-2.5 text-[0.75rem] text-brand-sand-deep"><li className="flex gap-2"><Phone aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-brand-gold" strokeWidth={1.5} />{settings.contact.phone}</li><li className="flex gap-2"><Mail aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-brand-gold" strokeWidth={1.5} />{settings.contact.email}</li><li className="flex gap-2"><MapPin aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-brand-gold" strokeWidth={1.5} />{settings.contact.address}</li></ul></div>
      </div>
      <div className="border-t border-brand-ivory/15"><div className="mx-auto flex max-w-[var(--sv-container-max)] flex-col gap-3 px-[var(--sv-gutter)] py-4 text-[0.6875rem] text-brand-sand-deep sm:flex-row sm:items-center sm:justify-between"><span>{settings.copyright}</span><div className="flex flex-wrap items-center gap-4 font-semibold tracking-[0.08em] text-brand-ivory">{settings.paymentProviders.map((provider) => <span key={provider}>{provider}</span>)}</div></div></div>
    </footer>
  );
}
