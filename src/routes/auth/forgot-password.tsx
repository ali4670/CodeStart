import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth/forgot-password")({ component: ForgotPasswordPage });

function ForgotPasswordPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#0A0A0F] px-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8">
        <h1 className="text-3xl font-black">Reset your password</h1>
        <p className="mt-3 text-sm text-zinc-400">Enter your account email and Laravel will send a secure reset link.</p>
        <div className="mt-6 space-y-2">
          <Label>Email</Label>
          <Input type="email" placeholder="student@example.com" className="h-12 rounded-xl bg-white/5 text-white" />
        </div>
        <Button className="mt-6 h-12 w-full rounded-xl bg-blue-600 hover:bg-blue-500">Send Reset Link</Button>
        <Link to="/auth/login" className="mt-5 block text-center text-sm text-blue-300">Back to login</Link>
      </div>
    </main>
  );
}
