# Direção visual e mídia

Preto, branco e ciano `#53c3b1`. Composição pessoal com três páginas e poucas decisões por tela.

## Retrato

- Ferramenta: geração de imagens integrada, modo built-in, sem API externa configurada.
- Referências: fotos fornecidas e autorizadas por Mateus; referências faciais e roupa preta.
- Asset usado: `public/media/mateus-avatar.webp`, com transparência preservada.
- Interação: perspectiva CSS em 2.5D com Motion; mouse e toque alteram a orientação da imagem por mola. Os olhos pertencem à imagem renderizada.

Prompt utilizado:

> Use case: stylized-concept / identity-preserve. Asset type: premium personal developer portfolio hero avatar, transparent cutout. Create ONE beautiful, highly polished 3D rendered bust of the SAME adult man in the supplied identity references, Mateus. References 1 and 2 show his face clearly, reference 3 provides the dark black collared shirt and mood. Preserve his recognizable long narrow oval face, light-medium warm skin tone, short tightly curled black hair with neat sides, fine dark eyebrows, thin round silver wire-frame eyeglasses, straight nose, subtle moustache and small pointed goatee. Stylish adult semi-realistic digital double, subtly stylized with premium Pixar-quality rendering but normal adult head/body proportions, not a child, not a generic stock face, not an anime character. The face must closely resemble the supplied man. Front-facing head, symmetrical eye line, eyes looking straight toward camera, head upright, shoulders relaxed, black casual collared overshirt over a black tee. Crop from upper chest upwards, all curls and both shoulders completely within the frame, subject centered with generous transparent padding. Very high quality physically based 3D rendering, realistic delicate subsurface skin, beautifully detailed curls, finely modeled glasses, dark charcoal clothing. Controlled cinematic low-key studio light, face fully readable with soft neutral white key from front upper left and thin elegant cyan/teal rim light (#53c3b1) from behind right, dark cinematic character. Genuine transparent background with no floor, no backdrop, no halo, no circular frame. No phone, no mirror, no text, no logo, no props, no extra accessories. Precisely clean edges for compositing on a near-black website. A single coherent avatar asset, not a grid, not a contact sheet, not a website mockup.

## Vídeo

`public/media/ambient-loop.mp4`: estudo original de luz, 1280 × 720, 24 fps, 8 segundos. Fórmulas periódicas produzem o movimento. `scripts/render-ambient.mjs` documenta e reproduz a geração com ffmpeg.

## Fotografia

`public/media/mateus-portrait.webp`: fotografia original fornecida pelo próprio Mateus, convertida para WebP. O tratamento monocromático da página é feito por CSS.
