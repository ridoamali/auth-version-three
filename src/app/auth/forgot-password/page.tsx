"use client";

import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";

export default function ForgotPasswordPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Forgot Password Form Submitted");
  };

  return (
    <AuthCard
      title="Forgot Password"
      description="Enter your email to reset your password"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Email
          </label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            required
            className="bg-white/50 backdrop-blur-sm"
          />
        </div>

        <Button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white animate-pulse-subtle">
          Send Reset Link
        </Button>
      </form>

      <div className="mt-4 text-center text-sm">
        Remember your password?{" "}
        <Link href="/auth/sign-in" className="text-primary hover:underline">
          Back to Sign In
        </Link>
      </div>
    </AuthCard>
  );
}
