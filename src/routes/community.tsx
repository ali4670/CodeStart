import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageSquare, ShieldCheck, Trophy, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/community")({
  component: CommunityPage,
});

const rituals = [
  { title: "Weekly problem room", icon: Zap, text: "Students solve one focused challenge together, then compare approaches." },
  { title: "Classroom questions", icon: MessageSquare, text: "Every level has a discussion room attached to the actual lessons." },
  { title: "Ranked consistency", icon: Trophy, text: "XP and streaks reward progress, not noisy social posting." },
  { title: "Study crews", icon: Users, text: "Small peer groups keep Thanaweya students accountable during busy weeks." },
];

const spaces = ["Level classrooms", "Weekly drills", "Leaderboard rituals", "Parent visibility"];

function CommunityPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0A0A0F] px-6 py-16 text-white">
      <div className="pointer-events-none absolute left-10 top-28 h-72 w-72 rounded-full bg-violet-500/10 blur-[100px]" />
      <section className="relative mx-auto max-w-7xl pt-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-4 py-2 text-sm text-violet-100">
              <Users className="size-4" /> Community layer
            </div>
            <h1 className="mt-6 text-5xl font-black tracking-tight md:text-7xl">A learning community built around momentum.</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">
              CodeStart keeps community close to the curriculum: classroom discussion, mentor feedback, weekly challenges, and progress rituals that help serious students continue when school pressure rises.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-300">Live spaces</p>
            <div className="mt-5 space-y-3 text-sm text-zinc-300">
              {spaces.map((space) => (
                <div key={space} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <ShieldCheck className="size-4 text-emerald-300" />
                  {space}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {rituals.map((ritual) => {
            const Icon = ritual.icon;
            return (
              <article key={ritual.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:bg-white/[0.06]">
                <Icon className="size-6 text-blue-300" />
                <h2 className="mt-5 text-xl font-black">{ritual.title}</h2>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{ritual.text}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col gap-3 rounded-[2rem] border border-blue-400/20 bg-blue-500/10 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-7 text-zinc-300">Jump into the real classroom rooms from the learning path once your level is available.</p>
          <Button asChild className="h-12 rounded-xl bg-blue-600 px-6 hover:bg-blue-500">
            <Link to="/levels">Open classrooms <ArrowRight className="size-4" /></Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
