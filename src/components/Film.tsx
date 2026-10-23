"use client";

import { useEffect, useRef, useState } from "react";
import { PauseIcon } from "./icons";
import { useExperience } from "./ExperienceProvider";
import { clamp } from "@/domain/ribbon";

/** A local film whose timeline follows the reader, without taking over scrolling. */
export function Film() {
  const ref = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const { motionEnabled } = useExperience();
  const [freePlay, setFreePlay] = useState(false);
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = frameRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "150px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = ref.current;
    const frame = frameRef.current;
    const section = frame?.closest("section");
    if (!video || !frame || !section || !visible || !motionEnabled || failed) {
      video?.pause();
      return;
    }
    let animation = 0;
    let previous = 0;
    let pointer = 0;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const update = (time: number) => {
      if (document.hidden) return;
      const bounds = section.getBoundingClientRect();
      const progress = clamp(
        (window.innerHeight - bounds.top) /
          (window.innerHeight + bounds.height),
        0,
        1,
      );
      frame.style.setProperty("--film-scroll", `${(progress - 0.5) * -45}px`);
      if (
        !freePlay &&
        video.duration &&
        !video.seeking &&
        time - previous > 65
      ) {
        const target =
          clamp(progress + pointer * 0.035, 0, 0.998) * video.duration;
        if (Math.abs(video.currentTime - target) > 0.035)
          video.currentTime = target;
        previous = time;
      }
      animation = requestAnimationFrame(update);
    };
    const move = (event: PointerEvent) => {
      if (!finePointer) return;
      const bounds = section.getBoundingClientRect();
      pointer = clamp(
        ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
        -1,
        1,
      );
      frame.style.setProperty("--film-x", `${pointer * 22}px`);
      frame.style.setProperty("--light-x", `${(pointer + 1) * 50}%`);
      frame.style.setProperty(
        "--light-y",
        `${clamp(((event.clientY - bounds.top) / bounds.height) * 100, 0, 100)}%`,
      );
    };
    const resume = () => {
      cancelAnimationFrame(animation);
      video.pause();
      if (document.hidden) return;
      if (freePlay) void video.play().catch(() => setFreePlay(false));
      animation = requestAnimationFrame(update);
    };
    if (video.readyState === 0) video.load();
    resume();
    section.addEventListener("pointermove", move);
    document.addEventListener("visibilitychange", resume);
    return () => {
      cancelAnimationFrame(animation);
      video.pause();
      section.removeEventListener("pointermove", move);
      document.removeEventListener("visibilitychange", resume);
    };
  }, [visible, motionEnabled, freePlay, failed]);

  return (
    <div ref={frameRef} className="film-frame">
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        poster="/media/forma-poster.webp"
        onError={() => setFailed(true)}
        aria-label="Escultura digital original; o movimento acompanha a rolagem"
      >
        <source
          src={visible && motionEnabled ? "/media/forma-film.mp4" : undefined}
          type="video/mp4"
        />
      </video>
      <div className="film-light" aria-hidden="true" />
      <div className="film-overlay-top">
        <span className="mono">
          FORMA 001
          <br />
          ESTUDO ORIGINAL EM MOVIMENTO
        </span>
      </div>
      <div className="film-overlay-bottom">
        <span className="mono">
          {!motionEnabled
            ? "CONTEMPLE NO SEU TEMPO."
            : freePlay
              ? "MOVIMENTO LIVRE."
              : "ROLE A PÁGINA. MUDE A PERSPECTIVA."}
        </span>
        {motionEnabled && !failed && (
          <button
            className="film-control"
            onClick={() => setFreePlay(!freePlay)}
            aria-label={
              freePlay
                ? "Sincronizar filme com a rolagem"
                : "Reproduzir filme livremente"
            }
            aria-pressed={freePlay}
          >
            <PauseIcon paused={!freePlay} />
            <span>{freePlay ? "Seguir scroll" : "Reproduzir"}</span>
          </button>
        )}
      </div>
    </div>
  );
}
