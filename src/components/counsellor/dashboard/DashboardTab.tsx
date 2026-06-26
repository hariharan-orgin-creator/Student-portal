import { WelcomeHeader } from "./WelcomeHeader";
import { QuickActions } from "./QuickActions";
import { StatsGrid } from "./StatsGrid";
import { ChartsSection } from "./ChartsSection";
import { DashboardWidgets } from "./DashboardWidgets";

interface DashboardTabProps {
  students: any[];
  cases: any[];
  appointments: any[];
  riskFactors: Record<string, any>;
  reports: any[];
  disciplineIncidents: any[];
  showSelfHarmWarnings: boolean;
  setActiveTab: (tab: string) => void;
  setActiveSubTab: (subTab: string) => void;
  setSelectedStudentId: (id: string) => void;
  setOpenModal: (modal: string | null) => void;
  setStudentSearchTerm: (term: string) => void;
  setShowStudentDropdown: (show: boolean) => void;
  setNewCaseDraft: (draft: any) => void;
  setReportToView: (report: any) => void;
  referenceDate: string;
  todayDateStr: string;
}

export function DashboardTab({
  students,
  cases,
  appointments,
  riskFactors,
  reports,
  disciplineIncidents,
  showSelfHarmWarnings,
  setActiveTab,
  setActiveSubTab,
  setSelectedStudentId,
  setOpenModal,
  setStudentSearchTerm,
  setShowStudentDropdown,
  setNewCaseDraft,
  setReportToView,
  referenceDate,
  todayDateStr,
}: Readonly<DashboardTabProps>) {
  // Calculations
  const highRiskStudentsCount = students.filter((stud) => {
    const rf = riskFactors[stud.id] || { academicDrop: 1, withdrawal: 1, outbursts: 1, selfHarmAlert: false };
    const maxIndex = Math.max(rf.academicDrop, rf.withdrawal, rf.outbursts);
    return (showSelfHarmWarnings && rf.selfHarmAlert) || maxIndex >= 3;
  }).length;

  const dueTodayTasksCount = students.flatMap(s => s.pendingTasks || []).filter(t => {
    return t.urgency !== "completed" && t.dueDate === todayDateStr;
  }).length;

  const dynamicOverdueTasksCount = students.flatMap(s => s.pendingTasks || []).filter(t => {
    return t.urgency !== "completed" && t.dueDate < todayDateStr;
  }).length;

  const openCasesCount = cases.filter(c => c.status !== "Closed").length;
  const todayAppointmentsCount = appointments.filter(
    (a) => a.date === referenceDate && a.status === "Confirmed"
  ).length;
  const newReportsCount = reports.filter((r) => r.status === "New").length;
  const newIncidentsCount = disciplineIncidents.filter((i) => i.status === "New").length;

  const processedRiskStudents = students.map((stud) => {
    const rf = riskFactors[stud.id] || { academicDrop: 1, withdrawal: 1, outbursts: 1, selfHarmAlert: false, lastUpdated: "None" };
    const maxIndex = Math.max(rf.academicDrop, rf.withdrawal, rf.outbursts);
    let finalRisk: "Low" | "Medium" | "High" = "Low";
    if ((showSelfHarmWarnings && rf.selfHarmAlert) || maxIndex >= 4) finalRisk = "High";
    else if (maxIndex >= 3) finalRisk = "Medium";
    const score = rf.academicDrop + rf.withdrawal + rf.outbursts + (showSelfHarmWarnings && rf.selfHarmAlert ? 5 : 0);
    let primaryReason = "Routine check-in";
    if (showSelfHarmWarnings && rf.selfHarmAlert) primaryReason = "Self-harm alert";
    else if (rf.academicDrop >= rf.withdrawal && rf.academicDrop >= rf.outbursts && rf.academicDrop > 1) primaryReason = "Academic decline";
    else if (rf.withdrawal >= rf.academicDrop && rf.withdrawal >= rf.outbursts && rf.withdrawal > 1) primaryReason = "Social withdrawal";
    else if (rf.outbursts >= rf.academicDrop && rf.outbursts >= rf.withdrawal && rf.outbursts > 1) primaryReason = "Behaviour incident";

    return { ...stud, rf, finalRisk, score, primaryReason };
  });

  const topAtRisk = processedRiskStudents
    .filter((stud) => stud.finalRisk === "High" || stud.finalRisk === "Medium")
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const dashboardPendingTasks = students.flatMap((stud) => {
    return (stud.pendingTasks || []).map((task: any) => ({
      ...task,
      studentId: stud.id,
      studentName: stud.name,
      studentAvatar: stud.avatar,
      caseId: stud.caseId,
    }));
  }).filter(t => t.urgency !== "completed" && t.dueDate <= todayDateStr)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  const unprocessedInboxReports = reports
    .filter((rep) => rep.status === "New")
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 2);

  const currentCounts = { High: 0, Medium: 0, Low: 0 };
  processedRiskStudents.forEach((s) => currentCounts[s.finalRisk]++);

  const trendData = [
    { week: "Week 1", "High Risk": 0, "Medium Risk": 1, "Low Risk": 4 },
    { week: "Week 2", "High Risk": 1, "Medium Risk": 1, "Low Risk": 3 },
    { week: "Week 3", "High Risk": 1, "Medium Risk": 2, "Low Risk": 2 },
    { week: "Week 4", "High Risk": 2, "Medium Risk": 1, "Low Risk": 2 },
    { week: "Week 5", "High Risk": 1, "Medium Risk": 2, "Low Risk": 2 },
    { week: "Current", "High Risk": currentCounts.High, "Medium Risk": currentCounts.Medium, "Low Risk": currentCounts.Low },
  ];

  const openCases = cases.filter(c => c.status === "Open").length;
  const inProgressCases = cases.filter(c => c.status === "In Progress" || c.status === "Active").length;
  const closedCases = cases.filter(c => c.status === "Closed" || c.status === "Resolved").length;

  const pieData = [
    { name: "Open", value: openCases, color: "#FF4B4B" },
    { name: "In Progress", value: inProgressCases, color: "#FF9600" },
    { name: "Closed", value: closedCases, color: "#58CC02" },
  ];

  return (
    <div className="space-y-6 w-full min-w-0">
      <WelcomeHeader
        highRiskStudentsCount={highRiskStudentsCount}
        dueTodayTasksCount={dueTodayTasksCount}
        newIncidentsCount={newIncidentsCount}
      />
      <QuickActions
        setActiveTab={setActiveTab}
        setActiveSubTab={setActiveSubTab}
        setOpenModal={setOpenModal}
        setStudentSearchTerm={setStudentSearchTerm}
        setShowStudentDropdown={setShowStudentDropdown}
        setNewCaseDraft={setNewCaseDraft}
      />
      <StatsGrid
        highRiskStudentsCount={highRiskStudentsCount}
        openCasesCount={openCasesCount}
        todayAppointmentsCount={todayAppointmentsCount}
        dueTodayTasksCount={dueTodayTasksCount}
        dynamicOverdueTasksCount={dynamicOverdueTasksCount}
        newReportsCount={newReportsCount}
        newIncidentsCount={newIncidentsCount}
        setActiveTab={setActiveTab}
      />
      <ChartsSection trendData={trendData} pieData={pieData} />
      <DashboardWidgets
        topAtRisk={topAtRisk}
        dashboardPendingTasks={dashboardPendingTasks}
        unprocessedInboxReports={unprocessedInboxReports}
        setActiveTab={setActiveTab}
        setActiveSubTab={setActiveSubTab}
        setSelectedStudentId={setSelectedStudentId}
        setReportToView={setReportToView}
      />
    </div>
  );
}
