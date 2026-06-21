"use client";

import { AuthFuse, Input, Label } from "@/components/ui/auth-fuse";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInputs) => {
    console.log("Login data:", data);
    // TODO: Connect to Laravel Sanctum API
  };

  return (
    <AuthFuse 
      type="login"
      quote="Your journey to becoming an engineer starts here."
      author="CodeStart Academy"
      image="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

        <div className="text-right text-sm">
            <Link href="/auth/forgot-password" className="text-blue-500 hover:text-blue-400">Forgot password?</Link>
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Login</Button>
      </form>
    </AuthFuse>
  );
}
