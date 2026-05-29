import { createFileRoute, Link } from "@tanstack/react-router";
import { AssignmentsKanbanBoard } from "@/components/assignments-kanban-board";
import { ArrowLeft, LayoutGrid } from "lucide-react";

export const Route = createFileRoute("/student/assignments")({
  head: () => ({
    meta: [
      { title: "My Assignments — SkoolDojo" },
      { name: "description", content: "Track assignments on a Trello-style Kanban board." },
    ],
  }),
  component: StudentAssignmentsPage,
});

function StudentAssignmentsPage() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link
            to="/student"
            className="mb-1 inline-flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            Back to dashboard
          </Link>
          <h1 className="flex items-center gap-2 font-display text-xl font-bold">
            <LayoutGrid className="size-5 text-[var(--duo-green-dark)]" />
            My Assignments
          </h1>
          <p className="text-xs text-muted-foreground">
            Drag cards between columns · Click a card to view files or quizzes
          </p>
        </div>
      </div>
      <AssignmentsKanbanBoard />
    </div>
  );
}
