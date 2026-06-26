import React from "react";
import { ChevronRight } from "lucide-react";
import { Chip } from "@/components/duo";
import { CaseTimeline } from "./CaseTimeline";

interface CaseDetailsPanelProps {
  selectedCase: any;
  mobileShowCaseDetail: boolean;
  setMobileShowCaseDetail: (show: boolean) => void;
  studentObj: any;
  timelineEvents: any[];
  setEditCaseDraft: (draft: any) => void;
  setScheduleAptDraft: (draft: any) => void;
  setOpenModal: (modal: string | null) => void;
  setSelectedStudentId: (id: string) => void;
  setActiveSubTab: (tab: string) => void;
  setActiveTab: (tab: string) => void;
  setCloseCaseNotesDraft: (notes: string) => void;
}

export const CaseDetailsPanel: React.FC<CaseDetailsPanelProps> = ({
  selectedCase,
  mobileShowCaseDetail,
  setMobileShowCaseDetail,
  studentObj,
  timelineEvents,
  setEditCaseDraft,
  setScheduleAptDraft,
  setOpenModal,
  setSelectedStudentId,
  setActiveSubTab,
  setActiveTab,
  setCloseCaseNotesDraft,
}) => {
  if (!selectedCase) {
    return (
      <div className="h-full flex items-center justify-center border border-border rounded-2xl bg-card p-8 text-center text-xs text-muted-foreground">
        Select a case file from the list to view active timelines and details.
      </div>
    );
  }

  const initials = selectedCase.studentName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  // Metrics
  const sessionsLoggedCount = studentObj?.sessionsLog?.length || 0;
  const activeInterventionsCount =
    studentObj?.interventions?.filter((inv: any) => inv.status === "Active").length || 0;
  const openReferralsCount =
    studentObj?.referrals?.filter((ref: any) => ref.status === "Open" || ref.status === "In Progress")
      .length || 0;
  const overdueFollowUpsCount =
    studentObj?.pendingTasks?.filter((t: any) => t.urgency === "overdue").length || 0;

  return (
    <div className={!mobileShowCaseDetail ? "hidden md:block" : "block"}>
      <div className="border border-border rounded-2xl bg-card p-5 space-y-6 shadow-xs">
        {/* Mobile Back Button */}
        <button
          onClick={() => setMobileShowCaseDetail(false)}
          className="flex items-center gap-2 text-xs font-bold text-duo-pink hover:underline md:hidden mb-2"
        >
          <ChevronRight className="size-4 rotate-180" /> Back to Cases List
        </button>

        {/* Case Header Details */}
        <div className="flex justify-between items-start flex-wrap gap-4 pb-4 border-b border-border">
          <div className="flex gap-3">
            <div className="size-12 rounded-full bg-pink-100 text-duo-pink flex items-center justify-center text-sm shrink-0 font-extrabold relative border-2 border-pink-200">
              {selectedCase.avatar && <span className="absolute -top-1 -right-1 text-base">{selectedCase.avatar}</span>}
              <span>{initials}</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-sm font-black text-foreground">{selectedCase.studentName}</h2>
                <span className="text-[10px] font-black bg-pink-100 text-duo-pink px-2 py-0.5 rounded uppercase">
                  {selectedCase.id}
                </span>
                <Chip color={selectedCase.status === "Closed" ? "green" : selectedCase.status === "In Progress" ? "orange" : "blue"}>
                  {selectedCase.status}
                </Chip>
              </div>
              <p className="text-[10px] text-muted-foreground font-bold mt-0.5">
                {studentObj?.grade || "Grade 6"} • Opened Date: {selectedCase.openDate} • Counselor:{" "}
                {selectedCase.assignedCounselor || "Maryam"}
              </p>
            </div>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            <button
              onClick={() => {
                setEditCaseDraft({
                  id: selectedCase.id,
                  category: selectedCase.category,
                  riskLevel: selectedCase.riskLevel,
                  assignedCounselor: selectedCase.assignedCounselor || "Puan Maryam",
                  status: selectedCase.status,
                  notes: selectedCase.notes || selectedCase.summary || "",
                });
                setOpenModal("editCase");
              }}
              className="px-3 py-1.5 text-[10px] font-extrabold bg-muted text-foreground border border-border rounded-xl hover:bg-muted/80 transition cursor-pointer"
            >
              Update Case
            </button>
            <button
              onClick={() => {
                setScheduleAptDraft({
                  date: new Date().toISOString().split("T")[0],
                  time: "10:00 AM",
                  type: "Individual",
                  duration: "45 mins",
                  counselorName: selectedCase.assignedCounselor || "Puan Maryam",
                  notes: "",
                });
                setOpenModal("scheduleSession");
              }}
              className="px-3 py-1.5 text-[10px] font-extrabold bg-duo-blue text-white rounded-xl hover:opacity-90 transition cursor-pointer"
            >
              Schedule Session
            </button>
            <button
              onClick={() => {
                setSelectedStudentId(selectedCase.studentId);
                setActiveSubTab("profile");
                setActiveTab("records");
              }}
              className="px-3 py-1.5 text-[10px] font-extrabold bg-duo-pink text-white rounded-xl hover:opacity-90 transition cursor-pointer"
            >
              View Student Record
            </button>
            {selectedCase.status !== "Closed" && (
              <button
                onClick={() => {
                  setCloseCaseNotesDraft("");
                  setOpenModal("closeCase");
                }}
                className="px-3 py-1.5 text-[10px] font-extrabold bg-duo-green text-white rounded-xl hover:opacity-90 transition cursor-pointer"
              >
                Close Case
              </button>
            )}
          </div>
        </div>

        {/* Six Metric Cards */}
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-3">
          <div className="border border-border p-3 rounded-xl bg-muted/10">
            <span className="text-[9px] font-bold text-muted-foreground uppercase block">Case Type</span>
            <span className="text-xs font-extrabold text-foreground block mt-0.5">{selectedCase.category}</span>
          </div>
          <div className="border border-border p-3 rounded-xl bg-muted/10">
            <span className="text-[9px] font-bold text-muted-foreground uppercase block">Risk Level</span>
            <span
              className={`text-xs font-extrabold block mt-0.5 ${
                selectedCase.riskLevel === "High"
                  ? "text-red-500"
                  : selectedCase.riskLevel === "Medium"
                  ? "text-orange-500"
                  : "text-blue-500"
              }`}
            >
              {selectedCase.riskLevel}
            </span>
          </div>
          <div className="border border-border p-3 rounded-xl bg-muted/10">
            <span className="text-[9px] font-bold text-muted-foreground uppercase block">Sessions Logged</span>
            <span className="text-xs font-extrabold text-foreground block mt-0.5">{sessionsLoggedCount}</span>
          </div>
          <div className="border border-border p-3 rounded-xl bg-muted/10">
            <span className="text-[9px] font-bold text-muted-foreground uppercase block">Active Interventions</span>
            <span className="text-xs font-extrabold text-foreground block mt-0.5">{activeInterventionsCount}</span>
          </div>
          <div className="border border-border p-3 rounded-xl bg-muted/10">
            <span className="text-[9px] font-bold text-muted-foreground uppercase block">Open Referrals</span>
            <span className="text-xs font-extrabold text-foreground block mt-0.5">{openReferralsCount}</span>
          </div>
          <div className="border border-border p-3 rounded-xl bg-muted/10">
            <span className="text-[9px] font-bold text-muted-foreground uppercase block">Overdue Follow-ups</span>
            <span
              className={`text-xs font-extrabold block mt-0.5 ${
                overdueFollowUpsCount > 0 ? "text-red-500 font-black" : "text-foreground"
              }`}
            >
              {overdueFollowUpsCount}
            </span>
          </div>
        </div>

        {/* Timeline Section */}
        <CaseTimeline timelineEvents={timelineEvents} />
      </div>
    </div>
  );
};
