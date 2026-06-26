import React from "react";
import { Calendar } from "lucide-react";
import { DuoButton } from "@/components/duo";

interface ScheduleSessionModalProps {
  setOpenModal: (modal: string | null) => void;
  handleScheduleCaseSession: (e: React.FormEvent) => void;
  cases: any[];
  selectedCaseId: string;
  scheduleAptDraft: any;
  setScheduleAptDraft: (draft: any) => void;
}

export const ScheduleSessionModal: React.FC<ScheduleSessionModalProps> = ({
  setOpenModal,
  handleScheduleCaseSession,
  cases,
  selectedCaseId,
  scheduleAptDraft,
  setScheduleAptDraft,
}) => {
  const caseObj = cases.find((c) => c.id === selectedCaseId);
  const studentLabel = caseObj ? `${caseObj.studentName} (${caseObj.id})` : "";

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 overflow-y-auto bg-black/40 backdrop-blur-xs">
      <div className="bg-card w-full max-w-md rounded-2xl border-2 border-border p-5 shadow-2xl animate-pop-in my-auto">
        <div className="flex justify-between items-center pb-3 border-b border-border">
          <h2 className="font-display text-lg font-bold flex items-center gap-1.5 text-duo-blue">
            <Calendar className="size-5" /> Schedule Session
          </h2>
          <button
            onClick={() => setOpenModal(null)}
            className="text-muted-foreground hover:text-foreground text-sm font-bold"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleScheduleCaseSession} className="mt-3.5 space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
                Student
              </label>
              <input
                type="text"
                disabled
                value={studentLabel}
                className="w-full text-xs font-bold bg-muted border border-border rounded-xl p-2.5 text-muted-foreground focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
                Counselor Name
              </label>
              <input
                type="text"
                required
                value={scheduleAptDraft.counselorName}
                onChange={(e) =>
                  setScheduleAptDraft({ ...scheduleAptDraft, counselorName: e.target.value })
                }
                className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-blue focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
                Date
              </label>
              <input
                type="date"
                required
                value={scheduleAptDraft.date}
                onChange={(e) => setScheduleAptDraft({ ...scheduleAptDraft, date: e.target.value })}
                className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-blue focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
                Time
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 10:00 AM"
                value={scheduleAptDraft.time}
                onChange={(e) => setScheduleAptDraft({ ...scheduleAptDraft, time: e.target.value })}
                className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-blue focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
                Session Type
              </label>
              <select
                value={scheduleAptDraft.type}
                onChange={(e) => setScheduleAptDraft({ ...scheduleAptDraft, type: e.target.value })}
                className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-blue focus:outline-none"
              >
                <option value="Individual">Individual</option>
                <option value="Group">Group</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>
            
            <div>
              <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
                Duration
              </label>
              <select
                value={scheduleAptDraft.duration}
                onChange={(e) => setScheduleAptDraft({ ...scheduleAptDraft, duration: e.target.value })}
                className="w-full text-xs font-bold bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-blue focus:outline-none"
              >
                <option value="30 mins">30 mins</option>
                <option value="45 mins">45 mins</option>
                <option value="60 mins">60 mins</option>
                <option value="90 mins">90 mins</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
              Session Notes / Description
            </label>
            <textarea
              required
              value={scheduleAptDraft.notes}
              onChange={(e) => setScheduleAptDraft({ ...scheduleAptDraft, notes: e.target.value })}
              placeholder="State target focus for the scheduled counselling session..."
              rows={3}
              className="w-full text-xs bg-card border border-border rounded-xl p-2.5 focus:ring-2 focus:ring-duo-blue focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <button
              type="button"
              onClick={() => setOpenModal(null)}
              className="px-4 py-2 text-xs font-bold bg-muted border border-border rounded-xl hover:bg-muted/80 text-muted-foreground transition"
            >
              Cancel
            </button>
            <DuoButton type="submit" variant="blue" size="sm">
              Schedule Appointment
            </DuoButton>
          </div>
        </form>
      </div>
    </div>
  );
};
