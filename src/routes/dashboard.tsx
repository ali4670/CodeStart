import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, CalendarDays, MessageCircle, RouteIcon, Sparkles } from "lucide-react";
import { LimelightNav } from "@/components/ui/limelight-nav";
import { TextEffect } from "@/components/ui/text-effect";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardSummary } from "@/hooks/use-dashboard-summary";
import { BadgesShowcase, CodingChallengeCard, CoinsDisplay, ContinueLearningCard, DailyMissionCard, LeaderboardPreview, RecentActivityFeed, RecommendedLesson, StudyStreakBadge, TodayGoalCard, UpcomingExamCard, XPProgressBar } from "@/components/dashboard/student-widgets";

export const Route = createFileRoute("/dashboard")({ component: DashboardPage });

function DashboardPage() {
  const { data, isLoading } = useDashboardSummary();

  if (isLoading || !data) {
    return <div className="min-h-screen bg-[#0A0A0F] p-6 pt-10"><Skeleton className="h-20 w-full rounded-3xl" /><div className="mt-8 grid gap-5 md:grid-cols-3">{Array.from({ length: 9 }).map((_, index) => <Skeleton key={index} className="h-44 rounded-3xl" />)}</div></div>;
  }

  return (
    <main className="min-h-screen bg-[#0A0A0F] px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <TextEffect as="h1" preset="fade" per="char" className="text-4xl font-black tracking-tight md:text-6xl">{data.greeting}</TextEffect>
            <p className="mt-3 max-w-2xl text-zinc-400">Your engineering path for today: school discipline, coding practice, and one meaningful project step.</p>
          </div>
          <div className="flex flex-wrap gap-3"><StudyStreakBadge data={data} /><CoinsDisplay data={data} /></div>
        </header>
        <div className="mb-8 overflow-x-auto pb-3">
          <LimelightNav items={[{ id: "today", label: "Today", icon: <Sparkles /> }, { id: "courses", label: "Courses", icon: <BookOpen /> }, { id: "tracks", label: "Tracks", icon: <RouteIcon /> }, { id: "planner", label: "Planner", icon: <CalendarDays /> }, { id: "community", label: "Community", icon: <MessageCircle /> }]} className="bg-white/[0.04] text-white" />
        </div>
        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <TodayGoalCard data={data} />
          <XPProgressBar data={data} />
          <DailyMissionCard data={data} />
          <ContinueLearningCard data={data} />
          <RecommendedLesson data={data} />
          <UpcomingExamCard data={data} />
          <CodingChallengeCard data={data} />
          <RecentActivityFeed data={data} />
          <LeaderboardPreview data={data} />
          <BadgesShowcase data={data} />
        </section>
      </div>
    </main>
  );
}
