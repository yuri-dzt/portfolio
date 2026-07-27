"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Atraso em segundos, para escalonar irmãos de uma mesma lista. */
  delay?: number;
  /**
   * `rise` — texto corrido e listas.
   * `wipe` — títulos: a linha é revelada de baixo para cima.
   * `tilt` — blocos com volume (cards 3D), que entram girando no eixo X.
   */
  variant?: "rise" | "wipe" | "tilt";
  className?: string;
};

/**
 * Revela o conteúdo quando ele entra na viewport.
 *
 * O estado padrão é VISÍVEL: quem esconde é a regra `.js [data-reveal]` no
 * globals.css, e a classe `js` só existe se o script inline do layout rodar.
 * Sem JavaScript — ou num renderizador headless — a página aparece inteira,
 * em vez de ficar em branco esperando uma transição que nunca dispara.
 */
export function Reveal({
  children,
  delay = 0,
  variant = "rise",
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={variant}
      data-visible={visible ? "" : undefined}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      className={className}
    >
      {children}
    </div>
  );
}
