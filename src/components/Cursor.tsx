"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** O que faz o anel crescer. Tudo que responde a clique. */
const INTERACTIVE = "a, button, [role='button'], input, textarea, select, summary";

/**
 * Um anel que persegue o ponteiro com atraso e cresce sobre o que é clicável.
 *
 * O cursor nativo continua ali por baixo, intacto. Essa é a diferença entre o
 * efeito e a gincana: quem substitui a seta do sistema por um ponto próprio
 * cobra do visitante meio segundo de mira em cada link, e ninguém veio aqui
 * caçar botão.
 *
 * Some inteiro em toque e com movimento reduzido — um anel com massa é
 * literalmente o movimento que a preferência pede para desligar.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ring.current;
    if (!el) return;

    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    gsap.set(el, { xPercent: -50, yPercent: -50 });

    /* `quickTo` reaproveita um tween só em vez de criar um por evento: o
       ponteiro dispara dezenas de vezes por segundo. O atraso É o efeito —
       sem ele o anel gruda na seta e não há nada para ver. */
    const moveX = gsap.quickTo(el, "x", { duration: 0.42, ease: "power3" });
    const moveY = gsap.quickTo(el, "y", { duration: 0.42, ease: "power3" });
    const scale = gsap.quickTo(el, "scale", { duration: 0.32, ease: "power3" });

    const onMove = (event: PointerEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);
      el.dataset.on = "";
    };

    const onOver = (event: PointerEvent) => {
      const hot = (event.target as HTMLElement | null)?.closest?.(INTERACTIVE);
      if (hot) el.dataset.hot = "";
      else delete el.dataset.hot;
      scale(hot ? 1.75 : 1);
    };

    // sai da janela: o anel some, senão fica um fantasma parado no canto
    const onLeave = () => delete el.dataset.on;

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <div ref={ring} aria-hidden className="cursor-ring" />;
}
