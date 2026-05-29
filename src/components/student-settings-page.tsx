import { useCallback, useEffect, useState } from "react";
import { DuoButton, DuoCard } from "@/components/duo";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  loadStudentSettings,
  saveStudentSettings,
  DEFAULT_STUDENT_SETTINGS,
  AVATAR_OPTIONS,
  SUBJECT_OPTIONS,
  STUDY_IDENTITIES,
  type StudentSettings,
  type LearningStyle,
  type AiMentorStyle,
  type ProfileTheme,
} from "@/lib/student-settings";
import { cn } from "@/lib/utils";
import {
  Focus,
  User,
  BookOpen,
  Target,
  Shield,
  Bell,
  Bot,
  Accessibility,
  Check,
  RotateCcw,
} from "lucide-react";

const sections = [
  { id: "study", label: "Study environment", icon: Focus },
  { id: "identity", label: "Personal identity", icon: User },
  { id: "learning", label: "Learning preferences", icon: BookOpen },
  { id: "goals", label: "Goals & ambition", icon: Target },
  { id: "privacy", label: "Privacy & social", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "ai", label: "AI mentor", icon: Bot },
  { id: "accessibility", label: "Accessibility", icon: Accessibility },
] as const;

type SectionId = (typeof sections)[number]["id"];

type SettingRowProps = {
  label: string;
  description?: string;
  children: React.ReactNode;
};

function SettingRow({ label, description, children }: Readonly<SettingRowProps>) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-border/40 py-2.5 last:border-0">
      <div className="min-w-0 flex-1">
        <Label className="text-xs font-bold">{label}</Label>
        {description && <p className="mt-0.5 text-[10px] text-muted-foreground">{description}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

type ChipSelectProps = {
  options: string[];
  selected: string | string[];
  onChange: (value: string) => void;
  multi?: boolean;
};

function ChipSelect({ options, selected, onChange, multi = false }: Readonly<ChipSelectProps>) {
  const isSelected = (opt: string) =>
    multi ? (selected as string[]).includes(opt) : selected === opt;

  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={cn(
            "rounded-full px-2.5 py-1 text-[10px] font-bold transition",
            isSelected(opt)
              ? "bg-duo-green text-white"
              : "bg-muted text-muted-foreground hover:bg-muted/80",
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export function StudentSettingsPage() {
  const [settings, setSettings] = useState<StudentSettings>(DEFAULT_STUDENT_SETTINGS);
  const [activeSection, setActiveSection] = useState<SectionId>("study");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const loaded = loadStudentSettings();
    setSettings(loaded);
    saveStudentSettings(loaded);
  }, []);

  const patch = useCallback(
    <K extends keyof StudentSettings>(key: K, patchValue: Partial<StudentSettings[K]>) => {
      setSettings((prev) => {
        const next = { ...prev, [key]: { ...prev[key], ...patchValue } };
        saveStudentSettings(next);
        return next;
      });
      setSaved(false);
    },
    [],
  );

  const handleSave = () => {
    saveStudentSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const resetAll = () => {
    setSettings(DEFAULT_STUDENT_SETTINGS);
    saveStudentSettings(DEFAULT_STUDENT_SETTINGS);
    setSaved(true);
  };

  const toggleSubject = (subject: string) => {
    const current = settings.identity.favoriteSubjects;
    const next = current.includes(subject)
      ? current.filter((s) => s !== subject)
      : [...current, subject];
    patch("identity", { favoriteSubjects: next });
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="font-display text-xl font-bold">Settings</h1>
          <p className="text-xs text-muted-foreground">
            Customize your study space, identity, and learning experience
          </p>
        </div>
        <div className="flex gap-2">
          <DuoButton size="sm" variant="white" onClick={resetAll}>
            <RotateCcw className="size-3.5" />
            Reset
          </DuoButton>
          <DuoButton size="sm" variant="green" onClick={handleSave}>
            {saved ? <Check className="size-3.5" /> : null}
            {saved ? "Saved" : "Save"}
          </DuoButton>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[180px_1fr]">
        <nav className="flex gap-1 overflow-x-auto pb-1 md:flex-col md:overflow-visible md:pb-0">
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveSection(s.id)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-2 text-left text-[10px] font-bold transition md:w-full md:text-xs",
                activeSection === s.id
                  ? "bg-[oklch(0.95_0.08_145)] text-duo-green-dark"
                  : "text-muted-foreground hover:bg-muted",
              )}
            >
              <s.icon className="size-3.5 shrink-0" />
              {s.label}
            </button>
          ))}
        </nav>

        <DuoCard className="p-4">
          {activeSection === "study" && (
            <div>
              <h2 className="mb-3 font-display text-sm font-bold">Focus mode</h2>
              <SettingRow
                label="Hide social feed during study"
                description="Class Feed is hidden while focus mode is on"
              >
                <Switch
                  checked={settings.studyEnvironment.hideSocialFeedDuringStudy}
                  onCheckedChange={(v) =>
                    patch("studyEnvironment", { hideSocialFeedDuringStudy: v })
                  }
                />
              </SettingRow>
              <SettingRow
                label="Auto-enable pomodoro"
                description="Start the timer when you enter a study room"
              >
                <Switch
                  checked={settings.studyEnvironment.autoEnablePomodoro}
                  onCheckedChange={(v) => patch("studyEnvironment", { autoEnablePomodoro: v })}
                />
              </SettingRow>
              <SettingRow
                label="Mute non-academic notifications"
                description="Only deadlines, attendance, and teacher messages"
              >
                <Switch
                  checked={settings.studyEnvironment.muteNonAcademicNotifications}
                  onCheckedChange={(v) =>
                    patch("studyEnvironment", { muteNonAcademicNotifications: v })
                  }
                />
              </SettingRow>
            </div>
          )}

          {activeSection === "identity" && (
            <div className="space-y-4">
              <div>
                <h2 className="mb-2 font-display text-sm font-bold">Avatar</h2>
                <div className="flex flex-wrap gap-2">
                  {AVATAR_OPTIONS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => patch("identity", { avatar: a })}
                      className={cn(
                        "grid size-11 place-items-center rounded-full text-2xl ring-2 transition",
                        settings.identity.avatar === a
                          ? "ring-duo-green bg-[oklch(0.95_0.08_145)]"
                          : "ring-transparent bg-muted hover:ring-border",
                      )}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="mb-2 font-display text-sm font-bold">Profile theme</h2>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      { id: "green", label: "Forest", color: "bg-[var(--duo-green)]" },
                      { id: "blue", label: "Sky", color: "bg-[var(--duo-blue)]" },
                      { id: "purple", label: "Grape", color: "bg-[var(--duo-purple)]" },
                      { id: "sunset", label: "Sunset", color: "bg-[var(--duo-orange)]" },
                      { id: "ocean", label: "Ocean", color: "bg-[oklch(0.6_0.14_200)]" },
                    ] as const
                  ).map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => patch("identity", { profileTheme: t.id as ProfileTheme })}
                      className={cn(
                        "flex items-center gap-1.5 rounded-lg border-2 px-2 py-1 text-[10px] font-bold",
                        settings.identity.profileTheme === t.id
                          ? "border-foreground"
                          : "border-transparent",
                      )}
                    >
                      <span className={cn("size-4 rounded-full", t.color)} />
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
              <SettingRow label="Show badges on profile">
                <Switch
                  checked={settings.identity.showBadges}
                  onCheckedChange={(v) => patch("identity", { showBadges: v })}
                />
              </SettingRow>
              <SettingRow label="Show achievement showcase">
                <Switch
                  checked={settings.identity.showAchievementShowcase}
                  onCheckedChange={(v) => patch("identity", { showAchievementShowcase: v })}
                />
              </SettingRow>
              <div>
                <h2 className="mb-2 font-display text-sm font-bold">Favorite subjects</h2>
                <ChipSelect
                  options={SUBJECT_OPTIONS}
                  selected={settings.identity.favoriteSubjects}
                  onChange={toggleSubject}
                  multi
                />
              </div>
              <div>
                <h2 className="mb-2 font-display text-sm font-bold">Study identity</h2>
                <ChipSelect
                  options={STUDY_IDENTITIES}
                  selected={settings.identity.studyIdentity}
                  onChange={(v) => patch("identity", { studyIdentity: v })}
                />
              </div>
            </div>
          )}

          {activeSection === "learning" && (
            <div>
              <h2 className="mb-3 font-display text-sm font-bold">Preferred learning style</h2>
              <RadioGroup
                value={settings.learning.preferredStyle}
                onValueChange={(v) => patch("learning", { preferredStyle: v as LearningStyle })}
                className="gap-3"
              >
                {[
                  {
                    value: "visual",
                    label: "Visual",
                    desc: "Diagrams, charts, and illustrated notes",
                  },
                  { value: "quiz", label: "Quiz-first", desc: "Learn by answering questions" },
                  { value: "practice", label: "Practice-heavy", desc: "Worksheets and repetition" },
                  { value: "video", label: "Video-first", desc: "Watch, then explain back" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className="flex cursor-pointer items-start gap-2 rounded-lg border border-border/60 p-2.5 has-data-[state=checked]:border-duo-green has-data-[state=checked]:bg-[oklch(0.97_0.06_145)]"
                  >
                    <RadioGroupItem value={opt.value} className="mt-0.5" />
                    <div>
                      <p className="text-xs font-bold">{opt.label}</p>
                      <p className="text-[10px] text-muted-foreground">{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </RadioGroup>
            </div>
          )}

          {activeSection === "goals" && (
            <div className="space-y-3">
              <h2 className="font-display text-sm font-bold">Goals & ambition</h2>
              <div>
                <Label className="text-[10px] font-bold uppercase text-muted-foreground">
                  Target grade
                </Label>
                <Input
                  value={settings.goals.targetGrade}
                  onChange={(e) => patch("goals", { targetGrade: e.target.value })}
                  className="mt-1 h-9 text-sm font-bold"
                  placeholder="e.g. A"
                />
              </div>
              <div>
                <Label className="text-[10px] font-bold uppercase text-muted-foreground">
                  Exam goal
                </Label>
                <Input
                  value={settings.goals.examGoal}
                  onChange={(e) => patch("goals", { examGoal: e.target.value })}
                  className="mt-1 h-9 text-sm"
                  placeholder="What do you want to achieve?"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-[10px] font-bold uppercase text-muted-foreground">
                    Daily study (min)
                  </Label>
                  <Input
                    type="number"
                    min={5}
                    max={180}
                    value={settings.goals.dailyStudyMinutes}
                    onChange={(e) =>
                      patch("goals", { dailyStudyMinutes: Number(e.target.value) || 30 })
                    }
                    className="mt-1 h-9 font-numeric text-sm font-bold"
                  />
                </div>
                <div>
                  <Label className="text-[10px] font-bold uppercase text-muted-foreground">
                    Streak goal (days)
                  </Label>
                  <Input
                    type="number"
                    min={1}
                    max={365}
                    value={settings.goals.streakGoalDays}
                    onChange={(e) =>
                      patch("goals", { streakGoalDays: Number(e.target.value) || 7 })
                    }
                    className="mt-1 h-9 font-numeric text-sm font-bold"
                  />
                </div>
              </div>
              <SettingRow
                label="Competitive goals"
                description="Show class comparison and growth targets"
              >
                <Switch
                  checked={settings.goals.competitiveGoalEnabled}
                  onCheckedChange={(v) => patch("goals", { competitiveGoalEnabled: v })}
                />
              </SettingRow>
            </div>
          )}

          {activeSection === "privacy" && (
            <div>
              <h2 className="mb-3 font-display text-sm font-bold">Privacy & social visibility</h2>
              <SettingRow label="Show on leaderboard">
                <Switch
                  checked={settings.privacy.leaderboardVisible}
                  onCheckedChange={(v) => patch("privacy", { leaderboardVisible: v })}
                />
              </SettingRow>
              <SettingRow label="Visible in study room">
                <Switch
                  checked={settings.privacy.studyRoomVisible}
                  onCheckedChange={(v) => patch("privacy", { studyRoomVisible: v })}
                />
              </SettingRow>
              <SettingRow label="Show online status">
                <Switch
                  checked={settings.privacy.showOnlineStatus}
                  onCheckedChange={(v) => patch("privacy", { showOnlineStatus: v })}
                />
              </SettingRow>
              <SettingRow
                label="Camera on by default"
                description="When joining virtual study hall"
              >
                <Switch
                  checked={settings.privacy.cameraDefaultOn}
                  onCheckedChange={(v) => patch("privacy", { cameraDefaultOn: v })}
                />
              </SettingRow>
              <SettingRow
                label="Public profile"
                description="Classmates can view your portfolio highlights"
              >
                <Switch
                  checked={settings.privacy.profilePublic}
                  onCheckedChange={(v) => patch("privacy", { profilePublic: v })}
                />
              </SettingRow>
            </div>
          )}

          {activeSection === "notifications" && (
            <div>
              <h2 className="mb-3 font-display text-sm font-bold">Notify me when</h2>
              <SettingRow label="Deadlines are high risk">
                <Switch
                  checked={settings.notifications.highRiskDeadlines}
                  onCheckedChange={(v) => patch("notifications", { highRiskDeadlines: v })}
                />
              </SettingRow>
              <SettingRow label="Friends start a study room">
                <Switch
                  checked={settings.notifications.friendsStudyRoom}
                  onCheckedChange={(v) => patch("notifications", { friendsStudyRoom: v })}
                />
              </SettingRow>
              <SettingRow label="Teacher replies to my doubt">
                <Switch
                  checked={settings.notifications.teacherReplies}
                  onCheckedChange={(v) => patch("notifications", { teacherReplies: v })}
                />
              </SettingRow>
              <SettingRow label="Attendance becomes unsafe">
                <Switch
                  checked={settings.notifications.attendanceRisk}
                  onCheckedChange={(v) => patch("notifications", { attendanceRisk: v })}
                />
              </SettingRow>
            </div>
          )}

          {activeSection === "ai" && (
            <div>
              <h2 className="mb-3 font-display text-sm font-bold">AI mentor style</h2>
              <RadioGroup
                value={settings.aiMentor.style}
                onValueChange={(v) => patch("aiMentor", { style: v as AiMentorStyle })}
                className="gap-2"
              >
                {[
                  {
                    value: "strict",
                    label: "Strict Coach",
                    desc: "Direct feedback, high standards",
                  },
                  { value: "friendly", label: "Friendly Mentor", desc: "Encouraging and patient" },
                  {
                    value: "competitive",
                    label: "Competitive Trainer",
                    desc: "Push harder, compare progress",
                  },
                  { value: "calm", label: "Calm Explainer", desc: "Step-by-step, low pressure" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className="flex cursor-pointer items-start gap-2 rounded-lg border border-border/60 p-2.5 has-data-[state=checked]:border-duo-purple has-data-[state=checked]:bg-[oklch(0.97_0.04_295)]"
                  >
                    <RadioGroupItem value={opt.value} className="mt-0.5" />
                    <div>
                      <p className="text-xs font-bold">{opt.label}</p>
                      <p className="text-[10px] text-muted-foreground">{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </RadioGroup>
            </div>
          )}

          {activeSection === "accessibility" && (
            <div>
              <h2 className="mb-3 font-display text-sm font-bold">Accessibility</h2>
              <SettingRow
                label="Dyslexia-friendly mode"
                description="Spaced text and readable font"
              >
                <Switch
                  checked={settings.accessibility.dyslexiaMode}
                  onCheckedChange={(v) => patch("accessibility", { dyslexiaMode: v })}
                />
              </SettingRow>
              <SettingRow label="Larger text">
                <Switch
                  checked={settings.accessibility.largerText}
                  onCheckedChange={(v) => patch("accessibility", { largerText: v })}
                />
              </SettingRow>
              <SettingRow label="Reduced animation">
                <Switch
                  checked={settings.accessibility.reducedAnimation}
                  onCheckedChange={(v) => patch("accessibility", { reducedAnimation: v })}
                />
              </SettingRow>
              <SettingRow label="Reading assistance" description="Highlight and read aloud support">
                <Switch
                  checked={settings.accessibility.readingAssistance}
                  onCheckedChange={(v) => patch("accessibility", { readingAssistance: v })}
                />
              </SettingRow>
              <div className="pt-2">
                <Label className="text-[10px] font-bold uppercase text-muted-foreground">
                  Language preference
                </Label>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {[
                    { id: "en", label: "English" },
                    { id: "ms", label: "Bahasa Melayu" },
                    { id: "zh", label: "中文" },
                  ].map((lang) => (
                    <button
                      key={lang.id}
                      type="button"
                      onClick={() =>
                        patch("accessibility", {
                          language: lang.id as StudentSettings["accessibility"]["language"],
                        })
                      }
                      className={cn(
                        "rounded-full px-3 py-1 text-[10px] font-bold",
                        settings.accessibility.language === lang.id
                          ? "bg-duo-green text-white"
                          : "bg-muted",
                      )}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DuoCard>
      </div>
    </div>
  );
}
