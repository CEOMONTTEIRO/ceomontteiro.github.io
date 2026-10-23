"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { MotionConfig } from "motion/react";

interface ExperienceSettings {
  motionEnabled: boolean;
  toggleMotion: () => void;
}
const SettingsContext = createContext<ExperienceSettings | null>(null);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [motionEnabled, setMotionEnabled] = useState(false);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("mm-motion");
    } catch {
      /* Private browsing still works. */
    }
    setMotionEnabled(saved === null ? !preference.matches : saved === "full");
    const synchronize = () => setMotionEnabled(!preference.matches);
    preference.addEventListener("change", synchronize);
    return () => preference.removeEventListener("change", synchronize);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = motionEnabled
      ? "full"
      : "reduced";
  }, [motionEnabled]);
  function toggleMotion() {
    setMotionEnabled((current) => {
      try {
        localStorage.setItem("mm-motion", current ? "reduced" : "full");
      } catch {
        /* Session preference remains available. */
      }
      return !current;
    });
  }
  return (
    <SettingsContext.Provider value={{ motionEnabled, toggleMotion }}>
      <MotionConfig reducedMotion={motionEnabled ? "never" : "always"}>
        {children}
      </MotionConfig>
    </SettingsContext.Provider>
  );
}
export function useExperience() {
  const settings = useContext(SettingsContext);
  if (!settings) throw new Error("ExperienceProvider is required.");
  return settings;
}
