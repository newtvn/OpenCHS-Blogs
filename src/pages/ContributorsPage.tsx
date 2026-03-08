import { Link } from "react-router-dom";
import { Github, ExternalLink, Heart } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { usePalette } from "@/hooks/useTheme";
import { useApi } from "@/hooks/useApi";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";

interface Contributor {
  name: string;
  role: string;
  contributions: number;
  areas: string[];
}

interface ContributorsResponse {
  data: Contributor[];
}

function ContributorSkeleton({ palette }: { palette: { border: string; card: string; subtle: string } }) {
  return (
    <div className={`animate-pulse rounded-2xl border p-6 ${palette.border} ${palette.card}`}>
      <div className="mb-4 flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-neutral-200 dark:bg-neutral-800" />
        <div className="space-y-2">
          <div className="h-4 w-24 rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-3 w-16 rounded bg-neutral-200 dark:bg-neutral-800" />
        </div>
      </div>
      <div className="mb-3 h-3 w-28 rounded bg-neutral-200 dark:bg-neutral-800" />
      <div className="flex flex-wrap gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-5 w-16 rounded-full bg-neutral-200 dark:bg-neutral-800" />
        ))}
      </div>
    </div>
  );
}

export default function ContributorsPage() {
  const { palette } = usePalette();

  const { data, loading, error } = useApi<ContributorsResponse>("/contributors");
  const contributors = data?.data ?? [];

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-12">
      <SEO title="Contributors" description="Meet the team behind OpenCHS — developers, designers, and child protection experts." />
      <Breadcrumbs items={[{ label: "Contributors" }]} />

      <h1 className="mb-2 text-4xl font-semibold md:text-5xl">Contributors</h1>
      <p className={`mb-12 max-w-2xl text-lg ${palette.subtle}`}>
        OpenCHS is built by a passionate community of developers, designers, and child protection experts.
      </p>

      {/* Loading skeletons */}
      {loading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <ContributorSkeleton key={i} palette={palette} />
          ))}
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <p className={`py-12 text-center text-lg ${palette.subtle}`}>
          Could not load contributors. Please try again later.
        </p>
      )}

      {/* Contributors grid */}
      {!loading && !error && contributors.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contributors.map((c, idx) => (
            <div key={idx} className={`rounded-2xl border p-6 transition hover:scale-[1.02] ${palette.border} ${palette.card}`}>
              <div className="mb-4 flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="text-lg">{c.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{c.name}</div>
                  <div className={`text-xs ${palette.subtle}`}>{c.role}</div>
                </div>
              </div>
              <div className={`mb-3 text-sm ${palette.subtle}`}>
                {c.contributions} contributions
              </div>
              <div className="flex flex-wrap gap-1.5">
                {c.areas.map((area) => (
                  <span key={area} className={`rounded-full border px-2 py-0.5 text-xs ${palette.border} ${palette.accent}`}>
                    {area}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* How to contribute */}
      <div className={`mt-16 rounded-3xl border p-8 md:p-12 ${palette.border} ${palette.card}`}>
        <h2 className="mb-6 text-center text-3xl font-semibold">Join the Community</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <Github className="mx-auto mb-4 h-10 w-10" />
            <h3 className="mb-2 font-semibold">Fork &amp; Contribute</h3>
            <p className={`mb-4 text-sm ${palette.subtle}`}>Browse open issues, submit PRs, and help improve the platform.</p>
            <a href="https://github.com/openchlai" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">View on GitHub <ExternalLink className="ml-2 h-3 w-3" /></Button>
            </a>
          </div>
          <div className="text-center">
            <Heart className="mx-auto mb-4 h-10 w-10" />
            <h3 className="mb-2 font-semibold">Fund the Mission</h3>
            <p className={`mb-4 text-sm ${palette.subtle}`}>Support the project financially to help us reach more children.</p>
            <Link to="/contact">
              <Button variant="outline" size="sm">Get in Touch</Button>
            </Link>
          </div>
          <div className="text-center">
            <ExternalLink className="mx-auto mb-4 h-10 w-10" />
            <h3 className="mb-2 font-semibold">Spread the Word</h3>
            <p className={`mb-4 text-sm ${palette.subtle}`}>Share OpenCHS with your network and help us grow the community.</p>
            <Link to="/blog">
              <Button variant="outline" size="sm">Read Our Blog</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
