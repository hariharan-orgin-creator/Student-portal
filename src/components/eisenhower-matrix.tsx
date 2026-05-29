import { useMemo } from "react";
import { DuoButton, DuoCard } from "@/components/duo";
import {
  ASSIGNMENT_DEADLINES,
  EXAM_PREPAREDNESS,
  RECENT_ACTIVITY,
  TODAYS_CLASSES,
} from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { Clock, Zap, Calendar, Inbox } from "lucide-react";

type QuestTask = {
  id: string;
  title: string;
  subject: string;
  due: string;
  status: string;
  icon: string;
  points: number;
};

type MatrixItem = {
  id: string;
  title: string;
  meta?: string;
  icon: string;
  done?: boolean;
  action?: { label: string; onClick: () => void };
};

const quadrants = [
  {
    key: "do-first",
    title: "Do First",
    subtitle: "Urgent · Important",
    icon: Zap,
    accent: "border-[var(--duo-red)] bg-[oklch(0.98_0.04_25)]",
    titleColor: "text-[var(--duo-red)]",
  },
  {
    key: "schedule",
    title: "Schedule",
    subtitle: "Plan ahead",
    icon: Calendar,
    accent: "border-[var(--duo-green)] bg-[oklch(0.98_0.04_145)]",
    titleColor: "text-[var(--duo-green-dark)]",
  },
  {
    key: "delegate",
    title: "Quick Tasks",
    subtitle: "Urgent · Flexible",
    icon: Clock,
    accent: "border-[var(--duo-orange)] bg-[oklch(0.99_0.04_50)]",
    titleColor: "text-[var(--duo-orange)]",
  },
  {
    key: "later",
    title: "Later",
    subtitle: "Low priority",
    icon: Inbox,
    accent: "border-border bg-muted/30",
    titleColor: "text-muted-foreground",
  },
] as const;

function MatrixItemRow({ item }: Readonly<{ item: MatrixItem }>) {
  return (
    <li
      className={cn("flex items-center gap-2 rounded-lg bg-card/80 p-2", item.done && "opacity-60")}
    >
      <span className="grid size-7 shrink-0 place-items-center rounded-md bg-muted text-sm">
        {item.icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className={cn("truncate text-xs font-bold", item.done && "line-through")}>
          {item.title}
        </div>
        {item.meta && <div className="truncate text-[10px] text-muted-foreground">{item.meta}</div>}
      </div>
      {item.action && !item.done && (
        <DuoButton
          size="sm"
          variant="green"
          className="shrink-0 px-2 py-1 text-[10px]"
          onClick={item.action.onClick}
        >
          {item.action.label}
        </DuoButton>
      )}
      {item.done && <span className="text-[10px] font-bold text-duo-green-dark">✓</span>}
    </li>
  );
}

type ActivityItem = { id: number; text: string; time: string; icon: string };

function buildMatrixItems(
  tasks: QuestTask[],
  onSubmit: (id: string) => void,
  recentActivity: ActivityItem[],
) {
  const doFirst: MatrixItem[] = [];

  const liveClass = TODAYS_CLASSES.find((c) => c.status === "now");
  if (liveClass) {
    doFirst.push({
      id: liveClass.id,
      title: `${liveClass.subject} — NOW`,
      meta: `${liveClass.time} · ${liveClass.room}`,
      icon: liveClass.icon,
    });
  }

  tasks
    .filter(
      (t) =>
        t.status !== "submitted" &&
        (t.due.toLowerCase().includes("today") || t.due.toLowerCase().includes("tomorrow")),
    )
    .forEach((t) => {
      doFirst.push({
        id: t.id,
        title: t.title,
        meta: `Due ${t.due} · +${t.points} pts`,
        icon: t.icon,
        action: { label: "Go", onClick: () => onSubmit(t.id) },
      });
    });

  ASSIGNMENT_DEADLINES.filter((a) => a.urgency === "high").forEach((a) => {
    const quest = tasks.find((t) => t.id === a.id);
    if (quest?.status === "submitted") return;
    doFirst.push({
      id: `deadline-${a.id}`,
      title: a.title,
      meta: a.dueLabel,
      icon: a.icon,
      action: quest ? { label: "Go", onClick: () => onSubmit(quest.id) } : undefined,
    });
  });

  const schedule: MatrixItem[] = [];

  EXAM_PREPAREDNESS.forEach((exam) => {
    schedule.push({
      id: exam.id,
      title: exam.subject,
      meta: `${exam.examDate} · ${exam.score}% ready`,
      icon: exam.icon,
    });
  });

  TODAYS_CLASSES.filter((c) => c.status === "upcoming").forEach((c) => {
    schedule.push({
      id: c.id,
      title: c.subject,
      meta: `${c.time} · ${c.room}`,
      icon: c.icon,
    });
  });

  tasks
    .filter(
      (t) =>
        t.status !== "submitted" &&
        !t.due.toLowerCase().includes("today") &&
        !t.due.toLowerCase().includes("tomorrow"),
    )
    .forEach((t) => {
      schedule.push({
        id: `plan-${t.id}`,
        title: t.title,
        meta: `Due ${t.due}`,
        icon: t.icon,
        action: { label: "Go", onClick: () => onSubmit(t.id) },
      });
    });

  const delegate: MatrixItem[] = ASSIGNMENT_DEADLINES.filter((a) => a.urgency === "medium").map(
    (a) => {
      const quest = tasks.find((t) => t.id === a.id);
      return {
        id: `deadline-${a.id}`,
        title: a.title,
        meta: a.dueLabel,
        icon: a.icon,
        done: quest?.status === "submitted",
        action:
          quest && quest.status !== "submitted"
            ? { label: "Go", onClick: () => onSubmit(quest.id) }
            : undefined,
      };
    },
  );

  const later: MatrixItem[] = [
    ...ASSIGNMENT_DEADLINES.filter((a) => a.urgency === "low").map((a) => {
      const quest = tasks.find((t) => t.id === a.id);
      return {
        id: `deadline-${a.id}`,
        title: a.title,
        meta: a.dueLabel,
        icon: a.icon,
        done: quest?.status === "submitted",
      };
    }),
    ...tasks
      .filter((t) => t.status === "submitted")
      .map((t) => ({
        id: `done-${t.id}`,
        title: t.title,
        meta: "Submitted",
        icon: t.icon,
        done: true,
      })),
    ...recentActivity.slice(0, 3).map((a) => ({
      id: `activity-${a.id}`,
      title: a.text,
      meta: a.time,
      icon: a.icon,
    })),
  ];

  return { doFirst, schedule, delegate, later };
}

type EisenhowerMatrixProps = {
  tasks: QuestTask[];
  onSubmit: (id: string) => void;
  recentActivity?: ActivityItem[];
};

export function EisenhowerMatrix({
  tasks,
  onSubmit,
  recentActivity = RECENT_ACTIVITY,
}: Readonly<EisenhowerMatrixProps>) {
  const items = useMemo(
    () => buildMatrixItems(tasks, onSubmit, recentActivity),
    [tasks, onSubmit, recentActivity],
  );

  const lists = [items.doFirst, items.schedule, items.delegate, items.later];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {quadrants.map((q, i) => (
        <DuoCard key={q.key} className={cn("border-l-4 p-3", q.accent)}>
          <div className="mb-2 flex items-start justify-between gap-2">
            <div>
              <h3
                className={cn(
                  "flex items-center gap-1.5 font-display text-sm font-bold",
                  q.titleColor,
                )}
              >
                <q.icon className="size-3.5" />
                {q.title}
              </h3>
              <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                {q.subtitle}
              </p>
            </div>
            <span className="font-numeric shrink-0 rounded-full bg-card px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
              {lists[i].length}
            </span>
          </div>
          <ul className="space-y-1.5">
            {lists[i].length === 0 ? (
              <li className="rounded-lg bg-card/60 px-2 py-3 text-center text-[10px] text-muted-foreground">
                Nothing here
              </li>
            ) : (
              lists[i].slice(0, 5).map((item) => <MatrixItemRow key={item.id} item={item} />)
            )}
          </ul>
        </DuoCard>
      ))}
    </div>
  );
}
