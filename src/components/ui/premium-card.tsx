import { cn } from "@/lib/utils";
import React from "react";

export const PremiumCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("relative p-1 rounded-[2rem] bg-zinc-800/20 border border-white/5 transition-all duration-300", className)}>
    <div className="absolute inset-0 rounded-[2rem] bg-zinc-950/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" />
    <div className="relative z-10 p-8 h-full">
        {children}
    </div>
  </div>
);
