import { Project } from "@/types/project";
import { GraduationCap } from "lucide-react";

export const formations = [
  {
    type: "Graduação",
    course: "Análise e Desenvolvimento de Sistemas",
    institution: "Unilavras",
    period: "2023 — 2024",
    icon: GraduationCap,
  },
];

export const capabilities = {
  Frontend: [
    "React.js",
    "Next.js (App Router)",
    "Server Actions",
    "Tailwind CSS",
    "Shadcn/ui",
    "Framer Motion",
    "React Native",
  ],

  Backend: [
    "Node.js",
    "Express.js",
    "Prisma ORM",
    "MySQL",
    "PostgreSQL",
    "Docker",
    "Supabase",
    "REST APIs",
    "Autenticação & Autorização",
    "Testes Automatizados (Vitest)",
  ],

  Arquitetura: [
    "Clean Architecture",
    "DDD",
    "SOLID",
    "Repository Pattern",
    "Use Case Pattern",
    "Design de APIs REST",
    "Tratamento de Erros",
  ],

  Produto: [
    "Arquitetura SaaS",
    "API-first Design",
    "Sistemas Multi-tenant",
    "Desenvolvimento de Boilerplates",
  ],

  "AI in Products": [
    "Integração com OpenAI API",
    "Funcionalidades com LLM",
    "Prompt Engineering (Prático)",
    "Automações com n8n",
  ],

  Outros: [
    "Git Workflow",
    "Estratégia de Branching",
    "Conventional Commits (Gitmoji)",
    "Python (Scripts)",
    "Java (Fundamentos Básicos)",
    "LG WebOS (Apps para TV)",
  ],
};

export const projects = [
  //* developing
  {
    name: "CONTROL CA$H",
    type: "Mini ERP Financeiro SaaS",
    status: "developing",
    description:
      "Mini ERP financeiro SaaS multi-tenant em desenvolvimento. Arquitetado com separação clara entre domínio do produto e da plataforma, aplicando controle de permissões granular e modelagem robusta de recorrências financeiras. Foco em escalabilidade e previsibilidade operacional.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Docker"],
    link: "https://github.com/yuri-dzt/control-cash-backend",
  },
  {
    name: "Thezis",
    type: "Plataforma IA para Redação",
    status: "developing",
    description:
      "Plataforma de IA para treino de redação voltada ao ENEM. Estruturada com geração dinâmica de temas e correção baseada nas cinco competências oficiais, entregando avaliação detalhada e feedback acionável. Foco em evolução mensurável do aluno.",
    stack: ["Next.js", "Node.js", "OpenAI", "PostgreSQL", "Tailwind"],
    link: "https://github.com/yuri-dzt/thezis-api",
  },

  //* active
  {
    name: "Yssy",
    type: "Aplicação Interna",
    status: "active",
    description:
      "Sistema interno fullstack desenvolvido do zero para centralização de processos empresariais. Arquitetado com foco em escalabilidade, organização de domínio e manutenibilidade a longo prazo. Atua como núcleo operacional da empresa.",
    stack: ["React.js", "Node.js", "MySQL", "Prisma"],
    link: "https://yssy.zolve.dev/login",
  },
  {
    name: "Zolve TV / TVGPR",
    type: "App Nativo LG WebOS",
    status: "active",
    description:
      "Aplicações nativas para LG WebOS utilizadas em clínicas odontológicas. Implementa autenticação via QR Code e gerenciamento de playlists personalizadas por unidade. Foco em estabilidade, integração e experiência contínua em ambiente físico.",
    stack: ["LG WebOS", "React.js", "Node.js"],
    link: "https://tv.zolve.dev/login",
  },
  {
    name: "Rhetoric",
    type: "Ferramenta de Copy",
    status: "active",
    description:
      "Ferramenta de geração de copy com IA para redes sociais. Estruturada para respostas rápidas e personalizadas, com arquitetura simples e eficiente orientada a produto. Foco em produtividade criativa e validação rápida de ideias.",
    stack: ["Next.js", "OpenAI", "Tailwind"],
    link: "https://rhetoric.zolve.dev/login",
  },
  {
    name: "Brevy",
    type: "Ferramenta IA",
    status: "active",
    description:
      "Aplicação de resumo automático de textos longos com IA. Desenvolvida com foco em performance e clareza de interface, priorizando experiência fluida e entrega objetiva de informação. Orientada a consumo rápido de conteúdo.",
    stack: ["Next.js", "IA", "Tailwind"],
    link: "https://github.com/yuri-dzt/brevy-api",
  },
  {
    name: "Boilerplate — Frontend",
    type: "Dev Tooling",
    status: "active",
    description:
      "Template base para aplicações frontend com arquitetura organizada e autenticação pronta. Estruturado com boas práticas, tipagem forte e separação clara de responsabilidades. Foco em acelerar novos projetos sem comprometer qualidade.",
    stack: ["Next.js", "Tailwind", "TypeScript"],
    link: "https://github.com/yuri-dzt/stack-base-frontend",
  },
  {
    name: "Boilerplate — Backend",
    type: "Dev Tooling",
    status: "active",
    description:
      "Template base para APIs com arquitetura escalável e padrão estruturado. Inclui autenticação configurada, organização por camadas e integração com banco relacional. Foco em consistência técnica e ganho de produtividade.",
    stack: ["Node.js", "Prisma", "Docker"],
    link: "https://github.com/yuri-dzt/stack-base-backend",
  },
  {
    name: "Landing Pages",
    type: "Web Design",
    status: "active",
    description:
      "Coleção com mais de 50 landing pages voltadas à conversão. Desenvolvidas com foco em performance, responsividade e clareza de proposta de valor. Estrutura pensada para testes rápidos e validação de produtos digitais.",
    stack: ["Next.js", "Tailwind", "React.js"],
  },

  //* paused
  {
    name: "Framefree",
    type: "Mini CRM SaaS",
    status: "paused",
    description:
      "Mini CRM SaaS multi-tenant focado em gestão de leads e pipeline. Arquitetado com separação entre domínio de produto e plataforma, incluindo histórico de etapas e personalização por organização. Foco em flexibilidade e controle comercial.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Docker"],
  },
  {
    name: "WalletWise",
    type: "AI Expense API",
    status: "paused",
    description:
      "API para categorização automática de despesas utilizando IA. Desenvolvida com Node.js e Clean Architecture, aplicando DDD e TDD para garantir organização de domínio e testabilidade. Foco em automação financeira confiável.",
    stack: ["Node.js", "Express", "TypeScript", "OpenAI", "Vitest"],
    link: "https://github.com/yuri-dzt/wallet-wise-api",
  },

  //* discontinued
  {
    name: "IAra",
    type: "IA de Atendimento",
    status: "discontinued",
    description:
      "IA voltada ao atendimento automatizado para clínicas odontológicas. Estruturada para fornecer informações sobre tratamentos e realizar agendamentos de forma conversacional. Foco em eficiência operacional e redução de carga manual.",
    stack: ["IA", "Node.js", "React.js"],
  },
  {
    name: "ERP",
    type: "Sistema de Gestão",
    status: "discontinued",
    description:
      "ERP completo desenvolvido para gestão interna empresarial. Estruturado com múltiplos módulos integrados e modelagem consistente de domínio. Descontinuado por decisão estratégica de produto.",
    stack: ["React.js", "Node.js", "MySQL"],
  },
] as Project[];

export const contacts = [
  {
    label: "Email",
    value: "yuridonizete303@gmail.com",
    href: "mailto:yuridonizete303@gmail.com",
    icon: "M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    label: "LinkedIn",
    value: "yuri-donizete",
    href: "https://www.linkedin.com/in/yuri-donizete-58092b266/",
    icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z",
  },
  {
    label: "GitHub",
    value: "yuri-dzt",
    href: "https://github.com/yuri-dzt",
    icon: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22",
  },
  {
    label: "Instagram",
    value: "@yuridzt",
    href: "https://www.instagram.com/yuridzt/",
    icon: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 19.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z",
  },
  {
    label: "Telefone",
    value: "(35) 9 9919-6082",
    href: "tel:+5535999196082",
    icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  },
];