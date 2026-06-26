import React from "react";
import { UserCheck, Calendar, BookmarkCheck, Inbox, Activity, FolderHeart } from "lucide-react";

interface StudentSubTabsNavProps {
  activeSubTab: string;
  setActiveSubTab: (tab: string) => void;
}

export const StudentSubTabsNav: React.FC<StudentSubTabsNavProps> = ({
  activeSubTab,
  setActiveSubTab,
}) => {
  const tabs = [
    { id: "profile", label: "Profile", icon: UserCheck },
    { id: "sessions", label: "Sessions", icon: Calendar },
    { id: "interventions", label: "Interventions", icon: BookmarkCheck },
    { id: "referrals", label: "Referrals", icon: Inbox },
    { id: "goals", label: "Goals", icon: Activity },
    { id: "docs", label: "Docs", icon: FolderHeart },
  ];

  return (
    <div className="flex border-b border-border overflow-x-auto scrollbar-none gap-2">
      {tabs.map((subTab) => {
        const SubIcon = subTab.icon;
        const isSubActive = activeSubTab === subTab.id;
        return (
          <button
            key={subTab.id}
            onClick={() => setActiveSubTab(subTab.id)}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-bold border-b-2 transition shrink-0 ${
              isSubActive
                ? "border-duo-pink text-duo-pink"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <SubIcon className="size-4" />
            <span>{subTab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
