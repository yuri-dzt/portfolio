"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Curva de aceleração do site — a mesma do `--ease-out-expo` no globals.css.
 * Só desaceleração exponencial: nada de bounce ou elástico, que chamam
 * atenção para a própria animação.
 */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/**
 * Acompanha uma media query. No servidor devolve `false` e corrige no
 * primeiro efeito — quem depende disso só aparece depois da montagem.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    setMatches(list.matches);

    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** Espelha a preferência do sistema por menos movimento. */
export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

type TiltOptions = {
  /** Rotação máxima em graus, em cada eixo. */
  max?: number;
  stiffness?: number;
  damping?: number;
};

/**
 * Rotação 3D que segue o ponteiro, amortecida por mola.
 * Devolve também a posição normalizada (0–1) para efeitos de luz.
 *
 * Com `prefers-reduced-motion`, ou em toque, os valores ficam no centro
 * e o elemento simplesmente não gira.
 */
export function usePointerTilt({
  max = 8,
  stiffness = 150,
  damping = 20,
}: TiltOptions = {}) {
  const reduced = usePrefersReducedMotion();
  const frame = useRef<number | null>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const spring = { stiffness, damping, mass: 0.6 };
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);

  useEffect(() => {
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  function onPointerMove(event: React.PointerEvent<HTMLElement>) {
    if (reduced || event.pointerType === "touch") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const nextX = (event.clientX - rect.left) / rect.width;
    const nextY = (event.clientY - rect.top) / rect.height;

    // uma leitura de layout por quadro, não por evento
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      px.set(nextX);
      py.set(nextY);
    });
  }

  function onPointerLeave() {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    px.set(0.5);
    py.set(0.5);
  }

  return { px, py, rotateX, rotateY, onPointerMove, onPointerLeave, reduced };
}
