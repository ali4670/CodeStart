import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const MOCK_COURSES = [
  { id: "python-basics", title: "Python Basics", lessons: 12, progress: 45 },
  { id: "web-dev", title: "Web Development", lessons: 20, progress: 10 },
  { id: "algorithms", title: "Algorithms & Data Structures", lessons: 15, progress: 0 },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <h1 className="text-3xl font-bold mb-8">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_COURSES.map((course) => (
          <Card key={course.id} className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-zinc-400 text-sm mb-4">{course.lessons} Lessons</p>
              <div className="w-full bg-zinc-800 h-2 rounded-full mb-6">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
              </div>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <Link href={`/courses/${course.id}`}>Continue Learning</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
