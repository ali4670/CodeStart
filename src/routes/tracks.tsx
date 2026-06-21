import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Code2,
  Database,
  LockKeyhole,
  Shield,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/tracks")({
  component: TracksPage,
});

const tracks = [
  {
    title: "Software Engineering",
    icon: Code2,
    stage: "Beginner to portfolio-ready",
    outcome: "Build apps, dashboards, APIs, and a final project students can show in interviews.",
    stack: ["Python", "HTML/CSS", "JavaScript", "React", "Git"],
    milestones: ["Python foundations", "Responsive web UI", "Full project shipping"],
  },
  {
    title: "AI Builder",
    icon: BrainCircuit,
    stage: "Math-light, project-first",
    outcome: "Use Python, data, prompts, and model APIs to build useful study and automation tools.",
    stack: ["Python", "Data", "Prompting", "APIs", "Evaluation"],
    milestones: ["Data basics", "Prompt systems", "AI study assistant"],
  },
  {
    title: "Cybersecurity Foundations",
    icon: Shield,
    stage: "Safe lab only",
    outcome: "Understand networks, Linux, web security basics, and ethical defensive thinking.",
    stack: ["Linux", "Networking", "Web Security", "CTF", "Reports"],
    milestones: ["Linux commands", "HTTP basics", "Defensive reports"],
  },
  {
    title: "Data Science",
    icon: Database,
    stage: "Analysis and storytelling",
    outcome: "Turn CSV files into charts, insights, and clear decisions using Python notebooks.",
    stack: ["Python", "Pandas", "Charts", "Statistics", "Projects"],
    milestones: ["Clean tables", "Visualize trends", "Explain findings"],
  },
];

const roadmap = ["Foundation", "Practice", "Classroom", "Exam", "Project"];

function TracksPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0A0A0F] px-6 py-16 text-white">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[52rem] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[120px]" />
      <section className="relative mx-auto max-w-7xl pt-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-2 text-sm text-blue-100">
              <Sparkles className="size-4" /> Roadmaps with order, not chaos
            </div>
            <h1 className="mt-6 max-w-5xl text-5xl font-black tracking-tight md:text-7xl">
              Choose the track that turns study time into visible skill.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">
              Each track connects lessons, classroom discussion, quizzes, and projects into one progression. Students move through prerequisites instead of bouncing between random playlists.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-blue-950/20">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-blue-300">Route model</p>
            <div className="mt-5 space-y-3">
              {roadmap.map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-zinc-300">
                  <span className="flex size-7 items-center justify-center rounded-full bg-blue-500/15 text-xs font-black text-blue-200">{index + 1}</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {tracks.map((track, index) => {
            const Icon = track.icon;
            return (
              <article key={track.title} className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/35 hover:bg-white/[0.06]">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex size-13 items-center justify-center rounded-2xl border border-blue-400/25 bg-blue-500/10 text-blue-200">
                    <Icon className="size-6" />
                  </div>
                  <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-zinc-400">Track {index + 1}</span>
                </div>
                <h2 className="mt-6 text-3xl font-black tracking-tight">{track.title}</h2>
                <p className="mt-2 text-sm font-semibold text-blue-200">{track.stage}</p>
                <p className="mt-4 leading-7 text-zinc-400">{track.outcome}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {track.stack.map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-300">{item}</span>
                  ))}
                </div>
                <div className="mt-6 grid gap-2">
                  {track.milestones.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-zinc-300">
                      <CheckCircle2 className="size-4 text-emerald-300" />
                      {item}
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        <section className="mt-12 rounded-[2rem] border border-amber-400/20 bg-amber-500/10 p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-200"><LockKeyhole className="size-5" /> Level access stays controlled</div>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-300">Students start with the first level, then unlock deeper material through completion, quizzes, and classroom work. This keeps the path focused and prevents skipping foundations.</p>
            </div>
            <Button asChild className="h-12 shrink-0 rounded-xl bg-blue-600 px-6 hover:bg-blue-500">
              <Link to="/levels">Open learning path <ArrowRight className="size-4" /></Link>
            </Button>
          </div>
        </section>
      </section>
    </main>
  );
}
