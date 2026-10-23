"use client";

import { ShapeStage } from "./ShapeStage";
import { ArrowIcon } from "./icons";

export function Hero() {
  return (
    <section className="hero shell" id="inicio" aria-labelledby="hero-title">
      <div className="hero-topline">
        <span className="eyebrow">DESENVOLVEDOR FULLSTACK JR.</span>
        <span className="eyebrow hero-edition">PORTFÓLIO PESSOAL / 2026</span>
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <h1 id="hero-title">
            Ideias claras.
            <br />
            Experiências
            <br />
            <em>vivas.</em>
            <span className="hero-period" aria-hidden="true">
              *
            </span>
          </h1>
          <div className="hero-description">
            <span className="tiny-cross" aria-hidden="true">
              +
            </span>
            <p>
              Sou <strong>Mateus Monteiro.</strong> Conecto código, design e
              visão de produto para transformar boas ideias em experiências que
              fazem sentido.
            </p>
          </div>
          <div className="hero-actions">
            <a className="button button-dark" href="#trabalhos">
              Explorar trabalhos <ArrowIcon />
            </a>
            <a href="#laboratorio" className="text-link">
              Entre no laboratório <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div
          className="hero-art"
          aria-label="Escultura tridimensional original, gerada por código"
        >
          <div className="art-topline">
            <span className="eyebrow">
              <i className="status-dot" /> FORMA 001
            </span>
            <span className="mono">INTERATIVA, POR NATUREZA.</span>
          </div>
          <ShapeStage />
          <div className="art-caption">
            <span className="mono">LÓGICA QUE GANHA FORMA</span>
            <span className="art-coordinate" aria-hidden="true">
              ↗
            </span>
          </div>
        </div>
      </div>
      <div className="hero-bottom">
        <div className="hero-signature">
          <span className="signature-line" />
          <span>
            Desenvolvimento.
            <br />
            <strong>Com intenção.</strong>
          </span>
        </div>
        <p className="mono hero-place">
          SÃO PAULO, BRASIL
          <br />
          <span>IDEIAS ABERTAS AO MUNDO.</span>
        </p>
        <a
          href="#trabalhos"
          className="scroll-cue"
          aria-label="Descer para trabalhos"
        >
          <span className="mono">CONTINUE EXPLORANDO</span>
          <span className="scroll-circle" aria-hidden="true">
            ↓
          </span>
        </a>
      </div>
    </section>
  );
}
