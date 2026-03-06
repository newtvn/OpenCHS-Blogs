import { useState } from "react";

interface LazyImageProps {
  /** Image source URL */
  src: string;
  /** Accessible alt text describing the image */
  alt: string;
  /** Tailwind classes applied to the outer wrapper (controls sizing/aspect ratio) */
  className?: string;
}

/**
 * Image component with native lazy loading and a skeleton pulse placeholder.
 * The `className` prop controls the wrapper dimensions — the `<img>` fills
 * the wrapper via `object-cover`, so sizing should be set on the wrapper only.
 */
export default function LazyImage({ src, alt, className = "" }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-neutral-200 dark:bg-neutral-800" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
