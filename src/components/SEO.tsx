import { Helmet } from "react-helmet-async";

interface SEOProps {
  /** Page-specific title — appended as "Title | OpenCHS AI" */
  title?: string;
  /** Meta description for search engines and social cards */
  description?: string;
  /** Open Graph image URL */
  image?: string;
  /** Canonical URL for this page */
  url?: string;
}

/**
 * Injects `<head>` meta tags for SEO and social sharing via react-helmet-async.
 * Supports Open Graph and Twitter Card markup. Place once per page component.
 */
export default function SEO({ title, description, image, url }: SEOProps) {
  const siteName = "OpenCHS AI";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const desc = description || "AI-powered child protection platform. Discover insights, impact stories, and technical deep-dives from the OpenCHS community.";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
}
