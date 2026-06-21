import type { CourseReview } from "@/types/codestart";

export const mockCourses: CourseReview[] = [
  {
    id: "python-thanaweya-foundations",
    title: "Python Foundations for Thanaweya Students",
    subtitle: "Start with syntax, logic, and school-relevant problem solving.",
    description:
      "A beginner-friendly Python path that uses Egyptian school-style examples, score calculations, and structured practice to build real programming intuition.",
    level: "beginner",
    durationHours: 40,
    lessonsCount: 20,
    track: "Software Engineering",
    heroImage:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=80",
    rating: 4.9,
    reviewsCount: 1842,
    enrolled: "12,400 students",
    instructor: "Eng. Salma Hegazy",
    language: "Arabic + English terms",
    certificate: true,
    whatYouLearn: [
      "Read and write Python with confidence before university",
      "Use conditionals, loops, and functions on school-style examples",
      "Solve structured logic exercises without memorizing syntax blindly",
      "Build a full student progress tracker project from planning to file output",
    ],
    tools: ["Python", "Replit", "Problem Solving", "Debugging"],
    projects: [
      "Thanaweya marks calculator",
      "Revision schedule assistant",
      "Final project: Student progress tracker",
    ],
    classroomStructure: [
      {
        id: "classroom-1-basics",
        title: "Classroom 1: Python Foundations - Basics",
        description: "Fundamental concepts: variables, data types, input/output, arithmetic, conditionals, loops, lists, dictionaries.",
        modulesCount: 8,
        examPassed: false,
      },
      {
        id: "classroom-2-intermediate",
        title: "Classroom 2: Python Foundations - Intermediate",
        description: "Core programming skills: functions, file handling, error handling, nested lists, string methods, external data.",
        modulesCount: 8,
        examPassed: false,
      },
      {
        id: "classroom-3-advanced",
        title: "Classroom 3: Python Foundations - Advanced & Final Exam",
        description: "Advanced topics: OOP, JSON, complete final project, and comprehensive final exam.",
        modulesCount: 4,
        examPassed: false,
      },
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1: Python Setup and First Output",
        summary: "Run Python in a sandbox, print output, and get comfortable with the feedback loop.",
        lessons: [
          { id: "l1", title: "Run your first program", durationMinutes: 12, type: "video", preview: "Open the sandbox, print a message, and understand how code turns into output immediately." },
          { id: "l2", title: "Sandbox warm-up", durationMinutes: 14, type: "practice", preview: "Collect a student name and target track, then print a personalized CodeStart welcome message." },
        ],
      },
      {
        id: "m2",
        title: "Module 2: Variables and Data Types",
        summary: "Store and manipulate student data using variables and different data types.",
        lessons: [
          { id: "l3", title: "Variables and types", durationMinutes: 15, type: "video", preview: "Understand integers, floats, strings, and booleans with school examples." },
          { id: "l4", title: "Practice: Store student data", durationMinutes: 12, type: "practice", preview: "Create variables for name, age, and grade." },
        ],
      },
      {
        id: "m3",
        title: "Module 3: User Input and Output",
        summary: "Collect student information using input() and format outputs.",
        lessons: [
          { id: "l5", title: "Getting user input", durationMinutes: 16, type: "practice", preview: "Create programs that ask for student data and respond." },
        ],
      },
      {
        id: "m4",
        title: "Module 4: Arithmetic Operations",
        summary: "Perform mathematical calculations for grades and averages.",
        lessons: [
          { id: "l6", title: "Calculator functions", durationMinutes: 18, type: "practice", preview: "Build a marks calculator for school subjects." },
        ],
      },
      {
        id: "m5",
        title: "Module 5: Conditional Statements",
        summary: "Make decisions based on scores and grades.",
        lessons: [
          { id: "l7", title: "Pass/Fail logic", durationMinutes: 20, type: "practice", preview: "Create grade-based decision programs." },
        ],
      },
      {
        id: "m6",
        title: "Module 6: Loops",
        summary: "Repeat tasks like printing daily schedules.",
        lessons: [
          { id: "l8", title: "For and while loops", durationMinutes: 18, type: "practice", preview: "Create weekly study plan generators." },
        ],
      },
      {
        id: "m7",
        title: "Module 7: Lists and Collections",
        summary: "Store multiple subjects and scores.",
        lessons: [
          { id: "l9", title: "Working with lists", durationMinutes: 20, type: "practice", preview: "Analyze multiple scores and find highest/lowest." },
        ],
      },
      {
        id: "m8",
        title: "Module 8: Dictionaries",
        summary: "Store structured student records.",
        lessons: [
          { id: "l10", title: "Student profile object", durationMinutes: 18, type: "practice", preview: "Model a student profile with name, grade, and track fields." },
        ],
      },
      {
        id: "m9",
        title: "Module 9: Functions",
        summary: "Write reusable functions for calculations.",
        lessons: [
          { id: "l11", title: "Average helper functions", durationMinutes: 22, type: "practice", preview: "Refactor repeated calculations into small reusable functions." },
        ],
      },
      {
        id: "m10",
        title: "Module 10: File Handling",
        summary: "Save and load student data from files.",
        lessons: [
          { id: "l12", title: "Write and read files", durationMinutes: 19, type: "practice", preview: "Create progress reports that save to files." },
        ],
      },
      {
        id: "m11",
        title: "Module 11: Error Handling",
        summary: "Handle invalid input safely.",
        lessons: [
          { id: "l13", title: "Safe score input", durationMinutes: 21, type: "practice", preview: "Protect programs from invalid input with try/except." },
        ],
      },
      {
        id: "m12",
        title: "Module 12: Project - Grade Tracker",
        summary: "Build a complete grade tracking application.",
        lessons: [
          { id: "l14", title: "Project architecture", durationMinutes: 24, type: "project", preview: "Plan the Student Progress Tracker, define data structures." },
        ],
      },
      {
        id: "m13",
        title: "Module 13: Nested Lists",
        summary: "Work with 2D data like schedules.",
        lessons: [
          { id: "l15", title: "Schedule matrix", durationMinutes: 18, type: "practice", preview: "Create weekly study schedule matrices." },
        ],
      },
      {
        id: "m14",
        title: "Module 14: String Methods",
        summary: "Process and format text data.",
        lessons: [
          { id: "l16", title: "Text formatting", durationMinutes: 16, type: "practice", preview: "Format and validate student names and emails." },
        ],
      },
      {
        id: "m15",
        title: "Module 15: External Data",
        summary: "Read and process CSV-like data.",
        lessons: [
          { id: "l17", title: "CSV processing", durationMinutes: 20, type: "practice", preview: "Parse student records from text data." },
        ],
      },
      {
        id: "m16",
        title: "Module 16: Libraries",
        summary: "Use useful Python libraries.",
        lessons: [
          { id: "l18", title: "Random and datetime", durationMinutes: 16, type: "practice", preview: "Create random study schedules." },
        ],
      },
      {
        id: "m17",
        title: "Module 17: OOP Basics",
        summary: "Create classes for students and courses.",
        lessons: [
          { id: "l19", title: "Student class", durationMinutes: 22, type: "practice", preview: "Build a Student class with attributes and methods." },
        ],
      },
      {
        id: "m18",
        title: "Module 18: JSON Persistence",
        summary: "Save and load data using JSON.",
        lessons: [
          { id: "l20", title: "JSON file handling", durationMinutes: 19, type: "practice", preview: "Save student data to JSON files." },
        ],
      },
      {
        id: "m19",
        title: "Module 19: Final Project - Part 1",
        summary: "Plan and build the complete tracker.",
        lessons: [
          { id: "l21", title: "Project planning", durationMinutes: 24, type: "project", preview: "Design the Student Progress Tracker architecture." },
        ],
      },
      {
        id: "m20",
        title: "Module 20: Final Exam",
        summary: "Comprehensive assessment of all Python concepts.",
        lessons: [
          { id: "l22", title: "Final exam preparation", durationMinutes: 30, type: "practice", preview: "Review all key concepts before the final exam." },
        ],
      },
    ],
  },
  {
    id: "web-development-starter-egypt",
    title: "Web Development Starter",
    subtitle: "Learn HTML, CSS, and responsive UI through real student-facing pages.",
    description:
      "A project-based frontend course where students move from HTML basics to responsive layouts and interactive interfaces using code they can see immediately.",
    level: "beginner",
    durationHours: 24,
    lessonsCount: 20,
    track: "Frontend Development",
    heroImage:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80",
    rating: 4.8,
    reviewsCount: 1290,
    enrolled: "9,800 students",
    instructor: "Eng. Karim El-Shenawy",
    language: "Arabic explanations",
    certificate: true,
    whatYouLearn: [
      "Build structured web pages with semantic HTML",
      "Style interfaces with modern CSS and Tailwind thinking",
      "Create responsive layouts that work on phone and desktop",
      "Ship a polished landing page students can actually show",
    ],
    tools: ["HTML", "CSS", "Responsive Design", "Tailwind"],
    projects: ["Student portfolio page", "Course landing page", "Responsive dashboard shell"],
    modules: [
      {
        id: "m1",
        title: "Module 1: HTML Structure",
        summary: "Learn how solid web pages are organized before touching styling.",
        lessons: [
          { id: "l1", title: "Page anatomy", durationMinutes: 12, type: "video", preview: "Headers, sections, cards, and content blocks explained using a CodeStart-style page." },
          { id: "l2", title: "Build your first landing skeleton", durationMinutes: 18, type: "project", preview: "Create a real page structure for a student project instead of toy examples." },
        ],
      },
      {
        id: "m2",
        title: "Module 2: Responsive Styling",
        summary: "Spacing, typography, colors, and mobile-first thinking.",
        lessons: [
          { id: "l3", title: "Typography and hierarchy", durationMinutes: 11, type: "reading", preview: "Why some pages feel cheap and how better spacing and type fix that instantly." },
          { id: "l4", title: "Responsive hero section", durationMinutes: 20, type: "practice", preview: "Build a polished hero that holds up on a 375px screen without collapsing." },
        ],
      },
    ],
  },
  {
    id: "algorithms-problem-solving-track",
    title: "Algorithms and Problem Solving",
    subtitle: "Train the thinking patterns that make programming easier in every language.",
    description:
      "A disciplined introduction to arrays, searching, sorting, and problem decomposition for students targeting CS and engineering programs.",
    level: "intermediate",
    durationHours: 30,
    lessonsCount: 22,
    track: "Computer Science",
    heroImage:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1400&q=80",
    rating: 4.9,
    reviewsCount: 2117,
    enrolled: "15,200 students",
    instructor: "Dr. Mostafa Rashed",
    language: "Arabic + contest notation",
    certificate: true,
    whatYouLearn: [
      "Break programming problems into steps before coding",
      "Use arrays, loops, and conditions under time pressure",
      "Recognize patterns common in entrance-level CS exercises",
      "Write cleaner solutions instead of trial-and-error code",
    ],
    tools: ["Problem Solving", "Algorithms", "C++/Python", "Pseudocode"],
    projects: ["Array challenge pack", "Search visualizer", "Contest-style problem set"],
    modules: [
      {
        id: "m1",
        title: "Module 1: Thinking Before Coding",
        summary: "Pseudocode, constraints, and problem framing.",
        lessons: [
          { id: "l1", title: "How strong students read problems", durationMinutes: 15, type: "video", preview: "A process for reading constraints, spotting traps, and deciding the first approach." },
          { id: "l2", title: "Pseudocode drills", durationMinutes: 17, type: "practice", preview: "Turn plain-language tasks into step-by-step logic before touching syntax." },
        ],
      },
      {
        id: "m2",
        title: "Module 2: Arrays and Pattern Recognition",
        summary: "One of the most common foundations in beginner CS and contests.",
        lessons: [
          { id: "l3", title: "Array traversal patterns", durationMinutes: 18, type: "video", preview: "Max/min, counting, filtering, and frequency problems with guided reasoning." },
          { id: "l4", title: "Review set: 10 core problems", durationMinutes: 30, type: "project", preview: "A curated practice set designed like a material review page, with hints and solution thinking." },
        ],
      },
    ],
  },
];

export function getCourseById(courseId: string) {
  return mockCourses.find((course) => course.id === courseId);
}
