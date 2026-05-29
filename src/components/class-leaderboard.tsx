import { useMemo, useState } from "react";
import { CLASS_LEADERBOARD } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Minus } from "lucide-react";

type Period = "weekly" | "allTime";

type RankedStudent = {
  id: string;
  name: string;
  avatar: string;
  points: number;
  rank: number;
  isCurrentUser?: boolean;
  trend: "up" | "down" | "same";
};

function buildLeaderboard(userPoints: number, period: Period): RankedStudent[] {
  const entries = CLASS_LEADERBOARD.map((e) => {
    const points =
      period === "weekly"
        ? e.isCurrentUser
          ? Math.round(userPoints * 0.22)
          : e.weeklyPoints
        : e.isCurrentUser
          ? userPoints
          : e.allTimePoints;
    return {
      id: e.id,
      name: e.name,
      avatar: e.avatar,
      points,
      isCurrentUser: e.isCurrentUser,
      trend: e.trend,
    };
  });

  return [...entries].sort((a, b) => b.points - a.points).map((e, i) => ({ ...e, rank: i + 1 }));
}

function TrendIcon({ trend }: { trend: "up" | "down" | "same" }) {
  if (trend === "up")
    return <ChevronUp className="size-3.5 text-[var(--duo-green)]" strokeWidth={3} />;
  if (trend === "down")
    return <ChevronDown className="size-3.5 text-[var(--duo-red)]" strokeWidth={3} />;
  return <Minus className="size-3 text-muted-foreground" />;
}

function PodiumSlot({
  student,
  place,
  height,
}: {
  student: RankedStudent;
  place: 1 | 2 | 3;
  height: string;
}) {
  return (
    <div className="flex flex-1 flex-col items-center min-w-0">
      <div className="mb-1 flex flex-col items-center gap-0.5 text-center">
        <div className="grid size-9 place-items-center rounded-full border-2 border-white/90 bg-white text-lg shadow-sm">
          {student.avatar}
        </div>
        <p className="max-w-[72px] truncate text-[10px] font-bold leading-tight text-white">
          {student.isCurrentUser ? "You" : student.name.split(" ")[0]}
        </p>
        <span className="font-numeric rounded-full bg-white px-1.5 py-px text-[9px] font-extrabold text-[var(--duo-orange)]">
          {student.points}
        </span>
      </div>
      <div
        className={cn(
          "flex w-full items-end justify-center rounded-t-lg bg-white/25 font-numeric text-2xl font-bold text-white",
          height,
        )}
      >
        <span className="pb-0.5">{place}</span>
      </div>
    </div>
  );
}

export function ClassLeaderboard({ userPoints }: { userPoints: number }) {
  const [period, setPeriod] = useState<Period>("weekly");

  const ranked = useMemo(() => buildLeaderboard(userPoints, period), [userPoints, period]);
  const top3 = ranked.slice(0, 3);
  const rest = ranked.slice(3, 5);
  const currentUser = ranked.find((e) => e.isCurrentUser);
  const thirdPlacePoints = top3[2]?.points ?? 0;
  const inTop3 = currentUser !== undefined && currentUser.rank <= 3;
  const ptsToTop3 =
    currentUser === undefined || inTop3
      ? 0
      : Math.max(1, thirdPlacePoints - currentUser.points + 1);

  const podiumOrder: { student: RankedStudent; place: 1 | 2 | 3; height: string }[] = [
    { student: top3[1]!, place: 2, height: "h-12" },
    { student: top3[0]!, place: 1, height: "h-16" },
    { student: top3[2]!, place: 3, height: "h-10" },
  ];

  return (
    <section className="overflow-hidden rounded-2xl shadow-[var(--card-shadow)]">
      <div className="bg-[var(--duo-orange)] px-3 pb-0 pt-2.5">
        <h2 className="text-center font-display text-sm font-bold text-white">Leaderboard</h2>

        <div className="mx-auto mt-2 flex max-w-[200px] rounded-full border border-white/30 bg-white/15 p-0.5">
          <button
            type="button"
            onClick={() => setPeriod("weekly")}
            className={cn(
              "flex-1 rounded-full py-1 text-[10px] font-extrabold transition",
              period === "weekly"
                ? "bg-white text-[var(--duo-orange)]"
                : "text-white hover:bg-white/10",
            )}
          >
            Weekly
          </button>
          <button
            type="button"
            onClick={() => setPeriod("allTime")}
            className={cn(
              "flex-1 rounded-full py-1 text-[10px] font-extrabold transition",
              period === "allTime"
                ? "bg-white text-[var(--duo-orange)]"
                : "text-white hover:bg-white/10",
            )}
          >
            All time
          </button>
        </div>

        {top3.length === 3 && (
          <div className="mt-2 flex items-end justify-center gap-1.5">
            {podiumOrder.map(({ student, place, height }) => (
              <PodiumSlot key={student.id} student={student} place={place} height={height} />
            ))}
          </div>
        )}
      </div>

      <div className="rounded-t-xl bg-card px-3 pb-2 pt-2">
        {currentUser && !inTop3 && (
          <p className="mb-1.5 text-center text-[10px] font-bold text-[var(--duo-orange)]">
            #{currentUser.rank} · +{ptsToTop3} pts for Top 3
          </p>
        )}

        <ul className="divide-y divide-border">
          {rest.map((student) => (
            <li key={student.id} className="flex items-center gap-2 py-1.5">
              <span className="font-numeric w-5 shrink-0 text-[10px] font-bold text-muted-foreground">
                {String(student.rank).padStart(2, "0")}
              </span>
              <div className="grid size-7 shrink-0 place-items-center rounded-full bg-muted text-sm">
                {student.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    "truncate text-xs font-bold leading-tight",
                    student.isCurrentUser ? "text-[var(--duo-orange)]" : "text-foreground",
                  )}
                >
                  {student.name}
                </p>
                <p className="font-numeric text-[10px] font-bold text-muted-foreground">
                  {student.points} pts
                </p>
              </div>
              <TrendIcon trend={student.trend} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
