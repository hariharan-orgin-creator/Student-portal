import React from "react";
import { Plus, Search, CheckCircle } from "lucide-react";
import { DuoButton, DuoCard, Chip } from "@/components/duo";

interface InboxReportsTabProps {
  reports: any[];
  reportSearchQuery: string;
  setReportSearchQuery: (query: string) => void;
  handleDismissReport: (id: string) => void;
  handleFileReport: (report: any) => void;
  setReportToView: (report: any | null) => void;
  setNewReportStudentSearch: (search: string) => void;
  setNewReportShowDropdown: (show: boolean) => void;
  setNewReportDraft: (draft: any) => void;
  setOpenModal: (modal: string | null) => void;
}

export const InboxReportsTab: React.FC<InboxReportsTabProps> = ({
  reports,
  reportSearchQuery,
  setReportSearchQuery,
  handleDismissReport,
  handleFileReport,
  setReportToView,
  setNewReportStudentSearch,
  setNewReportShowDropdown,
  setNewReportDraft,
  setOpenModal,
}) => {
  const incomingReports = reports
    .filter((r) => r.status === "New")
    .filter((r) => {
      const q = reportSearchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        r.studentName.toLowerCase().includes(q) ||
        r.reporterName.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      const aUrgent = a.urgency === "High" || a.urgency === "Urgent";
      const bUrgent = b.urgency === "High" || b.urgency === "Urgent";
      if (aUrgent && !bUrgent) return -1;
      if (!aUrgent && bUrgent) return 1;
      const dateA = a.date || "";
      const dateB = b.date || "";
      return dateB.localeCompare(dateA);
    });

  const processedReports = reports
    .filter((r) => r.status !== "New")
    .filter((r) => {
      const q = reportSearchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        r.studentName.toLowerCase().includes(q) ||
        r.reporterName.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      const dateA = a.actionedDate || a.date || "";
      const dateB = b.actionedDate || b.date || "";
      return dateB.localeCompare(dateA);
    });

  return (
    <div className="space-y-6 w-full min-w-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold">Confidential Reports Inbox</h1>
          <p className="text-xs text-muted-foreground font-semibold">
            Assess well-being concerns submitted by teachers or parents.
          </p>
        </div>
        <DuoButton
          variant="purple"
          size="sm"
          onClick={() => {
            setNewReportStudentSearch("");
            setNewReportShowDropdown(false);
            setNewReportDraft({
              studentId: "s1",
              reporterName: "",
              reporterRole: "Teacher",
              description: "",
              urgency: "Normal",
            });
            setOpenModal("newReport");
          }}
        >
          <Plus className="size-4" /> File New Report
        </DuoButton>
      </div>

      {/* Search Bar */}
      <DuoCard className="p-3.5 flex items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by student name, reporter name, or report ID..."
            value={reportSearchQuery}
            onChange={(e) => setReportSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-duo-purple bg-card text-sm font-bold"
          />
        </div>
      </DuoCard>

      {/* Incoming Reports Inbox List */}
      <div className="space-y-4">
        <h2 className="text-xs font-black text-muted-foreground uppercase tracking-wider">
          Incoming Inbox ({incomingReports.length})
        </h2>
        {incomingReports.length === 0 ? (
          <DuoCard className="p-8 border border-border bg-card text-center">
            <CheckCircle className="size-10 text-duo-green mx-auto mb-2" />
            <h2 className="font-display text-lg font-bold">Inbox is Clear!</h2>
            <p className="text-xs text-muted-foreground font-semibold">
              No pending reports match the search criteria.
            </p>
          </DuoCard>
        ) : (
          incomingReports.map((rep) => {
            const isHighUrgency = rep.urgency === "High" || rep.urgency === "Urgent";
            return (
              <DuoCard
                key={rep.id}
                className={`p-4 border-2 bg-card relative overflow-hidden transition-all ${
                  isHighUrgency ? "border-red-400 bg-red-50/10 shadow-sm animate-pulse-slow" : "border-border"
                }`}
              >
                <div className={`absolute top-0 left-0 w-2.5 h-full ${isHighUrgency ? "bg-duo-red" : "bg-duo-purple"}`} />
                
                <div className="flex justify-between items-start mb-2 pl-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-black ${isHighUrgency ? "text-duo-red" : "text-duo-purple"}`}>{rep.id}</span>
                      <Chip color={isHighUrgency ? "red" : "white"}>
                        {isHighUrgency ? "High Urgency" : "Normal Urgency"}
                      </Chip>
                    </div>
                    <div className="text-xs text-muted-foreground font-bold mt-1">
                      Logged by: <span className="text-foreground">{rep.reporterName} ({rep.reporterRole})</span> • {rep.date}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-muted-foreground uppercase">Concern Student:</span>
                    <div className="font-extrabold text-sm text-foreground">{rep.studentName}</div>
                  </div>
                </div>

                <div className="pl-2 py-2 text-xs leading-relaxed font-semibold text-foreground bg-muted/30 rounded-xl border border-border mb-3">
                  {rep.description}
                </div>

                <div className="pl-2 flex justify-end gap-2">
                  <button
                    onClick={() => handleDismissReport(rep.id)}
                    className="px-3 py-1.5 text-xs font-bold bg-muted border border-border rounded-xl text-muted-foreground hover:bg-muted/80 transition"
                  >
                    Dismiss
                  </button>
                  <DuoButton
                    variant="purple"
                    size="sm"
                    onClick={() => handleFileReport(rep)}
                  >
                    File as Active Case File
                  </DuoButton>
                </div>
              </DuoCard>
            );
          })
        )}

        {/* Processed Reports Log */}
        <div className="pt-4 border-t border-border">
          <h3 className="text-xs font-black text-muted-foreground uppercase mb-3">
            Processed Reports Log ({processedReports.length})
          </h3>
          {processedReports.length === 0 ? (
            <div className="text-center py-6 text-xs text-muted-foreground font-bold border-2 border-dashed border-border rounded-xl">
              No actioned reports found.
            </div>
          ) : (
            <DuoCard className="p-4 border border-border bg-card">
              <div className="space-y-2.5">
                {processedReports.map((rep) => {
                  const isFiled = rep.status === "Filed as Case";
                  const isMe =
                    rep.reporterRole === "Counselor" ||
                    rep.reporterName === "Puan Maryam" ||
                    rep.reporterName === "me";
                  const submittedByLabel = isMe
                    ? "submitted by me"
                    : `submitted by ${rep.reporterName}`;

                  return (
                    <div
                      key={rep.id}
                      onClick={() => setReportToView(rep)}
                      className="flex justify-between items-center text-xs p-2.5 border border-border bg-muted/10 rounded-xl hover:bg-muted/30 transition cursor-pointer"
                    >
                      <div>
                        <span className="font-extrabold text-foreground">{rep.studentName}</span>
                        <span className="text-muted-foreground ml-1.5 font-bold">
                          ({rep.id}) • Concern {submittedByLabel}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-muted-foreground font-bold">
                          Actioned: {rep.actionedDate || rep.date}
                        </span>
                        <Chip color={isFiled ? "green" : "white"}>
                          {isFiled ? "Filed as Case" : "Dismissed"}
                        </Chip>
                      </div>
                    </div>
                  );
                })}
              </div>
            </DuoCard>
          )}
        </div>
      </div>
    </div>
  );
};
