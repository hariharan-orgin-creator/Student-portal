import React from "react";
import { Inbox, BookmarkCheck } from "lucide-react";
import { DuoCard, Chip } from "@/components/duo";

interface IncidentsListProps {
  sortedIncidents: any[];
  activeIncidentId: string | null;
  setSelectedIncidentId: (id: string) => void;
}

export const IncidentsList: React.FC<IncidentsListProps> = ({
  sortedIncidents,
  activeIncidentId,
  setSelectedIncidentId,
}) => {
  return (
    <DuoCard className="p-4 border border-border bg-card space-y-4 max-h-[800px] overflow-y-auto">
      <h2 className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider">
        Incidents Feed ({sortedIncidents.length})
      </h2>
      
      {sortedIncidents.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          <Inbox className="size-12 text-muted/60 mx-auto mb-3" />
          <p className="text-sm font-bold">No discipline incidents found</p>
          <p className="text-xs mt-1">Try adjusting your filters or search terms.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedIncidents.map((incident) => {
            const isSelected = incident.id === activeIncidentId;
            let borderClass = "border-l-4 border-l-muted-foreground";
            let badgeColor: "red" | "green" | "grey" = "grey";
            
            if (incident.status === "New") {
              borderClass = "border-l-4 border-l-duo-red";
              badgeColor = "red";
            } else if (incident.status === "Linked") {
              borderClass = "border-l-4 border-l-duo-green";
              badgeColor = "green";
            }

            return (
              <div
                key={incident.id}
                onClick={() => setSelectedIncidentId(incident.id)}
                className={`border-2 rounded-2xl p-4 bg-card cursor-pointer transition-all ${borderClass} ${
                  isSelected
                    ? "border-duo-purple bg-purple-50/10 shadow-md animate-none"
                    : "border-border hover:border-muted hover:shadow-xs"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{incident.avatar}</span>
                    <div>
                      <span className="font-bold text-xs text-foreground block">{incident.studentName}</span>
                      <span className="text-[10px] text-muted-foreground font-semibold">
                        {incident.grade} • {incident.date}
                      </span>
                    </div>
                  </div>
                  <Chip color={badgeColor} className="capitalize">
                    {incident.status === "Linked" ? `Linked` : incident.status}
                  </Chip>
                </div>

                <div className="mt-2 text-xs font-medium text-muted-foreground line-clamp-2">
                  <span className="font-bold text-foreground mr-1">{incident.id}:</span>
                  {incident.description}
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="px-2 py-0.5 text-[9px] font-bold bg-blue-50 text-blue-600 border border-blue-100 rounded-full">
                    {incident.type}
                  </span>
                  {incident.status === "Linked" && (
                    <span className="text-[9px] font-bold text-duo-green-dark flex items-center gap-1">
                      <BookmarkCheck className="size-3" /> Case {incident.counsellingCaseId}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DuoCard>
  );
};
