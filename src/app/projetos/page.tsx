import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { AnimatedTitle } from "@/components/experience/AnimatedTitle";
import { ProjectFeature } from "@/components/ProjectFeature";
import { getPortfolio } from "@/application/portfolio-service";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Fine Form, APISupplier e APIBuilder. Conheça um pouco do trabalho de Mateus Monteiro.",
  alternates: { canonical: "/projetos/" },
  openGraph: { url: "/projetos/", title: "Projetos · Mateus Monteiro" },
};
export default function ProjectsPage() {
  const { projects, archive } = getPortfolio();
  return (
    <div className="inner-page">
      <main id="conteudo" className="shell projects-page">
        <header className="page-heading">
          <span className="eyebrow">PROJETOS / 01</span>
          <AnimatedTitle text="Ideias em prática." />
          <p>Uma seleção do que construo, experimento e levo adiante.</p>
        </header>
        <ProjectFeature project={projects[0]} />
        <section className="project-archive" aria-labelledby="archive-title">
          <div className="archive-heading">
            <h2 id="archive-title">
              Antes disso<span className="accent">.</span>
            </h2>
            <p>Experiências que também fazem parte do caminho.</p>
          </div>
          <div className="archive-list">
            {archive.map((item, index) => (
              <details key={item.name}>
                <summary>
                  <span className="archive-order">0{index + 1}</span>
                  <h3>{item.name}</h3>
                  <span className="archive-type">{item.type}</span>
                  <span className="archive-plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>
                  {item.summary} Os repositórios originais não estão mais
                  disponíveis.
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
