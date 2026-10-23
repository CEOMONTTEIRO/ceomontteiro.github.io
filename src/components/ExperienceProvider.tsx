"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface ExperienceSettings {
  motionEnabled: boolean;
  toggleMotion: () => void;
  dark: boolean;
  toggleTheme: () => void;
}

const SettingsContext = createContext<ExperienceSettings | null>(null);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [motionEnabled, setMotionEnabled] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const savedMotion = localStorage.getItem("mm-motion");
    setMotionEnabled(
      savedMotion === null ? !preference.matches : savedMotion === "full",
    );
    setDark(localStorage.getItem("mm-theme") === "dark");
    const updatePreference = () => {
      if (localStorage.getItem("mm-motion") === null)
        setMotionEnabled(!preference.matches);
    };
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = motionEnabled
      ? "full"
      : "reduced";
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [motionEnabled, dark]);

  function toggleMotion() {
    setMotionEnabled((current) => {
      localStorage.setItem("mm-motion", current ? "reduced" : "full");
      return !current;
    });
  }

  function toggleTheme() {
    setDark((current) => {
      localStorage.setItem("mm-theme", current ? "light" : "dark");
      return !current;
    });
  }

  return (
    <SettingsContext.Provider
      value={{ motionEnabled, toggleMotion, dark, toggleTheme }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useExperience() {
  const settings = useContext(SettingsContext);
  if (!settings) throw new Error("ExperienceProvider é obrigatório.");
  return settings;
}
