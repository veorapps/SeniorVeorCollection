import { Skeleton } from "@/components/ui/Skeleton";

export function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div aria-label="Ürünler yükleniyor" className="grid grid-cols-2 gap-4 md:grid-cols-4" role="status">
      {Array.from({ length: count }, (_, index) => (
        <div className="border border-brand-line bg-brand-paper p-3" key={index}>
          <Skeleton className="aspect-[3/4] w-full" />
          <Skeleton className="mt-4 h-3 w-2/3" />
          <Skeleton className="mt-2 h-3 w-1/2" />
          <Skeleton className="mt-4 h-9 w-full" />
        </div>
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div aria-label="Ürün detayı yükleniyor" className="grid gap-8 lg:grid-cols-2" role="status">
      <Skeleton className="aspect-[4/5] w-full" />
      <div className="space-y-4"><Skeleton className="h-4 w-1/3" /><Skeleton className="h-12 w-3/4" /><Skeleton className="h-24 w-full" /><Skeleton className="h-12 w-full" /></div>
    </div>
  );
}

export function BlogGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div aria-label="Yazılar yükleniyor" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="status">
      {Array.from({ length: count }, (_, index) => <div className="space-y-3" key={index}><Skeleton className="aspect-[4/3] w-full" /><Skeleton className="h-4 w-4/5" /><Skeleton className="h-3 w-full" /></div>)}
    </div>
  );
}

export function PageHeroSkeleton() {
  return <Skeleton className="h-[28rem] w-full sm:h-[32rem]" />;
}
