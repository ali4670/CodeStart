export function LevelBadge({ level }: { level: number }) {
  return (
    <div className="grid size-16 place-items-center rounded-[1.25rem] border border-blue-400/30 bg-blue-500/15 font-mono text-2xl font-black text-blue-100 shadow-lg shadow-blue-600/10">
      L{level}
    </div>
  );
}
