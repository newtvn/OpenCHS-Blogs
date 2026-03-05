import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { usePalette } from "@/hooks/useTheme";
import { getPostBySlug, blogPosts } from "@/data/blogPosts";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { palette } = usePalette();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) return <Navigate to="/blog" replace />;

  const currentIdx = blogPosts.findIndex((p) => p.id === post.id);
  const prev = currentIdx > 0 ? blogPosts[currentIdx - 1] : null;
  const next = currentIdx < blogPosts.length - 1 ? blogPosts[currentIdx + 1] : null;

  return (
    <article className="mx-auto w-full max-w-4xl px-6 py-16 lg:px-12">
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
        <img src={post.image} alt={post.title} className="h-auto w-full object-cover" />
      </div>

      {/* Content */}
      <div className="space-y-6">
        {post.content.map((paragraph, idx) => (
          <p key={idx} className={`text-base leading-relaxed md:text-lg ${idx === 0 ? "text-lg font-medium md:text-xl" : palette.subtle}`}>
            {paragraph}
          </p>
        ))}
      </div>

      {/* Prev / Next */}
      <div className={`mt-16 grid gap-4 border-t pt-8 sm:grid-cols-2 ${palette.border}`}>
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
  );
}
