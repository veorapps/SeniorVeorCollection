"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { newsletterService } from "@/services/newsletterService";

export interface NewsletterBannerProps {
  description: string;
  title: string;
  variant?: "default" | "home";
}

export function NewsletterBanner({ description, title, variant = "default" }: NewsletterBannerProps) {
  const isHome = variant === "home";
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const result = await newsletterService.subscribe({ email });
    setStatus(result.success ? "success" : "error");
    setMessage(result.message);
    if (result.success) setEmail("");
  }

  return (
    <section className={cn("overflow-hidden border-y border-brand-line", isHome ? "bg-[#fffdf9]" : "bg-brand-sand")} aria-labelledby="newsletter-title">
      <div className={cn("mx-auto grid gap-4 px-[var(--sv-gutter)] md:items-center", isHome ? "max-w-[var(--sv-container-max)] py-2 md:grid-cols-[1fr_1fr] lg:pr-10 lg:pl-24" : "max-w-[var(--sv-container-max)] py-5 md:grid-cols-[1fr_minmax(20rem,0.85fr)] md:py-6")}>
        <div><h2 className={cn("font-display leading-none text-brand-ink", isHome ? "text-[1.25rem] tracking-[0.12em] uppercase" : "text-[1.55rem]")} id="newsletter-title">{title}</h2><p className={cn("max-w-md text-brand-muted", isHome ? "mt-1 text-[0.6875rem] leading-4" : "mt-2 text-[0.75rem] leading-4")}>{description}</p></div>
        <form className="min-w-0" noValidate onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="newsletter-email">E-posta adresiniz</label>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-0">
            <input aria-describedby="newsletter-status" className={cn("min-w-0 flex-1 border border-brand-line bg-brand-paper text-brand-ink outline-none placeholder:text-brand-muted focus:border-brand-gold sm:rounded-r-none", isHome ? "min-h-11 px-4 text-[0.75rem] sm:min-h-9" : "min-h-11 px-4 text-sm")} id="newsletter-email" name="email" onChange={(event) => setEmail(event.target.value)} placeholder="E-posta adresinizi girin" required type="email" value={email} />
            {isHome ? <button className="min-h-11 bg-brand-teal px-6 text-[0.6875rem] font-semibold tracking-[0.08em] text-brand-ivory uppercase sm:min-h-9 sm:min-w-36 sm:rounded-l-none" disabled={status === "loading"} type="submit">{status === "loading" ? "Gönderiliyor" : "Abone Ol"}</button> : <Button className="sm:rounded-l-none" disabled={status === "loading"} type="submit">{status === "loading" ? "Gönderiliyor" : "Abone Ol"}<ArrowRight aria-hidden="true" className="ml-2 size-4" strokeWidth={1.5} /></Button>}
          </div>
          <p aria-live="polite" className={cn("text-xs", message && "mt-2", status === "error" ? "text-brand-danger" : "text-brand-teal")} id="newsletter-status">{message}</p>
        </form>
      </div>
    </section>
  );
}
