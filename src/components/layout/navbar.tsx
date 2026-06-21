import { Link } from "@tanstack/react-router";
import { Menu, Moon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Courses", to: "/courses" },
  { label: "Tracks", to: "/tracks" },
  { label: "Playground", to: "/playground" },
  { label: "Community", to: "/community" },
  { label: "Pricing", to: "/pricing" },
];

export function MarketingNavbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="fixed inset-x-0 top-0 z-[120] border-b border-white/10 bg-[#0A0A0F]/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link to="/" className="font-mono text-lg font-black tracking-tight text-white">
          CodeStart<span className="text-amber-400">.</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              hash={link.hash}
              className="text-sm font-medium text-white/70 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => setDark((value) => !value)}>
            <Moon className="size-4" />
          </Button>
          <Button asChild variant="ghost" className="text-white hover:bg-white/10">
            <Link to="/auth/login">Login</Link>
          </Button>
          <Button asChild className="rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20 hover:bg-blue-500">
            <Link to="/auth/register">Start Free</Link>
          </Button>
        </div>
        <button className="text-white md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <div className={cn("grid transition-[grid-template-rows] duration-300 md:hidden", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <div className="overflow-hidden">
          <nav className="mx-4 mb-4 rounded-2xl border border-white/10 bg-white/5 p-4">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.to} hash={link.hash} className="block rounded-xl px-3 py-3 text-white/80 hover:bg-white/10">
                {link.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Button asChild variant="outline" className="rounded-xl border-white/15 bg-transparent text-white hover:bg-white/10">
                <Link to="/auth/login">Login</Link>
              </Button>
              <Button asChild className="rounded-xl bg-blue-600 hover:bg-blue-500">
                <Link to="/auth/register">Start Free</Link>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
