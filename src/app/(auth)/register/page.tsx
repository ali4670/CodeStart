"use client";

import { AuthFuse, Input, Label } from "@/components/ui/auth-fuse";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const registerSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  grade: z.string().min(1, "Grade is required"),
  track: z.string().min(1, "Track interest is required"),
});

type RegisterInputs = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInputs) => {
    console.log("Register data:", data);
    // TODO: Connect to Laravel Sanctum API
  };

  return (
    <AuthFuse 
      type="register"
      quote="A thousand-mile journey begins with a single line of code."
      author="CodeStart Academy"
      image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" placeholder="Ahmed Mohamed" {...register("fullName")} />
          {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="student@example.com" {...register("email")} />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
          {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
            <Label htmlFor="grade">Grade</Label>
            <select id="grade" className="w-full h-10 rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-white focus:ring-2 focus:ring-zinc-300" {...register("grade")}>
                <option value="">Select...</option>
                <option value="1">Year 1</option>
                <option value="2">Year 2</option>
                <option value="3">Year 3</option>
            </select>
            {errors.grade && <p className="text-red-500 text-xs">{errors.grade.message}</p>}
            </div>

            <div className="space-y-2">
            <Label htmlFor="track">Track Interest</Label>
            <select id="track" className="w-full h-10 rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-white focus:ring-2 focus:ring-zinc-300" {...register("track")}>
                <option value="">Select...</option>
                <option value="cs">CS</option>
                <option value="ai">AI</option>
                <option value="cyber">Cybersecurity</option>
                <option value="data">Data Science</option>
                <option value="se">Software Engineering</option>
            </select>
            {errors.track && <p className="text-red-500 text-xs">{errors.track.message}</p>}
            </div>
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Create Account</Button>
      </form>
    </AuthFuse>
  );
}
