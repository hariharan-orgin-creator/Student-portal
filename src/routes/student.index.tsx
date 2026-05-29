import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DuoCard } from "@/components/duo";
import { UploadQuestDialog } from "@/components/upload-quest-dialog";
import { RecommendedNextActionWidget } from "@/components/student-dashboard-widgets";
import { EisenhowerMatrix } from "@/components/eisenhower-matrix";
import { ASSIGNMENTS, RECENT_ACTIVITY } from "@/lib/mockData";

const TASK_STATUSES = new Set(["pending", "in-progress", "submitted"]);

function isValidSavedTask(value: unknown): value is (typeof ASSIGNMENTS)[number] {
  if (!value || typeof value !== "object") return false;
  const t = value as Record<string, unknown>;
  return (
    typeof t.id === "string" &&
    typeof t.title === "string" &&
    typeof t.subject === "string" &&
    typeof t.due === "string" &&
    typeof t.status === "string" &&
    TASK_STATUSES.has(t.status) &&
    typeof t.icon === "string" &&
    typeof t.points === "number" &&
    Number.isFinite(t.points)
  );
}

export const Route = createFileRoute("/student/")({
  head: () => ({
    meta: [
      { title: "Student Dashboard — SkoolDojo" },
      {
        name: "description",
        content: "Track quests, earn points, level up and see your class progress.",
      },
    ],
  }),
  component: StudentDashboard,
});

function StudentDashboard() {
  const [points, setPoints] = useState(320);
  const [coins, setCoins] = useState(15);
  const [tasks, setTasks] = useState(ASSIGNMENTS.map((a) => ({ ...a })));
  const [activity, setActivity] = useState(RECENT_ACTIVITY);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [pendingTaskId, setPendingTaskId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("student_state");
    if (saved) {
      try {
        const s = JSON.parse(saved);
        if (typeof s.points === "number") setPoints(s.points);
        if (typeof s.coins === "number") setCoins(s.coins);
        if (Array.isArray(s.tasks)) {
          const validTasks = s.tasks.filter(isValidSavedTask);
          if (validTasks.length > 0) setTasks(validTasks);
        }
      } catch {}
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("student_state", JSON.stringify({ points, coins, tasks }));
  }, [points, coins, tasks]);

  const completedToday = tasks.filter((t) => t.status === "submitted").length;
  const dailyGoal = 3;

  const openUploadForTask = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task || task.status === "submitted") return;
    setPendingTaskId(id);
    setUploadOpen(true);
  };

  const submitTask = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task || task.status === "submitted") return;
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: "submitted" } : t)));
    setPoints((p) => p + task.points);
    setCoins((c) => c + Math.ceil(task.points / 5));
    setActivity((a) => [
      {
        id: Date.now(),
        type: "submission",
        text: `You submitted ${task.title} (+${task.points} pts)`,
        time: "now",
        icon: "✨",
      },
      ...a,
    ]);
  };

  const pendingTask = pendingTaskId ? tasks.find((t) => t.id === pendingTaskId) : null;

  return (
    <>
      <DuoCard className="bg-linear-to-br from-[oklch(0.96_0.08_145)] to-[oklch(0.9_0.12_145)] p-3">
        <div className="flex items-center gap-3">
          <div className="text-4xl">🦕</div>
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-lg font-bold">Hi Aisyah! 👋</h1>
            <p className="text-xs text-muted-foreground">
              {Math.max(0, dailyGoal - completedToday)} quest
              {dailyGoal - completedToday === 1 ? "" : "s"} to go today
            </p>
          </div>
        </div>
        <RecommendedNextActionWidget compact embedded />
      </DuoCard>

      <section>
        <h2 className="mb-2 font-display text-sm font-bold text-muted-foreground">
          Your priorities
        </h2>
        <EisenhowerMatrix tasks={tasks} onSubmit={openUploadForTask} recentActivity={activity} />
      </section>

      {pendingTask && (
        <UploadQuestDialog
          open={uploadOpen}
          onOpenChange={(open) => {
            setUploadOpen(open);
            if (!open) setPendingTaskId(null);
          }}
          taskTitle={pendingTask.title}
          taskIcon={pendingTask.icon}
          points={pendingTask.points}
          onSubmitSuccess={() => submitTask(pendingTask.id)}
        />
      )}
    </>
  );
}
