"use client";

import { useState } from "react";
import type { Project } from "@/domain/portfolio";
import { Dialog } from "./Dialog";
import { ArrowIcon } from "./icons";

export function Projects({ projects }: { projects: readonly Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null);
  return (
    <>
      <div className="project-grid">
        {projects.map((project) => (
          <article
            className={`project-card project-${project.id}`}
            key={project.id}
            data-reveal
          >
            <button
              className="project-visual"
              onClick={() => setSelected(project)}
              aria-label={`Explorar o projeto ${project.name}`}
            >
              {project.id === "fine-form" ? (
                <div className="fineform-art">
                  <div className="project-browser-bar">
                    <i />
                    <i />
                    <i />
                    <span>fine form / cuidado em cada detalhe</span>
                  </div>
                  <div className="fineform-screenshot">
                    <img
                      src="/media/fine-form.webp"
                      alt="Página da Fine Form, projeto próprio de estética automotiva."
                      width="1440"
                      height="1000"
                      loading="lazy"
                    />
                  </div>
                  <div className="fineform-wordmark" aria-hidden="true">
                    fine form<span>®</span>
                  </div>
                </div>
              ) : (
                <div className="portfolio-art">
                  <div className="portfolio-art-label mono">
                    EXPERIMENTO 001 / LÓGICA EM MOVIMENTO
                  </div>
                  <img
                    src="/media/forma-poster.webp"
                    alt="Forma tridimensional criada por código para este portfólio."
                    width="800"
                    height="800"
                    loading="lazy"
                  />
                  <span className="portfolio-art-type" aria-hidden="true">
                    forma.
                  </span>
                  <span
                    className="portfolio-art-coordinate mono"
                    aria-hidden="true"
                  >
                    X: IDEIA
                    <br />
                    Y: CÓDIGO
                    <br />
                    Z: EXPERIÊNCIA
                  </span>
                </div>
              )}
              <span className="project-open" aria-hidden="true">
                <ArrowIcon />
              </span>
            </button>
            <div className="project-meta">
              <span className="mono project-number">{project.number}</span>
              <div>
                <span className="eyebrow">{project.category}</span>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
              </div>
            </div>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
      <Dialog
        open={selected !== null}
        onClose={() => setSelected(null)}
        titleId="project-title"
        className="project-dialog"
      >
        {selected ? (
          <>
            <span className="eyebrow">
              TRABALHO {selected.number} / {selected.category}
            </span>
            <h2 id="project-title">
              {selected.name}
              <span className="accent">.</span>
            </h2>
            <p className="dialog-lead">{selected.summary}</p>
            <div className="project-detail-row">
              <span className="mono">01 / CONTEXTO</span>
              <p>{selected.challenge}</p>
            </div>
            <div className="project-detail-row">
              <span className="mono">02 / CONSTRUÇÃO</span>
              <p>{selected.approach}</p>
            </div>
            <div className="project-detail-row">
              <span className="mono">03 / RESULTADO</span>
              <p>{selected.delivery}</p>
            </div>
            <div className="dialog-actions">
              {selected.id === "fine-form" ? (
                <a
                  className="button button-dark"
                  href={selected.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visitar projeto <ArrowIcon />
                </a>
              ) : null}
              <a
                className="text-link"
                href={selected.repository}
                target="_blank"
                rel="noopener noreferrer"
              >
                Explorar código <ArrowIcon />
              </a>
            </div>
          </>
        ) : null}
      </Dialog>
    </>
  );
}
