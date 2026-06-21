import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Award, BookOpen, ChevronLeft, Clock3, PlayCircle, Star, Users, X } from "lucide-react";
import { getCourseById } from "@/lib/mock-courses";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CourseLesson } from "@/types/codestart";

export const Route = createFileRoute("/courses/$courseId")({
  component: CourseReviewPage,
});

function CourseReviewPage() {
  const { courseId } = Route.useParams();
  const course = getCourseById(courseId);
  const navigate = useNavigate();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewLesson, setPreviewLesson] = useState<CourseLesson | null>(null);

  if (!course) {
    return (
      <main className="min-h-screen bg-[#0A0A0F] px-6 py-24 text-white">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-10">
          <h1 className="text-4xl font-black">Course not found</h1>
          <p className="mt-4 text-zinc-400">This course review page is not available yet.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0A0A0F] px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <Link to="/courses" className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white">
          <ChevronLeft className="size-4" /> Back to courses
        </Link>
        <section className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <div className="mb-4 inline-flex items-center rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-100">
              {course.track}
            </div>
            <h1 className="text-4xl font-black tracking-tight md:text-6xl">{course.title}</h1>
            <p className="mt-4 text-lg text-zinc-300">{course.subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-5 text-sm text-zinc-400">
              <span className="inline-flex items-center gap-2">
                <Star className="size-4 text-amber-300" /> {course.rating} rating
              </span>
              <span className="inline-flex items-center gap-2">
                <Users className="size-4 text-blue-300" /> {course.enrolled}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="size-4 text-emerald-300" /> {course.durationHours} hours
              </span>
              <span className="inline-flex items-center gap-2">
                <Award className="size-4 text-violet-300" /> {course.certificate ? "Certificate included" : "No certificate"}
              </span>
            </div>
            <img src={course.heroImage} alt={course.title} className="mt-8 h-[320px] w-full rounded-[2rem] object-cover shadow-2xl shadow-black/40" />
          </div>
          <aside className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-xl shadow-black/30">
            <h2 className="text-2xl font-black">Material review</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Review the structure before starting, just like strong course pages on Coursera or freeCodeCamp: outcomes, modules, projects, and the actual rhythm of the material.
            </p>
            <div className="mt-6 space-y-4">
              <InfoRow label="Instructor" value={course.instructor} />
              <InfoRow label="Language" value={course.language} />
              <InfoRow label="Level" value={course.level} />
              <InfoRow label="Lessons" value={`${course.lessonsCount} lessons`} />
            </div>
            <Button
              className="mt-8 h-12 w-full rounded-xl bg-blue-600 text-base hover:bg-blue-500"
              onClick={() => navigate({ to: "/levels" })}
            >
              Start learning
            </Button>
            <Button
              variant="outline"
              className="mt-3 h-12 w-full rounded-xl border-white/15 bg-transparent text-white hover:bg-white/10"
              onClick={() => {
                const firstLesson = course.modules[0]?.lessons[0];
                if (firstLesson) {
                  setPreviewLesson(firstLesson);
                  setPreviewOpen(true);
                }
              }}
            >
              Preview first module
            </Button>
          </aside>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-8">
            <Panel title="What you will learn">
              <ul className="space-y-3 text-sm text-zinc-300">
                {course.whatYouLearn.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 size-2 rounded-full bg-blue-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </Panel>
            <Panel title="Projects you will build">
              <ul className="space-y-3 text-sm text-zinc-300">
                {course.projects.map((item) => (
                  <li key={item} className="flex gap-3">
                    <PlayCircle className="mt-0.5 size-4 text-emerald-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </Panel>
            <Panel title="Tools and concepts">
              <div className="flex flex-wrap gap-3">
                {course.tools.map((tool) => (
                  <span key={tool} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-300">
                    {tool}
                  </span>
                ))}
              </div>
            </Panel>
          </div>
          <Panel title="Course content and material breakdown">
            <div className="space-y-5">
              {course.modules.map((module, moduleIndex) => (
                <ModuleItem key={module.id} module={module} index={moduleIndex} />
              ))}
            </div>
          </Panel>
        </section>

        <PreviewModal lesson={previewLesson} open={previewOpen} onClose={() => setPreviewOpen(false)} />
      </div>
    </main>
  );
}

function ModuleItem({ module, index }: { module: { id: string; title: string; summary: string; lessons: CourseLesson[] }; index: number }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-300">Module {index + 1}</p>
          <h3 className="mt-2 text-xl font-black">{module.title}</h3>
          <p className="mt-2 text-sm leading-6 text-zinc-400">{module.summary}</p>
        </div>
        <div className="text-right text-xs text-zinc-500">{module.lessons.length} lessons</div>
      </div>
      <div className="mt-5 space-y-4">
        {module.lessons.map((lesson, lessonIndex) => (
          <LessonItem key={lesson.id} lesson={lesson} index={lessonIndex} />
        ))}
      </div>
    </div>
  );
}

function LessonItem({ lesson, index }: { lesson: CourseLesson; index: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-white">
            {index + 1}. {lesson.title}
          </div>
          <div className="mt-2 text-sm leading-6 text-zinc-400">{lesson.preview}</div>
        </div>
        <div className="shrink-0 text-right text-xs text-zinc-500">
          <div className="capitalize">{lesson.type}</div>
          <div className="mt-1">{lesson.durationMinutes} min</div>
        </div>
      </div>
      <div className="mt-4">
        <Progress value={Math.min(100, 30 + index * 18)} className="h-2 bg-white/10" />
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-xl shadow-black/20">
      <h2 className="text-2xl font-black">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function PreviewModal({ lesson, open, onClose }: { lesson: CourseLesson | null; open: boolean; onClose: () => void }) {
  if (!lesson) return null;
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative mx-auto max-w-2xl rounded-3xl border border-white/10 bg-[#0A0A0F] p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20">
              <X className="w-5 h-5" />
            </button>
            <div className="mb-4 inline-flex items-center rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-100">
              Module Preview
            </div>
            <h3 className="text-2xl font-black mb-3">{lesson.title}</h3>
            <div className="text-zinc-300 mb-6">{lesson.preview}</div>
            <div className="flex items-center gap-4 text-sm text-zinc-400">
              <span className="flex items-center gap-2">
                <Clock3 className="w-4 h-4" /> {lesson.durationMinutes} min
              </span>
              <span className="capitalize">{lesson.type}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 text-sm">
      <span className="text-zinc-500">{label}</span>
      <span className="text-right text-zinc-200">{value}</span>
    </div>
  );
}