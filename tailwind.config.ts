import type { Config } from "tailwindcss";

/**
 * PALETA — grafite quente + âmbar
 *
 * Escuro, mas de temperatura quente: os neutros puxam para o marrom, não para
 * o azul. Isso já tira o site do quase-preto azulado que todo gerador entrega.
 * O âmbar é a única cor saturada, e ela carrega o bloco de contato inteiro.
 *
 * Todos os pares de texto/fundo foram medidos: o menor é 4,86:1, acima do
 * mínimo AA de 4,5:1 para corpo de texto.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // grafite quente
        bg: "oklch(0.17 0.012 62)",
        surface: "oklch(0.212 0.013 62)",
        elevated: "oklch(0.25 0.014 62)",
        line: "oklch(0.325 0.014 62)",
        ink: "oklch(0.945 0.012 78)",
        muted: "oklch(0.77 0.016 78)",
        faint: "oklch(0.645 0.016 78)",

        // âmbar
        accent: "oklch(0.79 0.13 78)",
        accent2: "oklch(0.87 0.115 84)",

        // campo de âmbar (contato) e o que vai escrito sobre ele
        field: "oklch(0.79 0.13 78)",
        "field-2": "oklch(0.72 0.125 76)",
        "on-field": "oklch(0.19 0.02 62)",
        "on-field-soft": "oklch(0.33 0.035 64)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "1120px",
      },
    },
  },
  plugins: [],
};

export default config;
