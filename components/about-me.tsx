"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { Card, CardContent } from "./ui/card";
import { SectionHeader } from "./section-header";
import { fadeChild, stagger } from "@/lib/animations";

function useScrollInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return { ref, inView };
}

const AboutMe = () => {
  return (
    <section
      id="sobre"
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24"
    >
      <SectionHeader num="01" title="Sobre" />

      <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
        {/* Bio */}
        {(() => {
          const { ref, inView } = useScrollInView();
          return (
            <motion.div
              ref={ref}
              className="lg:col-span-3 flex flex-col gap-4 sm:gap-5"
              variants={stagger}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {[
                <h1 className="text-muted-foreground">
                  Sou um desenvolvedor{" "}
                  <strong className="text-muted">Fullstack</strong> com 3 anos
                  de experiência prática em uma única empresa, onde tive a
                  oportunidade de construir e evoluir projetos do zero. Minha
                  especialidade está no{" "}
                  <strong className="text-muted">Frontend</strong>, onde atuo
                  como pleno — criando interfaces web modernas com React e
                  Next.js.
                </h1>,
                <h1 className="text-muted-foreground">
                  Um diferencial que poucos desenvolvedores têm: já desenvolvi{" "}
                  <strong className="text-muted">
                    aplicações nativas para televisões LG
                  </strong>{" "}
                  utilizando WebOS — uma plataforma nichada que exigiu
                  aprendizado rápido e pensamento fora do browser.
                </h1>,
                <h1 className="text-muted-foreground">
                  No <strong className="text-muted">Backend</strong>, opero como
                  quase-pleno — confortável com Node.js, Express, bancos
                  relacionais e ORM, e familiarizado com Clean Architecture, DDD
                  e SOLID.
                </h1>,
              ].map((p, i) => (
                <motion.p
                  key={i}
                  variants={fadeChild}
                  className="text-sm sm:text-base leading-relaxed text-muted-foreground"
                >
                  {p}
                </motion.p>
              ))}
            </motion.div>
          );
        })()}

        {/* Info cards */}
        {(() => {
          const { ref, inView } = useScrollInView();
          return (
            <motion.div
              ref={ref}
              className="lg:col-span-2 flex flex-col gap-2 sm:gap-3"
              variants={stagger}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {[
                { label: "Localização", value: "Brasil" },
                { label: "Experiência", value: "3 anos" },
                { label: "Foco atual", value: "Frontend Pleno" },
                { label: "Disponibilidade", value: "Aberto a propostas" },
              ].map((item) => (
                <motion.div key={item.label} variants={fadeChild}>
                  <Card className="bg-card-foreground border-border rounded-lg">
                    <CardContent className="flex items-center justify-between px-4">
                      <span className="text-xs font-mono text-muted-foreground shrink-0">
                        {item.label}
                      </span>
                      <span className="text-sm font-medium text-muted ml-3 text-right">
                        {item.value}
                      </span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          );
        })()}
      </div>
    </section>
  );
};

export { AboutMe };
