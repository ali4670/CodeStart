import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { supabase } from "../lib/supabase-code";
import { useLanguage } from "../lib/LanguageContext";
import { useAuth } from "../hooks/use-auth";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Lock,
  FileDown,
  Check,
  Copy,
  BookOpen,
  Circle,
  List,
  X,
  Gauge,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LectureExam } from "../components/LectureExam";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/lecture/$lectureId")({
  component: LecturePage,
});

interface ContentBlock {
  id: string;
  type:
    | "text"
    | "code"
    | "image"
    | "pdf"
    | "download"
    | "word"
    | "canvas"
    | "quiz";
  content: string;
  metadata?: {
    filename?: string;
    filesize?: string;
    quiz?: {
      question: string;
      options: string[];
      correctOptionIndex: number;
    };
  };
}

interface Lecture {
  id: string;
  title: string;
  description: string;
  video_url: string;
  level_id: string;
  slot_number: number;
  content_blocks?: ContentBlock[];
  quiz_data?: unknown[];
  is_big_exam?: boolean;
}

interface SiblingLecture {
  id: string;
  title: string;
  slot_number: number;
}

function WordDocumentViewer({ url }: { url: string }) {
  const [html, setHtml] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import("mammoth").then((mammoth) => {
      fetch(url)
        .then((res) => res.arrayBuffer())
        .then((arrayBuffer) => mammoth.convertToHtml({ arrayBuffer }))
        .then((result) => {
          setHtml(result.value);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    });
  }, [url]);

  if (loading)
    return <p className="text-sm text-zinc-500">Loading document…</p>;
  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className="prose prose-invert max-w-none prose-p:text-zinc-300 prose-headings:text-white"
    />
  );
}

function CodeBlock({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(content);
      setCopied(true);
      toast.success("Code copied");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-white/10 bg-[#1a1a24]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="font-mono text-xs text-zinc-500">code</span>
        <button
          type="button"
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs text-zinc-400 transition hover:bg-white/10 hover:text-white"
        >
          {copied ? (
            <Check className="size-3.5" />
          ) : (
            <Copy className="size-3.5" />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="font-mono text-emerald-300">{content}</code>
      </pre>
    </div>
  );
}

function ContentRenderer({
  block,
  onQuizAnswer,
  quizAnswers,
  quizStatus,
}: {
  block: ContentBlock;
  onQuizAnswer: (id: string, idx: number, correct: number) => void;
  quizAnswers: Record<string, number>;
  quizStatus: Record<string, "correct" | "incorrect">;
}) {
  if (!block?.type) return null;

  try {
    switch (block.type) {
      case "text":
        return (
          <p className="whitespace-pre-wrap text-base leading-8 text-zinc-300">
            {block.content}
          </p>
        );
      case "code":
        return <CodeBlock content={block.content} />;
      case "image":
        return (
          <img
            src={block.content}
            className="w-full rounded-2xl border border-white/10"
            alt=""
          />
        );
      case "pdf":
        return (
          <iframe
            src={block.content}
            className="h-[600px] w-full rounded-2xl border border-white/10"
            title="PDF"
          />
        );
      case "download":
        return (
          <a
            href={block.content}
            download
            className="flex items-center gap-4 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-5 text-blue-200 transition hover:bg-blue-500/15"
          >
            <FileDown className="size-8 shrink-0" />
            <div>
              <p className="font-semibold">
                {block.metadata?.filename || "Download file"}
              </p>
              {block.metadata?.filesize && (
                <p className="text-xs text-zinc-500">{block.metadata.filesize}</p>
              )}
            </div>
          </a>
        );
      case "canvas":
        return (
          <iframe
            src={block.content}
            className="h-[500px] w-full rounded-2xl border border-white/10"
            title="Interactive content"
          />
        );
      case "word":
        return <WordDocumentViewer url={block.content} />;
      case "quiz":
        if (!block.metadata?.quiz) return null;
        return (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="mb-4 font-semibold text-white">
              {block.metadata.quiz.question}
            </p>
            <div className="space-y-2">
              {block.metadata.quiz.options.map((opt, idx) => {
                const answered = quizAnswers[block.id] === idx;
                const status = quizStatus[block.id];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() =>
                      onQuizAnswer(
                        block.id,
                        idx,
                        block.metadata!.quiz!.correctOptionIndex,
                      )
                    }
                    className={cn(
                      "w-full rounded-xl border p-3.5 text-left text-sm transition",
                      answered && status === "correct"
                        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
                        : answered && status === "incorrect"
                          ? "border-red-500/40 bg-red-500/10 text-red-200"
                          : "border-white/10 bg-white/[0.03] text-zinc-300 hover:bg-white/[0.06]",
                    )}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        );
      default:
        return (
          <div className="rounded-xl border border-dashed border-white/10 p-4 text-sm text-zinc-500">
            Unsupported block type: {block.type}
          </div>
        );
    }
  } catch (e) {
    console.error("Error rendering block:", e);
    return (
      <div className="rounded-xl border border-red-500/30 p-4 text-sm text-red-400">
        Error rendering content
      </div>
    );
  }
}

function LecturePage() {
  const { lectureId } = Route.useParams();
  const { isAr } = useLanguage();
  const { user, profile, isAdmin, isModerator, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [lecture, setLecture] = useState<Lecture | null>(null);
  const [levelTitle, setLevelTitle] = useState("");
  const [siblingLectures, setSiblingLectures] = useState<SiblingLecture[]>([]);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [nextLectureId, setNextLectureId] = useState<string | null>(null);
  const [prevLectureId, setPrevLectureId] = useState<string | null>(null);
  const [isExamOpen, setIsExamOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isVideoFinished, setIsVideoFinished] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentScrollRef = useRef<HTMLDivElement>(null);

  const isEmbedVideo = useMemo(
    () =>
      !!lecture?.video_url &&
      (lecture.video_url.includes("youtube.com") ||
        lecture.video_url.includes("youtu.be")),
    [lecture?.video_url],
  );

  const videoBlocksCompletion = !!lecture?.video_url && !isEmbedVideo;

  const fetchLecture = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("lectures")
        .select("*")
        .eq("id", lectureId)
        .single();

      if (error) throw error;
      if (!data) throw new Error("Lecture not found");
      setLecture(data);

      const [levelRes, siblingsRes] = await Promise.all([
        supabase.from("levels").select("title").eq("id", data.level_id).single(),
        supabase
          .from("lectures")
          .select("id, title, slot_number")
          .eq("level_id", data.level_id)
          .order("slot_number", { ascending: true }),
      ]);

      setLevelTitle(levelRes.data?.title || "");
      const siblings = siblingsRes.data || [];
      setSiblingLectures(siblings);

      const idx = siblings.findIndex((l) => l.id === lectureId);
      setPrevLectureId(idx > 0 ? siblings[idx - 1].id : null);
      setNextLectureId(
        idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1].id : null,
      );

      if (user) {
        const [progressRes, levelAccessRes, canAccessRes, allProgressRes] =
          await Promise.all([
            supabase
              .from("student_progress")
              .select("*")
              .eq("student_id", user.id)
              .eq("lecture_id", lectureId)
              .maybeSingle(),
            supabase
              .from("level_access")
              .select("level_id")
              .eq("user_id", user.id)
              .eq("level_id", data.level_id),
            supabase.rpc("can_student_access_level", {
              u_id: user.id,
              target_level_id: data.level_id,
            }),
            supabase
              .from("student_progress")
              .select("lecture_id")
              .eq("student_id", user.id)
              .in(
                "lecture_id",
                siblings.map((l) => l.id),
              ),
          ]);

        setIsCompleted(!!progressRes.data);
        setCompletedIds(
          (allProgressRes.data || []).map((p) => p.lecture_id),
        );

        const manual = !!(levelAccessRes.data && levelAccessRes.data.length > 0);
        if (!manual && canAccessRes.data !== true && !isAdmin && !isModerator) {
          navigate({ to: "/levels" });
          return;
        }
      }
    } catch {
      navigate({ to: "/levels" });
    } finally {
      setLoading(false);
    }
  }, [lectureId, user, isAdmin, isModerator, navigate]);

  useEffect(() => {
    fetchLecture();
    setIsVideoFinished(false);
    setHasScrolledToEnd(false);
    setReadingProgress(0);
  }, [lectureId, fetchLecture]);

  useEffect(() => {
    if (isEmbedVideo) setIsVideoFinished(true);
  }, [isEmbedVideo]);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentScrollRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } =
        contentScrollRef.current;
      const scrollable = scrollHeight - clientHeight;
      const progress = scrollable > 0 ? Math.min(100, Math.round((scrollTop / scrollable) * 100)) : 100;
      setReadingProgress(progress);
      if (scrollHeight - scrollTop <= clientHeight + 80) {
        setHasScrolledToEnd(true);
      }
    };

    const el = contentScrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", handleScroll);
    handleScroll();
    if (el.scrollHeight <= el.clientHeight) {
      setHasScrolledToEnd(true);
      setReadingProgress(100);
    }

    return () => el.removeEventListener("scroll", handleScroll);
  }, [lecture, loading]);

  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizStatus, setQuizStatus] = useState<
    Record<string, "correct" | "incorrect">
  >({});

  const handleQuizAnswer = (blockId: string, idx: number, correct: number) => {
    setQuizAnswers((p) => ({ ...p, [blockId]: idx }));
    setQuizStatus((p) => ({
      ...p,
      [blockId]: idx === correct ? "correct" : "incorrect",
    }));
  };

  const handleVideoEnded = () => {
    setIsVideoFinished(true);
    toast.success(
      isAr ? "اكتمل الفيديو!" : "Video completed — you can mark this lesson done.",
    );
  };

  const canMarkComplete =
    isCompleted ||
    isAdmin ||
    isModerator ||
    (hasScrolledToEnd && (!videoBlocksCompletion || isVideoFinished));

  const handleCompleteRequest = () => {
    if (!hasScrolledToEnd && !isAdmin && !isModerator) {
      toast.error(
        isAr ? "اقرأ الدرس حتى النهاية أولاً" : "Scroll to the end of the lesson first",
      );
      return;
    }
    if (videoBlocksCompletion && !isVideoFinished && !isAdmin && !isModerator) {
      toast.error(isAr ? "أنهِ الفيديو أولاً" : "Finish watching the video first");
      return;
    }

    if (lecture?.quiz_data && (lecture.quiz_data as unknown[]).length > 0 && !isCompleted) {
      setIsExamOpen(true);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    if (!user) {
      toast.error(isAr ? "سجل الدخول لحفظ تقدمك" : "Sign in to save your progress");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error: rpcError } = await supabase.rpc("complete_lecture_secure", {
        p_lecture_id: lectureId,
      });
      if (rpcError) throw rpcError;

      await supabase
        .from("profiles")
        .update({
          xp: (profile?.xp || 0) + 50,
          score: (profile?.score || 0) + 10,
        })
        .eq("id", user?.id);

      setIsCompleted(true);
      setCompletedIds((prev) =>
        prev.includes(lectureId) ? prev : [...prev, lectureId],
      );
      refreshProfile();
      toast.success(
        isAr ? "تم إكمال الدرس! +50 XP" : "Lesson complete! +50 XP earned",
      );
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const moduleProgress = siblingLectures.length
    ? Math.round((completedIds.length / siblingLectures.length) * 100)
    : 0;

  const embedUrl = useMemo(() => {
    if (!lecture?.video_url) return "";
    const url = lecture.video_url;
    if (url.includes("youtube.com/watch?v=")) {
      return url.replace("watch?v=", "embed/").split("&")[0];
    }
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0];
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }
    return url;
  }, [lecture?.video_url]);

  if (loading || !lecture) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0A0F]">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="border-b border-white/10 p-5">
        <Link
          to="/levels"
          className="mb-4 inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
        >
          <ArrowLeft className="size-4" />
          {isAr ? "العودة للمسار" : "Back to path"}
        </Link>
        <p className="text-xs font-medium uppercase tracking-wider text-blue-300">
          {levelTitle}
        </p>
        <p className="mt-1 text-sm font-semibold text-white">
          {isAr ? "محتوى الوحدة" : "Module content"}
        </p>
        <div className="mt-3">
          <div className="mb-1 flex justify-between text-xs text-zinc-500">
            <span>{isAr ? "التقدم" : "Progress"}</span>
            <span className="text-blue-200">{moduleProgress}%</span>
          </div>
          <Progress value={moduleProgress} className="h-1.5 bg-white/10" />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        {siblingLectures.map((sib, index) => {
          const done = completedIds.includes(sib.id);
          const current = sib.id === lectureId;
          return (
            <Link
              key={sib.id}
              to="/lecture/$lectureId"
              params={{ lectureId: sib.id }}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "mb-1 flex items-start gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                current
                  ? "bg-blue-500/15 text-white"
                  : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200",
              )}
            >
              <div
                className={cn(
                  "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full",
                  done
                    ? "bg-emerald-500/15 text-emerald-400"
                    : current
                      ? "bg-blue-500/20 text-blue-300"
                      : "bg-white/[0.06] text-zinc-500",
                )}
              >
                {done ? (
                  <CheckCircle2 className="size-3.5" />
                ) : (
                  <span className="text-[10px] font-bold">{index + 1}</span>
                )}
              </div>
              <span className="line-clamp-2 leading-snug">{sib.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div className="flex h-screen flex-col bg-[#0A0A0F] text-white">
      <LectureExam
        isOpen={isExamOpen}
        onClose={() => setIsExamOpen(false)}
        lectureId={lectureId}
        questions={(lecture.quiz_data as never[]) || []}
        isBigExam={lecture.is_big_exam}
        onPassed={() => {
          setIsExamOpen(false);
          handleComplete();
        }}
      />

      {/* Mobile outline toggle */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3 lg:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSidebarOpen(true)}
          className="rounded-xl border-white/15 bg-white/[0.04] text-zinc-300"
        >
          <List className="size-4" />
          {isAr ? "المحتوى" : "Outline"}
        </Button>
        <span className="truncate px-2 text-sm font-medium text-zinc-300">
          {lecture.title}
        </span>
        <div className="w-16" />
      </div>

      {/* Mobile sidebar drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Close outline"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[min(320px,85vw)] border-r border-white/10 bg-[#0A0A0F] shadow-2xl">
            <div className="flex justify-end p-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="rounded-lg p-2 text-zinc-400 hover:bg-white/10"
              >
                <X className="size-5" />
              </button>
            </div>
            {sidebar}
          </div>
        </div>
      )}

      <div className="flex min-h-0 flex-1">
        {/* Desktop sidebar — FCC curriculum panel */}
        <aside className="hidden w-72 shrink-0 flex-col border-r border-white/10 bg-white/[0.02] lg:flex">
          {sidebar}
        </aside>

        {/* Main lesson content */}
          <div className="flex min-h-0 flex-1 flex-col">
          <div className="h-1 bg-white/[0.04]">
            <motion.div
              className="h-full bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,0.65)]"
              animate={{ width: `${isCompleted ? 100 : readingProgress}%` }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div
            ref={contentScrollRef}
            className="flex-1 overflow-y-auto px-4 py-8 md:px-10 lg:px-12"
          >
            <div className="mx-auto max-w-3xl pb-24">
              <header className="mb-8">
                <div className="mb-3 inline-flex items-center rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-200">
                  {isAr ? "الدرس" : "Lesson"} {lecture.slot_number}
                  {isCompleted && (
                    <span className="ml-2 inline-flex items-center gap-1 text-emerald-300">
                      <CheckCircle2 className="size-3" />
                      {isAr ? "مكتمل" : "Done"}
                    </span>
                  )}
                </div>
                <motion.h1
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl font-bold leading-tight tracking-tight md:text-4xl"
                >
                  {lecture.title}
                </motion.h1>
                {lecture.description && (
                  <p className="mt-4 text-base leading-7 text-zinc-400">
                    {lecture.description}
                  </p>
                )}
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                    <Gauge className="mb-3 size-5 text-blue-300" />
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Reading</p>
                    <p className="mt-1 text-2xl font-black">{isCompleted ? 100 : readingProgress}%</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                    <BookOpen className="mb-3 size-5 text-emerald-300" />
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Lesson</p>
                    <p className="mt-1 text-sm font-semibold text-zinc-200">{hasScrolledToEnd ? "Reviewed" : "In progress"}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                    <Target className="mb-3 size-5 text-amber-300" />
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Unlock</p>
                    <p className="mt-1 text-sm font-semibold text-zinc-200">{canMarkComplete ? "Ready" : "Finish steps"}</p>
                  </div>
                </div>
              </header>

              {lecture.video_url && (
                <section className="mb-10">
                  <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-300">
                    <BookOpen className="size-4 text-blue-400" />
                    {isAr ? "فيديو الدرس" : "Lesson video"}
                  </h2>
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
                    {isEmbedVideo ? (
                      <div className="aspect-video">
                        <iframe
                          src={embedUrl}
                          className="h-full w-full"
                          allowFullScreen
                          title={lecture.title}
                        />
                      </div>
                    ) : (
                      <video
                        ref={videoRef}
                        src={lecture.video_url}
                        controls
                        className="aspect-video w-full"
                        onEnded={handleVideoEnded}
                      />
                    )}
                  </div>
                  {isEmbedVideo && (
                    <p className="mt-2 text-xs text-zinc-500">
                      {isAr
                        ? "شاهد الفيديو ثم أكمل قراءة الدرس أدناه."
                        : "Watch the video, then read through the lesson below."}
                    </p>
                  )}
                </section>
              )}

              {lecture.content_blocks && lecture.content_blocks.length > 0 && (
                <section className="mb-10 space-y-8">
                  <h2 className="text-sm font-semibold text-zinc-300">
                    {isAr ? "محتوى الدرس" : "Lesson content"}
                  </h2>
                  {lecture.content_blocks.map((block, i) => (
                    <motion.div
                      key={block.id || i}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                    >
                      <ContentRenderer
                        block={block}
                        onQuizAnswer={handleQuizAnswer}
                        quizAnswers={quizAnswers}
                        quizStatus={quizStatus}
                      />
                    </motion.div>
                  ))}
                </section>
              )}

            </div>
          </div>

          {/* Sticky bottom bar — FCC-style */}
          <footer className="shrink-0 border-t border-white/10 bg-[#0A0A0F]/95 px-4 py-4 backdrop-blur-md md:px-8">
            <div className="mx-auto flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5",
                    hasScrolledToEnd && "text-emerald-400",
                  )}
                >
                  {hasScrolledToEnd ? (
                    <CheckCircle2 className="size-3.5" />
                  ) : (
                    <Circle className="size-3.5" />
                  )}
                  {isAr ? "قراءة كاملة" : "Read lesson"}
                </span>
                {lecture.video_url && (
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5",
                      isVideoFinished && "text-emerald-400",
                    )}
                  >
                    {isVideoFinished ? (
                      <CheckCircle2 className="size-3.5" />
                    ) : (
                      <Circle className="size-3.5" />
                    )}
                    {isAr ? "الفيديو" : "Video"}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                {prevLectureId && (
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-xl border-white/15 bg-white/[0.04] text-zinc-300 hover:bg-white/10"
                  >
                    <Link
                      to="/lecture/$lectureId"
                      params={{ lectureId: prevLectureId }}
                    >
                      <ArrowLeft className="size-4" />
                      {isAr ? "السابق" : "Previous"}
                    </Link>
                  </Button>
                )}

                {isCompleted ? (
                  nextLectureId ? (
                    <Button
                      asChild
                      className="rounded-xl bg-blue-600 hover:bg-blue-500"
                    >
                      <Link
                        to="/lecture/$lectureId"
                        params={{ lectureId: nextLectureId }}
                      >
                        {isAr ? "الدرس التالي" : "Next lesson"}
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      asChild
                      className="rounded-xl bg-emerald-600 hover:bg-emerald-500"
                    >
                      <Link to="/levels">
                        {isAr ? "إنهاء الوحدة" : "Finish module"}
                        <CheckCircle2 className="size-4" />
                      </Link>
                    </Button>
                  )
                ) : (
                  <Button
                    onClick={handleCompleteRequest}
                    disabled={isSubmitting || !canMarkComplete}
                    className="rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40"
                  >
                    {isSubmitting
                      ? isAr
                        ? "جاري الحفظ…"
                        : "Saving…"
                      : (lecture.quiz_data as unknown[])?.length
                        ? isAr
                          ? "بدء الاختبار"
                          : "Take quiz"
                        : isAr
                          ? "إكمال الدرس"
                          : "Mark as complete"}
                    <ArrowRight className="size-4" />
                  </Button>
                )}
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
