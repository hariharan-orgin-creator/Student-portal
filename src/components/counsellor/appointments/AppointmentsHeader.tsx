import React from "react";
import { Filter } from "lucide-react";
import { DuoCard } from "@/components/duo";

interface AppointmentsHeaderProps {
  aptTypeFilter: string;
  setAptTypeFilter: (filter: string) => void;
  aptCounselorFilter: string;
  setAptCounselorFilter: (filter: string) => void;
  aptMonthFilter: string;
  setAptMonthFilter: (filter: string) => void;
  viewMode: "month" | "week";
  setViewMode: (mode: "month" | "week") => void;
  counselorsList: string[];
}

export const AppointmentsHeader: React.FC<AppointmentsHeaderProps> = ({
  aptTypeFilter,
  setAptTypeFilter,
  aptCounselorFilter,
  setAptCounselorFilter,
  aptMonthFilter,
  setAptMonthFilter,
  viewMode,
  setViewMode,
  counselorsList,
}) => {
  return (
    <DuoCard className="p-3 border border-border bg-card flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-bold">
          <Filter className="size-3.5" /> Filters:
        </div>
        
        {/* Session Type filter */}
        <select
          value={aptTypeFilter}
          onChange={(e) => setAptTypeFilter(e.target.value)}
          className="text-xs font-bold border border-border bg-card rounded-lg px-2 py-1.5 focus:ring-1 focus:ring-duo-blue focus:outline-none"
        >
          <option value="All">All Types</option>
          <option value="Individual">Individual</option>
          <option value="Group">Group</option>
          <option value="Emergency">Emergency</option>
          <option value="Follow-up">Follow-up</option>
        </select>

        {/* Counselor filter */}
        <select
          value={aptCounselorFilter}
          onChange={(e) => setAptCounselorFilter(e.target.value)}
          className="text-xs font-bold border border-border bg-card rounded-lg px-2 py-1.5 focus:ring-1 focus:ring-duo-blue focus:outline-none"
        >
          <option value="All">All Counselors</option>
          {counselorsList.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Month filter */}
        <select
          value={aptMonthFilter}
          onChange={(e) => setAptMonthFilter(e.target.value)}
          className="text-xs font-bold border border-border bg-card rounded-lg px-2 py-1.5 focus:ring-1 focus:ring-duo-blue focus:outline-none"
        >
          <option value="All">All Months</option>
          <option value="2026-06">June 2026</option>
          <option value="2026-07">July 2026</option>
        </select>
      </div>

      {/* View mode toggle */}
      <div className="flex items-center gap-1 bg-muted p-0.5 rounded-xl border border-border">
        <button
          onClick={() => setViewMode("month")}
          className={`text-xs font-extrabold px-3 py-1.5 rounded-lg transition-all ${
            viewMode === "month"
              ? "bg-card text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Month View
        </button>
        <button
          onClick={() => setViewMode("week")}
          className={`text-xs font-extrabold px-3 py-1.5 rounded-lg transition-all ${
            viewMode === "week"
              ? "bg-card text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Week View
        </button>
      </div>
    </DuoCard>
  );
};
