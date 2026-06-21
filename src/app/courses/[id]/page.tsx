import { Button } from "@/components/ui/button";
import { ChevronLeft, PlayCircle, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function LessonPage({ params }: { params: { id: string } }) {
  const courseId = params.id;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="border-b border-zinc-800 p-4 flex items-center gap-4">
        <Button variant="ghost" asChild>
            <Link href="/courses"><ChevronLeft /> Back to Courses</Link>
        </Button>
        <h1 className="font-semibold text-lg">{courseId.replace('-', ' ')} - Lesson 1</h1>
      </header>

      <div className="flex flex-1">
        <div className="flex-1 p-8">
            <div className="aspect-video bg-zinc-900 rounded-xl flex items-center justify-center mb-6">
                <PlayCircle size={64} className="text-zinc-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Introduction to Syntax</h2>
            <p className="text-zinc-400">In this lesson, you will learn the fundamentals of the language's syntax...</p>
        </div>

        <aside className="w-80 border-l border-zinc-800 p-6">
            <h3 className="font-bold mb-4">Course Content</h3>
            <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-zinc-900 rounded-lg">
                        <CheckCircle size={18} className={i === 1 ? "text-green-500" : "text-zinc-600"} />
                        <span>Lesson {i}</span>
                    </div>
                ))}
            </div>
        </aside>
      </div>
    </div>
  );
}
