import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "openchs-cookies-accepted";

/**
 * GDPR-compliant cookie consent banner.
 * Persists acceptance to `localStorage` so it only shows once per browser.
 * Links to the Privacy Policy page for full details.
 */
export default function GDPRBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-neutral-300 bg-neutral-100 px-6 py-4 dark:border-neutral-700 dark:bg-neutral-900">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          This site uses cookies for essential functionality. See our{" "}
          <Link to="/privacy" className="underline underline-offset-2">Privacy Policy</Link>.
        </p>
        <Button size="sm" onClick={accept}>Accept</Button>
      </div>
    </div>
  );
}
