// Shared mock data for the school portal prototype
export const CHILDREN = [
  {
    id: "ali",
    name: "Ali Rahman",
    className: "Class 5A",
    avatar: "👦",
    color: "duo-blue",
    points: 320,
    level: 4,
    streak: 5,
  },
  {
    id: "alya",
    name: "Alya Rahman",
    className: "Class 2B",
    avatar: "👧",
    color: "duo-pink",
    points: 210,
    level: 3,
    streak: 2,
  },
  {
    id: "sara",
    name: "Sara Rahman",
    className: "Class 1A",
    avatar: "🧒",
    color: "duo-orange",
    points: 140,
    level: 2,
    streak: 7,
  },
];

export const CLASSES = [
  { id: "5a", name: "Primary 5A", students: 24, attendance: 92 },
  { id: "5b", name: "Primary 5B", students: 25, attendance: 90 },
  { id: "4a", name: "Primary 4A", students: 23, attendance: 94 },
];

export const SCHEDULE = [
  {
    time: "8:00 - 9:00 AM",
    subject: "Science",
    topic: "Chapter 3: Plants",
    room: "Science Lab",
    color: "duo-green",
  },
  {
    time: "9:00 - 10:00 AM",
    subject: "Mathematics",
    topic: "Fractions",
    room: "Room 12",
    color: "duo-blue",
  },
  {
    time: "10:30 - 11:30 AM",
    subject: "English",
    topic: "Reading Comprehension",
    room: "Room 8",
    color: "duo-purple",
  },
  {
    time: "12:00 - 1:00 PM",
    subject: "Lunch Break",
    topic: "",
    room: "Cafeteria",
    color: "duo-yellow",
  },
  {
    time: "2:00 - 3:00 PM",
    subject: "Art & Craft",
    topic: "Paper Mache Project",
    room: "Art Room",
    color: "duo-pink",
  },
];

export const ASSIGNMENTS = [
  {
    id: "a1",
    title: "Math Worksheet",
    subject: "Math",
    due: "Today 2:00 PM",
    status: "pending",
    icon: "🧮",
    points: 20,
  },
  {
    id: "a2",
    title: "Science Project",
    subject: "Science",
    due: "Tomorrow",
    status: "in-progress",
    icon: "🔬",
    points: 50,
  },
  {
    id: "a3",
    title: "English Reading",
    subject: "English",
    due: "3 days",
    status: "pending",
    icon: "📖",
    points: 15,
  },
  {
    id: "a4",
    title: "Art Sketch",
    subject: "Art",
    due: "Next week",
    status: "submitted",
    icon: "🎨",
    points: 25,
  },
];

export const BADGES = [
  { id: "b1", name: "Hard Worker", icon: "📚", color: "duo-purple", earned: true },
  { id: "b2", name: "Team Player", icon: "🤝", color: "duo-green", earned: true },
  { id: "b3", name: "Positive Attitude", icon: "☀️", color: "duo-yellow", earned: true },
  { id: "b4", name: "Quick Learner", icon: "⚡", color: "duo-blue", earned: false },
  { id: "b5", name: "Helping Hand", icon: "💝", color: "duo-pink", earned: false },
  { id: "b6", name: "Streak Hero", icon: "🔥", color: "duo-orange", earned: false },
];

export type StudentActivity = {
  id: string;
  title: string;
  description: string;
  type: "quest" | "game" | "event" | "challenge";
  icon: string;
  points: number;
  status: "available" | "in-progress" | "completed";
  due?: string;
};

export const STUDENT_ACTIVITIES: StudentActivity[] = [
  {
    id: "act1",
    title: "Math Speed Round",
    description: "Answer 10 fraction questions in 5 minutes.",
    type: "game",
    icon: "🎮",
    points: 25,
    status: "available",
  },
  {
    id: "act2",
    title: "Science Quiz Battle",
    description: "Challenge a classmate on plant biology.",
    type: "challenge",
    icon: "⚔️",
    points: 40,
    status: "in-progress",
  },
  {
    id: "act3",
    title: "Reading Streak Quest",
    description: "Read for 15 minutes today to keep your streak.",
    type: "quest",
    icon: "📖",
    points: 15,
    status: "available",
    due: "Today",
  },
  {
    id: "act4",
    title: "Sports Day Prep",
    description: "Join the house cheer practice this Friday.",
    type: "event",
    icon: "🏆",
    points: 30,
    status: "available",
    due: "Fri 24 May",
  },
  {
    id: "act5",
    title: "Vocabulary Match",
    description: "Match BM words to pictures — level 3.",
    type: "game",
    icon: "🧩",
    points: 20,
    status: "completed",
  },
  {
    id: "act6",
    title: "Eco Club Poster",
    description: "Design a recycle poster for Earth Week.",
    type: "quest",
    icon: "🌱",
    points: 50,
    status: "available",
    due: "Next week",
  },
];

export type ClassFeedPostType = "speaking" | "book-challenge" | "teacher" | "peer";

export type ClassFeedPost = {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorHandle: string;
  type: ClassFeedPostType;
  caption: string;
  mediaUrl: string;
  mediaKind: "video" | "image";
  bookRef?: string;
  challengePrompt?: string;
  skillTag: string;
  likes: number;
  comments: number;
  timeAgo: string;
  liked?: boolean;
  isTeacher?: boolean;
};

export type ClassFeedStory = {
  id: string;
  label: string;
  icon: string;
  ringColor: string;
};

export const CLASS_FEED_STORIES: ClassFeedStory[] = [
  { id: "s1", label: "Your turn", icon: "🦕", ringColor: "var(--duo-green)" },
  { id: "s2", label: "Speak up", icon: "🎤", ringColor: "var(--duo-purple)" },
  { id: "s3", label: "Math Ch.4", icon: "🧮", ringColor: "var(--duo-blue)" },
  { id: "s4", label: "Science", icon: "🔬", ringColor: "var(--duo-green)" },
  { id: "s5", label: "BM Essay", icon: "✍️", ringColor: "var(--duo-orange)" },
];

export const CLASS_FEED_POSTS: ClassFeedPost[] = [
  {
    id: "p1",
    authorName: "Cikgu Nadia",
    authorAvatar: "👩‍🏫",
    authorHandle: "cikgu_nadia",
    type: "teacher",
    caption:
      "📚 Textbook Challenge — Math Ch.4 p.42: Explain how to add fractions with different denominators in under 60 seconds. Record yourself teaching a friend!",
    bookRef: "Mathematics Year 5 · p.42",
    challengePrompt: "Add fractions with unlike denominators",
    skillTag: "Public speaking",
    mediaUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=600&fit=crop&q=80",
    mediaKind: "image",
    likes: 124,
    comments: 38,
    timeAgo: "2h",
    isTeacher: true,
  },
  {
    id: "p2",
    authorName: "Sara Lim",
    authorAvatar: "👧🏼",
    authorHandle: "sara_5a",
    type: "speaking",
    caption:
      "Day 3 of my speaking streak! 🎤 I practised eye contact and slowing down for the fraction problem from our textbook.",
    bookRef: "Math · Fractions",
    skillTag: "Communication",
    mediaUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=750&fit=crop&q=80",
    mediaKind: "video",
    likes: 89,
    comments: 12,
    timeAgo: "4h",
    liked: true,
  },
  {
    id: "p3",
    authorName: "Cikgu Mei",
    authorAvatar: "👩‍🎨",
    authorHandle: "cikgu_mei_science",
    type: "book-challenge",
    caption:
      "🔬 Science Discoveries p.18 — Film a 45-sec video naming parts of a plant cell while pointing at your diagram. Best clarity wins +50 pts!",
    bookRef: "Science Discoveries · p.18",
    challengePrompt: "Label plant cell parts on camera",
    skillTag: "Presentation",
    mediaUrl:
      "https://images.unsplash.com/photo-1532094349883-543bc11b234d?w=600&h=600&fit=crop&q=80",
    mediaKind: "image",
    likes: 201,
    comments: 56,
    timeAgo: "Yesterday",
    isTeacher: true,
  },
  {
    id: "p4",
    authorName: "Ali Hassan",
    authorAvatar: "👦🏽",
    authorHandle: "ali_hassan",
    type: "peer",
    caption:
      "Solved the word problem from English Reader p.7 — here's my spoken summary. Feedback welcome! 💬",
    bookRef: "English Reader · p.7",
    skillTag: "Problem solving",
    mediaUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=750&fit=crop&q=80",
    mediaKind: "video",
    likes: 45,
    comments: 9,
    timeAgo: "Yesterday",
  },
  {
    id: "p5",
    authorName: "Zara Nair",
    authorAvatar: "👧🏽",
    authorHandle: "zara_n",
    type: "speaking",
    caption: "Practising BM karangan intro phrases from p.55 — rate my confidence 1-10? ✍️",
    bookRef: "Bahasa Melayu · p.55",
    skillTag: "Public speaking",
    mediaUrl:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=750&fit=crop&q=80",
    mediaKind: "video",
    likes: 67,
    comments: 24,
    timeAgo: "2d",
  },
];

export const RECENT_ACTIVITY = [
  {
    id: 1,
    type: "praise",
    text: "Cikgu Nadia gave you +10 for Great Participation!",
    time: "9:15 AM",
    icon: "⭐",
  },
  {
    id: 2,
    type: "love",
    text: "Your parents loved your photo update",
    time: "Yesterday",
    icon: "❤️",
  },
  {
    id: 3,
    type: "comment",
    text: 'Cikgu Nadia commented "Great effort, Aisyah!"',
    time: "Yesterday",
    icon: "💬",
  },
  { id: 4, type: "submission", text: "You submitted Math Worksheet", time: "Mon", icon: "✅" },
];

export const STUDENTS_IN_CLASS = [
  {
    id: "s1",
    name: "Aisha Rahman",
    attendance: 95,
    grade: "A",
    behavior: "high",
    overall: "Excellent",
    avatar: "👧🏻",
  },
  {
    id: "s2",
    name: "Ali Hassan",
    attendance: 88,
    grade: "B+",
    behavior: "medium",
    overall: "Good",
    avatar: "👦🏽",
  },
  {
    id: "s3",
    name: "Sara Lim",
    attendance: 92,
    grade: "A-",
    behavior: "high",
    overall: "Excellent",
    avatar: "👧🏼",
  },
  {
    id: "s4",
    name: "Danish Kumar",
    attendance: 78,
    grade: "C+",
    behavior: "low",
    overall: "Needs Improvement",
    avatar: "👦🏾",
  },
  {
    id: "s5",
    name: "Zara Nair",
    attendance: 96,
    grade: "A",
    behavior: "high",
    overall: "Excellent",
    avatar: "👧🏽",
  },
];

export const UPCOMING = [
  { id: "u1", title: "Sports Day", date: "24 May", day: "Friday", icon: "🏆", color: "duo-orange" },
  {
    id: "u2",
    title: "Parent-Teacher Meeting",
    date: "31 May",
    day: "Friday",
    icon: "👨‍👩‍👧",
    color: "duo-purple",
  },
  {
    id: "u3",
    title: "School Holiday",
    date: "3 - 5 June",
    day: "Mon-Wed",
    icon: "🌴",
    color: "duo-yellow",
  },
];

export const TODAYS_CLASSES = [
  {
    id: "tc1",
    subject: "Mathematics",
    topic: "Fractions & Decimals",
    time: "8:00 AM",
    endTime: "9:00 AM",
    room: "Room 12",
    icon: "🧮",
    color: "duo-blue",
    status: "completed" as const,
  },
  {
    id: "tc2",
    subject: "Science",
    topic: "Chapter 3: Plants",
    time: "9:15 AM",
    endTime: "10:15 AM",
    room: "Science Lab",
    icon: "🔬",
    color: "duo-green",
    status: "completed" as const,
  },
  {
    id: "tc3",
    subject: "English",
    topic: "Reading Comprehension",
    time: "10:30 AM",
    endTime: "11:30 AM",
    room: "Room 8",
    icon: "📖",
    color: "duo-purple",
    status: "now" as const,
  },
  {
    id: "tc4",
    subject: "Bahasa Melayu",
    topic: "Karangan Practice",
    time: "1:00 PM",
    endTime: "2:00 PM",
    room: "Room 5",
    icon: "✍️",
    color: "duo-orange",
    status: "upcoming" as const,
  },
  {
    id: "tc5",
    subject: "Art & Craft",
    topic: "Paper Mache Project",
    time: "2:15 PM",
    endTime: "3:15 PM",
    room: "Art Room",
    icon: "🎨",
    color: "duo-pink",
    status: "upcoming" as const,
  },
];

export const ASSIGNMENT_DEADLINES = [
  {
    id: "a1",
    title: "Math Worksheet",
    subject: "Math",
    dueLabel: "Today, 2:00 PM",
    deadline: "2026-05-29T14:00",
    urgency: "high" as const,
    icon: "🧮",
  },
  {
    id: "a2",
    title: "Science Project",
    subject: "Science",
    dueLabel: "Tomorrow, 9:00 AM",
    deadline: "2026-05-30T09:00",
    urgency: "medium" as const,
    icon: "🔬",
  },
  {
    id: "a3",
    title: "English Reading",
    subject: "English",
    dueLabel: "Jun 1, 3:00 PM",
    deadline: "2026-06-01T15:00",
    urgency: "low" as const,
    icon: "📖",
  },
  {
    id: "a5",
    title: "BM Essay Draft",
    subject: "Bahasa Melayu",
    dueLabel: "Jun 3, 10:00 AM",
    deadline: "2026-06-03T10:00",
    urgency: "low" as const,
    icon: "✍️",
  },
];

export const ATTENDANCE_CALENDAR = {
  month: "May 2026",
  percentage: 82,
  required: 85,
  daysPresent: 18,
  daysAbsent: 2,
  daysLate: 1,
  riskLevel: "medium" as const,
  /** May 2026 — day 1 = Friday */
  days: [
    { date: 1, status: "present" as const },
    { date: 2, status: "present" as const },
    { date: 3, status: "weekend" as const },
    { date: 4, status: "weekend" as const },
    { date: 5, status: "present" as const },
    { date: 6, status: "present" as const },
    { date: 7, status: "late" as const },
    { date: 8, status: "present" as const },
    { date: 9, status: "absent" as const },
    { date: 10, status: "weekend" as const },
    { date: 11, status: "weekend" as const },
    { date: 12, status: "present" as const },
    { date: 13, status: "present" as const },
    { date: 14, status: "present" as const },
    { date: 15, status: "present" as const },
    { date: 16, status: "absent" as const },
    { date: 17, status: "weekend" as const },
    { date: 18, status: "weekend" as const },
    { date: 19, status: "present" as const },
    { date: 20, status: "present" as const },
    { date: 21, status: "present" as const },
    { date: 22, status: "present" as const },
    { date: 23, status: "present" as const },
    { date: 24, status: "present" as const },
    { date: 25, status: "weekend" as const },
    { date: 26, status: "weekend" as const },
    { date: 27, status: "present" as const },
    { date: 28, status: "present" as const },
    { date: 29, status: "today" as const },
    { date: 30, status: "future" as const },
    { date: 31, status: "future" as const },
  ],
};

export const CLASS_LEADERBOARD = [
  {
    id: "zara",
    name: "Zara Nair",
    avatar: "👧🏽",
    weeklyPoints: 98,
    allTimePoints: 452,
    trend: "up" as const,
  },
  {
    id: "sara",
    name: "Sara Lim",
    avatar: "👧🏼",
    weeklyPoints: 72,
    allTimePoints: 410,
    trend: "up" as const,
  },
  {
    id: "ali",
    name: "Ali Hassan",
    avatar: "👦🏽",
    weeklyPoints: 65,
    allTimePoints: 380,
    trend: "down" as const,
  },
  {
    id: "aisyah",
    name: "Aisyah",
    avatar: "🦕",
    weeklyPoints: 0,
    allTimePoints: 0,
    isCurrentUser: true,
    trend: "up" as const,
  },
  {
    id: "danish",
    name: "Danish Kumar",
    avatar: "👦🏾",
    weeklyPoints: 48,
    allTimePoints: 295,
    trend: "down" as const,
  },
  {
    id: "aisha",
    name: "Aisha Rahman",
    avatar: "👧🏻",
    weeklyPoints: 41,
    allTimePoints: 270,
    trend: "same" as const,
  },
];

export type RecommendedAction = {
  id: string;
  title: string;
  description: string;
  reason: string;
  icon: string;
};

export const EXAM_PREPAREDNESS = [
  {
    id: "e1",
    subject: "Mathematics",
    examName: "Mid-Year Math",
    examDate: "Jun 5",
    daysLeft: 7,
    score: 68,
    icon: "🧮",
    color: "duo-blue",
  },
  {
    id: "e2",
    subject: "Science",
    examName: "Science Unit Test",
    examDate: "Jun 8",
    daysLeft: 10,
    score: 85,
    icon: "🔬",
    color: "duo-green",
  },
  {
    id: "e3",
    subject: "English",
    examName: "English Comprehension",
    examDate: "Jun 12",
    daysLeft: 14,
    score: 74,
    icon: "📖",
    color: "duo-purple",
  },
  {
    id: "e4",
    subject: "Bahasa Melayu",
    examName: "BM Written Exam",
    examDate: "Jun 15",
    daysLeft: 17,
    score: 55,
    icon: "✍️",
    color: "duo-orange",
  },
];

export type SubjectExamResult = {
  id: string;
  subject: string;
  icon: string;
  score: number;
  previousScore: number;
  strengths: string[];
  needsPractice: string[];
  mentorNote: string;
  accent: "blue" | "green" | "purple" | "orange";
};

export const EXAM_RESULTS_REPORT = {
  headline: "You did well overall",
  headlineEmoji: "🎉",
  strongestSubject: "Science",
  needsPracticeSubject: "Mathematics",
  improvementSinceLast: 8,
  classStanding: "Top 20%",
  encouragement: "You understand concepts well. Now focus on reducing calculation mistakes.",
  growthVsPeers: 76,
  studyStreakWeeks: 4,
  consistencyLabel: "Steady progress",
  finalBoardReadiness: 78,
  predictedGrade: "A-",
  predictedNote: "If current pace continues",
  strengthsOverall: ["Creative writing", "Scientific reasoning", "Diagram labeling"],
  weaknessRadar: ["Chemical equations", "Plant cell labeling"],
  nextSteps: ["Practice geometry diagrams", "Revise fractions", "Attempt 2 timed quizzes"],
  recoveryPlan: {
    subject: "Mathematics",
    items: ["15 mins daily practice", "Focus on geometry", "Complete revision set 3"],
  },
  teacherNotes: [
    "Excellent participation",
    "Improve answer presentation",
    "Revise theorem steps carefully",
  ],
  subjects: [
    {
      id: "math",
      subject: "MATHEMATICS",
      icon: "🧮",
      score: 72,
      previousScore: 60,
      strengths: ["Algebra", "Multiplication"],
      needsPractice: ["Word Problems", "Geometry"],
      mentorNote: "You understand concepts well. Now focus on reducing calculation mistakes.",
      accent: "blue" as const,
    },
    {
      id: "science",
      subject: "SCIENCE",
      icon: "🔬",
      score: 88,
      previousScore: 82,
      strengths: ["Scientific reasoning", "Diagram labeling", "Experiment analysis"],
      needsPractice: ["Chemical equations", "Plant cell labeling"],
      mentorNote: "Your strongest area — keep using diagrams to explain your thinking.",
      accent: "green" as const,
    },
    {
      id: "english",
      subject: "ENGLISH",
      icon: "📖",
      score: 76,
      previousScore: 74,
      strengths: ["Creative writing", "Comprehension"],
      needsPractice: ["Grammar in long answers", "Timed summaries"],
      mentorNote: "Strong ideas — polish structure and check tense consistency.",
      accent: "purple" as const,
    },
    {
      id: "bm",
      subject: "BAHASA MELAYU",
      icon: "✍️",
      score: 68,
      previousScore: 65,
      strengths: ["Karangan openings", "Vocabulary"],
      needsPractice: ["Formal letter format", "Idiom usage"],
      mentorNote: "Good effort — practise one karangan outline per week.",
      accent: "orange" as const,
    },
  ] satisfies SubjectExamResult[],
};

export type StudentNotification = {
  id: string;
  title: string;
  body: string;
  time: string;
  icon: string;
  read: boolean;
  type: "quest" | "praise" | "reminder" | "system";
};

export type StudentAnnouncement = {
  id: string;
  title: string;
  body: string;
  from: string;
  time: string;
  icon: string;
  read: boolean;
  pinned?: boolean;
};

export const STUDENT_NOTIFICATIONS: StudentNotification[] = [
  {
    id: "n1",
    title: "Math Worksheet due today",
    body: "Submit your Math Worksheet before 2:00 PM to earn +20 points.",
    time: "30 min ago",
    icon: "🧮",
    read: false,
    type: "quest",
  },
  {
    id: "n2",
    title: "You earned +10 points!",
    body: "Cikgu Nadia praised your participation in English class.",
    time: "2 hr ago",
    icon: "⭐",
    read: false,
    type: "praise",
  },
  {
    id: "n3",
    title: "Streak reminder",
    body: "Complete 1 more quest today to keep your 5-day streak alive.",
    time: "This morning",
    icon: "🔥",
    read: false,
    type: "reminder",
  },
  {
    id: "n4",
    title: "Science Project update",
    body: "Your draft was saved. Remember to submit by tomorrow 9:00 AM.",
    time: "Yesterday",
    icon: "🔬",
    read: true,
    type: "quest",
  },
];

export const STUDENT_ANNOUNCEMENTS: StudentAnnouncement[] = [
  {
    id: "ann1",
    title: "Sports Day — Friday 24 May",
    body: "Wear your house colours and bring a water bottle. Assembly starts at 7:30 AM on the field.",
    from: "Cikgu Nadia",
    time: "Today, 8:00 AM",
    icon: "🏆",
    read: false,
    pinned: true,
  },
  {
    id: "ann2",
    title: "Mid-Year Exam timetable released",
    body: "Check the Exams section for dates. Start revision early — your weakest subject is Bahasa Melayu.",
    from: "School Admin",
    time: "Yesterday",
    icon: "📋",
    read: false,
  },
  {
    id: "ann3",
    title: "Library books due next week",
    body: "Return all borrowed books by 5 June to avoid a RM2/day fine.",
    from: "Puan Siti",
    time: "Mon",
    icon: "📚",
    read: true,
  },
];

export type KanbanColumnId =
  | "backlog"
  | "in-progress"
  | "in-review"
  | "submitted"
  | "comments"
  | "successful-submissions";

export type SubmittedFile = {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
  type: "pdf" | "image" | "doc" | "video";
};

export type OnlineQuiz = {
  title: string;
  url: string;
  totalQuestions: number;
  timeLimitMinutes: number;
  score?: number;
  completedAt?: string;
};

export type AssignmentComment = {
  id: string;
  author: string;
  avatar: string;
  text: string;
  time: string;
};

export type KanbanAssignmentCard = {
  id: string;
  title: string;
  subject: string;
  due: string;
  points: number;
  icon: string;
  columnId: KanbanColumnId;
  kind: "document" | "quiz";
  description: string;
  labels: string[];
  commentsCount: number;
  submittedFiles?: SubmittedFile[];
  quiz?: OnlineQuiz;
  comments?: AssignmentComment[];
};

export const KANBAN_COLUMNS: { id: KanbanColumnId; title: string; accent: string }[] = [
  { id: "backlog", title: "Backlog", accent: "bg-slate-200" },
  { id: "in-progress", title: "In Progress", accent: "bg-[oklch(0.92_0.08_240)]" },
  { id: "in-review", title: "In Review", accent: "bg-[oklch(0.93_0.08_50)]" },
  { id: "submitted", title: "Submitted", accent: "bg-[oklch(0.93_0.08_145)]" },
  { id: "comments", title: "Comments", accent: "bg-[oklch(0.94_0.08_295)]" },
  {
    id: "successful-submissions",
    title: "Successful Submissions",
    accent: "bg-[oklch(0.93_0.1_145)]",
  },
];

export const KANBAN_ASSIGNMENTS: KanbanAssignmentCard[] = [
  {
    id: "k1",
    title: "Fractions Worksheet Ch.4",
    subject: "Mathematics",
    due: "Jun 2",
    points: 20,
    icon: "🧮",
    columnId: "backlog",
    kind: "document",
    description: "Complete all questions on pages 12–15. Show your working.",
    labels: ["Math", "Worksheet"],
    commentsCount: 0,
  },
  {
    id: "k2",
    title: "Plant Life Cycle Poster",
    subject: "Science",
    due: "Jun 4",
    points: 50,
    icon: "🔬",
    columnId: "backlog",
    kind: "document",
    description: "Create an A3 poster showing the four stages of a plant life cycle.",
    labels: ["Science", "Creative"],
    commentsCount: 1,
  },
  {
    id: "k3",
    title: "Math Worksheet",
    subject: "Mathematics",
    due: "Today 2:00 PM",
    points: 20,
    icon: "🧮",
    columnId: "in-progress",
    kind: "document",
    description: "Upload your completed worksheet as PDF or photo.",
    labels: ["Due today"],
    commentsCount: 0,
  },
  {
    id: "k4",
    title: "English Comprehension Quiz",
    subject: "English",
    due: "Jun 1",
    points: 15,
    icon: "📖",
    columnId: "in-progress",
    kind: "quiz",
    description: "Online quiz — 10 multiple-choice questions on the reading passage.",
    labels: ["Quiz", "English"],
    commentsCount: 0,
    quiz: {
      title: "Unit 3 Reading Comprehension",
      url: "https://quiz.skooldojo.app/english-u3",
      totalQuestions: 10,
      timeLimitMinutes: 20,
    },
  },
  {
    id: "k5",
    title: "Science Project Report",
    subject: "Science",
    due: "Tomorrow",
    points: 50,
    icon: "🔬",
    columnId: "in-review",
    kind: "document",
    description: "Draft report on your plant experiment — teacher is reviewing.",
    labels: ["Project"],
    commentsCount: 2,
    submittedFiles: [
      {
        id: "f1",
        name: "science-draft-v2.pdf",
        size: "1.2 MB",
        uploadedAt: "Today, 9:14 AM",
        type: "pdf",
      },
      {
        id: "f2",
        name: "experiment-photo.jpg",
        size: "840 KB",
        uploadedAt: "Today, 9:12 AM",
        type: "image",
      },
    ],
  },
  {
    id: "k6",
    title: "BM Karangan Practice",
    subject: "Bahasa Melayu",
    due: "Jun 3",
    points: 30,
    icon: "✍️",
    columnId: "submitted",
    kind: "document",
    description: "Essay submitted — awaiting grading.",
    labels: ["Essay"],
    commentsCount: 0,
    submittedFiles: [
      {
        id: "f3",
        name: "karangan-aisyah.pdf",
        size: "456 KB",
        uploadedAt: "Yesterday, 4:30 PM",
        type: "pdf",
      },
    ],
  },
  {
    id: "k7",
    title: "Math Worksheet",
    subject: "Mathematics",
    due: "Submitted",
    points: 20,
    icon: "🧮",
    columnId: "comments",
    kind: "document",
    description: "Teacher left feedback on your submission.",
    labels: ["Feedback"],
    commentsCount: 3,
    submittedFiles: [
      {
        id: "f4",
        name: "math-worksheet-final.pdf",
        size: "320 KB",
        uploadedAt: "Mon, 1:45 PM",
        type: "pdf",
      },
    ],
    comments: [
      {
        id: "c1",
        author: "Cikgu Nadia",
        avatar: "👩‍🏫",
        text: "Great work on Q5! Double-check Q8 — your denominator should be 12.",
        time: "Today, 10:02 AM",
      },
      {
        id: "c2",
        author: "Aisyah",
        avatar: "🦕",
        text: "Thank you teacher! I'll fix Q8 and re-upload.",
        time: "Today, 10:15 AM",
      },
      {
        id: "c3",
        author: "Cikgu Nadia",
        avatar: "👩‍🏫",
        text: "Sounds good — move to In Review when ready.",
        time: "Today, 10:20 AM",
      },
    ],
  },
  {
    id: "k8",
    title: "Art Sketch — Nature",
    subject: "Art",
    due: "Completed",
    points: 25,
    icon: "🎨",
    columnId: "successful-submissions",
    kind: "document",
    description: "Approved submission — full marks awarded.",
    labels: ["Graded", "A"],
    commentsCount: 1,
    submittedFiles: [
      {
        id: "f5",
        name: "nature-sketch.jpg",
        size: "2.1 MB",
        uploadedAt: "Last week",
        type: "image",
      },
      {
        id: "f6",
        name: "artist-statement.pdf",
        size: "180 KB",
        uploadedAt: "Last week",
        type: "pdf",
      },
    ],
    comments: [
      {
        id: "c4",
        author: "Cikgu Mei",
        avatar: "👩‍🎨",
        text: "Beautiful shading! Well done, Aisyah. +25 pts",
        time: "Last week",
      },
    ],
  },
  {
    id: "k9",
    title: "Science Unit 2 Quiz",
    subject: "Science",
    due: "Completed",
    points: 30,
    icon: "🔬",
    columnId: "successful-submissions",
    kind: "quiz",
    description: "Quiz completed successfully.",
    labels: ["Quiz", "Graded"],
    commentsCount: 0,
    quiz: {
      title: "Plants & Photosynthesis",
      url: "https://quiz.skooldojo.app/science-u2",
      totalQuestions: 15,
      timeLimitMinutes: 25,
      score: 93,
      completedAt: "May 20, 2:10 PM",
    },
  },
  {
    id: "k10",
    title: "English Reading Log",
    subject: "English",
    due: "3 days",
    points: 15,
    icon: "📖",
    columnId: "in-progress",
    kind: "document",
    description: "Log 3 books read this month with short summaries.",
    labels: ["Reading"],
    commentsCount: 0,
  },
];

export type FocusBuddy = {
  id: string;
  name: string;
  avatar: string;
  subject: string;
  status: "studying" | "break" | "offline";
  streak: number;
  cameraOn: boolean;
  imageUrl: string;
  focusMinutes?: number;
  badge?: number;
  pinned?: boolean;
  isMe?: boolean;
};

export type StudyGroup = {
  id: string;
  name: string;
  icon: string;
  members: number;
  topic: string;
  live: boolean;
};

export type ClassChatMessage = {
  id: string;
  senderId: string;
  senderName: string;
  avatar: string;
  text: string;
  time: string;
  isMe?: boolean;
};

export type TeacherChatMessage = {
  id: string;
  text: string;
  time: string;
  from: "teacher" | "student";
  read?: boolean;
};

export type CourseBook = {
  id: string;
  title: string;
  subject: string;
  icon: string;
  pages: number;
  currentPage: number;
  coverColor: string;
};

export type StudyNote = {
  id: string;
  title: string;
  snippet: string;
  bookId?: string;
  page?: number;
  savedAt: string;
};

export const STUDY_ROOM = {
  name: "Primary 5A · Virtual Study Hall",
  code: "P5A-LIVE",
  onlineCount: 12,
  teacher: { name: "Cikgu Nadia", avatar: "👩‍🏫", status: "online" },
};

/** All live participants in the virtual study hall (gallery view) */
export const STUDY_ROOM_PARTICIPANTS: FocusBuddy[] = [
  {
    id: "me",
    name: "Aisyah",
    avatar: "🦕",
    subject: "Math",
    status: "studying",
    streak: 5,
    cameraOn: true,
    isMe: true,
    focusMinutes: 28,
    badge: 320,
    pinned: true,
    imageUrl:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=480&h=360&fit=crop&q=80",
  },
  {
    id: "b1",
    name: "Sara Lim",
    avatar: "👧🏼",
    subject: "Math",
    status: "studying",
    streak: 4,
    cameraOn: true,
    focusMinutes: 34,
    badge: 500,
    pinned: true,
    imageUrl:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=480&h=360&fit=crop&q=80",
  },
  {
    id: "b2",
    name: "Ali Hassan",
    avatar: "👦🏽",
    subject: "Science",
    status: "studying",
    streak: 2,
    cameraOn: true,
    focusMinutes: 33,
    badge: 200,
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=480&h=360&fit=crop&q=80",
  },
  {
    id: "b3",
    name: "Zara Nair",
    avatar: "👧🏽",
    subject: "English",
    status: "studying",
    streak: 6,
    cameraOn: true,
    focusMinutes: 31,
    badge: 100,
    pinned: true,
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=480&h=360&fit=crop&q=80",
  },
  {
    id: "b5",
    name: "Aisha Rahman",
    avatar: "👧🏻",
    subject: "Art",
    status: "studying",
    streak: 3,
    cameraOn: true,
    focusMinutes: 29,
    badge: 300,
    imageUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=480&h=360&fit=crop&q=80",
  },
  {
    id: "b6",
    name: "Hana Lee",
    avatar: "👧",
    subject: "Science",
    status: "studying",
    streak: 2,
    cameraOn: true,
    focusMinutes: 27,
    badge: 75,
    imageUrl:
      "https://images.unsplash.com/photo-1434030214721-b40bd6781104?w=480&h=360&fit=crop&q=80",
  },
  {
    id: "b7",
    name: "Rayyan Aziz",
    avatar: "👦",
    subject: "BM",
    status: "studying",
    streak: 1,
    cameraOn: true,
    focusMinutes: 25,
    badge: 150,
    imageUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=480&h=360&fit=crop&q=80",
  },
  {
    id: "b8",
    name: "Mei Tan",
    avatar: "👧🏻",
    subject: "Math",
    status: "break",
    streak: 4,
    cameraOn: true,
    focusMinutes: 25,
    badge: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=480&h=360&fit=crop&q=80",
  },
  {
    id: "b9",
    name: "Irfan Malik",
    avatar: "👦🏽",
    subject: "English",
    status: "studying",
    streak: 3,
    cameraOn: false,
    focusMinutes: 22,
    badge: 25,
    imageUrl:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=480&h=360&fit=crop&q=80",
  },
  {
    id: "b10",
    name: "Chloe Wong",
    avatar: "👧🏼",
    subject: "Science",
    status: "studying",
    streak: 5,
    cameraOn: true,
    focusMinutes: 20,
    badge: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=480&h=360&fit=crop&q=80",
  },
  {
    id: "b11",
    name: "Adam Rizal",
    avatar: "👦🏾",
    subject: "Math",
    status: "studying",
    streak: 2,
    cameraOn: true,
    focusMinutes: 18,
    badge: 200,
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=480&h=360&fit=crop&q=80",
  },
  {
    id: "b12",
    name: "Nurul Iman",
    avatar: "👧🏽",
    subject: "BM",
    status: "studying",
    streak: 7,
    cameraOn: true,
    focusMinutes: 16,
    badge: 500,
    imageUrl:
      "https://images.unsplash.com/photo-1531123897727-8f129e168fce?w=480&h=360&fit=crop&q=80",
  },
];

export const FOCUS_BUDDIES: FocusBuddy[] = STUDY_ROOM_PARTICIPANTS.filter(
  (p) => !p.isMe && p.status !== "offline",
);

export const STUDY_GROUPS: StudyGroup[] = [
  {
    id: "g1",
    name: "Math Warriors",
    icon: "🧮",
    members: 5,
    topic: "Fractions revision",
    live: true,
  },
  {
    id: "g2",
    name: "Science Squad",
    icon: "🔬",
    members: 4,
    topic: "Plant life cycle",
    live: true,
  },
  {
    id: "g3",
    name: "BM Essay Club",
    icon: "✍️",
    members: 3,
    topic: "Karangan practice",
    live: false,
  },
  { id: "g4", name: "Exam Prep 5A", icon: "📚", members: 8, topic: "Mid-year prep", live: true },
];

export const CLASS_CONVERSATIONS: ClassChatMessage[] = [
  {
    id: "c1",
    senderId: "sara",
    senderName: "Sara",
    avatar: "👧🏼",
    text: "Anyone doing Q7 on the math sheet?",
    time: "2:04 PM",
  },
  {
    id: "c2",
    senderId: "me",
    senderName: "You",
    avatar: "🦕",
    text: "Yes! I got 3/4 — want to screenshare?",
    time: "2:05 PM",
    isMe: true,
  },
  {
    id: "c3",
    senderId: "ali",
    senderName: "Ali",
    avatar: "👦🏽",
    text: "Pomodoro break in 5 min 🍅",
    time: "2:06 PM",
  },
  {
    id: "c4",
    senderId: "zara",
    senderName: "Zara",
    avatar: "👧🏽",
    text: "Join Math Warriors group — we're live!",
    time: "2:08 PM",
  },
];

export const TEACHER_DOUBT_MESSAGES: TeacherChatMessage[] = [
  {
    id: "t1",
    from: "teacher",
    text: "Good morning 5A! Ask your doubts here anytime 📚",
    time: "8:00 AM",
    read: true,
  },
  {
    id: "t2",
    from: "student",
    text: "Cikgu, for Q5 do we need to show working?",
    time: "10:15 AM",
    read: true,
  },
  {
    id: "t3",
    from: "teacher",
    text: "Yes Aisyah — show all steps for full marks ✅",
    time: "10:18 AM",
    read: true,
  },
  {
    id: "t4",
    from: "student",
    text: "Thank you! Also, is the science project due tomorrow?",
    time: "1:42 PM",
    read: true,
  },
  {
    id: "t5",
    from: "teacher",
    text: "Tomorrow 9 AM sharp. Upload PDF + photos in Assignments.",
    time: "1:45 PM",
    read: false,
  },
];

export const COURSE_BOOKS: CourseBook[] = [
  {
    id: "book1",
    title: "Mathematics Year 5",
    subject: "Math",
    icon: "🧮",
    pages: 156,
    currentPage: 42,
    coverColor: "oklch(0.92 0.08 240)",
  },
  {
    id: "book2",
    title: "Science Discoveries",
    subject: "Science",
    icon: "🔬",
    pages: 128,
    currentPage: 18,
    coverColor: "oklch(0.92 0.08 145)",
  },
  {
    id: "book3",
    title: "English Reader",
    subject: "English",
    icon: "📖",
    pages: 96,
    currentPage: 7,
    coverColor: "oklch(0.92 0.08 295)",
  },
  {
    id: "book4",
    title: "Bahasa Melayu",
    subject: "BM",
    icon: "✍️",
    pages: 112,
    currentPage: 55,
    coverColor: "oklch(0.93 0.08 50)",
  },
];

export const STUDY_NOTES: StudyNote[] = [
  {
    id: "n1",
    title: "Fractions — common denominators",
    snippet: "When adding 1/3 + 1/4, find LCM of 3 and 4 = 12...",
    bookId: "book1",
    page: 42,
    savedAt: "Today",
  },
  {
    id: "n2",
    title: "Photosynthesis equation",
    snippet: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (needs sunlight)",
    bookId: "book2",
    page: 18,
    savedAt: "Yesterday",
  },
  {
    id: "n3",
    title: "Karangan intro phrases",
    snippet: "Pada pendapat saya... / Saya bersetuju kerana...",
    bookId: "book4",
    page: 55,
    savedAt: "Mon",
  },
];

export const MESSAGES_PARENTS = [
  {
    id: "m1",
    from: "Aisha's Mom",
    preview: "Thank you teacher! 🙏",
    time: "10:30 AM",
    unread: 2,
    avatar: "👩🏻",
  },
  {
    id: "m2",
    from: "Ali's Dad",
    preview: "Okay, noted about the quiz.",
    time: "Yesterday",
    unread: 1,
    avatar: "👨🏽",
  },
  {
    id: "m3",
    from: "Sara's Mom",
    preview: "When is the next PTM?",
    time: "Yesterday",
    unread: 1,
    avatar: "👩🏼",
  },
  {
    id: "m4",
    from: "Zara's Dad",
    preview: "Got it, thank you.",
    time: "2 days ago",
    unread: 0,
    avatar: "👨🏾",
  },
];
