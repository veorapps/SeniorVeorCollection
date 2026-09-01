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
      <div className="mx-auto grid max-w-[var(--sv-container-max)] gap-10 px-[var(--sv-gutter)] py-12 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:py-14">
        <div><Link className="inline-flex items-center gap-2 font-display text-2xl tracking-[0.04em] uppercase" href="/"><span aria-hidden="true" className="text-3xl text-brand-gold">SV</span>{settings.siteName}</Link><p className="mt-4 max-w-60 text-sm leading-6 text-brand-sand-deep">{settings.brandDescription}</p><ul className="mt-5 flex gap-2">{settings.socialLinks.map((social) => { const Icon = socialIcons[social.icon as keyof typeof socialIcons] ?? AtSign; return <li key={social.id}><a aria-label={social.label} className="inline-flex size-9 items-center justify-center border border-brand-ivory/25 text-brand-gold transition-colors hover:border-brand-gold hover:bg-brand-ivory hover:text-brand-teal" href={social.href}><Icon aria-hidden="true" className="size-4" strokeWidth={1.5} /></a></li>; })}</ul></div>
        {columns.map((column) => <div key={column.id}><h2 className="text-xs font-semibold tracking-[0.14em] text-brand-gold uppercase">{column.title}</h2><ul className="mt-4 space-y-2.5">{column.links.map((link) => <li key={link.id}><Link className="text-sm text-brand-sand-deep transition-colors hover:text-brand-ivory" href={link.href} target={link.external ? "_blank" : undefined}>{link.label}</Link></li>)}</ul></div>)}
        <div><h2 className="text-xs font-semibold tracking-[0.14em] text-brand-gold uppercase">{settings.footerContactTitle}</h2><ul className="mt-4 space-y-3 text-sm text-brand-sand-deep"><li className="flex gap-2"><Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-gold" strokeWidth={1.5} />{settings.contact.phone}</li><li className="flex gap-2"><Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-gold" strokeWidth={1.5} />{settings.contact.email}</li><li className="flex gap-2"><MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-gold" strokeWidth={1.5} />{settings.contact.address}</li></ul></div>
      </div>
      <div className="border-t border-brand-ivory/15"><div className="mx-auto flex max-w-[var(--sv-container-max)] flex-col gap-4 px-[var(--sv-gutter)] py-5 text-xs text-brand-sand-deep sm:flex-row sm:items-center sm:justify-between"><span>{settings.copyright}</span><div className="flex flex-wrap items-center gap-4 font-semibold tracking-[0.08em] text-brand-ivory">{settings.paymentProviders.map((provider) => <span key={provider}>{provider}</span>)}</div></div></div>
    </footer>
  );
}
