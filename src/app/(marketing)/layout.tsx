import { LimelightNav } from "@/components/ui/limelight-nav";
import { Footer } from "@/components/ui/footer-section";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link href="/" className="font-mono text-xl font-bold tracking-tighter text-white">
            CODESTART
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/courses" className="text-sm font-medium text-zinc-400 hover:text-white">Courses</Link>
            <Link href="/tracks" className="text-sm font-medium text-zinc-400 hover:text-white">Tracks</Link>
            <Link href="/playground" className="text-sm font-medium text-zinc-400 hover:text-white">Playground</Link>
            <Link href="/community" className="text-sm font-medium text-zinc-400 hover:text-white">Community</Link>
            <Link href="#pricing" className="text-sm font-medium text-zinc-400 hover:text-white">Pricing</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm font-medium text-white">Login</Link>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                <Link href="/auth/register">Start Free</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}
