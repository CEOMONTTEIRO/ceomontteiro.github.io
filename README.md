# Mateus Monteiro — portfólio pessoal

**[Abrir o portfólio →](https://ceomontteiro.github.io/)**

Um portfólio dark, direto e pessoal. Três páginas: **Início**, **Projetos** e **Sobre/Contato**.

## Experiência

- Retrato autoral em 2.5D: imagem com perspectiva e movimento por mola, acompanhando o mouse e o toque.
- Vídeo ambiente original, com luz ciano e reprodução silenciosa. Pausa quando a aba fica oculta ou o movimento é reduzido.
- React Bits: BlurText, Magnet e SpotlightCard, adaptados à composição.
- Transições de página, navegação com indicador animado e abas acessíveis por teclado.
- Fine Form em destaque. APISupplier e APIBuilder aparecem como experiências anteriores; os repositórios originais estão indisponíveis.
- Layout responsivo, fontes locais e controle global de movimento.

## Stack

**React · Next.js · TypeScript · CSS · Tailwind CSS · Motion**

Exportação estática para GitHub Pages. A arquitetura separa conteúdo, acesso aos dados e apresentação, sem exigir um servidor de aplicação.

| Diretório                   | Responsabilidade                                               |
| --------------------------- | -------------------------------------------------------------- |
| `src/domain`                | Informações pessoais, projetos, stacks e limites da interação. |
| `src/application`           | Acesso ao conteúdo apresentado.                                |
| `src/components`            | Navegação, projetos, contato e componentes reutilizáveis.      |
| `src/components/experience` | Retrato, vídeo, texto e transições.                            |
| `src/components/react-bits` | Componentes React Bits com avisos e licença preservados.       |
| `src/app`                   | Três rotas, composição, metadados e estilos.                   |
| `public/media`              | Imagens e vídeo servidos pelo próprio site.                    |

## Desenvolvimento

Node.js 24 ou superior.

```sh
npm ci
npm run dev
```

O desenvolvimento usa a porta `4173`.

```sh
npm test
npm run typecheck
npm run build
```

O build produz `out/`, adiciona `.nojekyll` e verifica as três rotas e os arquivos locais. O GitHub Actions publica essa pasta no GitHub Pages a cada atualização de código na branch `main`.

Edite `src/domain/portfolio.ts` para atualizar projetos, tecnologias e contato.

## Mídia e créditos

O retrato digital foi criado a partir das fotos de Mateus com a ferramenta de geração de imagens. A fotografia da página Sobre pertence a Mateus. O screenshot Fine Form registra seu próprio projeto. O vídeo foi criado por código, sem material de terceiros; pode ser regenerado com `node scripts/render-ambient.mjs` e `ffmpeg` instalado.

React Bits por David Haz — [fonte oficial](https://github.com/DavidHDev/react-bits), [licença preservada](licenses/react-bits.md). Tipografia Manrope via Fontsource, com a licença incluída no pacote. A origem do retrato está documentada em [docs/visuals.md](docs/visuals.md).

Sem analytics, cookies de rastreamento ou formulário que armazene dados. A preferência de movimento fica apenas no navegador.
