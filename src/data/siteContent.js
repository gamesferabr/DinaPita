/** Conteúdo editável do site — serviços e projetos */

export const servicos = [
  "Estratégia e programação arquitetônica",
  "Projeto arquitetônico e interiores",
  "Reforma e retrofit",
  "Acompanhamento de obra",
  "Consultoria de materiais e iluminação",
  "Visualização 3D / imagens de projeto",
];

/**
 * Imagens de teste usam picsum.photos com seed fixo (mesma foto em cada reload).
 * Para substituir pelas fotos reais, troque a URL de cada projeto.
 */
const testImg = (seed) => `https://picsum.photos/seed/${seed}/900/1200`;

export const projetos = [
  {
    id: 1,
    tipo: "Residencial",
    nome: "Casa [Nome do projeto]",
    resumo:
      "Residência de 420 m² implantada em terreno arborizado, com setorização em três blocos interligados por um pátio central. Madeira nativa, concreto aparente e caixilhos metálicos compõem o repertório material; o projeto paisagístico acompanha a topografia e reforça a transição entre o interior e o jardim.",
    img: testImg("dina-residencial"),
    alt: "Foto de teste — projeto residencial",
    href: "#",
  },
  {
    id: 2,
    tipo: "Comercial",
    nome: "Loja [Nome]",
    resumo:
      "Flagship de 180 m² desenhada como peça única: um gesto curvo em painéis ripados organiza vitrine, caixa e provador, enquanto o mobiliário central é móvel para reconfigurar a loja a cada coleção. Iluminação em três camadas reforça a escala do produto e a presença da marca na rua.",
    img: testImg("dina-comercial"),
    alt: "Foto de teste — projeto comercial",
    href: "#",
  },
  {
    id: 3,
    tipo: "Interiores",
    nome: "Apartamento [Bairro]",
    resumo:
      "Reforma integral de 210 m² com foco em luz natural e permeabilidade entre estar, cozinha e varanda. Paleta quase monocromática em tons de pedra, tapetes de lã natural e peças de design autoral brasileiro dialogam com o acervo de arte do morador.",
    img: testImg("dina-interiores"),
    alt: "Foto de teste — projeto de interiores",
    href: "#",
  },
  {
    id: 4,
    tipo: "Cultural",
    nome: "Espaço [Instituição]",
    resumo:
      "Requalificação de um edifício histórico de 1.200 m² para abrigar galeria, biblioteca e auditório. A proposta preserva estrutura, alvenarias e caixilhos originais e insere um núcleo contemporâneo em aço e vidro que resolve acessibilidade, climatização e novos programas sem competir com a preexistência.",
    img: testImg("dina-cultural"),
    alt: "Foto de teste — projeto cultural",
    href: "#",
  },
  {
    id: 5,
    tipo: "Paisagismo",
    nome: "Jardim [Residência]",
    resumo:
      "Paisagismo residencial de 900 m² com espécies predominantemente nativas da Mata Atlântica. O projeto prioriza biodiversidade, drenagem permeável e pouca manutenção; percursos em pedra lavrada articulam deck, espelho d’água e área de estar externa.",
    img: testImg("dina-paisagismo"),
    alt: "Foto de teste — paisagismo",
    href: "#",
  },
  {
    id: 6,
    tipo: "Objeto",
    nome: "Móvel sob medida",
    resumo:
      "Família de peças em marcenaria, pedra e metal desenhada sob medida para dialogar com projetos arquitetônicos do escritório. Cada peça é produzida em parceria com marceneiros e metalúrgicos parceiros, com foco em juntas aparentes, acabamentos tácteis e longevidade.",
    img: testImg("dina-mobiliario"),
    alt: "Foto de teste — mobiliário sob medida",
    href: "#",
  },
];

export const brand = {
  logoPreto: "/assets/logo-dina-preto.png",
  logoBranco: "/assets/logo-dina-branco.png",
};
