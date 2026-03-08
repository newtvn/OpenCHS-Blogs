export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  author: string;
  published: string;
  readTime: number;
  image: string;
  content: string[];
  /** Populated by the single-post endpoint */
  prev?: { slug: string; title: string } | null;
  /** Populated by the single-post endpoint */
  next?: { slug: string; title: string } | null;
}

export interface BlogListResponse {
  data: BlogPost[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface BlogPostResponse {
  data: BlogPost;
}

export interface BlogCategoriesResponse {
  data: string[];
}

export const categories = [
  "All",
  "Technology & Social Impact",
  "Product",
  "Case Studies & Impact",
  "AI & Technology",
  "Developer",
  "Governance & Ethics",
];
