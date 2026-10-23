"use client";

import { useEffect, useRef, useState } from "react";
import type {
  StudioController,
  StudioOptions,
} from "@/infrastructure/webgl/studio";
import { useExperience } from "./ExperienceProvider";

export function ShapeStage({
  color = "#72ccb6",
  speed = 1,
  expression = 1,
  paused = false,
  interactive = false,
  className = "",
}: {
  color?: string;
  speed?: number;
  expression?: number;
  paused?: boolean;
  interactive?: boolean;
  className?: string;
}) {
  const mount = useRef<HTMLDivElement>(null);
  const controller = useRef<StudioController | null>(null);
  const { motionEnabled, dark } = useExperience();
  const [ready, setReady] = useState(false);
  const options = useRef<StudioOptions>({
    color,
    speed,
    expression,
    playing: false,
    dark,
  });
  options.current = {
    color,
    speed,
    expression,
    playing: motionEnabled && !paused,
    dark,
  };

  useEffect(() => {
    controller.current?.update(options.current);
  }, [color, speed, expression, motionEnabled, paused, dark]);

  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    let cancelled = false;
    let loading = false;
    let intersecting = false;
    let scene: StudioController | null = null;
    const updateVisibility = () =>
      scene?.setVisible(intersecting && !document.hidden);
    const observer = new IntersectionObserver(
      async ([entry]) => {
        intersecting = entry.isIntersecting;
        if (!intersecting || scene || loading) {
          updateVisibility();
          return;
        }
        loading = true;
        try {
          const probe = document.createElement("canvas");
          const context = probe.getContext("webgl2");
          if (context) {
            context.getExtension("WEBGL_lose_context")?.loseContext();
            const { createStudio } = await import(
              "@/infrastructure/webgl/studio"
            );
            if (cancelled) return;
            try {
              scene = createStudio(host, options.current, () =>
                setReady(false),
              );
            } catch {
              /* Use the software renderer below. */
            }
          }
          if (!scene) {
            const { createSoftwareStudio } = await import(
              "@/infrastructure/webgl/software-studio"
            );
            if (cancelled) return;
            scene = createSoftwareStudio(host, options.current);
          }
          controller.current = scene;
          setReady(true);
          updateVisibility();
        } catch {
          // The authored poster keeps the composition intact without WebGL.
          setReady(false);
        }
      },
      { rootMargin: "150px" },
    );
    observer.observe(host);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      cancelled = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
      scene?.dispose();
      controller.current = null;
    };
  }, []);

  return (
    <div
      className={`shape-stage ${interactive ? "is-interactive" : ""} ${className}`}
      data-ready={ready}
      onPointerMove={(event) => {
        if (event.pointerType === "touch" && !interactive) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        controller.current?.pointer(
          ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
          ((event.clientY - bounds.top) / bounds.height) * 2 - 1,
        );
      }}
      onPointerLeave={() => controller.current?.pointer(0, 0)}
    >
      <div className="shape-orbit orbit-one" aria-hidden="true" />
      <div className="shape-orbit orbit-two" aria-hidden="true" />
      <img
        className="shape-poster"
        src="/media/forma-poster.webp"
        alt=""
        aria-hidden="true"
        width="800"
        height="800"
      />
      <div className="shape-canvas" ref={mount} />
      <div className="shape-shadow" aria-hidden="true" />
    </div>
  );
}
