"use client";
import { useState } from "react";
import type { Project } from "@/domain/portfolio";
import { Dialog } from "./Dialog";
import { ArrowIcon } from "./icons";
import SpotlightCard from "./react-bits/SpotlightCard";
import { useExperience } from "./ExperienceProvider";

export function ProjectFeature({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const { motionEnabled } = useExperience();
  return (
    <>
      <article className="featured-project">
        <SpotlightCard
          className="project-preview"
          spotlightColor="#53c3b1"
          intensity={motionEnabled ? 0.12 : 0}
          borderGlow={motionEnabled ? 0.45 : 0}
          proximity={70}
          flare={false}
        >
          <button
            onClick={() => setOpen(true)}
            aria-label="Conhecer o projeto Fine Form"
            className="project-image-button"
          >
            <div className="project-browser">
              <span />
              <span />
              <span />
              <small>fine form / car care</small>
            </div>
            <img
              src="/media/fine-form.webp"
              alt="Interface real do projeto Fine Form, com catálogo de cuidados automotivos."
              width="1200"
              height="824"
              loading="eager"
            />
            <span className="image-cta">
              <ArrowIcon />
            </span>
          </button>
        </SpotlightCard>
        <div className="project-copy">
          <span className="eyebrow">
            <span className="status-dot" /> PRODUTO PRÓPRIO
          </span>
          <h2>
            Fine Form<span className="accent">.</span>
          </h2>
          <p>
            Do primeiro contato
            <br />à operação do negócio.
          </p>
          <div className="project-stack">
            <span>React</span>
            <span>APIs</span>
            <span>Cloudflare</span>
            <span>D1</span>
          </div>
          <button className="text-button" onClick={() => setOpen(true)}>
            Por dentro do projeto <ArrowIcon />
          </button>
        </div>
      </article>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        titleId="project-title"
        className="project-dialog"
      >
        <span className="eyebrow">FINE FORM / ESTUDO DE PRODUTO</span>
        <h2 id="project-title">
          Uma ideia.
          <br />
          Um produto completo.
        </h2>
        <p className="dialog-intro">
          Interface, experiência e operação no mesmo projeto.
        </p>
        <div className="case-body">
          <section>
            <h3>O contexto</h3>
            <p>{project.challenge}</p>
          </section>
          <section>
            <h3>O que construí</h3>
            <p>{project.approach}</p>
          </section>
          <section>
            <h3>O momento</h3>
            <p>{project.delivery}</p>
          </section>
        </div>
        <div className="case-links">
          <a
            className="button button-primary"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visitar Fine Form <ArrowIcon />
          </a>
          <a
            className="subtle-link"
            href={project.repository}
            target="_blank"
            rel="noopener noreferrer"
          >
            Código no GitHub ↗
          </a>
        </div>
      </Dialog>
    </>
  );
}
