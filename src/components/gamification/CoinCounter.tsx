import { Coins } from "lucide-react";
import { motion } from "framer-motion";

export function CoinCounter({ coins }: { coins: number }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-amber-200">
      <motion.div animate={{ rotate: [0, 12, -8, 0] }} transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 2 }}>
        <Coins className="size-5" />
      </motion.div>
      <span className="font-mono text-lg font-bold tabular-nums">{coins.toLocaleString()}</span>
    </div>
  );
}
