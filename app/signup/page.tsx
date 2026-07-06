"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MinimalTopBar } from "@/components/layout/MinimalTopBar";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { signup } from "@/lib/auth";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!name || !email || !password) {
      setError("Fill in your name, email, and password to continue.");
      return;
    }
    signup(name, email);
    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MinimalTopBar />
      <main className="flex flex-1 items-start justify-center px-5 py-16 md:py-24">
        <div className="w-full max-w-[400px]">
          <h1 className="font-serif text-[32px] text-text-primary mb-8">Create your account</h1>
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <Input
              label="Name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
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
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              error={error || undefined}
            />
            <Button type="submit" fullWidth>
              Create Account
            </Button>
          </form>
          <p className="mt-6 text-center text-[14px] text-text-secondary font-sans">
            Already have an account?{" "}
            <Link href="/login" className="text-text-primary underline-offset-4 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
