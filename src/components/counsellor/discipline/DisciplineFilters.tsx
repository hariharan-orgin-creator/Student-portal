import React from "react";
import { Search, Filter } from "lucide-react";
import { DuoCard } from "@/components/duo";

interface DisciplineFiltersProps {
  disciplineSearchQuery: string;
  setDisciplineSearchQuery: (query: string) => void;
  disciplineStatusFilter: string;
  setDisciplineStatusFilter: (filter: string) => void;
  disciplineTypeFilter: string;
  setDisciplineTypeFilter: (filter: string) => void;
  disciplineGradeFilter: string;
  setDisciplineGradeFilter: (filter: string) => void;
}

export const DisciplineFilters: React.FC<DisciplineFiltersProps> = ({
  disciplineSearchQuery,
  setDisciplineSearchQuery,
  disciplineStatusFilter,
  setDisciplineStatusFilter,
  disciplineTypeFilter,
  setDisciplineTypeFilter,
  disciplineGradeFilter,
  setDisciplineGradeFilter,
}) => {
  return (
    <DuoCard className="p-4 border border-border bg-card">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search student or INC ID..."
            value={disciplineSearchQuery}
            onChange={(e) => setDisciplineSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-border bg-card rounded-xl text-xs focus:ring-2 focus:ring-duo-purple focus:outline-none"
          />
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-2">
          <Filter className="size-3.5 text-muted-foreground shrink-0" />
          <select
            value={disciplineStatusFilter}
            onChange={(e) => setDisciplineStatusFilter(e.target.value)}
            className="w-full py-2 px-3 border border-border bg-card rounded-xl text-xs font-bold focus:ring-2 focus:ring-duo-purple focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Linked to case">Linked to Case</option>
            <option value="Reviewed">Reviewed</option>
          </select>
        </div>

        {/* Type filter */}
        <div className="flex items-center gap-2">
          <Filter className="size-3.5 text-muted-foreground shrink-0" />
          <select
            value={disciplineTypeFilter}
            onChange={(e) => setDisciplineTypeFilter(e.target.value)}
            className="w-full py-2 px-3 border border-border bg-card rounded-xl text-xs font-bold focus:ring-2 focus:ring-duo-purple focus:outline-none"
          >
            <option value="All">All Types</option>
            <option value="Verbal altercation">Verbal Altercation</option>
            <option value="Truancy">Truancy</option>
            <option value="Bullying">Bullying</option>
            <option value="Academic misconduct">Academic Misconduct</option>
            <option value="Property damage">Property Damage</option>
            <option value="Emotional">Emotional</option>
            <option value="Aggression">Aggression</option>
          </select>
        </div>

        {/* Grade filter */}
        <div className="flex items-center gap-2">
          <Filter className="size-3.5 text-muted-foreground shrink-0" />
          <select
            value={disciplineGradeFilter}
            onChange={(e) => setDisciplineGradeFilter(e.target.value)}
            className="w-full py-2 px-3 border border-border bg-card rounded-xl text-xs font-bold focus:ring-2 focus:ring-duo-purple focus:outline-none"
          >
            <option value="All">All Grades</option>
            <option value="Grade 3">Grade 3</option>
            <option value="Grade 4">Grade 4</option>
            <option value="Grade 5">Grade 5</option>
            <option value="Grade 6">Grade 6</option>
          </select>
        </div>
      </div>
    </DuoCard>
  );
};
