/** Conteúdo editável do site — serviços, projetos e contato */

import { withBasePath } from "../utils/basePath.js";

const localImg = (path) => withBasePath(path);

export const servicos = [
  "Estratégia e programação arquitetônica",
  "Projeto arquitetônico e interiores",
  "Reforma e retrofit",
  "Acompanhamento de obra",
  "Consultoria de materiais e iluminação",
  "Visualização 3D / imagens de projeto",
];

function projeto({ id, slug, tipo, nome, resumo, pasta, fotos, alt, funcao }) {
  const [cover, ...resto] = fotos;
  return {
    id,
    slug,
    tipo,
    nome,
    resumo,
    descricao: [
      resumo,
      "Fotos do acervo do escritório — textos definitivos ainda podem ser ajustados.",
    ],
    meta: { Função: funcao },
    img: localImg(`/assets/projetos/${pasta}/${cover}`),
    galeria: resto.map((arquivo) => localImg(`/assets/projetos/${pasta}/${arquivo}`)),
    alt,
    href: `/projetos/${slug}`,
  };
}

/** Portfólio = só projetos com fotos do cliente (zip SITE-DP). */
export const projetos = [
  projeto({
    id: 1,
    slug: "allto-al-mar",
    tipo: "Comercial",
    nome: "Allto al Mar",
    resumo:
      "Restaurante com vista para o mar: salão, bar e lounges com materialidade contemporânea e identidade da marca.",
    pasta: "allto-al-mar",
    fotos: ["cover.jpg", "01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"],
    alt: "Recepção do Allto al Mar com letreiro da marca e poltronas pretas",
    funcao: "Projeto comercial de hospitalidade",
  }),
  projeto({
    id: 2,
    slug: "planeta-cafe-paris",
    tipo: "Comercial",
    nome: "Planeta Café Paris",
    resumo:
      "Café com paleta verde, nichos iluminados e balcão de atendimento — identidade espacial completa para operação em shopping.",
    pasta: "cafe-paris",
    fotos: ["cover.jpg", "01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"],
    alt: "Salão do Planeta Café Paris com parede verde e mesas de madeira",
    funcao: "Projeto comercial de food service",
  }),
  projeto({
    id: 3,
    slug: "clinica",
    tipo: "Saúde",
    nome: "Clínica",
    resumo:
      "Recepção e espera de clínica: bancada iluminada, assentos em linha e paleta clara de madeira, verde e off-white.",
    pasta: "clinica",
    fotos: ["cover.jpg", "01.jpg", "02.jpg"],
    alt: "Recepção da clínica com bancada e assentos verdes",
    funcao: "Projeto de interiores para saúde",
  }),
  projeto({
    id: 4,
    slug: "apartamento-piaui",
    tipo: "Residencial",
    nome: "Apartamento Piauí",
    resumo:
      "Interiores residenciais com marcenaria em madeira clara, varanda integrada e ambientes pensados para o dia a dia.",
    pasta: "ap-piaui",
    fotos: ["cover.jpg", "01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"],
    alt: "Estar do Apartamento Piauí, com sofá azul e painel de madeira",
    funcao: "Projeto de interiores residenciais",
  }),
  projeto({
    id: 5,
    slug: "apartamento-the-garden",
    tipo: "Residencial",
    nome: "Apartamento The Garden",
    resumo:
      "Apartamento com cozinha integrada, jardim vertical e estar aberto para a vista.",
    pasta: "ap-the-garden",
    fotos: ["cover.jpg", "01.jpg", "02.jpg", "03.jpg", "04.jpg"],
    alt: "Cozinha e estar do Apartamento The Garden com jardim vertical",
    funcao: "Projeto de interiores residenciais",
  }),
  projeto({
    id: 6,
    slug: "apartamento-enguaguacu",
    tipo: "Residencial",
    nome: "Apartamento Enguaguaçu",
    resumo:
      "Áreas comuns e terraço: estar com jardim vertical, jantar e pergolado em madeira com vista da cidade.",
    pasta: "ap-enguaguacu",
    fotos: ["cover.jpg", "01.jpg", "02.jpg", "03.jpg", "04.jpg"],
    alt: "Lounge do Apartamento Enguaguaçu com sofá branco e jardim vertical",
    funcao: "Projeto de interiores residenciais",
  }),
  projeto({
    id: 7,
    slug: "apartamento-sao-jose",
    tipo: "Residencial",
    nome: "Apartamento São José",
    resumo:
      "Apartamento compacto com estar, jantar e marcenaria em madeira clara, em paleta azul e off-white.",
    pasta: "ap-sao-jose",
    fotos: ["cover.jpg", "01.jpg"],
    alt: "Nicho de estar do Apartamento São José com sofá cinza e marcenaria",
    funcao: "Projeto de interiores residenciais",
  }),
  projeto({
    id: 8,
    slug: "apartamento-robert-sandall",
    tipo: "Residencial",
    nome: "Apartamento Robert Sandall",
    resumo:
      "Cozinha com ilha em madeira, marcenaria bege e iluminação linear contínua.",
    pasta: "ap-robert-sandall",
    fotos: ["cover.jpg"],
    alt: "Cozinha do Apartamento Robert Sandall com ilha e banquetas",
    funcao: "Projeto de interiores residenciais",
  }),
  projeto({
    id: 9,
    slug: "apartamento-acqua",
    tipo: "Residencial",
    nome: "Apartamento Acqua",
    resumo:
      "Sala de jantar com parede em madeira cubo, mesa de vidro e iluminação central.",
    pasta: "ap-acqua",
    fotos: ["cover.jpg"],
    alt: "Sala de jantar do Apartamento Acqua",
    funcao: "Projeto de interiores residenciais",
  }),
  projeto({
    id: 10,
    slug: "apartamento-bartolomeu",
    tipo: "Investidor",
    nome: "Apartamento Bartolomeu",
    resumo:
      "Unidade para investimento: quarto, kitchenette e banho resolvidos em metragem compacta.",
    pasta: "ap-bartolomeu",
    fotos: ["cover.jpg", "01.jpg", "02.jpg", "03.jpg", "04.jpg"],
    alt: "Quarto do Apartamento Bartolomeu com cama azul e remos na parede",
    funcao: "Interiores para unidade de investimento",
  }),
  projeto({
    id: 11,
    slug: "apartamento-investidor",
    tipo: "Investidor",
    nome: "Apartamento Investidor",
    resumo:
      "Studio para investimento com cama, kitchenette e mesa de apoio no mesmo ambiente.",
    pasta: "ap-investidor",
    fotos: ["cover.jpg", "01.jpg", "02.jpg"],
    alt: "Studio do Apartamento Investidor com cama e sofá",
    funcao: "Interiores para unidade de investimento",
  }),
];

export const contato = {
  telefone: "+55 (00) 00000-0000",
  email: "contato@dinapita.com",
  /**
   * Link do WhatsApp da agência (número internacional, sem + nem espaços).
   * Número real do cliente (mesmo do diagnóstico): +55 13 99130-5208.
   */
  whatsappUrl:
    "https://wa.me/5513991305208?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20conversar%20com%20o%20escrit%C3%B3rio.",
  whatsappHeadline: "Bora falar de projeto pelo WhatsApp?",
  whatsappSub: "Manda uma mensagem — a gente responde em horário comercial.",
  endereco: ["Rua dos Arquitetos, 000", "São Paulo — SP, Brasil"],
  horario: "Seg–Sex · 9h às 18h",
  /** Foto do local — mesma referência da vitrine (commit original) */
  fotoLocalUrl: localImg("/assets/hero.jpg"),
  fotoLocalAlt: "Salão do Allto al Mar com vista para o mar",
  fotoLocalLegenda: "Allto al Mar",
  social: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "Behance", href: "https://behance.net/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
  ],
};

export const brand = {
  logoPreto: "/assets/logo-dina-preto.png",
  logoBranco: "/assets/logo-dina-branco.png",
  monograma: "dp",
};

/** Conteúdo da nova home editorial (estilo warm/rounded). */
export const home = {
  nav: [
    { id: "inicio", label: "Início", type: "scroll" },
    { id: "projetos", label: "Projetos", type: "scroll" },
    { id: "diagnostico", label: "Diagnóstico", type: "scroll" },
    { id: "escritorio", label: "Escritório", type: "scroll" },
    { id: "contato", label: "Contato", type: "modal" },
  ],
  hero: {
    eyebrow: "Arquitetura & Interiores",
    titulo: "Dina Pita",
    subtitulo:
      "Arquiteta e diretora de projetos. Transformo terreno, luz e desejo em espaços com propósito — do primeiro croqui à entrega da obra.",
    imagem: localImg("/assets/hero.jpg"),
    imagemAlt: "Salão do Allto al Mar com mesas, cadeiras verdes e vista para o mar",
    badge: "Diagnóstico de estilo · grátis, 2 minutos",
    ctaDiagnostico: "Descubra seu estilo",
    ctaPrimario: "Fale comigo",
    ctaSecundario: "Ver projetos",
  },
  marquee: [
    "Arquitetura",
    "Interiores",
    "Reforma",
    "Retrofit",
    "Paisagismo",
    "Consultoria",
    "Visualização 3D",
  ],
  statement: {
    intro: "Projeto",
    destaque: "com intenção,",
    resto:
      "técnica e sensibilidade. Meu trabalho conecta partido, materialidade e luz para transformar ideias em espaços reais de viver e trabalhar. Não entrego apenas plantas — entrego direção, clareza e obra com identidade.",
  },
  serviceCards: [
    {
      titulo: "Projeto & Interiores",
      texto:
        "Do conceito à obra: arquitetura e interiores integrados, desenhados para o seu modo de viver.",
    },
    {
      titulo: "Reforma & Retrofit",
      texto:
        "Requalificação de espaços existentes com foco em luz natural, fluxo e materialidade honesta.",
    },
    {
      titulo: "Consultoria & 3D",
      texto:
        "Consultoria de materiais, iluminação e imagens 3D para você decidir com clareza antes de construir.",
    },
  ],
  cta: {
    titulo: "Vamos começar seu projeto",
    subtitulo: "Cada projeto começa com uma conversa sobre visão, propósito e espaço.",
    whatsapp: "Fale no WhatsApp",
    secundario: "Enviar mensagem",
  },
};
