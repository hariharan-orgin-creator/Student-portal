import { DuoCard, DuoProgress } from "@/components/duo";
import { EXAM_RESULTS_REPORT } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  Flame,
  Lightbulb,
  Sparkles,
  Target,
  TrendingUp,
  ClipboardList,
  MessageSquareQuote,
} from "lucide-react";

const accentStyles = {
  blue: {
    card: "border-l-4 border-l-[var(--duo-blue)] bg-[oklch(0.98_0.04_240)]",
    score: "text-[var(--duo-blue)]",
    bar: "blue" as const,
  },
  green: {
    card: "border-l-4 border-l-[var(--duo-green)] bg-[oklch(0.98_0.04_145)]",
    score: "text-[var(--duo-green-dark)]",
    bar: "green" as const,
  },
  purple: {
    card: "border-l-4 border-l-[var(--duo-purple)] bg-[oklch(0.98_0.04_295)]",
    score: "text-[var(--duo-purple)]",
    bar: "purple" as const,
  },
  orange: {
    card: "border-l-4 border-l-[var(--duo-orange)] bg-[oklch(0.99_0.04_50)]",
    score: "text-[var(--duo-orange)]",
    bar: "orange" as const,
  },
};

function SummaryStat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl bg-card/80 px-3 py-2.5",
        highlight && "ring-2 ring-[var(--duo-green)]/30",
      )}
    >
      <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-0.5 font-display text-sm font-bold">{value}</p>
    </div>
  );
}

function SubjectPerformanceCard({
  subject,
}: {
  subject: (typeof EXAM_RESULTS_REPORT.subjects)[0];
}) {
  const style = accentStyles[subject.accent];
  const delta = subject.score - subject.previousScore;

  return (
    <DuoCard className={cn("p-4", style.card)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{subject.icon}</span>
          <div>
            <h3 className="font-display text-sm font-bold tracking-wide">{subject.subject}</h3>
            <p className={cn("font-numeric text-3xl font-extrabold", style.score)}>
              {subject.score}%
            </p>
          </div>
        </div>
        {delta > 0 && (
          <span className="flex items-center gap-0.5 rounded-full bg-[oklch(0.95_0.08_145)] px-2 py-1 text-[10px] font-bold text-[var(--duo-green-dark)]">
            <ArrowUpRight className="size-3" />+{delta}%
          </span>
        )}
      </div>

      <div className="mt-3">
        <DuoProgress value={subject.score} color={style.bar} />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <p className="mb-1.5 text-[10px] font-bold uppercase text-[var(--duo-green-dark)]">
            Strengths
          </p>
          <ul className="space-y-1">
            {subject.strengths.map((s) => (
              <li key={s} className="flex items-center gap-1.5 text-xs font-bold">
                <span className="text-[var(--duo-green)]">✓</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-1.5 text-[10px] font-bold uppercase text-[var(--duo-orange)]">
            Needs Practice
          </p>
          <ul className="space-y-1">
            {subject.needsPractice.map((s) => (
              <li key={s} className="flex items-center gap-1.5 text-xs font-bold">
                <span className="text-[var(--duo-orange)]">⚠</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-3 flex items-start gap-2 rounded-lg bg-card/90 p-2.5">
        <Lightbulb className="mt-0.5 size-4 shrink-0 text-[var(--duo-yellow)]" />
        <p className="text-xs leading-relaxed text-muted-foreground">{subject.mentorNote}</p>
      </div>

      <p className="mt-2 text-[10px] font-bold text-muted-foreground">
        Compared to last exam:{" "}
        {delta > 0 ? (
          <span className="text-[var(--duo-green-dark)]">↑ Improved by {delta}%</span>
        ) : delta === 0 ? (
          <span>No change</span>
        ) : (
          <span className="text-[var(--duo-red)]">↓ Decreased by {Math.abs(delta)}%</span>
        )}
      </p>
    </DuoCard>
  );
}

export function ExamResultsPage() {
  const r = EXAM_RESULTS_REPORT;

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-8">
      {/* TOP — Emotional + academic summary */}
      <section>
        <DuoCard className="overflow-hidden bg-gradient-to-br from-[oklch(0.97_0.06_145)] via-card to-[oklch(0.98_0.04_90)] p-5">
          <div className="flex items-start gap-3">
            <span className="text-4xl">{r.headlineEmoji}</span>
            <div className="min-w-0 flex-1">
              <h1 className="font-display text-2xl font-bold md:text-3xl">
                {r.headline} {r.headlineEmoji}
              </h1>
              <p className="mt-0.5 text-xs font-bold text-muted-foreground">Mid-year exam report</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {r.encouragement}
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <SummaryStat label="Strongest Subject" value={r.strongestSubject} highlight />
            <SummaryStat label="Needs More Practice" value={r.needsPracticeSubject} />
            <SummaryStat label="Improved Since Last Exam" value={`+${r.improvementSinceLast}%`} />
            <SummaryStat label="Class Standing" value={r.classStanding} />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl bg-card/60 px-3 py-2">
            <span className="flex items-center gap-1 text-xs font-bold text-[var(--duo-green-dark)]">
              <TrendingUp className="size-4" />
              {r.consistencyLabel}
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-muted-foreground">
              <Flame className="size-4 text-[var(--duo-orange)]" />
              {r.studyStreakWeeks}-week study streak
            </span>
          </div>
        </DuoCard>
      </section>

      {/* SECOND — Subject performance cards */}
      <section>
        <h2 className="mb-3 flex items-center gap-2 font-display text-sm font-bold text-muted-foreground">
          <BookOpen className="size-4" />
          Subject performance
        </h2>
        <div className="space-y-4">
          {r.subjects.map((s) => (
            <SubjectPerformanceCard key={s.id} subject={s} />
          ))}
        </div>
      </section>

      {/* THIRD — Action recommendations */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 font-display text-sm font-bold text-muted-foreground">
          <Target className="size-4" />
          What to do next
        </h2>

        <DuoCard className="p-4">
          <h3 className="mb-2 font-display text-sm font-bold">Recommended next steps</h3>
          <ol className="space-y-2">
            {r.nextSteps.map((step, i) => (
              <li key={step} className="flex gap-2 text-sm">
                <span className="font-numeric flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--duo-green)] text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className="font-bold pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </DuoCard>

        <DuoCard className="border-l-4 border-l-[var(--duo-blue)] bg-[oklch(0.98_0.04_240)] p-4">
          <h3 className="mb-2 flex items-center gap-2 font-display text-sm font-bold text-[var(--duo-blue)]">
            <ClipboardList className="size-4" />
            Recovery plan — {r.recoveryPlan.subject}
          </h3>
          <ul className="space-y-1.5">
            {r.recoveryPlan.items.map((item) => (
              <li key={item} className="flex items-center gap-2 text-xs font-bold">
                <span className="size-1.5 rounded-full bg-[var(--duo-blue)]" />
                {item}
              </li>
            ))}
          </ul>
        </DuoCard>

        <DuoCard className="p-4">
          <h3 className="mb-2 flex items-center gap-2 font-display text-sm font-bold text-[var(--duo-purple)]">
            <MessageSquareQuote className="size-4" />
            Teacher notes
          </h3>
          <ul className="space-y-2">
            {r.teacherNotes.map((note) => (
              <li key={note} className="rounded-lg bg-muted/40 px-3 py-2 text-sm font-medium">
                {note}
              </li>
            ))}
          </ul>
        </DuoCard>
      </section>

      {/* FOURTH — Growth & readiness (growth over rank) */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 font-display text-sm font-bold text-muted-foreground">
          <Sparkles className="size-4" />
          Your growth journey
        </h2>

        <DuoCard className="bg-gradient-to-r from-[oklch(0.96_0.08_145)] to-card p-4">
          <p className="text-sm font-bold leading-snug">
            You improved faster than{" "}
            <span className="font-numeric text-lg text-[var(--duo-green-dark)]">
              {r.growthVsPeers}%
            </span>{" "}
            of students this term.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Focus on your progress, not just position.
          </p>
        </DuoCard>

        <div className="grid gap-4 sm:grid-cols-2">
          <DuoCard className="p-4">
            <h3 className="mb-2 font-display text-sm font-bold text-[var(--duo-green-dark)]">
              Your strengths
            </h3>
            <ul className="space-y-1.5">
              {r.strengthsOverall.map((s) => (
                <li key={s} className="text-xs font-bold">
                  • {s}
                </li>
              ))}
            </ul>
          </DuoCard>

          <DuoCard className="border-l-4 border-l-[var(--duo-orange)] bg-[oklch(0.99_0.04_50)] p-4">
            <h3 className="mb-2 font-display text-sm font-bold text-[var(--duo-orange)]">
              Needs practice
            </h3>
            <ul className="space-y-1.5">
              {r.weaknessRadar.map((w) => (
                <li key={w} className="text-xs font-bold">
                  • {w}
                </li>
              ))}
            </ul>
          </DuoCard>
        </div>

        <DuoCard className="p-4">
          <h3 className="font-display text-sm font-bold">Future readiness</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Current exam readiness for final boards
          </p>
          <p className="font-numeric mt-2 text-4xl font-extrabold text-[var(--duo-purple)]">
            {r.finalBoardReadiness}%
          </p>
          <DuoProgress value={r.finalBoardReadiness} color="purple" label="Board readiness" />
          <p className="mt-3 text-sm">
            <span className="text-muted-foreground">{r.predictedNote}: </span>
            <span className="font-bold">Predicted grade {r.predictedGrade}</span>
          </p>
        </DuoCard>

        <DuoCard className="p-4">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Improvement snapshot
          </h3>
          <div className="flex flex-wrap items-end justify-around gap-4">
            {r.subjects.map((s) => {
              const delta = s.score - s.previousScore;
              const absHeight = Math.max(20, Math.abs(delta) * 4);
              return (
                <div key={s.id} className="flex flex-col items-center gap-1">
                  <span className="text-lg">{s.icon}</span>
                  <div className="flex h-16 w-10 flex-col justify-end overflow-hidden rounded-md bg-muted">
                    <div
                      className={cn(
                        "w-full rounded-t-md transition-all",
                        delta < 0
                          ? "bg-[var(--duo-red)]"
                          : delta > 0
                            ? "bg-[var(--duo-green)]"
                            : "bg-muted-foreground/40",
                      )}
                      style={{ height: `${absHeight}%` }}
                    />
                  </div>
                  <span
                    className={cn(
                      "flex items-center gap-0.5 font-numeric text-[10px] font-bold",
                      delta < 0
                        ? "text-[var(--duo-red)]"
                        : delta > 0
                          ? "text-[var(--duo-green-dark)]"
                          : "text-muted-foreground",
                    )}
                  >
                    {delta > 0 ? (
                      <>
                        <ArrowUpRight className="size-3" />+{delta}%
                      </>
                    ) : delta < 0 ? (
                      <>
                        <ArrowDownRight className="size-3" />
                        {delta}%
                      </>
                    ) : (
                      "No change"
                    )}
                  </span>
                  <span className="max-w-[56px] truncate text-[9px] font-bold text-muted-foreground">
                    {s.subject.split(" ")[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </DuoCard>
      </section>
    </div>
  );
}
