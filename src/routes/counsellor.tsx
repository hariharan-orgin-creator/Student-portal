import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DuoButton, DuoCard, Chip, DuoProgress } from "@/components/duo";
import { STUDENTS_IN_CLASS } from "@/lib/mockData";
import {
  Home,
  UserCheck,
  FolderHeart,
  Calendar,
  ShieldAlert,
  Inbox,
  AlertOctagon,
  Search,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Lock,
  ChevronRight,
  Filter,
  PlusCircle,
  Send,
  UserPlus,
  BookmarkCheck,
  Activity,
  Heart,
  ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/counsellor")({
  head: () => ({
    meta: [
      { title: "Counsellor Portal — SkoolDojo" },
      {
        name: "description",
        content: "School counselling dashboard for student mental health, case tracking, appointments, and risk management.",
      },
    ],
  }),
  component: CounsellorPortal,
});

// Default Mock Data for the Counselling Module
const DEFAULT_STUDENTS_PROFILE = STUDENTS_IN_CLASS.map((student) => {
  const isAisyah = student.name.includes("Aisha") || student.name.includes("Aisyah");
  const isDanish = student.name.includes("Danish");
  const isAli = student.name.includes("Ali");
  
  let wellnessSummary = "Student appears well-adjusted. High participation in class and active socially.";
  let sessions: {
    id: string;
    date: string;
    type: "Individual" | "Group" | "Parent Consultation" | "Teacher Consultation";
    progress: number;
    summary: string;
    privateNotes: string;
  }[] = [
    {
      id: "s-1",
      date: "2026-06-02",
      type: "Individual",
      progress: 4,
      summary: "Routine check-in. Aisha is excited about school and discussed minor exam anxieties.",
      privateNotes: "High achievement orientation. Monitor self-imposed pressure.",
    }
  ];
  
  if (isDanish) {
    wellnessSummary = "Danish has shown significant academic decline and emotional withdrawal recently. Requires active support.";
    sessions = [
      {
        id: "s-2",
        date: "2026-06-08",
        type: "Individual" as const,
        progress: 2,
        summary: "Danish shared that he feels overwhelmed by classroom expectations and is struggling to focus.",
        privateNotes: "Lack of sleep reported. Seems reluctant to talk about home situation. Need to involve parents.",
      },
      {
        id: "s-3",
        date: "2026-06-15",
        type: "Individual" as const,
        progress: 3,
        summary: "Follow-up session. Discussed study techniques and emotional regulation. Danish was slightly more communicative.",
        privateNotes: "Progressing slowly. Still defensive but responsive to relaxation techniques.",
      }
    ];
  } else if (isAli) {
    wellnessSummary = "Ali is energetic and friendly, but sometimes struggles with impulse control in classroom group settings.";
    sessions = [
      {
        id: "s-4",
        date: "2026-06-10",
        type: "Teacher Consultation" as const,
        progress: 3,
        summary: "Met with Cikgu Nadia to discuss Ali's behavior. Devised a positive reinforcement seat plan.",
        privateNotes: "Nadia reported good cooperation. Ali responds well to immediate visual rewards.",
      }
    ];
  }

  return {
    ...student,
    age: 11,
    guardian: isAisyah ? "Encik Rahman" : isDanish ? "Mr. Kumar" : isAli ? "Puan Zarina" : "Mr. Lim",
    guardianContact: "+60 12-345-67" + (isAisyah ? "89" : isDanish ? "54" : "12"),
    wellnessSummary,
    sessions,
  };
});

const DEFAULT_CASES = [
  {
    id: "CASE-101",
    studentId: "s4",
    studentName: "Danish Kumar",
    avatar: "👦🏾",
    category: "Academic Stress",
    riskLevel: "High" as const,
    status: "Active" as const,
    openDate: "2026-06-08",
    lastSessionDate: "2026-06-15",
    summary: "Managing general academic burnout and classroom isolation. Collaborative wellness plan initiated.",
  },
  {
    id: "CASE-102",
    studentId: "s2",
    studentName: "Ali Hassan",
    avatar: "👦🏽",
    category: "Behavioral",
    riskLevel: "Medium" as const,
    status: "Observation" as const,
    openDate: "2026-06-10",
    lastSessionDate: "2026-06-10",
    summary: "Impulse control check-in, tracking social integrations in primary classes.",
  }
];

const DEFAULT_APPOINTMENTS = [
  {
    id: "apt-1",
    studentId: "s4",
    studentName: "Danish Kumar",
    avatar: "👦🏾",
    date: "2026-06-17",
    time: "10:00 AM",
    type: "Individual" as const,
    status: "Confirmed" as const,
  },
  {
    id: "apt-2",
    studentId: "s1",
    studentName: "Aisha Rahman",
    avatar: "👧🏻",
    date: "2026-06-17",
    time: "11:30 AM",
    type: "Individual" as const,
    status: "Pending" as const,
  },
  {
    id: "apt-3",
    studentId: "s2",
    studentName: "Ali Hassan",
    avatar: "👦🏽",
    date: "2026-06-18",
    time: "02:00 PM",
    type: "Parent Consultation" as const,
    status: "Confirmed" as const,
  }
];

const DEFAULT_RISK_FACTORS = {
  s1: { academicDrop: 1, withdrawal: 1, outbursts: 1, selfHarmAlert: false, lastUpdated: "2026-06-15" },
  s2: { academicDrop: 2, withdrawal: 2, outbursts: 3, selfHarmAlert: false, lastUpdated: "2026-06-12" },
  s3: { academicDrop: 1, withdrawal: 1, outbursts: 1, selfHarmAlert: false, lastUpdated: "2026-06-15" },
  s4: { academicDrop: 4, withdrawal: 4, outbursts: 2, selfHarmAlert: false, lastUpdated: "2026-06-16" },
  s5: { academicDrop: 1, withdrawal: 1, outbursts: 1, selfHarmAlert: false, lastUpdated: "2026-06-14" },
};

const DEFAULT_REPORTS = [
  {
    id: "rep-201",
    reporterName: "Cikgu Nadia",
    reporterRole: "Teacher" as const,
    studentId: "s4",
    studentName: "Danish Kumar",
    date: "2026-06-07",
    description: "Danish sat by himself during recess, did not eat, and has stopped turning in homework assignments. Appeared tearful when asked.",
    urgency: "High" as const,
    status: "Filed as Case" as const,
  },
  {
    id: "rep-202",
    reporterName: "Mrs. Lim",
    reporterRole: "Parent" as const,
    studentId: "s3",
    studentName: "Sara Lim",
    date: "2026-06-14",
    description: "Sara is showing signs of anxiety before her upcoming math exam. She complains of stomach aches in the morning.",
    urgency: "Normal" as const,
    status: "New" as const,
  },
  {
    id: "rep-203",
    reporterName: "Cikgu Nadia",
    reporterRole: "Teacher" as const,
    studentId: "s2",
    studentName: "Ali Hassan",
    date: "2026-06-16",
    description: "Ali had a verbal altercation with a classmate. He became highly agitated and threw his pencil case. Calmed down after 10 minutes.",
    urgency: "High" as const,
    status: "New" as const,
  }
];

const DEFAULT_DISCIPLINE_INCIDENTS = [
  {
    id: "disc-301",
    studentId: "s4",
    studentName: "Danish Kumar",
    avatar: "👦🏾",
    infraction: "Caught cheating during the Science Unit Test on plant cells.",
    date: "2026-06-08",
    loggedBy: "Cikgu Nadia",
    disciplineStatus: "Referred to Counselling" as const,
    counsellingReferral: true,
    counsellingCaseId: "CASE-101",
    interventionNotes: "Initiated active case. Danish's academic pressure appears to be driving this behavior.",
  },
  {
    id: "disc-302",
    studentId: "s2",
    studentName: "Ali Hassan",
    avatar: "👦🏽",
    infraction: "Frequent disruptions and yelling in the Art class, refusing to follow instructions.",
    date: "2026-06-12",
    loggedBy: "Cikgu Nadia",
    disciplineStatus: "Action Taken" as const,
    counsellingReferral: true,
    counsellingCaseId: "CASE-102",
    interventionNotes: "Recommended visual focus board and seat modification. Ali responded positively.",
  },
  {
    id: "disc-303",
    studentId: "s4",
    studentName: "Danish Kumar",
    avatar: "👦🏾",
    infraction: "Unexcused absence and cutting classes (Mathematics) twice in one week.",
    date: "2026-06-15",
    loggedBy: "Cikgu Nadia",
    disciplineStatus: "Pending Review" as const,
    counsellingReferral: true,
    counsellingCaseId: null,
    interventionNotes: "",
  }
];

const NAV_ITEMS = [
  { id: "overview", label: "Dashboard", icon: Home },
  { id: "records", label: "Student Records", icon: UserCheck },
  { id: "cases", label: "Case Manager", icon: FolderHeart },
  { id: "appointments", label: "Appointments", icon: Calendar },
  { id: "risk", label: "Risk Tracking", icon: ShieldAlert },
  { id: "reports", label: "Inbox Reports", icon: Inbox, badge: "New" },
  { id: "discipline", label: "Discipline Sync", icon: AlertOctagon },
];

function CounsellorPortal() {
  const [activeTab, setActiveTab] = useState("overview");

  // Core Module States
  const [students, setStudents] = useState<any[]>([]);
  const [cases, setCases] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [riskFactors, setRiskFactors] = useState<Record<string, any>>({});
  const [reports, setReports] = useState<any[]>([]);
  const [disciplineIncidents, setDisciplineIncidents] = useState<any[]>([]);

  // Selection & UI States
  const [selectedStudentId, setSelectedStudentId] = useState<string>("s4");
  const [searchQuery, setSearchQuery] = useState("");
  const [sessionDraft, setSessionDraft] = useState({ type: "Individual", progress: 3, summary: "", privateNotes: "" });
  const [newCaseDraft, setNewCaseDraft] = useState({ studentId: "s1", category: "Academic Stress", riskLevel: "Medium", summary: "" });
  const [newAptDraft, setNewAptDraft] = useState({ studentId: "s1", date: "", time: "", type: "Individual" });
  const [newReportDraft, setNewReportDraft] = useState({ studentId: "s1", reporterName: "", reporterRole: "Teacher", description: "", urgency: "Normal" });

  const [openModal, setOpenModal] = useState<string | null>(null);

  // Initialize/Load State from Local Storage
  useEffect(() => {
    const saved = localStorage.getItem("counsellor_state");
    if (saved) {
      try {
        const s = JSON.parse(saved);
        if (s.students) setStudents(s.students);
        if (s.cases) setCases(s.cases);
        if (s.appointments) setAppointments(s.appointments);
        if (s.riskFactors) setRiskFactors(s.riskFactors);
        if (s.reports) setReports(s.reports);
        if (s.disciplineIncidents) setDisciplineIncidents(s.disciplineIncidents);
      } catch (e) {
        console.error("Error loading counsellor state", e);
      }
    } else {
      setStudents(DEFAULT_STUDENTS_PROFILE);
      setCases(DEFAULT_CASES);
      setAppointments(DEFAULT_APPOINTMENTS);
      setRiskFactors(DEFAULT_RISK_FACTORS);
      setReports(DEFAULT_REPORTS);
      setDisciplineIncidents(DEFAULT_DISCIPLINE_INCIDENTS);
    }
  }, []);

  // Save State to Local Storage
  const saveState = (updatedData: {
    students?: any[];
    cases?: any[];
    appointments?: any[];
    riskFactors?: Record<string, any>;
    reports?: any[];
    disciplineIncidents?: any[];
  }) => {
    const nextStudents = updatedData.students ?? students;
    const nextCases = updatedData.cases ?? cases;
    const nextAppointments = updatedData.appointments ?? appointments;
    const nextRiskFactors = updatedData.riskFactors ?? riskFactors;
    const nextReports = updatedData.reports ?? reports;
    const nextDisciplineIncidents = updatedData.disciplineIncidents ?? disciplineIncidents;

    setStudents(nextStudents);
    setCases(nextCases);
    setAppointments(nextAppointments);
    setRiskFactors(nextRiskFactors);
    setReports(nextReports);
    setDisciplineIncidents(nextDisciplineIncidents);

    localStorage.setItem(
      "counsellor_state",
      JSON.stringify({
        students: nextStudents,
        cases: nextCases,
        appointments: nextAppointments,
        riskFactors: nextRiskFactors,
        reports: nextReports,
        disciplineIncidents: nextDisciplineIncidents,
      })
    );
  };

  // Helper: Retrieve Selected Student Record
  const selectedStudent = students.find((s) => s.id === selectedStudentId) || students[0];

  // Action: Log New Counselling Session
  const handleAddSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionDraft.summary.trim()) return;

    const newSession = {
      id: `s-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      type: sessionDraft.type,
      progress: Number(sessionDraft.progress),
      summary: sessionDraft.summary,
      privateNotes: sessionDraft.privateNotes,
    };

    const updatedStudents = students.map((stud) => {
      if (stud.id === selectedStudentId) {
        return {
          ...stud,
          sessions: [newSession, ...(stud.sessions || [])],
        };
      }
      return stud;
    });

    // Automatically update the "lastSessionDate" in the corresponding Case File
    const updatedCases = cases.map((c) => {
      if (c.studentId === selectedStudentId) {
        return {
          ...c,
          lastSessionDate: newSession.date,
        };
      }
      return c;
    });

    saveState({ students: updatedStudents, cases: updatedCases });
    setSessionDraft({ type: "Individual", progress: 3, summary: "", privateNotes: "" });
  };

  // Action: Create a New Case File
  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault();
    const stud = students.find((s) => s.id === newCaseDraft.studentId);
    if (!stud) return;

    const newCase = {
      id: `CASE-${Math.floor(100 + Math.random() * 900)}`,
      studentId: newCaseDraft.studentId,
      studentName: stud.name,
      avatar: stud.avatar,
      category: newCaseDraft.category,
      riskLevel: newCaseDraft.riskLevel,
      status: "Active",
      openDate: new Date().toISOString().split("T")[0],
      lastSessionDate: "None",
      summary: newCaseDraft.summary || "No description provided.",
    };

    saveState({ cases: [newCase, ...cases] });
    setOpenModal(null);
    setNewCaseDraft({ studentId: "s1", category: "Academic Stress", riskLevel: "Medium", summary: "" });
  };

  // Action: Book a New Session/Appointment
  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const stud = students.find((s) => s.id === newAptDraft.studentId);
    if (!stud) return;

    const newApt = {
      id: `apt-${Date.now()}`,
      studentId: newAptDraft.studentId,
      studentName: stud.name,
      avatar: stud.avatar,
      date: newAptDraft.date,
      time: newAptDraft.time,
      type: newAptDraft.type,
      status: "Confirmed" as const,
    };

    saveState({ appointments: [newApt, ...appointments] });
    setOpenModal(null);
    setNewAptDraft({ studentId: "s1", date: "", time: "", type: "Individual" });
  };

  // Action: Log Confidential Report from the community
  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    const stud = students.find((s) => s.id === newReportDraft.studentId);
    if (!stud) return;

    const newRep = {
      id: `rep-${Date.now()}`,
      reporterName: newReportDraft.reporterName || "Anonymous Parent",
      reporterRole: newReportDraft.reporterRole,
      studentId: newReportDraft.studentId,
      studentName: stud.name,
      date: new Date().toISOString().split("T")[0],
      description: newReportDraft.description,
      urgency: newReportDraft.urgency,
      status: "New" as const,
    };

    saveState({ reports: [newRep, ...reports] });
    setOpenModal(null);
    setNewReportDraft({ studentId: "s1", reporterName: "", reporterRole: "Teacher", description: "", urgency: "Normal" });
  };

  // Action: File Confidential Report as active case
  const handleFileReport = (report: any) => {
    const caseId = `CASE-${Math.floor(100 + Math.random() * 900)}`;
    const stud = students.find((s) => s.id === report.studentId);
    
    const newCase = {
      id: caseId,
      studentId: report.studentId,
      studentName: report.studentName,
      avatar: stud ? stud.avatar : "🧒",
      category: report.description.toLowerCase().includes("academic") ? "Academic Stress" : "Emotional Regulation",
      riskLevel: report.urgency === "Urgent" || report.urgency === "High" ? "High" : "Medium",
      status: "Active",
      openDate: new Date().toISOString().split("T")[0],
      lastSessionDate: "None",
      summary: `Filed from confidential report: ${report.description}`,
    };

    const updatedReports = reports.map((r) =>
      r.id === report.id ? { ...r, status: "Filed as Case" } : r
    );

    saveState({
      cases: [newCase, ...cases],
      reports: updatedReports,
    });
  };

  // Action: Dismiss confidential report
  const handleDismissReport = (reportId: string) => {
    const updatedReports = reports.map((r) =>
      r.id === reportId ? { ...r, status: "Dismissed" } : r
    );
    saveState({ reports: updatedReports });
  };

  // Action: Intake disciplinary incident into case management
  const handleIntakeDiscipline = (incident: any) => {
    const caseId = `CASE-${Math.floor(100 + Math.random() * 900)}`;
    const newCase = {
      id: caseId,
      studentId: incident.studentId,
      studentName: incident.studentName,
      avatar: incident.avatar,
      category: "Behavioral",
      riskLevel: "Medium",
      status: "Active",
      openDate: new Date().toISOString().split("T")[0],
      lastSessionDate: "None",
      summary: `Discipline intake. Infraction: ${incident.infraction}`,
    };

    const updatedIncidents = disciplineIncidents.map((i) =>
      i.id === incident.id
        ? {
            ...i,
            disciplineStatus: "Referred to Counselling",
            counsellingCaseId: caseId,
            interventionNotes: "Case file created. Initiated student assessment.",
          }
        : i
    );

    saveState({
      cases: [newCase, ...cases],
      disciplineIncidents: updatedIncidents,
    });
  };

  // Action: Add counselling intervention comment to disciplinary incident
  const handleSaveDisciplineIntervention = (incidentId: string, notes: string) => {
    if (!notes.trim()) return;
    const updatedIncidents = disciplineIncidents.map((i) =>
      i.id === incidentId ? { ...i, interventionNotes: notes, disciplineStatus: "Action Taken" } : i
    );
    saveState({ disciplineIncidents: updatedIncidents });
  };

  // Action: Toggle / Update Risk Factor Indicators
  const handleUpdateRiskFactor = (studentId: string, field: string, val: number) => {
    const updatedRiskFactors = {
      ...riskFactors,
      [studentId]: {
        ...riskFactors[studentId],
        [field]: val,
        lastUpdated: new Date().toISOString().split("T")[0],
      },
    };
    saveState({ riskFactors: updatedRiskFactors });
  };

  // Action: Toggle self harm alert
  const handleToggleSelfHarm = (studentId: string) => {
    const updatedRiskFactors = {
      ...riskFactors,
      [studentId]: {
        ...riskFactors[studentId],
        selfHarmAlert: !riskFactors[studentId]?.selfHarmAlert,
        lastUpdated: new Date().toISOString().split("T")[0],
      },
    };
    saveState({ riskFactors: updatedRiskFactors });
  };

  // Action: Update case status
  const handleUpdateCaseStatus = (caseId: string, newStatus: string) => {
    const updatedCases = cases.map((c) =>
      c.id === caseId ? { ...c, status: newStatus } : c
    );
    saveState({ cases: updatedCases });
  };

  // Action: Update case risk level
  const handleUpdateCaseRisk = (caseId: string, newRisk: "Low" | "Medium" | "High") => {
    const updatedCases = cases.map((c) =>
      c.id === caseId ? { ...c, riskLevel: newRisk } : c
    );
    saveState({ cases: updatedCases });
  };

  // Action: Toggle Appointment Status
  const handleToggleAptStatus = (aptId: string, newStatus: string) => {
    const updatedApts = appointments.map((a) =>
      a.id === aptId ? { ...a, status: newStatus } : a
    );
    saveState({ appointments: updatedApts });
  };

  // Statistics Computations
  const activeCasesCount = cases.filter((c) => c.status === "Active" || c.status === "Observation").length;
  const newReportsCount = reports.filter((r) => r.status === "New").length;
  const todayDateStr = new Date().toISOString().split("T")[0];
  const appointmentsToday = appointments.filter((a) => a.status === "Confirmed").length;
  const highRiskStudentsCount = Object.values(riskFactors).filter(
    (rf: any) => rf.academicDrop >= 4 || rf.withdrawal >= 4 || rf.outbursts >= 4 || rf.selfHarmAlert
  ).length;

  // Search filter students
  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-24 md:pb-10 bg-[oklch(0.99_0.005_95)] overflow-x-hidden w-full">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-20 border-b-2 border-border bg-background/90 backdrop-blur w-full">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          <Link to="/" className="flex items-center gap-2 font-display text-2xl font-bold">
            <span className="text-3xl animate-wiggle">🧠</span>
            <span className="bg-gradient-to-r from-duo-pink to-duo-purple bg-clip-text text-transparent">
              SkoolDojo
            </span>
            <span className="hidden sm:inline-block text-xs font-bold text-muted-foreground uppercase border border-border bg-card px-2 py-0.5 rounded-full">
              Well-being Portal
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full border-2 border-border bg-card px-3 py-1.5 text-xs font-bold shadow-sm">
              <span className="size-2 rounded-full bg-duo-pink animate-pulse" />
              <span>Counsellor Mode</span>
            </div>
            <div className="hidden items-center gap-2 rounded-full border-2 border-border bg-card px-3 py-1.5 text-sm font-bold sm:flex">
              <span className="grid size-7 place-items-center rounded-full bg-pink-100 text-lg">
                👩‍⚕️
              </span>
              Puan Maryam
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout Workspace Grid */}
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:grid-cols-[240px_1fr] md:px-8 w-full min-w-0">
        
        {/* Navigation Sidebar */}
        <aside className="hidden md:block">
          <DuoCard className="sticky top-24 p-4 space-y-4 border border-border bg-card shadow-sm">
            <div>
              <div className="mb-3 px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Main Workspace
              </div>
              <nav className="space-y-1">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  let hasBadge = false;
                  let badgeValue = "";

                  if (item.id === "reports" && newReportsCount > 0) {
                    hasBadge = true;
                    badgeValue = `${newReportsCount} New`;
                  } else if (item.id === "discipline" && disciplineIncidents.filter(i => i.disciplineStatus === "Pending Review").length > 0) {
                    hasBadge = true;
                    badgeValue = "Alert";
                  }

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold transition ${
                        isActive
                          ? "bg-[oklch(0.95_0.06_350)] text-duo-pink shadow-xs"
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon className={`size-4 ${isActive ? "text-duo-pink" : "text-muted-foreground"}`} />
                      <span className="flex-1 text-left">{item.label}</span>
                      {hasBadge && (
                        <span className="rounded-full bg-duo-pink px-2 py-0.5 text-[9px] font-extrabold text-white uppercase">
                          {badgeValue}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
            
            <div className="border-t border-border pt-4">
              <div className="rounded-2xl bg-[oklch(0.96_0.04_350)] p-3 text-xs border border-pink-100">
                <div className="flex items-center gap-2 font-bold text-duo-pink mb-1">
                  <Lock className="size-3.5" /> Confidential Area
                </div>
                <p className="text-muted-foreground leading-normal">
                  All counselling records are encrypted and protected under FERPA & HIPAA directives.
                </p>
              </div>
            </div>

            <Link
              to="/"
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold text-muted-foreground hover:bg-muted"
            >
              <ChevronRight className="size-4 rotate-180" /> Log out
            </Link>
          </DuoCard>
        </aside>

        {/* Dynamic Content Panel */}
        <main className="space-y-6 w-full min-w-0">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6 w-full min-w-0">
              <div>
                <h1 className="font-display text-3xl font-extrabold tracking-tight">
                  Mental Wellness Dashboard
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Overview of student well-being records, active cases, and counselling schedule.
                </p>
              </div>

              {/* Stat Counters Banner */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Active Cases", val: activeCasesCount, color: "duo-pink", desc: "Open wellness files", icon: FolderHeart },
                  { label: "Scheduled Today", val: appointmentsToday, color: "duo-blue", desc: "Wellness checks", icon: Calendar },
                  { label: "High Risk Flags", val: highRiskStudentsCount, color: "duo-red", desc: "Action required", icon: ShieldAlert },
                  { label: "Confidential Reports", val: newReportsCount, color: "duo-purple", desc: "Pending review", icon: Inbox },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <DuoCard key={s.label} className="relative overflow-hidden border border-border p-4 bg-card shadow-xs">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-3xl font-black font-numeric" style={{ color: `var(--${s.color})` }}>
                            {s.val}
                          </span>
                          <h3 className="text-sm font-extrabold text-foreground mt-1">{s.label}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
                        </div>
                        <div className="p-2.5 rounded-2xl bg-muted/60">
                          <Icon className="size-5" style={{ color: `var(--${s.color})` }} />
                        </div>
                      </div>
                    </DuoCard>
                  );
                })}
              </div>

              {/* Quick Action Operations */}
              <DuoCard className="border border-border p-4">
                <h2 className="font-display text-lg font-bold mb-3">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button
                    onClick={() => setOpenModal("newCase")}
                    className="flex flex-col items-center gap-2 rounded-2xl border-2 border-border bg-card p-4 text-xs font-bold text-center transition hover:-translate-y-0.5 hover:border-duo-pink group"
                  >
                    <FolderHeart className="size-6 text-duo-pink group-hover:scale-110 transition" />
                    Open New Case File
                  </button>
                  <button
                    onClick={() => setOpenModal("newApt")}
                    className="flex flex-col items-center gap-2 rounded-2xl border-2 border-border bg-card p-4 text-xs font-bold text-center transition hover:-translate-y-0.5 hover:border-duo-blue group"
                  >
                    <Calendar className="size-6 text-duo-blue group-hover:scale-110 transition" />
                    Book Session
                  </button>
                  <button
                    onClick={() => setOpenModal("newReport")}
                    className="flex flex-col items-center gap-2 rounded-2xl border-2 border-border bg-card p-4 text-xs font-bold text-center transition hover:-translate-y-0.5 hover:border-duo-purple group"
                  >
                    <Inbox className="size-6 text-duo-purple group-hover:scale-110 transition" />
                    File Incident Report
                  </button>
                  <button
                    onClick={() => setActiveTab("risk")}
                    className="flex flex-col items-center gap-2 rounded-2xl border-2 border-border bg-card p-4 text-xs font-bold text-center transition hover:-translate-y-0.5 hover:border-duo-red group"
                  >
                    <ShieldAlert className="size-6 text-duo-red group-hover:scale-110 transition" />
                    Review Risk Indicators
                  </button>
                </div>
              </DuoCard>

              {/* Overview Details Section */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Active Appointments for the day */}
                <DuoCard className="border border-border p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="font-display text-lg font-bold flex items-center gap-2">
                      <Clock className="size-5 text-duo-blue" /> Scheduled Sessions
                    </h2>
                    <button onClick={() => setActiveTab("appointments")} className="text-xs font-bold text-duo-blue hover:underline">
                      Manage slots →
                    </button>
                  </div>
                  <div className="space-y-3">
                    {appointments.length === 0 ? (
                      <p className="text-xs text-muted-foreground p-3 text-center border-2 border-dashed border-border rounded-xl bg-muted/20">
                        No appointments booked.
                      </p>
                    ) : (
                      appointments.map((apt) => (
                        <div key={apt.id} className="flex items-center justify-between rounded-xl border border-border p-3 bg-card hover:bg-muted/30">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{apt.avatar}</span>
                            <div>
                              <div className="font-bold text-sm">{apt.studentName}</div>
                              <div className="text-xs text-muted-foreground flex items-center gap-1">
                                <span>{apt.time}</span> • <span>{apt.type} Session</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Chip color={apt.status === "Confirmed" ? "blue" : apt.status === "Completed" ? "green" : "white"}>
                              {apt.status}
                            </Chip>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </DuoCard>

                {/* Live Activity & Alerts Logs */}
                <DuoCard className="border border-border p-4">
                  <h2 className="font-display text-lg font-bold flex items-center gap-2 mb-3">
                    <Activity className="size-5 text-duo-pink" /> Recent Activities
                  </h2>
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    <div className="flex items-start gap-2 text-xs">
                      <span className="mt-0.5 text-duo-pink font-extrabold">●</span>
                      <div>
                        <span className="font-semibold text-foreground">Logged checking session</span> for <span className="font-bold">Danish Kumar</span>
                        <div className="text-[10px] text-muted-foreground mt-0.5">Today 12:30 PM</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-xs">
                      <span className="mt-0.5 text-duo-purple font-extrabold">●</span>
                      <div>
                        <span className="font-semibold text-foreground">Disciplinary referral synced</span> from Cikgu Nadia: <span className="italic">Danish cut math class</span>
                        <div className="text-[10px] text-muted-foreground mt-0.5">Yesterday 2:45 PM</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-xs">
                      <span className="mt-0.5 text-duo-green font-extrabold">●</span>
                      <div>
                        <span className="font-semibold text-foreground">Confidential report filed</span> by Mrs. Lim regarding <span className="font-bold">Sara Lim</span>
                        <div className="text-[10px] text-muted-foreground mt-0.5">2 days ago</div>
                      </div>
                    </div>
                  </div>
                </DuoCard>
              </div>
            </div>
          )}

          {/* TAB 2: STUDENT RECORDS */}
          {activeTab === "records" && (
            <div className="grid gap-6 lg:grid-cols-[280px_1fr] w-full min-w-0">
              
              {/* Left Student List Sidebar */}
              <DuoCard className="hidden lg:block p-4 border border-border bg-card">
                <div className="relative mb-3">
                  <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search student..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-2 py-1.5 rounded-xl border border-border text-xs focus:outline-none focus:ring-2 focus:ring-duo-pink bg-muted/40"
                  />
                </div>
                <div className="space-y-1.5 max-h-[480px] overflow-y-auto">
                  {filteredStudents.length === 0 ? (
                    <p className="text-xs text-muted-foreground text-center py-4">No students found.</p>
                  ) : (
                    filteredStudents.map((stud) => {
                      const activeCase = cases.find((c) => c.studentId === stud.id && c.status === "Active");
                      return (
                        <button
                          key={stud.id}
                          onClick={() => setSelectedStudentId(stud.id)}
                          className={`flex w-full items-center gap-2 rounded-xl p-2 text-left text-xs font-semibold transition ${
                            selectedStudentId === stud.id
                              ? "bg-[oklch(0.95_0.06_350)] border-l-4 border-duo-pink text-foreground"
                              : "hover:bg-muted text-muted-foreground"
                          }`}
                        >
                          <span className="text-xl">{stud.avatar}</span>
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-foreground truncate">{stud.name}</div>
                            <div className="text-[10px]">{stud.overall} • {stud.grade}</div>
                          </div>
                          {activeCase && (
                            <span className="size-2 rounded-full bg-duo-pink" />
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              </DuoCard>

              {/* Right Student Details Panel */}
              <div className="space-y-6 w-full min-w-0">
                {/* Mobile Student Selector (Visible only below lg size) */}
                <DuoCard className="block lg:hidden p-4 border border-border bg-card">
                  <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-2">
                    Select Student
                  </label>
                  <div className="relative">
                    <select
                      value={selectedStudentId}
                      onChange={(e) => setSelectedStudentId(e.target.value)}
                      className="w-full text-xs font-bold bg-muted/40 border border-border rounded-xl p-3 pr-10 appearance-none focus:ring-2 focus:ring-duo-pink focus:outline-none"
                    >
                      {students.map((stud) => (
                        <option key={stud.id} value={stud.id}>
                          {stud.avatar} {stud.name} ({stud.overall})
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
                      <ChevronRight className="size-4 rotate-90" />
                    </div>
                  </div>
                </DuoCard>

                <DuoCard className="p-4 sm:p-5 border border-border bg-card">
                  
                  {/* Student Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-border gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-5xl p-2 rounded-3xl bg-muted/80">{selectedStudent.avatar}</span>
                      <div>
                        <h2 className="font-display text-2xl font-black break-words whitespace-normal">{selectedStudent.name}</h2>
                        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                          Class: {selectedStudent.overall} ({selectedStudent.grade})
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs font-bold w-full">
                      <div className="rounded-xl border border-border bg-muted/40 px-3 py-1.5 break-words whitespace-normal">
                        <span className="text-muted-foreground">Guardian:</span> {selectedStudent.guardian}
                      </div>
                      <div className="rounded-xl border border-border bg-muted/40 px-3 py-1.5 break-words whitespace-normal">
                        <span className="text-muted-foreground">Phone:</span> {selectedStudent.guardianContact}
                      </div>
                    </div>
                  </div>

                  {/* Summary & Risk Metrics Grid */}
                  <div className="grid gap-6 md:grid-cols-[1fr_240px] pt-4 min-w-0">
                    <div className="space-y-4 min-w-0">
                      <div>
                        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wide mb-1.5">
                          Wellness Profile & Psychological Summary
                        </h3>
                        <p className="text-sm leading-relaxed p-3 bg-muted/30 rounded-xl border border-border font-medium text-foreground break-words whitespace-normal">
                          {selectedStudent.wellnessSummary}
                        </p>
                      </div>

                      {/* Log Counselling Session Section */}
                      <div className="border border-pink-100 rounded-2xl bg-[oklch(0.99_0.002_350)] p-4">
                        <h3 className="text-sm font-bold text-duo-pink flex items-center gap-1.5 mb-3">
                          <PlusCircle className="size-4" /> Log Counselling Session
                        </h3>
                        <form onSubmit={handleAddSession} className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">Session Type</label>
                              <select
                                value={sessionDraft.type}
                                onChange={(e) => setSessionDraft({ ...sessionDraft, type: e.target.value })}
                                className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2 focus:ring-2 focus:ring-duo-pink focus:outline-none"
                              >
                                <option>Individual</option>
                                <option>Group</option>
                                <option>Parent Consultation</option>
                                <option>Teacher Consultation</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">Progress Index (1-5)</label>
                              <select
                                value={sessionDraft.progress}
                                onChange={(e) => setSessionDraft({ ...sessionDraft, progress: Number(e.target.value) })}
                                className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2 focus:ring-2 focus:ring-duo-pink focus:outline-none"
                              >
                                <option value="1">1 - Severe Crisis</option>
                                <option value="2">2 - High Struggle</option>
                                <option value="3">3 - Recovering / Neutral</option>
                                <option value="4">4 - Good Progress</option>
                                <option value="5">5 - Thriving / Resolved</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">Session Summary (Visible to Teachers/Guardians)</label>
                            <textarea
                              value={sessionDraft.summary}
                              onChange={(e) => setSessionDraft({ ...sessionDraft, summary: e.target.value })}
                              placeholder="Describe counselling progress, coping strategies discussed, and wellness goals..."
                              rows={2}
                              className="w-full text-xs bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-pink focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1 flex items-center gap-1">
                              <Lock className="size-3 text-duo-pink" /> Confidential Private Notes (Counsellor Eyes Only)
                            </label>
                            <textarea
                              value={sessionDraft.privateNotes}
                              onChange={(e) => setSessionDraft({ ...sessionDraft, privateNotes: e.target.value })}
                              placeholder="Record psychological assessments, therapeutic details, sensitive child background..."
                              rows={2}
                              className="w-full text-xs bg-pink-50/20 border border-pink-100 rounded-xl p-2.5 focus:ring-2 focus:ring-duo-pink focus:outline-none text-foreground font-semibold"
                            />
                          </div>

                          <div className="flex justify-end">
                            <DuoButton type="submit" variant="pink" size="sm">
                              Log Session Record
                            </DuoButton>
                          </div>
                        </form>
                      </div>
                    </div>

                    {/* Right Side: Active Case Status & Indicators */}
                    <div className="space-y-4 min-w-0 w-full">
                      {/* Active Case Info */}
                      {(() => {
                        const activeCase = cases.find((c) => c.studentId === selectedStudent.id && c.status !== "Resolved");
                        return (
                          <div className="rounded-xl border border-border p-3.5 bg-card">
                            <h4 className="text-xs font-extrabold text-muted-foreground uppercase mb-2">Counselling Case File</h4>
                            {activeCase ? (
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-black text-duo-pink">{activeCase.id}</span>
                                  <Chip color={activeCase.riskLevel === "High" ? "red" : activeCase.riskLevel === "Medium" ? "orange" : "blue"}>
                                    {activeCase.riskLevel} Risk
                                  </Chip>
                                </div>
                                <div className="text-xs font-bold">Category: {activeCase.category}</div>
                                <div className="text-xs font-semibold text-muted-foreground leading-relaxed truncate">{activeCase.summary}</div>
                                <div className="pt-1 text-[10px] text-muted-foreground font-bold uppercase">
                                  Open: {activeCase.openDate}
                                </div>
                              </div>
                            ) : (
                              <div className="text-center py-4">
                                <p className="text-xs text-muted-foreground">No active case.</p>
                                <button
                                  onClick={() => {
                                    setNewCaseDraft({ ...newCaseDraft, studentId: selectedStudent.id });
                                    setOpenModal("newCase");
                                  }}
                                  className="mt-2 text-xs font-bold text-duo-pink hover:underline"
                                >
                                  + Create Case File
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })()}

                      {/* Well-being stats/progress */}
                      <div className="rounded-xl border border-border p-3 bg-muted/20">
                        <h4 className="text-xs font-extrabold text-muted-foreground uppercase mb-2">Wellness Indexes</h4>
                        <div className="space-y-3">
                          {(() => {
                            const rf = riskFactors[selectedStudent.id] || { academicDrop: 1, withdrawal: 1, outbursts: 1 };
                            return (
                              <>
                                <DuoProgress label="Academic Engagement" value={100 - rf.academicDrop * 20} color="green" />
                                <DuoProgress label="Social Interactivity" value={100 - rf.withdrawal * 20} color="blue" />
                                <DuoProgress label="Emotional Regulation" value={100 - rf.outbursts * 20} color="purple" />
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Session Logs History */}
                  <div className="mt-6 border-t border-border pt-4">
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wide mb-3">
                      Session Logs & Case Timeline
                    </h3>
                    <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                      {!selectedStudent.sessions || selectedStudent.sessions.length === 0 ? (
                        <p className="text-xs text-muted-foreground p-3 text-center border-2 border-dashed border-border rounded-xl">
                          No logged counselling session records found.
                        </p>
                      ) : (
                        selectedStudent.sessions.map((sess: any) => (
                          <div key={sess.id} className="rounded-xl border border-border p-3.5 bg-card">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-1.5 border-b border-muted">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="rounded-md bg-pink-100 text-duo-pink px-2 py-0.5 text-[10px] font-extrabold uppercase">
                                  {sess.type}
                                </span>
                                <span className="text-[11px] text-muted-foreground font-bold">{sess.date}</span>
                              </div>
                              <div className="flex items-center gap-1 text-xs">
                                <span className="text-muted-foreground font-bold">Progress index:</span>
                                <Chip color={sess.progress >= 4 ? "green" : sess.progress === 3 ? "yellow" : "red"}>
                                  ★ {sess.progress} / 5
                                </Chip>
                              </div>
                            </div>
                            <div className="text-xs font-bold text-foreground break-words whitespace-normal">{sess.summary}</div>
                            {sess.privateNotes && (
                              <div className="mt-2 text-xs bg-pink-50/30 border-l-2 border-duo-pink pl-2.5 py-1 text-foreground/80 italic font-semibold flex items-start gap-1">
                                <Lock className="size-3 text-duo-pink shrink-0 mt-0.5" />
                                <span className="break-words whitespace-normal">Confidential notes: {sess.privateNotes}</span>
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                </DuoCard>
              </div>

            </div>
          )}

          {/* TAB 3: CASE MANAGEMENT */}
          {activeTab === "cases" && (
            <div className="space-y-6 w-full min-w-0">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="font-display text-2xl font-extrabold">Confidential Case Files</h1>
                  <p className="text-xs text-muted-foreground">Manage active, observation, and resolved case records.</p>
                </div>
                <DuoButton variant="pink" size="sm" onClick={() => setOpenModal("newCase")}>
                  <Plus className="size-4" /> Open New Case
                </DuoButton>
              </div>

              {/* Case status boards */}
              <div className="grid gap-4 md:grid-cols-4">
                {["Active", "Observation", "Resolved", "Referred"].map((status) => {
                  const statusCases = cases.filter((c) => c.status === status);
                  const statusColors: Record<string, string> = {
                    Active: "border-duo-pink bg-pink-50/20 text-duo-pink",
                    Observation: "border-duo-orange bg-orange-50/20 text-duo-orange",
                    Resolved: "border-duo-green bg-green-50/20 text-duo-green-dark",
                    Referred: "border-duo-blue bg-blue-50/20 text-duo-blue",
                  };

                  return (
                    <div key={status} className="rounded-2xl border border-border p-3.5 bg-card space-y-3">
                      <div className={`flex items-center justify-between rounded-xl border p-2 text-xs font-bold uppercase tracking-wider ${statusColors[status]}`}>
                        <span>{status} Cases</span>
                        <span className="rounded-full bg-foreground/10 px-2 py-0.5">{statusCases.length}</span>
                      </div>
                      
                      <div className="space-y-2.5 max-h-[440px] overflow-y-auto">
                        {statusCases.length === 0 ? (
                          <div className="text-center py-8 border-2 border-dashed border-border rounded-xl text-xs text-muted-foreground">
                            No cases in this state.
                          </div>
                        ) : (
                          statusCases.map((c) => (
                            <div key={c.id} className="card-pop p-3 border border-border bg-card space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-duo-pink">{c.id}</span>
                                <Chip color={c.riskLevel === "High" ? "red" : c.riskLevel === "Medium" ? "orange" : "blue"}>
                                  {c.riskLevel}
                                </Chip>
                              </div>

                              <div className="flex items-center gap-1.5">
                                <span className="text-lg">{c.avatar}</span>
                                <span className="font-bold text-xs">{c.studentName}</span>
                              </div>

                              <div className="text-[11px] font-bold text-foreground leading-normal line-clamp-2">
                                {c.summary}
                              </div>

                              <div className="pt-1.5 border-t border-muted flex flex-col gap-1.5 text-[10px]">
                                <div className="flex justify-between text-muted-foreground font-bold">
                                  <span>Category:</span>
                                  <span className="text-foreground">{c.category}</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground font-bold">
                                  <span>Last Session:</span>
                                  <span className="text-foreground">{c.lastSessionDate}</span>
                                </div>
                              </div>

                              {/* Action controls */}
                              <div className="flex justify-between gap-1 pt-1">
                                <select
                                  value={c.status}
                                  onChange={(e) => handleUpdateCaseStatus(c.id, e.target.value)}
                                  className="w-full text-[10px] bg-muted/60 border border-border rounded-lg p-1 font-bold"
                                >
                                  <option value="Active">Active</option>
                                  <option value="Observation">Observe</option>
                                  <option value="Resolved">Resolve</option>
                                  <option value="Referred">Refer</option>
                                </select>
                                <select
                                  value={c.riskLevel}
                                  onChange={(e) => handleUpdateCaseRisk(c.id, e.target.value as any)}
                                  className="w-full text-[10px] bg-muted/60 border border-border rounded-lg p-1 font-bold"
                                >
                                  <option value="Low">Low</option>
                                  <option value="Medium">Medium</option>
                                  <option value="High">High</option>
                                </select>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: APPOINTMENT SCHEDULING */}
          {activeTab === "appointments" && (
            <div className="space-y-6 w-full min-w-0">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="font-display text-2xl font-extrabold">Appointment Scheduling</h1>
                  <p className="text-xs text-muted-foreground">Book and manage wellness assessment checks.</p>
                </div>
                <DuoButton variant="blue" size="sm" onClick={() => setOpenModal("newApt")}>
                  <Plus className="size-4" /> Book New Session
                </DuoButton>
              </div>

              <DuoCard className="p-4 border border-border bg-card">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted text-[11px] uppercase text-muted-foreground">
                      <tr>
                        <th className="px-4 py-2.5 text-left">Student</th>
                        <th className="px-4 py-2.5 text-left">Date</th>
                        <th className="px-4 py-2.5 text-left">Time Slot</th>
                        <th className="px-4 py-2.5 text-left">Session Type</th>
                        <th className="px-4 py-2.5 text-center">Status</th>
                        <th className="px-4 py-2.5 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {appointments.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center py-6 text-xs text-muted-foreground">
                            No appointments listed.
                          </td>
                        </tr>
                      ) : (
                        appointments.map((apt) => (
                          <tr key={apt.id} className="hover:bg-muted/10 font-medium">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{apt.avatar}</span>
                                <span className="font-bold text-xs">{apt.studentName}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-xs">{apt.date}</td>
                            <td className="px-4 py-3 text-xs">{apt.time}</td>
                            <td className="px-4 py-3 text-xs font-bold text-duo-purple">{apt.type}</td>
                            <td className="px-4 py-3 text-center">
                              <Chip color={apt.status === "Confirmed" ? "blue" : apt.status === "Completed" ? "green" : apt.status === "Cancelled" ? "red" : "white"}>
                                {apt.status}
                              </Chip>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <div className="inline-flex gap-1 justify-center">
                                {apt.status === "Pending" && (
                                  <button
                                    onClick={() => handleToggleAptStatus(apt.id, "Confirmed")}
                                    className="p-1 text-xs font-bold bg-duo-blue text-white rounded-md hover:opacity-90"
                                  >
                                    Confirm
                                  </button>
                                )}
                                {apt.status === "Confirmed" && (
                                  <button
                                    onClick={() => {
                                      handleToggleAptStatus(apt.id, "Completed");
                                      setSelectedStudentId(apt.studentId);
                                      setActiveTab("records");
                                    }}
                                    className="p-1.5 text-xs font-bold bg-duo-green text-white rounded-lg hover:opacity-90 flex items-center gap-1"
                                  >
                                    Complete & Log
                                  </button>
                                )}
                                {apt.status !== "Cancelled" && apt.status !== "Completed" && (
                                  <button
                                    onClick={() => handleToggleAptStatus(apt.id, "Cancelled")}
                                    className="p-1 px-1.5 text-xs font-bold bg-duo-red text-white rounded-lg hover:opacity-90"
                                  >
                                    Cancel
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </DuoCard>
            </div>
          )}

          {/* TAB 5: RISK & BEHAVIOUR TRACKING */}
          {activeTab === "risk" && (
            <div className="space-y-6 w-full min-w-0">
              <div>
                <h1 className="font-display text-2xl font-extrabold flex items-center gap-2">
                  <ShieldAlert className="size-6 text-duo-red animate-pulse" /> Wellness Risk Indicators
                </h1>
                <p className="text-xs text-muted-foreground">Monitor student distress indices and toggle self-harm warnings.</p>
              </div>

              <DuoCard className="p-4 border border-border bg-card">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted text-[11px] uppercase text-muted-foreground">
                      <tr>
                        <th className="px-4 py-2.5 text-left">Student</th>
                        <th className="px-4 py-2.5 text-center">Academic Drop</th>
                        <th className="px-4 py-2.5 text-center">Social Withdrawal</th>
                        <th className="px-4 py-2.5 text-center">Emotional Outbursts</th>
                        <th className="px-4 py-2.5 text-center">Self-Harm alert</th>
                        <th className="px-4 py-2.5 text-center">Overall Risk</th>
                        <th className="px-4 py-2.5 text-center">Last Updated</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {students.map((stud) => {
                        const rf = riskFactors[stud.id] || { academicDrop: 1, withdrawal: 1, outbursts: 1, selfHarmAlert: false, lastUpdated: "None" };
                        
                        // Calculate score
                        const maxIndex = Math.max(rf.academicDrop, rf.withdrawal, rf.outbursts);
                        let finalRisk: "Low" | "Medium" | "High" = "Low";
                        if (rf.selfHarmAlert || maxIndex >= 4) finalRisk = "High";
                        else if (maxIndex >= 3) finalRisk = "Medium";

                        return (
                          <tr key={stud.id} className="hover:bg-muted/10 font-medium">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{stud.avatar}</span>
                                <span className="font-bold text-xs">{stud.name}</span>
                              </div>
                            </td>
                            {/* Academic Drop */}
                            <td className="px-4 py-3 text-center">
                              <div className="inline-flex gap-1">
                                {[1, 2, 3, 4, 5].map((idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => handleUpdateRiskFactor(stud.id, "academicDrop", idx)}
                                    className={`size-5 rounded-md text-[10px] font-black ${
                                      rf.academicDrop >= idx
                                        ? idx >= 4
                                          ? "bg-duo-red text-white"
                                          : idx >= 3
                                            ? "bg-duo-orange text-white"
                                            : "bg-duo-green text-white"
                                        : "bg-muted text-muted-foreground border border-border"
                                    }`}
                                  >
                                    {idx}
                                  </button>
                                ))}
                              </div>
                            </td>
                            {/* Social Withdrawal */}
                            <td className="px-4 py-3 text-center">
                              <div className="inline-flex gap-1">
                                {[1, 2, 3, 4, 5].map((idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => handleUpdateRiskFactor(stud.id, "withdrawal", idx)}
                                    className={`size-5 rounded-md text-[10px] font-black ${
                                      rf.withdrawal >= idx
                                        ? idx >= 4
                                          ? "bg-duo-red text-white"
                                          : idx >= 3
                                            ? "bg-duo-orange text-white"
                                            : "bg-duo-green text-white"
                                        : "bg-muted text-muted-foreground border border-border"
                                    }`}
                                  >
                                    {idx}
                                  </button>
                                ))}
                              </div>
                            </td>
                            {/* Emotional Outbursts */}
                            <td className="px-4 py-3 text-center">
                              <div className="inline-flex gap-1">
                                {[1, 2, 3, 4, 5].map((idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => handleUpdateRiskFactor(stud.id, "outbursts", idx)}
                                    className={`size-5 rounded-md text-[10px] font-black ${
                                      rf.outbursts >= idx
                                        ? idx >= 4
                                          ? "bg-duo-red text-white"
                                          : idx >= 3
                                            ? "bg-duo-orange text-white"
                                            : "bg-duo-green text-white"
                                        : "bg-muted text-muted-foreground border border-border"
                                    }`}
                                  >
                                    {idx}
                                  </button>
                                ))}
                              </div>
                            </td>
                            {/* Self harm alert */}
                            <td className="px-4 py-3 text-center">
                              <button
                                onClick={() => handleToggleSelfHarm(stud.id)}
                                className={`p-1 px-2.5 rounded-xl text-[10px] font-extrabold uppercase transition ${
                                  rf.selfHarmAlert
                                    ? "bg-duo-red text-white animate-pulse"
                                    : "bg-muted text-muted-foreground border border-border"
                                }`}
                              >
                                {rf.selfHarmAlert ? "⚠️ Alert Active" : "No Report"}
                              </button>
                            </td>
                            {/* Final risk */}
                            <td className="px-4 py-3 text-center">
                              <Chip color={finalRisk === "High" ? "red" : finalRisk === "Medium" ? "orange" : "green"}>
                                {finalRisk} Risk
                              </Chip>
                            </td>
                            <td className="px-4 py-3 text-center text-xs text-muted-foreground">{rf.lastUpdated}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </DuoCard>
            </div>
          )}

          {/* TAB 6: CONFIDENTIAL REPORTS */}
          {activeTab === "reports" && (
            <div className="space-y-6 w-full min-w-0">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="font-display text-2xl font-extrabold">Confidential Reports Inbox</h1>
                  <p className="text-xs text-muted-foreground">Assess well-being concerns submitted by teachers or parents.</p>
                </div>
                <DuoButton variant="purple" size="sm" onClick={() => setOpenModal("newReport")}>
                  <Plus className="size-4" /> File New Report
                </DuoButton>
              </div>

              <div className="space-y-4">
                {reports.filter(r => r.status === "New").length === 0 ? (
                  <DuoCard className="p-8 border border-border bg-card text-center">
                    <CheckCircle className="size-10 text-duo-green mx-auto mb-2" />
                    <h2 className="font-display text-lg font-bold">Inbox is Clear!</h2>
                    <p className="text-xs text-muted-foreground">No new confidential reports require review at this time.</p>
                    {reports.length > 0 && (
                      <button
                        onClick={() => saveState({ reports: DEFAULT_REPORTS })}
                        className="mt-3 text-xs font-bold text-duo-pink hover:underline"
                      >
                        Reset Mock Reports list
                      </button>
                    )}
                  </DuoCard>
                ) : (
                  reports.filter((r) => r.status === "New").map((rep) => (
                    <DuoCard key={rep.id} className="p-4 border border-border bg-card relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-2.5 h-full bg-duo-purple" />
                      
                      <div className="flex justify-between items-start mb-2 pl-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-duo-purple">{rep.id}</span>
                            <Chip color={rep.urgency === "Urgent" || rep.urgency === "High" ? "red" : "white"}>
                              {rep.urgency} Urgency
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
                  ))
                )}

                {/* Filed or Archive reports toggle/list */}
                {reports.filter((r) => r.status !== "New").length > 0 && (
                  <DuoCard className="p-4 border border-border bg-card">
                    <h3 className="text-xs font-black text-muted-foreground uppercase mb-3">Processed Reports Log</h3>
                    <div className="space-y-2.5">
                      {reports.filter((r) => r.status !== "New").map((rep) => (
                        <div key={rep.id} className="flex justify-between items-center text-xs p-2.5 border border-border bg-muted/10 rounded-xl">
                          <div>
                            <span className="font-bold text-foreground">{rep.studentName}</span>
                            <span className="text-muted-foreground ml-1.5">Concern submitted by {rep.reporterName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-muted-foreground">{rep.date}</span>
                            <Chip color={rep.status === "Filed as Case" ? "pink" : "white"}>
                              {rep.status}
                            </Chip>
                          </div>
                        </div>
                      ))}
                    </div>
                  </DuoCard>
                )}
              </div>
            </div>
          )}

          {/* TAB 7: DISCIPLINE MODULE INTEGRATION */}
          {activeTab === "discipline" && (
            <div className="space-y-6 w-full min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="font-display text-2xl font-extrabold flex items-center gap-2">
                    <AlertOctagon className="size-6 text-duo-orange" /> Discipline Module Referral Sync
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Seamlessly review teacher demerits and sync students with behavioural incidents to counselling check-ins.
                  </p>
                </div>
                <div className="rounded-xl border border-orange-100 bg-orange-50/20 px-3 py-1.5 text-xs font-semibold text-duo-orange flex items-center gap-1.5">
                  <Activity className="size-3.5" />
                  <span>Real-time Sync Active</span>
                </div>
              </div>

              {/* Discipline and incidents tracking */}
              <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
                <DuoCard className="p-4 border border-border bg-card space-y-4">
                  <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Disciplinary Incidents Inbox</h2>
                  <div className="space-y-3">
                    {disciplineIncidents.map((incident) => {
                      const isLinked = incident.counsellingCaseId !== null;
                      return (
                        <div key={incident.id} className="border border-border rounded-xl p-3.5 bg-card relative overflow-hidden flex flex-col gap-2">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{incident.avatar}</span>
                              <div>
                                <span className="font-bold text-xs">{incident.studentName}</span>
                                <div className="text-[10px] text-muted-foreground">Logged: {incident.date} by {incident.loggedBy}</div>
                              </div>
                            </div>
                            <Chip color={incident.disciplineStatus === "Referred to Counselling" ? "pink" : incident.disciplineStatus === "Action Taken" ? "green" : "orange"}>
                              {incident.disciplineStatus}
                            </Chip>
                          </div>

                          <div className="text-xs font-semibold text-foreground/90 leading-relaxed bg-muted/40 p-2.5 rounded-xl border border-border">
                            {incident.infraction}
                          </div>

                          {/* Intervention Note Input */}
                          <div className="mt-1 pt-2 border-t border-muted">
                            {isLinked ? (
                              <div className="text-[11px] font-bold text-duo-pink flex items-center gap-1 bg-pink-50/20 p-2 rounded-lg border border-pink-100">
                                <BookmarkCheck className="size-3.5" />
                                <span>Linked to Wellness Case: {incident.counsellingCaseId}</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleIntakeDiscipline(incident)}
                                  className="px-2.5 py-1 text-[11px] font-bold bg-duo-pink text-white rounded-lg hover:opacity-90 transition shrink-0"
                                >
                                  Intake to Counselling
                                </button>
                                <span className="text-[10px] text-muted-foreground">or add counselling feedback:</span>
                              </div>
                            )}

                            {/* Counselling intervention response comments */}
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                const fd = new FormData(e.currentTarget);
                                const notes = fd.get("notes") as string;
                                handleSaveDisciplineIntervention(incident.id, notes);
                                e.currentTarget.reset();
                              }}
                              className="mt-2 flex gap-1.5"
                            >
                              <input
                                name="notes"
                                defaultValue={incident.interventionNotes || ""}
                                placeholder={isLinked ? "Append counselling follow-up notes..." : "Add de-escalation intervention notes..."}
                                className="flex-1 text-[11px] border border-border bg-card rounded-lg px-2 py-1 focus:ring-1 focus:ring-duo-orange focus:outline-none"
                              />
                              <button
                                type="submit"
                                className="p-1 px-2.5 text-[11px] font-bold bg-duo-orange text-white rounded-lg hover:opacity-90 shrink-0"
                              >
                                Save Note
                              </button>
                            </form>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </DuoCard>

                {/* Right side analytics/discipline overview */}
                <div className="space-y-4">
                  <DuoCard className="border border-border p-4 bg-card">
                    <h3 className="text-xs font-black text-muted-foreground uppercase mb-2">Discipline Referral Stat</h3>
                    <div className="space-y-3.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-muted-foreground">Total Referred to Counselling</span>
                        <span className="font-bold text-duo-pink">
                          {disciplineIncidents.filter((i) => i.counsellingReferral).length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-muted-foreground">Active Counselling Cases Linked</span>
                        <span className="font-bold text-duo-purple">
                          {cases.filter((c) => c.category === "Behavioral").length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-muted-foreground">Incidents Cleared via Intervention</span>
                        <span className="font-bold text-duo-green-dark">
                          {disciplineIncidents.filter((i) => i.disciplineStatus === "Action Taken").length}
                        </span>
                      </div>

                      <div className="border-t border-muted pt-3">
                        <div className="text-xs font-bold text-foreground mb-1.5 flex items-center gap-1">
                          <Heart className="size-3.5 text-duo-pink" /> Intervention Success Rate
                        </div>
                        <DuoProgress label="De-escalation progress" value={78} color="pink" />
                      </div>
                    </div>
                  </DuoCard>
                  
                  <DuoCard className="border border-border p-4 bg-[oklch(0.96_0.02_250)] text-xs text-muted-foreground space-y-2.5">
                    <div className="font-bold text-foreground flex items-center gap-1.5">
                      <ExternalLink className="size-3.5" /> Discipline Integration
                    </div>
                    <p className="leading-relaxed">
                      This sync allows the school counsellor to immediately review infractions filed by teachers in the classroom and convert them into counselling cases, addressing behavioural concerns with proactive therapy rather than just demerits.
                    </p>
                  </DuoCard>
                </div>
              </div>
            </div>
          )}


        </main>
      </div>

      {/* ============================================================ */}
      {/* MODALS / OVERLAYS & FORMS */}
      {/* ============================================================ */}
      
      {/* Modal 1: Open New Case */}
      {openModal === "newCase" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-card w-full max-w-md rounded-2xl border-2 border-border p-5 shadow-2xl animate-pop-in">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <h2 className="font-display text-lg font-bold flex items-center gap-1.5 text-duo-pink">
                <FolderHeart className="size-5" /> Open Counselling Case File
              </h2>
              <button onClick={() => setOpenModal(null)} className="text-muted-foreground hover:text-foreground text-sm font-bold">✕</button>
            </div>
            
            <form onSubmit={handleCreateCase} className="mt-3.5 space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">Student</label>
                <select
                  value={newCaseDraft.studentId}
                  onChange={(e) => setNewCaseDraft({ ...newCaseDraft, studentId: e.target.value })}
                  className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-pink focus:outline-none"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.avatar} {s.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">Category</label>
                  <select
                    value={newCaseDraft.category}
                    onChange={(e) => setNewCaseDraft({ ...newCaseDraft, category: e.target.value })}
                    className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-pink focus:outline-none"
                  >
                    <option>Academic Stress</option>
                    <option>Emotional Regulation</option>
                    <option>Peer Conflict</option>
                    <option>Family Issues</option>
                    <option>Behavioral</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">Risk Level</label>
                  <select
                    value={newCaseDraft.riskLevel}
                    onChange={(e) => setNewCaseDraft({ ...newCaseDraft, riskLevel: e.target.value })}
                    className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-pink focus:outline-none"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">Case Brief Summary</label>
                <textarea
                  required
                  value={newCaseDraft.summary}
                  onChange={(e) => setNewCaseDraft({ ...newCaseDraft, summary: e.target.value })}
                  placeholder="Summarize the primary concern, referral cause, and action plan..."
                  rows={3}
                  className="w-full text-xs bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-pink focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setOpenModal(null)}
                  className="px-4 py-2 text-xs font-bold bg-muted border border-border rounded-xl hover:bg-muted/80 text-muted-foreground transition"
                >
                  Cancel
                </button>
                <DuoButton type="submit" variant="pink" size="sm">
                  Create Case File
                </DuoButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Book Appointment */}
      {openModal === "newApt" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-card w-full max-w-md rounded-2xl border-2 border-border p-5 shadow-2xl animate-pop-in">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <h2 className="font-display text-lg font-bold flex items-center gap-1.5 text-duo-blue">
                <Calendar className="size-5" /> Schedule Session
              </h2>
              <button onClick={() => setOpenModal(null)} className="text-muted-foreground hover:text-foreground text-sm font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateAppointment} className="mt-3.5 space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">Select Student</label>
                <select
                  value={newAptDraft.studentId}
                  onChange={(e) => setNewAptDraft({ ...newAptDraft, studentId: e.target.value })}
                  className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-blue focus:outline-none"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.avatar} {s.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={newAptDraft.date}
                    onChange={(e) => setNewAptDraft({ ...newAptDraft, date: e.target.value })}
                    className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-blue focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">Time Slot</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 10:00 AM"
                    value={newAptDraft.time}
                    onChange={(e) => setNewAptDraft({ ...newAptDraft, time: e.target.value })}
                    className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-blue focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">Session Type</label>
                <select
                  value={newAptDraft.type}
                  onChange={(e) => setNewAptDraft({ ...newAptDraft, type: e.target.value })}
                  className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-blue focus:outline-none"
                >
                  <option>Individual</option>
                  <option>Group</option>
                  <option>Parent Consultation</option>
                  <option>Teacher Consultation</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setOpenModal(null)}
                  className="px-4 py-2 text-xs font-bold bg-muted border border-border rounded-xl hover:bg-muted/80 text-muted-foreground transition"
                >
                  Cancel
                </button>
                <DuoButton type="submit" variant="blue" size="sm">
                  Schedule Slot
                </DuoButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: File Incident Report */}
      {openModal === "newReport" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-card w-full max-w-md rounded-2xl border-2 border-border p-5 shadow-2xl animate-pop-in">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <h2 className="font-display text-lg font-bold flex items-center gap-1.5 text-duo-purple">
                <Inbox className="size-5" /> File Confidential Report
              </h2>
              <button onClick={() => setOpenModal(null)} className="text-muted-foreground hover:text-foreground text-sm font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateReport} className="mt-3.5 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">Reporter Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cikgu Nadia"
                    value={newReportDraft.reporterName}
                    onChange={(e) => setNewReportDraft({ ...newReportDraft, reporterName: e.target.value })}
                    className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-purple focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">Reporter Role</label>
                  <select
                    value={newReportDraft.reporterRole}
                    onChange={(e) => setNewReportDraft({ ...newReportDraft, reporterRole: e.target.value as any })}
                    className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-purple focus:outline-none"
                  >
                    <option value="Teacher">Teacher</option>
                    <option value="Parent">Parent</option>
                    <option value="Student">Student</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">Concern Student</label>
                  <select
                    value={newReportDraft.studentId}
                    onChange={(e) => setNewReportDraft({ ...newReportDraft, studentId: e.target.value })}
                    className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-purple focus:outline-none"
                  >
                    {students.map(s => (
                      <option key={s.id} value={s.id}>{s.avatar} {s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">Urgency</label>
                  <select
                    value={newReportDraft.urgency}
                    onChange={(e) => setNewReportDraft({ ...newReportDraft, urgency: e.target.value as any })}
                    className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-purple focus:outline-none"
                  >
                    <option>Normal</option>
                    <option>High</option>
                    <option>Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">Report Narrative Description</label>
                <textarea
                  required
                  value={newReportDraft.description}
                  onChange={(e) => setNewReportDraft({ ...newReportDraft, description: e.target.value })}
                  placeholder="State specific behaviors observed, indicators of distress, withdraw trends, outbursts..."
                  rows={3}
                  className="w-full text-xs bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-purple focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setOpenModal(null)}
                  className="px-4 py-2 text-xs font-bold bg-muted border border-border rounded-xl hover:bg-muted/80 text-muted-foreground transition"
                >
                  Cancel
                </button>
                <DuoButton type="submit" variant="purple" size="sm">
                  Log Report
                </DuoButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Navigation bottom bar for Mobile view */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 flex items-center overflow-x-auto border-t-2 border-border bg-card md:hidden px-2 py-1 gap-1 shadow-lg scrollbar-none">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          let hasBadge = false;
          let badgeValue = "";

          if (item.id === "reports" && newReportsCount > 0) {
            hasBadge = true;
            badgeValue = `${newReportsCount}`;
          } else if (item.id === "discipline" && disciplineIncidents.filter(i => i.disciplineStatus === "Pending Review").length > 0) {
            hasBadge = true;
            badgeValue = "!";
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center gap-1 py-1.5 px-2 rounded-xl text-[10px] font-bold flex-1 min-w-[64px] shrink-0 transition ${
                isActive ? "text-duo-pink bg-pink-50/40" : "text-muted-foreground hover:bg-muted/30"
              }`}
            >
              <Icon className="size-4" />
              <span className="truncate w-full text-center">{item.label}</span>
              {hasBadge && (
                <span className="absolute top-1.5 right-1.5 rounded-full bg-duo-pink size-3.5 flex items-center justify-center text-[8px] font-extrabold text-white">
                  {badgeValue}
                </span>
              )}
            </button>
          );
        })}
      </nav>

    </div>
  );
}
