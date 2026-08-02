"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useTransform } from "framer-motion";
import { profile } from "@/data/site";
import { usePointerTilt } from "@/lib/motion";

/**
 * A foto como objeto: gira seguindo o ponteiro, com uma luz especular que
 * acompanha o cursor pela superfície. A moldura em âmbar por trás desencontra
 * de propósito — dá espessura sem sombra falsa.
 */
export function PhotoCard() {
  const { px, py, rotateX, rotateY, onPointerMove, onPointerLeave } =
    usePointerTilt({ max: 7, stiffness: 130, damping: 18 });

  const lightX = useTransform(px, [0, 1], ["0%", "100%"]);
  const lightY = useTransform(py, [0, 1], ["0%", "100%"]);
  const light = useMotionTemplate`radial-gradient(260px circle at ${lightX} ${lightY}, rgba(255,255,255,0.16), transparent 70%)`;

  return (
    /* 15rem no telefone: em 4/5 isso são 300px de altura em vez de 360, e a
       dobra ali é disputada centímetro a centímetro */
    <div
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative mx-auto w-full max-w-[15rem] [perspective:1200px] sm:max-w-[21rem]"
    >
      {/* moldura deslocada: profundidade sem sombra desfocada */}
      <div
        aria-hidden
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-accent/45"
      />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-elevated"
      >
        {/* Coloque sua foto em /public/avatar.jpg */}
        <Image
          src={profile.avatar}
          alt={`Foto de ${profile.name}`}
          fill
          sizes="(max-width: 640px) 240px, 336px"
          className="object-cover"
          priority
        />
        <motion.span
          aria-hidden
          style={{ backgroundImage: light }}
          className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        />
      </motion.div>
    </div>
  );
}
