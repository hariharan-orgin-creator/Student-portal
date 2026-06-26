import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { DuoButton, Chip } from "@/components/duo";

interface ReferralsSubTabProps {
  selectedStudent: any;
  students: any[];
  saveState: (updatedData: any) => void;
}

export const ReferralsSubTab: React.FC<ReferralsSubTabProps> = ({
  selectedStudent,
  students,
  saveState,
}) => {
  const [referralSourceDraft, setReferralSourceDraft] = useState("Teacher");
  const [referralDateDraft, setReferralDateDraft] = useState("");
  const [referralUrgencyDraft, setReferralUrgencyDraft] = useState("Medium");
  const [referralStatusDraft, setReferralStatusDraft] = useState("Open");
  const [referralReasonDraft, setReferralReasonDraft] = useState("");
  const [referralNotesDraft, setReferralNotesDraft] = useState("");
  const [actionNotesDraft, setActionNotesDraft] = useState("");

  const handleAddReferral = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referralReasonDraft.trim()) return;

    const newReferral = {
      id: `r-${Date.now()}`,
      whoReferred: referralSourceDraft,
      reason: referralReasonDraft,
      dateSubmitted: referralDateDraft || new Date().toISOString().split("T")[0],
      urgency: referralUrgencyDraft as any,
      status: referralStatusDraft as any,
      notes: referralNotesDraft.trim()
        ? `[${new Date().toISOString().split("T")[0]}] Notes: ${referralNotesDraft}`
        : "",
    };

    const updatedStudents = students.map((stud) => {
      if (stud.id === selectedStudent.id) {
        return {
          ...stud,
          lastActivityDate: newReferral.dateSubmitted,
          referrals: [newReferral, ...(stud.referrals || [])],
        };
      }
      return stud;
    });

    saveState({ students: updatedStudents });

    setReferralSourceDraft("Teacher");
    setReferralDateDraft("");
    setReferralUrgencyDraft("Medium");
    setReferralStatusDraft("Open");
    setReferralReasonDraft("");
    setReferralNotesDraft("");
  };

  const handleUpdateReferral = (
    referralId: string,
    nextStatus: "Open" | "In Progress" | "Closed"
  ) => {
    const updatedStudents = students.map((stud) => {
      if (stud.id === selectedStudent.id) {
        const updatedReferrals = (stud.referrals || []).map((ref: any) => {
          if (ref.id === referralId) {
            const notesAppend = actionNotesDraft.trim()
              ? `\n[${new Date().toISOString().split("T")[0]}] Notes: ${actionNotesDraft}`
              : "";
            return {
              ...ref,
              status: nextStatus,
              notes: (ref.notes || "") + notesAppend,
            };
          }
          return ref;
        });
        return {
          ...stud,
          lastActivityDate: new Date().toISOString().split("T")[0],
          referrals: updatedReferrals,
        };
      }
      return stud;
    });

    saveState({ students: updatedStudents });
    setActionNotesDraft("");
  };

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_280px]">
      <div className="space-y-4">
        <h4 className="text-xs font-extrabold text-muted-foreground uppercase tracking-wide">Student Referrals</h4>
        <div className="space-y-3">
          {!selectedStudent.referrals || selectedStudent.referrals.length === 0 ? (
            <p className="text-xs text-muted-foreground py-6 text-center border-2 border-dashed border-border rounded-xl">
              No referrals linked to this student record.
            </p>
          ) : (
            selectedStudent.referrals.map((ref: any) => (
              <div key={ref.id} className="border border-border rounded-xl p-4 bg-card relative overflow-hidden space-y-3 shadow-xs">
                <div className="absolute top-0 left-0 w-2 h-full bg-duo-purple" />
                
                <div className="flex justify-between items-start flex-wrap gap-2 pl-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-extrabold text-duo-purple">REF: {ref.id}</span>
                      <span className="text-[10px] font-extrabold uppercase bg-purple-100 text-duo-purple px-2 py-0.5 rounded">
                        Source: {ref.whoReferred}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-semibold">Submitted: {ref.dateSubmitted}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <Chip color={ref.urgency === "High" ? "red" : ref.urgency === "Medium" ? "orange" : "blue"}>
                      {ref.urgency} Urgency
                    </Chip>
                    <Chip color={ref.status === "Closed" ? "green" : ref.status === "In Progress" ? "orange" : "blue"}>
                      Status: {ref.status}
                    </Chip>
                  </div>
                </div>

                <div className="pl-2 space-y-1">
                  <span className="block text-[10px] font-bold text-muted-foreground uppercase">Referral Reason</span>
                  <div className="text-xs font-semibold text-foreground bg-muted/30 p-2.5 rounded-xl border border-border break-words whitespace-normal leading-relaxed">
                    {ref.reason}
                  </div>
                </div>

                {ref.notes && (
                  <div className="pl-2 text-xs text-foreground/80 font-medium">
                    <span className="font-extrabold text-duo-purple block mb-1 text-[10px] uppercase">Counselor Response Log:</span>
                    <p className="whitespace-pre-wrap leading-relaxed font-semibold bg-purple-50/20 p-2.5 rounded-xl border border-purple-100/50">
                      {ref.notes}
                    </p>
                  </div>
                )}

                {ref.status !== "Closed" && (
                  <div className="pl-2 border-t border-muted pt-3 flex flex-col md:flex-row md:items-center gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Add notes for actionTaken / closing review..."
                        value={actionNotesDraft}
                        onChange={(e) => setActionNotesDraft(e.target.value)}
                        className="w-full text-xs bg-card border border-border rounded-xl p-2 focus:ring-2 focus:ring-duo-purple focus:outline-none"
                      />
                    </div>
                    <div className="flex gap-2 justify-end shrink-0">
                      <button
                        onClick={() => handleUpdateReferral(ref.id, "In Progress")}
                        className="px-3 py-1.5 text-[10px] font-extrabold uppercase bg-duo-orange text-white rounded-xl hover:opacity-90 transition cursor-pointer"
                      >
                        Accept/Action
                      </button>
                      <button
                        onClick={() => handleUpdateReferral(ref.id, "Closed")}
                        className="px-3 py-1.5 text-[10px] font-extrabold uppercase bg-duo-green text-white rounded-xl hover:opacity-90 transition cursor-pointer"
                      >
                        Close Referral
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="border border-purple-100 rounded-2xl bg-[oklch(0.99_0.002_295)] p-4 h-fit space-y-3">
        <h4 className="text-xs font-bold text-duo-purple flex items-center gap-1.5">
          <PlusCircle className="size-4" /> Add Referral
        </h4>
        <form onSubmit={handleAddReferral} className="space-y-3">
          <div>
            <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Referral Source</label>
            <select
              value={referralSourceDraft}
              onChange={(e) => setReferralSourceDraft(e.target.value)}
              className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-purple focus:outline-none"
            >
              <option value="Teacher">Teacher</option>
              <option value="Parent">Parent</option>
              <option value="Self">Self</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Urgency Level</label>
              <select
                value={referralUrgencyDraft}
                onChange={(e) => setReferralUrgencyDraft(e.target.value)}
                className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-purple focus:outline-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Status</label>
              <select
                value={referralStatusDraft}
                onChange={(e) => setReferralStatusDraft(e.target.value)}
                className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-purple focus:outline-none"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Date Submitted</label>
            <input
              type="date"
              value={referralDateDraft}
              onChange={(e) => setReferralDateDraft(e.target.value)}
              className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-purple focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Referral Reason</label>
            <textarea
              required
              value={referralReasonDraft}
              onChange={(e) => setReferralReasonDraft(e.target.value)}
              placeholder="Explain why the student is being referred..."
              rows={3}
              className="w-full text-xs bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-purple focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Initial Response Notes (Opt)</label>
            <input
              type="text"
              placeholder="e.g. Initial consultation scheduled"
              value={referralNotesDraft}
              onChange={(e) => setReferralNotesDraft(e.target.value)}
              className="w-full text-xs bg-card border border-border rounded-xl p-2 focus:ring-2 focus:ring-duo-purple focus:outline-none"
            />
          </div>

          <DuoButton type="submit" variant="purple" size="sm" className="w-full">
            Add Referral Record
          </DuoButton>
        </form>
      </div>
    </div>
  );
};
