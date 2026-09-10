"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/icons";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone,
          role: "customer",
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas px-4">
        <div className="card-material rounded-xl p-8 text-center max-w-md">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-cobalt/10 text-cobalt">
            <Icon name="check-circle" size={32} />
          </div>
          <h2 className="text-2xl font-medium text-ivory">Check your email</h2>
          <p className="mt-3 text-sm text-ash">
            We&apos;ve sent a verification link to <strong className="text-ivory">{email}</strong>.
            Please verify your email to continue.
          </p>
          <Link
            href="/auth/login"
            className="mt-6 inline-block rounded-full bg-cobalt px-6 py-3 text-sm font-medium text-white hover:bg-cobalt-dark"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4 py-12">
      <div className="aura pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-medium text-ivory">
            <Icon name="shield" size={28} className="text-cobalt" />
            Policy Adda
          </Link>
          <h1 className="mt-6 text-3xl font-medium text-ivory">Create your account</h1>
          <p className="mt-2 text-sm text-ash">Join Policy Adda and manage your policies</p>
        </div>

        <div className="card-material rounded-xl p-8">
          <form onSubmit={handleSignup} className="space-y-5">
            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-ivory">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="border-white/10 bg-elevated text-ivory placeholder:text-ash/60 focus:border-cobalt"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-ivory">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-white/10 bg-elevated text-ivory placeholder:text-ash/60 focus:border-cobalt"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-ivory">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border-white/10 bg-elevated text-ivory placeholder:text-ash/60 focus:border-cobalt"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-ivory">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-white/10 bg-elevated text-ivory placeholder:text-ash/60 focus:border-cobalt pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ash hover:text-ivory"
                >
                  <Icon name={showPassword ? "eye-off" : "eye"} size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-ivory">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="border-white/10 bg-elevated text-ivory placeholder:text-ash/60 focus:border-cobalt"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-cobalt text-white hover:bg-cobalt-dark"
            >
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-ash">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-cobalt hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
