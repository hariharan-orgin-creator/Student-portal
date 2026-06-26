import React from "react";
import { Calendar } from "lucide-react";
import { CalendarPills } from "./CalendarPills";
import { AppointmentsHeader } from "./AppointmentsHeader";
import { CalendarMonthView } from "./CalendarMonthView";
import { CalendarWeekView } from "./CalendarWeekView";
import { SlotsSidebarList } from "./SlotsSidebarList";

interface AppointmentsTabProps {
  appointments: any[];
  selectedAptDate: string;
  setSelectedAptDate: (date: string) => void;
  viewMode: "month" | "week";
  setViewMode: (mode: "month" | "week") => void;
  aptCounselorFilter: string;
  setAptCounselorFilter: (counselor: string) => void;
  aptTypeFilter: string;
  setAptTypeFilter: (type: string) => void;
  aptMonthFilter: string;
  setAptMonthFilter: (month: string) => void;
  setSelectedAptId: (id: string | null) => void;
  setOpenModal: (modal: string | null) => void;
  notifications: any[];
  saveState: (updatedData: any) => void;
}

export const AppointmentsTab: React.FC<AppointmentsTabProps> = ({
  appointments,
  selectedAptDate,
  setSelectedAptDate,
  viewMode,
  setViewMode,
  aptCounselorFilter,
  setAptCounselorFilter,
  aptTypeFilter,
  setAptTypeFilter,
  aptMonthFilter,
  setAptMonthFilter,
  setSelectedAptId,
  setOpenModal,
  notifications,
  saveState,
}) => {
  const counselorsList = Array.from(
    new Set(appointments.map((a) => a.counselorName).filter(Boolean))
  ) as string[];

  // Filtered appointments list
  const filteredApts = appointments.filter((apt) => {
    const matchesType = aptTypeFilter === "All" || apt.type === aptTypeFilter;
    const matchesCounselor =
      aptCounselorFilter === "All" || apt.counselorName === aptCounselorFilter;
    const matchesMonth = aptMonthFilter === "All" || apt.date.startsWith(aptMonthFilter);
    return matchesType && matchesCounselor && matchesMonth;
  });

  // Summary Stats calculations
  const todayStr = "2026-06-22";
  const aptsToday = appointments.filter(
    (a) => a.date === todayStr && a.status !== "Cancelled"
  ).length;

  // Weekly range: 2026-06-22 to 2026-06-28
  const aptsThisWeek = appointments.filter(
    (a) => a.date >= "2026-06-22" && a.date <= "2026-06-28" && a.status !== "Cancelled"
  ).length;
  const pendingApts = filteredApts.filter((a) => a.status === "Pending").length;
  const cancelledApts = filteredApts.filter((a) => a.status === "Cancelled").length;

  // Month Dates generation for June 2026 (Monday 1st - Sunday 30th)
  const juneDays = Array.from({ length: 30 }, (_, i) => i + 1);

  // Week Dates generation (June 22 - June 28)
  const weekDays = [
    { label: "Mon 22", date: "2026-06-22" },
    { label: "Tue 23", date: "2026-06-23" },
    { label: "Wed 24", date: "2026-06-24" },
    { label: "Thu 25", date: "2026-06-25" },
    { label: "Fri 26", date: "2026-06-26" },
    { label: "Sat 27", date: "2026-06-27" },
    { label: "Sun 28", date: "2026-06-28" },
  ];

  const hourSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  // Slots list for selected date
  const selectedDateApts = filteredApts
    .filter((a) => a.date === selectedAptDate)
    .sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="space-y-6 w-full min-w-0">
      {/* Top header area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold flex items-center gap-2">
            <Calendar className="size-6 text-duo-blue" /> Appointments Calendar
          </h1>
          <p className="text-xs text-muted-foreground">
            Manage schedules, book counselling sessions, and configure client reminders.
          </p>
        </div>
      </div>

      {/* Summary Stats Bar */}
      <CalendarPills
        aptsToday={aptsToday}
        aptsThisWeek={aptsThisWeek}
        pendingApts={pendingApts}
        cancelledApts={cancelledApts}
      />

      {/* Filter and toggle controls bar */}
      <AppointmentsHeader
        aptTypeFilter={aptTypeFilter}
        setAptTypeFilter={setAptTypeFilter}
        aptCounselorFilter={aptCounselorFilter}
        setAptCounselorFilter={setAptCounselorFilter}
        aptMonthFilter={aptMonthFilter}
        setAptMonthFilter={setAptMonthFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
        counselorsList={counselorsList}
      />

      {/* Calendar Workspace Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {viewMode === "month" ? (
            <CalendarMonthView
              juneDays={juneDays}
              todayStr={todayStr}
              selectedAptDate={selectedAptDate}
              setSelectedAptDate={setSelectedAptDate}
              appointments={filteredApts}
            />
          ) : (
            <CalendarWeekView
              weekDays={weekDays}
              todayStr={todayStr}
              hourSlots={hourSlots}
              appointments={filteredApts}
              setSelectedAptId={setSelectedAptId}
              setOpenModal={setOpenModal}
            />
          )}
        </div>

        <SlotsSidebarList
          selectedAptDate={selectedAptDate}
          todayStr={todayStr}
          selectedDateApts={selectedDateApts}
          setSelectedAptId={setSelectedAptId}
          setOpenModal={setOpenModal}
          notifications={notifications}
          saveState={saveState}
        />
      </div>
    </div>
  );
};
