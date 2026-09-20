import { ImageIcon, Film, Sparkles } from "lucide-react";
import type { ImagePlaceholderSpec } from "@/content/types";

const typeIcon: Record<ImagePlaceholderSpec["type"], typeof ImageIcon> = {
  Fotografie: ImageIcon,
  "Mock-up": ImageIcon,
  Video: Film,
  Animation: Film,
  Grafik: Sparkles,
};

export function ImagePlaceholder({
  spec,
  tone = "light",
  className = "",
}: {
  spec: ImagePlaceholderSpec;
  tone?: "light" | "dark";
  className?: string;
}) {
  const Icon = typeIcon[spec.type];
  const isDark = tone === "dark";

  return (
    <figure
      className={`relative flex flex-col justify-between overflow-hidden border p-6 md:p-8 aspect-[var(--ratio-mobile)] md:aspect-[var(--ratio-desktop)] ${
        isDark ? "border-line-dark bg-ink-soft text-paper" : "border-line bg-mist/60 text-ink"
      } ${className}`}
      style={
        {
          "--ratio-desktop": spec.ratioDesktop.replace("/", " / "),
          "--ratio-mobile": spec.ratioMobile.replace("/", " / "),
        } as React.CSSProperties
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <span className="kicker inline-flex items-center gap-2 opacity-70">
          <Icon className="size-3.5" aria-hidden="true" />
          {spec.type}
        </span>
        <span className={`kicker shrink-0 whitespace-nowrap rounded-full border px-2.5 py-1 ${isDark ? "border-line-dark" : "border-line"}`}>
          Bildplatzhalter
        </span>
      </div>

      <figcaption className="max-w-md space-y-2 text-sm">
        <p className="font-medium">{spec.label}</p>
        <p className={isDark ? "text-smoke" : "text-graphite"}>{spec.motif}</p>
        <p className={`text-xs ${isDark ? "text-smoke" : "text-graphite"}`}>
          Wirkung: {spec.wirkung} · Funktion: {spec.funktion}
        </p>
        <p className={`text-xs ${isDark ? "text-smoke" : "text-graphite"}`}>Mobil: {spec.mobileNote}</p>
      </figcaption>
    </figure>
  );
}
