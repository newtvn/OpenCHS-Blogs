import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Floating "back to top" button that appears after scrolling past 400 px.
 * Uses `behavior: "smooth"` for an animated scroll.
 */
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 rounded-full border border-neutral-300 bg-neutral-100 p-3 shadow-lg transition hover:scale-110 dark:border-neutral-700 dark:bg-neutral-800"
      aria-label="Back to top"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
