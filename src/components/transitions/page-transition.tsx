"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideInFromRight({ children, className = "", delay = 0 }: PageTransitionProps & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideInFromLeft({ children, className = "", delay = 0 }: PageTransitionProps & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({ children, className = "", delay = 0 }: PageTransitionProps & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.4,
        delay: delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ children, className = "", delay = 0 }: PageTransitionProps & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.4,
        delay: delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggeredChildren({ children, className = "" }: PageTransitionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggeredChild({ children, className = "" }: PageTransitionProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            type: "spring",
            stiffness: 200,
            damping: 20,
          }
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;