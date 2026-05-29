export type LearningStyle = "visual" | "quiz" | "practice" | "video";
export type AiMentorStyle = "strict" | "friendly" | "competitive" | "calm";
export type ProfileTheme = "green" | "blue" | "purple" | "sunset" | "ocean";
export type LanguagePreference = "en" | "ms" | "zh";

export type StudentSettings = {
  studyEnvironment: {
    hideSocialFeedDuringStudy: boolean;
    autoEnablePomodoro: boolean;
    muteNonAcademicNotifications: boolean;
  };
  identity: {
    avatar: string;
    profileTheme: ProfileTheme;
    showBadges: boolean;
    favoriteSubjects: string[];
    studyIdentity: string;
    showAchievementShowcase: boolean;
  };
  learning: {
    preferredStyle: LearningStyle;
  };
  goals: {
    targetGrade: string;
    examGoal: string;
    dailyStudyMinutes: number;
    streakGoalDays: number;
    competitiveGoalEnabled: boolean;
  };
  privacy: {
    leaderboardVisible: boolean;
    studyRoomVisible: boolean;
    showOnlineStatus: boolean;
    cameraDefaultOn: boolean;
    profilePublic: boolean;
  };
  notifications: {
    highRiskDeadlines: boolean;
    friendsStudyRoom: boolean;
    teacherReplies: boolean;
    attendanceRisk: boolean;
  };
  aiMentor: {
    style: AiMentorStyle;
  };
  accessibility: {
    dyslexiaMode: boolean;
    largerText: boolean;
    reducedAnimation: boolean;
    language: LanguagePreference;
    readingAssistance: boolean;
  };
};

export const DEFAULT_STUDENT_SETTINGS: StudentSettings = {
  studyEnvironment: {
    hideSocialFeedDuringStudy: false,
    autoEnablePomodoro: true,
    muteNonAcademicNotifications: false,
  },
  identity: {
    avatar: "🦕",
    profileTheme: "green",
    showBadges: true,
    favoriteSubjects: ["Mathematics", "Science"],
    studyIdentity: "Focused Learner",
    showAchievementShowcase: true,
  },
  learning: {
    preferredStyle: "video",
  },
  goals: {
    targetGrade: "A",
    examGoal: "Score 80%+ on mid-year exams",
    dailyStudyMinutes: 45,
    streakGoalDays: 7,
    competitiveGoalEnabled: true,
  },
  privacy: {
    leaderboardVisible: true,
    studyRoomVisible: true,
    showOnlineStatus: true,
    cameraDefaultOn: true,
    profilePublic: true,
  },
  notifications: {
    highRiskDeadlines: true,
    friendsStudyRoom: true,
    teacherReplies: true,
    attendanceRisk: true,
  },
  aiMentor: {
    style: "friendly",
  },
  accessibility: {
    dyslexiaMode: false,
    largerText: false,
    reducedAnimation: false,
    language: "en",
    readingAssistance: false,
  },
};

const STORAGE_KEY = "student_settings";

function mergeSettings(parsed: Partial<StudentSettings>): StudentSettings {
  return {
    studyEnvironment: { ...DEFAULT_STUDENT_SETTINGS.studyEnvironment, ...parsed.studyEnvironment },
    identity: { ...DEFAULT_STUDENT_SETTINGS.identity, ...parsed.identity },
    learning: { ...DEFAULT_STUDENT_SETTINGS.learning, ...parsed.learning },
    goals: { ...DEFAULT_STUDENT_SETTINGS.goals, ...parsed.goals },
    privacy: { ...DEFAULT_STUDENT_SETTINGS.privacy, ...parsed.privacy },
    notifications: { ...DEFAULT_STUDENT_SETTINGS.notifications, ...parsed.notifications },
    aiMentor: { ...DEFAULT_STUDENT_SETTINGS.aiMentor, ...parsed.aiMentor },
    accessibility: { ...DEFAULT_STUDENT_SETTINGS.accessibility, ...parsed.accessibility },
  };
}

export function loadStudentSettings(): StudentSettings {
  if (typeof window === "undefined") return DEFAULT_STUDENT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STUDENT_SETTINGS;
    return mergeSettings(JSON.parse(raw));
  } catch {
    return DEFAULT_STUDENT_SETTINGS;
  }
}

const SETTINGS_DATASET_KEYS = [
  "profileTheme",
  "dyslexiaMode",
  "largeText",
  "reducedMotion",
  "langPreference",
  "readingAssist",
  "focusMode",
] as const;

type SettingsDatasetKey = (typeof SETTINGS_DATASET_KEYS)[number];

export function captureStudentSettingsDom(): Record<SettingsDatasetKey, string | undefined> {
  if (typeof document === "undefined") {
    return Object.fromEntries(SETTINGS_DATASET_KEYS.map((k) => [k, undefined])) as Record<
      SettingsDatasetKey,
      string | undefined
    >;
  }
  const root = document.documentElement;
  return Object.fromEntries(SETTINGS_DATASET_KEYS.map((k) => [k, root.dataset[k]])) as Record<
    SettingsDatasetKey,
    string | undefined
  >;
}

export function restoreStudentSettingsDom(
  previous: Record<SettingsDatasetKey, string | undefined>,
) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  for (const key of SETTINGS_DATASET_KEYS) {
    const val = previous[key];
    if (val === undefined) {
      delete root.dataset[key];
    } else {
      root.dataset[key] = val;
    }
  }
}

export function saveStudentSettings(settings: StudentSettings) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }
  applyStudentSettings(settings);
}

export function applyStudentSettings(settings: StudentSettings) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.dataset.profileTheme = settings.identity.profileTheme;
  root.dataset.dyslexiaMode = settings.accessibility.dyslexiaMode ? "true" : "false";
  root.dataset.largeText = settings.accessibility.largerText ? "true" : "false";
  root.dataset.reducedMotion = settings.accessibility.reducedAnimation ? "true" : "false";
  root.dataset.langPreference = settings.accessibility.language;
  root.dataset.readingAssist = settings.accessibility.readingAssistance ? "true" : "false";
  root.dataset.focusMode = settings.studyEnvironment.hideSocialFeedDuringStudy ? "true" : "false";
}

export const AVATAR_OPTIONS = ["🦕", "🦖", "🐢", "🦊", "🐼", "🦁", "🐯", "🐨", "🦉", "⭐"];
export const SUBJECT_OPTIONS = [
  "Mathematics",
  "Science",
  "English",
  "Bahasa Melayu",
  "Art",
  "History",
];
export const STUDY_IDENTITIES = [
  "Focused Learner",
  "Curious Explorer",
  "Streak Champion",
  "Team Player",
  "Quiet Achiever",
  "Rising Star",
];
