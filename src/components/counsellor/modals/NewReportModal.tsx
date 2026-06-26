import React, { useState } from "react";
import { Inbox } from "lucide-react";
import { DuoButton } from "@/components/duo";

interface NewReportModalProps {
  setOpenModal: (modal: string | null) => void;
  handleCreateReport: (e: React.FormEvent) => void;
  newReportDraft: any;
  setNewReportDraft: (draft: any) => void;
  students: any[];
}

export const NewReportModal: React.FC<NewReportModalProps> = ({
  setOpenModal,
  handleCreateReport,
  newReportDraft,
  setNewReportDraft,
  students,
}) => {
  const [studentSearch, setStudentSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const selectedStudentName =
    students.find((s) => s.id === newReportDraft.studentId)?.name || "";

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 overflow-y-auto bg-black/40 backdrop-blur-xs">
      <div className="bg-card w-full max-w-md rounded-2xl border-2 border-border p-5 shadow-2xl animate-pop-in my-auto">
        <div className="flex justify-between items-center pb-3 border-b border-border">
          <h2 className="font-display text-lg font-bold flex items-center gap-1.5 text-duo-purple">
            <Inbox className="size-5" /> File Confidential Report
          </h2>
          <button
            onClick={() => setOpenModal(null)}
            className="text-muted-foreground hover:text-foreground text-sm font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleCreateReport} className="mt-3.5 space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
                Reporter Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Cikgu Nadia"
                value={newReportDraft.reporterName}
                onChange={(e) =>
                  setNewReportDraft({ ...newReportDraft, reporterName: e.target.value })
                }
                className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-purple focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
                Reporter Role
              </label>
              <select
                value={newReportDraft.reporterRole}
                onChange={(e) =>
                  setNewReportDraft({ ...newReportDraft, reporterRole: e.target.value })
                }
                className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-purple focus:outline-none"
              >
                <option value="Teacher">Teacher</option>
                <option value="Parent">Parent</option>
                <option value="Counselor">Counselor</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
                Concern Student
              </label>
              <input
                type="text"
                required
                placeholder="Type student name to search..."
                value={showDropdown ? studentSearch : selectedStudentName || studentSearch}
                onChange={(e) => {
                  setStudentSearch(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => {
                  setStudentSearch(selectedStudentName);
                  setShowDropdown(true);
                }}
                className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-purple focus:outline-none"
              />
              {showDropdown && (
                <div className="absolute left-0 right-0 z-50 w-full mt-1 max-h-40 overflow-y-auto bg-card border border-border rounded-xl shadow-lg divide-y divide-border">
                  {students
                    .filter((s) => s.name.toLowerCase().includes(studentSearch.toLowerCase()))
                    .map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          setNewReportDraft({ ...newReportDraft, studentId: s.id });
                          setStudentSearch(s.name);
                          setShowDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-muted/15 font-bold flex items-center gap-2"
                      >
                        <span>{s.avatar}</span>
                        <span>{s.name} ({s.id})</span>
                      </button>
                    ))}
                  {students.filter((s) =>
                    s.name.toLowerCase().includes(studentSearch.toLowerCase())
                  ).length === 0 && (
                    <div className="p-2 text-xs text-muted-foreground text-center">No students found.</div>
                  )}
                </div>
              )}
            </div>
            <div>
              <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
                Urgency
              </label>
              <select
                value={newReportDraft.urgency}
                onChange={(e) =>
                  setNewReportDraft({ ...newReportDraft, urgency: e.target.value })
                }
                className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-purple focus:outline-none"
              >
                <option value="Normal">Normal</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
              Report Narrative Description
            </label>
            <textarea
              required
              value={newReportDraft.description}
              onChange={(e) =>
                setNewReportDraft({ ...newReportDraft, description: e.target.value })
              }
              placeholder="State specific behaviors observed, indicators of distress, withdrawal trends, outbursts..."
              rows={3}
              className="w-full text-xs bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-purple focus:outline-none"
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
            <DuoButton type="submit" variant="purple" size="sm">
              Log Report
            </DuoButton>
          </div>
        </form>
      </div>
    </div>
  );
};
