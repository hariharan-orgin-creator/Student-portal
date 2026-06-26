import React from "react";
import { Search } from "lucide-react";

interface RiskFiltersProps {
  riskSearchQuery: string;
  setRiskSearchQuery: (query: string) => void;
  riskLevelFilter: string;
  setRiskLevelFilter: (filter: string) => void;
  riskSortBy: string;
  setRiskSortBy: (sortBy: string) => void;
}

export const RiskFilters: React.FC<RiskFiltersProps> = ({
  riskSearchQuery,
  setRiskSearchQuery,
  riskLevelFilter,
  setRiskLevelFilter,
  riskSortBy,
  setRiskSortBy,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-card p-3 rounded-2xl border-2 border-border">
      {/* Search Input */}
      <div className="relative w-full sm:max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search student..."
          value={riskSearchQuery}
          onChange={(e) => setRiskSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-xs font-bold bg-muted/50 border-2 border-border rounded-xl focus:outline-none focus:border-duo-blue"
        />
      </div>

      {/* Filters and Sorting dropdowns */}
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
        {/* Risk Filter */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="font-extrabold text-muted-foreground">Risk Level:</span>
          <select
            value={riskLevelFilter}
            onChange={(e) => setRiskLevelFilter(e.target.value)}
            className="bg-muted/50 border-2 border-border rounded-xl px-2 py-1.5 text-xs font-bold focus:outline-none cursor-pointer hover:border-muted-foreground/30 transition"
          >
            <option value="All">All Risks</option>
            <option value="High">High Risk</option>
            <option value="Medium">Medium Risk</option>
            <option value="Low">Low Risk</option>
          </select>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="font-extrabold text-muted-foreground">Sort By:</span>
          <select
            value={riskSortBy}
            onChange={(e) => setRiskSortBy(e.target.value)}
            className="bg-muted/50 border-2 border-border rounded-xl px-2 py-1.5 text-xs font-bold focus:outline-none cursor-pointer hover:border-muted-foreground/30 transition"
          >
            <option value="default">Default (Name)</option>
            <option value="scoreDesc">Score: High to Low</option>
            <option value="scoreAsc">Score: Low to High</option>
          </select>
        </div>
      </div>
    </div>
  );
};
