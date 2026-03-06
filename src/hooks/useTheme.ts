import { useEffect, useMemo, useState } from "react";

/**
 * Reads the current theme from the `<html>` element.
 *
 * Detection order:
 *  1. `<html class="dark">` or `data-theme="dark"`
 *  2. `<html class="light">`
 *  3. `prefers-color-scheme` media query
 *  4. Falls back to "dark"
 *
 * Note: SSR guards (`typeof document`) are omitted because this is
 * a client-only Vite SPA — `document` and `window` are always available.
 */
const getRootTheme = (): "light" | "dark" => {
  const root = document.documentElement;
  if (root.classList.contains("dark") || root.dataset?.theme === "dark") return "dark";
  if (root.classList.contains("light")) return "light";

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

/**
 * Reactive hook that tracks the current light/dark theme.
 *
 * Watches `<html>` class / data-theme mutations via MutationObserver
 * and listens to `prefers-color-scheme` media query changes so the
 * UI re-renders automatically when the user's OS theme flips.
 */
export const useThemeSync = () => {
  const [theme, setTheme] = useState<"light" | "dark">(getRootTheme);

  useEffect(() => {
    const sync = () => {
      const next = getRootTheme();
      setTheme((prev) => (prev === next ? prev : next));
    };

    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", sync);

    return () => {
      observer.disconnect();
      media.removeEventListener("change", sync);
    };
  }, []);

  return [theme, setTheme] as const;
};

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
 *
 * - `palette.surface`    — base bg + text colour for the page shell
 * - `palette.subtle`     — muted text colour
 * - `palette.border`     — border colour class
 * - `palette.highlight`  — highlighted row / active sidebar item bg
 * - `palette.accent`     — accent bg for badges & category pills
 * - `palette.card`       — translucent card background
 * - `palette.background` — CSS values for the fixed gradient backdrop
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
