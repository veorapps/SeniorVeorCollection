"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { newsletterService } from "@/services/newsletterService";

export interface NewsletterBannerProps {
  description: string;
  title: string;
}

export function NewsletterBanner({ description, title }: NewsletterBannerProps) {
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
    <section className="overflow-hidden border-y border-brand-line bg-brand-sand" aria-labelledby="newsletter-title">
      <div className="mx-auto grid max-w-[var(--sv-container-max)] gap-6 px-[var(--sv-gutter)] py-8 md:grid-cols-[1fr_minmax(22rem,0.85fr)] md:items-center md:py-10">
        <div><h2 className="font-display text-3xl leading-none text-brand-ink" id="newsletter-title">{title}</h2><p className="mt-3 max-w-md text-sm leading-6 text-brand-muted">{description}</p></div>
        <form noValidate onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="newsletter-email">E-posta adresiniz</label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input aria-describedby="newsletter-status" className="min-h-11 flex-1 border border-brand-line bg-brand-paper px-4 text-sm text-brand-ink outline-none placeholder:text-brand-muted focus:border-brand-gold" id="newsletter-email" name="email" onChange={(event) => setEmail(event.target.value)} placeholder="E-posta adresinizi girin" required type="email" value={email} />
            <Button disabled={status === "loading"} type="submit">{status === "loading" ? "Gönderiliyor" : "Abone Ol"}<ArrowRight aria-hidden="true" className="ml-2 size-4" strokeWidth={1.5} /></Button>
          </div>
          <p aria-live="polite" className={status === "error" ? "mt-2 text-xs text-brand-danger" : "mt-2 text-xs text-brand-teal"} id="newsletter-status">{message}</p>
        </form>
      </div>
    </section>
  );
}
