import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Share2, Twitter, Linkedin, LinkIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { usePalette } from "@/hooks/useTheme";
import type { BlogPostResponse } from "@/data/blogPosts";
import { useApi } from "@/hooks/useApi";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import ReadingProgress from "@/components/ReadingProgress";
import LazyImage from "@/components/LazyImage";
import { useState } from "react";

function PostSkeleton({ palette }: { palette: { border: string; card: string; subtle: string } }) {
  return (
    <article className="mx-auto w-full max-w-4xl animate-pulse px-6 py-16 lg:px-12">
      <div className="mb-8 h-4 w-24 rounded bg-neutral-200 dark:bg-neutral-800" />
      <div className="mb-8 space-y-4">
        <div className="h-3 w-32 rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-10 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-5 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-5 w-5/6 rounded bg-neutral-200 dark:bg-neutral-800" />
      </div>
      <div className="mb-12 aspect-video w-full overflow-hidden rounded-2xl bg-neutral-200 dark:bg-neutral-800" />
      <div className="space-y-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="h-4 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
        ))}
      </div>
    </article>
  );
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { palette } = usePalette();
  const [linkCopied, setLinkCopied] = useState(false);

  const { data, loading, error } = useApi<BlogPostResponse>(
    `/blog/posts/${slug ?? ""}`,
    { skip: !slug }
  );

  // While loading, show skeleton.
  if (loading) return <PostSkeleton palette={palette} />;

  // If there was an error or the slug is missing, redirect to the list.
  if (error || !slug) return <Navigate to="/blog" replace />;

  const post = data?.data;
  if (!post) return <Navigate to="/blog" replace />;

  const prev = post.prev ?? null;
  const next = post.next ?? null;

  const shareUrl = window.location.href;
  const shareText = encodeURIComponent(post.title);

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <>
      <ReadingProgress />
      <article className="mx-auto w-full max-w-4xl px-6 py-16 lg:px-12">
        <SEO
          title={post.title}
          description={post.summary}
          image={post.image}
        />
        <Breadcrumbs items={[{ label: "Blog", to: "/blog" }, { label: post.title }]} />

        {/* Back */}
        <Link to="/blog" className="group mb-8 inline-flex items-center gap-2 text-sm hover:underline">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Blog
        </Link>

        {/* Header */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="outline">{post.category}</Badge>
            <span className={`flex items-center gap-1 text-sm ${palette.subtle}`}><Calendar className="h-4 w-4" /> {post.published}</span>
            <span className={`flex items-center gap-1 text-sm ${palette.subtle}`}><Clock className="h-4 w-4" /> {post.readTime} min read</span>
          </div>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">{post.title}</h1>
          <p className={`text-lg ${palette.subtle}`}>{post.summary}</p>
          <div className="flex items-center gap-3 pt-2">
            <Avatar className="h-10 w-10">
              <AvatarFallback>{post.author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{post.author}</div>
              <div className={`text-sm ${palette.subtle}`}>Author</div>
            </div>
          </div>
        </div>

        {/* Hero image */}
        <div className="mb-12 overflow-hidden rounded-2xl">
          <LazyImage src={post.image} alt={post.title} className="aspect-video w-full" />
        </div>

        {/* Content */}
        <div className="space-y-6">
          {post.content.map((paragraph, idx) => (
            <p key={idx} className={`text-base leading-relaxed md:text-lg ${idx === 0 ? "text-lg font-medium md:text-xl" : palette.subtle}`}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Share buttons */}
        <div className={`mt-12 border-t pt-6 ${palette.border}`}>
          <div className="flex flex-wrap items-center gap-3">
            <Share2 className={`h-4 w-4 ${palette.subtle}`} />
            <span className={`text-sm font-medium ${palette.subtle}`}>Share this article</span>
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Twitter"
            >
              <Button variant="outline" size="sm"><Twitter className="mr-1.5 h-3.5 w-3.5" /> Twitter</Button>
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn"
            >
              <Button variant="outline" size="sm"><Linkedin className="mr-1.5 h-3.5 w-3.5" /> LinkedIn</Button>
            </a>
            <Button variant="outline" size="sm" onClick={copyLink}>
              <LinkIcon className="mr-1.5 h-3.5 w-3.5" /> {linkCopied ? "Copied!" : "Copy Link"}
            </Button>
          </div>
        </div>

        {/* Prev / Next — sourced from API */}
        <div className={`mt-12 grid gap-4 border-t pt-8 sm:grid-cols-2 ${palette.border}`}>
          {prev ? (
            <Link to={`/blog/${prev.slug}`} className={`group rounded-xl border p-6 transition hover:scale-[1.02] ${palette.border} ${palette.card}`}>
              <div className={`mb-2 text-xs ${palette.subtle}`}>Previous Article</div>
              <div className="font-semibold group-hover:underline">{prev.title}</div>
            </Link>
          ) : <div />}
          {next ? (
            <Link to={`/blog/${next.slug}`} className={`group rounded-xl border p-6 text-right transition hover:scale-[1.02] ${palette.border} ${palette.card}`}>
              <div className={`mb-2 text-xs ${palette.subtle}`}>Next Article</div>
              <div className="font-semibold group-hover:underline">{next.title}</div>
            </Link>
          ) : <div />}
        </div>

        {/* Back CTA */}
        <div className="mt-8 text-center">
          <Link to="/blog"><Button variant="outline">View All Articles</Button></Link>
        </div>
      </article>
    </>
  );
}
