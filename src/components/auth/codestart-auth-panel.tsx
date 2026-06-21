import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Chrome } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Typewriter } from "@/components/ui/auth-fuse";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { codestartApi } from "@/lib/api/codestart";
import type { Grade, TrackInterest } from "@/types/codestart";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

const registerSchema = loginSchema.extend({
  fullName: z.string().min(3, "Enter your full name."),
  grade: z.enum(["year_1", "year_2", "year_3"]),
  trackInterest: z.enum(["cs", "ai", "cybersecurity", "data_science", "software_engineering"]),
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

const gradeOptions: { value: Grade; label: string }[] = [
  { value: "year_1", label: "Year 1 Thanaweya" },
  { value: "year_2", label: "Year 2 Thanaweya" },
  { value: "year_3", label: "Year 3 Thanaweya" },
];

const trackOptions: { value: TrackInterest; label: string }[] = [
  { value: "cs", label: "Computer Science" },
  { value: "ai", label: "Artificial Intelligence" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "data_science", label: "Data Science" },
  { value: "software_engineering", label: "Software Engineering" },
];

export function CodeStartAuthPanel({ mode }: { mode: "login" | "register" }) {
  const navigate = useNavigate();
  const isLogin = mode === "login";
  const form = useForm<LoginForm | RegisterForm>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
    defaultValues: isLogin
      ? { email: "", password: "" }
      : { fullName: "", email: "", password: "", grade: "year_3", trackInterest: "software_engineering" },
  });

  const submit = form.handleSubmit(async (values) => {
    try {
      if (isLogin) {
        await codestartApi.login(values as LoginForm);
        toast.success("Welcome back to CodeStart Academy.");
      } else {
        await codestartApi.register(values as RegisterForm);
        toast.success("Your CodeStart account is ready.");
      }
      await navigate({ to: "/dashboard" });
    } catch {
      toast.error("The API is not reachable yet. The page is wired for Laravel Sanctum.");
    }
  });

  return (
    <main className="grid min-h-screen bg-[#0A0A0F] text-white md:grid-cols-2">
      <section className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-white/55 hover:text-white">
            <ArrowLeft className="size-4" /> Back to CodeStart
          </Link>
          <h1 className="text-4xl font-black tracking-tight">{isLogin ? "Continue your path." : "Start your engineering path."}</h1>
          <p className="mt-3 text-zinc-400">{isLogin ? "Sign in to resume lessons, missions, and challenges." : "Create your account and choose the track you want before university."}</p>
          <div className="mt-8 space-y-5">
            {!isLogin && (
              <Field label="Full Name" error={(form.formState.errors as Partial<Record<keyof RegisterForm, { message?: string }>>).fullName?.message}>
                <Input {...form.register("fullName" as keyof RegisterForm)} placeholder="Omar Hassan" className="h-12 rounded-xl bg-white/5 text-white" />
              </Field>
            )}
            <Field label="Email" error={form.formState.errors.email?.message}>
              <Input {...form.register("email")} type="email" placeholder="student@example.com" className="h-12 rounded-xl bg-white/5 text-white" />
            </Field>
            <Field label="Password" error={form.formState.errors.password?.message}>
              <Input {...form.register("password")} type="password" placeholder="At least 8 characters" className="h-12 rounded-xl bg-white/5 text-white" />
            </Field>
            {!isLogin && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Grade">
                  <select {...form.register("grade" as keyof RegisterForm)} className="h-12 w-full rounded-xl border border-input bg-white/5 px-3 text-sm text-white">
                    {gradeOptions.map((option) => <option key={option.value} value={option.value} className="text-black">{option.label}</option>)}
                  </select>
                </Field>
                <Field label="Track Interest">
                  <select {...form.register("trackInterest" as keyof RegisterForm)} className="h-12 w-full rounded-xl border border-input bg-white/5 px-3 text-sm text-white">
                    {trackOptions.map((option) => <option key={option.value} value={option.value} className="text-black">{option.label}</option>)}
                  </select>
                </Field>
              </div>
            )}
            {isLogin && <Link to="/auth/forgot-password" className="block text-sm text-blue-300 hover:text-blue-200">Forgot password?</Link>}
            <Button onClick={submit} disabled={form.formState.isSubmitting} className="h-12 w-full rounded-xl bg-blue-600 text-base hover:bg-blue-500">
              {isLogin ? "Login" : "Create Account"}
            </Button>
            <Button variant="outline" className="h-12 w-full rounded-xl border-white/15 bg-transparent text-white hover:bg-white/10" onClick={() => toast.info("Google OAuth endpoint can be connected through Laravel Socialite.")}>
              <Chrome className="size-4" /> Continue with Google
            </Button>
            <p className="text-center text-sm text-zinc-500">
              {isLogin ? "New to CodeStart? " : "Already have an account? "}
              <Link to={isLogin ? "/auth/register" : "/auth/login"} className="text-blue-300 hover:text-blue-200">
                {isLogin ? "Start free" : "Login"}
              </Link>
            </p>
          </div>
        </div>
      </section>
      <section className="relative hidden overflow-hidden md:block">
        <img src={isLogin ? "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85" : "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=85"} alt="Student studying code" className="absolute inset-0 size-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/20 to-transparent" />
        <blockquote className="absolute bottom-10 left-10 right-10 rounded-3xl border border-white/10 bg-black/30 p-8 backdrop-blur-xl">
          <p className="text-2xl font-bold leading-snug"><Typewriter text={isLogin ? "Your journey to becoming an engineer starts here." : "A thousand-mile journey begins with a single line of code."} speed={45} /></p>
          <cite className="mt-4 block not-italic text-blue-200">CodeStart Academy</cite>
        </blockquote>
      </section>
    </main>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return <div className="space-y-2"><Label className="text-white/80">{label}</Label>{children}{error && <p className="text-sm text-red-300">{error}</p>}</div>;
}
