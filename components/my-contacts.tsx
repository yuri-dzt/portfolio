"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";

import { contacts } from "@/lib/data";
import { Card, CardContent } from "./ui/card";
import { SectionHeader } from "./section-header";
import { fadeChild, stagger, fadeUp } from "@/lib/animations";

function useScrollInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return { ref, inView };
}

const MyContacts = () => {
  return (
    <section id="contatos" className="w-full py-16 sm:py-20 lg:py-24">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader num="04" title="Contatos" />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {(() => {
            const { ref, inView } = useScrollInView();
            return (
              <motion.div
                ref={ref}
                variants={stagger}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <motion.p
                  variants={fadeChild}
                  className="text-lg sm:text-xl font-bold text-muted mb-2 sm:mb-3"
                >
                  Vamos conversar?
                </motion.p>
                <motion.p
                  variants={fadeChild}
                  className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-6 sm:mb-8"
                >
                  Estou aberto a oportunidades, freelas, parcerias ou só um
                  bate-papo técnico.
                </motion.p>

                <div className="flex flex-col gap-2.5 sm:gap-3">
                  {contacts.map((c) => (
                    <motion.div key={c.label} variants={fadeChild}>
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl w-full group bg-card-foreground border border-border hover:border-border-light transition-colors duration-200"
                      >
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 bg-foreground group-hover:bg-primary transition-colors duration-200">
                          <svg
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary group-hover:text-accent transition-colors duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d={c.icon} />
                          </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-mono text-muted-foreground mb-0.5">
                            {c.label}
                          </div>
                          <div className="text-xs sm:text-sm font-medium text-muted group-hover:text-primary transition-colors duration-200 truncate">
                            {c.value}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 shrink-0 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </a>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })()}

          {/* Terminal */}
          {(() => {
            const { ref, inView } = useScrollInView();
            return (
              <motion.div
                ref={ref}
                variants={fadeUp}
                custom={100}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <Card className="overflow-hidden bg-transparent">
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-border border-b border-border">
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f57] shrink-0" />
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#febc2e] shrink-0" />
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#28c840] shrink-0" />
                    <span className="text-xs font-mono text-muted-foreground ml-1 truncate">
                      yuri@portfolio ~ terminal
                    </span>
                  </div>
                  <CardContent className="p-4 sm:p-5 lg:p-6 flex flex-col gap-3 bg-card-foreground overflow-x-auto font-mono text-[clamp(11px,2.5vw,13px)]">
                    {[
                      { cmd: "whoami", out: "Yuri Donizete" },
                      {
                        cmd: "cat role.txt",
                        out: "Desenvolvedor Fullstack",
                      },
                      { cmd: "echo $YEARS_EXP", out: "3" },
                      {
                        cmd: "cat stack.txt",
                        out: "React · Next.js · Node.js",
                      },
                      { cmd: "cat status.txt", out: "open_to_work=true" },
                      {
                        cmd: "cat contact.txt",
                        out: "yuridonizete303@gmail.com",
                      },
                    ].map((line, i) => (
                      <div key={i} className="whitespace-nowrap">
                        <div className="flex gap-2">
                          <span className="text-primary">$</span>
                          <span className="text-muted">{line.cmd}</span>
                        </div>
                        <div className="text-muted-foreground pl-4">
                          {line.out}
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <span className="text-primary">$</span>
                      <span className="inline-block w-2 h-4 align-middle bg-primary animate-pulse" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })()}
        </div>
      </div>
    </section>
  );
};

export { MyContacts };
