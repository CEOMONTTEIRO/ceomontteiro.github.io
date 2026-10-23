export type ProjectId = "fine-form" | "portfolio";

export interface Project {
  id: ProjectId;
  number: string;
  name: string;
  category: string;
  summary: string;
  tags: readonly string[];
  challenge: string;
  approach: string;
  delivery: string;
  url: string;
  repository: string;
}

export interface StackGroup {
  number: string;
  title: string;
  description: string;
  technologies: readonly string[];
}

export const identity = {
  name: "Mateus Monteiro Ramos",
  displayName: "Mateus Monteiro",
  role: "Desenvolvedor Fullstack Jr.",
  email: "ceomontteiro@gmail.com",
  github: "https://github.com/CEOMONTTEIRO",
  website: "https://ceomontteiro.github.io/",
  location: "São Paulo, Brasil",
} as const;

export const projects: readonly Project[] = [
  {
    id: "fine-form",
    number: "01",
    name: "Fine Form",
    category: "Identidade, experiência & produto",
    summary: "O cuidado começa antes do primeiro contato.",
    tags: ["Produto próprio", "Frontend + backend", "Cloudflare"],
    challenge:
      "Conectar a identidade de um negócio de estética automotiva a uma experiência digital clara, com serviços, solicitações de atendimento e acompanhamento.",
    approach:
      "Uma jornada que começa na apresentação dos cuidados e segue até a solicitação. Na operação, API, banco D1, painel administrativo e atualizações em tempo real trabalham em conjunto.",
    delivery:
      "Plataforma própria em preparação para a inauguração do negócio. O projeto reúne interface, catálogo de serviços, acompanhamento privado e organização da operação.",
    url: "https://fine-form-3-0.fineformcare.workers.dev/",
    repository: "https://github.com/fineform-detailing/fineform-detailing",
  },
  {
    id: "portfolio",
    number: "02",
    name: "Entre lógica e forma",
    category: "Desenvolvimento criativo & interação",
    summary: "Um espaço para ideias ganharem movimento.",
    tags: ["Next.js + React", "WebGL / Three.js", "GitHub Pages"],
    challenge:
      "Apresentar meu trabalho com personalidade, sem tornar a navegação pesada ou difícil no celular.",
    approach:
      "Conteúdo estático, componentes reutilizáveis e uma camada visual independente. A forma tridimensional é gerada por código, reage à interação e desacelera quando o movimento é reduzido.",
    delivery:
      "O portfólio que você está explorando: uma experiência original com laboratório 3D, filme visual e atenção à leitura, ao teclado e a diferentes telas.",
    url: "https://ceomontteiro.github.io/",
    repository: "https://github.com/CEOMONTTEIRO/ceomontteiro.github.io",
  },
];

export const stackGroups: readonly StackGroup[] = [
  {
    number: "01",
    title: "Interfaces que fazem sentido.",
    description:
      "Da primeira tela aos pequenos estados da interface. Estrutura, responsividade e atenção a quem está do outro lado.",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Sass",
      "Vite",
    ],
  },
  {
    number: "02",
    title: "Estrutura para evoluir.",
    description:
      "APIs, dados e responsabilidades bem definidas. Código que resolve o problema de hoje e facilita a próxima mudança.",
    technologies: [
      "Node.js",
      "Express",
      "NestJS",
      "Python",
      "FastAPI",
      "Prisma",
      "Zod",
      "PostgreSQL",
      "MongoDB",
      "MySQL",
    ],
  },
  {
    number: "03",
    title: "Do detalhe ao conjunto.",
    description:
      "Design e tecnologia na mesma conversa. Prototipação, componentes e decisões orientadas ao produto.",
    technologies: [
      "Figma",
      "UI/UX",
      "Design Systems",
      "Git & GitHub",
      "Cloudflare",
      "APIs REST",
      "Performance",
      "Acessibilidade",
    ],
  },
];

export const archive = [
  {
    name: "APISupplier",
    type: "API de fornecedores",
    summary:
      "Projeto anterior para centralizar cadastro, consulta e manutenção de fornecedores, com validação de dados e organização em camadas.",
  },
  {
    name: "APIBuilder",
    type: "Desenvolvimento de APIs",
    summary:
      "Experiência anterior de backend, com foco na construção de APIs, persistência e separação de responsabilidades.",
  },
] as const;
