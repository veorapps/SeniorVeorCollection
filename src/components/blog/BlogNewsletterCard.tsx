"use client";

import { useState } from "react";
import { BookOpen, Gift, LockKeyhole } from "lucide-react";
import type { BenefitItem } from "@/domain/models";
import { newsletterService } from "@/services/newsletterService";

const iconMap = { "book-open": BookOpen, gift: Gift, lock: LockKeyhole };

export function BlogNewsletterCard({ benefits, description, title }: { benefits: BenefitItem[]; description: string; title: string }) {
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
    <aside className="flex h-full flex-col justify-center border border-brand-line bg-brand-paper p-4" aria-labelledby="blog-newsletter-title">
      <h2 className="max-w-[14rem] font-display text-[1.3rem] leading-[1.05] text-brand-ink" id="blog-newsletter-title">{title}</h2>
      <p className="mt-2 text-[0.6875rem] leading-4 text-brand-muted">{description}</p>
      <form className="mt-3" noValidate onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="blog-newsletter-email">E-posta adresiniz</label>
        <div className="flex">
          <input aria-describedby="blog-newsletter-status" className="min-h-9 min-w-0 flex-1 border border-brand-line bg-brand-ivory px-3 text-[0.625rem] text-brand-ink outline-none placeholder:text-brand-muted focus:border-brand-gold" id="blog-newsletter-email" name="email" onChange={(event) => setEmail(event.target.value)} placeholder="E-posta adresinizi girin" required type="email" value={email} />
          <button className="min-h-9 shrink-0 bg-brand-teal px-4 text-[0.5625rem] font-semibold tracking-[0.08em] text-brand-ivory uppercase disabled:opacity-45" disabled={status === "loading"} type="submit">{status === "loading" ? "Gönderiliyor" : "Abone Ol"}</button>
        </div>
        <p aria-live="polite" className={`text-[0.625rem] ${message ? "mt-2" : ""} ${status === "error" ? "text-brand-danger" : "text-brand-teal"}`} id="blog-newsletter-status">{message}</p>
      </form>
      <div className="mt-3 grid grid-cols-3 gap-2 border-t border-brand-line pt-2">
        {benefits.filter((item) => item.enabled).sort((a, b) => a.order - b.order).map((item) => { const Icon = iconMap[item.icon as keyof typeof iconMap] ?? BookOpen; return <div className="text-center" key={item.id}><Icon aria-hidden="true" className="mx-auto size-4 text-brand-gold" strokeWidth={1.25} /><p className="mt-1 text-[0.5rem] leading-[1.3] text-brand-muted">{item.title}</p></div>; })}
      </div>
    </aside>
  );
}
