import { useState } from "react";
import { Copy, Check } from "lucide-react";

/**
 * A small "copy to clipboard" button intended to float inside `<pre>` blocks.
 * Position the parent `<pre>` wrapper as `relative` and this button renders
 * at the top-right corner.
 *
 * Gracefully falls back if the Clipboard API is unavailable (e.g. insecure context).
 */
export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // Clipboard API unavailable — fall back to legacy approach
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
    }
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute right-2 top-2 rounded-md border border-neutral-300 bg-neutral-100 p-1.5 text-neutral-600 transition hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
      aria-label={copied ? "Copied" : "Copy to clipboard"}
    >
      {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}
