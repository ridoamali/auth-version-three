"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScaleIn } from "@/components/transitions/page-transition";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface AuthCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function AuthCard({
  title,
  description,
  children,
  footer,
  className,
}: AuthCardProps) {
  return (
    <ScaleIn>
      <Card className={cn("w-full shadow-lg backdrop-blur-sm bg-white/90 border-none", className)}>
        <CardHeader className="space-y-1">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {title}
            </CardTitle>
          </motion.div>
          
          {description && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <CardDescription className="text-center">{description}</CardDescription>
            </motion.div>
          )}
        </CardHeader>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.3, 
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
        >
          <CardContent>{children}</CardContent>
        </motion.div>
        
        {footer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <CardFooter>{footer}</CardFooter>
          </motion.div>
        )}
      </Card>
    </ScaleIn>
  );
}