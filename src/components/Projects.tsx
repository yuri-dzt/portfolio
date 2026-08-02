"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Github, Lock, ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { projects, type Project } from "@/data/site";
import { easeOutExpo, usePointerTilt } from "@/lib/motion";
import { gsap } from "@/lib/gsap";

/**
 * Área de mídia do card: prévia ao vivo (iframe) quando o projeto tem
 * `preview`, imagem estática quando tem `image`. Sem nenhum dos dois o card
 * não tem mídia — e aí `ProjectCard` nem desenha a área, em vez de exibir
 * uma caixa vazia.
 */
function ProjectMedia({ project }: { project: Project }) {
  if (project.preview) {
    return (
      <>
        {/* O iframe é renderizado numa viewport larga (260% do card) e reduzido
            a 0.4 — sobra ~4% que o overflow corta, escondendo a barra de
            rolagem do site embutido. */}
        <iframe
          src={project.preview}
          title={`Prévia ao vivo de ${project.name}`}
          loading="lazy"
          tabIndex={-1}
          aria-hidden="true"
          scrolling="no"
          sandbox="allow-scripts allow-same-origin"
          referrerPolicy="no-referrer"
          className="pointer-events-none absolute left-0 top-0 h-[260%] w-[260%] origin-top-left scale-[0.4] border-0 bg-white"
        />
        {/* funde o pé da prévia no card: o corte do site embutido cai no meio
            de uma seção clara e, sem isso, lê como falha de renderização */}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-surface to-transparent" />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-lg border border-line bg-bg/80 px-2.5 py-1 text-xs font-medium text-ink backdrop-blur">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Site ao vivo
        </span>
      </>
    );
  }

  return (
    /* Coloque as imagens em /public/projects/ */
    <Image
      src={project.image!}
      alt={`Prévia do projeto ${project.name}`}
      fill
      sizes="(max-width: 768px) 92vw, 520px"
      className="object-cover transition-transform duration-700 group-hover:scale-105"
    />
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const { rotateX, rotateY, onPointerMove, onPointerLeave } = usePointerTilt({
    max: 5,
    stiffness: 180,
    damping: 22,
  });

  const hasMedia = Boolean(project.preview || project.image);

  return (
    /* o card inteiro gira em 3D; o selo flutua acima da superfície */
    <div
      data-parallax
      className="h-full [perspective:1100px]"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <motion.article
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ z: 26 }}
        transition={{ type: "spring", stiffness: 200, damping: 24 }}
        className="group relative flex h-full flex-col rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-accent/40"
      >
        {hasMedia ? (
          <>
            {/* Faixa baixa e de proporção fixa: a mídia ilustra o card, não
                define a altura dele. Raio menos 1px da borda, senão vaza no canto. */}
            <div className="relative aspect-[2.4/1] overflow-hidden rounded-t-[15px] bg-elevated">
              <ProjectMedia project={project} />

              {/* Com prévia ao vivo o iframe não é clicável; a própria área vira o link. */}
              {project.preview && project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Abrir ${project.name} em nova aba`}
                  className="absolute inset-0 z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                />
              ) : null}
            </div>

            {project.private ? (
              /* fora da área de mídia: assim o selo pode flutuar acima dela em 3D */
              <span
                style={{ transform: "translateZ(38px)" }}
                className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-lg border border-line bg-bg/80 px-2.5 py-1 text-xs font-medium text-ink backdrop-blur"
              >
                <Lock size={12} /> Projeto privado
              </span>
            ) : null}
          </>
        ) : null}

        <div className="flex flex-1 flex-col p-6">
          {/* Uma linha de texto no lugar de cinco ou seis etiquetas: dentro de
              um card que já tem borda, cada etiqueta é uma caixa dentro de
              outra caixa — e caixa aninhada nunca está certa. */}
          <div className="flex flex-wrap items-baseline gap-x-2 font-mono text-[11px] leading-relaxed">
            {!hasMedia && project.private ? (
              <span className="inline-flex items-center gap-1.5 text-faint">
                <Lock size={11} /> Privado
                <span className="text-line">·</span>
              </span>
            ) : null}
            <span className="text-muted">
              {project.tech.map((t, i) => (
                <span key={t}>
                  {i > 0 ? <span className="text-line"> · </span> : null}
                  {t}
                </span>
              ))}
            </span>
          </div>

          <h3 className="mt-4 text-lg font-medium text-ink">{project.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {project.description}
          </p>

          <AnimatePresence initial={false}>
            {open ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: easeOutExpo }}
                className="overflow-hidden"
              >
                <div className="space-y-4 pt-5">
                  <div>
                    <p className="font-mono text-xs text-accent">Problema</p>
                    <p className="mt-1 text-sm text-muted">{project.problem}</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-accent">Resultado</p>
                    <p className="mt-1 text-sm text-muted">{project.result}</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-accent">Destaques técnicos</p>
                    <ul className="mt-2 space-y-1.5">
                      {project.highlights.map((h, i) => (
                        <li key={i} className="flex gap-2.5 text-sm text-muted">
                          <span className="mt-2 h-1 w-1 flex-none rounded-full bg-accent" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* mt-auto: as ações ancoram no rodapé, então cards de alturas
              diferentes na mesma linha terminam alinhados */}
          <div className="mt-auto flex items-center gap-3 border-t border-line pt-5">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent"
            >
              {open ? "Ver menos" : "Ver detalhes"}
              <ChevronDown
                size={15}
                className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              />
            </button>

            <div className="ml-auto flex items-center gap-3">
              {project.private ? (
                <span className="text-xs text-faint">Sob confidencialidade</span>
              ) : (
                <>
                  {project.repos?.map((repo) => (
                    <a
                      key={repo.url}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Repositório ${repo.label} de ${project.name} no GitHub`}
                      className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-ink"
                    >
                      <Github size={16} />
                      {repo.label}
                    </a>
                  ))}
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent2"
                    >
                      Acessar <ArrowUpRight size={14} />
                    </a>
                  ) : null}
                </>
              )}
            </div>
          </div>

          {project.private ? (
            <p className="mt-3 text-xs leading-relaxed text-faint">
              Desenvolvido para empresa/cliente sob acordo de confidencialidade. O
              código não é público, mas a arquitetura e as decisões técnicas fazem
              parte da minha experiência.
            </p>
            ) : null}
        </div>
      </motion.article>
    </div>
  );
}

export function Projects() {
  const grid = useRef<HTMLDivElement>(null);

  /**
   * Paralaxe de profundidade: as colunas andam em velocidades diferentes
   * enquanto a grade passa pela tela, então a malha ganha volume em vez de
   * subir como um bloco só. Ligado ao scroll (scrub), não disparado por ele.
   */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 768px)",
        () => {
          const cards = gsap.utils.toArray<HTMLElement>("[data-parallax]");

          cards.forEach((card, i) => {
            const shift = i % 2 === 0 ? 26 : 12;

            gsap.fromTo(
              card,
              { y: shift },
              {
                y: -shift,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.5,
                },
              }
            );
          });
        }
      );
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <Section id="projetos">
      <Reveal variant="wipe">
        <SectionHeading
          title="Alguns problemas que resolvi"
          description="Projetos autorais e trabalhos sob confidencialidade. Nos privados eu mostro o que construí, sem expor código do cliente."
        />
      </Reveal>

      {/* sem items-start: os cards de uma linha esticam para a mesma altura,
          e o rodapé de cada um fica alinhado com o do vizinho */}
      <div ref={grid} className="mt-8 grid gap-5 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal
            key={project.name}
            variant="tilt"
            delay={(i % 2) * 0.08}
            className="h-full"
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
