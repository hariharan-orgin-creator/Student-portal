import React from "react";
import { Lock } from "lucide-react";
import { Chip } from "@/components/duo";

interface ViewAptModalProps {
  setOpenModal: (modal: string | null) => void;
  selectedAptId: string | null;
  appointments: any[];
  rescheduleDraft: any;
  setRescheduleDraft: (draft: any) => void;
  handleRescheduleAppointment: (aptId: string, date: string, time: string) => void;
  handleCancelAppointment: (aptId: string) => void;
  handleToggleAptStatus: (aptId: string, status: string) => void;
  setSelectedStudentId: (studentId: string) => void;
  setActiveTab: (tab: string) => void;
}

export const ViewAptModal: React.FC<ViewAptModalProps> = ({
  setOpenModal,
  selectedAptId,
  appointments,
  rescheduleDraft,
  setRescheduleDraft,
  handleRescheduleAppointment,
  handleCancelAppointment,
  handleToggleAptStatus,
  setSelectedStudentId,
  setActiveTab,
}) => {
  const apt = appointments.find((a) => a.id === selectedAptId);
  if (!apt) return null;

  const isCancelled = apt.status === "Cancelled";
  const isCompleted = apt.status === "Completed";

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 overflow-y-auto bg-black/40 backdrop-blur-xs">
      <div className="bg-card w-full max-w-md rounded-2xl border-2 border-border p-5 shadow-2xl animate-pop-in space-y-4 my-auto">
        <div className="flex justify-between items-center pb-3 border-b border-border">
          <h2 className="font-display text-lg font-bold flex items-center gap-1.5 text-foreground">
            Session Details: {apt.type}
          </h2>
          <button
            onClick={() => setOpenModal(null)}
            className="text-muted-foreground hover:text-foreground text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* Details display grid */}
        <div className="space-y-3.5 text-xs">
          <div className="flex items-center gap-3 bg-muted/10 p-3 rounded-xl border border-border/40">
            <span className="text-2xl">{apt.avatar}</span>
            <div>
              <div className="font-extrabold text-foreground">{apt.studentName}</div>
              <div className="text-[10px] text-muted-foreground font-bold">
                Case Reference: {apt.caseId}
              </div>
            </div>
            <div className="ml-auto">
              <Chip
                color={
                  apt.status === "Confirmed"
                    ? "blue"
                    : apt.status === "Completed"
                    ? "green"
                    : apt.status === "Cancelled"
                    ? "red"
                    : "white"
                }
              >
                {apt.status}
              </Chip>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-muted-foreground font-bold block">Scheduled Date</span>
              <span className="font-extrabold text-foreground">{apt.date}</span>
            </div>
            <div>
              <span className="text-muted-foreground font-bold block">Time Slot</span>
              <span className="font-extrabold text-foreground">
                {apt.time} ({apt.duration})
              </span>
            </div>
            <div>
              <span className="text-muted-foreground font-bold block">Assigned Counselor</span>
              <span className="font-extrabold text-foreground">{apt.counselorName}</span>
            </div>
            <div>
              <span className="text-muted-foreground font-bold block">Reminder Notification</span>
              <span className="font-extrabold text-duo-pink">
                {apt.reminder === "none" ? "Disabled" : `${apt.reminder} before`}
              </span>
            </div>
          </div>

          {apt.notes && (
            <div>
              <span className="text-muted-foreground font-bold block">Session Intake Notes</span>
              <p className="p-2.5 rounded-lg border border-border bg-muted/10 leading-normal italic text-muted-foreground font-medium">
                "{apt.notes}"
              </p>
            </div>
          )}

          {/* Reschedule inline drawer */}
          {!isCancelled && !isCompleted && (
            <div className="pt-2 border-t border-border space-y-2">
              <span className="font-extrabold text-foreground block">Reschedule Appointment Slot</span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={rescheduleDraft.date || apt.date}
                  onChange={(e) => setRescheduleDraft({ ...rescheduleDraft, date: e.target.value })}
                  className="p-2 border border-border rounded-lg bg-card text-xs font-bold focus:outline-none focus:ring-1 focus:ring-duo-blue"
                />
                <input
                  type="time"
                  value={rescheduleDraft.time || apt.time}
                  onChange={(e) => setRescheduleDraft({ ...rescheduleDraft, time: e.target.value })}
                  className="p-2 border border-border rounded-lg bg-card text-xs font-bold focus:outline-none focus:ring-1 focus:ring-duo-blue"
                />
              </div>
              <button
                onClick={() =>
                  handleRescheduleAppointment(
                    apt.id,
                    rescheduleDraft.date || apt.date,
                    rescheduleDraft.time || apt.time
                  )
                }
                className="w-full py-2 bg-duo-blue text-white rounded-xl text-xs font-bold hover:opacity-90 transition"
              >
                Save New Schedule
              </button>
            </div>
          )}
        </div>

        {/* Main action buttons footer */}
        <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-border justify-end">
          {!isCancelled && !isCompleted && (
            <button
              onClick={() => handleCancelAppointment(apt.id)}
              className="px-4 py-2 text-xs font-bold bg-duo-red text-white rounded-xl hover:opacity-90 transition shrink-0"
            >
              Cancel Appointment
            </button>
          )}
          {!isCancelled && !isCompleted && (
            <button
              onClick={() => {
                handleToggleAptStatus(apt.id, "Completed");
                setSelectedStudentId(apt.studentId);
                setActiveTab("records");
                setOpenModal(null);
              }}
              className="px-4 py-2 text-xs font-bold bg-duo-green text-white rounded-xl hover:opacity-90 transition flex-1 text-center"
            >
              Complete & Log Session
            </button>
          )}
          <button
            onClick={() => setOpenModal(null)}
            className="px-4 py-2 text-xs font-bold bg-muted border border-border rounded-xl hover:bg-muted/80 text-muted-foreground transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
