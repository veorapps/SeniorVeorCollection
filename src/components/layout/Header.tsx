"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import type { AnnouncementItem, MediaAsset, NavigationItem } from "@/domain/models";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/cn";
import { AnnouncementBar } from "./AnnouncementBar";
import { useCommerce } from "@/state/CommerceProvider";

export interface HeaderProps {
  announcements: AnnouncementItem[];
  logo: MediaAsset;
  navigation: NavigationItem[];
  siteName: string;
}

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function BrandLink({ compact = false, logo, siteName }: { compact?: boolean; logo: MediaAsset; siteName: string }) {
  const name = siteName.replace(/\s+collection$/i, "");
  const collection = name !== siteName ? "Collection" : "";

  return (
    <Link aria-label={siteName} className="flex items-center gap-1.5 text-[#725b3c]" href="/">
      <Image alt="" className={cn("shrink-0 object-contain mix-blend-multiply", compact ? "size-10" : "size-13")} height={logo.height} sizes={compact ? "2.5rem" : "3.25rem"} src={logo.src} unoptimized={logo.src.startsWith("data:")} width={logo.width} />
      <span aria-hidden="true" className="h-10 w-px bg-brand-line" />
      <span className="min-w-0 leading-none">
        <span className={cn("block whitespace-nowrap font-display uppercase", compact ? "text-[1.05rem] tracking-[0.055em]" : "text-[1.45rem] tracking-[0.06em]")}>{name}</span>
        {collection ? <span className={cn("mt-1 block text-center font-semibold uppercase", compact ? "text-[0.4rem] tracking-[0.25em]" : "text-[0.5rem] tracking-[0.3em]")}>{collection}</span> : null}
      </span>
    </Link>
  );
}

export function Header({ announcements, logo, navigation, siteName }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const menuPanelRef = useRef<HTMLElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname() ?? "/";
  const visibleNavigation = navigation.filter((item) => item.enabled).sort((a, b) => a.order - b.order);
  const { cart, wishlist } = useCommerce();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
      if (event.key !== "Tab") return;
      const focusable = menuPanelRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    requestAnimationFrame(() => menuPanelRef.current?.querySelector<HTMLElement>("button, a[href]")?.focus());
    const trigger = menuTriggerRef.current;
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      if (trigger && getComputedStyle(trigger).display !== "none") trigger.focus();
    };
  }, [isMenuOpen]);

  return (
    <header className="relative z-30 bg-brand-paper">
      {pathname === "/" ? <AnnouncementBar items={announcements} /> : null}
      <div className="border-b border-brand-line">
        <div className="mx-auto grid h-[4.5rem] max-w-[100rem] grid-cols-[1fr_auto_1fr] items-center gap-2 px-[var(--sv-gutter)] lg:flex lg:h-[5rem] lg:gap-4">
          <div className="flex min-w-0 items-center lg:flex-1">
            <div className="lg:hidden">
              <button aria-controls="mobile-navigation" aria-expanded={isMenuOpen} aria-label="Menüyü aç" className="inline-flex size-11 items-center justify-center text-brand-ink" onClick={() => setIsMenuOpen(true)} ref={menuTriggerRef} type="button">
                <Menu aria-hidden="true" className="size-5" strokeWidth={1.5} />
              </button>
            </div>
            <div className="hidden lg:block"><BrandLink logo={logo} siteName={siteName} /></div>
          </div>

          <div className="lg:hidden"><BrandLink compact logo={logo} siteName={siteName} /></div>

          <nav aria-label="Ana navigasyon" className="hidden shrink-0 items-center justify-center gap-5 lg:flex xl:gap-8">
            {visibleNavigation.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  className={cn("relative py-7 text-[0.75rem] text-brand-ink transition-colors hover:text-brand-gold", active && "text-brand-ink after:absolute after:inset-x-0 after:bottom-4 after:h-px after:bg-brand-gold")}
                  href={item.href}
                  key={item.id}
                  target={item.newTab ? "_blank" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex min-w-0 items-center justify-end gap-0.5 sm:gap-1 lg:flex-1">
            <IconButton aria-label="Ara" className="text-brand-ink" onClick={() => setIsSearchOpen(true)}><Search aria-hidden="true" className="size-[1.125rem]" strokeWidth={1.5} /></IconButton>
            <div className="hidden sm:block"><IconButton aria-label="Hesabım" className="text-brand-ink"><UserRound aria-hidden="true" className="size-[1.125rem]" strokeWidth={1.5} /></IconButton></div>
            <Link aria-label={`Favoriler (${wishlist.length})`} className="relative hidden size-11 items-center justify-center text-brand-ink transition-colors hover:border-brand-line hover:bg-brand-paper sm:inline-flex" href="/favoriler"><Heart aria-hidden="true" className="size-[1.125rem]" strokeWidth={1.5} />{wishlist.length ? <span className="absolute right-1 top-1 inline-flex size-4 items-center justify-center rounded-full bg-brand-gold text-[0.5625rem] font-bold text-brand-paper">{wishlist.length}</span> : null}</Link>
            <Link aria-label={`Sepet (${cartCount})`} className="relative inline-flex size-11 items-center justify-center text-brand-ink transition-colors hover:border-brand-line hover:bg-brand-paper" href="/sepet"><ShoppingBag aria-hidden="true" className="size-[1.125rem]" strokeWidth={1.5} />{cartCount ? <span className="absolute right-1 top-1 inline-flex size-4 items-center justify-center rounded-full bg-brand-gold text-[0.5625rem] font-bold text-brand-paper">{cartCount}</span> : null}</Link>
          </div>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="presentation">
          <button aria-label="Menüyü kapat" className="absolute inset-0 bg-brand-ink/35" onClick={() => setIsMenuOpen(false)} type="button" />
          <aside aria-label="Mobil navigasyon" aria-modal="true" className="relative h-full w-[min(23rem,88vw)] overflow-y-auto bg-brand-paper p-6 shadow-float" id="mobile-navigation" ref={menuPanelRef} role="dialog">
            <div className="flex items-center justify-between border-b border-brand-line pb-5">
              <BrandLink compact logo={logo} siteName={siteName} />
              <IconButton aria-label="Menüyü kapat" onClick={() => setIsMenuOpen(false)}><X aria-hidden="true" className="size-5" strokeWidth={1.5} /></IconButton>
            </div>
            <nav aria-label="Mobil ana navigasyon" className="mt-6">
              <ul className="space-y-1">
                {visibleNavigation.map((item) => (
                  <li key={item.id}>
                    <Link aria-current={isActivePath(pathname, item.href) ? "page" : undefined} className={cn("block border-b border-brand-line py-4 font-display text-2xl text-brand-ink", isActivePath(pathname, item.href) && "text-brand-gold")} href={item.href} onClick={() => setIsMenuOpen(false)} target={item.newTab ? "_blank" : undefined}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      ) : null}
      {isSearchOpen ? <div className="fixed inset-0 z-50 grid place-items-start bg-brand-ink/35 pt-20 px-4" role="presentation"><section aria-label="Ürün ara" aria-modal="true" className="w-full max-w-2xl bg-brand-paper p-5 shadow-float" role="dialog"><div className="flex justify-between gap-4"><h2 className="font-display text-3xl text-brand-ink">Parfüm Ara</h2><IconButton aria-label="Aramayı kapat" onClick={() => setIsSearchOpen(false)}><X aria-hidden="true" /></IconButton></div><form className="mt-5 flex gap-2" onSubmit={(event) => { event.preventDefault(); const value=searchQuery.trim(); setIsSearchOpen(false); router.push(value ? `/parfumler?search=${encodeURIComponent(value)}` : "/parfumler"); }}><label className="sr-only" htmlFor="site-search">Parfüm adı veya nota ara</label><input autoFocus className="min-h-11 flex-1 border border-brand-line px-4 outline-none focus:border-brand-teal" id="site-search" onChange={(event)=>setSearchQuery(event.target.value)} placeholder="Parfüm adı veya nota ara" value={searchQuery} /><button className="min-h-11 bg-brand-teal px-5 text-xs font-semibold tracking-[0.08em] text-brand-ivory uppercase" type="submit">Ara</button></form></section></div> : null}
    </header>
  );
}
