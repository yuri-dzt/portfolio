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
 * O movimento aqui não decora, ele É o dado: onde os dois lados são a mesma
 * grandeza, o número atravessa de um valor ao outro amarrado ao scroll. Quem
 * rola executa a mudança que a linha descreve.
 */

/** `R$ 1.400` → `{ prefix: "R$ ", number: 1400, decimals: 0 }` */
const NUMERIC = /^(\D*?)([\d.,]+)(\D*)$/;

type Parsed = {
  prefix: string;
  suffix: string;
  number: number;
  decimals: number;
};

function parseValue(value: string): Parsed | null {
  const match = value.trim().match(NUMERIC);
  if (!match) return null;

  const [, prefix, raw, suffix] = match;

  /* Formato brasileiro: a vírgula separa decimal, o ponto separa milhar.
     Ler "1.400" como 1,4 seria errar por mil. */
  const comma = raw.lastIndexOf(",");
  const decimals = comma === -1 ? 0 : raw.length - comma - 1;
  const number = Number(raw.replace(/\./g, "").replace(",", "."));

  if (!Number.isFinite(number)) return null;
  return { prefix, suffix, number, decimals };
}

/**
 * Um par só pode ser interpolado quando os dois lados são a mesma grandeza.
 *
 * `3 min → 30 s` passa nos dois testes numéricos e mesmo assim está fora: o 3
 * viraria 30 subindo na tela enquanto a unidade encolhe, e a linha passaria a
 * dizer o contrário do que aconteceu — é seis vezes mais rápido, não dez
 * vezes mais lento. Exigir prefixo e sufixo idênticos é o que impede a
 * animação de mentir sobre o dado.
 */
function interpolable(before: string, after: string) {
  const a = parseValue(before);
  const b = parseValue(after);
  if (!a || !b) return null;
  if (a.prefix !== b.prefix || a.suffix !== b.suffix) return null;
  return { from: a.number, to: b.number, ...b };
}

const rows = results.map((item) => ({
  ...item,
  count: interpolable(item.before, item.after),
}));

export function Results() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const nodes = gsap.utils.toArray<HTMLElement>("[data-row]");

        nodes.forEach((row) => {
          const after = row.querySelector<HTMLElement>("[data-after]");
          const counts = row.dataset.count === "true";

          const tl = gsap.timeline({
            scrollTrigger: { trigger: row, start: "top 88%", once: true },
          });

          tl.from(row, { opacity: 0, y: 22, duration: 0.7, ease: "expo.out" }).from(
            row.querySelector("[data-arrow]"),
            { opacity: 0, x: -10, duration: 0.5, ease: "expo.out" },
            "-=0.45"
          );

          /* Sem número comparável a linha mantém o gesto antigo: o valor novo
             sobe por trás do recorte. */
          if (!counts && after) {
            tl.from(
              after,
              { yPercent: 110, duration: 0.8, ease: "expo.out" },
              "-=0.7"
            );
          }
        });

        /* A contagem fica fora da timeline de entrada de propósito: a entrada
           dispara uma vez (`once`), a travessia do número acompanha o scroll
           nos dois sentidos (`scrub`). Juntas, o número congelaria no
           primeiro quadro. */
        const counters = gsap.utils.toArray<HTMLElement>("[data-count='true']");

        counters.forEach((row) => {
          const after = row.querySelector<HTMLElement>("[data-after]");
          if (!after) return;

          const from = Number(after.dataset.from);
          const to = Number(after.dataset.to);
          const decimals = Number(after.dataset.decimals);
          const prefix = after.dataset.prefix ?? "";
          const suffix = after.dataset.suffix ?? "";

          const format = new Intl.NumberFormat("pt-BR", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          });

          const proxy = { value: from };

          gsap.to(proxy, {
            value: to,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top 82%",
              end: "top 42%",
              scrub: 0.4,
            },
            onUpdate: () => {
              after.textContent = `${prefix}${format.format(proxy.value)}${suffix}`;
            },
          });
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

      <div ref={root} className="mt-8 border-t border-line">
        {rows.map((item) => (
          <div
            key={item.label}
            data-row
            data-count={item.count ? "true" : "false"}
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
              {/* recorte: usado pelas linhas que não contam, onde o número
                  novo sobe por trás da máscara */}
              <span className="overflow-hidden py-0.5">
                {/* O texto que vem do servidor é o valor FINAL: sem JS, com o
                    script falhando, ou para um leitor de tela, a linha diz a
                    verdade em vez do número de partida. */}
                <span
                  data-after
                  data-from={item.count?.from}
                  data-to={item.count?.to}
                  data-decimals={item.count?.decimals}
                  data-prefix={item.count?.prefix}
                  data-suffix={item.count?.suffix}
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
