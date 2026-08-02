"use client";

import { useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Teto da inclinação. Acima de ~1,5° o texto começa a parecer torto em vez
 *  de rápido, e o efeito passa de sensação a defeito. */
const MAX_DEG = 1.3;

/** Divisor da velocidade (px/s → graus). Quanto maior, mais contida. */
const DAMPING = 340;

/** Silêncio, em ms, que conta como "parou de rolar". */
const SETTLE_MS = 120;

/**
 * O conteúdo inclina alguns décimos de grau enquanto a rolagem corre e assenta
 * quando ela para.
 *
 * É o efeito mais barato que existe para a página parecer ter massa: nada se
 * move por conta própria, e mesmo assim cada rolagem ganha aceleração e
 * repouso. Depende da rolagem interpolada para ficar bom — sobre o scroll
 * nativo, aos pulos, a inclinação pisca em vez de fluir.
 *
 * Alvo é `[data-skew]`, escrito pelo `Section`. As duas cenas pinadas (a dobra
 * e as camadas) não usam `Section` e por isso ficam de fora — inclinar um
 * quadro preso na tela é exatamente onde esse gesto vira enjoo.
 */
export function VelocitySkew() {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* Desktop apenas. Inclinar sete contêineres do tamanho da tela obriga o
       navegador a rasterizar camadas grandes a cada evento de scroll — no
       telefone isso aparece como travamento, e a inclinação de 1,3° que
       custou isso é imperceptível num aparelho na mão. */
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const targets = gsap.utils.toArray<HTMLElement>("[data-skew]");
    if (!targets.length) return;

    /* `quickTo` reaproveita um tween por elemento em vez de criar um por
       evento de scroll, que dispara dezenas de vezes por segundo. */
    const setters = targets.map((el) =>
      gsap.quickTo(el, "skewY", { duration: 0.5, ease: "power3" })
    );

    const apply = (deg: number) => setters.forEach((set) => set(deg));

    let settle: number | null = null;

    /* Dirigido por evento, não por ticker: parada, a página não escreve um
       único transform. `onUpdate` só conta a descida — quando os eventos
       cessam, a última velocidade lida ainda é alta, e sem o temporizador a
       inclinação congelaria torta na tela. */
    const probe = ScrollTrigger.create({
      onUpdate: (self) => {
        apply(gsap.utils.clamp(-MAX_DEG, MAX_DEG, self.getVelocity() / DAMPING));

        if (settle !== null) window.clearTimeout(settle);
        settle = window.setTimeout(() => apply(0), SETTLE_MS);
      },
    });

    return () => {
      if (settle !== null) window.clearTimeout(settle);
      probe.kill();
      gsap.set(targets, { skewY: 0 });
    };
  }, []);

  return null;
}
