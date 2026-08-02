"use client";

import { useCallback, useLayoutEffect, useRef } from "react";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { profile, socials } from "@/data/site";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { Sculpture } from "@/components/Sculpture";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

/** Viewports extras que o quadro fica preso. Curto: dá para ver o nó virar
 *  sem transformar a dobra em pedágio antes do resto do site.
 *  Só existe no desktop — no telefone não há pin. */
const PIN_LENGTH = 0.75;

/**
 * Onde a copy começa a sair e em quanto tempo ela termina de sair.
 *
 * Tarde de propósito. Saindo cedo, o quadro de 100svh passa o resto do pin
 * sendo só o nó — e esse fundo vazio encontra o topo vazio da cena seguinte
 * bem na emenda, somando quase uma tela de nada. O texto agora acompanha o
 * pin quase até o fim.
 */
const COPY_EXIT = { start: 0.6, span: 0.28 };

/** Quanto a copy sobe ao sair. Pouco: ela deriva para a navbar. */
const COPY_DRIFT_PX = 44;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/**
 * A dobra abre com o nome sendo descoberto linha a linha, atrás de uma
 * máscara — não com um bloco de texto subindo dois pixels. Depois entram, em
 * sequência, o cargo, a frase, os botões e a foto.
 *
 * Ao fundo, um nó em arame renderizado a cada quadro. Quando a dobra é
 * alcançada, o quadro trava e o scroll passa a virar o objeto em vez de
 * mover a página; na metade do percurso a copy se apaga e o nó termina a
 * volta sozinho. Como o pin solta na mesma posição de scroll que dirige o
 * giro, chegar ao fim do palco e completar a volta são o mesmo evento — não
 * é preciso travar nada para garantir que a animação seja vista inteira.
 *
 * Sem JS o texto já está lá, inteiro: quem esconde é a regra `.js` do CSS.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const scrolled = useRef(0);

  const readProgress = useCallback(() => scrolled.current, []);

  /**
   * A saída da copy é escrita como custom properties no quadro pinado e
   * consumida por CSS puro. Mantendo isso fora de qualquer `style` de
   * biblioteca, as animações de entrada dos filhos nunca disputam a mesma
   * declaração — e é uma escrita por quadro, num elemento só.
   */
  const applyCopyExit = useCallback((p: number) => {
    const el = frame.current;
    if (!el) return;
    const out = clamp01((p - COPY_EXIT.start) / COPY_EXIT.span);
    el.style.setProperty("--hero-copy-opacity", (1 - out).toFixed(3));
    el.style.setProperty("--hero-copy-blur", `${(out * 9).toFixed(2)}px`);
    el.style.setProperty(
      "--hero-copy-y",
      `${(out * -COPY_DRIFT_PX).toFixed(2)}px`
    );
  }, []);

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
        /* Devolve o DOM limpo depois da entrada, para as linhas reflowarem.
           Sem `refresh()` de propósito: a altura do quadro é fixa em 100svh
           e o fim do pin é medido em viewports, então remontar as linhas não
           move nada — e um refresh disparado dois segundos após o load, com
           a pessoa já rolando, é exatamente como se produz um salto. */
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

      /* O pin é só do desktop, mesma linha de corte que as camadas usam.
         No telefone o quadro é mais alto que a viewport, e prender um quadro
         maior que a tela deixa o pé dele inalcançável enquanto o pin dura. */
      gsap.matchMedia().add("(min-width: 768px)", () => {
        ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * PIN_LENGTH)}`,
          pin: frame.current,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            scrolled.current = self.progress;
            applyCopyExit(self.progress);
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [applyCopyExit]);

  return (
    <section ref={root} id="top" className="relative">
      {/* Altura fixa só a partir de `md`. No telefone o conteúdo empilhado
          passa de 1000px contra uma viewport de ~670: com `height` fixo mais
          `overflow-hidden` e `items-center`, o excedente era cortado metade em
          cima e metade embaixo — e o que sumia no topo era o cargo. */}
      <div
        ref={frame}
        className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden pb-12 pt-24 sm:pb-20 sm:pt-28 md:h-[100svh] md:min-h-[36rem] md:pt-32"
      >
        <Sculpture
          progress={readProgress}
          className="absolute inset-0 h-full w-full"
        />

        {/* Véus, do mais geral ao mais local: lavagem, luz vinda de onde o
            texto não está, vinheta, e a passagem para o corpo da página. */}
        <div aria-hidden className="hero-wash absolute inset-0" />
        <div aria-hidden className="hero-side absolute inset-0" />
        <div aria-hidden className="hero-vignette absolute inset-0" />
        <div aria-hidden className="hero-foot absolute inset-x-0 bottom-0 h-40" />

        <div className="hero-copy relative z-10 mx-auto grid w-[92%] max-w-content items-end gap-9 sm:gap-12 md:grid-cols-[1.35fr_1fr]">
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
              className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted sm:mt-7 sm:text-lg"
            >
              {profile.tagline}
            </p>

            {/* `items-stretch`: os três passam a ter exatamente a mesma
                altura, e cada um centra o próprio conteúdo. Assim o
                alinhamento deixa de depender de as caixas darem a mesma
                medida por coincidência de padding e borda. */}
            <div className="mt-7 flex flex-wrap items-stretch gap-3 sm:mt-9">
              <a
                data-enter
                href="#projetos"
                /* borda transparente: sem ela este botão fica 2px mais baixo
                   que o vizinho contornado, e a fileira desalinha na base */
                className="group inline-flex items-center gap-2 rounded-xl border border-transparent bg-accent px-5 py-3 text-sm font-medium text-bg transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-accent2 active:translate-y-0 active:scale-[0.98] active:duration-100"
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
                /* Mesma geometria dos vizinhos, contraste mais baixo. Como
                   texto solto ao lado de duas pílulas, ele não lia como ação
                   terciária — lia como elemento fora do lugar. */
                className="inline-flex items-center gap-2 rounded-xl border border-line/50 px-5 py-3 text-sm font-medium text-muted transition-[transform,border-color,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-line hover:text-ink active:translate-y-0 active:scale-[0.98] active:duration-100"
              >
                <Download size={16} /> Currículo
              </a>
            </div>

            <div
              data-enter
              /* flex-wrap: em tela estreita a localização ocupa duas linhas e
                 os ícones desciam espremidos contra ela */
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4 border-t border-line pt-5 text-muted sm:mt-10 sm:pt-6"
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
      </div>
    </section>
  );
}
