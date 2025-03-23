"use client";

import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { FadeIn, SlideInFromLeft, SlideInFromRight } from "@/components/transitions/page-transition";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignOutPage() {
  const { logout, isLoading } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = async () => {
    try {
      const success = await logout();
      if (!success) {
        setError("Failed to sign out. Please try again.");
      }
    } catch (error) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <AuthCard
      title="Sign Out"
      description="Are you sure you want to sign out?"
    >
      {error && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded"
        >
          {error}
        </motion.div>
      )}
      
      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-gray-600 text-center">
          You will be logged out of your account.
        </p>
        
        <div className="flex flex-col gap-3">
          <SlideInFromLeft delay={0.3}>
            <motion.div 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button 
                onClick={handleSignOut}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing out...
                  </div>
                ) : "Confirm Sign Out"}
              </Button>
            </motion.div>
          </SlideInFromLeft>
          
          <SlideInFromRight delay={0.4}>
            <motion.div 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button 
                variant="outline" 
                className="w-full backdrop-blur-sm bg-white/30 hover:bg-white/50 transition-all duration-300"
                onClick={() => router.back()}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </motion.div>
          </SlideInFromRight>
        </div>
      </motion.div>
      
      <FadeIn delay={0.5}>
        <div className="mt-4 text-center text-sm">
          Need help?{" "}
          <Link href="#" className="text-primary hover:underline transition-all hover:text-indigo-700 font-medium">
            Contact Support
          </Link>
        </div>
      </FadeIn>
    </AuthCard>
  );
}