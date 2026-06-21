import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock3, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockCourses } from "@/lib/mock-courses";

export const Route = createFileRoute("/courses")({
  component: CoursesPage,
});

function CoursesPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-100">
            Course library
          </div>
          <h1 className="mt-6 text-5xl font-black tracking-tight md:text-7xl">Review the material before you start.</h1>
          <p className="mt-5 text-lg leading-8 text-zinc-400">
            Explore CodeStart courses with the same clarity students expect from polished learning platforms: what you will learn, how the material is structured, and what projects prove you understood it.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {mockCourses.map((course) => (
            <article key={course.id} className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] shadow-xl shadow-black/25 transition hover:-translate-y-1">
              <img src={course.heroImage} alt={course.title} className="h-52 w-full object-cover" />
              <div className="p-6">
                <div className="mb-4 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-blue-100">{course.track}</span>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-zinc-300 capitalize">{course.level}</span>
                </div>
                <h2 className="text-2xl font-black tracking-tight">{course.title}</h2>
                <p className="mt-3 min-h-20 text-sm leading-6 text-zinc-400">{course.description}</p>
                <div className="mt-5 flex flex-wrap gap-4 text-sm text-zinc-400">
                  <span className="inline-flex items-center gap-2"><Star className="size-4 text-amber-300" /> {course.rating}</span>
                  <span className="inline-flex items-center gap-2"><Users className="size-4 text-blue-300" /> {course.enrolled}</span>
                  <span className="inline-flex items-center gap-2"><Clock3 className="size-4 text-emerald-300" /> {course.durationHours}h</span>
                </div>
                <div className="mt-6 flex gap-3">
                  <Button asChild className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-500">
                    <Link to="/courses/$courseId" params={{ courseId: course.id }}>Review course</Link>
                  </Button>
                  <Button variant="outline" className="rounded-xl border-white/15 bg-transparent text-white hover:bg-white/10">Preview</Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
