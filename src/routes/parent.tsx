import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DuoButton, DuoCard, DuoProgress, Chip } from "@/components/duo";
import { CHILDREN, UPCOMING } from "@/lib/mockData";
import {
  Home,
  Users,
  MessageCircle,
  Calendar as CalIcon,
  ClipboardList,
  FileText,
  Building2,
  Settings,
  LogOut,
  Bell,
  Heart,
  Send,
  Plus,
  CheckCircle2,
  Camera,
  Award,
} from "lucide-react";

export const Route = createFileRoute("/parent")({
  head: () => ({
    meta: [
      { title: "Parent Dashboard — SkoolDojo" },
      {
        name: "description",
        content:
          "See what's happening with your children at school today — progress, messages, photos and more.",
      },
    ],
  }),
  component: ParentDashboard,
});

const NAV = [
  { icon: Home, label: "Home", active: true },
  { icon: Users, label: "My Children" },
  { icon: MessageCircle, label: "Messages", badge: 3 },
  { icon: FileText, label: "Class Feed" },
  { icon: CheckCircle2, label: "Attendance" },
  { icon: ClipboardList, label: "Assignments" },
  { icon: CalIcon, label: "Events" },
  { icon: Award, label: "Reports" },
  { icon: Building2, label: "School Info" },
  { icon: Settings, label: "Settings" },
];

const GLANCE = [
  {
    id: 1,
    title: "Math activity completed",
    sub: "Ali earned 10 points",
    time: "9:15 AM",
    icon: "📘",
    color: "blue" as const,
  },
  {
    id: 2,
    title: "Good behavior",
    sub: "Ali earned a badge",
    time: "Yesterday",
    icon: "🎁",
    color: "yellow" as const,
  },
  {
    id: 3,
    title: "New class photos",
    sub: "From School Trip",
    time: "Yesterday",
    icon: "📸",
    color: "green" as const,
  },
];

const PROGRESS = [
  { label: "Participation", value: 80, color: "green" as const, icon: "⭐" },
  { label: "Homework", value: 75, color: "blue" as const, icon: "📚" },
  { label: "Behavior", value: 90, color: "yellow" as const, icon: "😊" },
  { label: "Class Engagement", value: 78, color: "purple" as const, icon: "👥" },
];

type MobileNavItem = {
  icon: typeof Home;
  label: string;
  id: string;
  active?: boolean;
  center?: boolean;
};

const MOBILE_NAV: MobileNavItem[] = [
  { icon: Home, label: "Home", active: true, id: "home" },
  { icon: Users, label: "Kids", id: "kids" },
  { icon: Plus, label: "", id: "create", center: true },
  { icon: MessageCircle, label: "Chat", id: "chat" },
  { icon: Settings, label: "Me", id: "me" },
];

const FEED_PHOTOS = ["🌳", "🎨", "🙋"] as const;

type ParentMessage = { id: string; from: string; text: string; at: string };

function ParentDashboard() {
  const [activeChild, setActiveChild] = useState(CHILDREN[0].id);
  const [loves, setLoves] = useState(28);
  const [loved, setLoved] = useState(false);
  const [messages, setMessages] = useState<ParentMessage[]>([]);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("parent_state");
    if (saved) {
      try {
        const s = JSON.parse(saved);
        if (typeof s.loves === "number") setLoves(s.loves);
        if (typeof s.loved === "boolean") setLoved(s.loved);
        if (Array.isArray(s.messages)) {
          setMessages(
            s.messages.map((m: ParentMessage | { from: string; text: string; at: string }) =>
              "id" in m && m.id ? m : { ...m, id: crypto.randomUUID() },
            ),
          );
        }
      } catch {}
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("parent_state", JSON.stringify({ loves, loved, messages }));
  }, [loves, loved, messages]);

  const child = CHILDREN.find((c) => c.id === activeChild)!;

  const sendMessage = () => {
    if (!draft.trim()) return;
    setMessages((m) => [...m, { id: crypto.randomUUID(), from: "You", text: draft, at: "now" }]);
    setDraft("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          from: "Cikgu Nadia",
          text: "Thanks for reaching out! I'll get back to you shortly. 😊",
          at: "now",
        },
      ]);
    }, 900);
  };

  return (
    <div className="min-h-screen pb-24 md:pb-10">
      <header className="sticky top-0 z-20 border-b-2 border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          <Link to="/" className="flex items-center gap-2 font-display text-2xl font-bold">
            <span className="text-3xl">👨‍👩‍👧</span>
            <span>SkoolDojo</span>
          </Link>
          <div className="flex items-center gap-2">
            <button className="relative flex items-center gap-1.5 rounded-full border-2 border-border bg-card px-3 py-1.5 text-sm font-bold hover:bg-muted">
              <MessageCircle className="size-4" />{" "}
              <span className="hidden sm:inline">Messages</span>
              <span className="grid size-4 place-items-center rounded-full bg-duo-red text-[10px] text-white">
                3
              </span>
            </button>
            <button className="relative flex items-center gap-1.5 rounded-full border-2 border-border bg-card px-3 py-1.5 text-sm font-bold hover:bg-muted">
              <Bell className="size-4" />
              <span className="grid size-4 place-items-center rounded-full bg-duo-red text-[10px] text-white">
                5
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:grid-cols-[240px_1fr] md:px-8">
        <aside className="hidden md:block">
          <DuoCard className="sticky top-24 p-4">
            <div className="mb-4 flex flex-col items-center text-center">
              <div className="grid size-20 place-items-center rounded-full border-4 border-duo-purple bg-[oklch(0.95_0.07_295)] text-3xl">
                👩🏽
              </div>
              <div className="mt-3 font-display text-lg font-bold">Hi, Farah!</div>
              <div className="text-xs font-bold text-muted-foreground">Welcome back 👋</div>
            </div>
            <nav className="space-y-1">
              {NAV.map((n) => (
                <button
                  key={n.label}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition ${
                    n.active
                      ? "bg-[oklch(0.95_0.07_295)] text-duo-purple"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <n.icon className="size-4" />
                  <span className="flex-1 text-left">{n.label}</span>
                  {n.badge && (
                    <span className="grid size-5 place-items-center rounded-full bg-duo-red text-[10px] font-bold text-white">
                      {n.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
            <Link
              to="/"
              className="mt-4 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-muted-foreground hover:bg-muted"
            >
              <LogOut className="size-4" /> Logout
            </Link>
          </DuoCard>
        </aside>

        <main className="space-y-5">
          {/* Greeting */}
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <h1 className="font-display text-3xl font-bold">Good morning, Farah! ✨</h1>
              <p className="text-sm text-muted-foreground">
                Here's what's happening with your children today.
              </p>
            </div>
          </div>

          {/* My Children */}
          <DuoCard>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-duo-purple">
                My Children
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {CHILDREN.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveChild(c.id)}
                  className={`flex items-center gap-3 rounded-2xl border-2 p-3 text-left transition ${
                    activeChild === c.id
                      ? "border-duo-purple bg-[oklch(0.97_0.05_295)]"
                      : "border-border bg-card hover:bg-muted"
                  }`}
                >
                  <div
                    className={`grid size-12 place-items-center rounded-full bg-[var(--${c.color})] text-2xl`}
                  >
                    {c.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="truncate font-bold">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.className}</div>
                  </div>
                  <span className="size-2.5 shrink-0 rounded-full bg-duo-green" />
                </button>
              ))}
              <button className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border p-3 text-sm font-bold text-muted-foreground hover:bg-muted">
                <Plus className="size-4" /> Add Child
              </button>
            </div>
          </DuoCard>

          {/* 3-column row */}
          <div className="grid gap-5 lg:grid-cols-3">
            <DuoCard accent="blue">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-display font-bold text-duo-blue">Today at a Glance</h3>
                <button className="text-xs font-bold text-duo-blue hover:underline">
                  View all →
                </button>
              </div>
              <ul className="space-y-3">
                {GLANCE.map((g) => (
                  <li key={g.id} className="flex items-center gap-3">
                    <div
                      className={`grid size-10 place-items-center rounded-xl bg-[oklch(0.95_0.08_240)] text-lg`}
                    >
                      {g.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="truncate text-sm font-bold">{g.title}</div>
                      <div className="text-xs text-muted-foreground">{g.sub}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">{g.time}</div>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  setLoves((l) => l + (loved ? -1 : 1));
                  setLoved((v) => !v);
                }}
                className="mt-4 flex w-full items-center justify-between rounded-xl border-2 border-border bg-[oklch(0.97_0.06_350)] px-3 py-2.5 text-sm font-bold transition hover:bg-[oklch(0.93_0.08_350)]"
              >
                <span className="flex items-center gap-2">
                  <Heart
                    className={`size-4 ${loved ? "fill-duo-red text-duo-red" : "text-duo-red"}`}
                  />
                  Show your love
                </span>
                <span className="text-xs">{loves} ❤</span>
              </button>
            </DuoCard>

            <DuoCard accent="green">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-display font-bold text-duo-green-dark">
                  {child.name.split(" ")[0]}'s Progress
                </h3>
                <select className="rounded-lg border-2 border-border bg-card px-2 py-1 text-xs font-bold">
                  <option>This Week</option>
                  <option>This Month</option>
                </select>
              </div>
              <ul className="space-y-3">
                {PROGRESS.map((p) => (
                  <li key={p.label}>
                    <div className="mb-1 flex items-center gap-2 text-sm font-bold">
                      <span className="text-base">{p.icon}</span>
                      <span className="flex-1">{p.label}</span>
                      <span className="font-numeric">{p.value}%</span>
                    </div>
                    <DuoProgress value={p.value} color={p.color} />
                  </li>
                ))}
              </ul>
              <DuoButton
                variant="green"
                size="sm"
                className="mt-4 w-full"
                onClick={() => alert("Detailed report coming soon!")}
              >
                View Detailed Report
              </DuoButton>
            </DuoCard>

            <DuoCard accent="yellow">
              <h3 className="mb-3 font-display font-bold text-[oklch(0.5_0.16_80)]">Upcoming</h3>
              <ul className="space-y-3">
                {UPCOMING.map((u) => (
                  <li key={u.id} className="flex items-center gap-3">
                    <div
                      className={`grid size-10 place-items-center rounded-xl text-lg`}
                      style={{ background: `var(--${u.color})`, color: "white" }}
                    >
                      {u.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="truncate text-sm font-bold">{u.title}</div>
                      <div className="text-xs text-muted-foreground">{u.date}</div>
                    </div>
                    <Chip color="white">{u.day}</Chip>
                  </li>
                ))}
              </ul>
              <DuoButton variant="white" size="sm" className="mt-4 w-full">
                View Calendar
              </DuoButton>
            </DuoCard>
          </div>

          {/* Class feed + message */}
          <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
            <DuoCard>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-display text-lg font-bold">Class Feed</h3>
                <button className="text-xs font-bold text-duo-purple hover:underline">
                  View all →
                </button>
              </div>
              <div className="flex items-start gap-3">
                <div className="grid size-10 place-items-center rounded-full bg-[oklch(0.95_0.07_295)] text-lg">
                  👩‍🏫
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold">
                    Cikgu Nadia{" "}
                    <span className="font-normal text-muted-foreground">
                      • Class 5A Teacher • 2h ago
                    </span>
                  </div>
                  <p className="mt-1 text-sm">
                    Great job to all students for an amazing science project presentation! You all
                    did fantastic! 🌟
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {FEED_PHOTOS.map((emoji) => (
                      <div
                        key={emoji}
                        className="aspect-square rounded-xl bg-linear-to-br from-[oklch(0.9_0.08_145)] to-[oklch(0.85_0.1_240)] grid place-items-center text-2xl"
                      >
                        {emoji}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                    <button
                      onClick={() => {
                        setLoves((l) => l + 1);
                      }}
                      className="flex items-center gap-1 hover:text-duo-red"
                    >
                      <Heart className="size-4" /> {loves}
                    </button>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="size-4" /> 6
                    </span>
                  </div>
                </div>
              </div>
            </DuoCard>

            <DuoCard accent="purple">
              <h3 className="mb-2 font-display text-lg font-bold text-duo-purple">
                Message Teacher
              </h3>
              <p className="mb-3 text-xs text-muted-foreground">
                Start a conversation with {child.name.split(" ")[0]}'s teacher.
              </p>
              <div className="max-h-48 space-y-2 overflow-y-auto rounded-xl bg-muted/50 p-3">
                {messages.length === 0 ? (
                  <p className="text-center text-xs text-muted-foreground">
                    No messages yet — say hi! 👋
                  </p>
                ) : (
                  messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${m.from === "You" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${m.from === "You" ? "bg-duo-purple text-white" : "bg-card border-2 border-border"}`}
                      >
                        <div className="text-[10px] font-bold opacity-70">{m.from}</div>
                        {m.text}
                      </div>
                    </div>
                  ))
                )}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="mt-3 flex gap-2"
              >
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Type a message…"
                  className="flex-1 rounded-xl border-2 border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-duo-purple"
                />
                <DuoButton variant="purple" size="md" type="submit">
                  <Send className="size-4" />
                </DuoButton>
              </form>
            </DuoCard>
          </div>

          {/* Photos */}
          <DuoCard>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">Recent Photos</h3>
              <button className="text-xs font-bold text-duo-green hover:underline">
                View all →
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {["🌳", "🌱", "🎨", "🙌"].map((emoji) => (
                <div
                  key={emoji}
                  className="group relative aspect-square overflow-hidden rounded-2xl border-2 border-border bg-linear-to-br from-[oklch(0.9_0.1_145)] to-[oklch(0.85_0.12_240)]"
                >
                  <div className="absolute inset-0 grid place-items-center text-5xl">{emoji}</div>
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between rounded-lg bg-black/40 px-2 py-1 text-[10px] font-bold text-white">
                    <span className="flex items-center gap-1">
                      <Camera className="size-3" /> Eco Park
                    </span>
                    <span>20 May</span>
                  </div>
                </div>
              ))}
            </div>
          </DuoCard>

          <div className="flex justify-center">
            <Link to="/" className="text-xs font-bold text-muted-foreground hover:underline">
              ← Switch role
            </Link>
          </div>
        </main>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-5 border-t-2 border-border bg-card md:hidden">
        {MOBILE_NAV.map((n) => (
          <button
            key={n.id}
            className={`flex flex-col items-center gap-0.5 py-2.5 text-xs font-bold ${
              n.center ? "-mt-4" : n.active ? "text-duo-purple" : "text-muted-foreground"
            }`}
          >
            {n.center ? (
              <span className="grid size-12 place-items-center rounded-full bg-duo-purple text-white shadow-lg">
                <Plus className="size-6" />
              </span>
            ) : (
              <>
                <n.icon className="size-5" />
                {n.label}
              </>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
