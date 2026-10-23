import { getPortfolio } from "@/application/portfolio-service";
import { Contact } from "@/components/Contact";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Laboratory } from "@/components/Laboratory";
import { Projects } from "@/components/Projects";
import { ArrowIcon, PlusIcon } from "@/components/icons";

export default function Home() {
  const { projects, stackGroups, archive } = getPortfolio();
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <div className="statement-strip" aria-hidden="true">
          <div>
            <span>PENSAR.</span>
            <i>+</i>
            <span>DESENHAR.</span>
            <i>+</i>
            <span>CONSTRUIR.</span>
            <i>+</i>
            <span>PENSAR.</span>
            <i>+</i>
            <span>DESENHAR.</span>
            <i>+</i>
            <span>CONSTRUIR.</span>
            <i>+</i>
          </div>
        </div>
        <section
          className="work-section shell section-space"
          id="trabalhos"
          aria-labelledby="work-title"
        >
          <div className="section-heading" data-reveal>
            <div>
              <span className="section-index">
                <span>01</span> / TRABALHOS SELECIONADOS
              </span>
              <h2 id="work-title">
                Ideias que saíram
                <br />
                <em>do papel.</em>
              </h2>
            </div>
            <p>
              Produtos próprios, decisões reais.
              <br />
              Um pouco do que construo quando
              <br className="desktop-break" /> código e propósito se encontram.
            </p>
          </div>
          <Projects projects={projects} />
          <div className="archive" data-reveal>
            <div className="archive-intro">
              <span className="eyebrow">DO ARQUIVO PESSOAL</span>
              <h3>O caminho também conta.</h3>
              <p>
                Projetos anteriores de backend. Os repositórios originais estão
                indisponíveis; as experiências continuam fazendo parte da minha
                trajetória.
              </p>
            </div>
            <div className="archive-items">
              {archive.map((item) => (
                <details key={item.name}>
                  <summary>
                    <span>
                      <strong>{item.name}</strong>
                      <small>{item.type}</small>
                    </span>
                    <PlusIcon />
                  </summary>
                  <p>{item.summary}</p>
                  <span className="mono archive-note">
                    REGISTRO DE EXPERIÊNCIA / SEM REPOSITÓRIO PÚBLICO
                  </span>
                </details>
              ))}
            </div>
          </div>
        </section>
        <Laboratory />
        <section
          className="about-section shell section-space"
          id="sobre"
          aria-labelledby="about-title"
        >
          <div className="about-image" data-reveal>
            <img
              src="/media/mateus.webp"
              width="864"
              height="1536"
              loading="lazy"
              alt="Mateus Monteiro Ramos, retrato em preto e branco."
            />
            <div className="about-image-caption">
              <span className="mono">MATEUS MONTEIRO RAMOS</span>
              <span aria-hidden="true">↗</span>
            </div>
            <span className="portrait-seal" aria-hidden="true">
              M<span>+</span>M
            </span>
          </div>
          <div className="about-copy" data-reveal>
            <span className="section-index">
              <span>03</span> / QUEM ESTÁ POR TRÁS
            </span>
            <h2 id="about-title">
              Prazer,
              <br />
              <em>Mateus.</em>
            </h2>
            <p className="about-lead">
              Curioso por natureza.
              <br />
              Desenvolvedor por escolha.
            </p>
            <p>
              Sou desenvolvedor fullstack júnior e empreendedor. Gosto de
              entender como as coisas funcionam — e de encontrar uma forma mais
              clara, útil e interessante de construí-las.
            </p>
            <p>
              Meu trabalho atravessa interfaces, APIs, prototipação e visão de
              negócio. A Fine Form é um dos lugares onde coloco essa combinação
              em prática, conectando o digital à operação de um projeto próprio.
            </p>
            <p>
              Estudo, experimento e volto ao código. Tenho interesse especial em
              arquitetura de software, performance e experiências que respeitam
              o tempo de quem usa.
            </p>
            <div className="about-facts">
              <span>
                <span className="eyebrow">BASE</span>São Paulo, Brasil
              </span>
              <span>
                <span className="eyebrow">FOCO</span>Aprender. Construir.
                Evoluir.
              </span>
            </div>
            <a
              href="https://github.com/CEOMONTTEIRO"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Me encontre no GitHub <ArrowIcon />
            </a>
          </div>
        </section>
        <section
          className="tools-section shell"
          id="tecnologias"
          aria-labelledby="tools-title"
        >
          <div className="tools-heading" data-reveal>
            <span className="section-index">
              <span>04</span> / FERRAMENTAS & POSSIBILIDADES
            </span>
            <h2 id="tools-title">
              Técnica para
              <br />
              <em>dar vida.</em>
            </h2>
            <p>
              As ferramentas mudam.
              <br />A vontade de entender, não.
            </p>
          </div>
          <div className="stack-list">
            {stackGroups.map((group, index) => (
              <details key={group.number} open={index === 0} data-reveal>
                <summary>
                  <span className="mono stack-number">{group.number}</span>
                  <h3>{group.title}</h3>
                  <PlusIcon />
                </summary>
                <div className="stack-body">
                  <p>{group.description}</p>
                  <div className="tech-tags">
                    {group.technologies.map((technology) => (
                      <span key={technology}>{technology}</span>
                    ))}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </section>
        <section
          className="process-section shell section-space"
          aria-labelledby="process-title"
        >
          <div className="process-heading" data-reveal>
            <span className="eyebrow">COMO EU PENSO</span>
            <h2 id="process-title">
              Antes da tela,
              <br />
              <em>uma boa pergunta.</em>
            </h2>
          </div>
          <div className="process-grid">
            {[
              {
                number: "01",
                title: "Entender primeiro.",
                text: "Contexto, pessoas e o problema que realmente precisa ser resolvido. O ponto de partida nunca é só uma tecnologia.",
              },
              {
                number: "02",
                title: "Dar estrutura.",
                text: "Responsabilidades claras, componentes coesos e decisões que tornam o produto mais simples de manter e evoluir.",
              },
              {
                number: "03",
                title: "Refinar no detalhe.",
                text: "Testar a navegação, ajustar a experiência e observar performance, acessibilidade e comportamento em diferentes telas.",
              },
            ].map((step) => (
              <article key={step.number} data-reveal>
                <span className="process-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Contact />
    </>
  );
}
