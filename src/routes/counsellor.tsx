import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DuoButton, DuoCard, Chip } from "@/components/duo";
import { STUDENTS_IN_CLASS } from "@/lib/mockData";
import {
  Home,
  UserCheck,
  FolderHeart,
  Calendar,
  ShieldAlert,
  Inbox,
  AlertOctagon,
  ChevronRight,
  BookmarkCheck,
  Lock,
} from "lucide-react";

// Modular tab components
import { DashboardTab } from "@/components/counsellor/dashboard/DashboardTab";
import { StudentRecordsTab } from "@/components/counsellor/records/StudentRecordsTab";
import { CaseManagerTab } from "@/components/counsellor/cases/CaseManagerTab";
import { AppointmentsTab } from "@/components/counsellor/appointments/AppointmentsTab";
import { RiskTrackingTab } from "@/components/counsellor/risk/RiskTrackingTab";
import { PendingActionsTab } from "@/components/counsellor/pending/PendingActionsTab";
import { InboxReportsTab } from "@/components/counsellor/reports/InboxReportsTab";
import { DisciplineSyncTab } from "@/components/counsellor/discipline/DisciplineSyncTab";

// Modals
import { NewCaseModal } from "@/components/counsellor/modals/NewCaseModal";
import { EditCaseModal } from "@/components/counsellor/modals/EditCaseModal";
import { ScheduleSessionModal } from "@/components/counsellor/modals/ScheduleSessionModal";
import { CloseCaseModal } from "@/components/counsellor/modals/CloseCaseModal";
import { ViewAptModal } from "@/components/counsellor/modals/ViewAptModal";
import { NewReportModal } from "@/components/counsellor/modals/NewReportModal";
import { DismissReportModal } from "@/components/counsellor/modals/DismissReportModal";
import { ReviewIncidentModal } from "@/components/counsellor/modals/ReviewIncidentModal";
import { ViewReportModal } from "@/components/counsellor/modals/ViewReportModal";


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
  const isSara = student.name.includes("Sara");

  let caseId = "CASE-105";
  let riskLevel = "Low";
  let tags = ["Career"];
  let lastActivityDate = "2026-06-14";
  let wellnessSummary = "Student appears well-adjusted. High participation in class and active socially.";

  let academic = { overallGrade: "A", examRank: "1st in Class", atRiskSubjects: [] as string[] };
  let attendance = { monthlyPercent: 96, termAverage: 95, absentDays: 1 };
  let sessionHistory = { totalSessions: 0, lastSessionDate: "None", nextScheduled: "None" };
  let behaviour = { incidentCount: 0, openDisciplineReferrals: 0 };
  let support = { parentName: "Mr. Nair", classTeacher: "Cikgu Nadia", hod: "Mr. Albert", lastParentMessageDate: "2026-06-10" };
  let pendingTasks: any[] = [
    { id: "t6", text: "Provide scholarship information brochures", urgency: "pending", dueDate: "2026-06-28" }
  ];

  let sessionsLog = [] as any[];
  let interventions: any[] = [
    { id: "i5", type: "Career Guidance", startDate: "2026-06-14", endDate: "", status: "Active", assignedPerson: "Puan Maryam", outcomeNotes: "Discussing school options next term." }
  ];
  let referrals: any[] = [
    { id: "r5", whoReferred: "Self", reason: "Discuss secondary school selection and career paths in STEM.", dateSubmitted: "2026-06-13", urgency: "Low", status: "Open", notes: "Interest in technology and engineering." }
  ];
  let goals: any[] = [
    { id: "g5", title: "Research top 3 secondary schools", category: "Career", targetDate: "2026-07-15", status: "Not Started", linkedItems: "Self Referral" }
  ];
  let documents: any[] = [
    { id: "d5", name: "Career_Interest_Inventory.pdf", uploadDate: "2026-06-14", uploadedBy: "Zara Nair", accessLevel: "Shared" }
  ];

  if (isAisyah) {
    caseId = "CASE-103";
    riskLevel = "Low";
    tags = ["Academic", "Referral"];
    lastActivityDate = "2026-06-16";
    wellnessSummary = "Routine check-in. Aisha is excited about school and discussed minor exam anxieties.";
    academic = { overallGrade: "A", examRank: "3rd in Class", atRiskSubjects: [] };
    attendance = { monthlyPercent: 95, termAverage: 96, absentDays: 1 };
    sessionHistory = { totalSessions: 1, lastSessionDate: "2026-06-02", nextScheduled: "2026-06-17" };
    behaviour = { incidentCount: 0, openDisciplineReferrals: 0 };
    support = { parentName: "Encik Rahman", classTeacher: "Cikgu Nadia", hod: "Mr. Albert", lastParentMessageDate: "2026-06-15" };
    pendingTasks = [
      { id: "t1", text: "Routine check-in on homework progress", urgency: "pending" as const, dueDate: "2026-06-25" }
    ];
    sessionsLog = [
      {
        id: "s-1",
        date: "2026-06-02",
        type: "Individual",
        duration: "30 mins",
        counselorName: "Puan Maryam",
        notes: "Routine check-in. Aisha is excited about school and discussed minor exam anxieties.",
        outcome: "Coping strategies discussed",
        followUpTasks: ["Check homework next week"]
      }
    ];
    interventions = [
      { id: "i6", type: "Academic Support" as const, startDate: "2026-05-10", endDate: "2026-06-01", status: "Completed" as const, assignedPerson: "Cikgu Nadia", outcomeNotes: "Aisha improved her mathematics mock grades." }
    ];
    referrals = [
      { id: "r1", whoReferred: "Teacher" as const, reason: "Slight nervousness during math examinations.", dateSubmitted: "2026-06-01", urgency: "Low" as const, status: "Closed" as const, notes: "Counselling requested, initial meeting done." }
    ];
    goals = [
      { id: "g1", title: "Manage test anxiety", category: "Academic" as const, targetDate: "2026-07-01", status: "In Progress" as const, linkedItems: "Session 2026-06-02" }
    ];
    documents = [
      { id: "d1", name: "Parental_Consent_Form.pdf", uploadDate: "2026-06-01", uploadedBy: "Encik Rahman", accessLevel: "Shared" as const }
    ];
  } else if (isDanish) {
    caseId = "CASE-101";
    riskLevel = "High";
    tags = ["Attendance", "Academic", "Behaviour", "Referral"];
    lastActivityDate = "2026-06-18";
    wellnessSummary = "Danish has shown significant academic decline and emotional withdrawal recently. Requires active support.";
    academic = { overallGrade: "C+", examRank: "18th in Class", atRiskSubjects: ["Science", "Mathematics"] };
    attendance = { monthlyPercent: 78, termAverage: 82, absentDays: 8 };
    sessionHistory = { totalSessions: 2, lastSessionDate: "2026-06-15", nextScheduled: "2026-06-17" };
    behaviour = { incidentCount: 2, openDisciplineReferrals: 1 };
    support = { parentName: "Mr. Kumar", classTeacher: "Cikgu Nadia", hod: "Mr. Albert", lastParentMessageDate: "2026-06-16" };
    pendingTasks = [
      { id: "t4", text: "Contact parent for review meeting", urgency: "overdue" as const, dueDate: "2026-06-19" },
      { id: "t5", text: "Science teacher feedback check", urgency: "due_soon" as const, dueDate: "2026-06-24" }
    ];
    sessionsLog = [
      {
        id: "s-2",
        date: "2026-06-08",
        type: "Individual",
        duration: "45 mins",
        counselorName: "Puan Maryam",
        notes: "Danish shared that he feels overwhelmed by classroom expectations and is struggling to focus.",
        outcome: "Coping strategies discussed",
        followUpTasks: []
      },
      {
        id: "s-3",
        date: "2026-06-15",
        type: "Individual",
        duration: "50 mins",
        counselorName: "Puan Maryam",
        notes: "Follow-up session. Discussed study techniques and emotional regulation. Danish was slightly more communicative.",
        outcome: "Relaxation techniques practiced",
        followUpTasks: ["Review sleep diary"]
      }
    ];
    interventions = [
      { id: "i3", type: "Academic Support" as const, startDate: "2026-06-09", endDate: "", status: "Active" as const, assignedPerson: "Cikgu Nadia", outcomeNotes: "Danish is being monitored for missed homework." }
    ];
    referrals = [
      { id: "r4", whoReferred: "Teacher" as const, reason: "Caught cheating during test and skipping mathematics class.", dateSubmitted: "2026-06-08", urgency: "High" as const, status: "In Progress" as const, notes: "Assigned active case." }
    ];
    goals = [
      { id: "g4", title: "Complete all science homework", category: "Academic" as const, targetDate: "2026-06-30", status: "In Progress" as const, linkedItems: "Intervention 2026-06-09" }
    ];
    documents = [
      { id: "d4", name: "Science_Test_Incident.pdf", uploadDate: "2026-06-08", uploadedBy: "Cikgu Nadia", accessLevel: "Confidential" as const }
    ];
  } else if (isAli) {
    caseId = "CASE-102";
    riskLevel = "Medium";
    tags = ["Behaviour", "Referral"];
    lastActivityDate = "2026-06-12";
    wellnessSummary = "Ali is energetic and friendly, but sometimes struggles with impulse control in classroom group settings.";
    academic = { overallGrade: "B+", examRank: "12th in Class", atRiskSubjects: [] };
    attendance = { monthlyPercent: 88, termAverage: 90, absentDays: 4 };
    sessionHistory = { totalSessions: 1, lastSessionDate: "2026-06-10", nextScheduled: "2026-06-18" };
    behaviour = { incidentCount: 1, openDisciplineReferrals: 1 };
    support = { parentName: "Puan Zarina", classTeacher: "Cikgu Nadia", hod: "Mr. Albert", lastParentMessageDate: "2026-06-12" };
    pendingTasks = [
      { id: "t2", text: "Speak to art teacher regarding classroom interactions", urgency: "due_soon" as const, dueDate: "2026-06-23" }
    ];
    sessionsLog = [
      {
        id: "s-4",
        date: "2026-06-10",
        type: "Teacher Consultation",
        duration: "45 mins",
        counselorName: "Puan Maryam",
        notes: "Met with Cikgu Nadia to discuss Ali's behavior. Devised a positive reinforcement seat plan.",
        outcome: "Visual rewards contract established",
        followUpTasks: ["Ask teacher for weekly update"]
      }
    ];
    interventions = [
      { id: "i1", type: "Behaviour Plan" as const, startDate: "2026-06-11", endDate: "", status: "Active" as const, assignedPerson: "Cikgu Nadia", outcomeNotes: "Ali has responded well to immediate visual rewards." }
    ];
    referrals = [
      { id: "r2", whoReferred: "Teacher" as const, reason: "Verbal disputes in Art class.", dateSubmitted: "2026-06-09", urgency: "Medium" as const, status: "In Progress" as const, notes: "Under observation." }
    ];
    goals = [
      { id: "g2", title: "Improve impulse control", category: "Behavioural" as const, targetDate: "2026-06-30", status: "In Progress" as const, linkedItems: "Behaviour Plan" }
    ];
    documents = [
      { id: "d2", name: "Art_Class_Incident_Report.pdf", uploadDate: "2026-06-10", uploadedBy: "Cikgu Nadia", accessLevel: "Confidential" as const }
    ];
  } else if (isSara) {
    caseId = "CASE-104";
    riskLevel = "Medium";
    tags = ["Emotional", "Academic"];
    lastActivityDate = "2026-06-15";
    wellnessSummary = "Sara is showing signs of anxiety before her upcoming math exam. She complains of stomach aches in the morning.";
    academic = { overallGrade: "A-", examRank: "6th in Class", atRiskSubjects: ["Mathematics"] };
    attendance = { monthlyPercent: 92, termAverage: 93, absentDays: 2 };
    sessionHistory = { totalSessions: 1, lastSessionDate: "2026-06-14", nextScheduled: "2026-06-20" };
    behaviour = { incidentCount: 0, openDisciplineReferrals: 0 };
    support = { parentName: "Mrs. Lim", classTeacher: "Cikgu Nadia", hod: "Mr. Albert", lastParentMessageDate: "2026-06-14" };
    pendingTasks = [
      { id: "t3", text: "Send home relaxation exercises", urgency: "overdue" as const, dueDate: "2026-06-20" }
    ];
    sessionsLog = [
      {
        id: "s-5",
        date: "2026-06-14",
        type: "Individual",
        duration: "40 mins",
        counselorName: "Puan Maryam",
        notes: "Sara expressed extreme worry about math formulas and felt physical tension during mock tests.",
        outcome: "Breathing techniques introduced",
        followUpTasks: ["Review anxiety exercises"]
      }
    ];
    interventions = [
      { id: "i2", type: "Emotional Support" as const, startDate: "2026-06-14", endDate: "", status: "Active" as const, assignedPerson: "Puan Maryam", outcomeNotes: "Weekly wellness checkups." }
    ];
    referrals = [
      { id: "r3", whoReferred: "Parent" as const, reason: "Sara is showing signs of anxiety and morning stomach aches before exams.", dateSubmitted: "2026-06-14", urgency: "Medium" as const, status: "Open" as const, notes: "Referral received from parent." }
    ];
    goals = [
      { id: "g3", title: "Reduce test-related physical symptoms", category: "Emotional" as const, targetDate: "2026-07-10", status: "In Progress" as const, linkedItems: "Session 2026-06-14" }
    ];
    documents = [
      { id: "d3", name: "Anxiety_Self_Assessment.pdf", uploadDate: "2026-06-14", uploadedBy: "Puan Maryam", accessLevel: "Confidential" as const }
    ];
  }

  return {
    ...student,
    age: 11,
    guardian: isAisyah ? "Encik Rahman" : isDanish ? "Mr. Kumar" : isAli ? "Puan Zarina" : isSara ? "Mrs. Lim" : "Mr. Nair",
    guardianContact: "+60 12-345-67" + (isAisyah ? "89" : isDanish ? "54" : isAli ? "12" : isSara ? "34" : "56"),
    wellnessSummary,
    caseId,
    riskLevel,
    tags,
    lastActivityDate,
    academic,
    attendance,
    sessionHistory,
    behaviour,
    support,
    pendingTasks,
    sessionsLog,
    interventions,
    referrals,
    goals,
    documents,
    sessions: sessionsLog
  };
});

const DEFAULT_CASES = [
  {
    id: "CASE-101",
    studentId: "s4",
    studentName: "Danish Kumar",
    avatar: "👦🏾",
    category: "Academic",
    riskLevel: "High" as const,
    status: "In Progress" as const,
    openDate: "2026-06-08",
    lastSessionDate: "2026-06-15",
    summary: "Managing general academic burnout and classroom isolation.",
    assignedCounselor: "Puan Maryam",
    notes: "Danish has shown academic decline and classroom withdrawal, support plan initiated.",
    closedDate: "",
    closedBy: "",
  },
  {
    id: "CASE-102",
    studentId: "s2",
    studentName: "Ali Hassan",
    avatar: "👦🏽",
    category: "Behaviour",
    riskLevel: "Medium" as const,
    status: "Open" as const,
    openDate: "2026-06-10",
    lastSessionDate: "2026-06-10",
    summary: "Impulse control check-in in art and primary group classroom settings.",
    assignedCounselor: "Puan Maryam",
    notes: "Ali responds moderately well to immediate reward charts.",
    closedDate: "",
    closedBy: "",
  },
  {
    id: "CASE-103",
    studentId: "s1",
    studentName: "Aisyah Rahman",
    avatar: "👧🏻",
    category: "Academic",
    riskLevel: "Low" as const,
    status: "Closed" as const,
    openDate: "2026-06-02",
    lastSessionDate: "2026-06-02",
    summary: "Anxiety support during examination period.",
    assignedCounselor: "Puan Maryam",
    notes: "Aisha successfully learned coping techniques for Math test stress.",
    closedDate: "2026-06-15",
    closedBy: "Puan Maryam",
  },
  {
    id: "CASE-104",
    studentId: "s3",
    studentName: "Sara Lim",
    avatar: "👧🏼",
    category: "Emotional",
    riskLevel: "Medium" as const,
    status: "In Progress" as const,
    openDate: "2026-06-14",
    lastSessionDate: "2026-06-14",
    summary: "Anxiety support due to morning stomach aches.",
    assignedCounselor: "Puan Maryam",
    notes: "Sara completed self assessments, counselor routine checkups scheduled.",
    closedDate: "",
    closedBy: "",
  },
  {
    id: "CASE-105",
    studentId: "s5",
    studentName: "Zara Nair",
    avatar: "👧🏽",
    category: "Career",
    riskLevel: "Low" as const,
    status: "Open" as const,
    openDate: "2026-06-14",
    lastSessionDate: "2026-06-14",
    summary: "Secondary STEM selection options review.",
    assignedCounselor: "Puan Maryam",
    notes: "Completed interest inventory.",
    closedDate: "",
    closedBy: "",
  }
];

const DEFAULT_APPOINTMENTS = [
  {
    id: "apt-1",
    studentId: "s4",
    studentName: "Danish Kumar",
    avatar: "👦🏾",
    caseId: "CASE-101",
    date: "2026-06-22",
    time: "09:00",
    duration: "45 mins",
    counselorName: "Puan Maryam",
    type: "Individual" as const,
    status: "Confirmed" as const,
    notes: "Discuss math test cheating incident and academic pressure.",
    reminder: "15m" as const,
  },
  {
    id: "apt-2",
    studentId: "s1",
    studentName: "Aisyah Rahman",
    avatar: "👧🏻",
    caseId: "CASE-103",
    date: "2026-06-22",
    time: "11:30",
    duration: "30 mins",
    counselorName: "Puan Maryam",
    type: "Follow-up" as const,
    status: "Confirmed" as const,
    notes: "Check-in on homework progress and exam coping techniques.",
    reminder: "1h" as const,
  },
  {
    id: "apt-3",
    studentId: "s2",
    studentName: "Ali Hassan",
    avatar: "👦🏽",
    caseId: "CASE-102",
    date: "2026-06-23",
    time: "14:00",
    duration: "60 mins",
    counselorName: "Mr. Albert",
    type: "Group" as const,
    status: "Pending" as const,
    notes: "Social skills group therapy session.",
    reminder: "1d" as const,
  },
  {
    id: "apt-4",
    studentId: "s3",
    studentName: "Sara Lim",
    avatar: "👧🏼",
    caseId: "CASE-104",
    date: "2026-06-22",
    time: "15:30",
    duration: "45 mins",
    counselorName: "Puan Maryam",
    type: "Emergency" as const,
    status: "Confirmed" as const,
    notes: "Acute exam anxiety report. High distress.",
    reminder: "none" as const,
  },
  {
    id: "apt-5",
    studentId: "s5",
    studentName: "Zara Nair",
    avatar: "👧🏽",
    caseId: "CASE-105",
    date: "2026-06-24",
    time: "10:00",
    duration: "45 mins",
    counselorName: "Puan Maryam",
    type: "Follow-up" as const,
    status: "Cancelled" as const,
    notes: "Review STEM career inventory outcomes.",
    reminder: "none" as const,
  },
  {
    id: "apt-6",
    studentId: "s4",
    studentName: "Danish Kumar",
    avatar: "👦🏾",
    caseId: "CASE-101",
    date: "2026-06-25",
    time: "13:00",
    duration: "30 mins",
    counselorName: "Puan Maryam",
    type: "Individual" as const,
    status: "Pending" as const,
    notes: "Follow up on parent communication response.",
    reminder: "15m" as const,
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
    id: "INC-301",
    studentId: "s4",
    studentName: "Danish Kumar",
    avatar: "👦🏾",
    grade: "Grade 5",
    date: "2026-06-08",
    description: "Caught cheating during the Science Unit Test on plant cells.",
    type: "Academic misconduct",
    status: "Linked" as const,
    loggedBy: "Cikgu Nadia",
    reporterRole: "Teacher",
    adminAction: "warning",
    counsellingCaseId: "CASE-101",
  },
  {
    id: "INC-302",
    studentId: "s2",
    studentName: "Ali Hassan",
    avatar: "👦🏽",
    grade: "Grade 6",
    date: "2026-06-12",
    description: "Frequent disruptions and yelling in the Art class, refusing to follow instructions and throwing pencil cases.",
    type: "Verbal altercation",
    status: "Linked" as const,
    loggedBy: "Cikgu Nadia",
    reporterRole: "Teacher",
    adminAction: "parent notification",
    counsellingCaseId: "CASE-102",
  },
  {
    id: "INC-303",
    studentId: "s4",
    studentName: "Danish Kumar",
    avatar: "👦🏾",
    grade: "Grade 5",
    date: "2026-06-15",
    description: "Unexcused absence and cutting classes (Mathematics) twice in one week without valid reasons.",
    type: "Truancy",
    status: "New" as const,
    loggedBy: "Cikgu Nadia",
    reporterRole: "Teacher",
    adminAction: "warning",
    counsellingCaseId: null,
  },
  {
    id: "INC-304",
    studentId: "s3",
    studentName: "Sara Lim",
    avatar: "👧🏼",
    grade: "Grade 5",
    date: "2026-06-20",
    description: "Crying uncontrollably before math class, complaining of extreme panic and exam anxiety.",
    type: "Emotional",
    status: "New" as const,
    loggedBy: "Cikgu Nadia",
    reporterRole: "Teacher",
    adminAction: "parent notification",
    counsellingCaseId: null,
  },
  {
    id: "INC-305",
    studentId: "s4",
    studentName: "Danish Kumar",
    avatar: "👦🏾",
    grade: "Grade 5",
    date: "2026-06-22",
    description: "Got into a physical altercation with another student during recess over a football dispute.",
    type: "Aggression",
    status: "New" as const,
    loggedBy: "Mr. Albert",
    reporterRole: "Teacher",
    adminAction: "suspension",
    counsellingCaseId: null,
  },
  {
    id: "INC-306",
    studentId: "s1",
    studentName: "Aisyah Rahman",
    avatar: "👧🏻",
    grade: "Grade 6",
    date: "2026-06-24",
    description: "Minor copying of homework answers from classmate. Student apologized and showed remorse.",
    type: "Academic misconduct",
    status: "Reviewed" as const,
    loggedBy: "Cikgu Nadia",
    reporterRole: "Teacher",
    adminAction: "warning",
    counsellingCaseId: null,
  }
];

const NAV_ITEMS = [
  { id: "overview", label: "Dashboard", icon: Home },
  { id: "records", label: "Student Records", icon: UserCheck },
  { id: "cases", label: "Case Manager", icon: FolderHeart },
  { id: "appointments", label: "Appointments", icon: Calendar },
  { id: "risk", label: "Risk Tracking", icon: ShieldAlert },
  { id: "pending_actions", label: "Pending Actions", icon: BookmarkCheck },
  { id: "reports", label: "Inbox Reports", icon: Inbox, badge: "New" },
  { id: "discipline", label: "Discipline Sync", icon: AlertOctagon },
];

function CounsellorPortal() {
  const [activeTab, setActiveTab] = useState("overview");
  const [taskFilter, setTaskFilter] = useState("All");
  const [taskSearchQuery, setTaskSearchQuery] = useState("");
  const todayDateStr = "2026-06-25";

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
  const [reportSearchQuery, setReportSearchQuery] = useState("");
  const [reportToDismiss, setReportToDismiss] = useState<any | null>(null);
  const [reportToView, setReportToView] = useState<any | null>(null);
  const [newReportStudentSearch, setNewReportStudentSearch] = useState("");
  const [newReportShowDropdown, setNewReportShowDropdown] = useState(false);
  // Discipline Sync UI and filtering states
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);
  const [disciplineSearchQuery, setDisciplineSearchQuery] = useState("");
  const [disciplineStatusFilter, setDisciplineStatusFilter] = useState("All");
  const [disciplineTypeFilter, setDisciplineTypeFilter] = useState("All");
  const [disciplineGradeFilter, setDisciplineGradeFilter] = useState("All");
  const [incidentToLinkCase, setIncidentToLinkCase] = useState<any | null>(null);
  const [showLinkCaseDropdown, setShowLinkCaseDropdown] = useState(false);
  const [linkCaseSearch, setLinkCaseSearch] = useState("");
  const [incidentToReview, setIncidentToReview] = useState<any | null>(null);

  const [sessionDraft, setSessionDraft] = useState({ type: "Individual", progress: 3, summary: "", privateNotes: "" });
  const [newCaseDraft, setNewCaseDraft] = useState({
    studentId: "s1",
    category: "Academic",
    riskLevel: "Medium",
    summary: "",
    assignedCounselor: "Puan Maryam",
    openDate: new Date().toISOString().split("T")[0],
    notes: "",
  });
  const [newAptDraft, setNewAptDraft] = useState({ studentId: "s1", date: "", time: "", type: "Individual" });
  const [newReportDraft, setNewReportDraft] = useState({ studentId: "s1", reporterName: "", reporterRole: "Teacher", description: "", urgency: "Normal" });

  const [openModal, setOpenModal] = useState<string | null>(null);
  const [mobileShowCaseDetail, setMobileShowCaseDetail] = useState(false);

  // Sub-Tab Navigation inside Student Records
  const [activeSubTab, setActiveSubTab] = useState("profile");

  // Filters for left Student list
  const [riskFilter, setRiskFilter] = useState("All");
  const [issueFilter, setIssueFilter] = useState("All");

  // Wellness Risk Tracking tab states
  const [showSelfHarmWarnings, setShowSelfHarmWarnings] = useState(true);
  const [riskSearchQuery, setRiskSearchQuery] = useState("");
  const [riskLevelFilter, setRiskLevelFilter] = useState("All");
  const [riskSortBy, setRiskSortBy] = useState("default");



  // Case Manager State
  const [selectedCaseId, setSelectedCaseId] = useState<string>("CASE-101");
  const [caseSearch, setCaseSearch] = useState("");
  const [caseStatusFilter, setCaseStatusFilter] = useState("All");
  const [caseRiskFilter, setCaseRiskFilter] = useState("All");

  const [studentSearchTerm, setStudentSearchTerm] = useState("");
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);

  const [scheduleAptDraft, setScheduleAptDraft] = useState({
    date: "",
    time: "",
    type: "Individual",
    duration: "45 mins",
    counselorName: "Puan Maryam",
    notes: "",
  });

  const [editCaseDraft, setEditCaseDraft] = useState<any>(null);
  const [closeCaseNotesDraft, setCloseCaseNotesDraft] = useState("");

  // Appointments Module States
  const [selectedAptDate, setSelectedAptDate] = useState("2026-06-22");
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [aptCounselorFilter, setAptCounselorFilter] = useState("All");
  const [aptTypeFilter, setAptTypeFilter] = useState("All");
  const [aptMonthFilter, setAptMonthFilter] = useState("2026-06");
  const [selectedAptId, setSelectedAptId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<any[]>([
    { id: "notif-1", text: "Appointment with Danish Kumar at 09:00 AM (Today)", read: false, date: "2026-06-22" },
    { id: "notif-2", text: "Appointment with Aisyah Rahman at 11:30 AM (Today)", read: false, date: "2026-06-22" },
  ]);


  const [rescheduleDraft, setRescheduleDraft] = useState({ date: "", time: "" });

  const getTimelineEvents = (caseObj: any) => {
    if (!caseObj) return [];
    const student = students.find((s) => s.id === caseObj.studentId);
    const events: { date: string; title: string; description: string; urgency: "red" | "yellow" | "green" | "grey" }[] = [];

    if (!student) return [];

    // 1. Case Opened Event
    events.push({
      date: caseObj.openDate || "2026-06-08",
      title: "Case Opened",
      description: `Case opened for ${student.name} by ${caseObj.assignedCounselor || "Puan Maryam"}. Category: ${caseObj.category}. Notes: ${caseObj.summary || caseObj.notes || 'None'}`,
      urgency: "grey",
    });

    // 2. Case Closed Event (if Closed)
    if (caseObj.status === "Closed") {
      events.push({
        date: caseObj.closedDate || caseObj.lastActivityDate || new Date().toISOString().split("T")[0],
        title: "Case Closed",
        description: `Case resolved and closed by ${caseObj.closedBy || "Puan Maryam"}. Notes: ${caseObj.notes || 'None'}`,
        urgency: "green",
      });
    }

    // 3. Sessions Logged Events
    if (student.sessionsLog) {
      student.sessionsLog.forEach((sess: any) => {
        events.push({
          date: sess.date,
          title: `Session Logged (${sess.type})`,
          description: `Conducted by ${sess.counselorName || "Puan Maryam"}. Duration: ${sess.duration || "45 mins"}. Outcome: ${sess.outcome || "Coping strategies discussed"}. Notes: ${sess.notes || "None"}`,
          urgency: "green",
        });
      });
    }

    // 4. Interventions Added Events
    if (student.interventions) {
      student.interventions.forEach((inv: any) => {
        let urg: "red" | "yellow" | "green" | "grey" = "yellow";
        if (inv.status === "Completed") urg = "green";
        if (inv.status === "Discontinued") urg = "red";

        events.push({
          date: inv.startDate,
          title: `Intervention Added: ${inv.type}`,
          description: `Assigned to ${inv.assignedPerson || "Cikgu Nadia"}. Status: ${inv.status || "Active"}. Outcome notes: ${inv.outcomeNotes || "None"}`,
          urgency: urg,
        });
      });
    }

    // 5. Referrals Received Events
    if (student.referrals) {
      student.referrals.forEach((ref: any) => {
        let urg: "red" | "yellow" | "green" | "grey" = "grey";
        if (ref.status !== "Closed") {
          urg = ref.urgency === "High" ? "red" : ref.urgency === "Medium" ? "yellow" : "grey";
        }

        events.push({
          date: ref.dateSubmitted,
          title: `Referral Received (Source: ${ref.whoReferred})`,
          description: `Urgency level: ${ref.urgency || "Medium"}. Status: ${ref.status || "Open"}. Reason: ${ref.reason}`,
          urgency: urg,
        });
      });
    }

    // 6. Overdue Tasks Events
    if (student.pendingTasks) {
      student.pendingTasks.forEach((task: any) => {
        if (task.urgency === "overdue") {
          events.push({
            date: task.dueDate || caseObj.openDate,
            title: "Follow-up Task Overdue",
            description: `Action needed: "${task.text}" (Due Date: ${task.dueDate || "Passed"})`,
            urgency: "red",
          });
        }
      });
    }

    // 7. Appointment Events
    const studentApts = appointments.filter((a) => a.studentId === student.id);
    studentApts.forEach((apt: any) => {
      let urg: "red" | "yellow" | "green" | "grey" = "grey";
      if (apt.status === "Confirmed") urg = "green";
      if (apt.status === "Pending") urg = "yellow";
      if (apt.status === "Cancelled") urg = "red";

      events.push({
        date: apt.date,
        title: `Appointment ${apt.status} (${apt.type})`,
        description: `Scheduled with ${apt.counselorName || "Puan Maryam"} at ${apt.time}. Duration: ${apt.duration || "45 mins"}. Notes: ${apt.notes || "None"}.`,
        urgency: urg,
      });
    });

    // 8. Linked Discipline Incidents
    const studentIncidents = disciplineIncidents.filter((i) => i.studentId === student.id && i.counsellingCaseId === caseObj.id);
    studentIncidents.forEach((inc: any) => {
      events.push({
        date: inc.date,
        title: `Discipline Incident Linked (${inc.id})`,
        description: `Discipline incident ${inc.id} (${inc.type}) linked to this case. Description: ${inc.description}`,
        urgency: "yellow",
      });
    });

    // Sort chronologically (newest first)
    return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  // Initialize/Load State from Local Storage
  useEffect(() => {
    const saved = localStorage.getItem("counsellor_state");
    if (saved) {
      try {
        const s = JSON.parse(saved);
        if (s.students) {
          const mergedStudents = s.students.map((savedStud: any) => {
            const defStud = DEFAULT_STUDENTS_PROFILE.find((ds) => ds.id === savedStud.id);
            if (!defStud) return savedStud;

            const sessionsLog = (savedStud.sessionsLog && savedStud.sessionsLog.length > 0)
              ? savedStud.sessionsLog
              : (defStud.sessionsLog || []);

            const interventions = ((savedStud.interventions && savedStud.interventions.length > 0)
              ? savedStud.interventions
              : (defStud.interventions || [])).map((inv: any) => ({
                status: "Active",
                endDate: "",
                ...inv
              }));

            const referrals = ((savedStud.referrals && savedStud.referrals.length > 0)
              ? savedStud.referrals
              : (defStud.referrals || [])).map((ref: any) => ({
                whoReferred: "Teacher",
                urgency: "Medium",
                status: "Open",
                notes: "",
                ...ref
              }));

            const goals = ((savedStud.goals && savedStud.goals.length > 0)
              ? savedStud.goals
              : (defStud.goals || [])).map((goal: any) => ({
                status: "Not Started",
                ...goal
              }));

            const documents = (savedStud.documents && savedStud.documents.length > 0)
              ? savedStud.documents
              : (defStud.documents || []);

            const pendingTasks = (savedStud.pendingTasks && savedStud.pendingTasks.length > 0)
              ? savedStud.pendingTasks
              : (defStud.pendingTasks || []);

            const tags = (savedStud.tags && savedStud.tags.length > 0)
              ? savedStud.tags
              : (defStud.tags || []);

            return {
              ...defStud,
              ...savedStud,
              sessionsLog,
              interventions,
              referrals,
              goals,
              documents,
              pendingTasks,
              tags,
              caseId: savedStud.caseId || defStud.caseId || `CASE-${savedStud.id}`,
              riskLevel: savedStud.riskLevel || defStud.riskLevel || "Low",
              academic: { ...defStud.academic, ...savedStud.academic },
              attendance: { ...defStud.attendance, ...savedStud.attendance },
              support: { ...defStud.support, ...savedStud.support },
              sessions: sessionsLog
            };
          });
          setStudents(mergedStudents);
        } else {
          setStudents(DEFAULT_STUDENTS_PROFILE);
        }
        if (s.cases) {
          const mappedCases = s.cases.map((c: any) => {
            let status = c.status;
            if (status === "Active") status = "In Progress";
            else if (status === "Observation" || status === "Referred") status = "Open";
            else if (status === "Resolved") status = "Closed";
            
            return {
              assignedCounselor: "Puan Maryam",
              openDate: c.openDate || "2026-06-08",
              notes: c.notes || c.summary || "",
              closedDate: c.closedDate || "",
              closedBy: c.closedBy || "",
              ...c,
              status
            };
          });
          setCases(mappedCases);
        } else {
          setCases(DEFAULT_CASES);
        }
        if (s.appointments) {
          const mapped = s.appointments.map((apt: any) => {
            const defApt = DEFAULT_APPOINTMENTS.find((d) => d.id === apt.id);
            return {
              caseId: apt.caseId || defApt?.caseId || "CASE-101",
              duration: apt.duration || defApt?.duration || "45 mins",
              counselorName: apt.counselorName || defApt?.counselorName || "Puan Maryam",
              notes: apt.notes || defApt?.notes || "",
              reminder: apt.reminder || defApt?.reminder || "none",
              ...defApt,
              ...apt
            };
          });
          const allApts = [...mapped];
          DEFAULT_APPOINTMENTS.forEach((def) => {
            if (!allApts.some((a) => a.id === def.id)) {
              allApts.push(def);
            }
          });
          setAppointments(allApts);
        } else {
          setAppointments(DEFAULT_APPOINTMENTS);
        }
        setNotifications(s.notifications || []);
        setRiskFactors(s.riskFactors || DEFAULT_RISK_FACTORS);
        setReports(s.reports || DEFAULT_REPORTS);
        setDisciplineIncidents(s.disciplineIncidents || DEFAULT_DISCIPLINE_INCIDENTS);
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

  // Listen for storage events to enable real-time sync across portals
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "counsellor_state" && e.newValue) {
        try {
          const s = JSON.parse(e.newValue);
          if (s.students) setStudents(s.students);
          if (s.cases) setCases(s.cases);
          if (s.appointments) setAppointments(s.appointments);
          if (s.riskFactors) setRiskFactors(s.riskFactors);
          if (s.reports) setReports(s.reports);
          if (s.disciplineIncidents) setDisciplineIncidents(s.disciplineIncidents);
          if (s.notifications) setNotifications(s.notifications);
        } catch (err) {
          console.error("Storage sync error", err);
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Save State to Local Storage
  const saveState = (updatedData: {
    students?: any[];
    cases?: any[];
    appointments?: any[];
    riskFactors?: Record<string, any>;
    reports?: any[];
    disciplineIncidents?: any[];
    notifications?: any[];
  }) => {
    const nextStudents = updatedData.students ?? students;
    const nextCases = updatedData.cases ?? cases;
    const nextAppointments = updatedData.appointments ?? appointments;
    const nextRiskFactors = updatedData.riskFactors ?? riskFactors;
    const nextReports = updatedData.reports ?? reports;
    const nextDisciplineIncidents = updatedData.disciplineIncidents ?? disciplineIncidents;
    const nextNotifications = updatedData.notifications ?? notifications;

    setStudents(nextStudents);
    setCases(nextCases);
    setAppointments(nextAppointments);
    setRiskFactors(nextRiskFactors);
    setReports(nextReports);
    setDisciplineIncidents(nextDisciplineIncidents);
    setNotifications(nextNotifications);

    localStorage.setItem(
      "counsellor_state",
      JSON.stringify({
        students: nextStudents,
        cases: nextCases,
        appointments: nextAppointments,
        riskFactors: nextRiskFactors,
        reports: nextReports,
        disciplineIncidents: nextDisciplineIncidents,
        notifications: nextNotifications,
      })
    );
  };

  // Helper: Retrieve Selected Student Record
  const selectedStudent = students.find((s) => s.id === selectedStudentId) || students[0];



  // Action: Toggle Task Status
  const handleToggleTaskStatus = (taskId: string) => {
    const updatedStudents = students.map((stud) => {
      if (stud.id === selectedStudentId) {
        const updatedTasks = (stud.pendingTasks || []).map((t: any) =>
          t.id === taskId ? { ...t, urgency: t.urgency === "completed" ? "pending" : "completed" } : t
        );
        return {
          ...stud,
          pendingTasks: updatedTasks,
        };
      }
      return stud;
    });
    saveState({ students: updatedStudents });
  };

  const handleToggleTaskStatusGlobal = (taskId: string) => {
    const updatedStudents = students.map((stud) => {
      const hasTask = stud.pendingTasks?.some((t: any) => t.id === taskId);
      if (hasTask) {
        const updatedTasks = (stud.pendingTasks || []).map((t: any) =>
          t.id === taskId ? { ...t, urgency: t.urgency === "completed" ? "pending" : "completed" } : t
        );
        return {
          ...stud,
          pendingTasks: updatedTasks,
        };
      }
      return stud;
    });
    saveState({ students: updatedStudents });
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
      category: newCaseDraft.category, // Behaviour / Academic / Emotional / Career / Referral
      riskLevel: newCaseDraft.riskLevel, // High / Medium / Low
      status: "Open" as const,
      openDate: newCaseDraft.openDate || new Date().toISOString().split("T")[0],
      lastSessionDate: "None",
      summary: newCaseDraft.notes || "No description provided.",
      assignedCounselor: newCaseDraft.assignedCounselor || "Puan Maryam",
      notes: newCaseDraft.notes || "",
      closedDate: "",
      closedBy: "",
    };

    const updatedCases = [newCase, ...cases];
    
    let updatedIncidents = disciplineIncidents;
    let updatedStudents = students;

    if (incidentToLinkCase) {
      updatedIncidents = disciplineIncidents.map((i) =>
        i.id === incidentToLinkCase.id
          ? {
              ...i,
              status: "Linked" as const,
              counsellingCaseId: newCase.id,
            }
          : i
      );

      updatedStudents = students.map((sObj) => {
        if (sObj.id === newCase.studentId) {
          const newReferral = {
            id: `r-${Date.now()}`,
            whoReferred: (incidentToLinkCase.reporterRole || "Teacher") as any,
            reason: `Discipline incident ${incidentToLinkCase.id}: ${incidentToLinkCase.description}`,
            dateSubmitted: new Date().toISOString().split("T")[0],
            urgency: newCase.riskLevel as any,
            status: "Open" as const,
            notes: `Auto-created case from discipline incident ${incidentToLinkCase.id}`,
          };
          return {
            ...sObj,
            caseId: newCase.id,
            riskLevel: newCase.riskLevel,
            referrals: [newReferral, ...(sObj.referrals || [])],
          };
        }
        return sObj;
      });

      setIncidentToLinkCase(null);
    }

    saveState({
      cases: updatedCases,
      disciplineIncidents: updatedIncidents,
      students: updatedStudents,
    });

    setOpenModal(null);
    setNewCaseDraft({
      studentId: "s1",
      category: "Academic",
      riskLevel: "Medium",
      summary: "",
      assignedCounselor: "Puan Maryam",
      openDate: new Date().toISOString().split("T")[0],
      notes: "",
    });
    setStudentSearchTerm("");
    setSelectedCaseId(newCase.id);
    setActiveTab("cases");
    setMobileShowCaseDetail(true);
  };

  // Action: Update Case
  const handleUpdateCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCaseDraft) return;

    const updatedCases = cases.map((c) => {
      if (c.id === editCaseDraft.id) {
        return {
          ...c,
          category: editCaseDraft.category,
          riskLevel: editCaseDraft.riskLevel,
          assignedCounselor: editCaseDraft.assignedCounselor,
          status: editCaseDraft.status,
          notes: editCaseDraft.notes,
        };
      }
      return c;
    });

    saveState({ cases: updatedCases });
    setOpenModal(null);
    setEditCaseDraft(null);
  };

  // Action: Schedule Session for Case
  const handleScheduleCaseSession = (e: React.FormEvent) => {
    e.preventDefault();
    const caseObj = cases.find(c => c.id === selectedCaseId);
    if (!caseObj) return;
    const student = students.find(s => s.id === caseObj.studentId);
    if (!student) return;

    const sessionDate = scheduleAptDraft.date || new Date().toISOString().split("T")[0];

    const newSession = {
      id: `s-${Date.now()}`,
      date: sessionDate,
      type: scheduleAptDraft.type,
      duration: scheduleAptDraft.duration,
      counselorName: scheduleAptDraft.counselorName,
      notes: scheduleAptDraft.notes || "Scheduled case session",
      outcome: "Scheduled",
      followUpTasks: [],
    };

    const updatedStudents = students.map((stud) => {
      if (stud.id === student.id) {
        return {
          ...stud,
          lastActivityDate: sessionDate,
          sessionsLog: [newSession, ...(stud.sessionsLog || [])],
          sessions: [newSession, ...(stud.sessions || [])],
        };
      }
      return stud;
    });

    const updatedCases = cases.map((c) => {
      if (c.id === caseObj.id) {
        return {
          ...c,
          lastSessionDate: sessionDate,
        };
      }
      return c;
    });

    saveState({ students: updatedStudents, cases: updatedCases });
    setOpenModal(null);
    setScheduleAptDraft({
      date: "",
      time: "",
      type: "Individual",
      duration: "45 mins",
      counselorName: "Puan Maryam",
      notes: "",
    });
  };

  // Action: Close Case
  const handleCloseCase = (caseId: string, closingNotes: string) => {
    const updatedCases = cases.map((c) => {
      if (c.id === caseId) {
        return {
          ...c,
          status: "Closed" as const,
          closedDate: new Date().toISOString().split("T")[0],
          closedBy: "Puan Maryam",
          notes: (c.notes || "") + (closingNotes.trim() ? `\n[Closure Resolution] ${closingNotes}` : ""),
        };
      }
      return c;
    });

    saveState({ cases: updatedCases });
    setOpenModal(null);
  };



  // Action: Reschedule Appointment
  const handleRescheduleAppointment = (aptId: string, newDate: string, newTime: string) => {
    if (!newDate || !newTime) return;
    const updatedApts = appointments.map((a) => {
      if (a.id === aptId) {
        return {
          ...a,
          date: newDate,
          time: newTime,
          status: "Confirmed" as const, // Auto-confirm rescheduled
        };
      }
      return a;
    });

    // Log reschedule into student's sessions log
    const targetApt = appointments.find((a) => a.id === aptId);
    let updatedStudents = students;
    if (targetApt) {
      updatedStudents = students.map((s) => {
        if (s.id === targetApt.studentId) {
          const newSessionLog = {
            id: `sess-${Date.now()}`,
            date: newDate,
            type: targetApt.type,
            duration: targetApt.duration,
            counselorName: targetApt.counselorName,
            notes: `Appointment rescheduled from ${targetApt.date} ${targetApt.time} to ${newDate} ${newTime}.`,
            outcome: `Rescheduled`,
            followUpTasks: [],
          };
          return {
            ...s,
            sessionsLog: [newSessionLog, ...(s.sessionsLog || [])],
            lastActivityDate: newDate,
          };
        }
        return s;
      });
    }

    saveState({
      appointments: updatedApts,
      students: updatedStudents,
    });
    setOpenModal(null);
  };

  // Action: Cancel Appointment
  const handleCancelAppointment = (aptId: string) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }
    const updatedApts = appointments.map((a) => {
      if (a.id === aptId) {
        return {
          ...a,
          status: "Cancelled" as const,
        };
      }
      return a;
    });

    // Log cancellation into student's sessions log
    const targetApt = appointments.find((a) => a.id === aptId);
    let updatedStudents = students;
    if (targetApt) {
      updatedStudents = students.map((s) => {
        if (s.id === targetApt.studentId) {
          const newSessionLog = {
            id: `sess-${Date.now()}`,
            date: new Date().toISOString().split("T")[0],
            type: targetApt.type,
            duration: targetApt.duration,
            counselorName: targetApt.counselorName,
            notes: `Appointment on ${targetApt.date} at ${targetApt.time} was cancelled.`,
            outcome: `Cancelled`,
            followUpTasks: [],
          };
          return {
            ...s,
            sessionsLog: [newSessionLog, ...(s.sessionsLog || [])],
            lastActivityDate: new Date().toISOString().split("T")[0],
          };
        }
        return s;
      });
    }

    saveState({
      appointments: updatedApts,
      students: updatedStudents,
    });
    setOpenModal(null);
  };

  // Action: Log Confidential Report from the community
  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    const stud = students.find((s) => s.id === newReportDraft.studentId);
    if (!stud) return;

    const newRep = {
      id: `rep-${Math.floor(200 + Math.random() * 800)}`,
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
    setNewReportStudentSearch("");
  };

  // Helper to infer case category from narrative text
  const inferCategoryFromNarrative = (desc: string): string => {
    const text = desc.toLowerCase();
    if (text.includes("academic") || text.includes("homework") || text.includes("grade") || text.includes("test") || text.includes("exam") || text.includes("study")) {
      return "Academic";
    }
    if (text.includes("behavior") || text.includes("behaviour") || text.includes("fight") || text.includes("altercation") || text.includes("disrupt") || text.includes("yell") || text.includes("throw") || text.includes("temper") || text.includes("outburst")) {
      return "Behaviour";
    }
    if (text.includes("anxious") || text.includes("anxiety") || text.includes("emotional") || text.includes("stomach") || text.includes("sad") || text.includes("cry") || text.includes("depressed") || text.includes("withdrawal") || text.includes("distress") || text.includes("tearful") || text.includes("worry")) {
      return "Emotional";
    }
    if (text.includes("career") || text.includes("job") || text.includes("stem") || text.includes("college") || text.includes("future")) {
      return "Career";
    }
    return "Referral";
  };

  // Action: File Confidential Report as active case
  const handleFileReport = (report: any) => {
    const caseId = `CASE-${Math.floor(100 + Math.random() * 900)}`;
    const stud = students.find((s) => s.id === report.studentId || s.name === report.studentName);
    const studentId = stud ? stud.id : report.studentId || "s1";
    const studentAvatar = stud ? stud.avatar : "🧒";

    const inferredCategory = inferCategoryFromNarrative(report.description);
    const riskLevelVal = report.urgency === "High" || report.urgency === "Urgent" ? "High" : "Medium";

    const newCase = {
      id: caseId,
      studentId: studentId,
      studentName: report.studentName,
      avatar: studentAvatar,
      category: inferredCategory,
      riskLevel: riskLevelVal as any,
      status: "Open" as const,
      openDate: new Date().toISOString().split("T")[0],
      lastSessionDate: "None",
      summary: report.description,
      assignedCounselor: "Puan Maryam",
      notes: report.description,
      referralSource: `${report.reporterName} (${report.reporterRole})`,
      closedDate: "",
      closedBy: "",
    };

    const newReferral = {
      id: `r-${Date.now()}`,
      whoReferred: report.reporterRole,
      reason: report.description,
      dateSubmitted: report.date,
      urgency: report.urgency === "High" || report.urgency === "Urgent" ? "High" as const : "Medium" as const,
      status: "Open" as const,
      notes: `Filed as Case ${caseId}`,
    };

    // Update student referrals log, risk level and caseId
    const updatedStudents = students.map((s) => {
      if (s.id === studentId) {
        return {
          ...s,
          caseId: caseId,
          riskLevel: riskLevelVal,
          referrals: [newReferral, ...(s.referrals || [])],
          lastActivityDate: new Date().toISOString().split("T")[0],
        };
      }
      return s;
    });

    const updatedReports = reports.map((r) =>
      r.id === report.id
        ? {
            ...r,
            status: "Filed as Case",
            actionedDate: new Date().toISOString().split("T")[0],
          }
        : r
    );

    saveState({
      cases: [newCase, ...cases],
      reports: updatedReports,
      students: updatedStudents,
    });

    // Navigate counselor to the newly created case
    setActiveTab("cases");
    setSelectedCaseId(caseId);
    setMobileShowCaseDetail(true);
  };

  // Action: Dismiss confidential report (sets state to show confirmation prompt)
  const handleDismissReport = (reportId: string) => {
    const rep = reports.find((r) => r.id === reportId);
    if (rep) {
      setReportToDismiss(rep);
    }
  };

  const confirmDismiss = () => {
    if (!reportToDismiss) return;
    const updatedReports = reports.map((r) =>
      r.id === reportToDismiss.id
        ? {
            ...r,
            status: "Dismissed",
            actionedDate: new Date().toISOString().split("T")[0],
          }
        : r
    );
    saveState({ reports: updatedReports });
    setReportToDismiss(null);
  };

  // Action: Prefill and open Case Form from Discipline Incident
  const handleCreateCaseFromIncident = (incident: any) => {
    let category = "Behaviour";
    const type = incident.type?.toLowerCase() || "";
    if (type.includes("academic") || type.includes("cheat") || type.includes("misconduct")) {
      category = "Academic";
    } else if (type.includes("emotional") || type.includes("anxious") || type.includes("panic") || type.includes("depression")) {
      category = "Emotional";
    } else if (type.includes("career") || type.includes("job") || type.includes("future")) {
      category = "Career";
    } else if (type.includes("truancy") || type.includes("attendance")) {
      category = "Referral";
    }

    const isHighRisk = type.includes("aggression") || type.includes("bullying");

    setNewCaseDraft({
      studentId: incident.studentId,
      category: category,
      riskLevel: isHighRisk ? "High" : "Medium",
      summary: incident.description,
      assignedCounselor: "Puan Maryam",
      openDate: new Date().toISOString().split("T")[0],
      notes: incident.description,
    });
    setIncidentToLinkCase(incident);
    setOpenModal("newCase");
  };

  // Action: Link Discipline Incident to an existing open Case
  const handleLinkIncidentToCase = (incidentId: string, caseId: string) => {
    const incident = disciplineIncidents.find((i) => i.id === incidentId);
    if (!incident) return;

    const updatedIncidents = disciplineIncidents.map((i) =>
      i.id === incidentId
        ? {
            ...i,
            status: "Linked" as const,
            counsellingCaseId: caseId,
          }
        : i
    );

    const updatedStudents = students.map((sObj) => {
      if (sObj.id === incident.studentId) {
        const newReferral = {
          id: `r-${Date.now()}`,
          whoReferred: (incident.reporterRole || "Teacher") as any,
          reason: `Discipline incident ${incident.id}: ${incident.description}`,
          dateSubmitted: new Date().toISOString().split("T")[0],
          urgency: "Medium" as const,
          status: "Open" as const,
          notes: `Linked to existing case ${caseId}.`,
        };
        return {
          ...sObj,
          referrals: [newReferral, ...(sObj.referrals || [])],
        };
      }
      return sObj;
    });

    saveState({
      disciplineIncidents: updatedIncidents,
      students: updatedStudents,
    });

    setShowLinkCaseDropdown(false);
    setLinkCaseSearch("");
  };

  // Action: Confirm Review Discipline Incident
  const confirmReviewIncident = () => {
    if (!incidentToReview) return;

    const updatedIncidents = disciplineIncidents.map((i) =>
      i.id === incidentToReview.id
        ? {
            ...i,
            status: "Reviewed" as const,
            counsellingCaseId: null,
          }
        : i
    );

    saveState({ disciplineIncidents: updatedIncidents });
    setIncidentToReview(null);
  };

  // Action: Navigate to student records
  const handleViewStudentRecord = (studentId: string) => {
    setSelectedStudentId(studentId);
    setActiveSubTab("profile");
    setActiveTab("records");
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
      c.id === caseId
        ? {
            ...c,
            status: newStatus,
            closedDate: newStatus === "Closed" ? new Date().toISOString().split("T")[0] : c.closedDate,
            closedBy: newStatus === "Closed" ? "Puan Maryam" : c.closedBy,
          }
        : c
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
    if (newStatus === "Cancelled") {
      handleCancelAppointment(aptId);
    } else {
      const updatedApts = appointments.map((a) =>
        a.id === aptId ? { ...a, status: newStatus } : a
      );

      let updatedStudents = students;
      if (newStatus === "Completed") {
        const targetApt = appointments.find((a) => a.id === aptId);
        if (targetApt) {
          updatedStudents = students.map((s) => {
            if (s.id === targetApt.studentId) {
              const newSessionLog = {
                id: `sess-${Date.now()}`,
                date: new Date().toISOString().split("T")[0],
                type: targetApt.type,
                duration: targetApt.duration,
                counselorName: targetApt.counselorName,
                notes: targetApt.notes || "Completed scheduled session check-in.",
                outcome: "Completed",
                followUpTasks: [],
              };
              return {
                ...s,
                sessionsLog: [newSessionLog, ...(s.sessionsLog || [])],
                lastActivityDate: new Date().toISOString().split("T")[0],
              };
            }
            return s;
          });
        }
      }

      saveState({
        appointments: updatedApts,
        students: updatedStudents,
      });
    }
  };

  // Statistics Computations
  const referenceDate = "2026-06-22"; // Simulated appointment today date is June 22, 2026
  
  const highRiskStudentsCount = students.filter((stud) => {
    const rf = riskFactors[stud.id] || { academicDrop: 1, withdrawal: 1, outbursts: 1, selfHarmAlert: false };
    const maxIndex = Math.max(rf.academicDrop, rf.withdrawal, rf.outbursts);
    return (showSelfHarmWarnings && rf.selfHarmAlert) || maxIndex >= 3;
  }).length;

  const openCasesCount = cases.filter(c => c.status !== "Closed").length;
  
  const todayAppointmentsCount = appointments.filter(
    (a) => a.date === referenceDate && a.status === "Confirmed"
  ).length;

  const dynamicOverdueTasksCount = students.flatMap(s => s.pendingTasks || []).filter(t => {
    return t.urgency !== "completed" && t.dueDate < todayDateStr;
  }).length;

  const dueTodayTasksCount = students.flatMap(s => s.pendingTasks || []).filter(t => {
    return t.urgency !== "completed" && t.dueDate === todayDateStr;
  }).length;

  const newReportsCount = reports.filter((r) => r.status === "New").length;

  const newIncidentsCount = disciplineIncidents.filter((i) => i.status === "New").length;

  // Search filter and sort students by last activity
  const sortedStudents = [...students].sort((a, b) => {
    const dateA = a.lastActivityDate || "";
    const dateB = b.lastActivityDate || "";
    return dateB.localeCompare(dateA);
  });

  const filteredStudents = sortedStudents.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.caseId && s.caseId.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchRisk = riskFilter === "All" ? true : s.riskLevel === riskFilter;
    const matchIssue = issueFilter === "All" ? true : s.tags?.includes(issueFilter);

    return matchSearch && matchRisk && matchIssue;
  });

  return (
    <div className="min-h-screen pb-24 md:pb-10 bg-[oklch(0.99_0.005_95)] w-full">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-20 border-b-2 border-border bg-background/90 backdrop-blur w-full">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3 md:px-8">
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
              <span>Counsellor<span className="hidden sm:inline"> Mode</span></span>
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
      <div className="mx-auto grid max-w-[1600px] gap-6 px-4 py-6 md:grid-cols-[240px_1fr] md:px-8 w-full min-w-0">
        
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

                  if (item.id === "risk") {
                    const count = highRiskStudentsCount;
                    if (count > 0) {
                      hasBadge = true;
                      badgeValue = `${count}`;
                    }
                  } else if (item.id === "pending_actions") {
                    const count = dynamicOverdueTasksCount;
                    if (count > 0) {
                      hasBadge = true;
                      badgeValue = `${count}`;
                    }
                  } else if (item.id === "reports") {
                    const count = newReportsCount;
                    if (count > 0) {
                      hasBadge = true;
                      badgeValue = `${count}`;
                    }
                  } else if (item.id === "discipline") {
                    const count = newIncidentsCount;
                    if (count > 0) {
                      hasBadge = true;
                      badgeValue = `${count}`;
                    }
                  } else if (item.id === "appointments") {
                    const pendingCount = appointments.filter(a => a.status === "Pending").length;
                    const notifCount = notifications.length;
                    const totalBadge = pendingCount + notifCount;
                    if (totalBadge > 0) {
                      hasBadge = true;
                      badgeValue = `${totalBadge} Act`;
                    }
                  }

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileShowCaseDetail(false);
                      }}
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
            <DashboardTab
              students={students}
              cases={cases}
              appointments={appointments}
              riskFactors={riskFactors}
              reports={reports}
              disciplineIncidents={disciplineIncidents}
              showSelfHarmWarnings={showSelfHarmWarnings}
              setActiveTab={setActiveTab}
              setActiveSubTab={setActiveSubTab}
              setSelectedStudentId={setSelectedStudentId}
              setOpenModal={setOpenModal}
              setStudentSearchTerm={setStudentSearchTerm}
              setShowStudentDropdown={setShowStudentDropdown}
              setNewCaseDraft={setNewCaseDraft}
              setReportToView={setReportToView}
              referenceDate={referenceDate}
              todayDateStr={todayDateStr}
            />
          )}

          {/* TAB 2: STUDENT RECORDS */}
          {activeTab === "records" && (
            <StudentRecordsTab
              students={students}
              selectedStudentId={selectedStudentId}
              setSelectedStudentId={setSelectedStudentId}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              riskFilter={riskFilter}
              setRiskFilter={setRiskFilter}
              issueFilter={issueFilter}
              setIssueFilter={setIssueFilter}
              activeSubTab={activeSubTab}
              setActiveSubTab={setActiveSubTab}
              filteredStudents={filteredStudents}
              cases={cases}
              saveState={saveState}
              handleToggleTaskStatus={handleToggleTaskStatus}
            />
          )}

          {/* TAB 3: CASE MANAGER */}
          {activeTab === "cases" && (
            <CaseManagerTab
              cases={cases}
              students={students}
              selectedCaseId={selectedCaseId}
              setSelectedCaseId={setSelectedCaseId}
              caseSearch={caseSearch}
              setCaseSearch={setCaseSearch}
              caseStatusFilter={caseStatusFilter}
              setCaseStatusFilter={setCaseStatusFilter}
              caseRiskFilter={caseRiskFilter}
              setCaseRiskFilter={setCaseRiskFilter}
              mobileShowCaseDetail={mobileShowCaseDetail}
              setMobileShowCaseDetail={setMobileShowCaseDetail}
              getTimelineEvents={getTimelineEvents}
              setEditCaseDraft={setEditCaseDraft}
              setScheduleAptDraft={setScheduleAptDraft}
              setOpenModal={setOpenModal}
              setSelectedStudentId={setSelectedStudentId}
              setActiveSubTab={setActiveSubTab}
              setActiveTab={setActiveTab}
              setCloseCaseNotesDraft={setCloseCaseNotesDraft}
              setNewCaseDraft={setNewCaseDraft}
            />
          )}

          {/* TAB 4: APPOINTMENTS */}
          {activeTab === "appointments" && (
            <AppointmentsTab
              appointments={appointments}
              selectedAptDate={selectedAptDate}
              setSelectedAptDate={setSelectedAptDate}
              viewMode={viewMode}
              setViewMode={setViewMode}
              aptCounselorFilter={aptCounselorFilter}
              setAptCounselorFilter={setAptCounselorFilter}
              aptTypeFilter={aptTypeFilter}
              setAptTypeFilter={setAptTypeFilter}
              aptMonthFilter={aptMonthFilter}
              setAptMonthFilter={setAptMonthFilter}
              setSelectedAptId={setSelectedAptId}
              setOpenModal={setOpenModal}
              notifications={notifications}
              saveState={saveState}
            />
          )}

          {/* TAB 5: RISK TRACKING */}
          {activeTab === "risk" && (
            <RiskTrackingTab
              students={students}
              riskFactors={riskFactors}
              showSelfHarmWarnings={showSelfHarmWarnings}
              setShowSelfHarmWarnings={setShowSelfHarmWarnings}
              riskSearchQuery={riskSearchQuery}
              setRiskSearchQuery={setRiskSearchQuery}
              riskLevelFilter={riskLevelFilter}
              setRiskLevelFilter={setRiskLevelFilter}
              riskSortBy={riskSortBy}
              setRiskSortBy={setRiskSortBy}
              setSelectedStudentId={setSelectedStudentId}
              setActiveTab={setActiveTab}
              handleUpdateRiskFactor={handleUpdateRiskFactor}
              handleToggleSelfHarm={handleToggleSelfHarm}
            />
          )}

          {/* TAB 6: CONFIDENTIAL REPORTS INBOX */}
          {activeTab === "reports" && (
            <InboxReportsTab
              reports={reports}
              reportSearchQuery={reportSearchQuery}
              setReportSearchQuery={setReportSearchQuery}
              handleDismissReport={handleDismissReport}
              handleFileReport={handleFileReport}
              setReportToView={setReportToView}
              setNewReportStudentSearch={setNewReportStudentSearch}
              setNewReportShowDropdown={setNewReportShowDropdown}
              setNewReportDraft={setNewReportDraft}
              setOpenModal={setOpenModal}
            />
          )}

          {/* TAB 7: DISCIPLINE SYNC */}
          {activeTab === "discipline" && (
            <DisciplineSyncTab
              cases={cases}
              disciplineIncidents={disciplineIncidents}
              students={students}
              selectedIncidentId={selectedIncidentId}
              setSelectedIncidentId={setSelectedIncidentId}
              disciplineSearchQuery={disciplineSearchQuery}
              setDisciplineSearchQuery={setDisciplineSearchQuery}
              disciplineStatusFilter={disciplineStatusFilter}
              setDisciplineStatusFilter={setDisciplineStatusFilter}
              disciplineTypeFilter={disciplineTypeFilter}
              setDisciplineTypeFilter={setDisciplineTypeFilter}
              disciplineGradeFilter={disciplineGradeFilter}
              setDisciplineGradeFilter={setDisciplineGradeFilter}
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
          )}

          {/* TAB 8: PENDING ACTIONS */}
          {activeTab === "pending_actions" && (
            <PendingActionsTab
              students={students}
              taskSearchQuery={taskSearchQuery}
              setTaskSearchQuery={setTaskSearchQuery}
              taskFilter={taskFilter}
              setTaskFilter={setTaskFilter}
              handleToggleTaskStatusGlobal={handleToggleTaskStatusGlobal}
              handleViewStudentRecord={handleViewStudentRecord}
              todayDateStr={todayDateStr}
            />
          )}


        </main>
      </div>

      {/* ============================================================ */}
      {/* MODALS / OVERLAYS & FORMS */}
      {/* ============================================================ */}
      
      {/* Modal 1: Open New Case */}
      {/* Modals Container */}
      {openModal === "newCase" && (
        <NewCaseModal
          setOpenModal={setOpenModal}
          handleCreateCase={handleCreateCase}
          students={students}
          newCaseDraft={newCaseDraft}
          setNewCaseDraft={setNewCaseDraft}
        />
      )}

      {openModal === "editCase" && editCaseDraft && (
        <EditCaseModal
          setOpenModal={setOpenModal}
          editCaseDraft={editCaseDraft}
          setEditCaseDraft={setEditCaseDraft}
          handleUpdateCase={handleUpdateCase}
        />
      )}

      {openModal === "scheduleSession" && (
        <ScheduleSessionModal
          setOpenModal={setOpenModal}
          handleScheduleCaseSession={handleScheduleCaseSession}
          cases={cases}
          selectedCaseId={selectedCaseId}
          scheduleAptDraft={scheduleAptDraft}
          setScheduleAptDraft={setScheduleAptDraft}
        />
      )}

      {openModal === "closeCase" && (
        <CloseCaseModal
          setOpenModal={setOpenModal}
          closeCaseNotesDraft={closeCaseNotesDraft}
          setCloseCaseNotesDraft={setCloseCaseNotesDraft}
          selectedCaseId={selectedCaseId}
          handleCloseCase={handleCloseCase}
          setCaseStatusFilter={setCaseStatusFilter}
        />
      )}

      {openModal === "viewApt" && (
        <ViewAptModal
          setOpenModal={setOpenModal}
          selectedAptId={selectedAptId}
          appointments={appointments}
          rescheduleDraft={rescheduleDraft}
          setRescheduleDraft={setRescheduleDraft}
          handleRescheduleAppointment={handleRescheduleAppointment}
          handleCancelAppointment={handleCancelAppointment}
          handleToggleAptStatus={handleToggleAptStatus}
          setSelectedStudentId={setSelectedStudentId}
          setActiveTab={setActiveTab}
        />
      )}

      {openModal === "newReport" && (
        <NewReportModal
          setOpenModal={setOpenModal}
          handleCreateReport={handleCreateReport}
          newReportDraft={newReportDraft}
          setNewReportDraft={setNewReportDraft}
          students={students}
        />
      )}

      {reportToDismiss && (
        <DismissReportModal
          reportToDismiss={reportToDismiss}
          setReportToDismiss={setReportToDismiss}
          confirmDismiss={confirmDismiss}
        />
      )}

      {incidentToReview && (
        <ReviewIncidentModal
          incidentToReview={incidentToReview}
          setIncidentToReview={setIncidentToReview}
          confirmReviewIncident={confirmReviewIncident}
        />
      )}

      {reportToView && (
        <ViewReportModal
          reportToView={reportToView}
          setReportToView={setReportToView}
        />
      )}

      {/* Navigation bottom bar for Mobile view */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 flex items-center overflow-x-auto border-t-2 border-border bg-card md:hidden px-2 py-1 gap-1 shadow-lg scrollbar-none">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          let hasBadge = false;
          let badgeValue = "";

          if (item.id === "risk") {
            const count = highRiskStudentsCount;
            if (count > 0) {
              hasBadge = true;
              badgeValue = `${count}`;
            }
          } else if (item.id === "pending_actions") {
            const count = dynamicOverdueTasksCount;
            if (count > 0) {
              hasBadge = true;
              badgeValue = `${count}`;
            }
          } else if (item.id === "reports") {
            const count = newReportsCount;
            if (count > 0) {
              hasBadge = true;
              badgeValue = `${count}`;
            }
          } else if (item.id === "discipline") {
            const count = newIncidentsCount;
            if (count > 0) {
              hasBadge = true;
              badgeValue = `${count}`;
            }
          } else if (item.id === "appointments") {
            const pendingCount = appointments.filter(a => a.status === "Pending").length;
            const notifCount = notifications.length;
            const totalBadge = pendingCount + notifCount;
            if (totalBadge > 0) {
              hasBadge = true;
              badgeValue = `${totalBadge}`;
            }
          }

          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileShowCaseDetail(false);
              }}
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
