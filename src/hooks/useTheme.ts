import { useEffect, useMemo, useState } from "react";

const getRootTheme = () => {
  if (typeof document === "undefined") {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "dark";
  }

  const root = document.documentElement;
  if (root.classList.contains("dark")) return "dark";
  if (root.getAttribute("data-theme") === "dark" || root.dataset?.theme === "dark") return "dark";
  if (root.classList.contains("light")) return "light";

  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  return "dark";
};

export const useThemeSync = () => {
  const [theme, setTheme] = useState(() => getRootTheme());

  useEffect(() => {
    if (typeof document === "undefined") return;

    const sync = () => {
      const next = getRootTheme();
      setTheme((prev) => (prev === next ? prev : next));
    };

    sync();

    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    const media =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-color-scheme: dark)")
        : null;

    const onMedia = () => sync();
    media?.addEventListener("change", onMedia);

    return () => {
      observer.disconnect();
      media?.removeEventListener("change", onMedia);
    };
  }, []);

  return [theme, setTheme] as const;
};

export const usePalette = () => {
  const [theme] = useThemeSync();

  const palette = useMemo(
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
    [theme]
  );

  return { theme, palette };
};
