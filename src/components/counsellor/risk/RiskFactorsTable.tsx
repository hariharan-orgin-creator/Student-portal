import React from "react";
import { ExternalLink } from "lucide-react";
import { DuoCard, Chip } from "@/components/duo";

interface RiskFactorsTableProps {
  processedRiskStudents: any[];
  showSelfHarmWarnings: boolean;
  setSelectedStudentId: (id: string) => void;
  setActiveTab: (tab: string) => void;
  handleUpdateRiskFactor: (studentId: string, field: string, val: number) => void;
  handleToggleSelfHarm: (studentId: string) => void;
}

export const RiskFactorsTable: React.FC<RiskFactorsTableProps> = ({
  processedRiskStudents,
  showSelfHarmWarnings,
  setSelectedStudentId,
  setActiveTab,
  handleUpdateRiskFactor,
  handleToggleSelfHarm,
}) => {
  const renderRatingButtons = (
    studentId: string,
    field: string,
    currentVal: number
  ) => {
    return (
      <div className="inline-flex gap-1">
        {[1, 2, 3, 4, 5].map((idx) => (
          <button
            key={idx}
            onClick={() => handleUpdateRiskFactor(studentId, field, idx)}
            className={`size-5 rounded-md text-[10px] font-black cursor-pointer transition-all ${
              currentVal >= idx
                ? idx >= 4
                  ? "bg-duo-red text-white"
                  : idx >= 3
                  ? "bg-duo-orange text-white"
                  : "bg-duo-green text-white"
                : "bg-muted text-muted-foreground border border-border hover:bg-muted/80"
            }`}
          >
            {idx}
          </button>
        ))}
      </div>
    );
  };

  return (
    <DuoCard className="p-4 border-2 border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted text-[11px] uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-2.5 text-left">Student</th>
              <th className="px-4 py-2.5 text-center">Academic Drop</th>
              <th className="px-4 py-2.5 text-center">Social Withdrawal</th>
              <th className="px-4 py-2.5 text-center">Emotional Outbursts</th>
              {showSelfHarmWarnings && <th className="px-4 py-2.5 text-center">Self-Harm alert</th>}
              <th className="px-4 py-2.5 text-center">Risk Score</th>
              <th className="px-4 py-2.5 text-center">Overall Risk</th>
              <th className="px-4 py-2.5 text-center">Last Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {processedRiskStudents.length === 0 ? (
              <tr>
                <td
                  colSpan={showSelfHarmWarnings ? 8 : 7}
                  className="px-4 py-8 text-center text-xs text-muted-foreground font-bold"
                >
                  No students match the current filters.
                </td>
              </tr>
            ) : (
              processedRiskStudents.map((stud) => {
                const rf = stud.rf || {
                  academicDrop: 1,
                  withdrawal: 1,
                  outbursts: 1,
                  selfHarmAlert: false,
                  lastUpdated: "None",
                };
                return (
                  <tr key={stud.id} className="hover:bg-muted/10 font-medium">
                    {/* Student (Clickable) */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => {
                          setSelectedStudentId(stud.id);
                          setActiveTab("records");
                        }}
                        title="View Student Records profile"
                        className="flex items-center gap-2 text-left hover:underline group cursor-pointer"
                      >
                        <span className="text-lg">{stud.avatar}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-xs group-hover:text-primary transition-colors">
                            {stud.name}
                          </span>
                          <ExternalLink className="size-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </button>
                    </td>

                    {/* Academic Drop */}
                    <td className="px-4 py-3 text-center">
                      {renderRatingButtons(stud.id, "academicDrop", rf.academicDrop)}
                    </td>

                    {/* Social Withdrawal */}
                    <td className="px-4 py-3 text-center">
                      {renderRatingButtons(stud.id, "withdrawal", rf.withdrawal)}
                    </td>

                    {/* Emotional Outbursts */}
                    <td className="px-4 py-3 text-center">
                      {renderRatingButtons(stud.id, "outbursts", rf.outbursts)}
                    </td>

                    {/* Self harm alert */}
                    {showSelfHarmWarnings && (
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleToggleSelfHarm(stud.id)}
                          className={`p-1 px-2.5 rounded-xl text-[10px] font-extrabold uppercase transition cursor-pointer ${
                            rf.selfHarmAlert
                              ? "bg-duo-red text-white animate-pulse"
                              : "bg-muted text-muted-foreground border border-border hover:bg-muted/80"
                          }`}
                        >
                          {rf.selfHarmAlert ? "⚠️ Alert Active" : "No Report"}
                        </button>
                      </td>
                    )}

                    {/* Risk Score */}
                    <td className="px-4 py-3 text-center">
                      <div className="inline-flex items-center justify-center bg-muted/60 p-1 px-2.5 rounded-xl border border-border font-extrabold text-[11px] text-foreground shadow-sm">
                        {stud.score} / {showSelfHarmWarnings ? 20 : 15}
                      </div>
                    </td>

                    {/* Final risk */}
                    <td className="px-4 py-3 text-center">
                      <Chip
                        color={
                          stud.finalRisk === "High"
                            ? "red"
                            : stud.finalRisk === "Medium"
                            ? "orange"
                            : "green"
                        }
                      >
                        {stud.finalRisk} Risk
                      </Chip>
                    </td>
                    <td className="px-4 py-3 text-center text-xs text-muted-foreground font-semibold">
                      {rf.lastUpdated}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </DuoCard>
  );
};
