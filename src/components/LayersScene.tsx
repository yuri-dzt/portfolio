"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { stackLayers } from "@/data/site";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * A peça central do site.
 *
 * A seção trava na tela e o scroll deixa de rolar a página para abrir um
 * objeto: um baralho de camadas, visto de cima e de lado, que se desdobra até
 * ficar de frente para você. Enquanto abre, o texto ao lado acompanha a camada
 * ativa. É a mesma coisa que o currículo diz em uma frase — "trabalho da
 * interface ao servidor" — só que a pessoa vê acontecer.
 *
 * O scroll é o quadro da animação (scrub): subir desmonta na mesma proporção.
 * Sem ponteiro, sem clique, sem esperar. Em telas pequenas e com
 * `prefers-reduced-motion` nada trava: as camadas viram uma lista comum.
 */
export function LayersScene() {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const deck = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 768px)",
        () => {
          const slabs = gsap.utils.toArray<HTMLElement>("[data-slab]");

          // estado inicial: baralho fechado, inclinado como se estivesse na mesa
          // fechado, o baralho fica no meio do palco; abrindo, ele preenche
          gsap.set(deck.current, { rotateX: 48, rotateZ: -7, y: 150 });
          slabs.forEach((slab, i) => {
            gsap.set(slab, { y: i * 12, z: i * -14, opacity: i === 0 ? 1 : 0.45 });
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "+=2600",
              pin: stage.current,
              scrub: 0.7,
              onUpdate: (self) => {
                const index = Math.min(
                  stackLayers.length - 1,
                  Math.floor(self.progress * stackLayers.length)
                );
                setActive(index);
              },
            },
          });

          // o baralho se levanta e vira de frente
          tl.to(deck.current, { rotateX: 6, rotateZ: 0, y: 0, ease: "none" }, 0);

          // e as camadas se afastam umas das outras
          slabs.forEach((slab, i) => {
            tl.to(
              slab,
              { y: i * 116, z: 0, opacity: 1, ease: "none" },
              0
            );
          });

          return () => {
            gsap.set([deck.current, slabs], { clearProps: "all" });
          };
        }
      );

      // sem pin: as camadas só aparecem em sequência, sem prender o scroll
      media.add(
        "(prefers-reduced-motion: reduce), (max-width: 767px)",
        () => {
          const slabs = gsap.utils.toArray<HTMLElement>("[data-slab]");
          gsap.set(deck.current, { rotateX: 0, rotateZ: 0 });
          slabs.forEach((slab, i) => {
            gsap.set(slab, { position: "relative", y: 0, z: 0, opacity: 1 });
            void i;
          });
          ScrollTrigger.refresh();
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} id="camadas">
      <div ref={stage} className="flex min-h-[100svh] items-center py-20">
        <div className="mx-auto grid w-[92%] max-w-content items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="h-px w-full bg-line" />
            <h2 className="mt-8 text-balance text-3xl font-semibold leading-[1.06] tracking-[-0.02em] text-ink sm:text-[2.6rem]">
              Da interface ao servidor.
            </h2>

            <ul className="mt-8 space-y-1">
              {stackLayers.map((layer, i) => (
                <li key={layer.label}>
                  <div
                    className={`flex items-baseline gap-3 border-l-0 py-1.5 transition-colors duration-300 ${
                      active === i ? "text-ink" : "text-faint"
                    }`}
                  >
                    <span className="font-mono text-[11px] tracking-tight">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-lg font-medium">{layer.label}</span>
                  </div>
                </li>
              ))}
            </ul>

            {/* a nota troca conforme a camada ativa */}
            <p
              key={active}
              className="mt-6 max-w-md text-pretty text-sm leading-relaxed text-muted [animation:enter-rise_500ms_var(--ease-out-expo)_both]"
            >
              {stackLayers[active].note}
            </p>
          </div>

          <div className="[perspective:1600px]">
            <div
              ref={deck}
              className="relative mx-auto h-[26rem] w-full max-w-[26rem] [transform-style:preserve-3d] md:h-[30rem]"
            >
              {stackLayers.map((layer, i) => (
                <div
                  key={layer.label}
                  data-slab
                  className={`left-0 right-0 top-0 rounded-xl border bg-surface/95 px-5 py-4 backdrop-blur-[2px] transition-colors duration-300 md:absolute ${
                    active === i ? "border-accent" : "border-line"
                  } ${i > 0 ? "mt-3 md:mt-0" : ""}`}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span
                      className={`font-mono text-xs tracking-tight transition-colors duration-300 ${
                        active === i ? "text-accent" : "text-muted"
                      }`}
                    >
                      {layer.label}
                    </span>
                    <span className="font-mono text-[11px] text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-ink">{layer.stack}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
