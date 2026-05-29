import { useEffect, useMemo, useState } from "react";
import { DuoButton, DuoCard, DuoProgress, Chip } from "@/components/duo";
import { Checkbox } from "@/components/ui/checkbox";
import {
  TODAYS_CLASSES,
  ASSIGNMENT_DEADLINES,
  ATTENDANCE_CALENDAR,
  EXAM_PREPAREDNESS,
  type RecommendedAction,
} from "@/lib/mockData";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  BookOpen,
  Calendar,
  CalendarDays,
  Clock,
  MapPin,
  GraduationCap,
  Sparkles,
  Check,
  ClipboardList,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const statusStyles: Record<string, string> = {
  present: "bg-[var(--duo-green)] text-white",
  absent: "bg-[var(--duo-red)] text-white",
  late: "bg-[var(--duo-yellow)] text-[oklch(0.3_0.08_80)]",
  today: "ring-2 ring-[var(--duo-blue)] bg-[var(--duo-blue)] text-white",
  future: "bg-muted text-muted-foreground",
  weekend: "bg-muted/50 text-muted-foreground/60",
};

const urgencyChip = {
  high: { color: "red" as const, label: "Due soon" },
  medium: { color: "orange" as const, label: "This week" },
  low: { color: "blue" as const, label: "Upcoming" },
};

const classStatusLabel = {
  completed: { text: "Done", className: "text-muted-foreground" },
  now: { text: "Now", className: "text-[var(--duo-green-dark)] font-bold" },
  upcoming: { text: "Up next", className: "text-[var(--duo-blue)]" },
};

function prepColor(score: number): "green" | "blue" | "orange" | "red" {
  if (score >= 80) return "green";
  if (score >= 65) return "blue";
  if (score >= 50) return "orange";
  return "red";
}

export function getRecommendedAction(): RecommendedAction {
  const urgent = ASSIGNMENT_DEADLINES.find((a) => a.urgency === "high");
  if (urgent) {
    return {
      id: `deadline-${urgent.id}`,
      title: `Submit ${urgent.title}`,
      description: `Due ${urgent.dueLabel} — finish and upload before class ends.`,
      reason: "Highest priority",
      icon: urgent.icon,
    };
  }

  const weakest = [...EXAM_PREPAREDNESS].sort((a, b) => a.score - b.score)[0];
  if (weakest && weakest.score < 70) {
    return {
      id: `exam-${weakest.id}`,
      title: `Study ${weakest.subject} for ${weakest.examName}`,
      description: `Only ${weakest.score}% ready — ${weakest.daysLeft} days until the exam.`,
      reason: "Boost exam prep",
      icon: weakest.icon,
    };
  }

  if (ATTENDANCE_CALENDAR.percentage < ATTENDANCE_CALENDAR.required) {
    return {
      id: "attendance-boost",
      title: "Attend all remaining classes this week",
      description: `You're at ${ATTENDANCE_CALENDAR.percentage}% — need ${ATTENDANCE_CALENDAR.required}% to clear attendance risk.`,
      reason: "Attendance at risk",
      icon: "📅",
    };
  }

  const nextClass = TODAYS_CLASSES.find((c) => c.status === "upcoming" || c.status === "now");
  if (nextClass) {
    return {
      id: `class-${nextClass.id}`,
      title: `Prepare for ${nextClass.subject}`,
      description: `Review "${nextClass.topic}" before ${nextClass.time} in ${nextClass.room}.`,
      reason: "Next class",
      icon: nextClass.icon,
    };
  }

  return {
    id: "daily-review",
    title: "Review today's notes",
    description: "Spend 15 minutes revising what you learned in class today.",
    reason: "Stay on track",
    icon: "📚",
  };
}

export function RecommendedNextActionWidget({
  compact = false,
  embedded = false,
}: {
  compact?: boolean;
  embedded?: boolean;
}) {
  const action = useMemo(() => getRecommendedAction(), []);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("recommended_action_done");
      if (saved) {
        const { id, done } = JSON.parse(saved);
        if (id === action.id && done) setChecked(true);
      }
    } catch {}
  }, [action.id]);

  const toggle = (done: boolean) => {
    setChecked(done);
    localStorage.setItem("recommended_action_done", JSON.stringify({ id: action.id, done }));
  };

  const content = (
    <>
      <div
        className={cn(
          "flex items-center justify-between gap-2",
          embedded ? "mb-1.5" : compact ? "mb-1.5" : "mb-3",
        )}
      >
        <h2
          className={cn(
            "flex items-center gap-1.5 font-bold text-[var(--duo-green-dark)]",
            embedded || compact ? "text-xs" : "font-display text-lg",
          )}
        >
          <Sparkles className={embedded || compact ? "size-3.5" : "size-5"} />
          Recommended Next Action
        </h2>
        <Chip color="green">{action.reason}</Chip>
      </div>

      <label
        className={cn(
          "flex cursor-pointer items-start gap-2 rounded-xl bg-muted/40 transition hover:bg-muted/60",
          embedded || compact ? "bg-card/90 p-2" : "gap-4 rounded-2xl bg-card p-4",
          checked && "bg-[oklch(0.98_0.04_145)] ring-1 ring-[var(--duo-green)]",
        )}
      >
        <Checkbox
          checked={checked}
          onCheckedChange={(v) => toggle(v === true)}
          className={cn(
            "mt-0.5 shrink-0 rounded-lg border-2 border-[var(--duo-green-dark)] data-[state=checked]:border-[var(--duo-green-dark)] data-[state=checked]:bg-[var(--duo-green)] data-[state=checked]:text-white",
            embedded || compact
              ? "size-5 shadow-[0_2px_0_0_var(--duo-green-dark)]"
              : "size-7 shadow-[0_3px_0_0_var(--duo-green-dark)]",
          )}
          aria-label={`Mark "${action.title}" as done`}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className={embedded || compact ? "text-base" : "text-xl"}>{action.icon}</span>
            <span
              className={cn(
                "font-bold",
                embedded || compact ? "text-xs" : "font-display text-base",
                checked && "text-muted-foreground line-through",
              )}
            >
              {action.title}
            </span>
            {checked && (
              <span className="flex items-center gap-0.5 text-[10px] font-bold text-[var(--duo-green-dark)]">
                <Check className="size-3" /> Done
              </span>
            )}
          </div>
          {!compact && !embedded && (
            <p
              className={cn(
                "mt-1 text-sm text-muted-foreground",
                checked && "line-through opacity-70",
              )}
            >
              {action.description}
            </p>
          )}
        </div>
      </label>
    </>
  );

  if (embedded) {
    return (
      <div className={cn("border-t border-border/50 pt-2.5", checked && "opacity-90")}>
        {content}
      </div>
    );
  }

  return (
    <DuoCard
      accent="green"
      className={cn(
        "bg-gradient-to-r from-[oklch(0.97_0.05_145)] to-[oklch(0.95_0.07_145)] transition",
        compact && "p-3",
        checked && "opacity-90",
      )}
    >
      {content}
    </DuoCard>
  );
}

export function TodaysClassesWidget({ compact = false }: { compact?: boolean }) {
  const now = TODAYS_CLASSES.find((c) => c.status === "now");
  const classes = compact ? TODAYS_CLASSES.filter((c) => c.status !== "completed") : TODAYS_CLASSES;

  return (
    <DuoCard accent="blue" className={compact ? "p-3" : undefined}>
      <div className={cn("flex items-center justify-between", compact ? "mb-2" : "mb-3")}>
        <h2
          className={cn(
            "flex items-center gap-1.5 font-bold text-[var(--duo-blue)]",
            compact ? "text-xs" : "font-display gap-2 text-lg",
          )}
        >
          <BookOpen className={compact ? "size-3.5" : "size-5"} />
          Today&apos;s Classes
        </h2>
        {!compact && <Chip color="blue">{TODAYS_CLASSES.length} sessions</Chip>}
      </div>
      {now && (
        <div
          className={cn(
            "rounded-lg bg-[oklch(0.96_0.06_145)] font-bold text-[var(--duo-green-dark)] ring-1 ring-[var(--duo-green)]",
            compact ? "mb-2 px-2 py-1 text-[10px]" : "mb-3 rounded-xl px-3 py-2 text-sm",
          )}
        >
          🟢 {now.subject} · {now.time}
        </div>
      )}
      <ul className={compact ? "space-y-1" : "space-y-2"}>
        {classes.map((c) => {
          const status = classStatusLabel[c.status];
          return (
            <li
              key={c.id}
              className={cn(
                "flex items-center gap-2 rounded-lg bg-muted/40 transition",
                compact ? "p-2" : "gap-3 rounded-xl p-3",
                c.status === "now" && "bg-[oklch(0.98_0.04_145)] ring-1 ring-[var(--duo-green)]",
              )}
            >
              <div
                className={cn(
                  "grid shrink-0 place-items-center rounded-lg bg-muted",
                  compact ? "size-7 text-sm" : "size-10 rounded-xl text-lg",
                )}
              >
                {c.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className={cn("font-bold", compact && "text-xs")}>{c.subject}</span>
                  <span
                    className={cn(
                      "font-bold uppercase",
                      compact ? "text-[9px]" : "text-[10px]",
                      status.className,
                    )}
                  >
                    {status.text}
                  </span>
                </div>
                <div
                  className={cn(
                    "truncate text-muted-foreground",
                    compact ? "text-[10px]" : "text-xs",
                  )}
                >
                  {compact ? `${c.time} · ${c.room}` : c.topic}
                </div>
                {!compact && (
                  <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {c.time} – {c.endTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3" />
                      {c.room}
                    </span>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </DuoCard>
  );
}

type QuestTask = {
  id: string;
  title: string;
  subject: string;
  due: string;
  status: string;
  icon: string;
  points: number;
};

export function QuestsAndDeadlinesWidget({
  tasks,
  onSubmit,
  compact = false,
}: {
  tasks: QuestTask[];
  onSubmit: (id: string) => void;
  compact?: boolean;
}) {
  const questsLeft = tasks.filter((t) => t.status !== "submitted").length;
  const questLimit = compact ? 4 : tasks.length;
  const deadlineLimit = ASSIGNMENT_DEADLINES.length;

  return (
    <DuoCard accent="orange" className={compact ? "p-3" : undefined}>
      <div
        className={cn(
          "flex flex-wrap items-center justify-between gap-2",
          compact ? "mb-2" : "mb-4",
        )}
      >
        <h2
          className={cn(
            "flex items-center gap-1.5 font-bold text-[var(--duo-orange)]",
            compact ? "text-xs" : "font-display gap-2 text-lg",
          )}
        >
          <ClipboardList className={compact ? "size-3.5" : "size-5"} />
          Quests &amp; Deadlines
        </h2>
        <Chip color="orange">{questsLeft} left</Chip>
      </div>

      <div className={compact ? "space-y-2" : "space-y-5"}>
        <section>
          {!compact && (
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Today&apos;s Quests
            </h3>
          )}
          <ul className="space-y-1.5">
            {tasks.slice(0, questLimit).map((t) => {
              const done = t.status === "submitted";
              return (
                <li
                  key={t.id}
                  className={cn(
                    "flex items-center gap-2 rounded-lg bg-muted/40",
                    compact ? "p-2" : "gap-3 rounded-xl p-3",
                  )}
                >
                  <div
                    className={cn(
                      "grid shrink-0 place-items-center rounded-lg bg-muted",
                      compact ? "size-8 text-base" : "size-11 rounded-xl text-xl",
                    )}
                  >
                    {t.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div
                      className={cn(
                        "truncate font-bold",
                        compact && "text-xs",
                        done && "line-through opacity-60",
                      )}
                    >
                      {t.title}
                    </div>
                    <div
                      className={cn("text-muted-foreground", compact ? "text-[10px]" : "text-xs")}
                    >
                      {compact ? t.due : `${t.subject} • Due ${t.due} • +${t.points} pts`}
                    </div>
                  </div>
                  {done ? (
                    <Chip color="green">✓</Chip>
                  ) : (
                    <DuoButton size="sm" variant="green" onClick={() => onSubmit(t.id)}>
                      {compact ? "Go" : "Submit"}
                    </DuoButton>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <div className="border-t border-border" />

        <section>
          {!compact && (
            <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
              <Calendar className="size-3.5" />
              Assignment Deadlines
            </h3>
          )}
          <ul className="space-y-1.5">
            {ASSIGNMENT_DEADLINES.slice(0, deadlineLimit).map((a) => {
              const chip = urgencyChip[a.urgency];
              const quest = tasks.find((t) => t.id === a.id);
              return (
                <li
                  key={a.id}
                  className={cn(
                    "flex items-center gap-2 rounded-lg bg-muted/40",
                    compact ? "p-2" : "gap-3 rounded-xl p-3",
                  )}
                >
                  <div
                    className={cn(
                      "grid shrink-0 place-items-center rounded-lg bg-muted",
                      compact ? "size-7 text-sm" : "size-10 rounded-xl text-lg",
                    )}
                  >
                    {a.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className={cn("truncate font-bold", compact && "text-xs")}>{a.title}</div>
                    {!compact && <div className="text-xs text-muted-foreground">{a.subject}</div>}
                  </div>
                  <div className="shrink-0 text-right">
                    <div
                      className={cn("font-numeric font-bold", compact ? "text-[10px]" : "text-xs")}
                    >
                      {a.dueLabel}
                    </div>
                    {quest?.status === "submitted" ? (
                      <Chip color="green">Submitted</Chip>
                    ) : (
                      <Chip color={chip.color}>{chip.label}</Chip>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </DuoCard>
  );
}

export function AttendanceCalendarWidget() {
  const [leaveOpen, setLeaveOpen] = useState(false);
  const cal = ATTENDANCE_CALENDAR;
  const firstDay = new Date(2026, 4, 1).getDay();
  const atRisk = cal.percentage < cal.required;

  return (
    <>
      <DuoCard accent={atRisk ? "red" : "green"} className="flex flex-col">
        <div className="mb-3 flex items-start justify-between gap-2">
          <div>
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-[var(--duo-purple)]">
              <CalendarDays className="size-5" />
              Attendance
            </h2>
            <p className="text-xs text-muted-foreground">{cal.month}</p>
          </div>
          <div className="text-right">
            <div className="font-numeric text-2xl font-bold">{cal.percentage}%</div>
            {atRisk && (
              <Chip color="red">
                <AlertTriangle className="size-3" /> At risk
              </Chip>
            )}
          </div>
        </div>

        {atRisk && (
          <div className="mb-3 flex items-start gap-2 rounded-xl border-2 border-[var(--duo-red)] bg-[oklch(0.97_0.04_25)] px-3 py-2 text-sm">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-[var(--duo-red)]" />
            <p className="font-bold text-[oklch(0.4_0.18_25)]">
              Below {cal.required}% minimum — {cal.required - cal.percentage}% more needed to stay
              safe.
            </p>
          </div>
        )}

        <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase text-muted-foreground">
          {WEEKDAYS.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>

        <div className="mb-3 grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {cal.days.map((day) => (
            <div
              key={day.date}
              title={
                day.status === "present"
                  ? "Present"
                  : day.status === "absent"
                    ? "Absent"
                    : day.status === "late"
                      ? "Late"
                      : day.status === "today"
                        ? "Today"
                        : ""
              }
              className={cn(
                "grid aspect-square place-items-center rounded-lg text-xs font-bold",
                statusStyles[day.status],
              )}
            >
              {day.date}
            </div>
          ))}
        </div>

        <div className="mb-4 flex flex-wrap gap-3 text-xs font-bold">
          <span className="flex items-center gap-1.5">
            <span className="size-3 rounded bg-[var(--duo-green)]" /> Present ({cal.daysPresent})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-3 rounded bg-[var(--duo-red)]" /> Absent ({cal.daysAbsent})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-3 rounded bg-[var(--duo-yellow)]" /> Late ({cal.daysLate})
          </span>
        </div>

        <DuoButton variant="white" className="mt-auto w-full" onClick={() => setLeaveOpen(true)}>
          Apply for Leave
        </DuoButton>
      </DuoCard>

      <Dialog open={leaveOpen} onOpenChange={setLeaveOpen}>
        <DialogContent className="max-w-sm rounded-3xl border-2">
          <DialogHeader>
            <DialogTitle className="font-display">Apply for Leave</DialogTitle>
            <DialogDescription>
              Submit a leave request to your class teacher. You&apos;ll get a reply within 1 school
              day.
            </DialogDescription>
          </DialogHeader>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Leave request submitted! Your teacher will review it soon.");
              setLeaveOpen(false);
            }}
          >
            <div>
              <label className="mb-1 block text-xs font-bold uppercase text-muted-foreground">
                Date
              </label>
              <input
                type="date"
                required
                className="w-full rounded-xl border-2 border-border px-3 py-2 text-sm font-bold"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase text-muted-foreground">
                Reason
              </label>
              <textarea
                required
                rows={3}
                placeholder="e.g. Medical appointment"
                className="w-full rounded-xl border-2 border-border px-3 py-2 text-sm"
              />
            </div>
            <DuoButton type="submit" variant="green" className="w-full">
              Submit Request
            </DuoButton>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function ExamPreparednessWidget({ compact = false }: { compact?: boolean }) {
  const avg =
    EXAM_PREPAREDNESS.length === 0
      ? 0
      : Math.round(EXAM_PREPAREDNESS.reduce((s, e) => s + e.score, 0) / EXAM_PREPAREDNESS.length);

  return (
    <DuoCard accent="purple" className={compact ? "p-3" : undefined}>
      <div className={cn("flex items-center justify-between", compact ? "mb-2" : "mb-3")}>
        <h2
          className={cn(
            "flex items-center gap-1.5 font-bold text-[var(--duo-purple)]",
            compact ? "text-xs" : "font-display gap-2 text-lg",
          )}
        >
          <GraduationCap className={compact ? "size-3.5" : "size-5"} />
          Upcoming Exams
        </h2>
        <Chip color="purple">{avg}% avg</Chip>
      </div>
      {!compact && (
        <p className="mb-4 text-xs text-muted-foreground">
          Preparedness scores by subject — based on quizzes & practice
        </p>
      )}
      <ul className={compact ? "space-y-1.5" : "space-y-4"}>
        {EXAM_PREPAREDNESS.map((exam) => {
          const color = prepColor(exam.score);
          return (
            <li
              key={exam.id}
              className={cn("rounded-lg bg-muted/40", compact ? "p-2" : "rounded-xl p-3")}
            >
              <div className={cn("flex items-center gap-2", !compact && "mb-2 gap-3")}>
                <div
                  className={cn(
                    "grid place-items-center rounded-lg bg-muted",
                    compact ? "size-7 text-sm" : "size-10 rounded-xl text-lg",
                  )}
                >
                  {exam.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className={cn("font-bold", compact && "text-xs")}>{exam.subject}</div>
                  <div className={cn("text-muted-foreground", compact ? "text-[10px]" : "text-xs")}>
                    {compact ? exam.examDate : `${exam.examName} • ${exam.examDate}`}
                  </div>
                </div>
                <div
                  className={cn(
                    "font-numeric font-bold",
                    compact ? "text-sm" : "text-xl",
                    color === "green" && "text-[var(--duo-green-dark)]",
                    color === "blue" && "text-[var(--duo-blue)]",
                    color === "orange" && "text-[var(--duo-orange)]",
                    color === "red" && "text-[var(--duo-red)]",
                  )}
                >
                  {exam.score}%
                </div>
              </div>
              <DuoProgress
                value={exam.score}
                color={color}
                label={compact ? undefined : `${exam.subject} readiness`}
              />
            </li>
          );
        })}
      </ul>
    </DuoCard>
  );
}
