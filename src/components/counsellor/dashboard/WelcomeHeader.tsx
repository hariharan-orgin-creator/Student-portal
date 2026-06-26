import { useEffect, useState } from "react";

interface WelcomeHeaderProps {
  highRiskStudentsCount: number;
  dueTodayTasksCount: number;
  newIncidentsCount: number;
}

export function WelcomeHeader({
  highRiskStudentsCount,
  dueTodayTasksCount,
  newIncidentsCount,
}: Readonly<WelcomeHeaderProps>) {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    setCurrentTime(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  return (
    <div className="rounded-3xl border-2 border-border p-6 bg-gradient-to-br from-pink-50/20 via-card to-card shadow-xs relative overflow-hidden">
      <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-48 h-48 rounded-full bg-pink-100/20 blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 -translate-x-12 translate-y-12 w-48 h-48 rounded-full bg-blue-100/10 blur-3xl pointer-events-none" />
      
      <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-extrabold text-duo-pink uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <span className="inline-block size-1.5 rounded-full bg-duo-pink animate-pulse" />
            <span>{currentTime || "June 25, 2026"}</span>
          </div>
          <h1 className="font-display text-3xl font-black tracking-tight text-foreground">
            Good morning, Puan Maryam
          </h1>
          <p className="text-xs md:text-sm font-semibold text-muted-foreground mt-2 leading-relaxed break-words whitespace-normal">
            Good morning, Puan Maryam — <span className="text-duo-red font-black">{highRiskStudentsCount} students flagged</span> · <span className="text-duo-orange font-black">{dueTodayTasksCount} follow-ups due today</span> · <span className="text-duo-purple font-black">{newIncidentsCount} new discipline incidents</span>
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="rounded-2xl border border-border bg-card/80 backdrop-blur px-4 py-2.5 text-center shadow-xs">
            <span className="text-[9px] font-extrabold text-muted-foreground uppercase block mb-0.5">Reference Time</span>
            <span className="text-xs font-black text-foreground">June 25, 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
