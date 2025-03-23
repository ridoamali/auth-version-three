"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center p-4 md:p-8 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 opacity-50 animated-gradient"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
      />
      <motion.div 
        className="absolute inset-0 backdrop-blur-sm"
        initial={{ backdropFilter: "blur(0px)" }}
        animate={{ backdropFilter: "blur(8px)" }}
        transition={{ duration: 1 }}
      />
      <motion.div 
        className="w-full max-w-md z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 200,
          damping: 20,
          delay: 0.2
        }}
      >
        {children}
      </motion.div>
      
      {/* Background Animated Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 backdrop-blur-md"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: Math.random() * 0.2 + 0.1, 
              scale: 1,
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}