"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { StaggeredChild, StaggeredChildren, FadeIn, SlideInFromRight, SlideInFromLeft } from "@/components/transitions/page-transition";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning");
    } else if (hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 animated-gradient">
        <div className="bg-white/30 backdrop-blur-md shadow-lg rounded-xl p-8 w-full max-w-4xl">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-center text-white text-xl font-medium">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 animated-gradient">
      <div className="container mx-auto px-4 py-12">
        <FadeIn>
          <div className="bg-white/30 backdrop-blur-md shadow-lg rounded-xl p-8 transition-all duration-300 hover:shadow-xl">
            <motion.div 
              className="flex flex-col md:flex-row justify-between items-center mb-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20 
              }}
            >
              <div>
                <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-white to-white/80 bg-clip-text">Dashboard</h1>
                <motion.p 
                  className="text-white/90 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {greeting}, {user?.name || user?.email}
                </motion.p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={logout}
                  className="mt-4 md:mt-0 bg-white/20 hover:bg-white/30 text-white transition-all duration-300 hover:shadow-md"
                >
                  Sign Out
                </Button>
              </motion.div>
            </motion.div>

            <StaggeredChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StaggeredChild>
                <DashboardCard
                  title="Profile"
                  description="View and edit your profile details"
                  linkText="Edit Profile"
                  linkHref="/dashboard/profile"
                />
              </StaggeredChild>
              <StaggeredChild>
                <DashboardCard
                  title="Settings"
                  description="Manage your account settings and preferences"
                  linkText="View Settings"
                  linkHref="/dashboard/settings"
                />
              </StaggeredChild>
              <StaggeredChild>
                <DashboardCard
                  title="Activity"
                  description="Check your recent account activity"
                  linkText="View Activity"
                  linkHref="/dashboard/activity"
                />
              </StaggeredChild>
            </StaggeredChildren>

            <motion.div 
              className="mt-10 p-6 bg-white/20 backdrop-blur-sm rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.6,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
            >
              <h2 className="text-xl font-semibold text-white mb-4">Account Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SlideInFromLeft delay={0.7}>
                  <div className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300">
                    <p className="text-white/70 text-sm">Email</p>
                    <p className="text-white font-medium">{user?.email}</p>
                  </div>
                </SlideInFromLeft>
                <SlideInFromRight delay={0.7}>
                  <div className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300">
                    <p className="text-white/70 text-sm">Name</p>
                    <p className="text-white font-medium">{user?.name || "Not provided"}</p>
                  </div>
                </SlideInFromRight>
              </div>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}

function DashboardCard({ title, description, linkText, linkHref }: DashboardCardProps) {
  return (
    <motion.div 
      className="bg-white/20 backdrop-blur-sm rounded-lg p-6 transition-all duration-300 hover:bg-white/30 hover:shadow-xl h-full"
      whileHover={{ 
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
    >
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/80 mb-4">{description}</p>
      <motion.div
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link
          href={linkHref}
          className="text-white hover:text-white/80 font-medium inline-flex items-center transition-all duration-300"
        >
          {linkText}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </motion.div>
    </motion.div>
  );
}