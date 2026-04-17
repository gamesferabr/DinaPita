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
    resumo: "Uma linha curta sobre tipologia, local e conceito.",
    img: testImg("dina-residencial"),
    alt: "Foto de teste — projeto residencial",
    href: "#",
  },
  {
    id: 2,
    tipo: "Comercial",
    nome: "Loja [Nome]",
    resumo: "Destaque uso, metragem aproximada ou desafio do briefing.",
    img: testImg("dina-comercial"),
    alt: "Foto de teste — projeto comercial",
    href: "#",
  },
  {
    id: 3,
    tipo: "Interiores",
    nome: "Apartamento [Bairro]",
    resumo: "Materiais, luz, integração de áreas.",
    img: testImg("dina-interiores"),
    alt: "Foto de teste — projeto de interiores",
    href: "#",
  },
  {
    id: 4,
    tipo: "Cultural",
    nome: "Espaço [Instituição]",
    resumo: "Patrimônio, acessibilidade, cronograma.",
    img: testImg("dina-cultural"),
    alt: "Foto de teste — projeto cultural",
    href: "#",
  },
  {
    id: 5,
    tipo: "Paisagismo",
    nome: "Jardim [Residência]",
    resumo: "Vegetação nativa, drenagem e áreas comuns.",
    img: testImg("dina-paisagismo"),
    alt: "Foto de teste — paisagismo",
    href: "#",
  },
  {
    id: 6,
    tipo: "Objeto",
    nome: "Móvel sob medida",
    resumo: "Marcenaria, metal ou pedra como complemento ao projeto.",
    img: testImg("dina-mobiliario"),
    alt: "Foto de teste — mobiliário sob medida",
    href: "#",
  },
];

export const brand = {
  logoPreto: "/assets/logo-dina-preto.png",
  logoBranco: "/assets/logo-dina-branco.png",
};
