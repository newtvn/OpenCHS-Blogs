import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

/* ------------------------------------------------------------------ */
/*  Theme detection                                                    */
/* ------------------------------------------------------------------ */

const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

/** Subscribe to OS theme changes — used by useSyncExternalStore. */
function subscribe(callback: () => void) {
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

/** Read current OS preference — "dark" or "light". */
function getSnapshot(): "light" | "dark" {
  return mediaQuery.matches ? "dark" : "light";
}

/**
 * Reactive hook that tracks the OS light/dark preference.
 * Uses `useSyncExternalStore` for tear-free reads — no MutationObserver,
 * no DOM side-effects during render.
 */
export const useThemeSync = () => {
  const theme = useSyncExternalStore(subscribe, getSnapshot);

  // Apply .dark class to <html> so CSS variables + Tailwind dark: modifiers activate
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return [theme] as const;
};

/* ------------------------------------------------------------------ */
/*  Palette                                                            */
/* ------------------------------------------------------------------ */

/** Shape returned by `usePalette` — all values are Tailwind class strings except `background`. */
export interface Palette {
  surface: string;
  subtle: string;
  border: string;
  highlight: string;
  accent: string;
  card: string;
  background: {
    color: string;
    overlays: string[];
    dots: string;
  };
}

/**
 * Returns theme-aware Tailwind utility class strings and CSS values.
 *
 * Usage:
 * ```ts
 * const { theme, palette } = usePalette();
 * <div className={palette.card}>…</div>
 * ```
 */
export const usePalette = (): { theme: "light" | "dark"; palette: Palette } => {
  const [theme] = useThemeSync();

  const palette = useMemo<Palette>(
    () =>
      theme === "dark"
        ? {
            surface: "bg-neutral-950 text-neutral-50",
            subtle: "text-neutral-400",
            border: "border-neutral-800",
            highlight: "bg-neutral-900",
            accent: "bg-neutral-800",
            card: "bg-neutral-900/50",
            background: {
              color: "#0a0a0a",
              overlays: [
                "radial-gradient(ellipse 65% 90% at 12% -10%, rgba(115,115,115,0.08), transparent 62%)",
                "radial-gradient(ellipse 45% 65% at 88% -20%, rgba(82,82,82,0.06), transparent 70%)",
              ],
              dots: "radial-gradient(circle at 25% 25%, rgba(163,163,163,0.06) 0.65px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(163,163,163,0.06) 0.65px, transparent 1px)",
            },
          }
        : {
            surface: "bg-neutral-50 text-neutral-950",
            subtle: "text-neutral-600",
            border: "border-neutral-200",
            highlight: "bg-neutral-100",
            accent: "bg-neutral-100/60",
            card: "bg-white/80",
            background: {
              color: "#fafafa",
              overlays: [
                "radial-gradient(ellipse 65% 90% at 12% -10%, rgba(23,23,23,0.05), transparent 62%)",
                "radial-gradient(ellipse 45% 65% at 88% -20%, rgba(23,23,23,0.04), transparent 70%)",
              ],
              dots: "radial-gradient(circle at 25% 25%, rgba(23,23,23,0.08) 0.65px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(23,23,23,0.08) 0.65px, transparent 1px)",
            },
          },
    [theme],
  );

  return { theme, palette };
};
