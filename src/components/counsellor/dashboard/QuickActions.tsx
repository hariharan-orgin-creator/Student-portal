import { DuoCard } from "@/components/duo";
import { Plus, Inbox, FolderHeart } from "lucide-react";

interface QuickActionsProps {
  setActiveTab: (tab: string) => void;
  setActiveSubTab: (subTab: string) => void;
  setOpenModal: (modal: string | null) => void;
  setStudentSearchTerm: (term: string) => void;
  setShowStudentDropdown: (show: boolean) => void;
  setNewCaseDraft: (draft: any) => void;
}

export function QuickActions({
  setActiveTab,
  setActiveSubTab,
  setOpenModal,
  setStudentSearchTerm,
  setShowStudentDropdown,
  setNewCaseDraft,
}: Readonly<QuickActionsProps>) {
  return (
    <DuoCard className="border border-border p-4 bg-card shadow-xs">
      <h2 className="font-display text-xs font-extrabold text-foreground mb-3 uppercase tracking-wider">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => {
            setActiveTab("records");
            setActiveSubTab("sessions");
          }}
          className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-border bg-card p-4 text-xs font-bold text-center transition hover:-translate-y-0.5 hover:border-duo-pink group"
        >
          <Plus className="size-6 text-duo-pink group-hover:scale-110 transition" />
          <span>Log New Session</span>
        </button>

        <button
          onClick={() => setOpenModal("newReport")}
          className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-border bg-card p-4 text-xs font-bold text-center transition hover:-translate-y-0.5 hover:border-duo-purple group"
        >
          <Inbox className="size-6 text-duo-purple group-hover:scale-110 transition" />
          <span>File New Report</span>
        </button>
        <button
          onClick={() => {
            setStudentSearchTerm("");
            setShowStudentDropdown(false);
            setNewCaseDraft({
              studentId: "s1",
              category: "Academic",
              riskLevel: "Medium",
              summary: "",
              assignedCounselor: "Puan Maryam",
              openDate: new Date().toISOString().split("T")[0],
              notes: "",
            });
            setOpenModal("newCase");
          }}
          className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-border bg-card p-4 text-xs font-bold text-center transition hover:-translate-y-0.5 hover:border-duo-green group"
        >
          <FolderHeart className="size-6 text-duo-green group-hover:scale-110 transition" />
          <span>Open New Case</span>
        </button>
      </div>
    </DuoCard>
  );
}
