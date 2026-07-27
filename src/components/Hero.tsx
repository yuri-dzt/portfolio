"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { profile, socials } from "@/data/site";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { gsap } from "@/lib/gsap";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

/**
 * A dobra abre com o nome sendo descoberto linha a linha, atrás de uma
 * máscara — não com um bloco de texto subindo dois pixels. Depois entram, em
 * sequência, o cargo, a frase, os botões e a foto.
 *
 * Sem JS o texto já está lá, inteiro: quem esconde é a regra `.js` do CSS.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const targets = "[data-split], [data-enter], [data-photo]";

      // o CSS deixa tudo escondido enquanto o JS não assume; aqui devolvemos
      // a visibilidade antes do primeiro quadro, e o `from` cuida do resto
      gsap.set(targets, { opacity: 1 });

      if (reduced) return;

      const split = new SplitText("[data-split]", {
        type: "lines",
        mask: "lines",
      });

      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        // devolve o DOM limpo depois da entrada, para as linhas reflowarem
        onComplete: () => split.revert(),
      });

      tl.from(split.lines, {
        yPercent: 115,
        duration: 1.1,
        stagger: 0.09,
      })
        .from(
          "[data-enter]",
          { opacity: 0, y: 18, duration: 0.9, stagger: 0.08 },
          "-=0.75"
        )
        .from(
          "[data-photo]",
          { opacity: 0, y: 26, rotateY: -12, duration: 1.2 },
          "-=1.0"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32"
    >
      <div className="mx-auto grid w-[92%] max-w-content items-end gap-12 md:grid-cols-[1.35fr_1fr]">
        <div>
          <div
            data-enter
            className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs tracking-tight text-accent"
          >
            <span className="flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />
              {profile.role}
            </span>
            {profile.available ? (
              <span className="flex items-center gap-2 text-faint">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                disponível para novos projetos
              </span>
            ) : null}
          </div>

          {/* clamp com teto em 6rem: grande de verdade, sem gritar */}
          <h1
            data-split
            className="mt-5 text-balance font-semibold leading-[0.95] tracking-[-0.03em] text-ink"
            style={{ fontSize: "clamp(2.75rem, 7.5vw, 6rem)" }}
          >
            {profile.name}
          </h1>

          <p
            data-split
            className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted"
          >
            {profile.tagline}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              data-enter
              href="#projetos"
              className="group inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-medium text-bg transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-accent2 active:translate-y-0 active:scale-[0.98] active:duration-100"
            >
              Ver projetos
              <ArrowDown
                size={16}
                className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0.5"
              />
            </a>
            <a
              data-enter
              href="#contato"
              className="inline-flex items-center gap-2 rounded-xl border border-line px-5 py-3 text-sm font-medium text-ink transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-accent/60 hover:bg-elevated active:translate-y-0 active:scale-[0.98] active:duration-100"
            >
              Entrar em contato
            </a>
            <a
              data-enter
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-medium text-muted transition-colors duration-300 hover:text-ink"
            >
              <Download size={16} /> Currículo
            </a>
          </div>

          <div
            data-enter
            className="mt-10 flex items-center gap-5 border-t border-line pt-6 text-muted"
          >
            <span className="font-mono text-[11px] tracking-tight text-faint">
              {profile.location}
            </span>
            <span className="ml-auto flex items-center gap-5">
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="transition-colors hover:text-accent"
              >
                <Github size={18} />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition-colors hover:text-accent"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={`mailto:${socials.email}`}
                aria-label="Email"
                className="transition-colors hover:text-accent"
              >
                <Mail size={18} />
              </a>
            </span>
          </div>
        </div>

        <div data-photo className="[perspective:1200px]">
          <PhotoCard />
        </div>
      </div>
    </section>
  );
}
