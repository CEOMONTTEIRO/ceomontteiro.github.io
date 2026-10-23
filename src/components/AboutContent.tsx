"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { stackGroups, identity } from "@/domain/portfolio";
import { ArrowIcon } from "./icons";
import { useExperience } from "./ExperienceProvider";

const tabNames = ["Frontend", "Backend", "Produto"];
export function AboutContent() {
  const [selected, setSelected] = useState(0);
  const [copied, setCopied] = useState(false);
  const { motionEnabled } = useExperience();
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }
  function changeTab(index: number) {
    setSelected(index);
  }
  return (
    <>
      <div className="about-grid">
        <div className="about-photo">
          <img
            src="/media/mateus-portrait.webp"
            alt="Mateus Monteiro em uma fotografia pessoal, usando óculos redondos."
            width="900"
            height="1200"
          />
          <div className="photo-caption">
            <span>MATEUS MONTEIRO RAMOS</span>
            <span>↗</span>
          </div>
        </div>
        <div className="about-copy">
          <p className="about-lead">
            Desenvolvedor por escolha.
            <br />
            <span>Curioso por natureza.</span>
          </p>
          <p>
            Sou desenvolvedor fullstack júnior e empreendedor. Gosto de
            transformar ideias em interfaces claras, APIs organizadas e produtos
            que resolvem necessidades reais.
          </p>
          <p>
            A Fine Form é meu projeto próprio: um lugar onde conecto código,
            design e visão de negócio. Continuo aprendendo, construindo e
            refinando cada detalhe.
          </p>
          <section className="stack-section" aria-label="Minhas tecnologias">
            <div
              className="stack-tabs"
              role="tablist"
              aria-label="Áreas de atuação"
            >
              {tabNames.map((name, index) => (
                <button
                  key={name}
                  role="tab"
                  aria-selected={selected === index}
                  aria-controls={`stack-panel-${index}`}
                  id={`stack-tab-${index}`}
                  tabIndex={selected === index ? 0 : -1}
                  onClick={() => changeTab(index)}
                  onKeyDown={(event) => {
                    if (
                      event.key !== "ArrowLeft" &&
                      event.key !== "ArrowRight" &&
                      event.key !== "Home" &&
                      event.key !== "End"
                    )
                      return;
                    event.preventDefault();
                    const next =
                      event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? 2
                          : (selected + (event.key === "ArrowRight" ? 1 : 2)) %
                            3;
                    changeTab(next);
                    document.getElementById(`stack-tab-${next}`)?.focus();
                  }}
                >
                  {name}
                  {selected === index && (
                    <motion.span
                      layoutId="stack-underline"
                      className="stack-underline"
                    />
                  )}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={selected}
                role="tabpanel"
                aria-labelledby={`stack-tab-${selected}`}
                id={`stack-panel-${selected}`}
                tabIndex={0}
                initial={motionEnabled ? { opacity: 0, y: 6 } : false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <p className="stack-intro">
                  {stackGroups[selected].description}
                </p>
                <div className="tech-list">
                  {stackGroups[selected].technologies.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </section>
        </div>
      </div>
      <section
        className="contact-section"
        id="contato"
        aria-labelledby="contact-title"
      >
        <div>
          <span className="eyebrow">A PRÓXIMA IDEIA PODE SER NOSSA.</span>
          <h2 id="contact-title">
            Vamos conversar<span className="accent">?</span>
          </h2>
        </div>
        <div className="contact-actions">
          <a href={`mailto:${identity.email}`} className="contact-email">
            {identity.email}
            <ArrowIcon />
          </a>
          <button
            className="copy-button"
            onClick={copyEmail}
            aria-live="polite"
          >
            {copied ? "E-mail copiado ✓" : "Copiar e-mail"}
          </button>
        </div>
      </section>
    </>
  );
}
