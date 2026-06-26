import React from "react";
import { UserCheck, AlertOctagon, BookmarkCheck } from "lucide-react";
import { DuoCard } from "@/components/duo";

interface IncidentDetailsProps {
  selectedIncident: any;
  cases: any[];
  disciplineIncidents: any[];
  linkCaseSearch: string;
  setLinkCaseSearch: (query: string) => void;
  showLinkCaseDropdown: boolean;
  setShowLinkCaseDropdown: (show: boolean) => void;
  handleLinkIncidentToCase: (incidentId: string, caseId: string) => void;
  handleCreateCaseFromIncident: (incident: any) => void;
  setIncidentToReview: (incident: any | null) => void;
  handleViewStudentRecord: (studentId: string) => void;
  setActiveTab: (tab: string) => void;
  setSelectedCaseId: (caseId: string) => void;
  setMobileShowCaseDetail: (show: boolean) => void;
}

export const IncidentDetails: React.FC<IncidentDetailsProps> = ({
  selectedIncident,
  cases,
  disciplineIncidents,
  linkCaseSearch,
  setLinkCaseSearch,
  showLinkCaseDropdown,
  setShowLinkCaseDropdown,
  handleLinkIncidentToCase,
  handleCreateCaseFromIncident,
  setIncidentToReview,
  handleViewStudentRecord,
  setActiveTab,
  setSelectedCaseId,
  setMobileShowCaseDetail,
}) => {
  if (!selectedIncident) {
    return (
      <DuoCard className="p-5 border border-border bg-card flex flex-col justify-center items-center min-h-[500px]">
        <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground my-auto py-12">
          <AlertOctagon className="size-12 text-muted/50 mb-3" />
          <p className="text-sm font-bold">No incident selected</p>
          <p className="text-xs mt-1">Select an incident from the feed to view history and actions.</p>
        </div>
      </DuoCard>
    );
  }

  const studentOpenCases = cases.filter(
    (c) => c.studentId === selectedIncident.studentId && c.status !== "Closed"
  );
  const filteredOpenCases = studentOpenCases.filter(
    (c) =>
      c.id.toLowerCase().includes(linkCaseSearch.toLowerCase()) ||
      c.category.toLowerCase().includes(linkCaseSearch.toLowerCase())
  );
  const isNew = selectedIncident.status === "New";

  const studentHistoryIncidents = disciplineIncidents
    .filter((i) => i.studentId === selectedIncident.studentId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <DuoCard className="p-5 border border-border bg-card flex flex-col justify-between min-h-[500px]">
      <div className="space-y-5">
        {/* Title Header */}
        <div className="pb-3 border-b border-border">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-muted-foreground">
              {selectedIncident.id}
            </span>
            <span className="px-2 py-0.5 text-[9px] font-bold bg-orange-50 text-duo-orange border border-orange-100 rounded-full">
              Synced Demerit
            </span>
          </div>
          <h3 className="font-display text-lg font-black text-foreground mt-1 flex items-center gap-1.5">
            {selectedIncident.avatar} {selectedIncident.studentName}
          </h3>
          <div className="text-[10px] text-muted-foreground font-semibold mt-1">
            {selectedIncident.grade} • Reported by {selectedIncident.loggedBy} ({selectedIncident.reporterRole}) on {selectedIncident.date}
          </div>
        </div>

        {/* Details Content */}
        <div className="space-y-4 text-xs">
          <div>
            <span className="font-extrabold text-muted-foreground uppercase text-[9px] block tracking-wider">
              Incident Type
            </span>
            <span className="mt-1 inline-block px-2.5 py-1 font-bold bg-blue-50 text-blue-700 border border-blue-200 rounded-lg">
              {selectedIncident.type}
            </span>
          </div>

          <div>
            <span className="font-extrabold text-muted-foreground uppercase text-[9px] block tracking-wider">
              Full Incident Description
            </span>
            <div className="mt-1 bg-muted/30 border border-border p-3 rounded-xl leading-relaxed text-foreground font-medium">
              {selectedIncident.description}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-extrabold text-muted-foreground uppercase text-[9px] block tracking-wider">
                Administrative Action
              </span>
              <span className="mt-1 inline-block px-2 py-0.5 font-bold uppercase tracking-wider text-[10px] bg-amber-50 text-amber-700 border border-amber-200 rounded-full">
                {selectedIncident.adminAction}
              </span>
            </div>
            <div>
              <span className="font-extrabold text-muted-foreground uppercase text-[9px] block tracking-wider">
                Counselling Sync
              </span>
              {selectedIncident.status === "Linked" ? (
                <span className="mt-1 inline-block px-2 py-0.5 font-bold text-[10px] bg-green-50 text-duo-green-dark border border-green-200 rounded-full">
                  Linked: {selectedIncident.counsellingCaseId}
                </span>
              ) : (
                <span className="mt-1 inline-block px-2 py-0.5 font-bold text-[10px] bg-slate-50 text-slate-500 border border-border rounded-full">
                  {selectedIncident.status === "Reviewed" ? "Reviewed" : "Not Linked Yet"}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Actions Panels for Counselor */}
        <div className="pt-2 border-t border-border space-y-3">
          <span className="font-extrabold text-muted-foreground uppercase text-[9px] block tracking-wider mb-2">
            Available Actions
          </span>
          
          {isNew ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Link to Existing Case Dropdown Toggle */}
              <div className="relative">
                <button
                  onClick={() => setShowLinkCaseDropdown(!showLinkCaseDropdown)}
                  className="w-full py-2 px-3 text-xs font-bold text-center border-2 border-border bg-card rounded-xl hover:border-duo-blue hover:text-duo-blue transition"
                >
                  🔗 Link to Existing Case
                </button>

                {showLinkCaseDropdown && (
                  <div className="absolute right-0 bottom-full mb-2 z-30 w-64 bg-card border-2 border-border p-3.5 rounded-2xl shadow-xl space-y-2">
                    <span className="font-bold text-[10px] text-foreground block">
                      Select Student's Open Case
                    </span>
                    <input
                      type="text"
                      placeholder="Search cases..."
                      value={linkCaseSearch}
                      onChange={(e) => setLinkCaseSearch(e.target.value)}
                      className="w-full px-2 py-1 border border-border bg-card rounded-lg text-xs"
                    />
                    <div className="max-h-32 overflow-y-auto space-y-1">
                      {filteredOpenCases.length === 0 ? (
                        <div className="text-[10px] text-muted-foreground py-1 text-center">
                          No open cases found
                        </div>
                      ) : (
                        filteredOpenCases.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => handleLinkIncidentToCase(selectedIncident.id, c.id)}
                            className="w-full text-left px-2 py-1 text-[11px] font-semibold hover:bg-muted rounded-md border border-transparent hover:border-border transition block"
                          >
                            <span className="font-bold text-duo-blue">{c.id}</span> - {c.category}
                          </button>
                        ))
                      )}
                    </div>
                    <button
                      onClick={() => setShowLinkCaseDropdown(false)}
                      className="w-full text-center text-[10px] font-bold text-muted-foreground hover:text-foreground pt-1"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleCreateCaseFromIncident(selectedIncident)}
                className="w-full py-2 px-3 text-xs font-bold bg-duo-pink text-white rounded-xl hover:opacity-90 transition text-center"
              >
                ➕ Create New Case
              </button>
              
              <button
                onClick={() => setIncidentToReview(selectedIncident)}
                className="w-full py-2 px-3 text-xs font-bold border-2 border-border text-muted-foreground rounded-xl hover:bg-muted/30 transition text-center sm:col-span-2"
              >
                ✓ Mark as Reviewed
              </button>
            </div>
          ) : selectedIncident.status === "Linked" ? (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setActiveTab("cases");
                  setSelectedCaseId(selectedIncident.counsellingCaseId);
                  setMobileShowCaseDetail(true);
                }}
                className="flex-1 py-2 px-3 text-xs font-bold border-2 border-duo-green text-duo-green-dark bg-green-50/10 rounded-xl hover:bg-green-50/20 transition text-center"
              >
                👁 View Linked Case ({selectedIncident.counsellingCaseId})
              </button>
            </div>
          ) : (
            <div className="p-3 bg-muted/40 rounded-xl border border-border text-[11px] font-bold text-muted-foreground text-center">
              Reviewed and cleared. No further action needed.
            </div>
          )}

          {/* View Student Profile Action */}
          <button
            onClick={() => handleViewStudentRecord(selectedIncident.studentId)}
            className="w-full py-2 px-3 text-xs font-bold border-2 border-border bg-card rounded-xl hover:bg-muted/40 transition text-center flex items-center justify-center gap-1.5"
          >
            <UserCheck className="size-3.5 text-duo-purple" /> View Student Records
          </button>
        </div>

        {/* Student Demerit History Timeline */}
        <div className="pt-4 border-t border-border">
          <span className="font-extrabold text-muted-foreground uppercase text-[9px] block tracking-wider mb-3">
            Discipline History Timeline
          </span>
          <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
            {studentHistoryIncidents.map((histInc) => {
              let dotColor = "bg-slate-400";
              if (histInc.status === "New") dotColor = "bg-duo-red animate-pulse";
              else if (histInc.status === "Linked") dotColor = "bg-duo-green";

              return (
                <div key={histInc.id} className="flex gap-3 text-xs items-start">
                  <div className="mt-1 flex flex-col items-center shrink-0">
                    <div className={`size-2.5 rounded-full ${dotColor}`} />
                    <div className="w-0.5 h-8 bg-border" />
                  </div>
                  <div className="flex-1 pb-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-foreground text-[11px]">
                        {histInc.id} ({histInc.type})
                      </span>
                      <span className="text-[9px] text-muted-foreground font-semibold">
                        {histInc.date}
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">
                      {histInc.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DuoCard>
  );
};
