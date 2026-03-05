import { useState } from "react";
import { MessageSquare, Users, Clock, ThumbsUp, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePalette } from "@/hooks/useTheme";

interface ForumThread {
  id: number;
  title: string;
  author: string;
  category: string;
  replies: number;
  likes: number;
  lastActivity: string;
  preview: string;
}

const threads: ForumThread[] = [
  { id: 1, title: "Best practices for deploying OpenCHS in low-bandwidth environments", author: "Newtvn", category: "Deployment", replies: 12, likes: 24, lastActivity: "2 hours ago", preview: "We've been working on deploying OpenCHS in rural Kenya where bandwidth is limited. Here are some strategies we've found effective..." },
  { id: 2, title: "Custom workflow stages for child trafficking cases", author: "Rodgendo", category: "Configuration", replies: 8, likes: 16, lastActivity: "5 hours ago", preview: "Our organization needs specific workflow stages for trafficking cases. Has anyone customized the workflow engine for this use case?" },
  { id: 3, title: "Integrating OpenCHS with WhatsApp Business API", author: "Newtvn", category: "Integrations", replies: 15, likes: 31, lastActivity: "1 day ago", preview: "We've successfully integrated OpenCHS with WhatsApp Business API for incoming case reports. Here's a guide..." },
  { id: 4, title: "AI risk scoring accuracy improvements in v2.4", author: "Rodgendo", category: "AI & ML", replies: 6, likes: 19, lastActivity: "2 days ago", preview: "The new risk scoring model in v2.4 has significantly improved accuracy. We ran benchmarks comparing v2.3 vs v2.4..." },
  { id: 5, title: "Multi-language support: adding Swahili and Amharic", author: "Newtvn", category: "Localization", replies: 22, likes: 45, lastActivity: "3 days ago", preview: "We're working on adding Swahili and Amharic language support to both the UI and AI transcription. Contributors welcome!" },
  { id: 6, title: "Compliance with GDPR for European deployments", author: "Rodgendo", category: "Legal & Compliance", replies: 9, likes: 14, lastActivity: "1 week ago", preview: "For organizations deploying OpenCHS in the EU, here's a compliance checklist we've developed for GDPR requirements..." },
];

const forumCategories = ["All", "Deployment", "Configuration", "Integrations", "AI & ML", "Localization", "Legal & Compliance"];

export default function ForumPage() {
  const { palette } = usePalette();
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedThread, setExpandedThread] = useState<number | null>(null);

  const filtered = activeCategory === "All" ? threads : threads.filter((t) => t.category === activeCategory);

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16 lg:px-12">
      <h1 className="mb-2 text-4xl font-semibold md:text-5xl">Community Forum</h1>
      <p className={`mb-8 text-lg ${palette.subtle}`}>
        Discuss, ask questions, and share knowledge with the OpenCHS community.
      </p>

      {/* Categories */}
      <div className="mb-8 flex flex-wrap gap-2">
        {forumCategories.map((cat) => (
          <Button
            key={cat}
            variant="outline"
            size="sm"
            className={`${activeCategory === cat ? "ring-2 ring-neutral-400" : ""} ${palette.accent}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-8">
        <Input placeholder="Search discussions..." className={palette.border} />
      </div>

      {/* Threads */}
      <div className="space-y-3">
        {filtered.map((thread) => (
          <button
            key={thread.id}
            onClick={() => setExpandedThread(expandedThread === thread.id ? null : thread.id)}
            className={`w-full rounded-xl border p-6 text-left transition-all ${palette.border} ${palette.card}`}
          >
            <div className="flex items-start gap-4">
              <Avatar className="mt-1 h-10 w-10 flex-shrink-0">
                <AvatarFallback>{thread.author[0]}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className={`rounded-full border px-2 py-0.5 text-xs ${palette.border} ${palette.accent}`}>{thread.category}</span>
                  <span className={`text-xs ${palette.subtle}`}>by {thread.author}</span>
                </div>
                <h3 className="mb-1 text-base font-semibold">{thread.title}</h3>
                <div className={`flex flex-wrap items-center gap-4 text-xs ${palette.subtle}`}>
                  <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {thread.replies} replies</span>
                  <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" /> {thread.likes} likes</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {thread.lastActivity}</span>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${expandedThread === thread.id ? "mt-4 max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                  <p className={`text-sm ${palette.subtle}`}>{thread.preview}</p>
                </div>
              </div>
              <ChevronRight className={`mt-2 h-5 w-5 flex-shrink-0 transition-transform ${expandedThread === thread.id ? "rotate-90" : ""}`} />
            </div>
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className={`mt-12 rounded-2xl border p-8 ${palette.border} ${palette.card}`}>
        <h2 className="mb-6 text-center text-xl font-semibold">Community Stats</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="text-center">
            <Users className="mx-auto mb-2 h-8 w-8" />
            <div className="text-2xl font-bold">1,247</div>
            <div className={`text-sm ${palette.subtle}`}>Members</div>
          </div>
          <div className="text-center">
            <MessageSquare className="mx-auto mb-2 h-8 w-8" />
            <div className="text-2xl font-bold">3,891</div>
            <div className={`text-sm ${palette.subtle}`}>Discussions</div>
          </div>
          <div className="text-center">
            <ThumbsUp className="mx-auto mb-2 h-8 w-8" />
            <div className="text-2xl font-bold">12,456</div>
            <div className={`text-sm ${palette.subtle}`}>Helpful Answers</div>
          </div>
        </div>
      </div>
    </div>
  );
}
