"use client";

import { useState } from "react";
import { Dialog } from "./Dialog";
import { ShapeStage } from "./ShapeStage";
import { ArrowIcon, PauseIcon } from "./icons";
import { Film } from "./Film";
import { useExperience } from "./ExperienceProvider";

const materials = [
  { name: "Ciano", color: "#72ccb6" },
  { name: "Porcelana", color: "#e7e8e0" },
  { name: "Grafite", color: "#343f3a" },
];

export function Laboratory() {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(materials[0].color);
  const [speed, setSpeed] = useState(1);
  const [expression, setExpression] = useState(1);
  const [paused, setPaused] = useState(false);
  const { motionEnabled, toggleMotion } = useExperience();

  function reset() {
    setColor(materials[0].color);
    setSpeed(1);
    setExpression(1);
    setPaused(false);
  }

  return (
    <>
      <section
        className="laboratory"
        id="laboratorio"
        aria-labelledby="lab-section-title"
      >
        <Film />
        <div className="shell lab-layout">
          <div className="lab-copy" data-reveal>
            <span className="section-index">
              <span>02</span> / LABORATÓRIO
            </span>
            <h2 id="lab-section-title">
              A web também
              <br />
              pode ser
              <br />
              <em>sentida.</em>
            </h2>
            <p>
              Nem tudo precisa caber em uma tela previsível. Este é o meu espaço
              para explorar forma, luz e interação — com intenção em cada
              movimento.
            </p>
            <button
              className="button button-mint"
              onClick={() => setOpen(true)}
            >
              Experimente a forma <ArrowIcon />
            </button>
            <span className="lab-footnote mono">
              FEITO DE CÓDIGO. MOLDADO POR VOCÊ.
            </span>
          </div>
        </div>
      </section>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        titleId="lab-title"
        className="lab-dialog"
      >
        <div className="lab-dialog-heading">
          <span className="eyebrow">LABORATÓRIO INTERATIVO / 001</span>
          <h2 id="lab-title">
            Sua própria <em>forma.</em>
          </h2>
          <p>
            Mude o material, ajuste a expressão e explore a perspectiva com o
            toque ou o mouse.
          </p>
        </div>
        <div className="lab-interaction-grid">
          <div className="lab-stage-wrap">
            <ShapeStage
              interactive
              color={color}
              speed={speed}
              expression={expression}
              paused={paused}
            />
            <span className="mono lab-drag-hint">
              MOVA O CURSOR OU DESLIZE SOBRE A FORMA ↔
            </span>
          </div>
          <div className="lab-controls">
            <fieldset>
              <legend>Material</legend>
              <div className="material-options">
                {materials.map((material) => (
                  <button
                    key={material.name}
                    onClick={() => setColor(material.color)}
                    aria-pressed={color === material.color}
                  >
                    <span style={{ backgroundColor: material.color }} />
                    {material.name}
                  </button>
                ))}
              </div>
            </fieldset>
            <label className="range-field" htmlFor="expression">
              <span>
                Expressão <output>{expression.toFixed(1)}</output>
              </span>
              <input
                id="expression"
                type="range"
                min="0.35"
                max="1.8"
                step="0.05"
                value={expression}
                onChange={(event) => setExpression(Number(event.target.value))}
              />
            </label>
            <label className="range-field" htmlFor="speed">
              <span>
                Velocidade <output>{speed.toFixed(1)}×</output>
              </span>
              <input
                id="speed"
                type="range"
                min="0.25"
                max="2"
                step="0.05"
                value={speed}
                onChange={(event) => setSpeed(Number(event.target.value))}
              />
            </label>
            <div className="lab-playback">
              <button
                className="text-link"
                onClick={() => {
                  if (!motionEnabled) {
                    toggleMotion();
                    setPaused(false);
                  } else setPaused(!paused);
                }}
              >
                <PauseIcon paused={paused || !motionEnabled} />
                {paused || !motionEnabled ? "Animar forma" : "Pausar movimento"}
              </button>
              <button className="reset-button" onClick={reset}>
                Recomeçar ↺
              </button>
            </div>
            <p className="lab-note">
              {motionEnabled
                ? "Uma curva contínua. Nenhum modelo pronto. Cada ponto é calculado em tempo real."
                : "Movimento reduzido. Você ainda pode mudar a forma e o material, ou ativar a animação acima."}
            </p>
          </div>
        </div>
      </Dialog>
    </>
  );
}
