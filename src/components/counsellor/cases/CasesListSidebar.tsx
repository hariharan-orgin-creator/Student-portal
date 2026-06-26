import React from "react";
import { Chip } from "@/components/duo";

interface CasesListSidebarProps {
  sortedCases: any[];
  selectedCaseId: string | null;
  setSelectedCaseId: (id: string) => void;
  setMobileShowCaseDetail: (show: boolean) => void;
  students: any[];
  mobileShowCaseDetail: boolean;
}

export const CasesListSidebar: React.FC<CasesListSidebarProps> = ({
  sortedCases,
  selectedCaseId,
  setSelectedCaseId,
  setMobileShowCaseDetail,
  students,
  mobileShowCaseDetail,
}) => {
  return (
    <div className={`space-y-3 h-[600px] overflow-y-auto pr-1 ${mobileShowCaseDetail ? "hidden md:block" : "block"}`}>
      {sortedCases.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-border rounded-2xl text-xs text-muted-foreground">
          No counselling cases match filters.
        </div>
      ) : (
        sortedCases.map((c) => {
          const isSelected = selectedCaseId === c.id;
          const student = students.find((s) => s.id === c.studentId);
          const initials = c.studentName
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
          const lastActivity = student?.lastActivityDate || c.lastSessionDate || c.openDate;
          const tagsList = student?.tags || [];

          return (
            <div
              key={c.id}
              onClick={() => {
                setSelectedCaseId(c.id);
                setMobileShowCaseDetail(true);
              }}
              className={`p-3.5 border rounded-2xl cursor-pointer transition flex gap-3 relative overflow-hidden ${
                isSelected
                  ? "border-duo-pink bg-pink-50/5 shadow-sm"
                  : "border-border bg-card hover:bg-muted/30"
              }`}
            >
              {isSelected && <div className="absolute left-0 top-0 w-1.5 h-full bg-duo-pink" />}
              
              {/* Avatar */}
              <div className="size-10 rounded-full bg-pink-100/50 text-duo-pink flex items-center justify-center text-xs shrink-0 font-extrabold relative border border-pink-200">
                {c.avatar && <span className="absolute -top-1 -right-1 text-sm">{c.avatar}</span>}
                <span>{initials}</span>
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-xs font-black text-foreground truncate">{c.studentName}</h3>
                  <span className="text-[9px] font-black text-duo-pink shrink-0 uppercase">{c.id}</span>
                </div>
                
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-bold">
                  <span>{student?.grade || "Grade 6"}</span>
                  <span>•</span>
                  <span className="truncate">Counsellor: {c.assignedCounselor || "Maryam"}</span>
                </div>

                <div className="text-[10px] text-muted-foreground font-bold">
                  Activity: <span className="text-foreground">{lastActivity}</span>
                </div>

                <div className="flex justify-between items-center pt-1.5 gap-2">
                  <div className="flex gap-1 overflow-hidden max-w-[150px] flex-wrap">
                    {tagsList.slice(0, 2).map((t: string) => (
                      <span key={t} className="text-[8px] font-extrabold bg-muted text-muted-foreground px-1.5 py-0.5 rounded uppercase">
                        {t}
                      </span>
                    ))}
                  </div>
                  <Chip color={c.status === "Closed" ? "green" : c.status === "In Progress" ? "orange" : "blue"}>
                    {c.status}
                  </Chip>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
