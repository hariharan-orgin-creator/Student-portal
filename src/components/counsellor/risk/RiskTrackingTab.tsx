import React from "react";
import { ShieldAlert } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { RiskTrendChart } from "./RiskTrendChart";
import { RiskFilters } from "./RiskFilters";
import { RiskFactorsTable } from "./RiskFactorsTable";

interface RiskTrackingTabProps {
  students: any[];
  riskFactors: Record<string, any>;
  showSelfHarmWarnings: boolean;
  setShowSelfHarmWarnings: (show: boolean) => void;
  riskSearchQuery: string;
  setRiskSearchQuery: (query: string) => void;
  riskLevelFilter: string;
  setRiskLevelFilter: (filter: string) => void;
  riskSortBy: string;
  setRiskSortBy: (sortBy: string) => void;
  setSelectedStudentId: (id: string) => void;
  setActiveTab: (tab: string) => void;
  handleUpdateRiskFactor: (studentId: string, field: string, val: number) => void;
  handleToggleSelfHarm: (studentId: string) => void;
}

export const RiskTrackingTab: React.FC<RiskTrackingTabProps> = ({
  students,
  riskFactors,
  showSelfHarmWarnings,
  setShowSelfHarmWarnings,
  riskSearchQuery,
  setRiskSearchQuery,
  riskLevelFilter,
  setRiskLevelFilter,
  riskSortBy,
  setRiskSortBy,
  setSelectedStudentId,
  setActiveTab,
  handleUpdateRiskFactor,
  handleToggleSelfHarm,
}) => {
  const currentCounts = { High: 0, Medium: 0, Low: 0 };
  students.forEach((stud) => {
    const rf = riskFactors[stud.id] || {
      academicDrop: 1,
      withdrawal: 1,
      outbursts: 1,
      selfHarmAlert: false,
    };
    const maxIndex = Math.max(rf.academicDrop, rf.withdrawal, rf.outbursts);
    let finalRisk: "Low" | "Medium" | "High" = "Low";
    if ((showSelfHarmWarnings && rf.selfHarmAlert) || maxIndex >= 4) finalRisk = "High";
    else if (maxIndex >= 3) finalRisk = "Medium";
    currentCounts[finalRisk]++;
  });

  const trendData = [
    { week: "Week 1", "High Risk": 0, "Medium Risk": 1, "Low Risk": 4 },
    { week: "Week 2", "High Risk": 1, "Medium Risk": 1, "Low Risk": 3 },
    { week: "Week 3", "High Risk": 1, "Medium Risk": 2, "Low Risk": 2 },
    { week: "Week 4", "High Risk": 2, "Medium Risk": 1, "Low Risk": 2 },
    { week: "Week 5", "High Risk": 1, "Medium Risk": 2, "Low Risk": 2 },
    {
      week: "Current",
      "High Risk": currentCounts.High,
      "Medium Risk": currentCounts.Medium,
      "Low Risk": currentCounts.Low,
    },
  ];

  const processedRiskStudents = students
    .map((stud) => {
      const rf = riskFactors[stud.id] || {
        academicDrop: 1,
        withdrawal: 1,
        outbursts: 1,
        selfHarmAlert: false,
        lastUpdated: "None",
      };
      const maxIndex = Math.max(rf.academicDrop, rf.withdrawal, rf.outbursts);

      let finalRisk: "Low" | "Medium" | "High" = "Low";
      if ((showSelfHarmWarnings && rf.selfHarmAlert) || maxIndex >= 4) finalRisk = "High";
      else if (maxIndex >= 3) finalRisk = "Medium";

      const score =
        rf.academicDrop +
        rf.withdrawal +
        rf.outbursts +
        (showSelfHarmWarnings && rf.selfHarmAlert ? 5 : 0);

      return {
        ...stud,
        rf,
        finalRisk,
        score,
      };
    })
    .filter((stud) => {
      const matchesSearch = stud.name.toLowerCase().includes(riskSearchQuery.toLowerCase());
      const matchesRisk = riskLevelFilter === "All" || stud.finalRisk === riskLevelFilter;
      return matchesSearch && matchesRisk;
    })
    .sort((a, b) => {
      if (riskSortBy === "scoreDesc") return b.score - a.score;
      if (riskSortBy === "scoreAsc") return a.score - b.score;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="space-y-6 w-full min-w-0">
      {/* Header with Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold flex items-center gap-2">
            <ShieldAlert className="size-6 text-duo-red animate-pulse" /> Wellness Risk Indicators
          </h1>
          <p className="text-xs text-muted-foreground font-semibold">
            Monitor student distress indices and toggle self-harm warnings.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-card p-2 px-3 rounded-xl border-2 border-border shadow-sm">
          <label
            htmlFor="self-harm-toggle"
            className="text-xs font-black text-muted-foreground cursor-pointer select-none"
          >
            Show Self-Harm Warnings
          </label>
          <Switch
            id="self-harm-toggle"
            checked={showSelfHarmWarnings}
            onCheckedChange={(checked) => setShowSelfHarmWarnings(checked)}
          />
        </div>
      </div>

      {/* Trend Chart (ISMS 2.0 Monitoring) */}
      <RiskTrendChart trendData={trendData} />

      {/* Filters, Search and Sort */}
      <RiskFilters
        riskSearchQuery={riskSearchQuery}
        setRiskSearchQuery={setRiskSearchQuery}
        riskLevelFilter={riskLevelFilter}
        setRiskLevelFilter={setRiskLevelFilter}
        riskSortBy={riskSortBy}
        setRiskSortBy={setRiskSortBy}
      />

      {/* Risk Factors Table */}
      <RiskFactorsTable
        processedRiskStudents={processedRiskStudents}
        showSelfHarmWarnings={showSelfHarmWarnings}
        setSelectedStudentId={setSelectedStudentId}
        setActiveTab={setActiveTab}
        handleUpdateRiskFactor={handleUpdateRiskFactor}
        handleToggleSelfHarm={handleToggleSelfHarm}
      />
    </div>
  );
};
