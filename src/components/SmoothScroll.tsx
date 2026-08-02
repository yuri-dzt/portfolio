"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollSmoother, ScrollTrigger } from "@/lib/gsap";

/** Onde uma âncora pousa: abaixo da navbar, não atrás dela. */
const ANCHOR_OFFSET = "top 90px";

/**
 * Rolagem interpolada.
 *
 * Um entalhe da roda move a posição nativa de scroll num pulo instantâneo. Numa
 * página onde a dobra é dirigida por posição de scroll, esses pulos são
 * exatamente o que se lê como engasgo. O ScrollSmoother troca o pulo por uma
 * posição interpolada, então tudo que é dirigido por scroll — o pin do nó, as
 * camadas, os números atravessando, a espinha, a paralaxe dos cards — recebe um
 * valor contínuo em vez de uma escada.
 *
 * A navbar fica FORA deste invólucro de propósito: `position: fixed` não
 * sobrevive dentro de conteúdo transformado, e `position: sticky` também não.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!wrapper.current || !content.current) return;

    const mm = gsap.matchMedia();

    /**
     * Só no desktop.
     *
     * Com `smoothTouch: 0` o smoother nunca suavizou o toque — no telefone ele
     * entregava apenas os custos: `normalizeScroll` assume a rolagem de toque
     * em JavaScript no lugar da do sistema, e o conteúdo inteiro vira uma
     * camada transformada gigante. Duas coisas que engasgam justamente onde há
     * menos CPU sobrando.
     */
    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        const smoother = ScrollSmoother.create({
          wrapper: wrapper.current!,
          content: content.current!,
          smooth: 1,
          smoothTouch: 0,
          normalizeScroll: true,
          ignoreMobileResize: true,
        });

        /* O `scroll-behavior: smooth` do CSS e o scrollTo do smoother são dois
           donos para a mesma rolagem, e o resultado é a âncora chegando torta.
           Enquanto o smoother existe, o CSS sai do caminho — e no telefone,
           onde ele não existe, a âncora nativa volta a funcionar sozinha. */
        const root = document.documentElement;
        const previousBehavior = root.style.scrollBehavior;
        root.style.scrollBehavior = "auto";

        /* Links de hash pulam por padrão; aqui eles passam pelo smoother, senão
           a página teleporta no meio de uma rolagem suave. */
        const onClick = (event: MouseEvent) => {
          if (event.defaultPrevented || event.button !== 0) return;
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
            return;

          const anchor = (event.target as HTMLElement | null)?.closest?.("a");
          const href = anchor?.getAttribute("href");
          if (!href || !href.startsWith("#") || href === "#") return;

          const target = document.querySelector(href);
          if (!target) return;

          event.preventDefault();
          smoother.scrollTo(target, true, ANCHOR_OFFSET);
        };

        document.addEventListener("click", onClick);
        ScrollTrigger.refresh();

        return () => {
          document.removeEventListener("click", onClick);
          root.style.scrollBehavior = previousBehavior;
          smoother.kill();
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <div id="smooth-wrapper" ref={wrapper}>
      <div id="smooth-content" ref={content}>
        {children}
      </div>
    </div>
  );
}
