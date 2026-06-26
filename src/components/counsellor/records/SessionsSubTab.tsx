import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { DuoButton } from "@/components/duo";

interface SessionsSubTabProps {
  selectedStudent: any;
  students: any[];
  cases: any[];
  saveState: (updatedData: any) => void;
}

export const SessionsSubTab: React.FC<SessionsSubTabProps> = ({
  selectedStudent,
  students,
  cases,
  saveState,
}) => {
  const [sessionDateDraft, setSessionDateDraft] = useState("");
  const [sessionTypeDraft, setSessionTypeDraft] = useState("Individual");
  const [sessionDurationDraft, setSessionDurationDraft] = useState("45 mins");
  const [sessionCounselorDraft, setSessionCounselorDraft] = useState("Puan Maryam");
  const [sessionNotesDraft, setSessionNotesDraft] = useState("");
  const [sessionOutcomeDraft, setSessionOutcomeDraft] = useState("");
  const [sessionFollowUpTasksDraft, setSessionFollowUpTasksDraft] = useState("");

  const handleAddDetailedSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionNotesDraft.trim()) return;

    const sessionDate = sessionDateDraft || new Date().toISOString().split("T")[0];

    const newSession = {
      id: `s-${Date.now()}`,
      date: sessionDate,
      type: sessionTypeDraft,
      duration: sessionDurationDraft,
      counselorName: sessionCounselorDraft,
      notes: sessionNotesDraft,
      outcome: sessionOutcomeDraft,
      followUpTasks: sessionFollowUpTasksDraft
        ? sessionFollowUpTasksDraft
            .split("\n")
            .map((t) => t.trim())
            .filter((t) => t !== "")
        : [],
    };

    const tasksToAppend = newSession.followUpTasks.map((tText, index) => ({
      id: `t-${Date.now()}-${index}`,
      text: tText,
      urgency: "pending" as const,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    }));

    const updatedStudents = students.map((stud) => {
      if (stud.id === selectedStudent.id) {
        return {
          ...stud,
          lastActivityDate: sessionDate,
          pendingTasks: [...(stud.pendingTasks || []), ...tasksToAppend],
          sessionsLog: [newSession, ...(stud.sessionsLog || [])],
          sessions: [newSession, ...(stud.sessions || [])],
        };
      }
      return stud;
    });

    const updatedCases = cases.map((c) => {
      if (c.studentId === selectedStudent.id) {
        return {
          ...c,
          lastSessionDate: sessionDate,
        };
      }
      return c;
    });

    saveState({ students: updatedStudents, cases: updatedCases });

    setSessionDateDraft("");
    setSessionNotesDraft("");
    setSessionOutcomeDraft("");
    setSessionFollowUpTasksDraft("");
  };

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_280px]">
      <div className="space-y-4">
        <h4 className="text-xs font-extrabold text-muted-foreground uppercase tracking-wide">Counselling Sessions Log</h4>
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
          {!selectedStudent.sessionsLog || selectedStudent.sessionsLog.length === 0 ? (
            <p className="text-xs text-muted-foreground py-6 text-center border-2 border-dashed border-border rounded-xl">
              No logged counselling session records found.
            </p>
          ) : (
            selectedStudent.sessionsLog.map((sess: any) => (
              <div key={sess.id} className="rounded-xl border border-border p-3.5 bg-card space-y-2 relative">
                <div className="flex justify-between items-center gap-2 border-b border-muted pb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-pink-100 text-duo-pink px-2 py-0.5 text-[10px] font-extrabold uppercase">
                      {sess.type}
                    </span>
                    <span className="text-[11px] text-muted-foreground font-bold">{sess.date}</span>
                  </div>
                  <div className="text-[10px] font-bold text-muted-foreground">
                    Duration: <span className="text-foreground">{sess.duration}</span>
                  </div>
                </div>
                <div className="text-xs font-bold text-foreground/90 break-words whitespace-normal leading-relaxed bg-muted/20 p-2.5 rounded-xl border border-border">
                  {sess.notes}
                </div>
                {sess.outcome && (
                  <div className="text-xs text-foreground/80 font-semibold italic flex items-start gap-1">
                    <span className="text-duo-pink font-bold shrink-0">Outcome:</span>
                    <span className="break-words whitespace-normal">{sess.outcome}</span>
                  </div>
                )}
                {sess.followUpTasks && sess.followUpTasks.length > 0 && (
                  <div className="pt-2 mt-1 border-t border-muted">
                    <span className="text-[9px] font-extrabold text-muted-foreground uppercase block mb-1">Generated Tasks:</span>
                    <ul className="list-disc pl-4 text-[10px] font-semibold text-foreground/80 space-y-0.5">
                      {sess.followUpTasks.map((t: string, idx: number) => (
                        <li key={idx} className="break-words whitespace-normal">{t}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="text-[9px] text-right font-bold text-muted-foreground">
                  Logged by: {sess.counselorName}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="border border-pink-100 rounded-2xl bg-[oklch(0.99_0.002_350)] p-4 h-fit space-y-3">
        <h4 className="text-xs font-bold text-duo-pink flex items-center gap-1.5">
          <PlusCircle className="size-4" /> Log Counselling Session
        </h4>
        <form onSubmit={handleAddDetailedSession} className="space-y-3">
          <div>
            <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Date</label>
            <input
              type="date"
              value={sessionDateDraft}
              onChange={(e) => setSessionDateDraft(e.target.value)}
              className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-pink focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Session Type</label>
            <select
              value={sessionTypeDraft}
              onChange={(e) => setSessionTypeDraft(e.target.value)}
              className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-pink focus:outline-none"
            >
              <option>Individual</option>
              <option>Group</option>
              <option>Emergency</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Duration</label>
              <input
                type="text"
                placeholder="e.g. 45 mins"
                value={sessionDurationDraft}
                onChange={(e) => setSessionDurationDraft(e.target.value)}
                className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-pink focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Counselor</label>
              <input
                type="text"
                value={sessionCounselorDraft}
                onChange={(e) => setSessionCounselorDraft(e.target.value)}
                className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-pink focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Session Notes</label>
            <textarea
              required
              value={sessionNotesDraft}
              onChange={(e) => setSessionNotesDraft(e.target.value)}
              placeholder="Describe counselling progress, coping strategies discussed, and wellness goals..."
              rows={2}
              className="w-full text-xs bg-card border border-border rounded-xl p-2 focus:ring-2 focus:ring-duo-pink focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Session Outcome</label>
            <input
              type="text"
              placeholder="e.g. Coping techniques introduced"
              value={sessionOutcomeDraft}
              onChange={(e) => setSessionOutcomeDraft(e.target.value)}
              className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-pink focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Follow-up Tasks (One per line)</label>
            <textarea
              value={sessionFollowUpTasksDraft}
              onChange={(e) => setSessionFollowUpTasksDraft(e.target.value)}
              placeholder="e.g. Science teacher check&#10;Follow up on sleep diary"
              rows={2}
              className="w-full text-xs bg-card border border-border rounded-xl p-2 focus:ring-2 focus:ring-duo-pink focus:outline-none"
            />
          </div>

          <DuoButton type="submit" variant="pink" size="sm" className="w-full">
            Log Session Record
          </DuoButton>
        </form>
      </div>
    </div>
  );
};
