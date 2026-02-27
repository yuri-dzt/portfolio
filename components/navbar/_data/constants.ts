import { Section } from "./types";

export const NAV_ITEMS: { id: Section; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "sobre", label: "Sobre" },
  { id: "capabilities", label: "Especialidades" },
  { id: "projetos", label: "Projetos" },
  { id: "contatos", label: "Contatos" },
];

export const NAV_IDS: Section[] = [
  "home",
  "sobre",
  "capabilities",
  "projetos",
  "contatos",
];