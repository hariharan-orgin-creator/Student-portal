import { DuoButton, DuoCard } from "@/components/duo";
import { STUDENT_ACTIVITIES } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { Gamepad2, Trophy, Target, Calendar, Check } from "lucide-react";

const typeMeta = {
  quest: {
    label: "Quest",
    icon: Target,
    color: "text-[var(--duo-green-dark)]",
    bg: "bg-[oklch(0.95_0.08_145)]",
  },
  game: {
    label: "Game",
    icon: Gamepad2,
    color: "text-[var(--duo-blue)]",
    bg: "bg-[oklch(0.95_0.06_240)]",
  },
  event: {
    label: "Event",
    icon: Calendar,
    color: "text-[var(--duo-purple)]",
    bg: "bg-[oklch(0.95_0.06_295)]",
  },
  challenge: {
    label: "Challenge",
    icon: Trophy,
    color: "text-[var(--duo-orange)]",
    bg: "bg-[oklch(0.95_0.06_50)]",
  },
};

const statusLabel = {
  available: { text: "Start", variant: "green" as const },
  "in-progress": { text: "Continue", variant: "blue" as const },
  completed: { text: "Done", variant: "white" as const },
};

export function StudentActivitiesPage() {
  const available = STUDENT_ACTIVITIES.filter((a) => a.status === "available");
  const inProgress = STUDENT_ACTIVITIES.filter((a) => a.status === "in-progress");
  const completed = STUDENT_ACTIVITIES.filter((a) => a.status === "completed");

  return (
    <div className="space-y-4">
      <div className="grid gap-2 sm:grid-cols-3">
        <DuoCard className="p-3 text-center">
          <p className="font-numeric text-2xl font-extrabold text-duo-green-dark">
            {available.length}
          </p>
          <p className="text-xs font-bold text-muted-foreground">Ready to play</p>
        </DuoCard>
        <DuoCard className="p-3 text-center">
          <p className="font-numeric text-2xl font-extrabold text-duo-blue">
            {inProgress.length}
          </p>
          <p className="text-xs font-bold text-muted-foreground">In progress</p>
        </DuoCard>
        <DuoCard className="p-3 text-center">
          <p className="font-numeric text-2xl font-extrabold text-muted-foreground">
            {completed.length}
          </p>
          <p className="text-xs font-bold text-muted-foreground">Completed</p>
        </DuoCard>
      </div>

      {[
        { title: "Continue", items: inProgress },

        { title: "Available", items: available },

        { title: "Completed", items: completed },
      ].map(
        (section) =>
          section.items.length > 0 && (
            <section key={section.title}>
              <h2 className="mb-2 font-display text-sm font-bold text-muted-foreground">
                {section.title}
              </h2>

              <ul className="grid gap-3 sm:grid-cols-2">
                {section.items.map((activity) => {
                  const meta = typeMeta[activity.type];

                  const MetaIcon = meta.icon;

                  const action = statusLabel[activity.status];

                  return (
                    <li key={activity.id}>
                      <DuoCard className="flex h-full flex-col p-3">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-3xl">{activity.icon}</span>

                          <span
                            className={cn(
                              "flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",

                              meta.bg,

                              meta.color,
                            )}
                          >
                            <MetaIcon className="size-3" />

                            {meta.label}
                          </span>
                        </div>

                        <h3 className="mt-2 font-display text-sm font-bold">{activity.title}</h3>

                        <p className="mt-1 flex-1 text-xs text-muted-foreground">
                          {activity.description}
                        </p>

                        <div className="mt-3 flex items-center justify-between gap-2">
                          <span className="font-numeric text-xs font-bold text-duo-yellow">
                            +{activity.points} pts
                          </span>

                          {activity.due && (
                            <span className="text-[10px] font-bold text-muted-foreground">
                              {activity.due}
                            </span>
                          )}
                        </div>

                        {activity.status === "completed" ? (
                          <div className="mt-2 flex items-center justify-center gap-1 rounded-lg bg-[oklch(0.95_0.08_145)] py-2 text-xs font-bold text-duo-green-dark">
                            <Check className="size-4" />
                            Completed
                          </div>
                        ) : (
                          <DuoButton size="sm" variant={action.variant} className="mt-2 w-full">
                            {action.text}
                          </DuoButton>
                        )}
                      </DuoCard>
                    </li>
                  );
                })}
              </ul>
            </section>
          ),
      )}
    </div>
  );
}
