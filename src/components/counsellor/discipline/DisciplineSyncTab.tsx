import React from "react";
import { AlertOctagon } from "lucide-react";
import { DisciplineFilters } from "./DisciplineFilters";
import { IncidentsList } from "./IncidentsList";
import { IncidentDetails } from "./IncidentDetails";

interface DisciplineSyncTabProps {
  cases: any[];
  disciplineIncidents: any[];
  students: any[];
  selectedIncidentId: string | null;
  setSelectedIncidentId: (id: string | null) => void;
  disciplineSearchQuery: string;
  setDisciplineSearchQuery: (query: string) => void;
  disciplineStatusFilter: string;
  setDisciplineStatusFilter: (filter: string) => void;
  disciplineTypeFilter: string;
  setDisciplineTypeFilter: (filter: string) => void;
  disciplineGradeFilter: string;
  setDisciplineGradeFilter: (filter: string) => void;
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

export const DisciplineSyncTab: React.FC<DisciplineSyncTabProps> = ({
  cases,
  disciplineIncidents,
  students,
  selectedIncidentId,
  setSelectedIncidentId,
  disciplineSearchQuery,
  setDisciplineSearchQuery,
  disciplineStatusFilter,
  setDisciplineStatusFilter,
  disciplineTypeFilter,
  setDisciplineTypeFilter,
  disciplineGradeFilter,
  setDisciplineGradeFilter,
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
  // 1. Filtering Logic
  const filteredIncidents = disciplineIncidents.filter((incident) => {
    const matchSearch =
      incident.studentName.toLowerCase().includes(disciplineSearchQuery.toLowerCase()) ||
      incident.id.toLowerCase().includes(disciplineSearchQuery.toLowerCase());

    const matchStatus =
      disciplineStatusFilter === "All"
        ? true
        : disciplineStatusFilter === "Linked to case"
        ? incident.status === "Linked"
        : incident.status === disciplineStatusFilter;

    const matchType =
      disciplineTypeFilter === "All" ? true : incident.type === disciplineTypeFilter;

    const matchGrade =
      disciplineGradeFilter === "All" ? true : incident.grade === disciplineGradeFilter;

    return matchSearch && matchStatus && matchType && matchGrade;
  });

  // 2. Sorting Logic (New & Linked first, Reviewed last, date descending)
  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    const aIsReviewed = a.status === "Reviewed";
    const bIsReviewed = b.status === "Reviewed";

    if (aIsReviewed && !bIsReviewed) return 1;
    if (!aIsReviewed && bIsReviewed) return -1;

    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // 3. Selection Auto-resolve
  const activeIncidentId =
    selectedIncidentId || (sortedIncidents.length > 0 ? sortedIncidents[0].id : null);
  const selectedIncident = disciplineIncidents.find((i) => i.id === activeIncidentId);

  // 4. Counts based on filters
  const countNew = filteredIncidents.filter((i) => i.status === "New").length;
  const countLinked = filteredIncidents.filter((i) => i.status === "Linked").length;
  const countReviewed = filteredIncidents.filter((i) => i.status === "Reviewed").length;
  const countTotal = filteredIncidents.length;

  return (
    <div className="space-y-6 w-full min-w-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold flex items-center gap-2">
            <AlertOctagon className="size-6 text-duo-orange" /> Discipline Sync Inbox
          </h1>
          <p className="text-xs text-muted-foreground font-semibold">
            Review administrative infractions and convert them into counseling cases to address
            behaviors proactively.
          </p>
        </div>
        <div className="self-start sm:self-auto rounded-xl border border-orange-100 bg-orange-50/20 px-3 py-1.5 text-xs font-semibold text-duo-orange flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-duo-orange animate-ping" />
          <span>Real-time Sync Active</span>
        </div>
      </div>

      {/* Summary Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-2xl border-2 border-red-100 p-4 shadow-sm flex flex-col">
          <span className="text-[10px] font-extrabold text-red-500 uppercase">New Incidents</span>
          <span className="text-3xl font-black text-duo-red mt-1">{countNew}</span>
          <span className="text-[10px] text-muted-foreground mt-0.5">Awaiting triage</span>
        </div>
        <div className="bg-card rounded-2xl border-2 border-green-100 p-4 shadow-sm flex flex-col">
          <span className="text-[10px] font-extrabold text-green-500 uppercase">Linked to Cases</span>
          <span className="text-3xl font-black text-duo-green-dark mt-1">{countLinked}</span>
          <span className="text-[10px] text-muted-foreground mt-0.5">Active counseling support</span>
        </div>
        <div className="bg-card rounded-2xl border-2 border-border p-4 shadow-sm flex flex-col">
          <span className="text-[10px] font-extrabold text-muted-foreground uppercase">Reviewed</span>
          <span className="text-3xl font-black text-slate-500 mt-1">{countReviewed}</span>
          <span className="text-[10px] text-muted-foreground mt-0.5">Cleared & reviewed</span>
        </div>
        <div className="bg-card rounded-2xl border-2 border-purple-100 p-4 shadow-sm flex flex-col">
          <span className="text-[10px] font-extrabold text-duo-purple uppercase">Total Sync Events</span>
          <span className="text-3xl font-black text-duo-purple mt-1">{countTotal}</span>
          <span className="text-[10px] text-muted-foreground mt-0.5">Matching active filters</span>
        </div>
      </div>

      {/* Search & Filters Bar */}
      <DisciplineFilters
        disciplineSearchQuery={disciplineSearchQuery}
        setDisciplineSearchQuery={setDisciplineSearchQuery}
        disciplineStatusFilter={disciplineStatusFilter}
        setDisciplineStatusFilter={setDisciplineStatusFilter}
        disciplineTypeFilter={disciplineTypeFilter}
        setDisciplineTypeFilter={setDisciplineTypeFilter}
        disciplineGradeFilter={disciplineGradeFilter}
        setDisciplineGradeFilter={setDisciplineGradeFilter}
      />

      {/* Workspace grid: List on Left, Detail on Right */}
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <IncidentsList
          sortedIncidents={sortedIncidents}
          activeIncidentId={activeIncidentId}
          setSelectedIncidentId={setSelectedIncidentId}
        />

        <IncidentDetails
          selectedIncident={selectedIncident}
          cases={cases}
          disciplineIncidents={disciplineIncidents}
          linkCaseSearch={linkCaseSearch}
          setLinkCaseSearch={setLinkCaseSearch}
          showLinkCaseDropdown={showLinkCaseDropdown}
          setShowLinkCaseDropdown={setShowLinkCaseDropdown}
          handleLinkIncidentToCase={handleLinkIncidentToCase}
          handleCreateCaseFromIncident={handleCreateCaseFromIncident}
          setIncidentToReview={setIncidentToReview}
          handleViewStudentRecord={handleViewStudentRecord}
          setActiveTab={setActiveTab}
          setSelectedCaseId={setSelectedCaseId}
          setMobileShowCaseDetail={setMobileShowCaseDetail}
        />
      </div>
    </div>
  );
};
