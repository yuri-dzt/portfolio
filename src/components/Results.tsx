"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { results } from "@/data/site";
import { gsap } from "@/lib/gsap";

/**
 * O que entrou no lugar de "Diferenciais" e "Processo": em vez de adjetivo
 * ("código limpo", "performance"), o número antes e o número depois. Cada
 * linha é um dado do currículo, não uma promessa.
 *
 * A entrada é linha a linha, com o número de destino descoberto por trás de
 * uma máscara — o gesto sublinha justamente o que mudou.
 */
export function Results() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const rows = gsap.utils.toArray<HTMLElement>("[data-row]");

        rows.forEach((row) => {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: row, start: "top 88%", once: true },
          });

          tl.from(row, { opacity: 0, y: 22, duration: 0.7, ease: "expo.out" })
            .from(
              row.querySelector("[data-after]"),
              { yPercent: 110, duration: 0.8, ease: "expo.out" },
              "-=0.45"
            )
            .from(
              row.querySelector("[data-arrow]"),
              { opacity: 0, x: -10, duration: 0.5, ease: "expo.out" },
              "-=0.6"
            );
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <Section id="resultados">
      <Reveal variant="wipe">
        <SectionHeading
          title="O que mudou depois que entrei."
          description="Sem adjetivo: o número de antes e o de depois, em coisas que dava para medir."
        />
      </Reveal>

      <div ref={root} className="mt-12 border-t border-line">
        {results.map((item) => (
          <div
            key={item.label}
            data-row
            className="grid gap-4 border-b border-line py-7 md:grid-cols-[1fr_auto] md:items-center md:gap-10"
          >
            <div className="max-w-xl">
              <p className="text-base font-medium leading-snug text-ink">
                {item.label}
              </p>
              {item.note ? (
                <p className="mt-1.5 text-pretty text-sm leading-relaxed text-faint">
                  {item.note}
                </p>
              ) : null}
            </div>

            <div className="flex items-center gap-4 font-mono md:justify-end">
              <span className="text-lg text-faint line-through decoration-line decoration-1">
                {item.before}
              </span>
              <ArrowRight
                data-arrow
                size={16}
                className="flex-none text-faint"
                aria-hidden
              />
              {/* máscara: o número novo sobe por trás do recorte */}
              <span className="overflow-hidden py-0.5">
                <span
                  data-after
                  className="block text-2xl font-medium tracking-[-0.03em] text-accent sm:text-3xl"
                >
                  {item.after}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
