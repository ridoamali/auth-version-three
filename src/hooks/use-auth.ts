"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
        return false;
      }

      router.push("/dashboard");
      return true;
    } catch (error) {
      setError("An unexpected error occurred");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const socialLogin = async (provider: "github" | "google") => {
    try {
      setLoading(true);
      setError(null);
      
      await signIn(provider, { callbackUrl: "/dashboard" });
      return true;
    } catch (error) {
      setError("An unexpected error occurred");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    phone?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed");
        return false;
      }

      // Automatically sign in after registration
      return login(formData.email, formData.password);
    } catch (error) {
      setError("An unexpected error occurred");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut({ callbackUrl: "/auth/sign-in" });
      return true;
    } catch (error) {
      setError("Failed to sign out");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    user: session?.user,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading" || loading,
    error,
    login,
    socialLogin,
    register,
    logout,
  };
}