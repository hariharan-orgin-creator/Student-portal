// Shared mock data for the school portal prototype
export const CHILDREN = [
  { id: "ali", name: "Ali Rahman", className: "Class 5A", avatar: "👦", color: "duo-blue", points: 320, level: 4, streak: 5 },
  { id: "alya", name: "Alya Rahman", className: "Class 2B", avatar: "👧", color: "duo-pink", points: 210, level: 3, streak: 2 },
  { id: "sara", name: "Sara Rahman", className: "Class 1A", avatar: "🧒", color: "duo-orange", points: 140, level: 2, streak: 7 },
];

export const CLASSES = [
  { id: "5a", name: "Primary 5A", students: 24, attendance: 92 },
  { id: "5b", name: "Primary 5B", students: 25, attendance: 90 },
  { id: "4a", name: "Primary 4A", students: 23, attendance: 94 },
];

export const SCHEDULE = [
  { time: "8:00 - 9:00 AM", subject: "Science", topic: "Chapter 3: Plants", room: "Science Lab", color: "duo-green" },
  { time: "9:00 - 10:00 AM", subject: "Mathematics", topic: "Fractions", room: "Room 12", color: "duo-blue" },
  { time: "10:30 - 11:30 AM", subject: "English", topic: "Reading Comprehension", room: "Room 8", color: "duo-purple" },
  { time: "12:00 - 1:00 PM", subject: "Lunch Break", topic: "", room: "Cafeteria", color: "duo-yellow" },
  { time: "2:00 - 3:00 PM", subject: "Art & Craft", topic: "Paper Mache Project", room: "Art Room", color: "duo-pink" },
];

export const ASSIGNMENTS = [
  { id: "a1", title: "Math Worksheet", subject: "Math", due: "Today 2:00 PM", status: "pending", icon: "🧮", points: 20 },
  { id: "a2", title: "Science Project", subject: "Science", due: "Tomorrow", status: "in-progress", icon: "🔬", points: 50 },
  { id: "a3", title: "English Reading", subject: "English", due: "3 days", status: "pending", icon: "📖", points: 15 },
  { id: "a4", title: "Art Sketch", subject: "Art", due: "Next week", status: "submitted", icon: "🎨", points: 25 },
];

export const BADGES = [
  { id: "b1", name: "Hard Worker", icon: "📚", color: "duo-purple", earned: true },
  { id: "b2", name: "Team Player", icon: "🤝", color: "duo-green", earned: true },
  { id: "b3", name: "Positive Attitude", icon: "☀️", color: "duo-yellow", earned: true },
  { id: "b4", name: "Quick Learner", icon: "⚡", color: "duo-blue", earned: false },
  { id: "b5", name: "Helping Hand", icon: "💝", color: "duo-pink", earned: false },
  { id: "b6", name: "Streak Hero", icon: "🔥", color: "duo-orange", earned: false },
];

export const RECENT_ACTIVITY = [
  { id: 1, type: "praise", text: "Cikgu Nadia gave you +10 for Great Participation!", time: "9:15 AM", icon: "⭐" },
  { id: 2, type: "love", text: "Your parents loved your photo update", time: "Yesterday", icon: "❤️" },
  { id: 3, type: "comment", text: 'Cikgu Nadia commented "Great effort, Aisyah!"', time: "Yesterday", icon: "💬" },
  { id: 4, type: "submission", text: "You submitted Math Worksheet", time: "Mon", icon: "✅" },
];

export const STUDENTS_IN_CLASS = [
  { id: "s1", name: "Aisha Rahman", attendance: 95, grade: "A", behavior: "high", overall: "Excellent", avatar: "👧🏻" },
  { id: "s2", name: "Ali Hassan", attendance: 88, grade: "B+", behavior: "medium", overall: "Good", avatar: "👦🏽" },
  { id: "s3", name: "Sara Lim", attendance: 92, grade: "A-", behavior: "high", overall: "Excellent", avatar: "👧🏼" },
  { id: "s4", name: "Danish Kumar", attendance: 78, grade: "C+", behavior: "low", overall: "Needs Improvement", avatar: "👦🏾" },
  { id: "s5", name: "Zara Nair", attendance: 96, grade: "A", behavior: "high", overall: "Excellent", avatar: "👧🏽" },
];

export const UPCOMING = [
  { id: "u1", title: "Sports Day", date: "24 May", day: "Friday", icon: "🏆", color: "duo-orange" },
  { id: "u2", title: "Parent-Teacher Meeting", date: "31 May", day: "Friday", icon: "👨‍👩‍👧", color: "duo-purple" },
  { id: "u3", title: "School Holiday", date: "3 - 5 June", day: "Mon-Wed", icon: "🌴", color: "duo-yellow" },
];

export const MESSAGES_PARENTS = [
  { id: "m1", from: "Aisha's Mom", preview: "Thank you teacher! 🙏", time: "10:30 AM", unread: 2, avatar: "👩🏻" },
  { id: "m2", from: "Ali's Dad", preview: "Okay, noted about the quiz.", time: "Yesterday", unread: 1, avatar: "👨🏽" },
  { id: "m3", from: "Sara's Mom", preview: "When is the next PTM?", time: "Yesterday", unread: 1, avatar: "👩🏼" },
  { id: "m4", from: "Zara's Dad", preview: "Got it, thank you.", time: "2 days ago", unread: 0, avatar: "👨🏾" },
];
