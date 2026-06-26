import React from "react";
import { Search, ChevronRight } from "lucide-react";
import { DuoCard } from "@/components/duo";
import { StudentListSidebar } from "./StudentListSidebar";
import { StudentDetailsHeader } from "./StudentDetailsHeader";
import { StudentSubTabsNav } from "./StudentSubTabsNav";
import { ProfileSubTab } from "./ProfileSubTab";
import { SessionsSubTab } from "./SessionsSubTab";
import { InterventionsSubTab } from "./InterventionsSubTab";
import { ReferralsSubTab } from "./ReferralsSubTab";
import { GoalsSubTab } from "./GoalsSubTab";
import { DocsSubTab } from "./DocsSubTab";

interface StudentRecordsTabProps {
  students: any[];
  selectedStudentId: string;
  setSelectedStudentId: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  riskFilter: string;
  setRiskFilter: (filter: string) => void;
  issueFilter: string;
  setIssueFilter: (filter: string) => void;
  activeSubTab: string;
  setActiveSubTab: (tab: string) => void;
  filteredStudents: any[];
  cases: any[];
  saveState: (updatedData: any) => void;
  handleToggleTaskStatus: (taskId: string) => void;
}

export const StudentRecordsTab: React.FC<StudentRecordsTabProps> = ({
  students,
  selectedStudentId,
  setSelectedStudentId,
  searchQuery,
  setSearchQuery,
  riskFilter,
  setRiskFilter,
  issueFilter,
  setIssueFilter,
  activeSubTab,
  setActiveSubTab,
  filteredStudents,
  cases,
  saveState,
  handleToggleTaskStatus,
}) => {
  const selectedStudent =
    students.find((s) => s.id === selectedStudentId) || students[0];

  if (!selectedStudent) {
    return <div className="text-center py-10 font-bold">No student profiles loaded.</div>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr] w-full min-w-0">
      {/* Left Student List Sidebar */}
      <StudentListSidebar
        students={students}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        riskFilter={riskFilter}
        setRiskFilter={setRiskFilter}
        issueFilter={issueFilter}
        setIssueFilter={setIssueFilter}
        selectedStudentId={selectedStudentId}
        setSelectedStudentId={setSelectedStudentId}
        filteredStudents={filteredStudents}
      />

      {/* Right Student Details Panel */}
      <div className="space-y-6 w-full min-w-0">
        {/* Mobile Student Selector and Filters (Visible only below lg size) */}
        <DuoCard className="block lg:hidden p-4 border border-border bg-card space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
                Select Student
              </label>
              <div className="relative">
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="w-full text-xs font-bold bg-muted/40 border border-border rounded-xl p-2.5 pr-10 appearance-none focus:ring-2 focus:ring-duo-pink focus:outline-none"
                >
                  {students.map((stud) => (
                    <option key={stud.id} value={stud.id}>
                      {stud.avatar} {stud.name} ({stud.grade} • {stud.riskLevel} Risk)
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
                  <ChevronRight className="size-4 rotate-90" />
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">Risk</label>
                <select
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}
                  className="w-full text-xs font-bold bg-muted/40 border border-border rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-duo-pink"
                >
                  <option value="All">All</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">Issue</label>
                <select
                  value={issueFilter}
                  onChange={(e) => setIssueFilter(e.target.value)}
                  className="w-full text-xs font-bold bg-muted/40 border border-border rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-duo-pink"
                >
                  <option value="All">All</option>
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
          
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search name, grade, case ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-2 py-2 rounded-xl border border-border text-xs focus:outline-none focus:ring-2 focus:ring-duo-pink bg-muted/40 font-bold"
            />
          </div>
        </DuoCard>

        <DuoCard className="p-4 sm:p-5 border border-border bg-card space-y-6">
          {/* Student Header */}
          <StudentDetailsHeader selectedStudent={selectedStudent} />

          {/* Sub-Tab Navigation Bar */}
          <StudentSubTabsNav activeSubTab={activeSubTab} setActiveSubTab={setActiveSubTab} />

          {/* SUB-TAB CONTENTS */}
          <div className="pt-2 min-h-[400px]">
            {activeSubTab === "profile" && (
              <ProfileSubTab
                selectedStudent={selectedStudent}
                handleToggleTaskStatus={handleToggleTaskStatus}
              />
            )}

            {activeSubTab === "sessions" && (
              <SessionsSubTab
                selectedStudent={selectedStudent}
                students={students}
                cases={cases}
                saveState={saveState}
              />
            )}

            {activeSubTab === "interventions" && (
              <InterventionsSubTab
                selectedStudent={selectedStudent}
                students={students}
                saveState={saveState}
              />
            )}

            {activeSubTab === "referrals" && (
              <ReferralsSubTab
                selectedStudent={selectedStudent}
                students={students}
                saveState={saveState}
              />
            )}

            {activeSubTab === "goals" && (
              <GoalsSubTab
                selectedStudent={selectedStudent}
                students={students}
                saveState={saveState}
              />
            )}

            {activeSubTab === "docs" && (
              <DocsSubTab
                selectedStudent={selectedStudent}
                students={students}
                saveState={saveState}
              />
            )}
          </div>
        </DuoCard>
      </div>
    </div>
  );
};
