"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { MinimalTopBar } from "@/components/layout/MinimalTopBar";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { login } from "@/lib/auth";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!email || !password) {
      setError("Enter your email and password to continue.");
      return;
    }
    login(email);
    router.push(searchParams.get("next") || "/dashboard");
  }

  return (
    <div className="w-full max-w-[400px]">
      <h1 className="font-serif text-[32px] text-text-primary mb-8">Log in</h1>
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          error={error || undefined}
        />
        <Button type="submit" fullWidth>
          Log In
        </Button>
      </form>
      <p className="mt-6 text-center text-[14px] text-text-secondary font-sans">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-text-primary underline-offset-4 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MinimalTopBar />
      <main className="flex flex-1 items-start justify-center px-5 py-16 md:py-24">
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </main>
    </div>
  );
}
