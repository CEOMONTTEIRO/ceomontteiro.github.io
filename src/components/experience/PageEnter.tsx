"use client";
import { motion } from "motion/react";
import { useExperience } from "../ExperienceProvider";
import { useEffect, type ReactNode } from "react";

export function PageEnter({ children }: { children: ReactNode }) {
  const { motionEnabled } = useExperience();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);
  return (
    <motion.div
      className="page-transition"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="route-wipe"
        aria-hidden="true"
        initial={{ scaleY: motionEnabled ? 1 : 0 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
      />
      {children}
    </motion.div>
  );
}
