import React from "react";
import { DuoCard } from "@/components/duo";
import { BookmarkCheck } from "lucide-react";

interface ProfileSubTabProps {
  selectedStudent: any;
  handleToggleTaskStatus: (taskId: string) => void;
}

export const ProfileSubTab: React.FC<ProfileSubTabProps> = ({
  selectedStudent,
  handleToggleTaskStatus,
}) => {
  const pendingTasks = selectedStudent.pendingTasks || [];
  const activePendingTasks = pendingTasks.filter((t: any) => t.urgency !== "completed");

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs font-extrabold text-muted-foreground uppercase tracking-wide mb-1.5">
          Wellness Profile & Psychological Summary
        </h3>
        <p className="text-xs leading-relaxed p-3 bg-muted/30 rounded-xl border border-border font-medium text-foreground break-words whitespace-normal">
          {selectedStudent.wellnessSummary}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Academic Performance */}
        <DuoCard className="border border-border p-4 bg-card space-y-2">
          <h4 className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wide">Academic Performance</h4>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-foreground">{selectedStudent.academic?.overallGrade || selectedStudent.grade || "N/A"}</span>
            <span className="text-[10px] text-muted-foreground font-bold">Overall Grade</span>
          </div>
          <div className="text-xs font-bold text-foreground">
            Rank: <span className="text-duo-blue">{selectedStudent.academic?.examRank || "N/A"}</span>
          </div>
          <div className="text-[10px] font-bold text-muted-foreground">
            At risk:{" "}
            {selectedStudent.academic?.atRiskSubjects && selectedStudent.academic.atRiskSubjects.length > 0 ? (
              <span className="text-duo-red">{selectedStudent.academic.atRiskSubjects.join(", ")}</span>
            ) : (
              <span className="text-duo-green-dark">None</span>
            )}
          </div>
        </DuoCard>

        {/* Attendance */}
        <DuoCard className="border border-border p-4 bg-card space-y-2">
          <h4 className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wide">Attendance Snapshot</h4>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-foreground">{selectedStudent.attendance?.monthlyPercent ?? selectedStudent.attendance ?? "N/A"}%</span>
            <span className="text-[10px] text-muted-foreground font-bold">Monthly %</span>
          </div>
          <div className="text-xs font-bold text-foreground">
            Term Average: <span className="text-duo-purple">{selectedStudent.attendance?.termAverage || "N/A"}%</span>
          </div>
          <div className="text-[10px] font-bold text-muted-foreground">
            Absent Days: <span className="text-duo-pink">{selectedStudent.attendance?.absentDays || 0} days</span>
          </div>
        </DuoCard>

        {/* Session History */}
        <DuoCard className="border border-border p-4 bg-card space-y-2">
          <h4 className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wide">Session History</h4>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-foreground">{selectedStudent.sessionsLog?.length ?? 0}</span>
            <span className="text-[10px] text-muted-foreground font-bold">Total Sessions</span>
          </div>
          <div className="text-xs font-bold text-foreground">
            Last Date: <span className="text-foreground/80">{selectedStudent.lastActivityDate || selectedStudent.sessionHistory?.lastSessionDate || "None"}</span>
          </div>
          <div className="text-[10px] font-bold text-muted-foreground">
            Next: <span className="text-duo-pink">{selectedStudent.sessionHistory?.nextScheduled || "None"}</span>
          </div>
        </DuoCard>

        {/* Behaviour & Incidents */}
        <DuoCard className="border border-border p-4 bg-card space-y-2">
          <h4 className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wide">Behaviour & Incidents</h4>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-foreground">{selectedStudent.behaviour?.incidentCount || 0}</span>
            <span className="text-[10px] text-muted-foreground font-bold">Incidents</span>
          </div>
          <div className="text-xs font-bold text-foreground">
            Open Referrals: <span className="text-duo-orange">{selectedStudent.behaviour?.openDisciplineReferrals || 0}</span>
          </div>
        </DuoCard>

        {/* Support Network */}
        <DuoCard className="border border-border p-4 bg-card space-y-2 lg:col-span-2">
          <h4 className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wide">Support Network</h4>
          <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-1">
            <div>
              <span className="text-muted-foreground">Parent:</span> {selectedStudent.guardian || selectedStudent.support?.parentName}
            </div>
            <div>
              <span className="text-muted-foreground">Class Teacher:</span> {selectedStudent.support?.classTeacher || "Cikgu Nadia"}
            </div>
            <div>
              <span className="text-muted-foreground">HOD:</span> {selectedStudent.support?.hod || "Mr. Albert"}
            </div>
            <div>
              <span className="text-muted-foreground">Last Message:</span> <span className="text-duo-blue">{selectedStudent.support?.lastParentMessageDate || "None"}</span>
            </div>
          </div>
        </DuoCard>
      </div>

      {/* Pending Follow-up Tasks */}
      <div className="border border-border rounded-xl p-4 bg-muted/10">
        <h4 className="text-xs font-extrabold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-1.5">
          <BookmarkCheck className="size-4 text-duo-pink" /> Pending Follow-up Tasks
        </h4>
        <div className="space-y-2">
          {activePendingTasks.length === 0 ? (
            <p className="text-xs text-muted-foreground py-3 text-center border border-dashed border-border bg-card rounded-xl font-medium">
              All caught up! No pending follow-up tasks.
            </p>
          ) : (
            pendingTasks.map((task: any) => (
              <div key={task.id} className="flex items-center justify-between p-3.5 border border-border rounded-xl bg-card hover:bg-muted/10 transition">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleToggleTaskStatus(task.id)}
                    className="size-4 rounded-md border-2 border-muted flex items-center justify-center bg-card hover:border-duo-pink transition"
                  >
                    {task.urgency === "completed" && <span className="text-[10px] text-duo-pink font-bold">✓</span>}
                  </button>
                  <div>
                    <p className={`text-xs font-bold ${task.urgency === "completed" ? "line-through text-muted-foreground" : "text-foreground"}`}>
                      {task.text}
                    </p>
                    <p className="text-[9px] text-muted-foreground font-semibold mt-0.5">Due date: {task.dueDate}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <span className={`size-2 rounded-full ${
                    task.urgency === "overdue" ? "bg-duo-red animate-pulse" :
                    task.urgency === "due_soon" ? "bg-duo-orange" :
                    task.urgency === "completed" ? "bg-duo-green" : "bg-duo-blue"
                  }`} />
                  <span className="text-[9px] font-extrabold uppercase text-muted-foreground">{task.urgency}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
