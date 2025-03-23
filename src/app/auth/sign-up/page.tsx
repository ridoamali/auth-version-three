"use client";

import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignUpPage() {
  const { register, error: authError, isLoading, socialLogin } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    
    // Validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields");
      return;
    }
    
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (!formData.terms) {
      setError("You must agree to the Terms of Service");
      return;
    }
    
    await register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    });
  };

  const handleSocialLogin = async (provider: "github" | "google") => {
    await socialLogin(provider);
  };

  return (
    <AuthCard
      title="Create an Account"
      description="Enter your details to create a new account"
    >
      {(error || authError) && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
          {error || authError}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              First Name
            </label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange}
              disabled={isLoading}
              className="bg-white/50 backdrop-blur-sm"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Last Name
            </label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
              disabled={isLoading}
              className="bg-white/50 backdrop-blur-sm"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Email
          </label>
          <Input
            id="email"
            name="email"
            placeholder="name@example.com"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="bg-white/50 backdrop-blur-sm"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="bg-white/50 backdrop-blur-sm"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="bg-white/50 backdrop-blur-sm"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="terms" 
            name="terms"
            checked={formData.terms}
            onCheckedChange={(checked) => 
              setFormData(prev => ({ ...prev, terms: checked === true }))
            }
            disabled={isLoading}
            required 
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the{" "}
            <Link href="#" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </label>
        </div>
        
        <Button 
          type="submit"
          disabled={isLoading} 
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white animate-pulse-subtle"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            onClick={() => handleSocialLogin("google")}
            className="bg-white/50 backdrop-blur-sm border-gray-300 hover:bg-white/80 transition-all duration-300"
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            onClick={() => handleSocialLogin("github")}
            className="bg-slate-900/90 text-white hover:bg-slate-900 transition-all duration-300"
          >
            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </Button>
        </div>
      </div>

      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/auth/sign-in" className="text-primary hover:underline">
          Sign In
        </Link>
      </div>
    </AuthCard>
  );
}