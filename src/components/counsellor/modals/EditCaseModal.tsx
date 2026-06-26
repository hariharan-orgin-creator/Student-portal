import React from "react";
import { FolderHeart } from "lucide-react";
import { DuoButton } from "@/components/duo";

interface EditCaseModalProps {
  setOpenModal: (modal: string | null) => void;
  editCaseDraft: any;
  setEditCaseDraft: (draft: any) => void;
  handleUpdateCase: (e: React.FormEvent) => void;
}

export const EditCaseModal: React.FC<EditCaseModalProps> = ({
  setOpenModal,
  editCaseDraft,
  setEditCaseDraft,
  handleUpdateCase,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 overflow-y-auto bg-black/40 backdrop-blur-xs">
      <div className="bg-card w-full max-w-md rounded-2xl border-2 border-border p-5 shadow-2xl animate-pop-in my-auto">
        <div className="flex justify-between items-center pb-3 border-b border-border">
          <h2 className="font-display text-lg font-bold flex items-center gap-1.5 text-duo-pink">
            <FolderHeart className="size-5" /> Update Case: {editCaseDraft.id}
          </h2>
          <button
            onClick={() => {
              setOpenModal(null);
              setEditCaseDraft(null);
            }}
            className="text-muted-foreground hover:text-foreground text-sm font-bold"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleUpdateCase} className="mt-3.5 space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
                Case Type / Category
              </label>
              <select
                value={editCaseDraft.category}
                onChange={(e) => setEditCaseDraft({ ...editCaseDraft, category: e.target.value })}
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
                value={editCaseDraft.riskLevel}
                onChange={(e) => setEditCaseDraft({ ...editCaseDraft, riskLevel: e.target.value })}
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
                value={editCaseDraft.assignedCounselor}
                onChange={(e) =>
                  setEditCaseDraft({ ...editCaseDraft, assignedCounselor: e.target.value })
                }
                className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-pink focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
                Status
              </label>
              <select
                value={editCaseDraft.status}
                onChange={(e) => setEditCaseDraft({ ...editCaseDraft, status: e.target.value })}
                className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-pink focus:outline-none"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
              Case Notes / Summary
            </label>
            <textarea
              required
              value={editCaseDraft.notes}
              onChange={(e) => setEditCaseDraft({ ...editCaseDraft, notes: e.target.value })}
              placeholder="Record case updates, changes in behavior or counseling plan..."
              rows={4}
              className="w-full text-xs bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-pink focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <button
              type="button"
              onClick={() => {
                setOpenModal(null);
                setEditCaseDraft(null);
              }}
              className="px-4 py-2 text-xs font-bold bg-muted border border-border rounded-xl hover:bg-muted/80 text-muted-foreground transition"
            >
              Cancel
            </button>
            <DuoButton type="submit" variant="pink" size="sm">
              Save Changes
            </DuoButton>
          </div>
        </form>
      </div>
    </div>
  );
};
