import { createFileRoute, Link } from "@tanstack/react-router";
import { DuoButton } from "@/components/duo";
import { GraduationCap, Users, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SkoolDojo — Connect students, parents & teachers" },
      {
        name: "description",
        content:
          "A playful, integrated school management portal inspired by ClassDojo and Duolingo. Pick your role to begin.",
      },
      { property: "og:title", content: "SkoolDojo — A joyful school portal" },
      {
        property: "og:description",
        content: "Three connected dashboards for students, parents, and teachers.",
      },
    ],
  }),
  component: Landing,
});

const roles = [
  {
    to: "/student" as const,
    title: "I'm a Student",
    desc: "Earn points, finish quests, level up!",
    icon: "🦖",
    variant: "green" as const,
    bg: "from-[oklch(0.95_0.1_145)] to-[oklch(0.88_0.12_145)]",
  },
  {
    to: "/parent" as const,
    title: "I'm a Parent",
    desc: "See how your children are doing today.",
    icon: "👨‍👩‍👧",
    variant: "purple" as const,
    bg: "from-[oklch(0.95_0.08_295)] to-[oklch(0.9_0.1_295)]",
  },
  {
    to: "/teacher" as const,
    title: "I'm a Teacher",
    desc: "Manage classes, grades, and parents.",
    icon: "🧑‍🏫",
    variant: "blue" as const,
    bg: "from-[oklch(0.95_0.08_240)] to-[oklch(0.9_0.1_240)]",
  },
  {
    to: "/counsellor" as const,
    title: "I'm a Counsellor",
    desc: "Support student well-being & case logs.",
    icon: "🧠",
    variant: "pink" as const,
    bg: "from-[oklch(0.95_0.06_350)] to-[oklch(0.9_0.08_350)]",
  },
];

function Landing() {
  return (
    <main className="min-h-screen px-6 py-10 md:py-16">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-border bg-card px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <Sparkles className="size-3.5 text-[var(--duo-yellow)]" />
            School portal, reimagined
          </div>
          <h1 className="font-display text-5xl font-bold md:text-7xl">
            Welcome to <span className="text-[var(--duo-green)]">SkoolDojo</span>{" "}
            <span className="inline-block hover-wiggle">🎒</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
            A joyful, gamified portal that connects students, parents, and teachers — all in one
            place.
          </p>
        </header>

        <section aria-label="Choose your role" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((r) => (
            <Link
              key={r.to}
              to={r.to}
              className={`card-pop group relative overflow-hidden bg-gradient-to-br ${r.bg} p-8 transition-transform hover:-translate-y-1`}
            >
              <div className="mb-4 text-6xl transition-transform group-hover:scale-110">
                {r.icon}
              </div>
              <h2 className="font-display text-2xl font-bold">{r.title}</h2>
              <p className="mt-2 text-sm text-foreground/70">{r.desc}</p>
              <div className="mt-6">
                <DuoButton variant={r.variant} size="md">
                  Continue →
                </DuoButton>
              </div>
            </Link>
          ))}
        </section>

        <section className="mt-14 grid gap-4 md:grid-cols-3">
          {[
            { icon: <GraduationCap className="size-5" />, label: "Quests, badges & streaks" },
            { icon: <Users className="size-5" />, label: "Parents stay in the loop" },
            { icon: <Sparkles className="size-5" />, label: "Teachers save hours weekly" },
          ].map((f) => (
            <div key={f.label} className="card-pop flex items-center gap-3 px-5 py-4">
              <span className="grid size-10 place-items-center rounded-xl bg-[oklch(0.95_0.08_145)] text-[var(--duo-green-dark)]">
                {f.icon}
              </span>
              <span className="text-sm font-bold">{f.label}</span>
            </div>
          ))}
        </section>

        <footer className="mt-16 text-center text-xs text-muted-foreground">
          Tap any role above — your data lives in this browser for the demo.
        </footer>
      </div>
    </main>
  );
}
