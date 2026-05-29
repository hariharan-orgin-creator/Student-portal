import { Link } from "@tanstack/react-router";
import { DuoCard } from "@/components/duo";
import { NotificationsPanel } from "@/components/notifications-panel";
import {
  Home,
  FolderOpen,
  ClipboardList,
  Star,
  Users,
  Gamepad2,
  MessageCircle,
  Settings,
  LogOut,
  Flame,
  Target,
} from "lucide-react";
import type { ReactNode } from "react";

const NAV = [
  { icon: Home, label: "Home", to: "/student" as const },
  { icon: FolderOpen, label: "My Portfolio", to: "/student/portfolio" as const },
  { icon: ClipboardList, label: "Assignments", to: "/student/assignments" as const },
  { icon: Star, label: "Exam results", to: "/student/exam-results" as const },
  { icon: Users, label: "My Class", to: "/student/class" as const },
  { icon: Gamepad2, label: "Activities", to: "/student/activities" as const },
  { icon: MessageCircle, label: "Class Feed", to: "/student/class-feed" as const },
  { icon: Settings, label: "Settings", to: "/student/settings" as const },
];

type StudentShellProps = {
  children: ReactNode;
  activeNav: string;
  points?: number;
  streak?: number;
  wide?: boolean;
};

export function StudentShell({
  children,
  activeNav,
  points = 320,
  streak = 5,
  wide = false,
}: Readonly<StudentShellProps>) {
  const mobileNav = [
    { icon: Home, label: "Home", to: "/student" as const },
    { icon: ClipboardList, label: "Tasks", to: "/student/assignments" as const },
    { icon: Target, label: "Goals", to: "/student" as const },
    { icon: MessageCircle, label: "Feed", to: "/student/class-feed" as const },
    { icon: Settings, label: "Me", to: "/student/settings" as const },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-6">
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 md:px-6">
          <Link to="/" className="flex items-center gap-1.5 font-display text-lg font-bold">
            <span className="text-2xl">🦖</span>
            <span>SkoolDojo</span>
          </Link>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-1.5 rounded-full bg-[oklch(0.95_0.08_90)] px-3 py-1.5">
              <Star className="size-4 fill-duo-yellow text-duo-yellow" />
              <span className="font-numeric text-sm font-extrabold">{points}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-[oklch(0.95_0.08_25)] px-3 py-1.5">
              <Flame className="size-4 fill-duo-orange text-duo-orange" />
              <span className="font-numeric text-sm font-extrabold">{streak}</span>
              <span className="hidden text-xs font-bold text-muted-foreground sm:inline">days</span>
            </div>
            <NotificationsPanel />
          </div>
        </div>
      </header>

      <div
        className={`mx-auto grid w-full grid-cols-1 gap-4 px-4 py-4 md:grid-cols-[200px_1fr] md:px-6 md:py-5 ${wide ? "max-w-[90rem]" : "max-w-7xl"}`}
      >
        <aside className="hidden md:block">
          <DuoCard className="sticky top-18 flex flex-col p-3">
            <div className="mb-3 flex flex-col items-center text-center">
              <div className="relative">
                <div className="grid size-14 place-items-center rounded-full border-[3px] border-duo-green bg-[oklch(0.95_0.08_145)] text-2xl">
                  🦕
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 grid size-5 place-items-center rounded-full bg-duo-purple text-[9px] font-bold text-white">
                  L4
                </div>
              </div>
              <div className="mt-2 font-display text-sm font-bold">Aisyah</div>
            </div>
            <nav className="space-y-0.5">
              {NAV.map((n) => {
                const isActive = n.label === activeNav;
                return (
                  <Link
                    key={n.label}
                    to={n.to}
                    className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-bold transition ${
                      isActive
                        ? "bg-[oklch(0.95_0.08_145)] text-duo-green-dark"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <n.icon className="size-3.5" />
                    {n.label}
                  </Link>
                );
              })}
            </nav>
            <Link
              to="/"
              className="mt-auto flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-bold text-muted-foreground hover:bg-muted"
            >
              <LogOut className="size-3.5" />
              Log out
            </Link>
          </DuoCard>
        </aside>

        <main className="flex min-w-0 flex-col gap-4">{children}</main>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-5 border-t-2 border-border bg-card md:hidden">
        {mobileNav.map((n) => {
          const isActive =
            (n.label === "Home" && activeNav === "Home") ||
            (n.label === "Goals" && activeNav === "Home") ||
            (n.label === "Tasks" && activeNav === "Assignments") ||
            (n.label === "Feed" && activeNav === "Class Feed") ||
            (n.label === "Me" && activeNav === "Settings");
          return (
            <Link
              key={n.label}
              to={n.to}
              className={`flex flex-col items-center gap-0.5 py-2.5 text-xs font-bold ${
                isActive ? "text-duo-green-dark" : "text-muted-foreground"
              }`}
            >
              <n.icon className="size-5" />
              {n.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
