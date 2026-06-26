import React from "react";
import { Search } from "lucide-react";
import { DuoCard, Chip } from "@/components/duo";

interface PendingActionsTabProps {
  students: any[];
  taskSearchQuery: string;
  setTaskSearchQuery: (query: string) => void;
  taskFilter: string;
  setTaskFilter: (filter: string) => void;
  handleToggleTaskStatusGlobal: (taskId: string) => void;
  handleViewStudentRecord: (studentId: string) => void;
  todayDateStr: string;
}

export const PendingActionsTab: React.FC<PendingActionsTabProps> = ({
  students,
  taskSearchQuery,
  setTaskSearchQuery,
  taskFilter,
  setTaskFilter,
  handleToggleTaskStatusGlobal,
  handleViewStudentRecord,
  todayDateStr,
}) => {
  const allTasksList = students.flatMap((stud) => {
    return (stud.pendingTasks || []).map((task: any) => {
      let computedUrgency = task.urgency;
      if (task.urgency !== "completed") {
        if (task.dueDate < todayDateStr) {
          computedUrgency = "overdue";
        } else if (task.dueDate === todayDateStr) {
          computedUrgency = "due_today";
        } else {
          computedUrgency = "upcoming";
        }
      }
      return {
        ...task,
        studentId: stud.id,
        studentName: stud.name,
        studentAvatar: stud.avatar,
        caseId: stud.caseId,
        computedUrgency,
      };
    });
  });

  const filteredTasks = allTasksList.filter((task) => {
    // 1. Text Search Filter
    const matchesSearch =
      task.text.toLowerCase().includes(taskSearchQuery.toLowerCase()) ||
      task.studentName.toLowerCase().includes(taskSearchQuery.toLowerCase());

    // 2. Status/Urgency Filter
    let matchesFilter = true;
    if (taskFilter !== "All") {
      if (taskFilter === "Completed") {
        matchesFilter = task.urgency === "completed";
      } else {
        matchesFilter = task.computedUrgency === taskFilter;
      }
    }

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 w-full min-w-0">
      <div>
        <h1 className="font-display text-2xl font-extrabold">Pending Actions</h1>
        <p className="text-xs text-muted-foreground font-semibold">
          Track and manage all counselling follow-up tasks and student record requirements.
        </p>
      </div>

      {/* Filters & Search */}
      <DuoCard className="p-3.5 flex flex-col sm:flex-row gap-3 items-center justify-between bg-card border border-border">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search task or student..."
            value={taskSearchQuery}
            onChange={(e) => setTaskSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs font-bold bg-muted/50 border-2 border-border rounded-xl focus:outline-none focus:border-duo-pink"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
          {["All", "overdue", "due_today", "upcoming", "Completed"].map((filter) => (
            <button
              key={filter}
              onClick={() => setTaskFilter(filter)}
              className={`px-3 py-1.5 text-xs font-extrabold rounded-xl border transition-all ${
                taskFilter === filter
                  ? "bg-duo-pink text-white border-duo-pink"
                  : "bg-muted/40 border-border text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {filter === "overdue"
                ? "Overdue"
                : filter === "due_today"
                ? "Due Today"
                : filter === "upcoming"
                ? "Upcoming"
                : filter}
            </button>
          ))}
        </div>
      </DuoCard>

      {/* Tasks List */}
      <DuoCard className="p-4 border border-border bg-card">
        <div className="flex justify-between items-center mb-3 border-b border-border pb-2.5">
          <h2 className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider">
            Tasks Feed ({filteredTasks.length})
          </h2>
        </div>
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-xs font-bold">
              No pending follow-up tasks match this search or filter.
            </div>
          ) : (
            filteredTasks.map((task) => {
              const isOverdue = task.computedUrgency === "overdue";
              const isDueToday = task.computedUrgency === "due_today";
              const isCompleted = task.urgency === "completed";

              let badgeColor: "red" | "orange" | "grey" | "green" = "grey";
              if (isCompleted) badgeColor = "green";
              else if (isOverdue) badgeColor = "red";
              else if (isDueToday) badgeColor = "orange";

              return (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 border border-border rounded-2xl bg-card hover:bg-muted/10 transition shadow-xs"
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <button
                      onClick={() => handleToggleTaskStatusGlobal(task.id)}
                      className="size-5 rounded-lg border-2 border-muted hover:border-duo-pink flex items-center justify-center bg-card transition shrink-0"
                    >
                      {isCompleted && <span className="text-[10px] text-duo-pink font-bold">✓</span>}
                    </button>

                    <div className="min-w-0 flex-1">
                      <p
                        className={`font-bold text-sm leading-snug ${
                          isCompleted ? "line-through text-muted-foreground" : "text-foreground"
                        }`}
                      >
                        {task.text}
                      </p>
                      <div className="text-xs text-muted-foreground flex flex-wrap gap-x-2.5 gap-y-0.5 mt-1 font-semibold">
                        <button
                          onClick={() => handleViewStudentRecord(task.studentId)}
                          className="hover:underline flex items-center gap-1 text-left animate-none"
                        >
                          <span>{task.studentAvatar}</span>
                          <span>{task.studentName}</span>
                        </button>
                        <span>•</span>
                        <span>Case ID: {task.caseId}</span>
                        <span>•</span>
                        <span className="font-numeric">Due Date: {task.dueDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 pl-2">
                    <Chip color={badgeColor}>
                      {isCompleted
                        ? "Completed"
                        : isOverdue
                        ? "Overdue"
                        : isDueToday
                        ? "Due Today"
                        : "Upcoming"}
                    </Chip>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </DuoCard>
    </div>
  );
};
