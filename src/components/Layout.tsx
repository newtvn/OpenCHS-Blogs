import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { usePalette } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import BackToTop from "@/components/BackToTop";
import GDPRBanner from "@/components/GDPRBanner";

const STYLE_ID = "openchs-animations";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Blog" },
  { to: "/docs", label: "Docs" },
  { to: "/api-reference", label: "API" },
  { to: "/forum", label: "Forum" },
  { to: "/contributors", label: "Contributors" },
  { to: "/contact", label: "Contact" },
];

function isActive(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(to + "/");
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { palette } = usePalette();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.innerHTML = `
      @keyframes openchs-intro {
        0% { opacity: 0; transform: translate3d(0, 48px, 0); }
        100% { opacity: 1; transform: translate3d(0, 0, 0); }
      }
      @keyframes openchs-fade {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    return () => { style.remove(); };
  }, []);

  return (
    <div className={`relative isolate min-h-screen overflow-hidden transition-colors duration-700 ${palette.surface}`}>
      {/* Skip to content */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-neutral-900 focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>

      {/* Backgrounds */}
      <div
        className="pointer-events-none fixed inset-0 -z-20"
        style={{
          backgroundColor: palette.background.color,
          backgroundImage: palette.background.overlays.join(", "),
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-80"
        style={{ backgroundImage: palette.background.dots, backgroundSize: "12px 12px" }}
      />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-transparent" role="navigation" aria-label="Main navigation">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
          <Link to="/" className="text-xl font-bold tracking-tight">
            OpenCHS AI
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const active = isActive(location.pathname, link.to);
              return (
                <Link key={link.to} to={link.to} aria-current={active ? "page" : undefined}>
                  <Button
                    variant="ghost"
                    className={`text-base ${active ? "underline underline-offset-4" : ""}`}
                  >
                    {link.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className={`border-t px-6 pb-4 md:hidden ${palette.border}`}>
            {navLinks.map((link) => {
              const active = isActive(location.pathname, link.to);
              return (
                <Link key={link.to} to={link.to} className="block py-3" onClick={() => setMobileOpen(false)} aria-current={active ? "page" : undefined}>
                  <span className={active ? "font-semibold underline underline-offset-4" : ""}>
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      {/* Main content */}
      <main id="main-content" className="min-h-[60vh]">{children}</main>

      {/* Footer */}
      <footer className="py-12" role="contentinfo">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold">OpenCHS</h3>
              <p className={`text-sm ${palette.subtle}`}>AI-powered child protection platform</p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Resources</h4>
              <ul className={`space-y-2 text-sm ${palette.subtle}`}>
                <li><Link to="/docs" className="hover:underline">Documentation</Link></li>
                <li><Link to="/api-reference" className="hover:underline">API Reference</Link></li>
                <li><a href="https://github.com/openchlai" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Community</h4>
              <ul className={`space-y-2 text-sm ${palette.subtle}`}>
                <li><Link to="/blog" className="hover:underline">Blog</Link></li>
                <li><Link to="/forum" className="hover:underline">Forum</Link></li>
                <li><Link to="/contributors" className="hover:underline">Contributors</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Legal</h4>
              <ul className={`space-y-2 text-sm ${palette.subtle}`}>
                <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:underline">Terms of Service</Link></li>
                <li><Link to="/license" className="hover:underline">License</Link></li>
              </ul>
            </div>
          </div>
          <div className={`mt-12 border-t pt-8 text-center text-sm ${palette.border} ${palette.subtle}`}>
            <p>&copy; 2025 OpenCHS. Funded by UNICEF Venture Fund. Built by BITZ-IT.</p>
          </div>
        </div>
      </footer>

      <BackToTop />
      <GDPRBanner />
    </div>
  );
}
