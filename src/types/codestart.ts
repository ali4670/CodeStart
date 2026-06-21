export type Grade = "year_1" | "year_2" | "year_3";

export type TrackInterest =
  | "cs"
  | "ai"
  | "cybersecurity"
  | "data_science"
  | "software_engineering";

export interface CodeStartUser {
  id: string;
  fullName: string;
  email: string;
  grade: Grade;
  trackInterest: TrackInterest;
  avatarUrl?: string;
}

export interface AuthResponse {
  user: CodeStartUser;
  message: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  fullName: string;
  grade: Grade;
  trackInterest: TrackInterest;
}

export interface StudyGoal {
  title: string;
  targetMinutes: number;
  completedMinutes: number;
}

export interface Mission {
  title: string;
  description: string;
  progress: number;
  rewardCoins: number;
}

export interface LessonPreview {
  id: string;
  title: string;
  courseTitle: string;
  thumbnailUrl: string;
  progress: number;
  durationMinutes: number;
}

export interface ExamPreview {
  title: string;
  subject: string;
  startsAt: string;
}

export interface ChallengePreview {
  title: string;
  difficulty: "easy" | "medium" | "hard";
  language: string;
  snippet: string;
  rewardXP: number;
}

export interface ActivityItem {
  id: string;
  label: string;
  timestamp: string;
  type: "lesson" | "quiz" | "mission" | "badge" | "challenge";
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  xp: number;
  isCurrentUser?: boolean;
}

export interface BadgeSummary {
  id: string;
  name: string;
  description: string;
  earnedAt?: string;
  imageUrl?: string;
  locked?: boolean;
}

export interface DashboardSummary {
  user: CodeStartUser;
  greeting: string;
  todayGoal: StudyGoal;
  streakDays: number;
  currentXP: number;
  nextLevelXP: number;
  level: number;
  coins: number;
  dailyMission: Mission;
  continueLearning: LessonPreview;
  recommendedLesson: LessonPreview;
  upcomingExam: ExamPreview;
  codingChallenge: ChallengePreview;
  recentActivity: ActivityItem[];
  leaderboard: LeaderboardEntry[];
  userRank: number;
  badges: BadgeSummary[];
}

export interface CourseSummary {
  id: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  durationHours: number;
  lessonsCount: number;
  track: string;
}

export interface CourseLesson {
  id: string;
  title: string;
  durationMinutes: number;
  type: "video" | "reading" | "practice" | "project";
  preview: string;
}

export interface CourseModule {
  id: string;
  title: string;
  summary: string;
  lessons: CourseLesson[];
}

export interface ClassroomStructure {
  id: string;
  title: string;
  description: string;
  modulesCount: number;
  examPassed: boolean;
}

export interface CourseReview extends CourseSummary {
  heroImage: string;
  subtitle: string;
  rating: number;
  reviewsCount: number;
  enrolled: string;
  instructor: string;
  language: string;
  certificate: boolean;
  whatYouLearn: string[];
  tools: string[];
  projects: string[];
  classroomStructure?: ClassroomStructure[];
  modules: CourseModule[];
}

export interface TrackSummary {
  id: string;
  title: string;
  description: string;
  coursesCount: number;
  outcome: string;
}
