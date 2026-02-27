"use client";

import { motion } from "framer-motion";

import { Section } from "@/types/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TypewriterText } from "./typewriter-text";
import { fadeChild, stagger } from "@/lib/animations";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  const scrollTo = (id: Section) => {
    setTimeout(
      () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
      10,
    );
  };

  return (
    <section
      id="home"
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 lg:pt-44 pb-16 sm:pb-20 lg:pb-28"
    >
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div variants={stagger} initial="hidden" animate="visible">
          <motion.div variants={fadeChild}>
            <Badge
              variant="outline"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6 sm:mb-8 font-mono text-primary bg-primary/5 border-primary/30"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0" />
              Disponível para novas oportunidades
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeChild}
            className="font-extrabold leading-[1.1] text-[clamp(2rem,8vw,3.75rem)] mb-3 sm:mb-4 tracking-tight text-muted"
          >
            Yuri <span className="text-primary">Donizete</span>
          </motion.h1>

          <motion.p
            variants={fadeChild}
            className="text-base sm:text-xl text-muted-foreground mb-5 sm:mb-6"
          >
            <TypewriterText text="Desenvolvedor Fullstack" />
          </motion.p>

          <motion.p
            variants={fadeChild}
            className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-8 sm:mb-10 max-w-[480px]"
          >
            3 anos construindo aplicações web e nativas. Frontend é minha
            principal stack — do React ao WebOS. Backend sólido o suficiente
            para fechar o ciclo completo.
          </motion.p>

          <motion.div variants={fadeChild} className="flex flex-wrap gap-3">
            <Button
              onClick={() => scrollTo("projetos")}
              className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold bg-primary text-accent hover:bg-secondary hover:opacity-100 rounded"
            >
              Ver Projetos
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollTo("contatos")}
              className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-muted border-border bg-transparent hover:border-primary hover:text-primary transition-colors rounded"
            >
              Entre em Contato
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          className="grid grid-cols-2 gap-3 sm:gap-4"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {[
            { value: "3+", label: "Anos de Experiência" },
            { value: "8+", label: "Projetos Entregues" },
            { value: "Full", label: "Stack Coverage" },
            { value: "TV+", label: "Apps Nativas LG" },
          ].map((stat) => (
            <motion.div key={stat.label} variants={fadeChild}>
              <Card className="rounded-xl">
                <CardContent className="p-4 sm:p-5 lg:p-6">
                  <div className="text-2xl sm:text-3xl font-extrabold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs leading-snug text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export { Home };
