import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DuoButton, DuoCard, DuoProgress, Chip } from "@/components/duo";
import { ASSIGNMENTS, BADGES, RECENT_ACTIVITY } from "@/lib/mockData";
import { Home, FolderOpen, ClipboardList, Star, Users, Gamepad2, MessageCircle, Settings, LogOut, Flame, Bell, ShoppingBag, Target, Trophy, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/student")({
  head: () => ({
    meta: [
      { title: "Student Dashboard — SkoolDojo" },
      { name: "description", content: "Track quests, earn points, level up and see your class progress." },
    ],
  }),
  component: StudentDashboard,
});

const NAV = [
  { icon: Home, label: "Home", active: true },
  { icon: FolderOpen, label: "My Portfolio" },
  { icon: ClipboardList, label: "Assignments" },
  { icon: Star, label: "Rewards" },
  { icon: Users, label: "My Class" },
  { icon: Gamepad2, label: "Activities" },
  { icon: MessageCircle, label: "Messages" },
  { icon: Settings, label: "Settings" },
];

function StudentDashboard() {
  const [points, setPoints] = useState(320);
  const [coins, setCoins] = useState(15);
  const [tasks, setTasks] = useState(ASSIGNMENTS.map((a) => ({ ...a })));
  const [activity, setActivity] = useState(RECENT_ACTIVITY);
  const [streak] = useState(5);

  // Persist points to localStorage so it survives reload
  useEffect(() => {
    const saved = localStorage.getItem("student_state");
    if (saved) {
      try {
        const s = JSON.parse(saved);
        if (typeof s.points === "number") setPoints(s.points);
        if (typeof s.coins === "number") setCoins(s.coins);
        if (Array.isArray(s.tasks)) setTasks(s.tasks);
      } catch {}
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("student_state", JSON.stringify({ points, coins, tasks }));
  }, [points, coins, tasks]);

  const completedToday = tasks.filter((t) => t.status === "submitted").length;
  const dailyGoal = 3;
  const nextLevel = 500;

  const submitTask = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task || task.status === "submitted") return;
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: "submitted" } : t)));
    setPoints((p) => p + task.points);
    setCoins((c) => c + Math.ceil(task.points / 5));
    setActivity((a) => [
      { id: Date.now(), type: "submission", text: `You submitted ${task.title} (+${task.points} pts)`, time: "now", icon: "✨" },
      ...a,
    ]);
  };

  return (
    <div className="min-h-screen pb-24 md:pb-10">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b-2 border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          <Link to="/" className="flex items-center gap-2 font-display text-2xl font-bold">
            <span className="text-3xl">🦖</span>
            <span>SkoolDojo</span>
          </Link>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-1.5 rounded-full bg-[oklch(0.95_0.08_90)] px-3 py-1.5">
              <Star className="size-4 fill-[var(--duo-yellow)] text-[var(--duo-yellow)]" />
              <span className="text-sm font-extrabold">{points}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-[oklch(0.95_0.08_25)] px-3 py-1.5">
              <Flame className="size-4 fill-[var(--duo-orange)] text-[var(--duo-orange)]" />
              <span className="text-sm font-extrabold">{streak}</span>
              <span className="hidden text-xs font-bold text-muted-foreground sm:inline">days</span>
            </div>
            <button className="relative grid size-9 place-items-center rounded-full border-2 border-border bg-card hover:bg-muted">
              <Bell className="size-4" />
              <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-[var(--duo-red)] text-[10px] font-bold text-white">3</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:grid-cols-[240px_1fr] md:px-8">
        {/* Sidebar */}
        <aside className="hidden md:block">
          <DuoCard className="sticky top-24 p-4">
            <div className="mb-4 flex flex-col items-center text-center">
              <div className="relative">
                <div className="grid size-20 place-items-center rounded-full border-4 border-[var(--duo-green)] bg-[oklch(0.95_0.08_145)] text-4xl">
                  🦕
                </div>
                <div className="absolute -bottom-1 -right-1 grid size-7 place-items-center rounded-full bg-[var(--duo-purple)] text-xs font-bold text-white shadow-md">L4</div>
              </div>
              <div className="mt-3 font-display text-lg font-bold">Aisyah</div>
              <div className="text-xs font-bold uppercase text-[var(--duo-purple)]">Level 4 Learner</div>
            </div>
            <nav className="space-y-1">
              {NAV.map((n) => (
                <button
                  key={n.label}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition ${
                    n.active ? "bg-[oklch(0.95_0.08_145)] text-[var(--duo-green-dark)]" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <n.icon className="size-4" />
                  {n.label}
                </button>
              ))}
            </nav>
            <Link to="/" className="mt-4 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-muted-foreground hover:bg-muted">
              <LogOut className="size-4" />
              Log out
            </Link>
          </DuoCard>
        </aside>

        {/* Main */}
        <main className="space-y-5">
          {/* Hero */}
          <DuoCard className="relative overflow-hidden bg-gradient-to-br from-[oklch(0.96_0.08_145)] to-[oklch(0.9_0.12_145)] p-6">
            <div className="flex flex-wrap items-center gap-6">
              <div className="text-7xl animate-pop-in">🦕</div>
              <div className="flex-1 min-w-[200px]">
                <h1 className="font-display text-3xl font-bold">Hi Aisyah! 👋</h1>
                <p className="mt-1 text-sm text-muted-foreground">Let's make today awesome — {dailyGoal - completedToday} quests to go!</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="mb-1 flex items-baseline justify-between">
                      <span className="text-xs font-bold uppercase text-muted-foreground">My Points</span>
                      <span className="font-display text-2xl font-bold">{points}<span className="text-sm text-muted-foreground">/{nextLevel}</span></span>
                    </div>
                    <DuoProgress value={(points / nextLevel) * 100} color="green" />
                    <div className="mt-1 text-xs font-bold text-muted-foreground">{nextLevel - points} pts to Level 5</div>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border-2 border-border bg-card p-3">
                    <div className="grid size-12 place-items-center rounded-xl bg-[oklch(0.92_0.1_295)] text-2xl">🛡️</div>
                    <div>
                      <div className="text-xs font-bold uppercase text-muted-foreground">Level</div>
                      <div className="font-display text-2xl font-bold">4</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DuoCard>

          {/* Tasks + Activity */}
          <div className="grid gap-5 lg:grid-cols-2">
            <DuoCard accent="orange">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-[var(--duo-orange)]">Today's Quests</h2>
                <Chip color="orange">{tasks.filter((t) => t.status !== "submitted").length} left</Chip>
              </div>
              <ul className="space-y-3">
                {tasks.slice(0, 4).map((t) => {
                  const done = t.status === "submitted";
                  return (
                    <li key={t.id} className="flex items-center gap-3 rounded-xl border-2 border-border p-3">
                      <div className="grid size-11 place-items-center rounded-xl bg-muted text-xl">{t.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className={`truncate font-bold ${done ? "line-through opacity-60" : ""}`}>{t.title}</div>
                        <div className="text-xs text-muted-foreground">{t.subject} • Due {t.due} • +{t.points} pts</div>
                      </div>
                      {done ? (
                        <Chip color="green">✓ Done</Chip>
                      ) : (
                        <DuoButton size="sm" variant="green" onClick={() => submitTask(t.id)}>
                          Submit
                        </DuoButton>
                      )}
                    </li>
                  );
                })}
              </ul>
            </DuoCard>

            <DuoCard accent="red">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-[var(--duo-red)]">Recent Activity</h2>
                <button className="text-xs font-bold text-[var(--duo-red)] hover:underline">View all →</button>
              </div>
              <ul className="space-y-3">
                {activity.slice(0, 5).map((a) => (
                  <li key={a.id} className="flex items-start gap-3">
                    <div className="grid size-9 shrink-0 place-items-center rounded-full bg-muted text-base">{a.icon}</div>
                    <div className="flex-1">
                      <div className="text-sm">{a.text}</div>
                      <div className="text-xs text-muted-foreground">{a.time}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </DuoCard>
          </div>

          {/* Badges + Rewards */}
          <div className="grid gap-5 lg:grid-cols-3">
            <DuoCard accent="purple" className="lg:col-span-2">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-[var(--duo-purple)]">My Badges</h2>
                <Chip color="purple">{BADGES.filter((b) => b.earned).length}/{BADGES.length}</Chip>
              </div>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                {BADGES.map((b) => (
                  <div key={b.id} className={`flex flex-col items-center gap-1 rounded-xl border-2 border-border p-3 text-center transition ${b.earned ? "bg-card" : "bg-muted opacity-60 grayscale"}`}>
                    <div className="text-3xl">{b.icon}</div>
                    <div className="text-[11px] font-bold leading-tight">{b.name}</div>
                  </div>
                ))}
              </div>
            </DuoCard>

            <DuoCard accent="yellow">
              <h2 className="mb-3 font-display text-lg font-bold text-[oklch(0.5_0.16_80)]">My Rewards</h2>
              <div className="flex items-center justify-between rounded-xl bg-[oklch(0.96_0.08_90)] p-3">
                <div className="flex items-center gap-2">
                  <div className="grid size-10 place-items-center rounded-full bg-[var(--duo-yellow)] text-lg">🪙</div>
                  <div>
                    <div className="font-display text-xl font-bold">{coins}</div>
                    <div className="text-xs font-bold text-muted-foreground">Dojo Coins</div>
                  </div>
                </div>
                <DuoButton size="sm" variant="yellow" onClick={() => alert("Reward shop coming soon!")}>
                  <ShoppingBag className="size-4" /> Shop
                </DuoButton>
              </div>
              <div className="mt-3 rounded-xl border-2 border-border p-3">
                <div className="mb-2 flex items-center gap-2 text-sm font-bold">
                  <Trophy className="size-4 text-[var(--duo-yellow)]" />
                  Class Rank #3
                </div>
                <div className="text-xs text-muted-foreground">Earn 40 more pts to reach #2!</div>
              </div>
            </DuoCard>
          </div>

          {/* Daily goal */}
          <DuoCard accent="blue" className="bg-gradient-to-r from-[oklch(0.97_0.05_240)] to-[oklch(0.95_0.07_295)]">
            <div className="flex flex-wrap items-center gap-4">
              <div className="grid size-14 place-items-center rounded-2xl bg-[oklch(0.93_0.08_240)] text-3xl">🎯</div>
              <div className="flex-1 min-w-[200px]">
                <div className="font-display text-lg font-bold text-[var(--duo-blue)]">Daily Goal</div>
                <div className="text-xs text-muted-foreground">Complete your quests and earn points!</div>
                <div className="mt-2"><DuoProgress value={(completedToday / dailyGoal) * 100} color="blue" /></div>
              </div>
              <div className="text-right">
                <div className="font-display text-2xl font-bold">{completedToday}/{dailyGoal}</div>
                <div className="text-xs font-bold text-muted-foreground">tasks done</div>
              </div>
              <span className="text-3xl">{completedToday >= dailyGoal ? "🌟" : "💪"}</span>
            </div>
          </DuoCard>

          <div className="flex justify-center">
            <Link to="/" className="text-xs font-bold text-muted-foreground hover:underline">← Switch role</Link>
          </div>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-5 border-t-2 border-border bg-card md:hidden">
        {[
          { icon: Home, label: "Home", active: true },
          { icon: ClipboardList, label: "Tasks" },
          { icon: Target, label: "Goals" },
          { icon: MessageCircle, label: "Chat" },
          { icon: Star, label: "Me" },
        ].map((n, i) => (
          <button key={i} className={`flex flex-col items-center gap-0.5 py-2.5 text-xs font-bold ${n.active ? "text-[var(--duo-green-dark)]" : "text-muted-foreground"}`}>
            <n.icon className="size-5" />
            {n.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
