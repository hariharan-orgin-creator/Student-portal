import { createFileRoute, Link } from "@tanstack/react-router";
import { StudentSettingsPage } from "@/components/student-settings-page";
import { ArrowLeft, Settings } from "lucide-react";

export const Route = createFileRoute("/student/settings")({
  head: () => ({
    meta: [
      { title: "Settings — SkoolDojo" },
      {
        name: "description",
        content: "Customize your study environment, learning preferences, and privacy.",
      },
    ],
  }),
  component: StudentSettingsRoute,
});

function StudentSettingsRoute() {
  return (
    <div className="flex flex-col gap-3">
      <Link
        to="/student"
        className="inline-flex w-fit items-center gap-1 text-xs font-bold text-muted-foreground hover:text-foreground md:hidden"
      >
        <ArrowLeft className="size-3.5" />
        Back to dashboard
      </Link>
      <p className="hidden items-center gap-1.5 text-xs text-muted-foreground md:flex">
        <Settings className="size-3.5" />
        Your preferences are saved automatically
      </p>
      <StudentSettingsPage />
    </div>
  );
}
