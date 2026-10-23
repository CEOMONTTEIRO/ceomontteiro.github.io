# Mateus Monteiro — Entre lógica e forma

Portfólio pessoal de **Mateus Monteiro Ramos**, desenvolvedor fullstack júnior. Uma experiência original que aproxima código, design e visão de produto.

**[Visite o portfólio →](https://ceomontteiro.github.io/)**

## Experiência

- Escultura 3D gerada matematicamente, com WebGL e Three.js.
- Renderização alternativa em Canvas quando WebGL não está disponível.
- Filme original de 6 segundos: o scroll controla o tempo; o mouse desloca a composição e a luz.
- Laboratório com materiais, expressão, velocidade e pausa.
- Layout para celular, tablet e desktop, navegação por teclado, movimento reduzido e temas claro/escuro.
- Fine Form como estudo de produto. APISupplier e APIBuilder apresentados apenas como projetos anteriores, sem links para repositórios indisponíveis.

## Stack e arquitetura

Next.js, React, TypeScript, CSS, Tailwind CSS e Three.js. Exportação estática para GitHub Pages, sem servidor de aplicação.

| Camada                     | Responsabilidade                                                   |
| -------------------------- | ------------------------------------------------------------------ |
| `src/domain`               | Identidade, projetos, tecnologias e matemática da escultura.       |
| `src/application`          | Acesso ao conteúdo apresentado.                                    |
| `src/infrastructure/webgl` | Renderizadores GPU e Canvas, ciclo de vida e descarte de recursos. |
| `src/components`           | Interações e componentes de apresentação.                          |
| `src/app`                  | Composição das páginas, estilos e metadados.                       |
| `public/media`             | Foto autorizada, imagens e filme original.                         |

A separação em módulos permite evoluir conteúdo, apresentação e renderização de forma independente. Microserviços não são necessários para este portfólio estático: adicionariam uma operação de servidor sem uma necessidade de produto.

## Desenvolvimento

Requer Node.js 24 ou superior.

```sh
npm ci
npm run dev
```

O ambiente local abre na porta `4173`. Para verificar e gerar a versão estática:

```sh
npm test
npm run typecheck
npm run build
```

A saída fica em `out/`, incluindo `.nojekyll`. O workflow **Deploy portfolio to GitHub Pages** executa as verificações e publica a pasta pelo GitHub Actions. Novos commits de código na branch `main` atualizam o site.

## Conteúdo e mídia

Edite `src/domain/portfolio.ts` para atualizar informações, stacks e projetos. A fotografia pertence a Mateus; a imagem Fine Form registra o próprio projeto. A forma e o filme são derivados da mesma curva original definida em `src/domain/ribbon.ts`.

Para regenerar o filme, instale `sharp` no ambiente de desenvolvimento, disponibilize `ffmpeg` no PATH e execute `node scripts/render-film.mjs`. O site utiliza apenas o MP4 já produzido; essa etapa não faz parte do deploy.

Fontes Manrope e Instrument Serif distribuídas via Fontsource, com suas licenças nos pacotes. Fontes e mídia são servidas pelo próprio site. Sem analytics, trackers ou formulários que armazenem dados.
