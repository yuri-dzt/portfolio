"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

/**
 * Registro único dos plugins. O GSAP entra só onde o scroll precisa mandar no
 * quadro da animação — coisa que IntersectionObserver não faz: ele avisa que
 * algo entrou, não *onde* está. Entradas simples continuam em CSS.
 *
 * O ScrollSmoother é importado estático, não sob demanda. Ele precisa existir
 * antes dos ScrollTriggers que ele vai reposicionar, e um import assíncrono o
 * criaria depois que o pin da dobra já mediu a página — o que aparece como um
 * salto no primeiro scroll. Trinta e poucos KB pela ordem certa é barato.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

export { gsap, ScrollTrigger, ScrollSmoother };
