import React from "react";
import { Plus, Search } from "lucide-react";
import { DuoCard, DuoButton } from "@/components/duo";
import { CasesListSidebar } from "./CasesListSidebar";
import { CaseDetailsPanel } from "./CaseDetailsPanel";

interface CaseManagerTabProps {
  cases: any[];
  students: any[];
  selectedCaseId: string;
  setSelectedCaseId: (id: string) => void;
  caseSearch: string;
  setCaseSearch: (query: string) => void;
  caseStatusFilter: string;
  setCaseStatusFilter: (filter: string) => void;
  caseRiskFilter: string;
  setCaseRiskFilter: (filter: string) => void;
  mobileShowCaseDetail: boolean;
  setMobileShowCaseDetail: (show: boolean) => void;
  getTimelineEvents: (caseObj: any) => any[];
  setEditCaseDraft: (draft: any) => void;
  setScheduleAptDraft: (draft: any) => void;
  setOpenModal: (modal: string | null) => void;
  setSelectedStudentId: (id: string) => void;
  setActiveSubTab: (tab: string) => void;
  setActiveTab: (tab: string) => void;
  setCloseCaseNotesDraft: (notes: string) => void;
  setNewCaseDraft: (draft: any) => void;
}

export const CaseManagerTab: React.FC<CaseManagerTabProps> = ({
  cases,
  students,
  selectedCaseId,
  setSelectedCaseId,
  caseSearch,
  setCaseSearch,
  caseStatusFilter,
  setCaseStatusFilter,
  caseRiskFilter,
  setCaseRiskFilter,
  mobileShowCaseDetail,
  setMobileShowCaseDetail,
  getTimelineEvents,
  setEditCaseDraft,
  setScheduleAptDraft,
  setOpenModal,
  setSelectedStudentId,
  setActiveSubTab,
  setActiveTab,
  setCloseCaseNotesDraft,
  setNewCaseDraft,
}) => {
  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.studentName.toLowerCase().includes(caseSearch.toLowerCase()) ||
      c.id.toLowerCase().includes(caseSearch.toLowerCase());
    const matchesStatus = caseStatusFilter === "All" || c.status === caseStatusFilter;
    const matchesRisk = caseRiskFilter === "All" || c.riskLevel === caseRiskFilter;
    return matchesSearch && matchesStatus && matchesRisk;
  });

  const sortedCases = [...filteredCases].sort((a, b) => {
    const aStudent = students.find((s) => s.id === a.studentId);
    const bStudent = students.find((s) => s.id === b.studentId);
    const aDate = aStudent?.lastActivityDate || a.lastSessionDate || a.openDate;
    const bDate = bStudent?.lastActivityDate || b.lastSessionDate || b.openDate;
    return new Date(bDate).getTime() - new Date(aDate).getTime();
  });

  const totalCases = filteredCases.length;
  const openCases = filteredCases.filter((c) => c.status === "Open").length;
  const inProgressCases = filteredCases.filter((c) => c.status === "In Progress").length;
  const closedCases = filteredCases.filter((c) => c.status === "Closed").length;

  const selectedCase = sortedCases.find((c) => c.id === selectedCaseId) || sortedCases[0];

  const studentObj = selectedCase
    ? students.find((s) => s.id === selectedCase.studentId)
    : null;
  const timelineEvents = selectedCase ? getTimelineEvents(selectedCase) : [];

  return (
    <div className="space-y-6 w-full min-w-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold">Case Manager</h1>
          <p className="text-xs text-muted-foreground">
            Monitor ongoing counselling cases, active interventions, and timelines.
          </p>
        </div>
        <DuoButton
          variant="pink"
          size="sm"
          onClick={() => {
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
        >
          <Plus className="size-4" /> Open New Case
        </DuoButton>
      </div>

      {/* Summary Stats Bar */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-border p-4 bg-card flex flex-col justify-between shadow-xs">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Total Cases</span>
          <span className="text-2xl font-black text-foreground mt-1">{totalCases}</span>
        </div>
        <div className="rounded-2xl border border-red-100 p-4 bg-[oklch(0.99_0.002_20)] flex flex-col justify-between shadow-xs">
          <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">Open Cases</span>
          <span className="text-2xl font-black text-red-600 mt-1">{openCases}</span>
        </div>
        <div className="rounded-2xl border border-orange-100 p-4 bg-[oklch(0.99_0.002_45)] flex flex-col justify-between shadow-xs">
          <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">In Progress</span>
          <span className="text-2xl font-black text-orange-600 mt-1">{inProgressCases}</span>
        </div>
        <div className="rounded-2xl border border-green-100 p-4 bg-[oklch(0.99_0.002_145)] flex flex-col justify-between shadow-xs">
          <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">Closed This Term</span>
          <span className="text-2xl font-black text-green-600 mt-1">{closedCases}</span>
        </div>
      </div>

      {/* Search & Filters */}
      <DuoCard className="p-3.5 flex flex-col md:flex-row gap-3 items-center">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by case ID or student name..."
            value={caseSearch}
            onChange={(e) => setCaseSearch(e.target.value)}
            className="w-full pl-9 text-xs bg-muted/55 border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-pink focus:outline-none"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select
            value={caseStatusFilter}
            onChange={(e) => setCaseStatusFilter(e.target.value)}
            className="text-xs font-bold bg-muted/65 border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-pink focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
          <select
            value={caseRiskFilter}
            onChange={(e) => setCaseRiskFilter(e.target.value)}
            className="text-xs font-bold bg-muted/65 border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-pink focus:outline-none"
          >
            <option value="All">All Risks</option>
            <option value="Low">Low Risk</option>
            <option value="Medium">Medium Risk</option>
            <option value="High">High Risk</option>
          </select>
        </div>
      </DuoCard>

      {/* Main Content Layout */}
      <div className="grid gap-6 md:grid-cols-[320px_1fr] w-full min-w-0">
        <CasesListSidebar
          sortedCases={sortedCases}
          selectedCaseId={selectedCase ? selectedCase.id : null}
          setSelectedCaseId={setSelectedCaseId}
          setMobileShowCaseDetail={setMobileShowCaseDetail}
          students={students}
          mobileShowCaseDetail={mobileShowCaseDetail}
        />

        <CaseDetailsPanel
          selectedCase={selectedCase}
          mobileShowCaseDetail={mobileShowCaseDetail}
          setMobileShowCaseDetail={setMobileShowCaseDetail}
          studentObj={studentObj}
          timelineEvents={timelineEvents}
          setEditCaseDraft={setEditCaseDraft}
          setScheduleAptDraft={setScheduleAptDraft}
          setOpenModal={setOpenModal}
          setSelectedStudentId={setSelectedStudentId}
          setActiveSubTab={setActiveSubTab}
          setActiveTab={setActiveTab}
          setCloseCaseNotesDraft={setCloseCaseNotesDraft}
        />
      </div>
    </div>
  );
};
