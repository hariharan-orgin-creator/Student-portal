import { createFileRoute, Link } from "@tanstack/react-router";
import { StudentPortfolioPage } from "@/components/student-portfolio-page";
import { ArrowLeft, FolderOpen } from "lucide-react";

export const Route = createFileRoute("/student/portfolio")({
  head: () => ({
    meta: [
      { title: "My Portfolio — SkoolDojo" },
      { name: "description", content: "Your profile, achievements, and class leaderboard." },
    ],
  }),
  component: StudentPortfolioRoute,
});

function StudentPortfolioRoute() {
  return (
    <div className="flex flex-col gap-3">
      <Link
        to="/student"
        className="inline-flex w-fit items-center gap-1 text-xs font-bold text-muted-foreground hover:text-foreground md:hidden"
      >
        <ArrowLeft className="size-3.5" />
        Back to dashboard
      </Link>
      <div className="hidden md:block">
        <h1 className="flex items-center gap-2 font-display text-xl font-bold">
          <FolderOpen className="size-5 text-duo-blue" />
          My Portfolio
        </h1>
        <p className="text-xs text-muted-foreground">Your progress, badges, and class ranking</p>
      </div>
      <StudentPortfolioPage />
    </div>
  );
}
