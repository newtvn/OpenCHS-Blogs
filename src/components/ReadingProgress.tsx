import { useEffect, useState } from "react";

/**
 * A thin horizontal progress bar fixed to the top of the viewport.
 * Width represents how far the user has scrolled through the page.
 * Intended for long-form content like blog posts.
 */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[60] h-1 w-full" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
      <div
        className="h-full bg-neutral-800 transition-[width] duration-100 dark:bg-neutral-200"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
