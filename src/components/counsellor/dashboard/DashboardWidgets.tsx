import { DuoCard, Chip } from "@/components/duo";
import { ShieldAlert, BookmarkCheck, Inbox } from "lucide-react";

interface DashboardWidgetsProps {
  topAtRisk: any[];
  dashboardPendingTasks: any[];
  unprocessedInboxReports: any[];
  setActiveTab: (tab: string) => void;
  setActiveSubTab: (subTab: string) => void;
  setSelectedStudentId: (id: string) => void;
  setReportToView: (report: any) => void;
}

export function DashboardWidgets({
  topAtRisk,
  dashboardPendingTasks,
  unprocessedInboxReports,
  setActiveTab,
  setActiveSubTab,
  setSelectedStudentId,
  setReportToView,
}: Readonly<DashboardWidgetsProps>) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Left Column Widgets */}
      <div className="space-y-6">
        {/* At-Risk Students Widget */}
        <DuoCard className="border border-border p-4 bg-card">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-display text-sm font-extrabold text-foreground flex items-center gap-2">
              <ShieldAlert className="size-4.5 text-duo-red" /> At-Risk Students
            </h2>
            <button onClick={() => setActiveTab("risk")} className="text-xs font-bold text-duo-blue hover:underline">
              View all
            </button>
          </div>
          <div className="space-y-2.5">
            {topAtRisk.length === 0 ? (
              <div className="text-center py-6 text-xs text-muted-foreground">No flagged students.</div>
            ) : (
              topAtRisk.map((stud) => (
                <div key={stud.id} className="flex items-center justify-between p-3 border border-border rounded-xl bg-card hover:bg-muted/10 transition">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-8 rounded-full bg-pink-100 text-duo-pink flex items-center justify-center text-xs font-bold border border-pink-250 shrink-0 select-none">
                      {stud.avatar || stud.name.split(" ").map((n: string) => n[0]).join("").substring(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-xs text-foreground truncate">{stud.name}</div>
                      <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <span>{stud.grade}</span>
                        <span>•</span>
                        <span className="italic text-duo-pink truncate">{stud.primaryReason}</span>
                      </div>
                    </div>
                  </div>
                  <Chip color={stud.finalRisk === "High" ? "red" : stud.finalRisk === "Medium" ? "orange" : "blue"}>
                    {stud.finalRisk}
                  </Chip>
                </div>
              ))
            )}
          </div>
        </DuoCard>

        {/* Pending Follow-up Tasks Widget */}
        <DuoCard className="border border-border p-4 bg-card">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-display text-sm font-extrabold text-foreground flex items-center gap-2">
              <BookmarkCheck className="size-4.5 text-duo-orange" /> Pending Follow-up Tasks
            </h2>
            <button onClick={() => setActiveTab("pending_actions")} className="text-xs font-bold text-duo-blue hover:underline">
              View all
            </button>
          </div>
          <div className="space-y-2.5">
            {dashboardPendingTasks.slice(0, 3).length === 0 ? (
              <div className="text-center py-6 text-xs text-muted-foreground">No pending follow-ups due.</div>
            ) : (
              dashboardPendingTasks.slice(0, 3).map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 border border-border rounded-xl bg-card hover:bg-muted/10 transition">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-2xl shrink-0">{task.studentAvatar}</span>
                    <div className="min-w-0">
                      <span className="font-bold text-xs text-foreground block truncate">{task.task}</span>
                      <span className="text-[10px] text-muted-foreground font-semibold">
                        Student: {task.studentName} · Due: {task.dueDate}
                      </span>
                    </div>
                  </div>
                  <Chip color={task.urgency === "high" || task.urgency === "overdue" ? "red" : "orange"}>
                    {task.urgency}
                  </Chip>
                </div>
              ))
            )}
          </div>
        </DuoCard>
      </div>

      {/* Right Column Widgets */}
      <div className="space-y-6">
        {/* New Inbox Reports Widget */}
        <DuoCard className="border border-border p-4 bg-card">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-display text-sm font-extrabold text-foreground flex items-center gap-2">
              <Inbox className="size-4.5 text-duo-purple" /> New Conf. Reports
            </h2>
            <button onClick={() => setActiveTab("reports")} className="text-xs font-bold text-duo-blue hover:underline">
              View all
            </button>
          </div>
          <div className="space-y-2.5">
            {unprocessedInboxReports.length === 0 ? (
              <div className="text-center py-6 text-xs text-muted-foreground">No new incoming reports.</div>
            ) : (
              unprocessedInboxReports.map((rep) => (
                <div key={rep.id} className="p-3 border border-border rounded-xl bg-card hover:bg-muted/10 transition flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="font-bold text-xs text-foreground block truncate">{rep.studentName}</span>
                    <span className="text-[10px] text-muted-foreground font-semibold block truncate">
                      By: {rep.reporterName} ({rep.reporterRole}) · {rep.date}
                    </span>
                  </div>
                  <div className="shrink-0 flex items-center gap-1.5">
                    <Chip color={rep.urgency === "High" ? "red" : "white"}>{rep.urgency}</Chip>
                    <button
                      onClick={() => setReportToView(rep)}
                      className="p-1 px-2.5 text-[9px] font-black uppercase bg-muted text-foreground border border-border rounded-lg hover:bg-muted/80 transition"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </DuoCard>
      </div>
    </div>
  );
}
