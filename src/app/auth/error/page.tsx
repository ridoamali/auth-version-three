"use client";

import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  let errorMessage = "An unknown error occurred during authentication.";
  let errorDescription = "Please try again or contact support if the problem persists.";

  if (error === "OAuthSignin") {
    errorMessage = "OAuth sign-in failed";
    errorDescription = "There was an issue starting the OAuth sign-in process.";
  } else if (error === "OAuthCallback") {
    errorMessage = "OAuth callback failed";
    errorDescription = "There was an issue with the OAuth callback. Please try again.";
  } else if (error === "OAuthCreateAccount") {
    errorMessage = "Could not create account";
    errorDescription = "There was an issue creating your account with the OAuth provider.";
  } else if (error === "EmailCreateAccount") {
    errorMessage = "Could not create account";
    errorDescription = "There was an issue creating your account with the email provided.";
  } else if (error === "Callback") {
    errorMessage = "Authentication callback failed";
    errorDescription = "The authentication callback failed. Please try again.";
  } else if (error === "CredentialsSignin") {
    errorMessage = "Invalid credentials";
    errorDescription = "The email or password you entered is incorrect.";
  } else if (error === "SessionRequired") {
    errorMessage = "Authentication required";
    errorDescription = "You must be signed in to access this page.";
  }

  return (
    <AuthCard
      title="Authentication Error"
      description={errorMessage}
    >
      <div className="p-4 bg-red-50 border border-red-200 rounded mb-6">
        <p className="text-red-800">{errorDescription}</p>
      </div>

      <div className="flex flex-col gap-4">
        <Button asChild className="w-full">
          <Link href="/auth/sign-in">
            Return to Sign In
          </Link>
        </Button>

        <Button asChild variant="outline" className="w-full">
          <Link href="/">
            Go to Home
          </Link>
        </Button>
      </div>
    </AuthCard>
  );
}
