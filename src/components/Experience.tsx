"use client";

import { useLayoutEffect, useRef } from "react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { experience } from "@/data/site";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Um cargo só, com oito frentes dentro dele. Uma linha do tempo de empregos
 * aqui seria um ponto solitário — o que tem densidade de verdade é a lista do
 * que foi construído, e é ela que ganha a espinha.
 *
 * A linha se desenha conforme a leitura desce e cada ponto acende quando o
 * item entra: o bloco mais pesado de texto do site passa a ter progresso
 * visível, em vez de ser um paredão que aparece de uma vez.
 */
export function Experience() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        /* Os pontos nascem acesos no HTML, para a seção ficar correta sem JS
           e com movimento reduzido. Quem apaga é justamente o código que sabe
           reacendê-los. */
        gsap.utils
          .toArray<HTMLElement>("[data-dot]")
          .forEach((dot) => dot.removeAttribute("data-lit"));

        gsap.utils.toArray<HTMLElement>("[data-spine]").forEach((spine) => {
          const fill = spine.querySelector<HTMLElement>("[data-fill]");

          if (fill) {
            gsap.fromTo(
              fill,
              { scaleY: 0 },
              {
                scaleY: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: spine,
                  start: "top 72%",
                  end: "bottom 62%",
                  scrub: 0.5,
                },
              }
            );
          }

          spine.querySelectorAll<HTMLElement>("[data-dot]").forEach((dot) => {
            const item = dot.parentElement;
            if (!item) return;

            /* `end` lá embaixo, e não no fim do item: o ponto acende quando a
               linha o alcança e continua aceso enquanto estiver acima dela.
               Rolando para trás, apaga junto com o preenchimento. */
            ScrollTrigger.create({
              trigger: item,
              start: "top 66%",
              end: "bottom top",
              onToggle: (self) => dot.toggleAttribute("data-lit", self.isActive),
            });
          });
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <Section id="experiencia">
      <Reveal variant="wipe">
        <SectionHeading title="Onde já apliquei isso" />
      </Reveal>

      <div ref={root} className="mt-8">
        {experience.map((job, i) => (
          <Reveal key={`${job.company}-${i}`} delay={i * 0.06}>
            <div className="relative grid gap-4 border-t border-line py-8 md:grid-cols-[200px_1fr]">
              <div>
                <p className="font-mono text-sm text-accent">{job.period}</p>
                <p className="mt-1 text-sm text-faint">{job.company}</p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-ink">{job.role}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {job.description}
                </p>

                <ul data-spine className="relative mt-6 space-y-4 pl-6">
                  {/* trilho apagado e, por cima, o mesmo traço em âmbar que
                      cresce com o scroll. `top`/`bottom` recuados para a linha
                      começar e terminar no centro dos pontos das pontas. */}
                  <span
                    aria-hidden
                    className="absolute bottom-[0.6rem] left-[3px] top-[0.6rem] w-px bg-line"
                  />
                  <span
                    data-fill
                    aria-hidden
                    className="absolute bottom-[0.6rem] left-[3px] top-[0.6rem] w-px origin-top bg-accent"
                  />

                  {job.bullets.map((b, bi) => (
                    <li
                      key={bi}
                      className="relative text-sm leading-relaxed text-muted"
                    >
                      <span
                        data-dot
                        data-lit
                        aria-hidden
                        className="absolute -left-6 top-[0.45rem] h-[7px] w-[7px] rounded-full border border-line bg-bg transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] data-[lit]:border-accent data-[lit]:bg-accent"
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
