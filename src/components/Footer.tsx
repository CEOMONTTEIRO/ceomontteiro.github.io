"use client";
import { identity } from "@/domain/portfolio";
import { useExperience } from "./ExperienceProvider";
import { PauseIcon } from "./icons";

export function Footer({ home = false }: { home?: boolean }) {
  const { motionEnabled, toggleMotion } = useExperience();
  return (
    <footer className={`site-footer shell ${home ? "home-footer" : ""}`}>
      <span className="footer-signature">© 2026 Mateus Monteiro</span>
      <div className="footer-links">
        <a href={identity.github} target="_blank" rel="noopener noreferrer">
          GitHub ↗
        </a>
        <a href={`mailto:${identity.email}`}>E-mail ↗</a>
      </div>
      <button
        onClick={toggleMotion}
        className="motion-toggle"
        aria-pressed={!motionEnabled}
        aria-label={motionEnabled ? "Pausar animações" : "Ativar animações"}
      >
        <PauseIcon paused={!motionEnabled} />
        <span>{motionEnabled ? "Movimento ativado" : "Movimento pausado"}</span>
      </button>
    </footer>
  );
}
