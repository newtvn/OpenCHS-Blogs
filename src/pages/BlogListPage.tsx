import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { usePalette } from "@/hooks/useTheme";
import { blogPosts, categories } from "@/data/blogPosts";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import LazyImage from "@/components/LazyImage";

export default function BlogListPage() {
  const { palette } = usePalette();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = blogPosts
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .filter(
      (p) =>
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

      {filtered.length === 0 && (
        <p className={`py-12 text-center text-lg ${palette.subtle}`}>No articles found.</p>
      )}

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <Link key={post.id} to={`/blog/${post.slug}`} className="group">
            <Card className={`grid h-full grid-rows-[auto_auto_1fr_auto] overflow-hidden border transition-transform duration-300 group-hover:scale-[1.02] ${palette.border} ${palette.card}`}>
              <LazyImage src={post.image} alt={post.title} className="aspect-[16/9] w-full grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-105" />
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
    </section>
  );
}
