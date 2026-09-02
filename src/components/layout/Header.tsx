"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import type { AnnouncementItem, NavigationItem } from "@/domain/models";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/cn";
import { AnnouncementBar } from "./AnnouncementBar";
import { useCommerce } from "@/state/CommerceProvider";

export interface HeaderProps {
  announcements: AnnouncementItem[];
  navigation: NavigationItem[];
  siteName: string;
}

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header({ announcements, navigation, siteName }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuPanelRef = useRef<HTMLElement>(null);
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
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header className="relative z-30 bg-brand-paper">
      {pathname === "/" ? <AnnouncementBar items={announcements} /> : null}
      <div className="border-b border-brand-line">
        <div className="mx-auto flex h-[4.75rem] max-w-[var(--sv-container-max)] items-center justify-between gap-3 px-[var(--sv-gutter)] lg:h-[5.25rem]">
          <div className="flex min-w-0 items-center gap-1 lg:flex-1">
            <IconButton aria-label="Menüyü aç" className="lg:hidden" onClick={() => setIsMenuOpen(true)}>
              <Menu aria-hidden="true" className="size-5" strokeWidth={1.5} />
            </IconButton>
            <Link aria-label={siteName} className="group flex min-w-0 items-center gap-2 text-brand-teal" href="/">
              <span aria-hidden="true" className="font-display text-3xl leading-none text-brand-gold">SV</span>
              <span className="min-w-0 leading-none">
                <span className="block truncate font-display text-xl tracking-[0.04em] uppercase sm:text-2xl">Senior Veor</span>
                <span className="block pt-0.5 text-center text-[0.5rem] font-semibold tracking-[0.22em] uppercase">Collection</span>
              </span>
            </Link>
          </div>

          <nav aria-label="Ana navigasyon" className="hidden items-center justify-center gap-6 lg:flex xl:gap-8">
            {visibleNavigation.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  className={cn("relative py-7 text-xs text-brand-ink transition-colors hover:text-brand-teal", active && "font-semibold text-brand-teal after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-brand-gold")}
                  href={item.href}
                  key={item.id}
                  target={item.newTab ? "_blank" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-1 items-center justify-end gap-0.5 sm:gap-1">
            <IconButton aria-label="Ara"><Search aria-hidden="true" className="size-[1.125rem]" strokeWidth={1.5} /></IconButton>
            <IconButton aria-label="Hesabım" className="hidden sm:inline-flex"><UserRound aria-hidden="true" className="size-[1.125rem]" strokeWidth={1.5} /></IconButton>
            <Link aria-label={`Favoriler (${wishlist.length})`} className="relative inline-flex size-11 items-center justify-center text-brand-teal transition-colors hover:border-brand-line hover:bg-brand-paper" href="/favoriler"><Heart aria-hidden="true" className="size-[1.125rem]" strokeWidth={1.5} />{wishlist.length ? <span className="absolute right-1 top-1 inline-flex size-4 items-center justify-center rounded-full bg-brand-gold text-[0.5625rem] font-bold text-brand-paper">{wishlist.length}</span> : null}</Link>
            <Link aria-label={`Sepet (${cartCount})`} className="relative inline-flex size-11 items-center justify-center text-brand-teal transition-colors hover:border-brand-line hover:bg-brand-paper" href="/sepet"><ShoppingBag aria-hidden="true" className="size-[1.125rem]" strokeWidth={1.5} />{cartCount ? <span className="absolute right-1 top-1 inline-flex size-4 items-center justify-center rounded-full bg-brand-gold text-[0.5625rem] font-bold text-brand-paper">{cartCount}</span> : null}</Link>
          </div>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="presentation">
          <button aria-label="Menüyü kapat" className="absolute inset-0 bg-brand-ink/35" onClick={() => setIsMenuOpen(false)} type="button" />
          <aside aria-label="Mobil navigasyon" aria-modal="true" className="relative h-full w-[min(23rem,88vw)] bg-brand-paper p-6 shadow-float" ref={menuPanelRef} role="dialog">
            <div className="flex items-center justify-between border-b border-brand-line pb-5">
              <span className="font-display text-2xl text-brand-teal">Senior Veor</span>
              <IconButton aria-label="Menüyü kapat" onClick={() => setIsMenuOpen(false)}><X aria-hidden="true" className="size-5" strokeWidth={1.5} /></IconButton>
            </div>
            <nav aria-label="Mobil ana navigasyon" className="mt-6">
              <ul className="space-y-1">
                {visibleNavigation.map((item) => (
                  <li key={item.id}>
                    <Link className={cn("block border-b border-brand-line py-4 font-display text-2xl text-brand-ink", isActivePath(pathname, item.href) && "text-brand-teal")} href={item.href} onClick={() => setIsMenuOpen(false)}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      ) : null}
    </header>
  );
}
