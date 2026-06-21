import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Crown, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreativePricing, type PricingTier } from "@/components/ui/creative-pricing";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
});

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    icon: <Sparkles className="size-5" />,
    price: 0,
    description: "Preview the system before committing.",
    features: ["Course catalog", "Sample lessons", "Community preview", "Basic progress view"],
    color: "bg-blue-100 text-blue-700",
    cta: "Start free",
    href: "/auth/register",
  },
  {
    name: "Mission Pass",
    icon: <Zap className="size-5" />,
    price: 299,
    description: "The full CodeStart learning path.",
    features: ["All three levels", "Lecture progress", "Quizzes and exams", "Classroom discussions", "Project reviews"],
    popular: true,
    color: "bg-amber-100 text-amber-700",
    cta: "Unlock full path",
    href: "/levels",
  },
  {
    name: "Family Command",
    icon: <Crown className="size-5" />,
    price: 499,
    description: "For parents tracking serious students.",
    features: ["Everything in Mission Pass", "Parent dashboard", "Weekly progress report", "Priority mentor support"],
    color: "bg-violet-100 text-violet-700",
    cta: "Open dashboard",
    href: "/parent-dashboard",
  },
];

const guarantees = [
  "No dead course links, every plan connects to a real route.",
  "Progress, exams, and classroom discussions stay in one student system.",
  "Built for Thanaweya students moving toward CS, AI, and engineering.",
];

function PricingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0A0A0F] px-6 py-16 text-white">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[52rem] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[120px]" />
      <section className="relative mx-auto max-w-7xl pt-10">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-2 text-sm text-blue-100">
              <ShieldCheck className="size-4" /> Pricing that actually starts learning
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight md:text-7xl">
              Choose the mission depth, then start the path immediately.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
              CodeStart pricing is tied to real access: curriculum levels, progress tracking, quizzes, parent views, and classroom support. No fake checkout wall and no empty plan buttons.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-12 rounded-xl bg-blue-600 px-6 hover:bg-blue-500">
                <Link to="/levels">Start learning <ArrowRight className="size-4" /></Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-xl border-white/15 bg-white/[0.03] px-6 text-white hover:bg-white/10">
                <Link to="/courses">Review courses</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-blue-950/20">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">What is included</p>
            <div className="mt-5 space-y-4">
              {guarantees.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-zinc-300">
                  <Check className="mt-1 size-4 shrink-0 text-emerald-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="relative mx-auto mt-16 max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.035] px-3 py-12 md:px-6">
        <CreativePricing
          tag="CodeStart access"
          title="Plans for real progress"
          description="Pick a route, open the learning system, and keep moving."
          tiers={pricingTiers}
        />
      </section>
    </main>
  );
}
