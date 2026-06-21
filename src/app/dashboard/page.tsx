'use client';
import { LimelightNav } from "@/components/ui/limelight-nav";
import { motion } from "framer-motion";
import { Zap, Target, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

const PremiumCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("relative p-1 rounded-[2rem] bg-zinc-800/20 border border-white/5", className)}>
    <div className="absolute inset-0 rounded-[2rem] bg-zinc-950/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" />
    <div className="relative z-10 p-6">
        {children}
    </div>
  </div>
);

const TodayGoalCard = () => (
  <PremiumCard>
    <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-full bg-blue-500/10 text-blue-500"><Target size={20}/></div>
        <h3 className="font-medium text-zinc-400">Today's Goal</h3>
    </div>
    <p className="text-xl font-semibold text-white">Finish Python Basics</p>
    <div className="w-full bg-zinc-900 h-1.5 rounded-full mt-6 overflow-hidden">
      <motion.div initial={{width:0}} animate={{width: "75%"}} transition={{duration: 1, ease: [0.32, 0.72, 0, 1]}} className="bg-blue-600 h-1.5 rounded-full" />
    </div>
  </PremiumCard>
);

const StudyStreakBadge = () => (
  <PremiumCard className="border-orange-500/20">
    <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-full bg-orange-500/10 text-orange-500"><Flame size={20}/></div>
        <h3 className="font-medium text-zinc-400">Current Streak</h3>
    </div>
    <p className="text-3xl font-bold text-white mt-1 tabular-nums">12 Days</p>
  </PremiumCard>
);

const XPProgressBar = () => (
    <PremiumCard>
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-amber-500/10 text-amber-500"><Zap size={20}/></div>
            <h3 className="font-medium text-zinc-400">Level 5</h3>
        </div>
        <p className="text-sm text-zinc-500 font-mono">1250 / 2000 XP</p>
        <div className="w-full bg-zinc-900 h-1.5 rounded-full mt-6 overflow-hidden">
          <motion.div initial={{width:0}} animate={{width: "60%"}} transition={{duration: 1, ease: [0.32, 0.72, 0, 1]}} className="bg-amber-500 h-1.5 rounded-full" />
        </div>
    </PremiumCard>
  );

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12">
      <header className="mb-12">
        <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="text-4xl font-bold tracking-tight">Good morning, Omar.</motion.h1>
        <p className="text-zinc-500 mt-2">Let's continue your journey to becoming an engineer.</p>
      </header>

      <div className="mb-12 flex justify-center">
        <LimelightNav
          items={[
            { id: 'today', icon: <></>, label: 'Today' },
            { id: 'courses', icon: <></>, label: 'Courses' },
            { id: 'tracks', icon: <></>, label: 'Tracks' },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TodayGoalCard />
        <StudyStreakBadge />
        <XPProgressBar />
      </div>
    </div>
  );
}
