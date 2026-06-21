import { motion } from "framer-motion";

export function StreakBadge({ days }: { days: number }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-orange-400/20 bg-orange-500/10 px-4 py-3 text-orange-100">
      <motion.span animate={{ scale: [1, 1.16, 1] }} transition={{ duration: 1.2, repeat: Infinity }} className="text-2xl">
        🔥
      </motion.span>
      <span className="font-mono text-lg font-bold tabular-nums">{days} day streak</span>
    </div>
  );
}
