import { motion } from "framer-motion";

export function XPBar({ currentXP, nextLevelXP }: { currentXP: number; nextLevelXP: number }) {
  const progress = Math.min(100, Math.round((currentXP / nextLevelXP) * 100));

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs text-zinc-400">
        <span>{currentXP.toLocaleString()} XP</span>
        <span>{nextLevelXP.toLocaleString()} XP</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-zinc-900 ring-1 ring-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-blue-500 shadow-[0_0_22px_rgba(37,99,235,0.55)]"
        />
      </div>
    </div>
  );
}
