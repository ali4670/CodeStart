import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "../../lib/supabase-code";
import { useLanguage } from "../../lib/LanguageContext";
import { useAuth } from "../../hooks/use-auth";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Play,
  CheckCircle2,
  Lock,
  MessageSquare,
  GraduationCap,
  ArrowRight,
  BookOpen,
  Clock,
  Circle,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/levels/")({
  component: LevelsPage,
});

interface Level {
  id: string;
  title: string;
  level_order: number;
  image_url?: string;
  drip_interval_days: number;
}

interface Lecture {
  id: string;
  level_id: string;
  title: string;
  slot_number: number;
  is_live?: boolean;
  drip_days: number;
  is_big_exam: boolean;
  quiz_required: boolean;
}

interface Submission {
  lecture_id: string;
  total_grade: number | null;
  graded_at: string | null;
}

function LevelsPage() {
  const { isAr } = useLanguage();
  const { user, isApproved, isAdmin, isModerator } = useAuth();
  const [levels, setLevels] = useState<Level[]>([]);
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [exams, setExams] = useState<{ level_id: string }[]>([]);
  const [progress, setProgress] = useState<string[]>([]);
  const [access, setAccess] = useState<{ level_id: string; granted_at: string }[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeLevelId, setActiveLevelId] = useState<string | null>(null);

  const fetchInitialData = useCallback(async () => {
    setLoading(true);
    try {
      let levelsQuery = supabase
        .from("levels")
        .select("*")
        .order("level_order", { ascending: true });

      if (!isAdmin && !isModerator) {
        levelsQuery = levelsQuery.eq("is_published", true);
      }

      const [levelsRes, lecturesRes, examsRes] = await Promise.all([
        levelsQuery,
        supabase
          .from("lectures")
          .select("*")
          .order("slot_number", { ascending: true }),
        supabase.from("exams").select("level_id"),
      ]);

      if (levelsRes.data) setLevels(levelsRes.data);
      if (lecturesRes.data) setLectures(lecturesRes.data);
      setExams(examsRes.data || []);

      if (user) {
        const [progressRes, accessRes, submissionsRes] = await Promise.all([
          supabase
            .from("student_progress")
            .select("lecture_id")
            .eq("student_id", user.id),
          supabase
            .from("level_access")
            .select("level_id, granted_at")
            .eq("user_id", user.id),
          supabase
            .from("exam_submissions")
            .select("lecture_id, total_grade, graded_at")
            .eq("student_id", user.id),
        ]);

        if (progressRes.data)
          setProgress(progressRes.data.map((p) => p.lecture_id));
        setAccess(accessRes.data || []);
        setSubmissions(submissionsRes.data || []);
      }
    } finally {
      setLoading(false);
    }
  }, [user, isAdmin, isModerator]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const getDripUnlockDate = useCallback(
    (levelId: string, slotNumber: number) => {
      const accessInfo = access.find((a) => a.level_id === levelId);
      if (!accessInfo) return null;

      const grantedAt = new Date(accessInfo.granted_at);
      const level = levels.find((l) => l.id === levelId);
      const interval = level?.drip_interval_days ?? 7;
      const daysToAdd = (slotNumber - 1) * interval;
      const unlockDate = new Date(grantedAt);
      unlockDate.setDate(unlockDate.getDate() + daysToAdd);
      return unlockDate;
    },
    [access, levels],
  );

  const isLectureUnlocked = useCallback(
    (lecture: Lecture) => {
      if (isAdmin || isModerator) return true;

      const unlockDate = getDripUnlockDate(lecture.level_id, lecture.slot_number);
      if (!unlockDate || unlockDate > new Date()) return false;

      if (lecture.slot_number > 1) {
        const prevLecture = lectures.find(
          (l) =>
            l.level_id === lecture.level_id &&
            l.slot_number === lecture.slot_number - 1,
        );
        if (prevLecture) {
          const isPrevCompleted = progress.includes(prevLecture.id);
          const submission = submissions.find(
            (s) => s.lecture_id === prevLecture.id,
          );
          const isExamPassed =
            submission &&
            submission.total_grade !== null &&
            submission.total_grade >= 50;

          if (!isPrevCompleted || (prevLecture.quiz_required && !isExamPassed)) {
            return false;
          }
        }
      }

      return true;
    },
    [isAdmin, isModerator, getDripUnlockDate, lectures, progress, submissions],
  );

  const isLevelAccessible = useCallback(
    (level: Level) => {
      if (isAdmin || isModerator) return true;
      if (access.some((a) => a.level_id === level.id)) return true;
      return level.level_order === 1 && isApproved;
    },
    [isAdmin, isModerator, access, isApproved],
  );

  const getLevelLectures = useCallback(
    (levelId: string) =>
      lectures
        .filter(
          (l) =>
            l.level_id === levelId &&
            (l.is_live !== false || isAdmin || isModerator),
        )
        .sort((a, b) => a.slot_number - b.slot_number),
    [lectures, isAdmin, isModerator],
  );

  const accessibleLevels = useMemo(
    () => levels.filter((l) => isLevelAccessible(l)),
    [levels, isLevelAccessible],
  );

  const sortedAccessibleLevels = useMemo(
    () => [...accessibleLevels].sort((a, b) => a.level_order - b.level_order),
    [accessibleLevels],
  );

  const totalLectures = useMemo(
    () =>
      sortedAccessibleLevels.reduce(
        (sum, level) => sum + getLevelLectures(level.id).length,
        0,
      ),
    [sortedAccessibleLevels, getLevelLectures],
  );

  const completedLectures = useMemo(
    () => progress.filter((id) => lectures.some((l) => l.id === id)).length,
    [progress, lectures],
  );

  const overallProgress = totalLectures
    ? Math.round((completedLectures / totalLectures) * 100)
    : 0;

  const nextUp = useMemo(() => {
    for (const level of sortedAccessibleLevels) {
      for (const lecture of getLevelLectures(level.id)) {
        if (!progress.includes(lecture.id) && isLectureUnlocked(lecture)) {
          return { level, lecture };
        }
      }
    }
    for (const level of sortedAccessibleLevels) {
      for (const lecture of getLevelLectures(level.id)) {
        if (!progress.includes(lecture.id) && !isLectureUnlocked(lecture)) {
          return { level, lecture };
        }
      }
    }
    return null;
  }, [
    sortedAccessibleLevels,
    getLevelLectures,
    progress,
    isLectureUnlocked,
  ]);

  useEffect(() => {
    if (!activeLevelId && nextUp) {
      setActiveLevelId(nextUp.level.id);
    } else if (!activeLevelId && sortedAccessibleLevels[0]) {
      setActiveLevelId(sortedAccessibleLevels[0].id);
    }
  }, [activeLevelId, nextUp, sortedAccessibleLevels]);

  const scrollToLevel = (levelId: string) => {
    setActiveLevelId(levelId);
    document.getElementById(`level-${levelId}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0A0F]">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0A0A0F] px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-8">
          <div className="mb-4 inline-flex items-center rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-100">
            <BookOpen className="mr-2 size-4" />
            {isAr ? "مسار التعلم" : "Learning path"}
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-black tracking-tight md:text-5xl"
          >
            {isAr ? "تابع تقدمك" : "Your curriculum"}
          </motion.h1>
          <p className="mt-3 max-w-2xl text-zinc-400">
            {isAr
              ? "أكمل الدروس بالترتيب، تابع تقدمك، وانضم للنقاش في غرفة الصف."
              : "Work through lessons in order, track your progress, and join classroom discussions — just like Coursera or freeCodeCamp."}
          </p>

          {totalLectures > 0 && (
            <div className="mt-6 max-w-md">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-zinc-400">
                  {isAr ? "التقدم الكلي" : "Overall progress"}
                </span>
                <span className="font-semibold text-blue-200">
                  {completedLectures}/{totalLectures} · {overallProgress}%
                </span>
              </div>
              <Progress value={overallProgress} className="h-2 bg-white/10" />
            </div>
          )}
        </header>

        {/* Continue learning hero */}
        {nextUp && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 overflow-hidden rounded-3xl border border-blue-400/25 bg-gradient-to-br from-blue-600/20 via-blue-500/10 to-transparent p-6 md:p-8"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <p className="mb-2 text-sm font-medium text-blue-200">
                  {isLectureUnlocked(nextUp.lecture)
                    ? isAr
                      ? "تابع من حيث توقفت"
                      : "Continue where you left off"
                    : isAr
                      ? "الدرس التالي"
                      : "Up next"}
                </p>
                <h2 className="text-xl font-bold md:text-2xl">
                  {nextUp.lecture.title}
                </h2>
                <p className="mt-1 text-sm text-zinc-400">
                  {nextUp.level.title} ·{" "}
                  {isAr
                    ? `الوحدة ${nextUp.lecture.slot_number}`
                    : `Unit ${nextUp.lecture.slot_number}`}
                </p>
                {!isLectureUnlocked(nextUp.lecture) && (
                  <p className="mt-2 flex items-center gap-2 text-sm text-amber-300">
                    <Clock className="size-4 shrink-0" />
                    {(() => {
                      const date = getDripUnlockDate(
                        nextUp.lecture.level_id,
                        nextUp.lecture.slot_number,
                      );
                      return isAr
                        ? `يفتح في ${date?.toLocaleDateString()}`
                        : `Unlocks ${date?.toLocaleDateString()}`;
                    })()}
                  </p>
                )}
              </div>
              {isLectureUnlocked(nextUp.lecture) ? (
                <Button
                  asChild
                  size="lg"
                  className="h-12 shrink-0 rounded-xl bg-blue-600 px-8 text-base font-semibold hover:bg-blue-500"
                >
                  <Link to="/lecture/$lectureId" params={{ lectureId: nextUp.lecture.id }}>
                    <Play className="size-4" />
                    {isAr ? "متابعة التعلم" : "Continue learning"}
                  </Link>
                </Button>
              ) : (
                <Button
                  disabled
                  size="lg"
                  variant="outline"
                  className="h-12 shrink-0 rounded-xl border-white/15 bg-white/5 text-zinc-400"
                >
                  <Lock className="size-4" />
                  {isAr ? "مقفل" : "Locked"}
                </Button>
              )}
            </div>
          </motion.section>
        )}

        {accessibleLevels.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-12 text-center">
            <Lock className="mx-auto mb-4 size-10 text-zinc-500" />
            <h2 className="text-xl font-bold">
              {isAr ? "لا توجد مستويات متاحة" : "No levels available yet"}
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              {isAr
                ? "قد تحتاج لتفعيل حسابك أو انتظار فتح الوحدات."
                : "Your account may need approval, or new modules are on the way."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[280px_1fr]">
            {/* Sidebar outline — Coursera-style */}
            <aside className="lg:sticky lg:top-24">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <h3 className="mb-4 text-sm font-semibold text-zinc-300">
                  {isAr ? "محتوى المسار" : "Course content"}
                </h3>
                <nav className="space-y-1">
                  {sortedAccessibleLevels.map((level) => {
                    const levelLectures = getLevelLectures(level.id);
                    const completedCount = levelLectures.filter((lec) =>
                      progress.includes(lec.id),
                    ).length;
                    const pct = levelLectures.length
                      ? Math.round((completedCount / levelLectures.length) * 100)
                      : 0;
                    const isActive = activeLevelId === level.id;
                    const isDone =
                      levelLectures.length > 0 &&
                      completedCount === levelLectures.length;

                    return (
                      <button
                        key={level.id}
                        type="button"
                        onClick={() => scrollToLevel(level.id)}
                        className={cn(
                          "flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left transition-colors",
                          isActive
                            ? "bg-blue-500/15 text-white"
                            : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200",
                        )}
                      >
                        <div
                          className={cn(
                            "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border",
                            isDone
                              ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-400"
                              : isActive
                                ? "border-blue-400/40 bg-blue-500/20 text-blue-300"
                                : "border-white/10 bg-white/[0.04]",
                          )}
                        >
                          {isDone ? (
                            <CheckCircle2 className="size-3.5" />
                          ) : (
                            <span className="text-xs font-bold">
                              {level.level_order}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium leading-snug">
                            {level.title}
                          </p>
                          <p className="mt-0.5 text-xs text-zinc-500">
                            {completedCount}/{levelLectures.length}{" "}
                            {isAr ? "مكتمل" : "done"} · {pct}%
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Main modules */}
            <div className="space-y-8">
              {sortedAccessibleLevels.map((level) => {
                const levelLectures = getLevelLectures(level.id);
                const hasExam = exams.some((e) => e.level_id === level.id);
                const completedCount = levelLectures.filter((l) =>
                  progress.includes(l.id),
                ).length;
                const levelPct = levelLectures.length
                  ? Math.round((completedCount / levelLectures.length) * 100)
                  : 0;

                return (
                  <section
                    key={level.id}
                    id={`level-${level.id}`}
                    className="scroll-mt-28 rounded-3xl border border-white/10 bg-white/[0.04] overflow-hidden"
                  >
                    {/* Module header */}
                    <div className="border-b border-white/10 p-6 md:p-8">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                          <span className="text-xs font-medium uppercase tracking-wider text-blue-300">
                            {isAr ? "الوحدة" : "Module"}{" "}
                            {String(level.level_order).padStart(2, "0")}
                          </span>
                          <h2 className="mt-1 text-2xl font-bold md:text-3xl">
                            {level.title}
                          </h2>
                          <p className="mt-2 text-sm text-zinc-400">
                            {completedCount} {isAr ? "من" : "of"}{" "}
                            {levelLectures.length}{" "}
                            {isAr ? "درس مكتمل" : "lessons completed"}
                          </p>
                        </div>
                        <div className="w-full md:w-48">
                          <div className="mb-1.5 flex justify-between text-xs text-zinc-400">
                            <span>{isAr ? "التقدم" : "Progress"}</span>
                            <span className="font-medium text-blue-200">
                              {levelPct}%
                            </span>
                          </div>
                          <Progress value={levelPct} className="h-1.5 bg-white/10" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_240px]">
                      {/* Lesson list */}
                      <div className="divide-y divide-white/[0.06]">
                        {levelLectures.map((lecture, index) => {
                          const isCompleted = progress.includes(lecture.id);
                          const isUnlocked = isLectureUnlocked(lecture);
                          const unlockDate = getDripUnlockDate(
                            lecture.level_id,
                            lecture.slot_number,
                          );
                          const isCurrent =
                            nextUp?.lecture.id === lecture.id && isUnlocked;

                          const rowContent = (
                            <>
                              <div
                                className={cn(
                                  "flex size-8 shrink-0 items-center justify-center rounded-full",
                                  !isUnlocked
                                    ? "bg-white/[0.04] text-zinc-600"
                                    : isCompleted
                                      ? "bg-emerald-500/15 text-emerald-400"
                                      : isCurrent
                                        ? "bg-blue-500/20 text-blue-300"
                                        : "bg-white/[0.06] text-zinc-400",
                                )}
                              >
                                {!isUnlocked ? (
                                  <Lock className="size-3.5" />
                                ) : isCompleted ? (
                                  <CheckCircle2 className="size-4" />
                                ) : (
                                  <Circle className="size-3.5" />
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="text-xs text-zinc-500">
                                    {index + 1}.
                                  </span>
                                  <p
                                    className={cn(
                                      "truncate font-medium",
                                      !isUnlocked && "text-zinc-500",
                                      isCurrent && "text-blue-100",
                                    )}
                                  >
                                    {lecture.title}
                                  </p>
                                  {lecture.is_big_exam && (
                                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/20 bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-200">
                                      <GraduationCap className="size-3" />
                                      {isAr ? "اختبار" : "Exam"}
                                    </span>
                                  )}
                                </div>
                                <p className="mt-0.5 text-xs text-zinc-500">
                                  {!isUnlocked
                                    ? unlockDate
                                      ? isAr
                                        ? `يفتح ${unlockDate.toLocaleDateString()}`
                                        : `Unlocks ${unlockDate.toLocaleDateString()}`
                                      : isAr
                                        ? "أكمل الدرس السابق أولاً"
                                        : "Complete the previous lesson first"
                                    : isCompleted
                                      ? isAr
                                        ? "مكتمل"
                                        : "Completed"
                                      : lecture.is_live === false
                                        ? isAr
                                          ? "مسودة"
                                          : "Draft"
                                        : isAr
                                          ? "جاهز للبدء"
                                          : "Ready to start"}
                                </p>
                              </div>
                              {isUnlocked && (
                                <ChevronRight className="size-4 shrink-0 text-zinc-600 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-300" />
                              )}
                            </>
                          );

                          if (isUnlocked) {
                            return (
                              <Link
                                key={lecture.id}
                                to="/lecture/$lectureId"
                                params={{ lectureId: lecture.id }}
                                className={cn(
                                  "group flex items-center gap-4 px-6 py-4 transition-colors",
                                  isCurrent
                                    ? "bg-blue-500/10 hover:bg-blue-500/15"
                                    : isCompleted
                                      ? "hover:bg-white/[0.03]"
                                      : "hover:bg-white/[0.04]",
                                )}
                              >
                                {rowContent}
                              </Link>
                            );
                          }

                          return (
                            <div
                              key={lecture.id}
                              className="flex items-center gap-4 px-6 py-4 opacity-60"
                              aria-disabled
                            >
                              {rowContent}
                            </div>
                          );
                        })}
                      </div>

                      {/* Actions sidebar */}
                      <div className="space-y-4 border-t border-white/10 p-6 lg:border-t-0 lg:border-l">
                        <div>
                          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                            {isAr ? "غرفة الصف" : "Classroom"}
                          </p>
                          <Button
                            asChild
                            variant="outline"
                            className="w-full justify-center rounded-xl border-white/15 bg-white/[0.04] text-white hover:bg-white/10"
                          >
                            <Link
                              to="/levels/classroom/$levelId"
                              params={{ levelId: level.id }}
                            >
                              <MessageSquare className="size-4" />
                              {isAr ? "انضم للنقاش" : "Join discussion"}
                            </Link>
                          </Button>
                          <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                            {isAr
                              ? "شارك أسئلة وملفات مع زملائك."
                              : "Ask questions and share files with classmates."}
                          </p>
                        </div>

                        {hasExam && (
                          <div>
                            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                              {isAr ? "الاختبار" : "Final exam"}
                            </p>
                            <Button
                              asChild
                              className="w-full justify-center rounded-xl bg-blue-600 hover:bg-blue-500"
                            >
                              <Link
                                to="/exam/$levelId"
                                params={{ levelId: level.id }}
                              >
                                <GraduationCap className="size-4" />
                                {isAr ? "بدء الاختبار" : "Take exam"}
                              </Link>
                            </Button>
                          </div>
                        )}

                        {(() => {
                          const firstOpen = levelLectures.find(
                            (l) =>
                              isLectureUnlocked(l) && !progress.includes(l.id),
                          );
                          if (!firstOpen) return null;
                          return (
                            <Button
                              asChild
                              size="sm"
                              className="w-full rounded-xl bg-blue-600/80 hover:bg-blue-500"
                            >
                              <Link
                                to="/lecture/$lectureId"
                                params={{ lectureId: firstOpen.id }}
                              >
                                <ArrowRight className="size-4" />
                                {isAr ? "ابدأ الوحدة" : "Start module"}
                              </Link>
                            </Button>
                          );
                        })()}
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
