/** A single answer within a forum thread. */
export interface Answer {
  id: number;
  author: string;
  content: string;
  votes: number;
  accepted: boolean;
  postedAt: string;
}

/** A top-level discussion thread with nested answers. */
export interface Thread {
  id: number;
  title: string;
  author: string;
  category: string;
  tags: string[];
  votes: number;
  views: number;
  content: string;
  postedAt: string;
  answers: Answer[];
  /** Present in detail responses — the caller's current vote (-1, 0, 1). */
  user_vote?: number;
}

export interface ThreadListResponse {
  data: Thread[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ThreadDetailResponse {
  data: Thread;
}

export interface ForumStatsResponse {
  data: {
    members: number;
    threads: number;
    answers: number;
  };
}

export const forumCategories = [
  "All",
  "Deployment",
  "Configuration",
  "Integrations",
  "AI & ML",
  "Localization",
  "Legal & Compliance",
];
