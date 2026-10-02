import Link from "next/link";
import { BadgeCheck, Heart } from "lucide-react";
import type { Product } from "@/domain/models";
import { Container } from "@/components/ui/Container";
import { RatingStars } from "@/components/ui/RatingStars";
import { ProductCarousel } from "./ProductCarousel";

export function ProductCommunitySections({ product, relatedProducts }: { product: Product; relatedProducts: Product[] }) {
  const reviews = product.reviews;
  const faqItems = product.faq.filter((item) => item.enabled).sort((a, b) => a.order - b.order);

  return (
    <>
      <section className="border-b border-brand-line bg-brand-paper py-7">
        <Container>
          <h2 className="text-[0.625rem] font-semibold tracking-[0.18em] text-brand-gold uppercase">Müşteri Yorumları</h2>
          <div className="mt-4 grid border-y border-brand-line lg:grid-cols-[12rem_1fr] lg:divide-x lg:divide-brand-line">
            <div className="flex items-center justify-between gap-5 py-5 lg:block lg:pr-6">
              <div>
                <p className="font-display text-5xl leading-none text-brand-ink">{product.rating.toFixed(1)}</p>
                <RatingStars className="mt-2" rating={product.rating} reviewCount={product.reviewCount} />
              </div>
              <p className="max-w-28 text-right text-[0.625rem] leading-4 text-brand-muted lg:mt-4 lg:max-w-none lg:text-left">
                {product.reviewCount} müşteri değerlendirmesi
              </p>
            </div>
            <div className="grid divide-y divide-brand-line md:grid-cols-3 md:divide-x md:divide-y-0">
              {reviews.map((review) => (
                <article className="py-5 md:px-5" key={review.id}>
                  <div className="flex min-h-5 items-center justify-between gap-3">
                    <h3 className="text-[0.75rem] font-semibold text-brand-ink">{review.authorName}</h3>
                    {review.verifiedPurchase ? <span className="inline-flex items-center gap-1 text-[0.5625rem] font-semibold text-brand-teal"><BadgeCheck aria-hidden="true" className="size-3.5" />Doğrulanmış Alıcı</span> : null}
                  </div>
                  <RatingStars className="mt-2" rating={review.rating} showValue={false} />
                  <p className="mt-3 min-h-15 text-[0.75rem] leading-5 text-brand-muted">{review.body}</p>
                  <div className="mt-4 flex items-center justify-between text-[0.625rem] text-brand-muted">
                    <time dateTime={review.createdAt}>{new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "short", year: "numeric" }).format(new Date(review.createdAt))}</time>
                    <span className="inline-flex items-center gap-1"><Heart aria-hidden="true" className="size-3.5" />{review.helpfulCount}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-brand-line py-7">
        <Container className="grid gap-8 lg:grid-cols-[1.8fr_1fr] lg:divide-x lg:divide-brand-line">
          {relatedProducts.length ? <div className="min-w-0 lg:pr-8"><div className="flex items-end justify-between gap-4"><div><p className="text-[0.625rem] font-semibold tracking-[0.18em] text-brand-gold uppercase">Sizin İçin Önerilenler</p><h2 className="mt-1 font-display text-3xl text-brand-ink">Benzer İmzalar</h2></div><Link className="shrink-0 border-b border-brand-gold pb-1 text-[0.625rem] font-semibold tracking-[0.08em] text-brand-teal uppercase" href="/parfumler">Tümünü Gör</Link></div><div className="mt-5"><ProductCarousel cardClassName="lg:w-[calc((100%-2.25rem)/4)]" products={relatedProducts} variant="showcase" /></div></div> : null}
          <div className="lg:pl-8">
            <p className="text-[0.625rem] font-semibold tracking-[0.18em] text-brand-gold uppercase">Sıkça Sorulan Sorular</p>
            <h2 className="mt-1 font-display text-3xl text-brand-ink">{product.name} Hakkında</h2>
            <div className="mt-5 divide-y divide-brand-line border-y border-brand-line">
              {faqItems.map((item) => <details className="group py-3.5" key={item.id}><summary className="cursor-pointer list-none pr-2 text-[0.75rem] font-medium text-brand-ink marker:content-none"><span className="flex items-center justify-between gap-4">{item.question}<span aria-hidden="true" className="text-lg leading-none text-brand-gold transition-transform group-open:rotate-45">+</span></span></summary><p className="pr-7 pt-2 text-[0.75rem] leading-5 text-brand-muted">{item.answer}</p></details>)}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
