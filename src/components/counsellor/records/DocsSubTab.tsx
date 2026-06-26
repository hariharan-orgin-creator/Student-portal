import React, { useState } from "react";
import { Lock, PlusCircle } from "lucide-react";
import { DuoButton, Chip } from "@/components/duo";

interface DocsSubTabProps {
  selectedStudent: any;
  students: any[];
  saveState: (updatedData: any) => void;
}

export const DocsSubTab: React.FC<DocsSubTabProps> = ({
  selectedStudent,
  students,
  saveState,
}) => {
  const [docNameDraft, setDocNameDraft] = useState("");
  const [docAccessDraft, setDocAccessDraft] = useState("Shared");

  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docNameDraft.trim()) return;

    const newDoc = {
      id: `d-${Date.now()}`,
      name: docNameDraft.endsWith(".pdf") ? docNameDraft : `${docNameDraft}.pdf`,
      uploadDate: new Date().toISOString().split("T")[0],
      uploadedBy: "Puan Maryam",
      accessLevel: docAccessDraft as any,
    };

    const updatedStudents = students.map((stud) => {
      if (stud.id === selectedStudent.id) {
        return {
          ...stud,
          documents: [newDoc, ...(stud.documents || [])],
        };
      }
      return stud;
    });

    saveState({ students: updatedStudents });
    setDocNameDraft("");
  };

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_280px]">
      <div className="space-y-4">
        <h4 className="text-xs font-extrabold text-muted-foreground uppercase tracking-wide">Counselling Documents</h4>
        <div className="space-y-3">
          {!selectedStudent.documents || selectedStudent.documents.length === 0 ? (
            <p className="text-xs text-muted-foreground py-6 text-center border-2 border-dashed border-border rounded-xl">
              No uploaded documents found.
            </p>
          ) : (
            selectedStudent.documents.map((doc: any) => (
              <div key={doc.id} className="border border-border rounded-xl p-3.5 bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl shrink-0">📄</span>
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-foreground truncate break-words whitespace-normal">{doc.name}</h5>
                    <p className="text-[10px] text-muted-foreground font-semibold">
                      Uploaded: {doc.uploadDate} by {doc.uploadedBy}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 sm:shrink-0 w-full sm:w-auto justify-end border-t border-border/40 pt-2 sm:border-t-0 sm:pt-0">
                  <Chip color={doc.accessLevel === "Confidential" ? "red" : "white"}>
                    {doc.accessLevel === "Confidential" ? (
                      <span className="flex items-center gap-1">
                        <Lock className="size-3" /> Confidential
                      </span>
                    ) : (
                      "Shared"
                    )}
                  </Chip>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="p-1.5 px-3 text-[10px] font-extrabold uppercase bg-muted text-foreground border border-border rounded-xl hover:bg-muted/80 transition"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="border border-purple-100 rounded-2xl bg-[oklch(0.99_0.002_295)] p-4 h-fit space-y-3">
        <h4 className="text-xs font-bold text-duo-purple flex items-center gap-1.5">
          <PlusCircle className="size-4" /> Upload Document
        </h4>
        <form onSubmit={handleAddDocument} className="space-y-3">
          <div>
            <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Document Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Signed_Parent_Consent"
              value={docNameDraft}
              onChange={(e) => setDocNameDraft(e.target.value)}
              className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-purple focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Access Level</label>
            <select
              value={docAccessDraft}
              onChange={(e) => setDocAccessDraft(e.target.value)}
              className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-purple focus:outline-none"
            >
              <option value="Shared">Shared (Staff/Admins)</option>
              <option value="Confidential">Confidential (Counsellor Only)</option>
            </select>
          </div>

          <div className="border border-dashed border-purple-200 rounded-xl p-3 text-center bg-card/60 hover:bg-card transition cursor-pointer">
            <span className="text-xl">📁</span>
            <p className="text-[10px] font-bold text-muted-foreground mt-1">Select File to Attach</p>
            <p className="text-[8px] text-muted-foreground mt-0.5">PDF, PNG, JPG (Max 5MB)</p>
          </div>

          <DuoButton type="submit" variant="purple" size="sm" className="w-full">
            Upload File
          </DuoButton>
        </form>
      </div>
    </div>
  );
};
