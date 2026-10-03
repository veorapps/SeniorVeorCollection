import Image from "next/image";
import type { MediaAsset } from "@/domain/models";
import { cn } from "@/lib/cn";

export interface MediaProps {
  asset: MediaAsset;
  className?: string;
  loading?: "eager" | "lazy";
  preload?: boolean;
  sizes?: string;
}

export function Media({ asset, className, loading, preload = false, sizes = "100vw" }: MediaProps) {
  return (
    <Image
      alt={asset.alt}
      blurDataURL={asset.blurDataURL}
      className={cn(className ? "w-full object-cover" : "h-auto w-full object-cover", className)}
      height={asset.height}
      loading={loading}
      placeholder={asset.blurDataURL ? "blur" : "empty"}
      preload={preload}
      sizes={sizes}
      src={asset.src}
      unoptimized={asset.src.startsWith("data:")}
      width={asset.width}
    />
  );
}
