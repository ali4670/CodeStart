import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  CheckCircle2,
  FileCode2,
  Play,
  RotateCcw,
  TerminalSquare,
  Lightbulb,
  Trophy,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/playground")({
  component: PlaygroundIDE,
});

const files = [
  { id: "main.js", name: "main.js", ext: "js", icon: FileCode2 },
  { id: "tests.js", name: "tests.js", ext: "js", icon: FileCode2 },
];

const initialCode = {
  "main.js": `// Thanaweya Exercise: Study Hours Tracker
// Complete the code to pass all tests

const subjects = ["Math", "Physics", "Python"];
const completed = [3, 2, 1];
const weeklyGoal = 8;

function buildReport(subjects, completed) {
  let totalHours = 0;
  const report = [];
  
  for (let i = 0; i < subjects.length; i++) {
    const hours = completed[i];
    totalHours += hours;
    report.push(\`\${subjects[i]}: \${hours} hours\`);
  }

  // TODO: Add logic here to calculate hours needed
  // Print: "Hours needed: X" where X = weeklyGoal - totalHours
  
  return [report, totalHours];
}

const [report, total] = buildReport(subjects, completed);
for (const line of report) {
  console.log(line);
}
console.log("Total study hours:", total);
console.log("Goal reached:", total >= weeklyGoal);`,
  "tests.js": `// Test Suite - Click Run to verify your solution
const assert = {
  deepEqual: (a, b, msg) => {
    if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error(msg || "Deep equal failed");
  },
  strictEqual: (a, b, msg) => {
    if (a !== b) throw new Error(msg || "Strict equal failed");
  }
};

const subjects = ["Math", "Physics", "Python"];
const completed = [3, 2, 1];
const weeklyGoal = 8;

function buildReport(subjects, completed) {
  let totalHours = 0;
  const report = [];
  for (let i = 0; i < subjects.length; i++) {
    const hours = completed[i];
    totalHours += hours;
    report.push(\`\${subjects[i]}: \${hours} hours\`);
  }
  // Add your logic here
  return [report, totalHours];
}

try {
  const [report, total] = buildReport(subjects, completed);
  assert.deepEqual(report, ["Math: 3 hours", "Physics: 2 hours", "Python: 1 hours"], "Report mismatch");
  assert.strictEqual(total, 6, "Total mismatch");
  console.log("✓ All tests passed in 0.21s");
} catch (e) {
  console.error("✗ Test failed:", e.message);
}`,
};

function PlaygroundIDE() {
  const [activeFile, setActiveFile] = useState<string>("main.js");
  const [code, setCode] = useState<Record<string, string>>(initialCode);
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [testPassed, setTestPassed] = useState<boolean | null>(null);

  const handleRun = () => {
    setIsRunning(true);
    setOutput("");
    setTestPassed(null);
    const currentCode = code[activeFile] || "";
    const capturedOutput: string[] = [];
    const originalLog = console.log;
    const originalError = console.error;
    console.log = (...args: unknown[]) => capturedOutput.push(args.map(String).join(" "));
    console.error = (...args: unknown[]) => capturedOutput.push("[ERROR] " + args.map(String).join(" "));
    setTimeout(() => {
      try {
        eval(currentCode);
      } catch (err) {
        capturedOutput.push("[ERROR] " + (err as Error).message);
      }
      setOutput(capturedOutput.join("\n"));
      setTestPassed(capturedOutput.some(l => l.includes("✓ All tests passed")));
      setIsRunning(false);
      console.log = originalLog;
      console.error = originalError;
    }, 100);
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput("");
    setTestPassed(null);
  };

  const handleChange = (value: string) => {
    setCode(prev => ({ ...prev, [activeFile]: value }));
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#1B1F23] text-[#D9E2EC]">
      <header className="flex items-center justify-between border-b border-[#30363D] bg-[#0D1117] px-4 py-3">
        <div className="flex items-center gap-3">
          <TerminalSquare className="size-6 text-[#0A66C2]" />
          <h1 className="text-xl font-bold text-white">CodeStart Playground</h1>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={handleRun}
            disabled={isRunning}
            className="h-8 bg-[#239644] text-xs font-semibold text-white hover:bg-[#2EA043] disabled:opacity-50"
          >
            <Play className="size-3" /> {isRunning ? "Running..." : "Run"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleReset}
            className="h-8 border-[#30363D] text-xs font-medium text-[#D9E2EC] hover:bg-[#30363D]"
          >
            <RotateCcw className="size-3" /> Reset
          </Button>
        </div>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row">
        <aside className="w-full border-r border-[#30363D] bg-[#0D1117] p-4 lg:w-64">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-[#8B949E]">Files</p>
          <div className="space-y-1">
            {files.map(file => {
              const Icon = file.icon;
              const isActive = file.id === activeFile;
              return (
                <button
                  key={file.id}
                  onClick={() => setActiveFile(file.id)}
                  className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? "bg-[#0A66C2] text-white" : "text-[#8B949E] hover:bg-[#30363D] hover:text-[#D9E2EC]"
                  }`}
                >
                  <Icon className="size-4" />
                  {file.name}
                </button>
              );
            })}
          </div>

          <div className="mt-6 border-t border-[#30363D] pt-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#F5B700]">
              <Trophy className="size-4" /> Thanaweya Progress
            </div>
            <div className="text-xs text-[#8B949E]">Engineering Track</div>
            <div className="mt-1 text-xs text-[#8B949E]">Exercises: <span className="text-white">12/30</span></div>
          </div>
        </aside>

        <main className="flex-1 p-6">
          <div className="mb-4 rounded-lg border border-[#30363D] bg-[#0D1117] p-4">
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#0A66C2]">Instructions</h2>
            <p className="text-sm text-[#D9E2EC]">
              Complete the code to print how many hours are still needed to hit the weekly goal of{" "}
              <strong className="text-[#F5B700]">8 hours</strong>.
              Your solution must pass all tests.
            </p>
          </div>

          <div className="rounded-lg border border-[#30363D] bg-[#0D1117]">
            <div className="flex items-center justify-between border-b border-[#30363D] px-4 py-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8B949E]">{activeFile}</span>
              <div className="flex gap-2 text-xs">
                <span className={`font-medium ${testPassed === true ? "text-[#239644]" : testPassed === false ? "text-[#F78166]" : "text-[#8B949E]"}`}>
                  {testPassed === true ? "✓ Passed" : testPassed === false ? "✗ Failed" : "Not run"}
                </span>
              </div>
            </div>
            <div className="flex">
              <div className="select-none border-r border-[#30363D] bg-[#0A0F17] px-3 py-3 text-right font-mono text-xs leading-6 text-[#4A5568]">
                {code[activeFile]?.split("\n").map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <textarea
                value={code[activeFile] || ""}
                onChange={e => handleChange(e.target.value)}
                className="flex-1 resize-none border-none bg-transparent p-3 font-mono text-sm leading-6 text-[#D9E2EC] outline-none"
                spellCheck={false}
                style={{ minHeight: "320px" }}
              />
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-[#30363D] bg-[#0D1117]">
            <div className="border-b border-[#30363D] px-4 py-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8B949E]">Output</span>
            </div>
            <pre className="min-h-[120px] p-4 font-mono text-xs leading-6">
              {isRunning ? (
                <span className="text-[#0A66C2]">Running your code...</span>
              ) : output ? (
                output.split("\n").map((line, i) => (
                  <div
                    key={i}
                    className={
                      line.includes("✓") ? "text-[#239644]" :
                      line.includes("✗") ? "text-[#F78166]" :
                      line.includes("ERROR") ? "text-[#F78166]" :
                      "text-[#D9E2EC]"
                    }
                  >
                    {line || " "}
                  </div>
                ))
              ) : (
                <span className="text-[#8B949E]">Click Run to test your solution</span>
              )}
            </pre>
          </div>
        </main>

        <aside className="w-full border-t border-[#30363D] bg-[#0D1117] p-4 lg:w-80 lg:border-t-0 lg:border-l">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#239644]">
            <Target className="size-4" /> Challenge Steps
          </div>
          <ol className="space-y-2 text-sm">
            <li className="flex gap-2 text-[#D9E2EC]">
              <span className="text-[#239644]">1.</span>
              Identify: subjects, completed, weeklyGoal variables
            </li>
            <li className="flex gap-2 text-[#D9E2EC]">
              <span className="text-[#239644]">2.</span>
              Calculate totalHours from completed array
            </li>
            <li className="flex gap-2 text-[#D9E2EC]">
              <span className="text-[#F5B700]">3.</span>
              Add: console.log hours needed to reach goal
            </li>
            <li className="flex gap-2 text-[#D9E2EC]">
              <span className="text-[#F5B700]">4.</span>
              Run tests and verify output
            </li>
          </ol>

          <div className="mt-4 rounded-md border border-[#6E5494] bg-[#292239] p-3">
            <div className="mb-1 flex items-center gap-1 text-xs font-semibold text-[#F5B700]">
              <Lightbulb className="size-3" /> Hint
            </div>
            <p className="text-xs text-[#D9E2EC]">
              After the for loop, compute: <code className="text-[#0A66C2]">weeklyGoal - totalHours</code> and log it.
            </p>
          </div>
        </aside>
      </div>

      <footer className="border-t border-[#30363D] bg-[#0D1117] px-6 py-2 text-xs text-[#8B949E]">
        <span className="inline-flex items-center gap-1">
          <CheckCircle2 className="size-3 text-[#239644]" /> Thanaweya Engineering Track • Practice Mode
        </span>
      </footer>
    </div>
  );
}