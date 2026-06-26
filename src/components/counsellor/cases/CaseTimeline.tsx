import React from "react";

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  urgency: "red" | "yellow" | "green" | "grey";
}

interface CaseTimelineProps {
  timelineEvents: TimelineEvent[];
}

export const CaseTimeline: React.FC<CaseTimelineProps> = ({ timelineEvents }) => {
  return (
    <div className="space-y-3.5">
      <h3 className="text-xs font-black text-foreground uppercase tracking-wide">Case Activity Timeline</h3>
      <div className="h-[280px] overflow-y-auto pr-1">
        {timelineEvents.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-6">No timeline events logged.</p>
        ) : (
          <div className="relative pl-6 border-l border-border space-y-5 py-1">
            {timelineEvents.map((evt, idx) => {
              const dotColors = {
                red: "bg-red-500 ring-red-100",
                yellow: "bg-yellow-500 ring-yellow-100",
                green: "bg-green-500 ring-green-100",
                grey: "bg-gray-400 ring-gray-100",
              };
              return (
                <div key={idx} className="relative">
                  <span className={`absolute -left-[31px] top-1.5 size-2.5 rounded-full ring-4 ${dotColors[evt.urgency]}`} />
                  
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs flex-wrap gap-1">
                      <span className="font-extrabold text-foreground">{evt.title}</span>
                      <span className="text-[10px] text-muted-foreground font-semibold bg-muted px-2 py-0.5 rounded">{evt.date}</span>
                    </div>
                    <p className="text-[11px] font-semibold text-muted-foreground leading-relaxed break-words">
                      {evt.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
