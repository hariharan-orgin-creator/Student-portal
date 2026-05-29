import { createFileRoute, Link } from "@tanstack/react-router";
import { ClassFeedPage } from "@/components/class-feed-page";

export const Route = createFileRoute("/student/class-feed")({
  head: () => ({
    meta: [
      { title: "Class Feed — SkoolDojo" },
      {
        name: "description",
        content: "Share speaking videos and solve textbook challenges with your class.",
      },
    ],
  }),
  component: StudentClassFeedRoute,
});

function StudentClassFeedRoute() {
  return (
    <div className="flex flex-col gap-2">
      <Link
        to="/student"
        className="inline-flex w-fit items-center gap-1 text-xs font-bold text-muted-foreground hover:text-foreground md:hidden"
      >
        ← Back
      </Link>
      <ClassFeedPage />
    </div>
  );
}
