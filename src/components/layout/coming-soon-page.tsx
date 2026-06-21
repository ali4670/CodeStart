import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const terminalLines: Record<string, string[]> = {
  Courses: [
    "fetch('/api/courses?track=software-engineering')",
    "loading Python, JavaScript, C++, Git...",
    "catalog preview ready for Thanaweya students",
  ],
  Tracks: [
    "buildRoadmap('AI + Software Engineering')",
    "link school schedule with coding milestones",
    "roadmap unlock sequence queued",
  ],
  Playground: [
    "boot CodeStart sandbox",
    "mount editor, console, test runner",
    "daily challenge environment warming up",
  ],
  Community: [
    "connect study groups across Egypt",
    "sync leaderboards, contests, friend missions",
    "community hub entering private beta",
  ],
};

export function ComingSoonPage({ title, description }: { title: string; description: string }) {
  const lines = terminalLines[title] ?? ["initialize CodeStart module", "compile premium learning path", "release soon"];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0A0A0F] px-6 py-20 text-white">
      <div className="pointer-events-none absolute left-1/2 top-16 size-[460px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="mx-auto grid max-w-6xl items-center gap-10 pt-12 lg:grid-cols-[0.9fr_1.1fr]">
        <section>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-100">
            <Sparkles className="size-4" /> CodeStart gateway
          </div>
          <h1 className="text-5xl font-black tracking-tight md:text-7xl">{title} is almost ready.</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-400">{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-12 rounded-xl bg-blue-600 px-6 hover:bg-blue-500">
              <Link to="/dashboard">Open Dashboard <ArrowRight className="size-4" /></Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-xl border-white/15 bg-transparent px-6 text-white hover:bg-white/10">
              <Link to="/">Back to Landing</Link>
            </Button>
          </div>
        </section>
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-4 shadow-2xl shadow-blue-950/30"
        >
          <div className="rounded-[1.5rem] border border-white/10 bg-black/60 p-5 font-mono">
            <div className="mb-5 flex items-center gap-2 border-b border-white/10 pb-4">
              <span className="size-3 rounded-full bg-red-400" />
              <span className="size-3 rounded-full bg-amber-400" />
              <span className="size-3 rounded-full bg-emerald-400" />
              <span className="ml-3 text-xs text-zinc-500">codestart/{title.toLowerCase()}</span>
            </div>
            <div className="space-y-4">
              {lines.map((line, index) => (
                <motion.div
                  key={line}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.18 }}
                  className="flex items-start gap-3 text-sm text-zinc-300"
                >
                  <Code2 className="mt-0.5 size-4 text-blue-300" />
                  <span>{line}</span>
                </motion.div>
              ))}
            </div>
            <motion.div
              animate={{ opacity: [0.25, 1, 0.25] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="mt-8 h-3 w-36 rounded-full bg-blue-400/70 shadow-[0_0_24px_rgba(96,165,250,0.55)]"
            />
          </div>
        </motion.section>
      </div>
    </main>
  );
}
