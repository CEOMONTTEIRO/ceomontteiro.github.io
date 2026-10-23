import { Footer } from "@/components/Footer";
import { Portrait } from "@/components/experience/Portrait";
import { AmbientFilm } from "@/components/experience/AmbientFilm";
import { AnimatedTitle } from "@/components/experience/AnimatedTitle";
import { MagneticLink } from "@/components/experience/MagneticLink";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home-page">
      <main id="conteudo" className="hero">
        <AmbientFilm />
        <div className="hero-grid shell">
          <div className="hero-copy">
            <span className="eyebrow hero-role">
              <span className="status-dot" /> DESENVOLVEDOR FULLSTACK JR.
            </span>
            <AnimatedTitle text="Mateus Monteiro." className="hero-title" />
            <p className="hero-description">
              Código bem pensado.
              <br />
              <span>Experiências que ficam.</span>
            </p>
            <div className="hero-actions">
              <MagneticLink href="/projetos/">
                Conheça meu trabalho
              </MagneticLink>
              <Link href="/sobre/" className="subtle-link">
                Um pouco sobre mim <span>↗</span>
              </Link>
            </div>
          </div>
          <Portrait />
        </div>
        <div className="hero-bottom shell">
          <span>SÃO PAULO · BRASIL</span>
          <Link href="/projetos/" className="selected-preview">
            <span className="selected-dot" />
            <span>
              Em destaque <strong>Fine Form</strong>
            </span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </main>
      <Footer home />
    </div>
  );
}
