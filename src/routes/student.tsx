import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { StudentShell } from "@/components/student-shell";
import {
  loadStudentSettings,
  applyStudentSettings,
  captureStudentSettingsDom,
  restoreStudentSettingsDom,
} from "@/lib/student-settings";

export const Route = createFileRoute("/student")({
  component: StudentLayout,
});

function StudentLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const activeNav = pathname.startsWith("/student/portfolio")
    ? "My Portfolio"
    : pathname.startsWith("/student/assignments")
      ? "Assignments"
      : pathname.startsWith("/student/class")
        ? "My Class"
        : pathname.startsWith("/student/exam-results")
          ? "Exam results"
          : pathname.startsWith("/student/activities")
            ? "Activities"
            : pathname.startsWith("/student/class-feed")
              ? "Class Feed"
              : pathname.startsWith("/student/settings")
                ? "Settings"
                : "Home";

  const [points, setPoints] = useState(320);
  const [streak] = useState(5);

  useEffect(() => {
    const previousDom = captureStudentSettingsDom();
    applyStudentSettings(loadStudentSettings());
    const saved = localStorage.getItem("student_state");
    if (saved) {
      try {
        const s = JSON.parse(saved);
        if (typeof s.points === "number") setPoints(s.points);
      } catch {}
    }
    return () => restoreStudentSettingsDom(previousDom);
  }, []);

  const wide = pathname.startsWith("/student/class");

  return (
    <StudentShell activeNav={activeNav} points={points} streak={streak} wide={wide}>
      <Outlet />
    </StudentShell>
  );
}
