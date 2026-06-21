import type { BadgeSummary } from "@/types/codestart";
import { cn } from "@/lib/utils";

export function BadgeCard({ badge }: { badge: BadgeSummary }) {
  return (
    <div className={cn("rounded-2xl border border-white/10 bg-white/[0.04] p-4", badge.locked && "grayscale opacity-50")}>
      <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-blue-500/15 text-xl">★</div>
      <h4 className="font-semibold text-white">{badge.name}</h4>
      <p className="mt-1 text-xs leading-5 text-zinc-400">{badge.description}</p>
      {badge.earnedAt && <p className="mt-3 text-[11px] font-mono text-amber-300">Earned {badge.earnedAt}</p>}
    </div>
  );
}
