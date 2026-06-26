import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { DuoButton, Chip } from "@/components/duo";

interface GoalsSubTabProps {
  selectedStudent: any;
  students: any[];
  saveState: (updatedData: any) => void;
}

export const GoalsSubTab: React.FC<GoalsSubTabProps> = ({
  selectedStudent,
  students,
  saveState,
}) => {
  const [goalTitleDraft, setGoalTitleDraft] = useState("");
  const [goalCategoryDraft, setGoalCategoryDraft] = useState("Academic");
  const [goalDateDraft, setGoalDateDraft] = useState("");
  const [goalStatusDraft, setGoalStatusDraft] = useState("Not Started");
  const [goalLinkedDraft, setGoalLinkedDraft] = useState("");

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalTitleDraft.trim()) return;

    const newGoal = {
      id: `g-${Date.now()}`,
      title: goalTitleDraft,
      category: goalCategoryDraft,
      targetDate: goalDateDraft || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      status: goalStatusDraft as any,
      linkedItems: goalLinkedDraft || "General well-being",
    };

    const updatedStudents = students.map((stud) => {
      if (stud.id === selectedStudent.id) {
        return {
          ...stud,
          goals: [newGoal, ...(stud.goals || [])],
        };
      }
      return stud;
    });

    saveState({ students: updatedStudents });

    setGoalTitleDraft("");
    setGoalCategoryDraft("Academic");
    setGoalDateDraft("");
    setGoalStatusDraft("Not Started");
    setGoalLinkedDraft("");
  };

  const handleUpdateGoalStatus = (
    goalId: string,
    nextStatus: "Not Started" | "In Progress" | "Achieved"
  ) => {
    const updatedStudents = students.map((stud) => {
      if (stud.id === selectedStudent.id) {
        const updatedGoals = (stud.goals || []).map((goal: any) =>
          goal.id === goalId ? { ...goal, status: nextStatus } : goal
        );
        return {
          ...stud,
          goals: updatedGoals,
        };
      }
      return stud;
    });

    saveState({ students: updatedStudents });
  };

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_280px]">
      <div className="space-y-4">
        <h4 className="text-xs font-extrabold text-muted-foreground uppercase tracking-wide">Counselling Goals</h4>
        <div className="space-y-3">
          {!selectedStudent.goals || selectedStudent.goals.length === 0 ? (
            <p className="text-xs text-muted-foreground py-6 text-center border-2 border-dashed border-border rounded-xl">
              No counselling goals set yet for this student.
            </p>
          ) : (
            selectedStudent.goals.map((goal: any) => (
              <div key={goal.id} className="border border-border rounded-xl p-3.5 bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold bg-green-100 text-duo-green-dark px-2 py-0.5 rounded uppercase">
                      {goal.category}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-semibold">Target: {goal.targetDate}</span>
                  </div>
                  <h5 className="text-xs font-bold text-foreground break-words whitespace-normal">{goal.title}</h5>
                  <div className="text-[10px] font-bold text-muted-foreground flex flex-col gap-0.5">
                    <div>Linked: <span className="text-foreground">{goal.linkedItems}</span></div>
                    <div>Progress: <span className="text-foreground">{goal.status}</span></div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 items-end shrink-0">
                  <Chip color={goal.status === "Achieved" ? "green" : goal.status === "In Progress" ? "orange" : "white"}>
                    {goal.status}
                  </Chip>
                  
                  <select
                    value={goal.status}
                    onChange={(e) => handleUpdateGoalStatus(goal.id, e.target.value as any)}
                    className="text-[10px] font-bold bg-muted/60 border border-border rounded-lg p-1"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Achieved">Achieved</option>
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="border border-green-100 rounded-2xl bg-[oklch(0.99_0.002_145)] p-4 h-fit space-y-3">
        <h4 className="text-xs font-bold text-duo-green-dark flex items-center gap-1.5">
          <PlusCircle className="size-4" /> Add Goal
        </h4>
        <form onSubmit={handleAddGoal} className="space-y-3">
          <div>
            <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Goal Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Practice breathing daily"
              value={goalTitleDraft}
              onChange={(e) => setGoalTitleDraft(e.target.value)}
              className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-green focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Category</label>
              <select
                value={goalCategoryDraft}
                onChange={(e) => setGoalCategoryDraft(e.target.value)}
                className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-green focus:outline-none"
              >
                <option>Academic</option>
                <option>Behavioural</option>
                <option>Emotional</option>
                <option>Career</option>
              </select>
            </div>
            
            <div>
              <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Status</label>
              <select
                value={goalStatusDraft}
                onChange={(e) => setGoalStatusDraft(e.target.value)}
                className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-green focus:outline-none"
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Achieved">Achieved</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Target Date</label>
            <input
              type="date"
              value={goalDateDraft}
              onChange={(e) => setGoalDateDraft(e.target.value)}
              className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-green focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Linked Session / Plan</label>
            <input
              type="text"
              placeholder="e.g. Session 2026-06-14"
              value={goalLinkedDraft}
              onChange={(e) => setGoalLinkedDraft(e.target.value)}
              className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-green focus:outline-none"
            />
          </div>

          <DuoButton type="submit" variant="green" size="sm" className="w-full">
            Add Goal
          </DuoButton>
        </form>
      </div>
    </div>
  );
};
