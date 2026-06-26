import React from "react";
import { Search } from "lucide-react";
import { DuoCard } from "@/components/duo";

interface StudentListSidebarProps {
  students: any[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  riskFilter: string;
  setRiskFilter: (filter: string) => void;
  issueFilter: string;
  setIssueFilter: (filter: string) => void;
  selectedStudentId: string;
  setSelectedStudentId: (id: string) => void;
  filteredStudents: any[];
}

export const StudentListSidebar: React.FC<StudentListSidebarProps> = ({
  searchQuery,
  setSearchQuery,
  riskFilter,
  setRiskFilter,
  issueFilter,
  setIssueFilter,
  selectedStudentId,
  setSelectedStudentId,
  filteredStudents,
}) => {
  return (
    <DuoCard className="hidden lg:block p-4 border border-border bg-card">
      <div className="space-y-3 mb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search name, grade, case ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-2 py-1.5 rounded-xl border border-border text-xs focus:outline-none focus:ring-2 focus:ring-duo-pink bg-muted/40 font-bold"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[9px] font-extrabold text-muted-foreground uppercase mb-1">Risk Level</label>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="w-full text-[10px] font-bold bg-muted/40 border border-border rounded-lg p-1.5 focus:outline-none focus:ring-1 focus:ring-duo-pink"
            >
              <option value="All">All Risk</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div>
            <label className="block text-[9px] font-extrabold text-muted-foreground uppercase mb-1">Issue Tag</label>
            <select
              value={issueFilter}
              onChange={(e) => setIssueFilter(e.target.value)}
              className="w-full text-[10px] font-bold bg-muted/40 border border-border rounded-lg p-1.5 focus:outline-none focus:ring-1 focus:ring-duo-pink"
            >
              <option value="All">All Issues</option>
              <option value="Attendance">Attendance</option>
              <option value="Behaviour">Behaviour</option>
              <option value="Academic">Academic</option>
              <option value="Emotional">Emotional</option>
              <option value="Career">Career</option>
              <option value="Referral">Referral</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
        {filteredStudents.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-6 border-2 border-dashed border-border rounded-xl">
            No students found.
          </p>
        ) : (
          filteredStudents.map((stud) => {
            const isActive = selectedStudentId === stud.id;
            return (
              <button
                key={stud.id}
                onClick={() => setSelectedStudentId(stud.id)}
                className={`flex flex-col w-full rounded-xl p-3 text-left transition border ${
                  isActive
                    ? "bg-[oklch(0.95_0.06_350)] border-duo-pink/40 text-foreground"
                    : "hover:bg-muted/40 border-transparent text-muted-foreground"
                }`}
              >
                <div className="flex items-center gap-2.5 w-full">
                  <span className="text-2xl shrink-0">{stud.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-foreground truncate text-sm">{stud.name}</div>
                    <div className="text-[10px] font-semibold text-muted-foreground flex items-center gap-1.5 flex-wrap">
                      <span>{stud.grade}</span> • <span>ID: {stud.caseId}</span>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      stud.riskLevel === "High"
                        ? "bg-red-100 text-red-700"
                        : stud.riskLevel === "Medium"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {stud.riskLevel}
                  </span>
                </div>

                {/* Issue tags */}
                {stud.tags && stud.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {stud.tags.map((tag: string) => {
                      const tagColors: Record<string, string> = {
                        Attendance: "bg-blue-50 text-blue-600 border-blue-100",
                        Behaviour: "bg-orange-50 text-orange-600 border-orange-100",
                        Academic: "bg-green-50 text-green-600 border-green-100",
                        Emotional: "bg-purple-50 text-purple-600 border-purple-100",
                        Career: "bg-teal-50 text-teal-600 border-teal-100",
                        Referral: "bg-pink-50 text-pink-600 border-pink-100",
                      };
                      return (
                        <span
                          key={tag}
                          className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md border ${
                            tagColors[tag] || "bg-muted text-muted-foreground"
                          }`}
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                )}
              </button>
            );
          })
        )}
      </div>
    </DuoCard>
  );
};
