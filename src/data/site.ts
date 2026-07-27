/**
 * CONTEÚDO DO SITE
 * Edite tudo aqui. Nenhum texto fica preso nos componentes.
 * Onde houver "TODO", confirme ou troque pelo dado real.
 */

export const profile = {
  name: "Yuri Donizete",
  role: "Desenvolvedor Full Stack",
  location: "Perdões, MG · disponível para trabalho remoto",
  // Frase curta de posicionamento (aparece no hero)
  tagline:
    "Construo produtos digitais e software escalável, do banco de dados à interface, com foco em performance e código que sobrevive ao tempo.",
  // Caminho do avatar em /public. Troque avatar.jpg pela sua foto.
  avatar: "/avatar.jpg",
  // Caminho do currículo em /public. Coloque seu PDF como curriculo.pdf.
  resume: "/curriculo.pdf",
  available: true, // mostra o selo "Disponível para novos projetos"
};

export const socials = {
  email: "yuridonizete303@gmail.com", // e-mail do currículo; troque se preferir o profissional
  whatsapp: "5535999196082", // (35) 99919-6082
  github: "https://github.com/yuri-dzt",
  linkedin: "https://www.linkedin.com/in/yuridonizete",
  instagram: "https://instagram.com/yuridzt", // TODO: confirme seu @ profissional
};

export const whatsappMessage =
  "Olá, Yuri! Vi seu portfólio e gostaria de conversar sobre um projeto.";

// ---------- CAMADAS ----------
/**
 * A pilha 3D que se abre com o scroll. É a frase "do banco de dados à
 * interface" virando objeto: da superfície que o usuário toca até o servidor
 * embaixo. A ordem importa — de cima (o que se vê) para baixo (o que sustenta).
 */
export const stackLayers: { label: string; stack: string; note: string }[] = [
  {
    label: "Interface",
    stack: "React · Next.js · TypeScript",
    note: "A tela que o usuário toca. Estado de carregamento, leitura no celular e tempo de resposta entram na conversa desde o começo, não no fim.",
  },
  {
    label: "API",
    stack: "Node.js · Fastify · Zod",
    note: "Clean Architecture e DDD com domain, application e infrastructure separados. As regras críticas têm teste automatizado.",
  },
  {
    label: "Dados",
    stack: "PostgreSQL · Prisma · pgvector",
    note: "Modelagem antes de código. E pgvector dentro do Postgres que já roda, em vez de subir mais um serviço só para busca vetorial.",
  },
  {
    label: "Infra",
    stack: "Linux · Docker · Nginx",
    note: "Deploy conteinerizado, proxy reverso, SSL, cron e o acesso fechado ao que não pode ficar exposto na rede.",
  },
];

// ---------- SOBRE ----------
export const about = {
  paragraphs: [
    "Sou desenvolvedor full stack e trabalho com o ciclo completo de um produto: modelagem de dados, API, regras de negócio e a interface que o usuário realmente toca. Gosto de entender o problema antes de escrever a primeira linha, porque quase todo bug caro nasce de uma decisão tomada cedo demais.",
    "Minha preocupação central é escrever software que dê pra manter. Prefiro uma arquitetura simples e explícita a uma abstração esperta que ninguém entende seis meses depois. Penso em escalabilidade desde o começo, mas sem otimizar o que ainda não é problema.",
    "Do lado do usuário, trato interface e performance como parte da mesma conversa: uma tela bonita que trava não resolve nada. Cuido de tempo de resposta, estados de carregamento, acessibilidade e dos detalhes que fazem um produto parecer confiável.",
  ],
  // números/indicadores (edite os valores)
  stats: [
    // Carreira iniciada em março de 2023 — atualize o número a cada ano.
    { value: "3", label: "anos escrevendo software" },
    { value: "100+", label: "clínicas usando o que construí" },
    { value: "20", label: "aplicações na plataforma interna" },
  ],
};

// ---------- TECNOLOGIAS ----------
export const techGroups: { title: string; items: string[] }[] = [
  {
    title: "Back-end",
    items: ["Node.js", "TypeScript", "Fastify", "Express", "APIs REST", "Prisma", "JWT", "Zod"],
  },
  {
    title: "Front-end",
    items: ["React", "Next.js", "TailwindCSS", "React Native"],
  },
  {
    title: "IA aplicada",
    items: ["RAG", "Embeddings", "Busca vetorial", "APIs de LLM", "Engenharia de prompt"],
  },
  {
    title: "Bancos de dados",
    items: ["PostgreSQL", "pgvector", "MySQL"],
  },
  {
    title: "Infra e DevOps",
    items: ["Linux (Ubuntu)", "Docker", "Docker Compose", "Nginx", "SSL/Certbot", "Cloudflare", "MinIO", "cron", "SSH"],
  },
  {
    title: "Práticas",
    items: ["Clean Architecture", "DDD", "Testes automatizados", "Segurança e hardening", "Git", "Code review", "Scrum"],
  },
  {
    title: "Linguagens e automação",
    items: ["JavaScript", "Python", "SQL", "HTML", "CSS", "N8N"],
  },
];

// ---------- EXPERIÊNCIA ----------
export const experience: {
  role: string;
  company: string;
  period: string;
  description: string;
  bullets: string[];
}[] = [
  {
    role: "Desenvolvedor Full Stack",
    company: "Grupo Plataforma em Rede · Perdões, MG (híbrido)",
    period: "Março 2023 · Atual",
    description:
      "Todas as camadas de uma plataforma interna com 20 aplicações, usada por mais de 100 clínicas e consultórios odontológicos. Do levantamento à operação em produção.",
    bullets: [
      "Comecei em 2023 desenvolvendo landing pages para dentistas e clínicas; de 2024 em diante, os sistemas da plataforma.",
      "Defini a arquitetura padrão dos back-ends em Clean Architecture e DDD com Fastify, com domain, application e infrastructure separados e testes nas regras críticas.",
      "Construí o CRM internamente, depois que nenhuma opção de mercado atendeu ao processo de vendas, junto do sistema de cadastro e gestão da base de clientes.",
      "Gerador de planos de ação sobre API de LLM em vez de modelo fixo: a partir de um formulário estruturado, produz o plano da clínica e um plano individual por colaborador.",
      "ZolveTV, aplicação para TVs LG de salas de espera, com foco em performance em hardware limitado e execução contínua sem ninguém operar a tela.",
      "Automação de processos internos com N8N e Python, tirando da equipe rotinas manuais recorrentes.",
      "Deploy e administração do servidor Linux: Docker Compose, Nginx como proxy reverso, SSL com Certbot, cron, DNS e CDN no Cloudflare.",
      "Fechei o acesso público aos serviços de dados de produção (30+ containers em duas VMs): bancos alcançáveis só pelo host, senha obrigatória no Redis e SSH por chave, com snapshot e rollback testado, sem indisponibilidade.",
    ],
  },
];

// ---------- PROJETOS ----------
export type Project = {
  name: string;
  description: string;
  problem: string;
  result: string;
  tech: string[];
  highlights: string[];
  image?: string; // caminho em /public (troque pelas suas imagens)
  // URL de um site no ar para exibir dentro do card como prévia ao vivo (iframe).
  // Só funciona se o site permitir embed (sem X-Frame-Options / CSP frame-ancestors).
  // Quando preenchido, substitui a imagem estática.
  preview?: string;
  private: boolean;
  // Repositórios públicos do projeto. Use um item por repo (ex.: back-end e front-end).
  repos?: { label: string; url: string }[];
  link?: string;
};

export const projects: Project[] = [
  {
    name: "Bloom — SaaS multi-tenant white-label",
    description:
      "Plataforma onde cada organização tem seu próprio portal de conteúdo, com identidade visual, biblioteca e membros isolados, em subdomínio ou domínio personalizado.",
    problem:
      "Quem ensina espalha o material em PDFs no Drive e vídeos soltos no YouTube: sem identidade própria, sem organização e sem controle de quem acessa o quê.",
    result:
      "Portal no ar em dias, com a cara do cliente, biblioteca organizada e acesso liberado por convite ou por venda avulsa de material.",
    tech: ["Next.js 16", "React 19", "TypeScript", "Prisma", "PostgreSQL"],
    highlights: [
      "Isolamento de tenants em duas barreiras: o identificador da organização vem do host, nunca do cliente, e o Row Level Security do PostgreSQL é a segunda camada.",
      "Módulos e planos modelados como dado, não como código: habilitar um recurso para uma organização não exige mexer na aplicação.",
      "Decisões de arquitetura registradas em ADRs.",
    ],
    preview: "https://bloom-saas.vercel.app",
    link: "https://bloom-saas.vercel.app",
    private: false,
  },
  {
    name: "Perguntas e respostas sobre base de conhecimento (RAG)",
    description:
      "Sistema que responde perguntas em cima da base de documentos da empresa, citando a página de origem da resposta.",
    problem:
      "A informação existia, mas estava presa em PDFs longos: achar a resposta certa dependia de alguém que soubesse onde procurar.",
    result:
      "Taxa de fallback caiu de 60% para 10%. A avaliação automatizada mostrou que a recuperação trazia as páginas certas e que o gargalo estava no prompt.",
    tech: ["Node.js", "TypeScript", "Fastify", "PostgreSQL", "pgvector", "React"],
    highlights: [
      "Pipeline de ingestão completo: parse de PDF, chunking, geração de embeddings e gravação dos vetores.",
      "pgvector dentro do PostgreSQL que já usávamos, em vez de um banco vetorial dedicado: um serviço a menos em operação, vetor e metadado na mesma consulta.",
      "70 testes unitários que rodam sem banco e sem chave de API; provedores de embedding e de LLM trocáveis sem mexer nas regras de negócio.",
    ],
    private: true,
  },
  {
    name: "Gerador automatizado de carrossel para redes sociais",
    description:
      "Pipeline que coleta os dados, escreve a copy e renderiza as imagens prontas para publicar no Instagram.",
    problem:
      "Produzir carrossel à mão custava tempo da equipe, e a primeira versão automatizada saía cara demais para rodar no volume necessário.",
    result:
      "Custo por carrossel caiu de mais de R$ 1,00 para menos de R$ 0,01, e o tempo de 3 minutos para 30 segundos, com ajuste de prompt e mudanças na plataforma.",
    tech: ["Python", "Docker", "APIs de LLM"],
    highlights: [
      "Três camadas independentes — coleta de dados, geração de copy com estrutura AIDA e renderização visual — orquestradas por uma API própria.",
      "Saída no formato nativo do Instagram (1080×1350), pronta para publicar.",
      "Tudo roda em container.",
    ],
    // TODO: coloque um print real do projeto em /public/projects/ e aponte aqui
    // (ex.: image: "/projects/rag.jpg") — o card volta a ter área de mídia.
    // image: "",
    private: true,
  },
  {
    name: "HeyChef — cardápio digital e pedidos por QR Code",
    description:
      "SaaS para restaurantes: o cliente abre o cardápio pelo QR Code da mesa e o pedido vai direto para a cozinha.",
    problem:
      "Cardápio impresso e pedido anotado à mão travam o giro das mesas e abrem espaço para erro entre o salão e a cozinha.",
    result:
      "Pedido feito pelo próprio cliente, sem intermediário, chegando na cozinha já vinculado à mesa.",
    tech: ["Node.js", "TypeScript", "Express", "Prisma", "PostgreSQL", "React", "JWT"],
    highlights: [
      "Back-end em Clean Architecture com quatro camadas.",
      "Validação com Zod, autenticação JWT e rate limiting.",
      "API documentada em Swagger.",
    ],
    private: false,
    repos: [
      { label: "Back-end", url: "https://github.com/yuri-dzt/heychef-backend" },
      { label: "Front-end", url: "https://github.com/yuri-dzt/heychef-frontend" },
    ],
    // TODO: quando subir na Vercel, descomente as duas linhas abaixo com a URL —
    // o card passa a mostrar a prévia ao vivo em iframe, igual ao Bloom.
    // preview: "https://heychef.vercel.app",
    // link: "https://heychef.vercel.app",
  },
  {
    name: "Controle de ponto e banco de horas",
    description:
      "Sistema que apura jornada, intervalos e banco de horas da equipe, com gestão de afastamentos e anexos.",
    problem:
      "A apuração dependia de uma ferramenta terceirizada mais conferência manual da equipe todo mês.",
    result:
      "Apuração automática que substituiu a ferramenta e o trabalho manual, com economia de R$ 1.400 por ano em licença.",
    tech: ["Node.js", "TypeScript", "Fastify", "Prisma", "MinIO", "React"],
    highlights: [
      "Regras de jornada, intervalos, dias irregulares e tolerância por batida.",
      "Afastamentos com anexos em object storage: excluir o afastamento apaga o arquivo, sem registro órfão.",
      "68 testes cobrindo os cenários de cálculo, incluindo bordas de entrada, saída e dupla marcação.",
    ],
    private: true,
  },
  {
    name: "Gerador de apresentação comercial com simulação por IA",
    description:
      "A partir de uma foto e dos dados do procedimento, monta um deck comercial de 10 slides para uso durante o atendimento.",
    problem:
      "Montar apresentação para cada paciente na hora do atendimento era inviável, e sem material visual a proposta perdia força.",
    result:
      "Deck completo gerado na hora, com simulação visual do resultado esperado e textos prontos em cada slide.",
    tech: ["Node.js", "TypeScript", "Fastify", "React", "APIs de IA generativa"],
    highlights: [
      "Deck de 10 slides montado a partir de um formulário e de uma foto.",
      "IA generativa produzindo a simulação visual do resultado esperado.",
      "Textos de cada slide gerados junto com a apresentação.",
    ],
    private: true,
  },
  {
    name: "Infraestrutura compartilhada da plataforma",
    description:
      "Base comum dos 20 produtos da plataforma: design system, autenticação centralizada e template de projeto.",
    problem:
      "Cada produto tinha o seu login, o seu jeito de montar tela e o seu processo de publicar — o mesmo trabalho refeito a cada aplicação nova.",
    result:
      "Criar e publicar uma aplicação nova ficou bem mais rápido, e a interface passou a ser a mesma em todos os produtos.",
    tech: ["React", "Node.js", "TypeScript", "Fastify", "Prisma", "JWT", "Docker"],
    highlights: [
      "Design system em React com tokens semânticos e dark mode, hoje usado por todos os produtos.",
      "Autenticação centralizada em um serviço próprio com JWT.",
      "Template padrão: API e front buildado sobem em um único processo, uma porta e um container.",
    ],
    private: true,
  },
  {
    name: "Agente de suporte no WhatsApp",
    description:
      "Automação que atende o suporte pelo WhatsApp: o agente tenta resolver o problema sozinho e, quando não consegue, abre um card no Trello e chama o responsável.",
    problem:
      "Todo problema relatado no WhatsApp virava mensagem solta: dúvida repetida consumia o time, e o que era caso real se perdia sem ninguém dono do atendimento.",
    result:
      "As dúvidas recorrentes passaram a ser resolvidas na hora pelo próprio agente, e só o que ele não dá conta chega ao time — já registrado no Trello, com contexto e responsável avisado.",
    tech: ["WhatsApp", "Trello API", "Automação"], // TODO: complete com a stack real (linguagem, modelo de IA, hospedagem)
    highlights: [
      "Primeira camada de atendimento automática: o agente tenta resolver antes de escalar.",
      "Escalonamento só quando necessário, com abertura de card no Trello a partir da conversa.",
      "Notificação dos responsáveis assim que um problema novo entra na fila.",
    ],
    // TODO: coloque um print real do projeto em /public/projects/ e aponte aqui
    // (ex.: image: "/projects/rag.jpg") — o card volta a ter área de mídia.
    // image: "",
    private: true,
  },
  {
    name: "Landing pages para clínicas odontológicas",
    description:
      "Páginas de captação feitas sob medida para dentistas e clínicas, do layout à publicação — o trabalho com que comecei, em 2023.",
    problem:
      "Clínica que só existia no Instagram não tinha para onde mandar quem queria marcar: sem endereço próprio, sem contato direto, sem credibilidade.",
    result:
      "Cada clínica com página própria no ar, com contato direto e presença que não depende de rede social.",
    tech: ["React", "Next.js", "TypeScript", "TailwindCSS"], // TODO: ajuste conforme as páginas que você fez
    highlights: [
      "Layout feito caso a caso, sem template genérico.",
      "Foco em leitura no celular e carregamento rápido.",
      "Contato direto com a clínica a partir da página.",
    ],
    // TODO: coloque um print real do projeto em /public/projects/ e aponte aqui
    // (ex.: image: "/projects/rag.jpg") — o card volta a ter área de mídia.
    // image: "",
    private: false,
    link: "", // coloque aqui a URL de uma página publicada, se quiser mostrar
  },
  {
    name: "Painel interno de prospecção",
    description:
      "Dashboard que eu construí para uso próprio, para organizar leads, mensagens e status de contato em um lugar só.",
    problem:
      "Controlar prospecção em planilha e anotação solta fazia contato esfriar sem retorno e eu perder o histórico de quem já tinha sido abordado.",
    result:
      "Prospecção organizada em um painel só, com status por contato e histórico do que já foi enviado.",
    tech: ["React", "TypeScript", "Node.js"], // TODO: confirme a stack real
    highlights: [
      "Cadastro e acompanhamento de leads com status de contato.",
      "Mensagens prontas para agilizar a abordagem.",
      "Busca e filtros sobre a base de contatos.",
    ],
    // TODO: coloque um print real do projeto em /public/projects/ e aponte aqui
    // (ex.: image: "/projects/rag.jpg") — o card volta a ter área de mídia.
    // image: "",
    private: true,
  },
];

// ---------- RESULTADOS MEDIDOS ----------
/**
 * Substitui as antigas seções de "diferenciais" e "processo", que eram
 * adjetivo puro. Aqui é só o que dá para medir: número antes, número depois.
 * Todos vieram do currículo — não invente linha sem dado real por trás.
 */
export const results: {
  label: string;
  before: string;
  after: string;
  note?: string;
}[] = [
  {
    label: "Fallback na busca da base de conhecimento",
    before: "60%",
    after: "10%",
    note: "a avaliação automatizada mostrou que a recuperação trazia as páginas certas: o gargalo estava no prompt",
  },
  {
    label: "Custo por carrossel gerado com IA",
    before: "R$ 1,00",
    after: "R$ 0,01",
    note: "ajuste de prompt e mudanças na plataforma",
  },
  {
    label: "Tempo por carrossel gerado",
    before: "3 min",
    after: "30 s",
  },
  {
    label: "Licença anual da ferramenta de ponto",
    before: "R$ 1.400",
    after: "R$ 0",
    note: "sistema próprio substituiu a ferramenta terceirizada e a conferência manual da equipe",
  },
  {
    label: "Serviços de dados de produção abertos na rede",
    before: "acesso público",
    after: "só pelo host",
    note: "30+ containers em duas VMs, com snapshot e rollback testados, sem indisponibilidade",
  },
];

// ---------- FORMAÇÃO E CERTIFICAÇÕES ----------
export const education: {
  course: string;
  institution: string;
  period: string;
  location: string;
}[] = [
  {
    course: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
    institution: "Unilavras Centro Universitário",
    period: "Janeiro 2023 · Fevereiro 2025",
    location: "Lavras, MG",
  },
];

export const certifications: {
  name: string;
  issuer: string;
  hours: string;
  date: string;
}[] = [
  {
    name: "Desenvolvimento de Software Back-End",
    issuer: "Unilavras",
    hours: "240 horas",
    date: "Novembro 2024",
  },
  {
    name: "Desenvolvimento Front-End",
    issuer: "Unilavras",
    hours: "220 horas",
    date: "Março 2024",
  },
  {
    name: "Desenvolvimento Mobile",
    issuer: "Unilavras",
    hours: "160 horas",
    date: "Janeiro 2025",
  },
];

