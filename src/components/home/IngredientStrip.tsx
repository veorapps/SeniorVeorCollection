import type { HomeIngredientsSection } from "@/domain/models";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";

export function IngredientStrip({ data }: { data: HomeIngredientsSection }) {
  const ingredients = data.items
    .filter((item) => item.enabled)
    .sort((a, b) => a.order - b.order);

  if (ingredients.length === 0) return null;

  return (
    <section aria-label={data.title} className="border-y border-brand-line bg-[#fffdf9] py-2">
      <Container size="wide">
        <div className="flex min-w-0 items-center gap-3 sm:gap-5">
          <h2 className="w-[5.25rem] shrink-0 font-display text-[0.75rem] leading-[1.15] tracking-[0.08em] text-[#6e5635] uppercase sm:w-[6rem]">
            {data.title}
          </h2>
          <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-3">
            {ingredients.map((item) => (
              <div className="w-[4.75rem] shrink-0 border border-brand-line bg-brand-paper p-0.5 text-center sm:w-[5rem]" key={item.id}>
                <Media asset={item.image} className="aspect-[4/3] w-full object-cover" sizes="80px" />
                <span className="block min-h-4 truncate pt-0.5 text-[0.625rem] leading-4 text-brand-ink" title={item.name}>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
