import { ArrowRight, BookOpenCheck, Cloud, LockKeyhole, Users, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { TextEffect } from "@/components/ui/text-effect";

const features = [
  {
    title: "100% Focused on CS Students",
    description: "Not for everyone. Built for Egyptian students targeting CS, AI, cybersecurity, data science, and software engineering.",
    icon: BookOpenCheck,
    className: "lg:col-span-3 lg:row-span-2",
    accent: "bg-blue-500/15 text-blue-200",
  },
  {
    title: "Secure & Private",
    description: "Your data, your progress, your family dashboard access, protected by Laravel Sanctum flows.",
    icon: LockKeyhole,
    className: "lg:col-span-3",
    accent: "bg-emerald-500/15 text-emerald-200",
  },
  {
    title: "Blazing Fast",
    description: "Optimized lesson delivery and Cloudinary-ready media patterns for low-friction study sessions.",
    icon: Zap,
    className: "lg:col-span-2",
    accent: "bg-amber-500/15 text-amber-200",
  },
  {
    title: "School + Code in One Place",
    description: "Thanaweya discipline and programming tracks share one dashboard, one schedule, and one progress system.",
    icon: Cloud,
    className: "lg:col-span-2",
    accent: "bg-violet-500/15 text-violet-200",
  },
  {
    title: "Study with Friends",
    description: "Community groups, leaderboards, coding challenges, badges, streaks, and peer accountability.",
    icon: Users,
    className: "lg:col-span-2",
    accent: "bg-cyan-500/15 text-cyan-200",
  },
];

export function Features() {
  return (
    <section className="relative overflow-hidden bg-slate-50 px-6 py-20 dark:bg-[#0A0A0F] md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-12 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="mx-auto max-w-6xl">
        <div className="relative mb-12 grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-blue-600 dark:text-blue-200">
              Platform features
            </p>
            <TextEffect as="h2" preset="slide" per="word" className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-slate-950 dark:text-white md:text-6xl">
              From Thanaweya pressure to engineering confidence.
            </TextEffect>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-zinc-400 md:text-lg">
              CodeStart connects school discipline, coding practice, exams, projects, and family visibility into one guided path. Students always know what to learn next, why it matters, and how progress unlocks the next step.
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-5 shadow-xl shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-blue-950/20">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-500 dark:text-zinc-500">
              Student route
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-700 dark:text-zinc-200">
              <span className="rounded-full bg-blue-500/10 px-3 py-1.5 text-blue-700 dark:text-blue-200">School focus</span>
              <ArrowRight className="size-4 text-slate-400" />
              <span className="rounded-full bg-emerald-500/10 px-3 py-1.5 text-emerald-700 dark:text-emerald-200">Coding skill</span>
              <ArrowRight className="size-4 text-slate-400" />
              <span className="rounded-full bg-amber-500/10 px-3 py-1.5 text-amber-700 dark:text-amber-200">Engineering proof</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-500 dark:text-zinc-400">
              A practical bridge from daily study habits to portfolio-level technical ability.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className={`group relative overflow-hidden rounded-3xl border-slate-200/80 bg-white/85 shadow-xl shadow-blue-950/[0.04] transition duration-300 hover:-translate-y-1 hover:border-blue-400/40 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-black/20 ${feature.className}`}>
                <CardContent className="flex h-full min-h-[220px] flex-col justify-between p-6 md:p-8">
                  <div className={`mb-8 flex size-14 items-center justify-center rounded-2xl ${feature.accent}`}>
                    <Icon className="size-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">{feature.title}</h3>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 dark:text-zinc-400 md:text-base">{feature.description}</p>
                  </div>
                  <div className="pointer-events-none absolute -right-12 -top-12 size-44 rounded-full bg-blue-500/10 blur-3xl transition group-hover:bg-blue-500/20" />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
