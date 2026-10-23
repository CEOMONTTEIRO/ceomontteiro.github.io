"use client";
import { useEffect, useRef } from "react";
import { useExperience } from "../ExperienceProvider";

export function AmbientFilm() {
  const ref = useRef<HTMLVideoElement>(null);
  const { motionEnabled } = useExperience();
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let visible = true;
    const sync = () => {
      if (motionEnabled && visible && !document.hidden)
        void video.play().catch(() => {});
      else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(video);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      video.pause();
    };
  }, [motionEnabled]);
  return (
    <div className="ambient-film" aria-hidden="true">
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="metadata"
        poster="/media/ambient-poster.webp"
      >
        <source src="/media/ambient-loop.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
