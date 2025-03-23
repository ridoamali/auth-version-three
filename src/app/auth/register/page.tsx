"use client";

import { AuthCard } from "@/components/auth/auth-card";
import { SocialButtons } from "@/components/auth/social-buttons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";

export default function RegisterPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Registration Form Submitted");
  };

  return (
    <AuthCard
      title="Register"
      description="Complete registration to access our services"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="fullName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Full Name
          </label>
          <Input
            id="fullName"
            placeholder="John Doe"
            required
            className="bg-white/50 backdrop-blur-sm"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Username
          </label>
          <Input
            id="username"
            placeholder="johndoe"
            required
            className="bg-white/50 backdrop-blur-sm"
          />
        </div>

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

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Phone Number (Optional)
          </label>
          <Input
            id="phone"
            placeholder="+1 (555) 123-4567"
            type="tel"
            className="bg-white/50 backdrop-blur-sm"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Password
          </label>
          <Input
            id="password"
            type="password"
            required
            className="bg-white/50 backdrop-blur-sm"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="newsletter" />
          <label
            htmlFor="newsletter"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Subscribe to newsletter
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" required />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the{" "}
            <Link href="#" className="text-primary hover:underline">
              Terms of Service
            </Link>
          </label>
        </div>

        <Button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white animate-pulse-subtle">
          Complete Registration
        </Button>
      </form>

      <SocialButtons />

      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/auth/sign-in" className="text-primary hover:underline">
          Sign In
        </Link>
      </div>
    </AuthCard>
  );
}
