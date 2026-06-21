import { Brain, CalendarClock, Code2, ListChecks, Play, Sparkles, Target, Trophy, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { BadgeCard } from "@/components/gamification/BadgeCard";
import { CoinCounter } from "@/components/gamification/CoinCounter";
import { LevelBadge } from "@/components/gamification/LevelBadge";
import { StreakBadge } from "@/components/gamification/StreakBadge";
import { XPBar } from "@/components/gamification/XPBar";
import type { DashboardSummary } from "@/types/codestart";

function Shell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-3xl border border-white/10 bg-white/[0.045] p-5 shadow-lg shadow-blue-950/10 ${className}`}>{children}</div>;
}

function percent(value: number, total: number) {
  return Math.min(100, Math.round((value / total) * 100));
}

export function TodayGoalCard({ data }: { data: DashboardSummary }) {
  return <Shell><div className="mb-4 flex items-center gap-3 text-blue-200"><Target className="size-5" /><span className="font-semibold">Today's Goal</span></div><h3 className="text-xl font-bold text-white">{data.todayGoal.title}</h3><XPBar currentXP={data.todayGoal.completedMinutes} nextLevelXP={data.todayGoal.targetMinutes} /></Shell>;
}

export function StudyStreakBadge({ data }: { data: DashboardSummary }) { return <StreakBadge days={data.streakDays} />; }
export function CoinsDisplay({ data }: { data: DashboardSummary }) { return <CoinCounter coins={data.coins} />; }

export function XPProgressBar({ data }: { data: DashboardSummary }) {
  return <Shell><div className="mb-4 flex items-center justify-between"><div className="flex items-center gap-3 text-amber-200"><Zap className="size-5" /><span className="font-semibold">XP Progress</span></div><LevelBadge level={data.level} /></div><XPBar currentXP={data.currentXP} nextLevelXP={data.nextLevelXP} /></Shell>;
}

export function DailyMissionCard({ data }: { data: DashboardSummary }) {
  return <Shell><div className="mb-3 flex items-center gap-3 text-emerald-200"><ListChecks className="size-5" /><span className="font-semibold">Daily Mission</span></div><h3 className="text-lg font-bold text-white">{data.dailyMission.title}</h3><p className="mt-2 text-sm text-zinc-400">{data.dailyMission.description}</p><div className="mt-5 h-2 overflow-hidden rounded-full bg-zinc-900"><motion.div initial={{ width: 0 }} animate={{ width: `${data.dailyMission.progress}%` }} className="h-full bg-emerald-400" /></div><p className="mt-3 text-xs text-amber-300">Reward: {data.dailyMission.rewardCoins} coins</p></Shell>;
}

export function ContinueLearningCard({ data }: { data: DashboardSummary }) {
  const lesson = data.continueLearning;
  return <Shell className="md:col-span-2"><div className="grid gap-5 sm:grid-cols-[180px_1fr]"><img src={lesson.thumbnailUrl} alt={lesson.title} className="h-36 w-full rounded-2xl object-cover" /><div><div className="mb-3 flex items-center gap-2 text-blue-200"><Play className="size-4" /> Continue Learning</div><h3 className="text-2xl font-black text-white">{lesson.title}</h3><p className="mt-1 text-sm text-zinc-400">{lesson.courseTitle} • {lesson.durationMinutes} min</p><XPBar currentXP={lesson.progress} nextLevelXP={100} /></div></div></Shell>;
}

export function RecommendedLesson({ data }: { data: DashboardSummary }) {
  return <Shell><div className="mb-3 flex items-center gap-3 text-violet-200"><Brain className="size-5" /><span className="font-semibold">AI Recommendation</span></div><h3 className="text-lg font-bold text-white">{data.recommendedLesson.title}</h3><p className="mt-2 text-sm text-zinc-400">Next best step in {data.recommendedLesson.courseTitle}.</p></Shell>;
}

export function UpcomingExamCard({ data }: { data: DashboardSummary }) {
  const hours = Math.max(1, Math.round((new Date(data.upcomingExam.startsAt).getTime() - Date.now()) / 36e5));
  return <Shell><div className="mb-3 flex items-center gap-3 text-red-200"><CalendarClock className="size-5" /><span className="font-semibold">Upcoming Exam</span></div><h3 className="text-lg font-bold text-white">{data.upcomingExam.title}</h3><p className="mt-2 text-sm text-zinc-400">{data.upcomingExam.subject}</p><p className="mt-4 font-mono text-2xl font-black text-red-200">{hours}h</p></Shell>;
}

export function CodingChallengeCard({ data }: { data: DashboardSummary }) {
  return <Shell><div className="mb-3 flex items-center gap-3 text-cyan-200"><Code2 className="size-5" /><span className="font-semibold">Daily Challenge</span></div><h3 className="text-lg font-bold text-white">{data.codingChallenge.title}</h3><pre className="mt-4 overflow-hidden rounded-2xl bg-black/50 p-4 text-xs text-cyan-100"><code>{data.codingChallenge.snippet}</code></pre><p className="mt-3 text-xs text-amber-300">+{data.codingChallenge.rewardXP} XP</p></Shell>;
}

export function RecentActivityFeed({ data }: { data: DashboardSummary }) {
  return <Shell><h3 className="mb-4 font-bold text-white">Recent Activity</h3><div className="space-y-3">{data.recentActivity.map((item) => <div key={item.id} className="flex items-center justify-between gap-4 rounded-2xl bg-white/[0.035] p-3 text-sm"><span className="text-zinc-200">{item.label}</span><span className="text-xs text-zinc-500">{item.timestamp}</span></div>)}</div></Shell>;
}

export function LeaderboardPreview({ data }: { data: DashboardSummary }) {
  return <Shell><div className="mb-4 flex items-center gap-3 text-amber-200"><Trophy className="size-5" /><span className="font-semibold">Leaderboard</span></div><div className="space-y-3">{data.leaderboard.map((entry) => <div key={entry.rank} className="flex items-center justify-between rounded-2xl bg-white/[0.035] p-3"><span className="text-white">#{entry.rank} {entry.name}</span><span className="font-mono text-sm text-blue-200">{entry.xp}</span></div>)}</div><p className="mt-4 text-sm text-zinc-400">Your rank: #{data.userRank}</p></Shell>;
}

export function BadgesShowcase({ data }: { data: DashboardSummary }) {
  return <Shell className="md:col-span-2"><div className="mb-4 flex items-center gap-3 text-blue-200"><Sparkles className="size-5" /><span className="font-semibold">Latest Badges</span></div><div className="grid gap-4 sm:grid-cols-3">{data.badges.map((badge) => <BadgeCard key={badge.id} badge={badge} />)}</div></Shell>;
}
