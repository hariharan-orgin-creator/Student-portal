import { ShieldAlert, FolderHeart, Calendar, BookmarkCheck, Inbox, AlertOctagon } from "lucide-react";

interface StatsGridProps {
  highRiskStudentsCount: number;
  openCasesCount: number;
  todayAppointmentsCount: number;
  dueTodayTasksCount: number;
  dynamicOverdueTasksCount: number;
  newReportsCount: number;
  newIncidentsCount: number;
  setActiveTab: (tab: string) => void;
}

export function StatsGrid({
  highRiskStudentsCount,
  openCasesCount,
  todayAppointmentsCount,
  dueTodayTasksCount,
  dynamicOverdueTasksCount,
  newReportsCount,
  newIncidentsCount,
  setActiveTab,
}: Readonly<StatsGridProps>) {
  const stats = [
    { label: "At-Risk Students", val: highRiskStudentsCount, color: "red", desc: "Active risk flags", icon: ShieldAlert, tab: "risk" },
    { label: "Open Cases", val: openCasesCount, color: "purple", desc: "Active support files", icon: FolderHeart, tab: "cases" },
    { label: "Today's Appointments", val: todayAppointmentsCount, color: "blue", desc: "Scheduled sessions", icon: Calendar, tab: "appointments" },
    { label: "Pending Follow-ups", val: dynamicOverdueTasksCount + dueTodayTasksCount, color: "yellow", desc: "Overdue & due today", icon: BookmarkCheck, tab: "pending_actions" },
    { label: "New Inbox Reports", val: newReportsCount, color: "red", desc: "Awaiting review", icon: Inbox, tab: "reports" },
    { label: "New Discipline Incidents", val: newIncidentsCount, color: "red", desc: "Awaiting triage", icon: AlertOctagon, tab: "discipline" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((s) => {
        const Icon = s.icon;
        const colorClass =
          s.color === "red"
            ? "text-duo-red border-red-150"
            : s.color === "yellow"
            ? "text-duo-orange border-orange-150"
            : s.color === "blue"
            ? "text-duo-blue border-blue-150"
            : "text-duo-purple border-purple-150";

        return (
          <button
            key={s.label}
            onClick={() => setActiveTab(s.tab)}
            className="text-left border-2 border-border p-4 bg-card rounded-2xl shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-muted-foreground/30 relative overflow-hidden group"
          >
            <div className="flex justify-between items-start">
              <div className="p-2 rounded-xl bg-muted/40 group-hover:bg-muted/80 transition-colors">
                <Icon className={`size-4 ${colorClass}`} />
              </div>
              <span className={`text-2xl font-black font-numeric ${colorClass}`}>
                {s.val}
              </span>
            </div>
            <h3 className="text-xs font-black text-foreground mt-3 break-words whitespace-normal leading-tight">
              {s.label}
            </h3>
            <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">{s.desc}</p>
          </button>
        );
      })}
    </div>
  );
}
