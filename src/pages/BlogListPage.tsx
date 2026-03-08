import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { usePalette } from "@/hooks/useTheme";
import { categories } from "@/data/blogPosts";
import type { BlogListResponse } from "@/data/blogPosts";
import { useApi } from "@/hooks/useApi";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import LazyImage from "@/components/LazyImage";

function BlogCardSkeleton({ palette }: { palette: { border: string; card: string } }) {
  return (
    <div className={`animate-pulse overflow-hidden rounded-2xl border ${palette.border} ${palette.card}`}>
      <div className="aspect-video w-full bg-neutral-200 dark:bg-neutral-800" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-20 rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-5 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-4 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-4 w-5/6 rounded bg-neutral-200 dark:bg-neutral-800" />
      </div>
    </div>
  );
}

export default function BlogListPage() {
  const { palette } = usePalette();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce the search input so we don't fire a request on every keystroke.
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => setDebouncedSearch(searchQuery), 400);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [searchQuery]);

  const params = new URLSearchParams({ page: "1", limit: "12" });
  if (activeCategory !== "All") params.set("category", activeCategory);
  if (debouncedSearch) params.set("q", debouncedSearch);

  const { data, loading, error } = useApi<BlogListResponse>(`/blog/posts?${params.toString()}`);

  const posts = data?.data ?? [];

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-12">
      <SEO title="Blog" description="Articles, case studies, and technical insights from the OpenCHS community." />
      <Breadcrumbs items={[{ label: "Blog" }]} />

      <div className="mb-4">
        <h1 className="text-4xl font-semibold md:text-5xl">Blog</h1>
        <p className={`mt-4 max-w-2xl text-lg ${palette.subtle}`}>
          Articles, case studies, and technical insights from the OpenCHS community.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6 mt-8 max-w-md">
        <Search className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${palette.subtle}`} />
        <Input
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`pl-10 ${palette.border}`}
          aria-label="Search articles"
        />
      </div>

      <div className="mb-12 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant="outline"
            size="sm"
            className={`${activeCategory === cat ? "ring-2 ring-neutral-400" : ""} ${palette.accent}`}
            onClick={() => setActiveCategory(cat)}
            aria-pressed={activeCategory === cat}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Error state */}
      {error && !loading && (
        <p className={`py-12 text-center text-lg ${palette.subtle}`}>
          Could not load articles. Please try again later.
        </p>
      )}

      {/* Loading skeleton — 3 grey cards */}
      {loading && (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <BlogCardSkeleton key={i} palette={palette} />
          ))}
        </div>
      )}

      {/* Empty state (after load, no error) */}
      {!loading && !error && posts.length === 0 && (
        <p className={`py-12 text-center text-lg ${palette.subtle}`}>No articles found.</p>
      )}

      {/* Posts grid */}
      {!loading && !error && posts.length > 0 && (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group">
              <Card className={`grid h-full grid-rows-[auto_auto_1fr_auto] overflow-hidden border transition-transform duration-300 group-hover:scale-[1.02] ${palette.border} ${palette.card}`}>
                <LazyImage src={post.image} alt={post.title} className="aspect-video w-full grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-105" />
                <CardHeader>
                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{post.category}</Badge>
                  </div>
                  <h3 className="text-xl font-semibold group-hover:underline">{post.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className={palette.subtle}>{post.summary}</p>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <div className="flex w-full items-center gap-3 text-sm">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs">{post.author}</span>
                    <span className={`text-xs ${palette.subtle}`}>&bull;</span>
                    <span className={`text-xs ${palette.subtle}`}>{post.published}</span>
                    <span className={`text-xs ${palette.subtle}`}>&bull;</span>
                    <span className={`text-xs ${palette.subtle}`}>{post.readTime} min</span>
                  </div>
                  <span className="flex w-full items-center justify-start p-0 text-sm hover:underline">
                    Read more <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
