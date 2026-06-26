import React from "react";
import { FolderHeart } from "lucide-react";

interface CloseCaseModalProps {
  setOpenModal: (modal: string | null) => void;
  closeCaseNotesDraft: string;
  setCloseCaseNotesDraft: (notes: string) => void;
  selectedCaseId: string;
  handleCloseCase: (caseId: string, notes: string) => void;
  setCaseStatusFilter: (status: string) => void;
}

export const CloseCaseModal: React.FC<CloseCaseModalProps> = ({
  setOpenModal,
  closeCaseNotesDraft,
  setCloseCaseNotesDraft,
  selectedCaseId,
  handleCloseCase,
  setCaseStatusFilter,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 overflow-y-auto bg-black/40 backdrop-blur-xs">
      <div className="bg-card w-full max-w-md rounded-2xl border-2 border-border p-5 shadow-2xl animate-pop-in my-auto">
        <div className="flex justify-between items-center pb-3 border-b border-border">
          <h2 className="font-display text-lg font-bold flex items-center gap-1.5 text-duo-green-dark">
            <FolderHeart className="size-5" /> Close Counselling Case File
          </h2>
          <button
            onClick={() => setOpenModal(null)}
            className="text-muted-foreground hover:text-foreground text-sm font-bold"
          >
            ✕
          </button>
        </div>
        
        <div className="mt-3.5 space-y-3.5">
          <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
            Confirming closure will mark this case as **Closed**. It will be archived and moved to the Closed view. Please provide final closure resolution notes.
          </p>
          
          <div>
            <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
              Closure Notes / Final Outcome
            </label>
            <textarea
              required
              value={closeCaseNotesDraft}
              onChange={(e) => setCloseCaseNotesDraft(e.target.value)}
              placeholder="Record the final outcome, copy of parent notification status, and next checkup plans..."
              rows={3}
              className="w-full text-xs bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-green focus:outline-none"
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
            <button
              onClick={() => {
                handleCloseCase(selectedCaseId, closeCaseNotesDraft);
                setCloseCaseNotesDraft("");
                setCaseStatusFilter("Closed");
              }}
              className="px-4 py-2 text-xs font-extrabold uppercase bg-duo-green text-white rounded-xl hover:opacity-90 transition cursor-pointer"
            >
              Confirm Case Closure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
