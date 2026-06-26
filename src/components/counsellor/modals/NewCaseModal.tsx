import React, { useState } from "react";
import { FolderHeart } from "lucide-react";
import { DuoButton } from "@/components/duo";

interface NewCaseModalProps {
  setOpenModal: (modal: string | null) => void;
  handleCreateCase: (e: React.FormEvent) => void;
  students: any[];
  newCaseDraft: any;
  setNewCaseDraft: (draft: any) => void;
}

export const NewCaseModal: React.FC<NewCaseModalProps> = ({
  setOpenModal,
  handleCreateCase,
  students,
  newCaseDraft,
  setNewCaseDraft,
}) => {
  const [studentSearchTerm, setStudentSearchTerm] = useState("");
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);

  const selectedStudentName =
    students.find((s) => s.id === newCaseDraft.studentId)?.name || "";

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 overflow-y-auto bg-black/40 backdrop-blur-xs">
      <div className="bg-card w-full max-w-md rounded-2xl border-2 border-border p-5 shadow-2xl animate-pop-in my-auto">
        <div className="flex justify-between items-center pb-3 border-b border-border">
          <h2 className="font-display text-lg font-bold flex items-center gap-1.5 text-duo-pink">
            <FolderHeart className="size-5" /> Open Counselling Case File
          </h2>
          <button
            onClick={() => setOpenModal(null)}
            className="text-muted-foreground hover:text-foreground text-sm font-bold"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleCreateCase} className="mt-3.5 space-y-3.5">
          {/* Searchable Student Dropdown */}
          <div>
            <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
              Student (Search & Select)
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Type to search student name..."
                value={showStudentDropdown ? studentSearchTerm : selectedStudentName || studentSearchTerm}
                onChange={(e) => {
                  setStudentSearchTerm(e.target.value);
                  setShowStudentDropdown(true);
                }}
                onFocus={() => {
                  setStudentSearchTerm(selectedStudentName);
                  setShowStudentDropdown(true);
                }}
                className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-pink focus:outline-none"
              />
              {showStudentDropdown && (
                <div className="absolute left-0 right-0 z-50 w-full mt-1 max-h-40 overflow-y-auto bg-card border border-border rounded-xl shadow-lg p-1 space-y-0.5">
                  {students
                    .filter((s) => s.name.toLowerCase().includes(studentSearchTerm.toLowerCase()))
                    .map((s) => (
                      <div
                        key={s.id}
                        onClick={() => {
                          setNewCaseDraft({ ...newCaseDraft, studentId: s.id });
                          setStudentSearchTerm(s.name);
                          setShowStudentDropdown(false);
                        }}
                        className="p-2 text-xs font-bold hover:bg-muted rounded-lg cursor-pointer flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <span>{s.avatar}</span>
                          <span>{s.name}</span>
                        </span>
                        <span className="text-[10px] text-muted-foreground font-semibold">{s.grade}</span>
                      </div>
                    ))}
                  {students.filter((s) =>
                    s.name.toLowerCase().includes(studentSearchTerm.toLowerCase())
                  ).length === 0 && (
                    <div className="p-2 text-xs text-muted-foreground text-center">No students found.</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
                Case Type / Category
              </label>
              <select
                value={newCaseDraft.category}
                onChange={(e) => setNewCaseDraft({ ...newCaseDraft, category: e.target.value })}
                className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-pink focus:outline-none"
              >
                <option value="Behaviour">Behaviour</option>
                <option value="Academic">Academic</option>
                <option value="Emotional">Emotional</option>
                <option value="Career">Career</option>
                <option value="Referral">Referral</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
                Risk Level
              </label>
              <select
                value={newCaseDraft.riskLevel}
                onChange={(e) => setNewCaseDraft({ ...newCaseDraft, riskLevel: e.target.value })}
                className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-pink focus:outline-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
                Assigned Counselor
              </label>
              <input
                type="text"
                required
                value={newCaseDraft.assignedCounselor}
                onChange={(e) =>
                  setNewCaseDraft({ ...newCaseDraft, assignedCounselor: e.target.value })
                }
                className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-pink focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
                Opening Date
              </label>
              <input
                type="date"
                required
                value={newCaseDraft.openDate}
                onChange={(e) => setNewCaseDraft({ ...newCaseDraft, openDate: e.target.value })}
                className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-pink focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
              Initial Notes
            </label>
            <textarea
              required
              value={newCaseDraft.notes}
              onChange={(e) => setNewCaseDraft({ ...newCaseDraft, notes: e.target.value })}
              placeholder="Summarize the primary concern, referral cause, and action plan..."
              rows={3}
              className="w-full text-xs bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-pink focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <button
              type="button"
              onClick={() => setOpenModal(null)}
              className="px-4 py-2 text-xs font-bold bg-muted border border-border rounded-xl hover:bg-muted/80 text-muted-foreground transition"
            >
              Cancel
            </button>
            <DuoButton type="submit" variant="pink" size="sm">
              Create Case File
            </DuoButton>
          </div>
        </form>
      </div>
    </div>
  );
};
