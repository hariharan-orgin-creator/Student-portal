import { createFileRoute, Link } from "@tanstack/react-router";
import { VirtualStudyClassroom } from "@/components/virtual-study-classroom";
import { ArrowLeft, Users } from "lucide-react";

export const Route = createFileRoute("/student/class")({
  head: () => ({
    meta: [
      { title: "My Class — Virtual Study Hall" },
      {
        name: "description",
        content: "Study live with classmates, focus buddies, pomodoro, and teacher support.",
      },
    ],
  }),
  component: StudentClassPage,
});

function StudentClassPage() {
  return (
    <div className="flex flex-col gap-3">
      <Link
        to="/student"
        className="inline-flex w-fit items-center gap-1 text-xs font-bold text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Back to dashboard
      </Link>
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Users className="size-3.5" />
        Virtual study classroom · inspired by live study rooms
      </p>
      <VirtualStudyClassroom />
    </div>
  );
}
