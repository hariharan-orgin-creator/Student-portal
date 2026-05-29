import { useEffect, useState } from "react";
import { ClassLeaderboard } from "@/components/class-leaderboard";
import { DuoCard } from "@/components/duo";
import { BADGES } from "@/lib/mockData";
import { loadStudentSettings } from "@/lib/student-settings";
import { Flame, Star, Trophy } from "lucide-react";

export function StudentPortfolioPage() {
  const [points, setPoints] = useState(320);
  const [settings, setSettings] = useState(() => loadStudentSettings());

  useEffect(() => {
    const saved = localStorage.getItem("student_state");
    if (saved) {
      try {
        const s = JSON.parse(saved);
        if (typeof s.points === "number") setPoints(s.points);
      } catch {}
    }
    setSettings(loadStudentSettings());
  }, []);

  const earnedBadges = BADGES.filter((b) => b.earned);
  const showBadges = settings.identity.showBadges;
  const showAchievements = settings.identity.showAchievementShowcase;

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <DuoCard className="bg-gradient-to-br from-[oklch(0.96_0.08_145)] to-card p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="grid size-16 place-items-center rounded-full border-[3px] border-[var(--duo-green)] bg-card text-3xl">
              {settings.identity.avatar}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 grid size-6 place-items-center rounded-full bg-[var(--duo-purple)] text-[9px] font-bold text-white">
              L4
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-lg font-bold">Aisyah</h1>
            <p className="text-xs font-bold text-[var(--duo-green-dark)]">
              {settings.identity.studyIdentity}
            </p>
            <p className="mt-1 text-[10px] text-muted-foreground">
              {settings.identity.favoriteSubjects.join(" · ")}
            </p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-card/80 px-2 py-2 text-center">
            <Star className="mx-auto size-4 fill-[var(--duo-yellow)] text-[var(--duo-yellow)]" />
            <p className="font-numeric mt-0.5 text-lg font-extrabold">{points}</p>
            <p className="text-[9px] font-bold text-muted-foreground">Points</p>
          </div>
          <div className="rounded-xl bg-card/80 px-2 py-2 text-center">
            <Flame className="mx-auto size-4 text-[var(--duo-orange)]" />
            <p className="font-numeric mt-0.5 text-lg font-extrabold">5</p>
            <p className="text-[9px] font-bold text-muted-foreground">Streak</p>
          </div>
          <div className="rounded-xl bg-card/80 px-2 py-2 text-center">
            <Trophy className="mx-auto size-4 text-[var(--duo-purple)]" />
            <p className="font-numeric mt-0.5 text-lg font-extrabold">3</p>
            <p className="text-[9px] font-bold text-muted-foreground">Badges</p>
          </div>
        </div>
      </DuoCard>

      {showBadges && showAchievements && earnedBadges.length > 0 && (
        <DuoCard className="p-3">
          <h2 className="mb-2 font-display text-sm font-bold">Achievement showcase</h2>
          <div className="flex flex-wrap gap-2">
            {earnedBadges.map((b) => (
              <span
                key={b.id}
                className="flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[10px] font-bold"
                title={b.name}
              >
                <span>{b.icon}</span>
                {b.name}
              </span>
            ))}
          </div>
        </DuoCard>
      )}

      <div>
        <h2 className="mb-2 font-display text-sm font-bold text-muted-foreground">
          Class leaderboard
        </h2>
        {settings.privacy.leaderboardVisible ? (
          <ClassLeaderboard userPoints={points} />
        ) : (
          <DuoCard className="p-6 text-center">
            <p className="text-sm font-bold text-muted-foreground">Leaderboard hidden</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Turn on &quot;Show on leaderboard&quot; in Settings → Privacy to appear here
            </p>
          </DuoCard>
        )}
      </div>
    </div>
  );
}
