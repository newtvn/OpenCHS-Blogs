import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface Crumb {
  /** Display text for the breadcrumb segment */
  label: string;
  /** Route path — omit for the current (last) page */
  to?: string;
}

/**
 * Accessible breadcrumb navigation with `aria-label` and structured links.
 * The last item renders as plain text (current page); all others are links.
 * A "Home" link is always prepended automatically.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400">
      <Link to="/" className="hover:underline">Home</Link>
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center gap-1">
          <ChevronRight className="h-3 w-3" />
          {item.to ? (
            <Link to={item.to} className="hover:underline">{item.label}</Link>
          ) : (
            <span className="text-neutral-900 dark:text-neutral-100" aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
