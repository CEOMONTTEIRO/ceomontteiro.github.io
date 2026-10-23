"use client";

import { useEffect } from "react";
import { useExperience } from "./ExperienceProvider";

export function RevealEffects() {
  const { motionEnabled } = useExperience();
  useEffect(() => {
    if (!motionEnabled) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.07 },
    );
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    elements.forEach((element) => {
      const belowFold =
        element.getBoundingClientRect().top > window.innerHeight;
      if (belowFold) element.classList.add("will-reveal");
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
      elements.forEach((element) => element.classList.remove("will-reveal"));
    };
  }, [motionEnabled]);
  return null;
}
