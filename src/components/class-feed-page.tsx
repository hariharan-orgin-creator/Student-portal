import { useMemo, useState } from "react";
import { DuoButton } from "@/components/duo";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CLASS_FEED_POSTS, CLASS_FEED_STORIES, type ClassFeedPost } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import {
  Bookmark,
  Heart,
  MessageCircle,
  Mic,
  Play,
  Send,
  Share2,
  BookOpen,
  Video,
  Upload,
  Plus,
} from "lucide-react";

type FeedTab = "for-you" | "challenges" | "speaking" | "mine";

const tabs: { id: FeedTab; label: string }[] = [
  { id: "for-you", label: "For you" },
  { id: "challenges", label: "Challenges" },
  { id: "speaking", label: "Speaking" },
  { id: "mine", label: "My posts" },
];

function FeedPostCard({ post, onLike }: { post: ClassFeedPost; onLike: (id: string) => void }) {
  return (
    <article className="overflow-hidden rounded-xl border border-border/60 bg-card">
      {/* Header — Instagram style */}
      <header className="flex items-center gap-2.5 px-3 py-2.5">
        <div
          className={cn(
            "grid size-9 place-items-center rounded-full text-lg ring-2",
            post.isTeacher ? "ring-duo-purple" : "ring-duo-green",
          )}
        >
          {post.authorAvatar}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold">{post.authorName}</p>
          <p className="truncate text-[10px] text-muted-foreground">
            {post.bookRef ?? post.skillTag} · {post.timeAgo}
          </p>
        </div>
        {post.isTeacher && (
          <span className="rounded-full bg-duo-purple px-2 py-0.5 text-[9px] font-bold text-white">
            Teacher
          </span>
        )}
      </header>

      {/* Media */}
      <div className="relative aspect-4/5 max-h-[420px] w-full bg-muted sm:aspect-square sm:max-h-none">
        <img src={post.mediaUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
        {post.mediaKind === "video" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <span className="grid size-14 place-items-center rounded-full bg-white/90 shadow-lg">
              <Play className="size-7 fill-duo-green-dark text-duo-green-dark" />
            </span>
          </div>
        )}
        {post.challengePrompt && (
          <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-3 pt-8">
            <p className="flex items-center gap-1 text-[10px] font-bold uppercase text-white/90">
              <BookOpen className="size-3" />
              Textbook challenge
            </p>
            <p className="text-xs font-bold text-white">{post.challengePrompt}</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-3 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onLike(post.id)}
              className="transition active:scale-110"
              aria-label="Like"
            >
              <Heart
                className={cn(
                  "size-6",
                  post.liked ? "fill-duo-red text-duo-red" : "text-foreground",
                )}
              />
            </button>
            <button type="button" aria-label="Comment">
              <MessageCircle className="size-6" />
            </button>
            <button type="button" aria-label="Share">
              <Share2 className="size-6" />
            </button>
          </div>
          <button type="button" aria-label="Save">
            <Bookmark className="size-6" />
          </button>
        </div>
        <p className="font-numeric mt-1 text-sm font-bold">{post.likes} likes</p>
        <p className="mt-1 text-sm">
          <span className="font-bold">{post.authorHandle}</span> {post.caption}
        </p>
        <span className="mt-1 inline-block rounded-full bg-[oklch(0.95_0.06_295)] px-2 py-0.5 text-[10px] font-bold text-duo-purple">
          {post.skillTag}
        </span>
        {post.comments > 0 && (
          <button type="button" className="mt-1 block text-xs font-bold text-muted-foreground">
            View all {post.comments} comments
          </button>
        )}
      </div>
    </article>
  );
}

export function ClassFeedPage() {
  const [tab, setTab] = useState<FeedTab>("for-you");
  const [posts, setPosts] = useState(CLASS_FEED_POSTS);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [caption, setCaption] = useState("");

  const filtered = useMemo(() => {
    switch (tab) {
      case "challenges":
        return posts.filter((p) => p.type === "book-challenge" || p.type === "teacher");
      case "speaking":
        return posts.filter(
          (p) => p.type === "speaking" || p.skillTag.toLowerCase().includes("speak"),
        );
      case "mine":
        return posts.filter((p) => p.authorHandle === "aisyah_5a");
      default:
        return posts;
    }
  }, [posts, tab]);

  const toggleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p,
      ),
    );
  };

  return (
    <div className="mx-auto max-w-lg">
      {/* Instagram-style top bar */}
      <div className="sticky top-0 z-10 -mx-4 mb-3 border-b border-border/60 bg-background/95 px-4 py-2 backdrop-blur md:mx-0 md:rounded-xl md:border">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold tracking-tight">Class Feed</h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="grid size-9 place-items-center rounded-full hover:bg-muted"
              aria-label="New post"
              onClick={() => setUploadOpen(true)}
            >
              <Plus className="size-5" />
            </button>
            <button
              type="button"
              className="grid size-9 place-items-center rounded-full bg-linear-to-br from-duo-purple to-duo-pink text-white"
              aria-label="Upload video"
              onClick={() => setUploadOpen(true)}
            >
              <Video className="size-4" />
            </button>
          </div>
        </div>
        <p className="text-[10px] font-bold text-muted-foreground">
          Public speaking · Communication · Textbook challenges
        </p>
      </div>

      {/* Stories row */}
      <div className="mb-4 flex gap-3 overflow-x-auto pb-1 scrollbar-none">
        {CLASS_FEED_STORIES.map((story) => (
          <button
            key={story.id}
            type="button"
            className="flex shrink-0 flex-col items-center gap-1"
            onClick={() => story.id === "s1" && setUploadOpen(true)}
          >
            <div
              className="grid size-14 place-items-center rounded-full p-[2px] text-xl"
              style={{
                background: `linear-gradient(135deg, ${story.ringColor}, var(--duo-yellow))`,
              }}
            >
              <span className="grid size-full place-items-center rounded-full bg-card text-lg">
                {story.icon}
              </span>
            </div>
            <span className="max-w-[56px] truncate text-[10px] font-bold">{story.label}</span>
          </button>
        ))}
      </div>

      {/* Skill highlight */}
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {["🎤 Speaking streak", "📖 Book challenges", "💬 Peer feedback", "🧠 Problem solving"].map(
          (chip) => (
            <span
              key={chip}
              className="shrink-0 rounded-full border border-border bg-muted/50 px-3 py-1 text-[10px] font-bold"
            >
              {chip}
            </span>
          ),
        )}
      </div>

      {/* Tabs */}
      <div className="mb-4 flex gap-1 border-b border-border">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "flex-1 border-b-2 pb-2 text-xs font-bold transition",
              tab === t.id
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div className="space-y-6 pb-6">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border px-4 py-12 text-center">
            <Mic className="mx-auto size-10 text-muted-foreground" />
            <p className="mt-2 font-bold">No posts yet</p>
            <p className="text-xs text-muted-foreground">
              Upload a video response to a textbook challenge
            </p>
            <DuoButton
              size="sm"
              variant="green"
              className="mt-3"
              onClick={() => setUploadOpen(true)}
            >
              <Upload className="size-4" />
              Upload video
            </DuoButton>
          </div>
        ) : (
          filtered.map((post) => <FeedPostCard key={post.id} post={post} onLike={toggleLike} />)
        )}
      </div>

      {/* Upload dialog */}
      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent className="card-pop max-w-md border-0 p-0">
          <DialogHeader className="border-b border-border/60 px-4 py-3">
            <DialogTitle className="font-display text-base font-bold">
              Share to Class Feed
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 p-4">
            <div className="rounded-xl border-2 border-dashed border-duo-green bg-[oklch(0.97_0.06_145)] p-6 text-center">
              <Video className="mx-auto size-10 text-duo-green-dark" />
              <p className="mt-2 text-sm font-bold">Upload your video</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Record a speaking response or solve a textbook problem on camera
              </p>
              <DuoButton size="sm" variant="green" className="mt-3">
                Choose video
              </DuoButton>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-muted-foreground">
                Link to textbook
              </label>
              <select className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm font-bold">
                <option>Math Year 5 · Ch.4 Fractions (p.42)</option>
                <option>Science Discoveries · Plant cells (p.18)</option>
                <option>English Reader · Comprehension (p.7)</option>
                <option>Bahasa Melayu · Karangan (p.55)</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-muted-foreground">
                Caption
              </label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="What did you practise? Ask for feedback on your communication…"
                className="mt-1 min-h-[80px] w-full rounded-lg border border-border bg-card px-3 py-2 text-sm"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {["Public speaking", "Communication", "Problem solving"].map((tag) => (
                <span key={tag} className="rounded-full bg-muted px-2 py-1 text-[10px] font-bold">
                  {tag}
                </span>
              ))}
            </div>
            <DuoButton
              variant="green"
              className="w-full"
              onClick={() => {
                setUploadOpen(false);
                setCaption("");
              }}
            >
              <Send className="size-4" />
              Post to class feed
            </DuoButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
