import { createFileRoute, Link } from "@tanstack/react-router";
import { StudentActivitiesPage } from "@/components/student-activities-page";
import { ArrowLeft, Gamepad2 } from "lucide-react";

export const Route = createFileRoute("/student/activities")({
  head: () => ({
    meta: [
      { title: "Activities — SkoolDojo" },
      { name: "description", content: "Quests, games, challenges and school events." },
    ],
  }),
  component: StudentActivitiesRoute,
});

function StudentActivitiesRoute() {
  return (
    <div className="flex flex-col gap-3">
      <Link
        to="/student"
        className="inline-flex w-fit items-center gap-1 text-xs font-bold text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Back to dashboard
      </Link>
      <div>
        <h1 className="flex items-center gap-2 font-display text-xl font-bold">
          <Gamepad2 className="size-5 text-[var(--duo-orange)]" />
          Activities
        </h1>
        <p className="text-xs text-muted-foreground">
          Quests, games, challenges and events — earn extra points
        </p>
      </div>
      <StudentActivitiesPage />
    </div>
  );
}
