"use client";

import { useLayoutEffect, useRef } from "react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { techGroups } from "@/data/site";
import { gsap } from "@/lib/gsap";

/**
 * Sete cards iguais em grade viraram três faixas que andam sozinhas, em
 * direções alternadas. É movimento perceptível sem precisar de scroll nem de
 * mouse — e some a grade de cards repetida, que é a assinatura visual de
 * página gerada.
 */
const rows = [
  [...techGroups[0].items, ...techGroups[3].items],
  [...techGroups[1].items, ...techGroups[2].items],
  [...techGroups[4].items, ...techGroups[5].items, ...techGroups[6].items],
];

function Marquee({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        // a lista é duplicada no DOM: animar até -50% e repetir emenda sem salto
        const tween = gsap.to(track.current, {
          xPercent: reverse ? 0 : -50,
          ease: "none",
          duration: items.length * 2.6,
          repeat: -1,
        });

        gsap.set(track.current, { xPercent: reverse ? -50 : 0 });
        return () => tween.kill();
      });
    }, track);

    return () => ctx.revert();
  }, [items.length, reverse]);

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]">
      <div ref={track} className="flex w-max gap-2.5 py-1.5">
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="whitespace-nowrap rounded-lg border border-line bg-surface px-3.5 py-2 font-mono text-[13px] text-muted"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function TechStack() {
  return (
    <Section id="tecnologias">
      <Reveal variant="wipe">
        <SectionHeading
          title="Ferramentas que uso no dia a dia"
          description="Escolho a stack pelo problema, não pela moda. Estas são as que domino e uso em produção."
        />
      </Reveal>

      <p className="mt-8 font-mono text-[11px] tracking-tight text-faint">
        {techGroups.map((g) => g.title).join("  ·  ")}
      </p>

      <div className="mt-6 space-y-2.5">
        {rows.map((items, i) => (
          <Marquee key={i} items={items} reverse={i % 2 === 1} />
        ))}
      </div>
    </Section>
  );
}
