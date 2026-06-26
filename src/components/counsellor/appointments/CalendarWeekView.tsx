import React from "react";
import { DuoCard } from "@/components/duo";

interface CalendarWeekViewProps {
  weekDays: { label: string; date: string }[];
  todayStr: string;
  hourSlots: string[];
  appointments: any[];
  setSelectedAptId: (id: string | null) => void;
  setOpenModal: (modal: string | null) => void;
}

export const CalendarWeekView: React.FC<CalendarWeekViewProps> = ({
  weekDays,
  todayStr,
  hourSlots,
  appointments,
  setSelectedAptId,
  setOpenModal,
}) => {
  return (
    <DuoCard className="p-4 border border-border bg-card shadow-xs overflow-x-auto">
      <div className="min-w-[600px]">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr>
              <th className="p-2 border border-border bg-muted/20 text-left font-bold w-16">Time</th>
              {weekDays.map((d) => (
                <th
                  key={d.date}
                  className={`p-2 border border-border text-center font-extrabold ${
                    d.date === todayStr ? "bg-blue-50/20 text-duo-blue border-duo-blue/40" : "bg-muted/10 text-muted-foreground"
                  }`}
                >
                  {d.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hourSlots.map((hour) => (
              <tr key={hour}>
                <td className="p-2 border border-border font-bold text-muted-foreground">{hour}</td>
                {weekDays.map((d) => {
                  const cellApt = appointments.find(
                    (a) => a.date === d.date && a.time.startsWith(hour) && a.status !== "Cancelled"
                  );
                  
                  if (cellApt) {
                    let blockClass = "bg-blue-50 border-l-4 border-duo-blue text-duo-blue";
                    if (cellApt.type === "Emergency") blockClass = "bg-red-50 border-l-4 border-duo-red text-duo-red";
                    if (cellApt.type === "Group") blockClass = "bg-green-50 border-l-4 border-duo-green text-duo-green";
                    if (cellApt.type === "Follow-up") blockClass = "bg-yellow-50 border-l-4 border-duo-yellow text-duo-yellow";

                    return (
                      <td key={d.date} className="p-1 border border-border">
                        <button
                          onClick={() => {
                            setSelectedAptId(cellApt.id);
                            setOpenModal("viewApt");
                          }}
                          className={`w-full p-1.5 rounded-md text-[10px] font-extrabold text-left leading-normal ${blockClass} transition hover:opacity-90`}
                        >
                          <div className="font-black truncate">{cellApt.studentName}</div>
                          <div className="text-[8px] opacity-80">{cellApt.time} ({cellApt.duration})</div>
                        </button>
                      </td>
                    );
                  }

                  return (
                    <td key={d.date} className="p-1 border border-border text-center">
                      <div className="w-full h-8 flex items-center justify-center text-muted-foreground/30 text-xs">
                        —
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DuoCard>
  );
};
