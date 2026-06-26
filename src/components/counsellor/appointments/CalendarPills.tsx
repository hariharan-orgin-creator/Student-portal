import React from "react";
import { DuoCard } from "@/components/duo";

interface CalendarPillsProps {
  aptsToday: number;
  aptsThisWeek: number;
  pendingApts: number;
  cancelledApts: number;
}

export const CalendarPills: React.FC<CalendarPillsProps> = ({
  aptsToday,
  aptsThisWeek,
  pendingApts,
  cancelledApts,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <DuoCard className="p-4 border-l-4 border-l-duo-blue bg-card shadow-xs">
        <div className="text-[10px] font-bold text-muted-foreground uppercase">Today's Sessions</div>
        <div className="text-2xl font-extrabold text-foreground mt-1">{aptsToday}</div>
        <div className="text-[9px] text-muted-foreground mt-0.5">Scheduled for 22 Jun</div>
      </DuoCard>
      <DuoCard className="p-4 border-l-4 border-l-duo-purple bg-card shadow-xs">
        <div className="text-[10px] font-bold text-muted-foreground uppercase">This Week</div>
        <div className="text-2xl font-extrabold text-foreground mt-1">{aptsThisWeek}</div>
        <div className="text-[9px] text-muted-foreground mt-0.5">June 22 – June 28</div>
      </DuoCard>
      <DuoCard className="p-4 border-l-4 border-l-duo-yellow bg-card shadow-xs">
        <div className="text-[10px] font-bold text-muted-foreground uppercase">Pending Confirmations</div>
        <div className="text-2xl font-extrabold text-duo-yellow mt-1">{pendingApts}</div>
        <div className="text-[9px] text-muted-foreground mt-0.5">Awaiting counselor verify</div>
      </DuoCard>
      <DuoCard className="p-4 border-l-4 border-l-duo-red bg-card shadow-xs">
        <div className="text-[10px] font-bold text-muted-foreground uppercase">Cancellations</div>
        <div className="text-2xl font-extrabold text-duo-red mt-1">{cancelledApts}</div>
        <div className="text-[9px] text-muted-foreground mt-0.5">Cancelled this term</div>
      </DuoCard>
    </div>
  );
};
