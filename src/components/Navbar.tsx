"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/site";
import { cn } from "@/lib/utils";
import { gsap } from "@/lib/gsap";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#resultados", label: "Resultados" },
  { href: "#projetos", label: "Projetos" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#contato", label: "Contato" },
];

/**
 * Transparente sobre a dobra, e a partir do primeiro scroll ela pousa com
 * fundo e fio embaixo. A barra de progresso mede quanto do documento passou.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** Quanto do documento já passou. Instrumento, não enfeite. */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(progress.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.25,
        },
      });
    }, header);

    return () => ctx.revert();
  }, []);

  // com o menu aberto o painel é papel, então a barra acompanha
  const onPaper = scrolled || open;

  return (
    <header
      ref={header}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        onPaper ? "glass border-b border-line" : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 w-[92%] max-w-content items-center gap-6">
        <a
          href="#top"
          className={cn(
            "font-mono text-sm font-semibold tracking-[-0.04em] transition-colors duration-500",
            "text-ink"
          )}
        >
          {profile.name.split(" ")[0]}
          <span className="text-accent">
            .dev
          </span>
        </a>

        <ul className="ml-auto hidden items-center gap-6 md:flex lg:gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-muted transition-colors duration-300 hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contato"
          className="ml-auto hidden rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg transition-colors duration-300 hover:bg-accent2 md:ml-0 md:inline-flex"
        >
          Fale comigo
        </a>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink transition-colors duration-300 md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <span
        ref={progress}
        aria-hidden
        className={cn(
          "absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-opacity duration-500",
          onPaper ? "opacity-100" : "opacity-0"
        )}
      />

      {open ? (
        <div className="border-t border-line bg-bg md:hidden">
          <ul className="mx-auto flex w-[92%] max-w-content flex-col py-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-3 text-ink last:border-none"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
