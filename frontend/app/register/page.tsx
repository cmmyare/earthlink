"use client";

import { FormEvent, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/lib/stores/auth-store";

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading, error: storeError, user } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError(null);

    try {
      await register({ email, password, confirmPassword });
      router.push("/dashboard");
    } catch (err) {
      setError(
        storeError || err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl items-center justify-center px-4">
      <Card className="w-full max-w-md rounded-2xl border border-slate-800/80 bg-slate-950/90 p-8">
        <div className="mb-6 space-y-2 text-center">
          <h1 className="text-xl font-semibold tracking-tight">
            Create your studio
          </h1>
          <p className="text-xs text-slate-400">
            Spin up an AI-native video workspace in seconds.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 text-left">
            <label className="text-xs font-medium text-slate-300">
              Email
            </label>
            <Input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@studio.co"
              required
            />
          </div>

          <div className="space-y-2 text-left">
            <label className="text-xs font-medium text-slate-300">
              Password
            </label>
            <Input
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="space-y-2 text-left">
            <label className="text-xs font-medium text-slate-300">
              Confirm password
            </label>
            <Input
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-xs text-rose-400" role="alert">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="mt-2 w-full text-xs"
            disabled={isLoading}
          >
            {isLoading ? "Creating workspace..." : "Create account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-[11px] text-slate-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-sky-400 hover:text-sky-300"
          >
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}

