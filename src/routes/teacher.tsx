import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DuoButton, DuoCard, Chip } from "@/components/duo";
import { CLASSES, SCHEDULE, STUDENTS_IN_CLASS, MESSAGES_PARENTS, UPCOMING } from "@/lib/mockData";
import {
  Home,
  BookOpen,
  ClipboardList,
  Users as UsersIcon,
  GraduationCap,
  Calendar,
  CheckSquare,
  MessageCircle,
  Image as ImageIcon,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  Bell,
  FileText,
  HelpCircle,
  MessageSquare,
  Megaphone,
  Camera,
  Send,
  AlertTriangle,
} from "lucide-react";

export const Route = createFileRoute("/teacher")({
  head: () => ({
    meta: [
      { title: "Teacher Dashboard — SkoolDojo" },
      {
        name: "description",
        content:
          "Manage classes, post assignments, take attendance and chat with parents — all in one place.",
      },
    ],
  }),
  component: TeacherDashboard,
});

const NAV = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: BookOpen, label: "Classes" },
  { icon: ClipboardList, label: "Classwork" },
  { icon: UsersIcon, label: "People" },
  { icon: GraduationCap, label: "Grades" },
  { icon: Calendar, label: "Calendar" },
  { icon: CheckSquare, label: "Attendance" },
  { icon: MessageCircle, label: "Communication", badge: "New" },
  { icon: ImageIcon, label: "Media" },
  { icon: BarChart3, label: "Reports" },
  { icon: Settings, label: "Settings" },
];

const QUICK = [
  { label: "Assignment", icon: FileText, color: "purple" as const },
  { label: "Quiz", icon: HelpCircle, color: "green" as const },
  { label: "Question", icon: MessageSquare, color: "orange" as const },
  { label: "Material", icon: BookOpen, color: "blue" as const },
  { label: "Poll", icon: BarChart3, color: "purple" as const },
  { label: "Announcement", icon: Megaphone, color: "red" as const },
];

const behaviorEmoji: Record<string, string> = { high: "😊", medium: "😐", low: "🙁" };
const behaviorColor: Record<string, "green" | "yellow" | "red"> = {
  high: "green",
  medium: "yellow",
  low: "red",
};

const SCHEDULE_ICONS: Record<string, string> = {
  Science: "🧪",
  Mathematics: "🔢",
  English: "📖",
  "Lunch Break": "🍽️",
  "Art & Craft": "🎨",
};

type MobileNavItem = {
  icon: typeof Home;
  label: string;
  id: string;
  active?: boolean;
  center?: boolean;
};

const MOBILE_NAV: MobileNavItem[] = [
  { icon: Home, label: "Home", active: true, id: "home" },
  { icon: BookOpen, label: "Classes", id: "classes" },
  { icon: Plus, label: "", id: "create", center: true },
  { icon: MessageCircle, label: "Chat", id: "chat" },
  { icon: Settings, label: "Me", id: "me" },
];

type AnnouncementPost = { id: string; text: string };
type ChatMessage = { id: string; from: string; text: string };

function TeacherDashboard() {
  const [activeClass, setActiveClass] = useState(CLASSES[0].id);
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [announcementOpen, setAnnouncementOpen] = useState(false);
  const [announcementText, setAnnouncementText] = useState("");
  const [posts, setPosts] = useState<AnnouncementPost[]>([]);
  const [chatOpen, setChatOpen] = useState<string | null>(null);
  const [chats, setChats] = useState<Record<string, ChatMessage[]>>({});
  const [chatDraft, setChatDraft] = useState("");
  const [reportConcernOpen, setReportConcernOpen] = useState(false);
  const [concernStudentId, setConcernStudentId] = useState(STUDENTS_IN_CLASS[0].id);
  const [concernUrgency, setConcernUrgency] = useState("Normal");
  const [concernDesc, setConcernDesc] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("teacher_state");
    if (saved) {
      try {
        const s = JSON.parse(saved);
        if (s.attendance) setAttendance(s.attendance);
        if (s.posts) {
          setPosts(
            s.posts.map((p: string | AnnouncementPost) =>
              typeof p === "string" ? { id: crypto.randomUUID(), text: p } : p,
            ),
          );
        }
        if (s.chats) {
          const migrated: Record<string, ChatMessage[]> = {};
          for (const [threadId, msgs] of Object.entries(s.chats as Record<string, unknown[]>)) {
            migrated[threadId] = (msgs ?? []).map((msg) => {
              const m = msg as ChatMessage | { from: string; text: string };
              return "id" in m && m.id ? m : { ...m, id: crypto.randomUUID() };
            });
          }
          setChats(migrated);
        }
      } catch {}
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("teacher_state", JSON.stringify({ attendance, posts, chats }));
  }, [attendance, posts, chats]);

  const togglePresent = (id: string) => setAttendance((a) => ({ ...a, [id]: !a[id] }));
  const presentCount = Object.values(attendance).filter(Boolean).length;

  const submitAnnouncement = () => {
    if (!announcementText.trim()) return;
    setPosts((p) => [{ id: crypto.randomUUID(), text: announcementText }, ...p]);
    setAnnouncementText("");
    setAnnouncementOpen(false);
  };

  const sendChat = () => {
    if (!chatOpen || !chatDraft.trim()) return;
    setChats((c) => ({
      ...c,
      [chatOpen]: [...(c[chatOpen] ?? []), { id: crypto.randomUUID(), from: "Teacher", text: chatDraft }],
    }));
    setChatDraft("");
    setTimeout(() => {
      setChats((c) => ({
        ...c,
        [chatOpen]: [...(c[chatOpen] ?? []), { id: crypto.randomUUID(), from: "Parent", text: "Got it, thank you! 🙏" }],
      }));
    }, 800);
  };

  const handleSendTeacherConcern = (e: React.FormEvent) => {
    e.preventDefault();
    if (!concernDesc.trim()) return;

    const studentObj = STUDENTS_IN_CLASS.find((s) => s.id === concernStudentId);
    if (!studentObj) return;

    const saved = localStorage.getItem("counsellor_state");
    let cState: any = {};
    if (saved) {
      try {
        cState = JSON.parse(saved);
      } catch (err) {
        console.error(err);
      }
    }
    const currentReports = cState.reports || [];

    const newReport = {
      id: `rep-${Math.floor(200 + Math.random() * 800)}`,
      reporterName: "Cikgu Nadia",
      reporterRole: "Teacher",
      studentId: concernStudentId,
      studentName: studentObj.name,
      date: new Date().toISOString().split("T")[0],
      description: concernDesc,
      urgency: concernUrgency,
      status: "New",
    };

    cState.reports = [newReport, ...currentReports];
    localStorage.setItem("counsellor_state", JSON.stringify(cState));
    alert(`Wellbeing concern for ${studentObj.name} submitted to counselor.`);
    setConcernDesc("");
    setConcernUrgency("Normal");
    setReportConcernOpen(false);
  };

  return (
    <div className="min-h-screen pb-24 md:pb-10">
      <header className="sticky top-0 z-20 border-b-2 border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          <Link to="/" className="flex items-center gap-2 font-display text-2xl font-bold">
            <span className="text-3xl">🧑‍🏫</span>
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
            <div className="hidden items-center gap-2 rounded-full border-2 border-border bg-card px-3 py-1.5 text-sm font-bold sm:flex">
              <span className="grid size-7 place-items-center rounded-full bg-[oklch(0.95_0.07_295)]">
                👩‍🏫
              </span>
              Cikgu Nadia
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:grid-cols-[240px_1fr] md:px-8">
        <aside className="hidden md:block">
          <DuoCard className="sticky top-24 p-4">
            <div className="mb-3 px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Teacher
            </div>
            <nav className="space-y-1">
              {NAV.map((n) => (
                <button
                  key={n.label}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold transition ${
                    n.active
                      ? "bg-[oklch(0.95_0.08_240)] text-duo-blue"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <n.icon className="size-4" />
                  <span className="flex-1 text-left">{n.label}</span>
                  {n.badge && (
                    <span className="rounded-full bg-duo-green px-1.5 py-0.5 text-[9px] text-white">
                      {n.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
            <div className="my-3 border-t border-border" />
            <div className="mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              My Classes
            </div>
            <div className="space-y-1">
              {CLASSES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveClass(c.id)}
                  className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition ${
                    activeClass === c.id
                      ? "bg-[oklch(0.95_0.07_295)] text-duo-purple"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <span className="grid size-7 place-items-center rounded-lg bg-[oklch(0.92_0.1_295)] text-[10px] font-bold text-duo-purple">
                    {c.id.toUpperCase()}
                  </span>
                  {c.name}
                </button>
              ))}
              <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-muted-foreground hover:bg-muted">
                <Plus className="size-4" /> View all classes
              </button>
            </div>
            <div className="mt-4 rounded-xl bg-[oklch(0.95_0.07_295)] p-3 text-xs">
              <div className="flex items-center gap-2 font-bold text-duo-purple">
                <HelpCircle className="size-4" /> Help & Support
              </div>
            </div>
            <Link
              to="/"
              className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold text-muted-foreground hover:bg-muted"
            >
              <LogOut className="size-4" /> Logout
            </Link>
          </DuoCard>
        </aside>

        <main className="space-y-5">
          <div>
            <h1 className="font-display text-3xl font-bold">Good morning, Cikgu Nadia! 👋</h1>
            <p className="text-sm text-muted-foreground">
              Here's what's happening in your classes today.
            </p>
          </div>

          {/* Schedule */}
          <DuoCard>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                <Calendar className="size-5 text-duo-blue" /> Today's Schedule
              </h2>
              <button className="text-xs font-bold text-duo-blue hover:underline">
                View full calendar →
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {SCHEDULE.map((s) => {
                const isCurrent = s.time === SCHEDULE[0].time && s.subject === SCHEDULE[0].subject;
                return (
                <div
                  key={`${s.time}-${s.subject}`}
                  className={`min-w-[200px] shrink-0 rounded-2xl border-2 p-3 ${isCurrent ? "border-duo-purple bg-[oklch(0.97_0.05_295)]" : "border-border bg-card"}`}
                >
                  <div className="mb-2 text-[11px] font-bold uppercase text-muted-foreground">
                    {s.time}
                  </div>
                  <div className="mb-1 flex items-center gap-2">
                    <span
                      className="grid size-8 place-items-center rounded-lg text-base"
                      style={{ background: `var(--${s.color})`, color: "white" }}
                    >
                      {SCHEDULE_ICONS[s.subject] ?? "📚"}
                    </span>
                    <span className="font-bold">{s.subject}</span>
                  </div>
                  {s.topic && <div className="text-xs text-muted-foreground">{s.topic}</div>}
                  <div className="mt-2 text-[11px] font-bold text-muted-foreground">
                    📍 {s.room}
                  </div>
                </div>
                );
              })}
            </div>
          </DuoCard>

          {/* Quick create */}
          <DuoCard>
            <h2 className="mb-3 font-display text-lg font-bold">Create or Share Something</h2>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {QUICK.map((q) => (
                <button
                  key={q.label}
                  onClick={() =>
                    q.label === "Announcement"
                      ? setAnnouncementOpen(true)
                      : alert(`${q.label} composer coming soon!`)
                  }
                  className="flex flex-col items-center gap-1.5 rounded-xl border-2 border-border p-3 text-xs font-bold transition hover:-translate-y-0.5 hover:border-duo-purple"
                >
                  <q.icon className="size-5" style={{ color: `var(--${q.color})` }} />
                  {q.label}
                </button>
              ))}
            </div>
            {announcementOpen && (
              <div className="mt-4 rounded-2xl border-2 border-duo-red bg-[oklch(0.97_0.04_25)] p-3 animate-pop-in">
                <textarea
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  placeholder="Type your announcement to parents…"
                  className="w-full resize-none rounded-xl border-2 border-border bg-card p-2 text-sm focus:outline-none focus:ring-2 focus:ring-duo-red"
                  rows={3}
                />
                <div className="mt-2 flex justify-end gap-2">
                  <DuoButton variant="white" size="sm" onClick={() => setAnnouncementOpen(false)}>
                    Cancel
                  </DuoButton>
                  <DuoButton variant="red" size="sm" onClick={submitAnnouncement}>
                    Post
                  </DuoButton>
                </div>
              </div>
            )}
            {posts.length > 0 && (
              <div className="mt-3 space-y-2">
                <div className="text-xs font-bold text-muted-foreground">Recent posts</div>
                {posts.map((p) => (
                  <div key={p.id} className="rounded-xl border-2 border-border bg-card p-3 text-sm">
                    <div className="mb-1 flex items-center gap-2 text-xs font-bold text-duo-red">
                      <Megaphone className="size-3" /> Announcement
                    </div>
                    {p.text}
                  </div>
                ))}
              </div>
            )}
          </DuoCard>

          {/* Class overview + Quick actions */}
          <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
            <DuoCard>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-display text-lg font-bold">Class Overview</h2>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                {[
                  { v: 3, l: "Classes", c: "purple" },
                  { v: 72, l: "Students", c: "blue" },
                  { v: "92%", l: "Avg Attendance", c: "green" },
                  { v: 8, l: "New Submissions", c: "orange" },
                  { v: 5, l: "Pending Review", c: "red" },
                ].map((s) => (
                  <div key={s.l} className="rounded-2xl border-2 border-border p-3 text-center">
                    <div
                      className="font-numeric text-2xl font-bold"
                      style={{ color: `var(--duo-${s.c})` }}
                    >
                      {s.v}
                    </div>
                    <div className="text-[11px] font-bold text-muted-foreground">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                {CLASSES.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center gap-3 rounded-xl border-2 border-border p-3"
                  >
                    <span className="grid size-9 place-items-center rounded-lg bg-[oklch(0.92_0.1_295)] text-xs font-bold text-duo-purple">
                      {c.id.toUpperCase()}
                    </span>
                    <div className="flex-1">
                      <div className="font-bold">{c.name}</div>
                      <div className="text-xs text-muted-foreground">{c.students} students</div>
                    </div>
                    <div className="text-right">
                      <div className="font-numeric text-lg font-bold text-duo-green">
                        {c.attendance}%
                      </div>
                      <div className="text-[10px] font-bold text-muted-foreground">Attendance</div>
                    </div>
                  </div>
                ))}
              </div>
            </DuoCard>

            <DuoCard accent="green">
              <h2 className="mb-3 font-display text-lg font-bold text-duo-green-dark">
                Quick Actions
              </h2>
              <ul className="space-y-2">
                {[
                  {
                    icon: CheckSquare,
                    label: "Mark Attendance",
                    sub: "Take attendance for your classes",
                    c: "green",
                    onClick: () => alert("Attendance is marked in the list below!"),
                  },
                  {
                    icon: BookOpen,
                    label: "Post Materials",
                    sub: "Share files, links and resources",
                    c: "blue",
                    onClick: () => alert("Materials composer coming soon!"),
                  },
                  {
                    icon: Camera,
                    label: "Upload Photos / Videos",
                    sub: "Share classroom moments",
                    c: "purple",
                    onClick: () => alert("Upload composer coming soon!"),
                  },
                  {
                    icon: Megaphone,
                    label: "Send Announcement",
                    sub: "Send updates to classes",
                    c: "orange",
                    onClick: () => setAnnouncementOpen(true),
                  },
                  {
                    icon: AlertTriangle,
                    label: "Report Student Concern",
                    sub: "Submit wellbeing concern to Counselor",
                    c: "red",
                    onClick: () => setReportConcernOpen(true),
                  },
                  {
                    icon: MessageCircle,
                    label: "Chat with Parents",
                    sub: "Message parents directly",
                    c: "green",
                    onClick: () => alert("Select a parent chat from the list below!"),
                  },
                ].map((q) => (
                  <li key={q.label}>
                    <button
                      onClick={q.onClick}
                      className="flex w-full items-center gap-3 rounded-xl border-2 border-border bg-card p-2.5 text-left transition hover:-translate-y-0.5"
                    >
                      <span
                        className="grid size-9 place-items-center rounded-lg"
                        style={{ background: `var(--duo-${q.c})`, color: "white" }}
                      >
                        <q.icon className="size-4" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold">{q.label}</div>
                        <div className="truncate text-[11px] text-muted-foreground">{q.sub}</div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </DuoCard>
          </div>

          {/* Attendance + Status */}
          <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
            <DuoCard>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-display text-lg font-bold">Class Status — Primary 5A</h2>
                <Chip color="green">
                  {presentCount}/{STUDENTS_IN_CLASS.length} present
                </Chip>
              </div>
              <div className="overflow-hidden rounded-xl border-2 border-border">
                <table className="w-full text-sm">
                  <thead className="bg-muted text-[11px] uppercase text-muted-foreground">
                    <tr>
                      <th className="px-3 py-2 text-left">Student</th>
                      <th className="px-2 py-2 text-center">Present</th>
                      <th className="px-2 py-2 text-center">Grade</th>
                      <th className="px-2 py-2 text-center">Behavior</th>
                      <th className="px-2 py-2 text-center hidden sm:table-cell">Overall</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STUDENTS_IN_CLASS.map((s) => (
                      <tr key={s.id} className="border-t border-border">
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{s.avatar}</span>
                            <span className="font-bold">{s.name}</span>
                          </div>
                        </td>
                        <td className="px-2 py-2 text-center">
                          <button
                            onClick={() => togglePresent(s.id)}
                            className={`grid size-7 place-items-center rounded-md border-2 transition ${
                              attendance[s.id]
                                ? "border-duo-green bg-duo-green text-white"
                                : "border-border bg-card"
                            }`}
                          >
                            {attendance[s.id] ? "✓" : ""}
                          </button>
                        </td>
                        <td className="px-2 py-2 text-center font-bold">{s.grade}</td>
                        <td className="px-2 py-2 text-center text-lg">
                          {behaviorEmoji[s.behavior]}
                        </td>
                        <td className="px-2 py-2 text-center hidden sm:table-cell">
                          <Chip color={behaviorColor[s.behavior]}>{s.overall}</Chip>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </DuoCard>

            <DuoCard accent="green">
              <h2 className="mb-3 font-display text-lg font-bold text-duo-green-dark">
                Chat with Parents
              </h2>
              <ul className="space-y-2">
                {MESSAGES_PARENTS.map((m) => (
                  <li key={m.id}>
                    <button
                      onClick={() => setChatOpen(chatOpen === m.id ? null : m.id)}
                      className={`flex w-full items-center gap-3 rounded-xl border-2 p-2.5 text-left transition ${
                        chatOpen === m.id
                          ? "border-duo-green bg-[oklch(0.97_0.06_145)]"
                          : "border-border bg-card hover:bg-muted"
                      }`}
                    >
                      <span className="grid size-9 place-items-center rounded-full bg-muted text-lg">
                        {m.avatar}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="truncate text-sm font-bold">{m.from}</span>
                          <span className="text-[10px] text-muted-foreground">{m.time}</span>
                        </div>
                        <div className="truncate text-xs text-muted-foreground">{m.preview}</div>
                      </div>
                      {m.unread > 0 && (
                        <span className="grid size-5 place-items-center rounded-full bg-duo-green text-[10px] font-bold text-white">
                          {m.unread}
                        </span>
                      )}
                    </button>
                    {chatOpen === m.id && (
                      <div className="mt-2 space-y-2 rounded-xl bg-muted/50 p-3 animate-pop-in">
                        <div className="max-h-40 space-y-1.5 overflow-y-auto">
                          <div className="text-xs">
                            <span className="font-bold">{m.from}:</span> {m.preview}
                          </div>
                          {(chats[m.id] ?? []).map((c) => (
                            <div
                              key={c.id}
                              className={`flex ${c.from === "Teacher" ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-[80%] rounded-xl px-2.5 py-1.5 text-xs ${c.from === "Teacher" ? "bg-duo-green text-white" : "bg-card border-2 border-border"}`}
                              >
                                {c.text}
                              </div>
                            </div>
                          ))}
                        </div>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            sendChat();
                          }}
                          className="flex gap-1"
                        >
                          <input
                            value={chatDraft}
                            onChange={(e) => setChatDraft(e.target.value)}
                            placeholder="Reply…"
                            className="flex-1 rounded-lg border-2 border-border bg-card px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-duo-green"
                          />
                          <DuoButton size="sm" variant="green" type="submit">
                            <Send className="size-3" />
                          </DuoButton>
                        </form>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </DuoCard>
          </div>

          {/* Upcoming */}
          <DuoCard accent="yellow">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-[oklch(0.5_0.16_80)]">Upcoming</h2>
              <button className="text-xs font-bold hover:underline">View all →</button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {UPCOMING.map((u) => (
                <div
                  key={u.id}
                  className="flex items-center gap-3 rounded-xl border-2 border-border p-3"
                >
                  <div
                    className="grid size-10 place-items-center rounded-xl text-lg"
                    style={{ background: `var(--${u.color})`, color: "white" }}
                  >
                    {u.icon}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{u.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {u.date} • {u.day}
                    </div>
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

      {/* Report Student Concern Modal */}
      {reportConcernOpen && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 overflow-y-auto bg-black/40 backdrop-blur-xs">
          <div className="bg-card w-full max-w-md rounded-2xl border-2 border-border p-5 shadow-2xl animate-pop-in my-auto">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <h2 className="font-display text-lg font-bold flex items-center gap-1.5 text-duo-red">
                <AlertTriangle className="size-5" /> Report Student Concern
              </h2>
              <button onClick={() => setReportConcernOpen(false)} className="text-muted-foreground hover:text-foreground text-sm font-bold">✕</button>
            </div>
            
            <form onSubmit={handleSendTeacherConcern} className="mt-4 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">
                  Reporter
                </label>
                <input
                  type="text"
                  disabled
                  value="Cikgu Nadia (Teacher)"
                  className="w-full rounded-xl border-2 border-border bg-muted/40 px-3 py-2 text-xs font-bold text-muted-foreground cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">
                  Concern Student
                </label>
                <select
                  value={concernStudentId}
                  onChange={(e) => setConcernStudentId(e.target.value)}
                  className="w-full rounded-xl border-2 border-border bg-card px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-duo-red"
                >
                  {STUDENTS_IN_CLASS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.avatar} {s.name} ({s.grade})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">
                  Urgency
                </label>
                <select
                  value={concernUrgency}
                  onChange={(e) => setConcernUrgency(e.target.value)}
                  className="w-full rounded-xl border-2 border-border bg-card px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-duo-red"
                >
                  <option value="Normal">Normal Urgency</option>
                  <option value="High">High Urgency</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">
                  Report Narrative Description
                </label>
                <textarea
                  required
                  value={concernDesc}
                  onChange={(e) => setConcernDesc(e.target.value)}
                  placeholder="State specific behaviors observed, indicators of distress, withdrawal trends, outbursts..."
                  rows={4}
                  className="w-full resize-none rounded-xl border-2 border-border bg-card p-2 text-xs focus:outline-none focus:ring-2 focus:ring-duo-red"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-border">
                <DuoButton
                  type="button"
                  variant="white"
                  size="sm"
                  onClick={() => setReportConcernOpen(false)}
                >
                  Cancel
                </DuoButton>
                <DuoButton type="submit" variant="red" size="sm">
                  Log Report
                </DuoButton>
              </div>
            </form>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-5 border-t-2 border-border bg-card md:hidden">
        {MOBILE_NAV.map((n) => (
          <button
            key={n.id}
            className={`flex flex-col items-center gap-0.5 py-2.5 text-xs font-bold ${
              n.center ? "-mt-4" : n.active ? "text-duo-blue" : "text-muted-foreground"
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
