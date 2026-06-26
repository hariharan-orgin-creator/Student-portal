import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { DuoButton, Chip } from "@/components/duo";

interface InterventionsSubTabProps {
  selectedStudent: any;
  students: any[];
  saveState: (updatedData: any) => void;
}

export const InterventionsSubTab: React.FC<InterventionsSubTabProps> = ({
  selectedStudent,
  students,
  saveState,
}) => {
  const [interventionTypeDraft, setInterventionTypeDraft] = useState("Academic Support");
  const [interventionDateDraft, setInterventionDateDraft] = useState("");
  const [interventionEndDateDraft, setInterventionEndDateDraft] = useState("");
  const [interventionStatusDraft, setInterventionStatusDraft] = useState("Active");
  const [interventionAssignedDraft, setInterventionAssignedDraft] = useState("Cikgu Nadia");
  const [interventionOutcomeDraft, setInterventionOutcomeDraft] = useState("");

  const handleAddIntervention = (e: React.FormEvent) => {
    e.preventDefault();
    if (!interventionOutcomeDraft.trim()) return;

    const newIntervention = {
      id: `i-${Date.now()}`,
      type: interventionTypeDraft,
      startDate: interventionDateDraft || new Date().toISOString().split("T")[0],
      endDate: interventionEndDateDraft || "",
      status: interventionStatusDraft as any,
      assignedPerson: interventionAssignedDraft,
      outcomeNotes: interventionOutcomeDraft,
    };

    const updatedStudents = students.map((stud) => {
      if (stud.id === selectedStudent.id) {
        return {
          ...stud,
          lastActivityDate: newIntervention.startDate,
          interventions: [newIntervention, ...(stud.interventions || [])],
        };
      }
      return stud;
    });

    saveState({ students: updatedStudents });

    setInterventionDateDraft("");
    setInterventionEndDateDraft("");
    setInterventionStatusDraft("Active");
    setInterventionOutcomeDraft("");
  };

  const handleUpdateInterventionStatus = (
    interventionId: string,
    nextStatus: "Active" | "Completed" | "Discontinued"
  ) => {
    const updatedStudents = students.map((stud) => {
      if (stud.id === selectedStudent.id) {
        const updatedInterventions = (stud.interventions || []).map((inv: any) =>
          inv.id === interventionId ? { ...inv, status: nextStatus } : inv
        );
        return {
          ...stud,
          interventions: updatedInterventions,
        };
      }
      return stud;
    });

    saveState({ students: updatedStudents });
  };

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_280px]">
      <div className="space-y-4">
        <h4 className="text-xs font-extrabold text-muted-foreground uppercase tracking-wide">Applied Interventions</h4>
        <div className="space-y-3">
          {!selectedStudent.interventions || selectedStudent.interventions.length === 0 ? (
            <p className="text-xs text-muted-foreground py-6 text-center border-2 border-dashed border-border rounded-xl">
              No interventions logged for this student.
            </p>
          ) : (
            selectedStudent.interventions.map((inv: any) => (
              <div key={inv.id} className="border border-border rounded-xl p-3.5 bg-card flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-extrabold bg-blue-100 text-duo-blue px-2 py-0.5 rounded uppercase">
                      {inv.type}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-semibold">Started: {inv.startDate}</span>
                    {inv.endDate && (
                      <span className="text-[10px] text-muted-foreground font-semibold">Ended: {inv.endDate}</span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-foreground/95 break-words whitespace-normal leading-relaxed">
                    {inv.outcomeNotes}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-muted-foreground">
                    <div>
                      Assigned: <span className="text-foreground">{inv.assignedPerson}</span>
                    </div>
                    <div>
                      Status: <span className="text-foreground">{inv.status}</span>
                    </div>
                    <div>
                      End Date: <span className="text-foreground">{inv.endDate || "Ongoing"}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 items-end shrink-0">
                  <Chip color={inv.status === "Active" ? "blue" : inv.status === "Completed" ? "green" : "red"}>
                    {inv.status}
                  </Chip>
                  <select
                    value={inv.status}
                    onChange={(e) => handleUpdateInterventionStatus(inv.id, e.target.value as any)}
                    className="text-[10px] font-bold bg-muted/60 border border-border rounded-lg p-1"
                  >
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="Discontinued">Discontinued</option>
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="border border-blue-100 rounded-2xl bg-[oklch(0.99_0.002_240)] p-4 h-fit space-y-3">
        <h4 className="text-xs font-bold text-duo-blue flex items-center gap-1.5">
          <PlusCircle className="size-4" /> Add Intervention
        </h4>
        <form onSubmit={handleAddIntervention} className="space-y-3">
          <div>
            <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Intervention Type</label>
            <select
              value={interventionTypeDraft}
              onChange={(e) => setInterventionTypeDraft(e.target.value)}
              className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-blue focus:outline-none"
            >
              <option>Academic Support</option>
              <option>Behaviour Plan</option>
              <option>Emotional Support</option>
              <option>Career Guidance</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Start Date</label>
              <input
                type="date"
                value={interventionDateDraft}
                onChange={(e) => setInterventionDateDraft(e.target.value)}
                className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-blue focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">End Date (Opt)</label>
              <input
                type="date"
                value={interventionEndDateDraft}
                onChange={(e) => setInterventionEndDateDraft(e.target.value)}
                className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-blue focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Assigned To</label>
              <input
                type="text"
                value={interventionAssignedDraft}
                onChange={(e) => setInterventionAssignedDraft(e.target.value)}
                className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-blue focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Status</label>
              <select
                value={interventionStatusDraft}
                onChange={(e) => setInterventionStatusDraft(e.target.value)}
                className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-blue focus:outline-none"
              >
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Discontinued">Discontinued</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Outcome Notes / Details</label>
            <textarea
              required
              value={interventionOutcomeDraft}
              onChange={(e) => setInterventionOutcomeDraft(e.target.value)}
              placeholder="State target outcomes, assigned support personnel, etc..."
              rows={3}
              className="w-full text-xs bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-blue focus:outline-none"
            />
          </div>

          <DuoButton type="submit" variant="blue" size="sm" className="w-full">
            Add Intervention
          </DuoButton>
        </form>
      </div>
    </div>
  );
};
