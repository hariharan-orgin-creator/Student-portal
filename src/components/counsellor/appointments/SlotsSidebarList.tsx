import React from "react";
import { Inbox, Calendar } from "lucide-react";
import { DuoCard, Chip } from "@/components/duo";

interface SlotsSidebarListProps {
  selectedAptDate: string;
  todayStr: string;
  selectedDateApts: any[];
  setSelectedAptId: (id: string | null) => void;
  setOpenModal: (modal: string | null) => void;
  notifications: any[];
  saveState: (updatedData: any) => void;
}

export const SlotsSidebarList: React.FC<SlotsSidebarListProps> = ({
  selectedAptDate,
  todayStr,
  selectedDateApts,
  setSelectedAptId,
  setOpenModal,
  notifications,
  saveState,
}) => {
  return (
    <div className="space-y-6">
      {/* Selected Date slots list */}
      <DuoCard className="p-4 border border-border bg-card shadow-xs">
        <div className="flex justify-between items-center mb-3 border-b border-border pb-2">
          <span className="font-display text-sm font-extrabold text-foreground">
            Slots: {selectedAptDate === todayStr ? "Today" : selectedAptDate}
          </span>
          <Chip color="blue">{selectedDateApts.length} booked</Chip>
        </div>

        <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
          {selectedDateApts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="size-8 mx-auto text-muted-foreground/40 mb-2" />
              <p className="text-xs font-bold">No sessions scheduled.</p>
            </div>
          ) : (
            selectedDateApts.map((apt) => {
              let borderClass = "border-l-duo-blue";
              let pillColor = "blue";
              if (apt.type === "Emergency") {
                borderClass = "border-l-duo-red";
                pillColor = "red";
              }
              if (apt.type === "Group") {
                borderClass = "border-l-duo-green";
                pillColor = "green";
              }
              if (apt.type === "Follow-up") {
                borderClass = "border-l-duo-yellow";
                pillColor = "yellow";
              }

              return (
                <button
                  key={apt.id}
                  onClick={() => {
                    setSelectedAptId(apt.id);
                    setOpenModal("viewApt");
                  }}
                  className={`w-full text-left p-3 border-y border-r border-border border-l-4 ${borderClass} rounded-xl bg-card hover:bg-muted/10 transition flex items-center justify-between gap-2 shadow-xs`}
                >
                  <div className="space-y-1 w-full min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">{apt.avatar}</span>
                      <span className="font-extrabold text-xs text-foreground truncate">{apt.studentName}</span>
                      <span className="text-[9px] text-muted-foreground uppercase font-black">({apt.caseId})</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground flex flex-wrap gap-x-2 gap-y-0.5">
                      <span className="font-bold text-foreground">{apt.time} ({apt.duration})</span>
                      <span>•</span>
                      <span>Counselor: {apt.counselorName}</span>
                    </div>
                  </div>
                  <div className="shrink-0 flex flex-col items-end gap-1">
                    <Chip color={pillColor as any}>{apt.type}</Chip>
                    <span className={`text-[9px] font-extrabold uppercase ${apt.status === "Confirmed" ? "text-duo-blue" : apt.status === "Pending" ? "text-duo-yellow" : apt.status === "Completed" ? "text-duo-green" : "text-duo-red"}`}>
                      {apt.status}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </DuoCard>

      {/* Active Notifications / Reminders Box */}
      <DuoCard className="p-4 border border-border bg-card shadow-xs">
        <div className="flex justify-between items-center mb-3 border-b border-border pb-2">
          <span className="font-display text-sm font-extrabold text-foreground flex items-center gap-1.5">
            <Inbox className="size-4 text-duo-pink" /> In-App Reminders
          </span>
          {notifications.length > 0 && (
            <span className="rounded-full bg-duo-pink px-2 py-0.5 text-[8px] font-black text-white uppercase animate-pulse">
              {notifications.length} Act
            </span>
          )}
        </div>

        <div className="space-y-2.5 max-h-[220px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-6 text-xs text-muted-foreground">
              No active reminders.
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className="p-2.5 rounded-xl border border-pink-100 bg-pink-50/20 text-xs flex justify-between items-start gap-2"
              >
                <p className="leading-snug text-muted-foreground font-medium">
                  <span className="font-extrabold text-duo-pink block mb-0.5">System Alert</span>
                  {notif.text}
                </p>
                <button
                  onClick={() => {
                    const nextNotifs = notifications.filter((n) => n.id !== notif.id);
                    saveState({ notifications: nextNotifs });
                  }}
                  className="text-muted-foreground hover:text-foreground text-[10px] font-black shrink-0"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </DuoCard>
    </div>
  );
};
