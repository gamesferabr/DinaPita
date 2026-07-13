/** Conteúdo editável do site — serviços, projetos e contato */

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
const testImg = (seed, w = 900, h = 1200) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const galeria = (seedBase) => [
  testImg(`${seedBase}-01`, 1600, 1100),
  testImg(`${seedBase}-02`, 1600, 1100),
  testImg(`${seedBase}-03`, 1200, 1500),
  testImg(`${seedBase}-04`, 1600, 900),
];

export const projetos = [
  {
    id: 1,
    slug: "casa-lago-azul",
    tipo: "Residencial",
    nome: "Casa Lago Azul",
    resumo:
      "Residência de 420 m² implantada em terreno arborizado, com setorização em três blocos interligados por um pátio central.",
    descricao: [
      "A Casa Lago Azul nasce do encontro entre topografia acidentada e um pedido de privacidade absoluta. Optamos por fragmentar o programa em três blocos baixos, cada um com pé-direito e materialidade próprias, conectados por um pátio coberto que serve de pulmão da casa.",
      "Madeira nativa certificada, concreto aparente apicoado e caixilhos pretos finos compõem o repertório. O paisagismo, em parceria com o estúdio Mira Jardins, mantém a vegetação nativa preexistente e introduz espécies endêmicas de baixa manutenção.",
      "A iluminação foi pensada em três camadas — ambiente, tarefa e cênica — e o sistema de automação dialoga com a passagem do sol, fechando brises automaticamente nas horas mais quentes.",
    ],
    meta: {
      Local: "Itaipava, RJ",
      Ano: "2024",
      Área: "420 m²",
      Função: "Projeto arquitetônico e interiores",
      Equipe: "Dina Pita (autora), Ana Luiza, Rodrigo Mello",
    },
    img: testImg("dina-residencial"),
    galeria: galeria("dina-residencial"),
    alt: "Foto de teste — projeto residencial",
    href: "/projetos/casa-lago-azul",
  },
  {
    id: 2,
    slug: "loja-vinte-onze",
    tipo: "Comercial",
    nome: "Loja Vinte Onze",
    resumo:
      "Flagship de 180 m² desenhada como peça única: um gesto curvo em painéis ripados organiza vitrine, caixa e provador.",
    descricao: [
      "A flagship da Vinte Onze pedia uma identidade espacial tão forte quanto a tipografia da marca. Resolvemos com um único gesto: uma curva contínua de painéis de freijó que percorre a loja inteira, organizando vitrine, caixa, provador e estoque sem interrupções.",
      "O mobiliário central é móvel — araras, mesas e bancos podem ser reconfigurados a cada coleção, dando à equipe da marca autonomia para reinventar o espaço sem chamar arquitetos novamente.",
      "Iluminação pensada em três camadas reforça a escala do produto e a presença da marca quando vista da rua, mesmo com a loja fechada.",
    ],
    meta: {
      Local: "Vila Madalena, SP",
      Ano: "2025",
      Área: "180 m²",
      Função: "Projeto comercial e identidade espacial",
      Equipe: "Dina Pita (autora), Carolina Ferraz",
    },
    img: testImg("dina-comercial"),
    galeria: galeria("dina-comercial"),
    alt: "Foto de teste — projeto comercial",
    href: "/projetos/loja-vinte-onze",
  },
  {
    id: 3,
    slug: "apartamento-perdizes",
    tipo: "Interiores",
    nome: "Apartamento Perdizes",
    resumo:
      "Reforma integral de 210 m² com foco em luz natural e permeabilidade entre estar, cozinha e varanda.",
    descricao: [
      "A reforma do apartamento em Perdizes começou por demolir todas as divisórias não estruturais entre estar, cozinha e varanda. O resultado é um único grande ambiente atravessado por luz natural durante todo o dia.",
      "Optamos por uma paleta quase monocromática em tons de pedra, com tapetes de lã natural em pontos específicos para definir os usos. As peças de design autoral brasileiro convivem com o acervo de arte contemporânea do morador.",
      "A cozinha, antes escondida, virou o coração da casa: ilha em pedra Sabão, marcenaria em freijó tingido escuro e iluminação rebaixada que muda de temperatura ao longo do dia.",
    ],
    meta: {
      Local: "Perdizes, SP",
      Ano: "2023",
      Área: "210 m²",
      Função: "Reforma e interiores",
      Equipe: "Dina Pita (autora), Felipe Cunha",
    },
    img: testImg("dina-interiores"),
    galeria: galeria("dina-interiores"),
    alt: "Foto de teste — projeto de interiores",
    href: "/projetos/apartamento-perdizes",
  },
  {
    id: 4,
    slug: "espaco-paineiras",
    tipo: "Cultural",
    nome: "Espaço Paineiras",
    resumo:
      "Requalificação de um edifício histórico de 1.200 m² para abrigar galeria, biblioteca e auditório.",
    descricao: [
      "O Espaço Paineiras é a requalificação de um edifício de 1932 protegido pelo patrimônio. O projeto preserva integralmente a estrutura, alvenarias originais e caixilhos de ferro, e insere um núcleo contemporâneo em aço corten e vidro que resolve acessibilidade, climatização e novos programas.",
      "A galeria principal ocupa o salão central restaurado; biblioteca e administração ficam no novo núcleo. Um pátio descoberto, recém-aberto na cobertura, traz luz natural até o térreo e funciona como espaço de eventos.",
      "Cada intervenção nova é deliberadamente legível: contemporânea sem competir com a preexistência, conectando passado e presente sem mimetismo.",
    ],
    meta: {
      Local: "Centro Histórico, RJ",
      Ano: "2024",
      Área: "1.200 m²",
      Função: "Restauro e requalificação",
      Equipe: "Dina Pita (coordenação), equipe IPHAN, Ateliê Verbo",
    },
    img: testImg("dina-cultural"),
    galeria: galeria("dina-cultural"),
    alt: "Foto de teste — projeto cultural",
    href: "/projetos/espaco-paineiras",
  },
  {
    id: 5,
    slug: "jardim-mantiqueira",
    tipo: "Paisagismo",
    nome: "Jardim Mantiqueira",
    resumo:
      "Paisagismo residencial de 900 m² com espécies predominantemente nativas da Mata Atlântica.",
    descricao: [
      "O jardim ocupa toda a área externa de uma residência na Serra da Mantiqueira. O programa mistura áreas contemplativas, de circulação e de convivência, todas atravessadas por percursos em pedra lavrada local.",
      "A vegetação é predominantemente nativa, com 87% das espécies endêmicas da Mata Atlântica. O sistema de drenagem permeável evita escoamento e alimenta um pequeno espelho d’água com vida.",
      "A iluminação é discreta e exclusivamente em LED 2700K, posicionada para não interferir na vida noturna local — vagalumes, mariposas e morcegos polinizadores.",
    ],
    meta: {
      Local: "Serra da Mantiqueira, MG",
      Ano: "2025",
      Área: "900 m²",
      Função: "Projeto paisagístico",
      Equipe: "Dina Pita (autora), Mira Jardins",
    },
    img: testImg("dina-paisagismo"),
    galeria: galeria("dina-paisagismo"),
    alt: "Foto de teste — paisagismo",
    href: "/projetos/jardim-mantiqueira",
  },
  {
    id: 6,
    slug: "mobiliario-sob-medida",
    tipo: "Objeto",
    nome: "Móvel sob medida",
    resumo:
      "Família de peças em marcenaria, pedra e metal desenhada sob medida para projetos do escritório.",
    descricao: [
      "A linha de móveis sob medida nasceu da insatisfação com peças prontas que diluíam o partido dos projetos. Hoje cada projeto residencial é entregue com pelo menos uma peça desenhada exclusivamente para ele.",
      "Trabalhamos em parceria com marceneiros, marmoraristas e metalúrgicos do Rio e São Paulo. A prioridade é juntas aparentes, acabamentos tácteis e longevidade — peças pensadas para durarem mais do que o próprio imóvel.",
      "Algumas dessas peças, depois de testadas no projeto original, viraram pequenas séries limitadas vendidas pelo escritório.",
    ],
    meta: {
      Local: "Brasil",
      Ano: "Em curso",
      Tipologias: "Mesas, bancos, estantes, peças de iluminação",
      Função: "Design de objeto sob medida",
    },
    img: testImg("dina-mobiliario"),
    galeria: galeria("dina-mobiliario"),
    alt: "Foto de teste — mobiliário sob medida",
    href: "/projetos/mobiliario-sob-medida",
  },
];

export const contato = {
  telefone: "+55 (00) 00000-0000",
  email: "contato@dinapita.com",
  /**
   * Link do WhatsApp da agência (número internacional, sem + nem espaços).
   * Trocar 5521999999999 pelo número real ao publicar.
   */
  whatsappUrl:
    "https://wa.me/5521999999999?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20conversar%20com%20o%20escrit%C3%B3rio.",
  whatsappHeadline: "Bora falar de projeto pelo WhatsApp?",
  whatsappSub: "Manda uma mensagem — a gente responde em horário comercial.",
  endereco: ["Rua dos Arquitetos, 000", "São Paulo — SP, Brasil"],
  horario: "Seg–Sex · 9h às 18h",
  /** Foto do local — mesma referência da vitrine (commit original) */
  fotoLocalUrl:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
  fotoLocalAlt: "Imagem de arquitetura — substituir por foto do cliente",
  fotoLocalLegenda: "Imagem provisória — substituir",
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
    { id: "escritorio", label: "Escritório", type: "scroll" },
    { id: "contato", label: "Contato", type: "modal" },
  ],
  hero: {
    eyebrow: "Arquitetura & Interiores",
    titulo: "Dina Pita",
    subtitulo:
      "Arquiteta e diretora de projetos. Transformo terreno, luz e desejo em espaços com propósito — do primeiro croqui à entrega da obra.",
    imagem:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80",
    imagemAlt: "Interior de arquitetura contemporânea — substituir por foto do escritório",
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
