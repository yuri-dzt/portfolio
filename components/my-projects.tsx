"use client";

import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { motion, useInView } from "framer-motion";

import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { projects } from "@/lib/data";
import { SectionHeader } from "./section-header";
import { fadeChild, stagger } from "@/lib/animations";
import { Card, CardContent, CardHeader } from "./ui/card";

function useScrollInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return { ref, inView };
}

const statusConfig = {
  active: {
    label: "● ativo",
    className: "text-primary bg-primary/5 border-primary/20",
  },
  developing: {
    label: "● em dev",
    className:
      "text-yellow-400 bg-[rgba(255,255,0,0.08)] border-[rgba(255,255,0,0.2)]",
  },
  paused: {
    label: "● pausado",
    className:
      "text-orange-400 bg-[rgba(255,165,0,0.08)] border-[rgba(255,165,0,0.2)]",
  },
  discontinued: {
    label: "○ desc.",
    className: "text-muted-foreground bg-foreground/70 border-border-light",
  },
};

const MyProjects = () => {
  return (
    <section
      id="projetos"
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24"
    >
      <SectionHeader num="03" title="Projetos" />

      {(() => {
        const { ref, inView } = useScrollInView(0.05);
        return (
          <motion.div
            ref={ref}
            className="grid sm:grid-cols-2 gap-4 sm:gap-5"
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {projects.map((project) => {
              const status = statusConfig[project.status];
              return (
                <motion.div key={project.name} variants={fadeChild}>
                  <Card className="group h-full flex flex-col">
                    <CardHeader className="pb-2 pt-5 px-5 sm:px-6">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="text-base sm:text-lg font-bold text-muted group-hover:text-primary transition-colors duration-200 leading-snug">
                            {project.name}
                          </h3>
                          <span className="text-xs font-mono text-muted-foreground">
                            {project.type}
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs font-mono shrink-0 whitespace-nowrap",
                            status.className,
                          )}
                        >
                          {status.label}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="px-5 sm:px-6 pb-5 flex flex-col flex-1 gap-4">
                      <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground flex-1">
                        {project.description}
                      </p>

                      <div className="flex items-end justify-between gap-3">
                        <div className="flex flex-wrap gap-1.5">
                          {project.stack.map((s) => (
                            <span
                              key={s}
                              className="text-xs px-2 py-0.5 rounded font-mono text-muted bg-accent border border-border-light"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 text-muted-foreground hover:text-primary transition-colors duration-200"
                            aria-label={`Ver ${project.name}`}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        );
      })()}
    </section>
  );
};

export { MyProjects };
