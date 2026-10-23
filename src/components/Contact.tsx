"use client";

import { useState } from "react";
import { ArrowIcon, Mark, PauseIcon } from "./icons";
import { useExperience } from "./ExperienceProvider";
import { identity } from "@/domain/portfolio";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const { motionEnabled, toggleMotion } = useExperience();

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${identity.email}`;
    }
  }

  return (
    <footer className="contact" id="contato">
      <div className="shell">
        <div className="contact-top">
          <span className="section-index">
            <span>05</span> / PRÓXIMA CONVERSA
          </span>
          <span className="eyebrow">
            <i className="status-dot" /> UMA BOA IDEIA COMEÇA AQUI.
          </span>
        </div>
        <a
          className="contact-heading"
          href={`mailto:${identity.email}`}
          aria-label="Vamos fazer acontecer? Enviar e-mail para Mateus"
        >
          <span>
            Vamos fazer
            <br />
            <em>acontecer?</em>
          </span>
          <span className="contact-arrow">
            <ArrowIcon />
          </span>
        </a>
        <div className="contact-links">
          <a href={`mailto:${identity.email}`}>
            {identity.email}
            <ArrowIcon />
          </a>
          <button className="copy-email" onClick={copyEmail} aria-live="polite">
            {copied ? "E-mail copiado ✓" : "Copiar e-mail +"}
          </button>
          <a href={identity.github} target="_blank" rel="noopener noreferrer">
            GitHub
            <ArrowIcon />
          </a>
        </div>
        <div className="footer-bottom">
          <a
            href="#inicio"
            className="footer-brand"
            aria-label="Voltar ao início"
          >
            <Mark />
            <span>Mateus Monteiro.</span>
          </a>
          <p className="mono">CÓDIGO, DESIGN E VISÃO DE PRODUTO.</p>
          <button
            className="motion-button"
            onClick={toggleMotion}
            aria-pressed={!motionEnabled}
          >
            <PauseIcon paused={!motionEnabled} />
            {motionEnabled ? "Reduzir movimento" : "Ativar movimento"}
          </button>
          <span className="mono footer-year">© 2026</span>
        </div>
      </div>
    </footer>
  );
}
