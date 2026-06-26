import React from "react";
import { Inbox } from "lucide-react";
import { Chip } from "@/components/duo";

interface ViewReportModalProps {
  reportToView: any | null;
  setReportToView: (report: any | null) => void;
}

export const ViewReportModal: React.FC<ViewReportModalProps> = ({
  reportToView,
  setReportToView,
}) => {
  if (!reportToView) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 overflow-y-auto bg-black/40 backdrop-blur-xs">
      <div className="bg-card w-full max-w-md rounded-2xl border-2 border-border p-5 shadow-2xl animate-pop-in space-y-4 my-auto">
        <div className="flex justify-between items-center pb-3 border-b border-border">
          <h2 className="font-display text-lg font-bold flex items-center gap-1.5 text-foreground">
            <Inbox className="size-5 text-duo-purple" /> Report Detail: {reportToView.id}
          </h2>
          <button
            onClick={() => setReportToView(null)}
            className="text-muted-foreground hover:text-foreground text-sm font-bold"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-3.5 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-muted-foreground font-bold block uppercase text-[10px]">Concern Student</span>
              <span className="font-extrabold text-foreground text-sm">{reportToView.studentName}</span>
            </div>
            <div>
              <span className="text-muted-foreground font-bold block uppercase text-[10px]">Urgency</span>
              <Chip color={reportToView.urgency === "High" || reportToView.urgency === "Urgent" ? "red" : "white"}>
                {reportToView.urgency} Urgency
              </Chip>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-muted-foreground font-bold block uppercase text-[10px]">Reporter</span>
              <span className="font-extrabold text-foreground">{reportToView.reporterName} ({reportToView.reporterRole})</span>
            </div>
            <div>
              <span className="text-muted-foreground font-bold block uppercase text-[10px]">Date Logged</span>
              <span className="font-extrabold text-foreground">{reportToView.date}</span>
            </div>
          </div>

          <div>
            <span className="text-muted-foreground font-bold block uppercase text-[10px]">Narrative Description</span>
            <p className="p-3 rounded-xl border border-border bg-muted/20 leading-relaxed text-foreground font-medium mt-1">
              {reportToView.description}
            </p>
          </div>

          <div className="border-t border-border pt-3 flex justify-between items-center text-[10px] font-bold text-muted-foreground">
            <div>
              Action Status:{" "}
              <Chip color={reportToView.status === "Filed as Case" ? "green" : "white"}>
                {reportToView.status}
              </Chip>
            </div>
            <div>Actioned on: {reportToView.actionedDate || reportToView.date}</div>
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-border">
          <button
            onClick={() => setReportToView(null)}
            className="px-4 py-2 text-xs font-bold bg-muted border border-border rounded-xl hover:bg-muted/80 text-muted-foreground transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
