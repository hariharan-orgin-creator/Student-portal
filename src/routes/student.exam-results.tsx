import { createFileRoute, Link } from "@tanstack/react-router";
import { ExamResultsPage } from "@/components/exam-results-page";
import { ArrowLeft, Star } from "lucide-react";

export const Route = createFileRoute("/student/exam-results")({
  head: () => ({
    meta: [
      { title: "Exam Results — SkoolDojo" },
      {
        name: "description",
        content: "Personalized exam feedback, growth insights, and your next steps.",
      },
    ],
  }),
  component: StudentExamResultsRoute,
});

function StudentExamResultsRoute() {
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
        <Star className="size-3.5 fill-[var(--duo-yellow)] text-[var(--duo-yellow)]" />
        Mid-year report · personalized for you
      </p>
      <ExamResultsPage />
    </div>
  );
}
