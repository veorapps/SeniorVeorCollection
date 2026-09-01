import Image from "next/image";
import type { MediaAsset } from "@/domain/models";
import { cn } from "@/lib/cn";

export interface MediaProps {
  asset: MediaAsset;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function Media({ asset, className, priority = false, sizes = "100vw" }: MediaProps) {
  return (
    <Image
      alt={asset.alt}
      blurDataURL={asset.blurDataURL}
      className={cn("h-auto w-full object-cover", className)}
      height={asset.height}
      placeholder={asset.blurDataURL ? "blur" : "empty"}
      priority={priority}
      sizes={sizes}
      src={asset.src}
      unoptimized={asset.src.startsWith("data:")}
      width={asset.width}
    />
  );
}
