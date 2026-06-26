import React from "react";

interface StudentDetailsHeaderProps {
  selectedStudent: any;
}

export const StudentDetailsHeader: React.FC<StudentDetailsHeaderProps> = ({
  selectedStudent,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-border gap-4">
      <div className="flex items-center gap-3">
        <span className="text-5xl p-2 rounded-3xl bg-muted/80">{selectedStudent.avatar}</span>
        <div>
          <h2 className="font-display text-2xl font-black break-words whitespace-normal">{selectedStudent.name}</h2>
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider flex items-center gap-2">
            <span>Class: {selectedStudent.overall || selectedStudent.class || "N/A"} ({selectedStudent.grade})</span>
            <span>•</span>
            <span className="text-duo-pink font-bold">Case ID: {selectedStudent.caseId}</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs font-bold">
        <div className="rounded-xl border border-border bg-muted/40 px-3 py-1.5 break-words whitespace-normal">
          <span className="text-muted-foreground font-extrabold uppercase mr-1 text-[9px]">Guardian:</span>{" "}
          {selectedStudent.guardian}
        </div>
        <div className="rounded-xl border border-border bg-muted/40 px-3 py-1.5 break-words whitespace-normal">
          <span className="text-muted-foreground font-extrabold uppercase mr-1 text-[9px]">Phone:</span>{" "}
          {selectedStudent.guardianContact}
        </div>
      </div>
    </div>
  );
};
