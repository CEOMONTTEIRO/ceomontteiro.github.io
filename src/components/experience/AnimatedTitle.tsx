"use client";
import BlurText from "../react-bits/BlurText";
import { useExperience } from "../ExperienceProvider";

export function AnimatedTitle({
  text,
  className = "",
  level = 1,
}: {
  text: string;
  className?: string;
  level?: 1 | 2;
}) {
  const { motionEnabled } = useExperience();
  const Tag = level === 1 ? "h1" : "h2";
  return (
    <div className={`animated-title ${className}`}>
      <Tag className={motionEnabled ? "sr-only" : "title-static"}>{text}</Tag>
      {motionEnabled && (
        <div aria-hidden="true">
          <BlurText
            text={text}
            animateBy="letters"
            trigger="load"
            delay={28}
            distance={28}
            blur={9}
            stepDuration={0.28}
            direction="bottom"
          />
        </div>
      )}
    </div>
  );
}
