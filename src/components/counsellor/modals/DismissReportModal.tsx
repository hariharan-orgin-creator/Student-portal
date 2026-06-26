import React from "react";
import { AlertTriangle } from "lucide-react";

interface DismissReportModalProps {
  reportToDismiss: any | null;
  setReportToDismiss: (report: any | null) => void;
  confirmDismiss: () => void;
}

export const DismissReportModal: React.FC<DismissReportModalProps> = ({
  reportToDismiss,
  setReportToDismiss,
  confirmDismiss,
}) => {
  if (!reportToDismiss) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 overflow-y-auto bg-black/40 backdrop-blur-xs">
      <div className="bg-card w-full max-w-md rounded-2xl border-2 border-border p-5 shadow-2xl animate-pop-in my-auto">
        <div className="flex justify-between items-center pb-3 border-b border-border">
          <h2 className="font-display text-lg font-bold text-duo-red flex items-center gap-1.5">
            <AlertTriangle className="size-5" /> Dismiss Report
          </h2>
          <button
            onClick={() => setReportToDismiss(null)}
            className="text-muted-foreground hover:text-foreground text-sm font-bold"
          >
            ✕
          </button>
        </div>
        <div className="mt-3.5 space-y-3.5">
          <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
            Are you sure you want to dismiss this report? This cannot be undone.
          </p>
          <div className="p-3 bg-muted/30 rounded-xl border border-border text-xs">
            <div className="font-bold text-foreground">Report ID: {reportToDismiss.id}</div>
            <div className="mt-1 font-bold text-foreground">Student: {reportToDismiss.studentName}</div>
            <div className="mt-1 text-muted-foreground font-medium">{reportToDismiss.description}</div>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <button
              type="button"
              onClick={() => setReportToDismiss(null)}
              className="px-4 py-2 text-xs font-bold bg-muted border border-border rounded-xl hover:bg-muted/80 text-muted-foreground transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmDismiss}
              className="px-4 py-2 text-xs font-extrabold uppercase bg-duo-red text-white rounded-xl hover:opacity-90 transition"
            >
              Confirm Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
