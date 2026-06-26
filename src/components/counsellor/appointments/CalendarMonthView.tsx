import React from "react";
import { DuoCard } from "@/components/duo";

interface CalendarMonthViewProps {
  juneDays: number[];
  todayStr: string;
  selectedAptDate: string;
  setSelectedAptDate: (date: string) => void;
  appointments: any[];
}

export const CalendarMonthView: React.FC<CalendarMonthViewProps> = ({
  juneDays,
  todayStr,
  selectedAptDate,
  setSelectedAptDate,
  appointments,
}) => {
  return (
    <DuoCard className="p-4 border border-border bg-card shadow-xs">
      <div className="flex justify-between items-center mb-4">
        <span className="font-display text-sm font-extrabold text-foreground">June 2026</span>
        <span className="text-[10px] font-bold text-muted-foreground uppercase">Today is 22 Jun</span>
      </div>
      
      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-1 text-center font-bold text-[10px] text-muted-foreground uppercase mb-2">
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
        <div>Sun</div>
      </div>

      {/* Calendar Grid cells */}
      <div className="grid grid-cols-7 gap-1">
        {juneDays.map((day) => {
          const dateStr = `2026-06-${day.toString().padStart(2, "0")}`;
          const isToday = dateStr === todayStr;
          const isSelected = dateStr === selectedAptDate;
          
          // Check day appointments
          const dayApts = appointments.filter((a) => a.date === dateStr && a.status !== "Cancelled");
          const hasApts = dayApts.length > 0;

          return (
            <button
              key={day}
              onClick={() => setSelectedAptDate(dateStr)}
              className={`h-12 border border-border/40 rounded-lg flex flex-col justify-between p-1.5 text-xs font-bold transition-all relative ${
                isSelected 
                  ? "bg-duo-blue text-white border-duo-blue shadow-xs" 
                  : isToday 
                  ? "bg-blue-50/20 text-duo-blue border-duo-blue/60" 
                  : "bg-card text-foreground hover:bg-muted/10"
              }`}
            >
              <span>{day}</span>
              {hasApts && (
                <div className="flex justify-center gap-0.5 w-full">
                  {dayApts.slice(0, 3).map((apt, index) => {
                    let dotColor = "bg-duo-blue";
                    if (apt.type === "Emergency") dotColor = "bg-duo-red";
                    if (apt.type === "Group") dotColor = "bg-duo-green";
                    if (apt.type === "Follow-up") dotColor = "bg-duo-yellow";
                    return <div key={index} className={`size-1.5 rounded-full ${dotColor}`} />;
                  })}
                  {dayApts.length > 3 && <div className="text-[7px] leading-[6px] font-extrabold">+</div>}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </DuoCard>
  );
};
