"use client";
import { useEffect, useRef } from "react";
import { motion, useSpring, useTransform } from "motion/react";
import { portraitPointer } from "@/domain/pointer";
import { useExperience } from "../ExperienceProvider";

/** Layered portrait with spring-driven perspective; touch never traps page scrolling. */
export function Portrait() {
  const ref = useRef<HTMLDivElement>(null);
  const { motionEnabled } = useExperience();
  const horizontal = useSpring(0, { stiffness: 75, damping: 24 });
  const vertical = useSpring(0, { stiffness: 75, damping: 24 });
  const rotateY = useTransform(horizontal, [-1, 1], [-8, 8]);
  const rotateX = useTransform(vertical, [-1, 1], [4, -4]);
  const x = useTransform(horizontal, [-1, 1], [-13, 13]);
  const y = useTransform(vertical, [-1, 1], [-7, 7]);
  useEffect(() => {
    if (!motionEnabled) {
      horizontal.set(0);
      vertical.set(0);
      return;
    }
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const position = portraitPointer(
        rect,
        event.clientX,
        event.clientY,
        innerWidth,
        innerHeight,
      );
      horizontal.set(position.x);
      vertical.set(position.y);
    };
    const rest = () => {
      horizontal.set(0);
      vertical.set(0);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", rest);
    window.addEventListener("blur", rest);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", rest);
      window.removeEventListener("blur", rest);
    };
  }, [motionEnabled, horizontal, vertical]);
  return (
    <div
      ref={ref}
      className="portrait-scene"
      onPointerMove={(event) => {
        if (event.pointerType !== "touch" || !motionEnabled) return;
        const rect = event.currentTarget.getBoundingClientRect();
        horizontal.set(((event.clientX - rect.left) / rect.width - 0.5) * 1.3);
        vertical.set(((event.clientY - rect.top) / rect.height - 0.5) * 0.7);
      }}
      onPointerUp={() => {
        horizontal.set(0);
        vertical.set(0);
      }}
    >
      <div className="portrait-halo" aria-hidden="true" />
      <motion.div
        className="portrait-depth"
        style={{ rotateX, rotateY, x, y, transformPerspective: 900 }}
        initial={{ opacity: 0, filter: "blur(12px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src="/media/mateus-avatar.webp"
          width="1200"
          height="1097"
          alt="Retrato digital de Mateus Monteiro, com cabelo cacheado, óculos redondos e camisa preta."
          fetchPriority="high"
        />
      </motion.div>
      <div className="portrait-bottom-fade" aria-hidden="true" />
    </div>
  );
}
