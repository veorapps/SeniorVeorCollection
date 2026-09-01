import type { MediaAsset } from "@/domain/models";

function svgPlaceholder(label: string, tone: "teal" | "gold" | "ivory" = "ivory"): string {
  const palette = {
    teal: { background: "#083c3d", foreground: "#c7ad7d" },
    gold: { background: "#d9c5a5", foreground: "#083c3d" },
    ivory: { background: "#f1e9dc", foreground: "#083c3d" },
  }[tone];
  const markup = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200"><rect width="900" height="1200" fill="${palette.background}"/><rect x="265" y="180" width="370" height="730" rx="18" fill="none" stroke="${palette.foreground}" stroke-width="8"/><path d="M365 180V105h170v75" fill="none" stroke="${palette.foreground}" stroke-width="8"/><text x="450" y="1040" fill="${palette.foreground}" font-family="Georgia,serif" font-size="42" text-anchor="middle">${label}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`;
}

export function placeholderMedia(
  label: string,
  tone: "teal" | "gold" | "ivory" = "ivory",
  width = 900,
  height = 1200,
): MediaAsset {
  return { src: svgPlaceholder(label, tone), alt: `${label} için görsel yer tutucu`, width, height };
}
