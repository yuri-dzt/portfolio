"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Registro único do plugin. O GSAP entra só onde o scroll precisa mandar no
 * quadro da animação — coisa que IntersectionObserver não faz: ele avisa que
 * algo entrou, não *onde* está. Entradas simples continuam em CSS.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
