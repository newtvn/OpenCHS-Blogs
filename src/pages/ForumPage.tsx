import { useState, useEffect, useRef } from "react";
import { MessageSquare, Users, ThumbsUp, ChevronUp, ChevronDown, Check, Search, Eye, Plus } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { usePalette } from "@/hooks/useTheme";
import { forumCategories } from "@/data/forumThreads";
import type { ThreadListResponse, ThreadDetailResponse, ForumStatsResponse } from "@/data/forumThreads";
import { useApi } from "@/hooks/useApi";
import { api } from "@/lib/api";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";


export default function ForumPage() {
  const { palette } = usePalette();
  const [activeCategory, setActiveCategory] = useState("All");
  const [openThread, setOpenThread] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [votedItems, setVotedItems] = useState<Record<string, number>>({});
  const [answerText, setAnswerText] = useState("");
  const [answerPosted, setAnswerPosted] = useState(false);
  const [answerPosting, setAnswerPosting] = useState(false);
  const [answerError, setAnswerError] = useState<string | null>(null);
  const [showAskForm, setShowAskForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ title: "", body: "", tags: "" });
  const [questionPosted, setQuestionPosted] = useState(false);
  const [questionPosting, setQuestionPosting] = useState(false);
  const [questionError, setQuestionError] = useState<string | null>(null);

  // Debounce search input
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => setDebouncedSearch(searchQuery), 400);
    return () => { if (debounceTimer.current) clearTimeout(debounceTimer.current); };
  }, [searchQuery]);

  // Thread list query
  const listParams = new URLSearchParams({ page: "1" });
  if (activeCategory !== "All") listParams.set("category", activeCategory);
  if (debouncedSearch) listParams.set("q", debouncedSearch);

  const {
    data: listData,
    loading: listLoading,
    error: listError,
  } = useApi<ThreadListResponse>(`/forum/threads?${listParams.toString()}`);

  // Thread detail query — only when a thread is open
  const {
    data: detailData,
    loading: detailLoading,
  } = useApi<ThreadDetailResponse>(
    `/forum/threads/${openThread}`,
    { skip: openThread === null }
  );

  // Community stats
  const { data: statsData } = useApi<ForumStatsResponse>("/forum/stats");

  const threads = listData?.data ?? [];
  const activeThread = detailData?.data ?? null;
  const stats = statsData?.data ?? null;

  // Fire-and-forget view increment when a thread is opened
  useEffect(() => {
    if (openThread !== null) {
      api.post(`/forum/threads/${openThread}/view`).catch(() => { /* ignore */ });
    }
  }, [openThread]);

  const handleVote = (key: string, direction: number) => {
    setVotedItems((prev) => {
      const current = prev[key] || 0;
      const newDir = current === direction ? 0 : direction;

      // Optimistic local update; fire API in background if it's a thread or answer vote
      const isThread = key.startsWith("q-");
      const id = key.replace(/^[qa]-/, "");
      const endpoint = isThread
        ? `/forum/threads/${id}/vote`
        : `/forum/answers/${id}/vote`;
      api.post(endpoint, { direction: newDir }).catch(() => { /* ignore — no auth yet */ });

      return { ...prev, [key]: newDir };
    });
  };

  const getVoteOffset = (key: string) => votedItems[key] || 0;

  const handlePostAnswer = async () => {
    if (!answerText.trim() || openThread === null) return;
    setAnswerPosting(true);
    setAnswerError(null);
    try {
      await api.post(`/forum/threads/${openThread}/answers`, { content: answerText });
      setAnswerPosted(true);
      setAnswerText("");
      setTimeout(() => setAnswerPosted(false), 4000);
    } catch (err: unknown) {
      setAnswerError(err instanceof Error ? err.message : "Could not post answer. Please try again.");
    } finally {
      setAnswerPosting(false);
    }
  };

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.title.trim() || !newQuestion.body.trim()) return;
    setQuestionPosting(true);
    setQuestionError(null);
    try {
      const tags = newQuestion.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      await api.post("/forum/threads", {
        title: newQuestion.title,
        content: newQuestion.body,
        tags,
        category: activeCategory !== "All" ? activeCategory : undefined,
      });
      setQuestionPosted(true);
      setNewQuestion({ title: "", body: "", tags: "" });
      setTimeout(() => {
        setQuestionPosted(false);
        setShowAskForm(false);
      }, 3000);
    } catch (err: unknown) {
      setQuestionError(err instanceof Error ? err.message : "Could not post question. Please try again.");
    } finally {
      setQuestionPosting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16 lg:px-12">
      <SEO title="Forum" description="Discuss, ask questions, and share knowledge with the OpenCHS community." />
      <Breadcrumbs items={[{ label: "Forum" }]} />

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mb-2 text-4xl font-semibold md:text-5xl">Community Forum</h1>
          <p className={`text-lg ${palette.subtle}`}>
            Discuss, ask questions, and share knowledge with the OpenCHS community.
          </p>
        </div>
        {!openThread && (
          <Button onClick={() => setShowAskForm(true)} className="w-fit">
            <Plus className="mr-2 h-4 w-4" /> Ask a Question
          </Button>
        )}
      </div>

      {/* Ask question form */}
      {showAskForm && !openThread && (
        <div className={`mb-8 rounded-xl border p-6 ${palette.border} ${palette.card}`}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Ask a Question</h2>
            <button onClick={() => setShowAskForm(false)} className={`text-sm hover:underline ${palette.subtle}`}>Cancel</button>
          </div>
          {questionPosted ? (
            <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-center text-green-600 dark:text-green-400">
              Your question has been posted! The community will respond shortly.
            </div>
          ) : (
            <form onSubmit={handleAskQuestion} className="space-y-4">
              {questionError && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-center text-sm text-red-600 dark:text-red-400">
                  {questionError}
                </div>
              )}
              <div>
                <label htmlFor="q-title" className="mb-1 block text-sm font-medium">Title *</label>
                <Input id="q-title" placeholder="What's your question?" value={newQuestion.title} onChange={(e) => setNewQuestion((q) => ({ ...q, title: e.target.value }))} className={palette.border} required />
              </div>
              <div>
                <label htmlFor="q-body" className="mb-1 block text-sm font-medium">Details *</label>
                <textarea
                  id="q-body"
                  rows={5}
                  placeholder="Provide more context and details..."
                  value={newQuestion.body}
                  onChange={(e) => setNewQuestion((q) => ({ ...q, body: e.target.value }))}
                  className={`w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none transition-colors focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 dark:focus:border-neutral-400 dark:focus:ring-neutral-400 ${palette.border}`}
                  required
                />
              </div>
              <div>
                <label htmlFor="q-tags" className="mb-1 block text-sm font-medium">Tags</label>
                <Input id="q-tags" placeholder="e.g. deployment, ai, configuration" value={newQuestion.tags} onChange={(e) => setNewQuestion((q) => ({ ...q, tags: e.target.value }))} className={palette.border} />
              </div>
              <Button type="submit" disabled={questionPosting}>
                {questionPosting ? "Posting…" : "Post Your Question"}
              </Button>
            </form>
          )}
        </div>
      )}

      {/* Categories */}
      <div className="mb-6 flex flex-wrap gap-2">
        {forumCategories.map((cat) => (
          <Button
            key={cat}
            variant="outline"
            size="sm"
            className={`${activeCategory === cat ? "ring-2 ring-neutral-400" : ""} ${palette.accent}`}
            onClick={() => { setActiveCategory(cat); setOpenThread(null); }}
            aria-pressed={activeCategory === cat}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${palette.subtle}`} />
        <Input
          placeholder="Search discussions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`pl-10 ${palette.border}`}
          aria-label="Search discussions"
        />
      </div>

      {/* Thread detail view */}
      {openThread !== null ? (
        <div>
          <button onClick={() => setOpenThread(null)} className={`mb-6 text-sm hover:underline ${palette.subtle}`}>
            &larr; Back to all questions
          </button>

          {detailLoading && (
            <div className={`animate-pulse rounded-xl border p-6 ${palette.border} ${palette.card}`}>
              <div className="flex gap-4">
                <div className="flex flex-col items-center gap-2 pt-1">
                  <div className="h-8 w-6 rounded bg-neutral-200 dark:bg-neutral-800" />
                  <div className="h-6 w-8 rounded bg-neutral-200 dark:bg-neutral-800" />
                  <div className="h-8 w-6 rounded bg-neutral-200 dark:bg-neutral-800" />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="h-7 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800" />
                  <div className="h-4 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
                  <div className="h-4 w-5/6 rounded bg-neutral-200 dark:bg-neutral-800" />
                </div>
              </div>
            </div>
          )}

          {!detailLoading && activeThread && (
            <>
              {/* Question */}
              <div className={`rounded-xl border p-6 ${palette.border} ${palette.card}`}>
                <div className="flex gap-4">
                  {/* Vote column */}
                  <div className="flex flex-col items-center gap-1 pt-1">
                    <button onClick={() => handleVote(`q-${activeThread.id}`, 1)} aria-label="Upvote" className={`rounded p-1 transition hover:bg-neutral-200 dark:hover:bg-neutral-800 ${getVoteOffset(`q-${activeThread.id}`) === 1 ? "text-green-500" : palette.subtle}`}>
                      <ChevronUp className="h-6 w-6" />
                    </button>
                    <span className="text-lg font-bold">{activeThread.votes + getVoteOffset(`q-${activeThread.id}`)}</span>
                    <button onClick={() => handleVote(`q-${activeThread.id}`, -1)} aria-label="Downvote" className={`rounded p-1 transition hover:bg-neutral-200 dark:hover:bg-neutral-800 ${getVoteOffset(`q-${activeThread.id}`) === -1 ? "text-red-500" : palette.subtle}`}>
                      <ChevronDown className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <h2 className="mb-3 text-2xl font-bold">{activeThread.title}</h2>
                    <div className={`mb-4 flex flex-wrap items-center gap-3 text-xs ${palette.subtle}`}>
                      <span>Asked {activeThread.postedAt}</span>
                      <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {activeThread.views.toLocaleString()} views</span>
                    </div>
                    <p className="mb-4 leading-relaxed">{activeThread.content}</p>
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {activeThread.tags.map((tag) => (
                        <span key={tag} className={`rounded-md border px-2 py-0.5 text-xs ${palette.border} ${palette.accent}`}>{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">{activeThread.author[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{activeThread.author}</span>
                      <Badge variant="outline" className="text-xs">{activeThread.category}</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Answers header */}
              <div className={`mb-4 mt-8 flex items-center justify-between border-b pb-3 ${palette.border}`}>
                <h3 className="text-lg font-semibold">{activeThread.answers.length} Answer{activeThread.answers.length !== 1 ? "s" : ""}</h3>
                <span className={`text-sm ${palette.subtle}`}>Sorted by votes</span>
              </div>

              {/* Answers */}
              <div className="space-y-4">
                {[...activeThread.answers].sort((a, b) => b.votes - a.votes).map((answer) => (
                  <div key={answer.id} className={`rounded-xl border p-6 ${answer.accepted ? "border-green-500/30 bg-green-500/5" : `${palette.border} ${palette.card}`}`}>
                    <div className="flex gap-4">
                      {/* Vote column */}
                      <div className="flex flex-col items-center gap-1 pt-1">
                        <button onClick={() => handleVote(`a-${answer.id}`, 1)} aria-label="Upvote answer" className={`rounded p-1 transition hover:bg-neutral-200 dark:hover:bg-neutral-800 ${getVoteOffset(`a-${answer.id}`) === 1 ? "text-green-500" : palette.subtle}`}>
                          <ChevronUp className="h-5 w-5" />
                        </button>
                        <span className="font-bold">{answer.votes + getVoteOffset(`a-${answer.id}`)}</span>
                        <button onClick={() => handleVote(`a-${answer.id}`, -1)} aria-label="Downvote answer" className={`rounded p-1 transition hover:bg-neutral-200 dark:hover:bg-neutral-800 ${getVoteOffset(`a-${answer.id}`) === -1 ? "text-red-500" : palette.subtle}`}>
                          <ChevronDown className="h-5 w-5" />
                        </button>
                        {answer.accepted && (
                          <div className="mt-1 rounded-full bg-green-500/20 p-1" title="Accepted answer">
                            <Check className="h-4 w-4 text-green-500" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="whitespace-pre-wrap leading-relaxed">{answer.content}</div>
                        <div className={`mt-4 flex items-center justify-between border-t pt-3 ${palette.border}`}>
                          <span className={`text-xs ${palette.subtle}`}>{answer.postedAt}</span>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-5 w-5">
                              <AvatarFallback className="text-xs">{answer.author[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{answer.author}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Post answer box */}
              <div className={`mt-8 rounded-xl border p-6 ${palette.border} ${palette.card}`}>
                <h3 className="mb-4 text-lg font-semibold">Your Answer</h3>
                {answerPosted && (
                  <div className="mb-4 rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-center text-sm text-green-600 dark:text-green-400">
                    Your answer has been posted!
                  </div>
                )}
                {answerError && (
                  <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-center text-sm text-red-600 dark:text-red-400">
                    {answerError}
                  </div>
                )}
                <textarea
                  rows={5}
                  placeholder="Write your answer here..."
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  className={`mb-4 w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none transition-colors focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 dark:focus:border-neutral-400 dark:focus:ring-neutral-400 ${palette.border}`}
                />
                <Button onClick={handlePostAnswer} disabled={answerPosting}>
                  {answerPosting ? "Posting…" : "Post Your Answer"}
                </Button>
              </div>
            </>
          )}
        </div>
      ) : (
        /* Thread list view */
        <>
          {/* Loading skeleton */}
          {listLoading && (
            <div className="space-y-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`animate-pulse rounded-xl border p-5 ${palette.border} ${palette.card}`}>
                  <div className="flex items-start gap-4">
                    <div className="hidden sm:flex sm:gap-3">
                      {[0, 1, 2].map((j) => (
                        <div key={j} className="h-14 w-14 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
                      ))}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="h-5 w-2/3 rounded bg-neutral-200 dark:bg-neutral-800" />
                      <div className="h-4 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
                      <div className="h-3 w-1/3 rounded bg-neutral-200 dark:bg-neutral-800" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error state */}
          {listError && !listLoading && (
            <p className={`py-12 text-center text-lg ${palette.subtle}`}>
              Could not load discussions. Please try again later.
            </p>
          )}

          {/* Thread list */}
          {!listLoading && !listError && (
            <div className="space-y-2">
              {threads.map((thread) => {
                const hasAccepted = thread.answers.some((a) => a.accepted);
                return (
                  <button
                    key={thread.id}
                    onClick={() => setOpenThread(thread.id)}
                    className={`w-full rounded-xl border p-5 text-left transition-all hover:scale-[1.005] ${palette.border} ${palette.card}`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Stats column */}
                      <div className="hidden shrink-0 sm:flex sm:gap-3">
                        <div className="flex min-w-14 flex-col items-center rounded-lg border px-2 py-1.5 text-center">
                          <span className="text-base font-bold">{thread.votes}</span>
                          <span className={`text-xs ${palette.subtle}`}>votes</span>
                        </div>
                        <div className={`flex min-w-14 flex-col items-center rounded-lg border px-2 py-1.5 text-center ${hasAccepted ? "border-green-500/40 bg-green-500/10 text-green-500" : ""}`}>
                          <span className="text-base font-bold">{thread.answers.length}</span>
                          <span className={`text-xs ${hasAccepted ? "text-green-500" : palette.subtle}`}>{hasAccepted ? "✓ ans" : "ans"}</span>
                        </div>
                        <div className="flex min-w-14 flex-col items-center rounded-lg px-2 py-1.5 text-center">
                          <span className={`text-base font-bold ${palette.subtle}`}>{thread.views >= 1000 ? `${(thread.views / 1000).toFixed(1)}k` : thread.views}</span>
                          <span className={`text-xs ${palette.subtle}`}>views</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <h3 className="mb-1.5 text-base font-semibold text-blue-600 dark:text-blue-400">{thread.title}</h3>
                        <p className={`mb-2 line-clamp-2 text-sm ${palette.subtle}`}>{thread.content}</p>
                        <div className="flex flex-wrap items-center gap-2">
                          {thread.tags.map((tag) => (
                            <span key={tag} className={`rounded-md border px-1.5 py-0.5 text-xs ${palette.border} ${palette.accent}`}>{tag}</span>
                          ))}
                          <span className={`ml-auto text-xs ${palette.subtle}`}>
                            <span className="font-medium">{thread.author}</span> &middot; {thread.postedAt}
                          </span>
                        </div>

                        {/* Mobile stats */}
                        <div className={`mt-2 flex gap-4 text-xs sm:hidden ${palette.subtle}`}>
                          <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" /> {thread.votes}</span>
                          <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {thread.answers.length}</span>
                          <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {thread.views}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {!listLoading && !listError && threads.length === 0 && (
            <p className={`py-12 text-center text-lg ${palette.subtle}`}>No discussions found.</p>
          )}

          {/* Stats */}
          <div className={`mt-12 rounded-2xl border p-8 ${palette.border} ${palette.card}`}>
            <h2 className="mb-6 text-center text-xl font-semibold">Community Stats</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="text-center">
                <Users className="mx-auto mb-2 h-8 w-8" />
                <div className="text-2xl font-bold">
                  {stats ? stats.members.toLocaleString() : "—"}
                </div>
                <div className={`text-sm ${palette.subtle}`}>Members</div>
              </div>
              <div className="text-center">
                <MessageSquare className="mx-auto mb-2 h-8 w-8" />
                <div className="text-2xl font-bold">
                  {stats ? stats.threads.toLocaleString() : "—"}
                </div>
                <div className={`text-sm ${palette.subtle}`}>Discussions</div>
              </div>
              <div className="text-center">
                <ThumbsUp className="mx-auto mb-2 h-8 w-8" />
                <div className="text-2xl font-bold">
                  {stats ? stats.answers.toLocaleString() : "—"}
                </div>
                <div className={`text-sm ${palette.subtle}`}>Helpful Answers</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
